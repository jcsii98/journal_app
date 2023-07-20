import BodyButton from "../components/BodyButton";
import React, { useState, useEffect } from "react";
import CategoryForm from "../components/CategoryForm";
import Tasks from "../components/Tasks";

export default function MainDash() {
  const [categories, setCategories] = useState([]);
  const [addCategory, setAddCategory] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [categoryData, setCategoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  console.log(categoryData);
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
        console.log("SetCategories called");
        setCategories(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const toggleAddCategory = () => {
    setAddCategory((prevState) => !prevState);
  };

  const handleActiveTabChange = (categoryId) => {
    setActiveTab(categoryId);
  };

  const handleSubmitCategory = (formData) => {
    event.preventDefault();
    const storedToken = localStorage.getItem("token");
    const authorizationHeader = `Token ${storedToken}`;
    fetch("http://localhost:3000/categories", {
      method: "POST",
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
          return response.json(); // Parse the response body as JSON
        } else {
          throw new Error("Failed to create category");
        }
      })
      .then((data) => {
        console.log(data);
        // Update state to hide the form
        setAddCategory(false);
        fetchCategories();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="main-dash">
        {categories.length > 0 ? (
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            {categories.map((category) => (
              <BodyButton
                setIsLoading={setIsLoading}
                key={category.id}
                category={category}
                activeTab={activeTab} // Pass the activeTab state as a prop
                handleActiveTabChange={handleActiveTabChange} // Pass the function to change active tab as a prop
                setCategoryData={setCategoryData}
              />
            ))}
          </div>
        ) : (
          <div className="my-1">
            <h2 className="font-color-secondary">Pretty quiet today...</h2>
          </div>
        )}
        {addCategory ? (
          <CategoryForm
            handleSubmitCategory={handleSubmitCategory}
            setAddCategory={setAddCategory}
          />
        ) : (
          // If categoryData is available, display the tasks
          // If not, show a loading message or any other UI indication
          <>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              categoryData && (
                <div>
                  {categoryData.map((category) => (
                    <div key={category.id}>
                      <p>Name: {category.name}</p>
                      <p>Body: {category.body}</p>
                    </div>
                  ))}
                </div>
              )
            )}
          </>
        )}
        <div className="footer">
          {!addCategory && (
            <button
              onClick={toggleAddCategory}
              type="button"
              className="btn-primary btn"
            >
              <h3>Add category</h3>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
