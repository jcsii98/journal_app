import React, { useState } from "react";

export default function LoginPage(props) {
  const { isLoggedIn, setIsLoggedIn } = props;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://127.0.0.1:3000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: formData.email,
          password: formData.password,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          // localStorage.setItem("userId", data.user.id);
          // localStorage.setItem("userEmail", data.user.email);
          console.log(localStorage.getItem("userId"));
          console.log(localStorage.getItem("token"));
          console.log(localStorage.getItem("userEmail"));
          setIsLoggedIn(true);
        }
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
          <h2 className="font-color-primary">Log in</h2>
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
