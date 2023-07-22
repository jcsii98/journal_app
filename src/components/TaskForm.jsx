import React, { useState } from "react";
export default function TaskForm(props) {
  const {
    handleDeleteTask,
    isEditingTask,
    setIsEditingTask,
    handleSubmitTask,
    handleEditTaskSubmit,
    error,
    setError,
    taskId,
  } = props;
  const [formData, setFormData] = useState({
    task_name: "",
    task_body: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isEditingTask) {
      console.log("Submit new task");
      handleSubmitTask(formData);
    } else {
      console.log("Edit task");
      handleEditTaskSubmit(formData);
    }
    event.preventDefault();
    console.log("Form data before submitting:", formData); // Log the formData before submitting

    console.log("Form data after submitting:", formData); // Log the formData after submitting
  };

  const cancelEdit = () => {
    setIsEditingTask(false);
  };
  return (
    <>
      <div className="form-container">
        <div className="mb-3">
          <h1 className="fw-700 font-color-primary">
            {isEditingTask ? <>Edit Task</> : <>Submit a new task</>}
          </h1>
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
                placeholder="Feed the dog"
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
                placeholder="Leave out food for Nala"
              ></input>
            </div>
          </div>
          {error && <div className="text-danger mb-3">{error}</div>}

          <button className="mr-1 btn-primary btn" type="submit">
            Submit Task
          </button>
          {isEditingTask && (
            <>
              <button
                onClick={cancelEdit}
                className="mr-1 btn-primary btn"
                type="button"
              >
                Cancel Edit
              </button>
              <button
                onClick={handleDeleteTask}
                className="mr-1 btn-primary btn"
                type="button"
              >
                Delete
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
}
