import React, { useState, useEffect } from "react";
// import edit from "../assets/Edit.png";
export default function BodyButton(props) {
  const {
    setAddCategory,
    setAddTask,
    setIsTokenValid,
    setIsLoading,
    category,
    activeTab,
    handleActiveTabChange,
    setCategoryData,
    setIsEditing,
  } = props;

  const [isActive, setIsActive] = useState(false);
  let buttonName = category.name;
  const handleLabelClick = () => {
    handleActiveTabChange(category.id);
    fetchCategoryData(category.id);
  };

  const fetchCategoryData = (categoryId) => {
    const storedToken = localStorage.getItem("token");
    const authorizationHeader = `Token ${storedToken}`;
    const url = `http://127.0.0.1:3000/categories/${categoryId}/tasks/`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.user) {
          setCategoryData(data);
          setIsLoading(false);
        } else {
          setIsTokenValid(false);
          console.log("Token is invalid");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setIsActive(activeTab === category.id);
  }, [activeTab, category.id]);

  const toggleIsEditing = () => {
    setAddCategory(false);
    setAddTask(false);
    setIsEditing((prevState) => !prevState);
  };
  return (
    <>
      <label
        className={`body-btn btn-show-edit ff-primary fw-400 btn btn-secondary ${
          activeTab === category.id ? "active" : ""
        }`}
        onClick={handleLabelClick}
        style={{
          height: "40px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <input
          type="radio"
          name="options"
          id={category.id}
          autoComplete="off"
          style={{ display: "none" }}
        />
        {buttonName}
        {isActive && (
          <button
            className="mx-1 inner-btn"
            alt="Edit"
            onClick={toggleIsEditing}
          />
        )}
      </label>
    </>
  );
}
