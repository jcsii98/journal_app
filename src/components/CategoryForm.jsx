import React, { useState } from "react";

export default function CategoryForm(props) {
  const {
    setIsEditing,
    isEditing,
    handleUpdateCategory,
    setAddCategory,
    handleSubmitCategory,
    error,
    setError,
    handleDeleteCategory,
    formIsLoading,
    setFormIsLoading,
  } = props;
  const [formData, setFormData] = useState({
    category_name: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    setError(null);
    event.preventDefault();
    if (!isEditing) {
      handleSubmitCategory(formData);
    } else {
      handleUpdateCategory(formData);
    }
  };
  const cancelEdit = () => {
    setFormIsLoading(false);
    setIsEditing(false);
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
                placeholder="Office Tasks"
              />
            </div>
          </div>
          {error && <div className="text-danger mb-3">{error}</div>}
          {formIsLoading && <div className="text-muted mb-3">Loading</div>}
          {isEditing && (
            <>
              <button
                onClick={cancelEdit}
                className="mr-1 btn-primary btn"
                type="button"
              >
                Cancel Edit
              </button>
              <button
                onClick={handleDeleteCategory}
                className="mr-1 btn-primary btn"
                type="button"
              >
                Delete
              </button>
            </>
          )}

          <button className="mr-1 btn-primary btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
