import React, { useState } from "react";

export default function CategoryForm(props) {
  const { setAddCategory, handleSubmitCategory } = props;
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
      <div className="form-group my-4">
        {" "}
        <form className="card font-color-primary" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control card-body"
            onChange={handleChange}
            name="category_name"
            value={formData.category_name}
            placeholder="Category Name"
          />
        </form>
      </div>
    </>
  );
}
