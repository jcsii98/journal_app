import React, { useState, useEffect } from "react";

export default function BodyButton(props) {
  const {
    setIsLoading,
    category,
    activeTab,
    handleActiveTabChange,
    setCategoryData,
  } = props;
  let buttonName = category.name;
  const handleLabelClick = () => {
    handleActiveTabChange(category.id);
    fetchCategoryData(category.id);
  };

  const fetchCategoryData = (categoryId) => {
    const storedToken = localStorage.getItem("token");
    const authorizationHeader = `Token ${storedToken}`;
    const url = `http://localhost:3000/categories/${categoryId}/tasks/`;

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
        setCategoryData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <label
        className={`ff-primary fw-400 btn btn-secondary ${
          activeTab === category.id ? "active" : ""
        }`}
        onClick={handleLabelClick}
      >
        <input
          type="radio"
          name="options"
          id={category.id}
          autoComplete="off"
          style={{ display: "none" }}
        />
        {buttonName}
      </label>
    </>
  );
}
