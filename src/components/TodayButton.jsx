import React, { useState, useEffect } from "react";

export default function TodayButton(props) {
  const [isActive, setIsActive] = useState(false);

  const { activeTab, setAddCategory, setAddTask, setActiveTab, setIsEditing } =
    props;
  const handleLabelClick = () => {
    if (
      !isActive &&
      (event.target.tagName === "LABEL" || event.target.tagName === "DIV")
    ) {
      setAddCategory(false);
      setAddTask(false);
      setIsEditing(false);
      setIsActive(true);
    } else {
      setActiveTab(null);
    }
  };

  useEffect(() => {
    setIsActive(activeTab === "todo-today");
  }, [activeTab]);
  return (
    <>
      {" "}
      <label
        className={`body-btn btn-show-edit ff-primary fw-400 btn btn-secondary ${
          activeTab === "todo-today" ? "active" : ""
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
          id="todo-today"
          autoComplete="off"
          style={{ display: "none" }}
        />
        <div>Today</div>
      </label>
    </>
  );
}
