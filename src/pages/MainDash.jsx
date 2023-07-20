import BodyButton from "../components/BodyButton";
import React, { useState, useEffect, useRef } from "react";
import CategoryForm from "../components/CategoryForm";
import Tasks from "../components/Tasks";

export default function MainDash(props) {
  const { setIsTokenValid, addCategory, setAddCategory } = props;
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [categoryData, setCategoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toggleEdit, setToggleEdit] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

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
          console.log("SetCategories called");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleActiveTabChange = (categoryId) => {
    setActiveTab(categoryId);
  };

  const handleSubmitCategory = (formData) => {
    event.preventDefault();
    const catId = activeTab;
    const storedToken = localStorage.getItem("token");
    const authorizationHeader = `Token ${storedToken}`;

    if (toggleEdit && formData.category_name === "") {
      // Delete the category
      const url = `https://journal-api-cxui.onrender.com/categories/${catId}`;
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
          setToggleEdit(false);
          fetchCategories();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Create or update the category
      const url = toggleEdit
        ? `https://journal-api-cxui.onrender.com/categories/${catId}`
        : "https://journal-api-cxui.onrender.com/categories";
      const method = toggleEdit ? "PUT" : "POST";

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
              toggleEdit
                ? "Failed to update category"
                : "Failed to create category"
            );
          }
        })
        .then((data) => {
          console.log(data);
          // Update state to hide the form and reset toggleEdit
          setAddCategory(false);
          setToggleEdit(false);
          fetchCategories();
        })
        .catch((error) => {
          console.error(error);
        });
    }
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
                  toggleEdit={toggleEdit}
                  setToggleEdit={setToggleEdit}
                  setIsLoading={setIsLoading}
                  category={category}
                  activeTab={activeTab}
                  handleActiveTabChange={handleActiveTabChange}
                  setCategoryData={setCategoryData}
                />
              ))}
            </div>
          ) : (
            <div className="my-1">
              <h2 className="font-color-secondary">Pretty quiet today...</h2>
            </div>
          )}
        </div>
        {addCategory && (
          <CategoryForm handleSubmitCategory={handleSubmitCategory} />
        )}
        <div className="footer">
          <button type="button" className="btn-primary btn">
            Add Task
          </button>
        </div>
      </div>
    </>
  );
}
