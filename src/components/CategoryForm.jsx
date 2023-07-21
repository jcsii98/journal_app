import React, { useState } from "react";

export default function CategoryForm(props) {
  const { isEditing, setAddCategory, handleSubmitCategory } = props;
  const [formData, setFormData] = useState({
    category_name: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSubmitCategory(formData);
  };

  return (
    <>
      <div className="form-container">
        <div className="mb-3">
          <h1 className="fw-700 font-color-primary">
            {isEditing ? <>Edit Category</> : <>Submit a new category</>}
          </h1>
        </div>
        <form className="font-color-primary" onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="ff-secondary form-group mb-1">
              <label className="fw-400" htmlFor="category_name">
                Category name
              </label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="category_name"
                value={formData.category_name}
                placeholder="Category name"
              />
            </div>
          </div>
          <button className="btn-primary btn" type="submit">
            Submit Category
          </button>
        </form>
      </div>
    </>
  );
}
