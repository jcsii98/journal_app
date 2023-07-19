import React, { useState, useEffect } from "react";

export default function CategoryForm() {
  const [formData, setFormData] = useState({
    name: "",
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const storedToken = localStorage.getItem("token");
    const authorizationHeader = `Token ${storedToken}`;
    fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <form className="font-color-primary" onSubmit={handleSubmit}>
        <label htmlFor="category-name">Category Name: </label>
        <input
          onChange={handleChange}
          name="category-name"
          value={formData.name}
        />
      </form>
    </>
  );
}
