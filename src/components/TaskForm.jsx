import React, { useState } from "react";
export default function TaskForm(props) {
  const {
    setTaskData,
    taskData,
    handleDeleteTask,
    isEditingTask,
    setIsEditingTask,
    handleSubmitTask,
    handleEditTaskSubmit,
    error,
    setError,
    taskId,
    formIsLoading,
    setFormIsLoading,
  } = props;
  const [formData, setFormData] = useState({
    task_name: taskData.name,
    task_body: taskData.body,
    task_due_date: taskData.due_date || "",
  });

  const cancelEdit = () => {
    setTaskData("");
    setError("");
    setFormIsLoading(false);
    setIsEditingTask(false);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setFormIsLoading(true);
    // Check the value of formData.task_due_date
    console.log("Due Date Value:", formData.task_due_date);

    if (!isEditingTask) {
      console.log("Submit new task");
      handleSubmitTask({
        task_name: formData.task_name,
        task_body: formData.task_body,
        task_due_date: formData.task_due_date,
      });
    } else {
      console.log("Edit task");
      handleEditTaskSubmit({
        task_name: formData.task_name,
        task_body: formData.task_body,
        task_due_date: formData.task_due_date,
      });
    }
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
            <div className="form-group mb-1">
              <label className="fw-400" htmlFor="task_name">
                Due date (optional)
              </label>
              <input
                type="date"
                className="form-control"
                onChange={handleChange}
                name="task_due_date"
                value={formData.task_due_date}
              ></input>
            </div>
          </div>
          {formIsLoading && <div className="text-muted mb-3">Loading</div>}
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
