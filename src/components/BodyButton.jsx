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
    setIsEditingCategory,
    fetchCategoryData,
    setIsEditingTask,
  } = props;
  const [isActive, setIsActive] = useState(false);

  const handleLabelClick = () => {
    console.log("Active tab:", activeTab);
    console.log("category.id:", category.id);

    const buttonClicked = category.id;
    const previousBtn = activeTab;

    if (event.target.tagName === "LABEL" || event.target.tagName === "DIV") {
      setAddCategory(false);
      if (buttonClicked === previousBtn) {
        setActiveTab(null);
      } else {
        fetchCategoryData(category.id);
        handleActiveTabChange(category.id);
      }
    }
  };

  useEffect(() => {
    setIsActive(activeTab === category.id);
  }, [activeTab, category.id]);

  const toggleIsEditing = () => {
    setAddCategory(false);
    setAddTask(false);
    setIsEditingCategory((prevState) => !prevState);
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
        <div>{category.name}</div>

        {isActive && (
          <img
            onClick={toggleIsEditing}
            style={{ height: "15px", filter: "invert(1)" }}
            src={Edit}
            alt="Edit"
            className="ml-1"
          />
        )}
      </label>
    </>
  );
}
