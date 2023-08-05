import BodyButton from "../components/BodyButton";
import React, { useState, useEffect, useRef } from "react";
import CategoryForm from "../components/CategoryForm";
import TaskForm from "../components/TaskForm";
import Edit from "../assets/edit.png";

export default function MainDash(props) {
  const {} = props;
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [editTaskId, setEditTaskId] = useState("");

  const [deleted, setDeleted] = useState(false);
  const [focusData, setFocusData] = useState([]);
  const [focusClicked, setFocusClicked] = useState(false);
  const [editTaskCategoryId, setEditTaskCategoryId] = useState("");
  useEffect(() => {
    fetchCategories();
    fetchFocus();
  }, []);

  // main states
  const [addCategory, setAddCategory] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [activeTab, setActiveTab] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);

  const catId = activeTab;
  // headers
  const accessToken = localStorage.getItem("access-token");
  const uid = localStorage.getItem("uid");
  const client = localStorage.getItem("client");

  // editing info
  const [categoryName, setCategoryName] = useState("");
  const [taskData, setTaskData] = useState({
    name: "",
    body: "",
    due_date: "",
  });
  const toggleEditTask = (
    categoryName,
    categoryBody,
    categoryDueDate,
    taskId,
    categoryId
  ) => {
    // Update the state with the category properties when the button is clicked
    setTaskData({
      name: categoryName,
      body: categoryBody,
      due_date: categoryDueDate,
    });

    setDeleted(false);
    setError(false);
    console.log("Toggle Edit Task Called");
    setIsEditingTask((prevState) => !prevState);
    setEditTaskId(taskId);
    setEditTaskCategoryId(categoryId);
    console.log("Task ID:", taskId);
  };

  const fetchFocus = () => {
    console.log("fetch focus called");
    fetch("https://journal-api-cxui.onrender.com/categories/tasks/due_today", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        uid: uid,
        client: client,
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
    setCategoryName("");
    setError("");
    setAddCategory((prevState) => !prevState);

    console.log("toggle clicked");
  };

  const fetchCategories = () => {
    console.log("fetch called");
    fetch("https://journal-api-cxui.onrender.com/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        uid: uid,
        client: client,
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
    setIsEditingCategory(false);
    setIsEditingTask(false);
    setAddCategory(false);
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
        "access-token": accessToken,
        uid: uid,
        client: client,
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
            setError(data.errors);
          });
        }
      })
      .then((data) => {
        console.log(data);
        if (!data.errors && data.id && data.user_id) {
          fetchCategories();
          setAddCategory(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setFormIsLoading(false);
  };

  const handleDeleteCategory = () => {
    const method = "DELETE";

    const url = `https://journal-api-cxui.onrender.com/categories/${catId}?`;
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        uid: uid,
        client: client,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            setError(data.errors);
          });
        }
      })
      .then((data) => {
        console.log(data);
        if (!data.errors && data.message == "Category successfully deleted") {
          fetchCategories();
          setActiveTab(null);
          console.log("Category Deleted");
          setDeleted(true);
          setAddCategory(false);
          setIsEditingCategory(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setFormIsLoading(false);
  };

  const handleUpdateCategory = (formData) => {
    event.preventDefault();
    const method = "PUT";

    const url = `https://journal-api-cxui.onrender.com/categories/${catId}`;
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        uid: uid,
        client: client,
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
            console.log(data.errors);
            setError(data.errors);
          });
        }
      })
      .then((data) => {
        console.log(data);
        if (!data.errors) {
          fetchCategories();
          setAddCategory(false);
          setIsEditingCategory(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setFormIsLoading(false);
  };

  const fetchCategoryData = (categoryId) => {
    console.log("categoryId:", categoryId);
    const url = `https://journal-api-cxui.onrender.com/categories/${categoryId}/tasks`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        uid: uid,
        client: client,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.length >= 0) {
          console.log("category data exists");
          setCategoryData(data);
        } else {
          // setIsTokenValid(false);
          console.log("Token is invalid");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setIsLoading(false);
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
        "access-token": accessToken,
        uid: uid,
        client: client,
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
          setError(data.error);
        }
      })
      .then((data) => {
        console.log(data);
        if (data.id) {
          fetchCategoryData(data.category_id);
          setAddTask(false);
          fetchFocus();
        } else {
          setError(data.errors);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setFormIsLoading(false);
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
        navContainer.removeEventListener("wheel", handleScroll);
        navContainer.removeEventListener("mouseenter", enableScrollOnHover);
        navContainer.removeEventListener("mouseleave", disableScrollOnHover);
      };
    }
  }, [navContainerRef.current]);

  const toggleAddTask = () => {
    setDeleted(false);
    setError("");
    setAddCategory(false);
    setTaskData({
      name: "",
      body: "",
      due_date: "",
    });
    setAddTask((prevState) => !prevState);

    console.log("toggle clicked");
  };

  const handleEditTaskSubmit = (formData) => {
    const url = `https://journal-api-cxui.onrender.com/categories/${editTaskCategoryId}/tasks/${editTaskId}`;
    const method = "PUT";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        uid: uid,
        client: client,
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
          return response.json().then((data) => {
            throw new Error(data.errors.join(", "));
          });
        }
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log("Task update successful");
          setAddCategory(false);
          setIsEditingTask(false);
          setAddTask(false);
          fetchCategories();
          fetchCategoryData(data.data.category_id);
          fetchFocus();
        }
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
      });
    setFormIsLoading(false);
  };

  const handleDeleteTask = () => {
    const method = "DELETE";
    const url = `https://journal-api-cxui.onrender.com/categories/${editTaskCategoryId}/tasks/${editTaskId}`;
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        uid: uid,
        client: client,
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
          setDeleted(true);
          setIsEditingTask(false);
          setAddTask(false);
          fetchCategories();
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
      setIsEditingCategory(false);
      setIsEditingTask(false);

      setCategoryData(focusData);
      console.log("categoryData");
      setFocusClicked(true);
      setActiveTab("focus");
    }
  };
  const formatDateToWordFormat = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
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
          ) : categories.length > 0 ? (
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
                  setCategoryName={setCategoryName}
                  setIsEditingTask={setIsEditingTask}
                  fetchCategoryData={fetchCategoryData}
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                  key={category.id}
                  isEditingCategory={isEditingCategory}
                  setIsEditingCategory={setIsEditingCategory}
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
                <h2 className="text-muted">No tasks for now</h2>
              </div>
            )
          )}
        </div>

        <div className="text-muted main-dash-body border-bottom border-top">
          {addCategory || isEditingCategory ? (
            <CategoryForm
              formIsLoading={formIsLoading}
              setFormIsLoading={setFormIsLoading}
              handleDeleteCategory={handleDeleteCategory}
              setIsEditingCategory={setIsEditingCategory}
              error={error}
              setError={setError}
              isEditingCategory={isEditingCategory}
              handleSubmitCategory={handleSubmitCategory}
              handleUpdateCategory={handleUpdateCategory}
              categoryName={categoryName}
              setCategoryName={setCategoryName}
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
                taskData={taskData}
                setTaskData={setTaskData}
              />
            </>
          ) : categoryData.length > 0 &&
            (activeTab || (focusClicked && focusData.length > 0)) ? (
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
                          <div className="display-flex my-1 py-1 task-body-container">
                            <div className="display-flex flex-column details-container">
                              <div className="accordion-body-row align-self-start display-flex my-1">
                                {" "}
                                <dt className="col-sm-3 mr-3">Details</dt>
                                <dd className="display-flex col-sm-9 align-items-center">
                                  {category.body}
                                </dd>
                              </div>

                              {category.due_date && (
                                <div className="accordion-body-row align-self-start display-flex py-1 border-top">
                                  <dt className="col-sm-3 mr-3">Due Date</dt>
                                  <dd className="display-flex  col-sm-9 align-items-center">
                                    <p>
                                      {formatDateToWordFormat(
                                        category.due_date
                                      )}
                                    </p>
                                  </dd>
                                </div>
                              )}
                            </div>

                            <button
                              onClick={() =>
                                toggleEditTask(
                                  category.name,
                                  category.body,
                                  category.due_date,
                                  category.id,
                                  category.category_id
                                )
                              }
                              type="button"
                              className="btn"
                            >
                              <img
                                style={{ height: "auto", width: "18px" }}
                                src={Edit}
                                alt="Edit"
                              />
                            </button>
                          </div>
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
          {!isEditingTask && !isEditingCategory ? (
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

          {categories.length > 0 &&
          activeTab &&
          activeTab !== "focus" &&
          !isEditingTask &&
          !isEditingCategory ? (
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
