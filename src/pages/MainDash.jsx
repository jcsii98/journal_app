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
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [editTaskId, setEditTaskId] = useState("");
  const catId = activeTab;
  const storedToken = localStorage.getItem("token");
  const authorizationHeader = `Token ${storedToken}`;
  const [deleted, setDeleted] = useState(false);
  const [focusData, setFocusData] = useState([]);
  const [focusClicked, setFocusClicked] = useState(false);
  const [editTaskCategoryId, setEditTaskCategoryId] = useState("");
  useEffect(() => {
    fetchCategories();
    fetchFocus();
  }, []);

  const fetchFocus = () => {
    console.log("fetch focus called");
    fetch("http://127.0.0.1:3000/categories/tasks/due_today", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFocusData(data); // Set the focusData to the response data directly
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleAddCategory = () => {
    setDeleted(false);
    setError(false);
    setAddTask(false);
    setIsEditing(false);
    setAddCategory((prevState) => !prevState);

    console.log("toggle clicked");
  };

  const fetchCategories = () => {
    console.log("fetch called");
    fetch("http://127.0.0.1:3000/categories", {
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
    setError(false);
    setDeleted(false);
    setAddCategory(false);
    setAddTask(false);
    setIsEditing(false);
    setFocusClicked(false);
    setActiveTab(categoryId);
  };
  useEffect(() => {
    console.log("categoryData changed:", categoryData);
  }, [categoryData]);

  const handleSubmitCategory = (formData) => {
    event.preventDefault();
    setFormIsLoading(true);
    // Create or update the category
    const url = "http://127.0.0.1:3000/categories";
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
            setFormIsLoading(false);
            throw new Error(data.errors.join(", "));
          });
        }
      })
      .then((data) => {
        console.log(data);
        if (!data.errors && data.id) {
          setFormIsLoading(false);
          setAddCategory(false);
          setIsEditing(false);
          fetchCategories();
        } else {
          setFormIsLoading(false);
          setError(data.errors);
        }
      })
      .catch((error) => {
        setFormIsLoading(false);
        console.error(error);
        // Handle and display the error in your UI
        setError(error.message);
      });
  };

  const handleDeleteCategory = () => {
    const method = "DELETE";

    const url = `http://127.0.0.1:3000/categories/${catId}?`;
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
          setDeleted(true);
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
    setFormIsLoading(true);
    event.preventDefault();

    // delete category
    const method = "PUT";

    const url = `http://127.0.0.1:3000/${catId}?`;
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
            setFormIsLoading(false);
            throw new Error(data.errors.join(", "));
          });
        }
      })
      .then((data) => {
        console.log(data);
        if (!data.errors) {
          setFormIsLoading(false);
          setAddCategory(false);
          setIsEditing(false);
          fetchCategories();
        } else {
          setFormIsLoading(false);
          setError(data.errors);
        }
      })
      .catch((error) => {
        setFormIsLoading(false);
        console.error(error);
        // Handle and display the error in your UI
        setError(error.message);
      });
  };
  const fetchCategoryData = (categoryId) => {
    console.log("categoryId:", categoryId);
    const storedToken = localStorage.getItem("token");
    const authorizationHeader = `Token ${storedToken}`;
    const url = `http://127.0.0.1:3000/categories/${categoryId}/tasks`;

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
    setFormIsLoading(true);
    console.log("Form Data:", formData);
    // create task
    const url = `http://127.0.0.1:3000/categories/${catId}/tasks`;
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
          due_date: formData.task_due_date,
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setFormIsLoading(false);
          throw new Error("Failed to create task");
        }
      })
      .then((data) => {
        console.log(data);
        if (data.id) {
          setFormIsLoading(false);
          fetchCategoryData(data.category_id);
          setAddTask(false);
          fetchFocus();
        } else {
          setFormIsLoading(false);
          setError(data.errors);
        }
      })
      .catch((error) => {
        setFormIsLoading(false);
        console.error(error);
        setError(error.message);
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
    setDeleted(false);
    setError(false);
    setAddCategory(false);
    setAddTask((prevState) => !prevState);

    console.log("toggle clicked");
  };
  const toggleEditTask = (taskId, categoryId) => {
    setDeleted(false);
    setError(false);
    console.log("Toggle Edit Task Called");
    setIsEditingTask((prevState) => !prevState);
    setEditTaskId(taskId);
    setEditTaskCategoryId(categoryId);
    console.log("Task ID:", taskId);
  };

  const handleEditTaskSubmit = (formData) => {
    const url = `http://127.0.0.1:3000/categories/${editTaskCategoryId}/tasks/${editTaskId}`;
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
          due_date: formData.task_due_date,
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
          fetchFocus();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDeleteTask = () => {
    const method = "DELETE";
    const url = `http://127.0.0.1:3000/categories/${catId}/tasks/${editTaskId}`;
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
        setDeleted(true);
        if (!data.errors && data.message) {
          setIsEditingTask(false);
          setAddTask(false);
          fetchCategoryData(activeTab);
          fetchFocus();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleFocusClick = (categoryId) => {
    console.log("Focus Clicked");
    console.log(focusData);
    setActiveTab("focus");
    console.log(activeTab);

    if (
      event.target.tagName === "LABEL" ||
      event.target.tagName === "DIV" ||
      event.target.tagName === "INPUT"
    ) {
      setAddCategory(false);
      setAddTask(false);
      setIsEditing(false);
      setIsEditingTask(false);

      setCategoryData(focusData);
      console.log("categoryData");
      setFocusClicked(true);
      setActiveTab("focus");
    }
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
              {focusData.length > 0 && (
                <>
                  <label
                    className={`body-btn btn-show-edit ff-primary fw-400 btn btn-secondary ${
                      activeTab === "focus" ? "active" : ""
                    }`}
                    onClick={handleFocusClick}
                    style={{
                      height: "40px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <input
                      type="radio"
                      name="option"
                      id="focus"
                      autoComplete="off"
                      style={{ display: "none" }}
                    />
                    <div>Today</div>
                  </label>
                </>
              )}
              {categories.map((category) => (
                <BodyButton
                  setIsEditingTask={setIsEditingTask}
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
              formIsLoading={formIsLoading}
              setFormIsLoading={setFormIsLoading}
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
                error={error}
                setError={setError}
                formIsLoading={formIsLoading}
                setFormIsLoading={setFormIsLoading}
                handleDeleteTask={handleDeleteTask}
                isEditingTask={isEditingTask}
                setIsEditingTask={setIsEditingTask}
                handleSubmitTask={handleSubmitTask}
                handleEditTaskSubmit={handleEditTaskSubmit}
              />
            </>
          ) : categoryData.length > 0 && (activeTab || focusClicked) ? (
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
                            onClick={() =>
                              toggleEditTask(category.id, category.category_id)
                            }
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
            deleted ? (
              <h4>Task deleted</h4>
            ) : (
              <h4>Add a task</h4>
            )
          ) : categories.length > 0 ? (
            <>
              <h4>Select Category</h4>
            </>
          ) : deleted ? (
            <h4>Category deleted</h4>
          ) : (
            <h4>Add category to start</h4>
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

          {activeTab !== "focus" && !isEditingTask && !isEditing ? (
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
