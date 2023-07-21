import React, { useState } from "react";
export default function TaskForm(props) {
  const { handleSubmitTask } = props;
  const [formData, setFormData] = useState({
    task_name: "",
    task_body: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data before submitting:", formData); // Log the formData before submitting
    handleSubmitTask(formData);
    console.log("Form data after submitting:", formData); // Log the formData after submitting
  };

  return (
    <>
      <div className="form-container">
        <div className="mb-3">
          <h1 className="fw-700 font-color-primary">Submit a new task</h1>
        </div>
        <form className="font-color-primary" onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="ff-secondary form-group mb-1">
              <label className="fw-400" htmlFor="task_name">
                Task name
              </label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="task_name"
                value={formData.task_name}
                placeholder="Task name"
              ></input>
            </div>
            <div className="form-group mb-1">
              <label className="fw-400" htmlFor="task_name">
                Task details
              </label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="task_body"
                value={formData.task_body}
                placeholder="Task details here"
              ></input>
            </div>
          </div>
          <button className="btn-primary btn" type="submit">
            Submit Task
          </button>
        </form>
      </div>
    </>
  );
}
