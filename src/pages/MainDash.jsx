import BodyButton from "../components/BodyButton";
import React, { useState, useEffect, useRef } from "react";
import CategoryForm from "../components/CategoryForm";
import TaskForm from "../components/TaskForm";

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

  const catId = activeTab;
  const storedToken = localStorage.getItem("token");
  const authorizationHeader = `Token ${storedToken}`;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    console.log("fetch called");
    const storedToken = localStorage.getItem("token");
    const authorizationHeader = `Token ${storedToken}`;
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
          console.log("SetCategories called");
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

    if (isEditing && formData.category_name === "") {
      // Delete the category
      const url = `http://127.0.0.1:3000/categories/${catId}`;
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationHeader,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to delete category");
          }
        })
        .then((data) => {
          console.log(data);
          // Update state to hide the form and reset toggleEdit
          setAddCategory(false);
          setIsEditing(false);
          fetchCategories();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Create or update the category
      const url = isEditing
        ? `http://127.0.0.1:3000/categories/${catId}`
        : "http://127.0.0.1:3000/categories";
      const method = isEditing ? "PUT" : "POST";

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
            throw new Error(
              isEditing
                ? "Failed to update category"
                : "Failed to create category"
            );
          }
        })
        .then((data) => {
          console.log(data);
          // Update state to hide the form and reset toggleEdit
          setAddCategory(false);
          setIsEditing(false);
          fetchCategories();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleSubmitTask = (formData) => {
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
    const scrollLeft = event.deltaY;
    navContainer.scrollLeft -= scrollLeft;
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
                  setIsTokenValid={setIsTokenValid}
                  key={category.id}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  setIsLoading={setIsLoading}
                  category={category}
                  activeTab={activeTab}
                  handleActiveTabChange={handleActiveTabChange}
                  setCategoryData={setCategoryData}
                  setAddCategory={setAddCategory}
                  setAddTask={setAddTask}
                />
              ))}
            </div>
          ) : (
            <div className="my-1">
              <h2 className="font-color-secondary">
                Add a category to get started
              </h2>
            </div>
          )}
        </div>

        <div className="text-muted main-dash-body border-bottom border-top">
          {addCategory || isEditing ? (
            <CategoryForm
              isEditing={isEditing}
              handleSubmitCategory={handleSubmitCategory}
            />
          ) : addTask ? (
            <>
              <TaskForm handleSubmitTask={handleSubmitTask} />
            </>
          ) : categoryData.length > 0 || activeTab ? (
            <>
              <div className="accordion-container my-1">
                {categoryData.map((category) => (
                  <div className="accordion my-1" key={category.id}>
                    <div
                      className="accordion-item"
                      id={`accordionExample-${category.id}`}
                    >
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
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
                        <div className="accordion-body">{category.body}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h2>Add a task</h2>
          )}
        </div>
        <div className="footer">
          <button
            type="button"
            className="btn-primary btn"
            onClick={toggleAddTask}
          >
            {" "}
            {addTask ? <>Cancel</> : <>Add Task</>}
          </button>
        </div>
      </div>
    </>
  );
}
