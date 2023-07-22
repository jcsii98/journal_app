import React, { useState, useEffect } from "react";
import Edit from "../assets/edit.png";
export default function BodyButton(props) {
  const {
    setAddCategory,
    setAddTask,
    setIsTokenValid,
    setIsLoading,
    category,
    activeTab,
    setActiveTab,
    handleActiveTabChange,
    setCategoryData,
    setIsEditing,
    fetchCategoryData,
  } = props;
  const [isActive, setIsActive] = useState(false);

  const handleLabelClick = () => {
    console.log("Active tab:", activeTab);
    console.log("category.id:", category.id);

    const buttonClicked = category.id;
    const previousBtn = activeTab;

    if (event.target.tagName === "LABEL") {
      setAddCategory(false);
      setAddTask(false);
      setIsEditing(false);
      if (buttonClicked === previousBtn) {
        setActiveTab(null);
      } else {
        handleActiveTabChange(category.id);
        fetchCategoryData(category.id);
      }
    }
  };

  useEffect(() => {
    setIsActive(activeTab === category.id);
  }, [activeTab, category.id]);

  const toggleIsEditing = () => {
    setAddCategory(false);
    setAddTask(false);
    setIsEditing((prevState) => !prevState);
    console.log("editing called");
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
        {category.name}
        {isActive && (
          <img
            onClick={toggleIsEditing}
            style={{ height: "15px" }}
            src={Edit}
          ></img>
        )}
      </label>
    </>
  );
}
