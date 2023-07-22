import BodyButton from "../components/BodyButton";
import React, { useState, useEffect, useRef } from "react";
import CategoryForm from "../components/CategoryForm";
import TaskForm from "../components/TaskForm";
import Edit from "../assets/edit.png";
export default function MainDash(props) {
  const {
    setIsEditing,
    addTask,
    setAddTask,
    setIsTokenValid,
    addCategory,
    setAddCategory,
    isEditing,
    activeTab,
    setActiveTab,
  } = props;
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState("");
  const catId = activeTab;
  const storedToken = localStorage.getItem("token");
  const authorizationHeader = `Token ${storedToken}`;

  useEffect(() => {
    fetchCategories();
  }, []);
  const toggleAddCategory = () => {
    setAddTask(false);
    setIsEditing(false);
    setAddCategory((prevState) => !prevState);

    console.log("toggle clicked");
  };
  const fetchCategories = () => {
    console.log("fetch called");
    const storedToken = localStorage.getItem("token");
    const authorizationHeader = `Token ${storedToken}`;
    fetch("https://journal-api-cxui.onrender.com/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.categories) {
          console.log(data.categories);
          setCategories(data.categories);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleActiveTabChange = (categoryId) => {
    setAddCategory(false);
    setAddTask(false);
    setIsEditing(false);
    setActiveTab(categoryId);
  };
  useEffect(() => {
    console.log("categoryData changed:", categoryData);
  }, [categoryData]);

  const handleSubmitCategory = (formData) => {
    event.preventDefault();
    // Create or update the category
    const url = "https://journal-api-cxui.onrender.com/categories";
    const method = "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
      body: JSON.stringify({
        category: {
          name: formData.category_name,
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(data.errors.join(", "));
          });
        }
      })
      .then((data) => {
        console.log(data);
        if (!data.errors && data.id) {
          setAddCategory(false);
          setIsEditing(false);
          fetchCategories();
        } else {
          setError(data.errors);
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle and display the error in your UI
        setError(error.message);
      });
  };

  const handleDeleteCategory = () => {
    const method = "DELETE";

    const url = `https://journal-api-cxui.onrender.com/categories/${catId}?`;
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(data.errors.join(", "));
          });
        }
      })
      .then((data) => {
        console.log(data);
        if (data.message == "Category successfully deleted") {
          console.log("Category Deleted");
          setAddCategory(false);
          setIsEditing(false);
          fetchCategories();
          setActiveTab(null);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateCategory = (formData) => {
    event.preventDefault();

    // delete category
    const method = "PUT";

    const url = `https://journal-api-cxui.onrender.com/categories/${catId}?`;
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
      body: JSON.stringify({
        category: {
          name: formData.category_name,
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(data.errors.join(", "));
          });
        }
      })
      .then((data) => {
        console.log(data);
        if (!data.errors) {
          setAddCategory(false);
          setIsEditing(false);
          fetchCategories();
        } else {
          setError(data.errors);
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle and display the error in your UI
        setError(error.message);
      });
  };
  const fetchCategoryData = (categoryId) => {
    console.log("categoryId:", categoryId);
    const storedToken = localStorage.getItem("token");
    const authorizationHeader = `Token ${storedToken}`;
    const url = `https://journal-api-cxui.onrender.com/categories/${categoryId}/tasks/`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.length >= 0) {
          console.log("category data exists");
          setCategoryData(data);
          setIsLoading(false);
        } else {
          // setIsTokenValid(false);
          console.log("Token is invalid");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSubmitTask = (formData) => {
    console.log("Form Data:", formData);
    // create task
    const url = `https://journal-api-cxui.onrender.com/categories/${catId}/tasks`;
    const method = "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
      body: JSON.stringify({
        task: {
          name: formData.task_name,
          body: formData.task_body,
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to create task");
        }
      })
      .then((data) => {
        console.log(data);
        fetchCategoryData(data.category_id);
        setAddTask(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navContainerRef = useRef(null);

  const enableScrollOnHover = () => {
    navContainerRef.current.style.overflowX = "scroll";
  };

  const disableScrollOnHover = () => {
    navContainerRef.current.style.overflowX = "hidden";
  };

  const handleScroll = (event) => {
    const navContainer = navContainerRef.current;
    event.preventDefault();
    const scrollDirection = event.deltaY > 0 ? "down" : "up";
    const scrollAmount = 100;
    if (scrollDirection === "down") {
      navContainer.scrollLeft += scrollAmount;
    } else {
      navContainer.scrollLeft -= scrollAmount;
    }
  };

  useEffect(() => {
    const navContainer = navContainerRef.current;
    if (navContainer) {
      navContainer.addEventListener("wheel", handleScroll);
      navContainer.addEventListener("mouseenter", enableScrollOnHover);
      navContainer.addEventListener("mouseleave", disableScrollOnHover);

      return () => {
        // Clean up the event listeners when the component unmounts
        navContainer.removeEventListener("wheel", handleScroll);
        navContainer.removeEventListener("mouseenter", enableScrollOnHover);
        navContainer.removeEventListener("mouseleave", disableScrollOnHover);
      };
    }
  }, [navContainerRef.current]);

  const toggleAddTask = () => {
    setAddCategory(false);
    setAddTask((prevState) => !prevState);

    console.log("toggle clicked");
  };
  const toggleEditTask = (taskId) => {
    console.log("Toggle Edit Task Called");
    setIsEditingTask((prevState) => !prevState);
    setEditTaskId(taskId);
    console.log("Task ID:", taskId);
  };

  const handleEditTaskSubmit = (formData) => {
    const url = `http://127.0.0.1:3000/categories/${catId}/tasks/${editTaskId}`;
    const method = "PUT";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
      body: JSON.stringify({
        task: {
          name: formData.task_name,
          body: formData.task_body,
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to edit task");
        }
      })
      .then((data) => {
        console.log(data);
        if (data.id) {
          console.log("data.id exists");
          setAddCategory(false);
          setIsEditingTask(false);
          setAddTask(false);
          fetchCategories();
          fetchCategoryData(data.category_id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDeleteTask = () => {
    const method = "DELETE";
    const url = `https://journal-api-cxui.onrender.com/categories/${catId}/tasks/${editTaskId}`;
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to delete task");
        }
      })
      .then((data) => {
        console.log(data);
        if (!data.errors && data.message) {
          setIsEditingTask(false);
          setAddTask(false);
          fetchCategoryData(activeTab);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="main-dash">
        <div
          ref={navContainerRef}
          className="slider-nav-container"
          style={{ scrollBehavior: "smooth" }}
        >
          {isLoading ? (
            <>Loading</>
          ) : // Rest of your code for categories and accordion
          categories.length > 0 ? (
            <div
              className="slider-nav btn-group btn-group-toggle"
              data-toggle="buttons"
            >
              {categories.map((category) => (
                <BodyButton
                  fetchCategoryData={fetchCategoryData}
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                  setIsTokenValid={setIsTokenValid}
                  key={category.id}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  setIsLoading={setIsLoading}
                  category={category}
                  handleActiveTabChange={handleActiveTabChange}
                  setCategoryData={setCategoryData}
                  setAddCategory={setAddCategory}
                  setAddTask={setAddTask}
                />
              ))}
            </div>
          ) : (
            !addCategory && (
              <div className="my-1">
                <h2 className="text-muted">Your categories</h2>
              </div>
            )
          )}
        </div>

        <div className="text-muted main-dash-body border-bottom border-top">
          {addCategory || isEditing ? (
            <CategoryForm
              handleDeleteCategory={handleDeleteCategory}
              setIsEditing={setIsEditing}
              error={error}
              setError={setError}
              isEditing={isEditing}
              handleSubmitCategory={handleSubmitCategory}
              handleUpdateCategory={handleUpdateCategory}
            />
          ) : addTask || isEditingTask ? (
            <>
              <TaskForm
                handleDeleteTask={handleDeleteTask}
                isEditingTask={isEditingTask}
                setIsEditingTask={setIsEditingTask}
                handleSubmitTask={handleSubmitTask}
                handleEditTaskSubmit={handleEditTaskSubmit}
              />
            </>
          ) : categoryData.length > 0 && activeTab ? (
            <>
              {console.log(categoryData)}
              <div className="accordion-container my-1">
                {categoryData.map((category) => (
                  <div className="accordion my-1" key={category.id}>
                    <div
                      className="accordion-item"
                      id={`accordionExample-${category.id}`}
                    >
                      <h2 className="accordion-header">
                        <button
                          className="ff-secondary fw-700 accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse-${category.id}`}
                          aria-expanded="false"
                          aria-controls={`collapse-${category.id}`}
                        >
                          {category.name}
                        </button>
                      </h2>
                      <div
                        id={`collapse-${category.id}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`accordionExample-${category.id}`}
                        data-bs-parent={`#accordionExample-${category.id}`}
                      >
                        <div className="accordion-body ff-primary fw-400">
                          {category.body}
                          <button
                            onClick={() => toggleEditTask(category.id)}
                            type="button"
                            className="btn"
                          >
                            <img
                              style={{ height: "15px" }}
                              src={Edit}
                              alt="Edit"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : activeTab ? (
            <h4>Add a task</h4>
          ) : categories.length > 0 ? (
            <>
              <h4>Select Category</h4>
            </>
          ) : (
            <>
              <h4>Add category to start</h4>
            </>
          )}
        </div>
        <div className="footer">
          {!isEditingTask && !isEditing ? (
            <button
              onClick={toggleAddCategory}
              type="button"
              className="mr-1 btn-primary btn"
            >
              {" "}
              {addCategory ? <>Cancel</> : <>Add category</>}
            </button>
          ) : (
            <></>
          )}

          {activeTab && !isEditingTask && !isEditing ? (
            <>
              <button
                type="button"
                className="btn-primary btn"
                onClick={toggleAddTask}
              >
                {" "}
                {addTask ? <>Cancel</> : <>Add Task</>}
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
