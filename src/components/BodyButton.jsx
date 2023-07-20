import React, { useState, useEffect } from "react";
import Edit from "../assets/Edit.png";
export default function BodyButton(props) {
  const {
    setIsTokenValid,
    setIsLoading,
    category,
    activeTab,
    handleActiveTabChange,
    setCategoryData,
    toggleEdit,
    setToggleEdit,
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
    const url = `https://journal-api-cxui.onrender.com/categories/${categoryId}/tasks/`;

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
  return (
    <>
      <label
        className={`btn-show-edit ff-primary fw-400 btn btn-secondary ${
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
        {isActive && (
          <img
            className="mx-1 hover-scale"
            style={{ height: "15px", filter: "invert(100%)" }}
            src={Edit}
            alt="Edit"
            onClick={setToggleEdit}
          />
        )}
        {buttonName}
      </label>
    </>
  );
}
