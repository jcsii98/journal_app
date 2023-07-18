import React, { useState } from "react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://127.0.0.1:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  };

  return (
    <>
      <div className="bb-1 mb-1">
        <div className="mb-3">
          <h2 className="font-color-primary">No account yet?</h2>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="font-color-primary">
            <div className="mb-7">
              <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1">Email address: </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="sample@email.com"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleInputPassword1">Password: </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleInputPassword1">
                  Confirm Password:{" "}
                </label>
                <input
                  type="password"
                  name="password-confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Password"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
