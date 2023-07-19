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
          // store token in localstorage
          localStorage.setItem("token", data.token);
          console.log("Token: " + localStorage.getItem("token"));

          // store userData
          const userProperties = ["id", "email", "name"];
          userProperties.forEach((property) => {
            localStorage.setItem(
              `user${property.charAt(0).toUpperCase() + property.slice(1)}`,
              data.user[property]
            );
            console.log(
              `${property.charAt(0).toUpperCase() + property.slice(1)}: ` +
                localStorage.getItem(
                  `user${property.charAt(0).toUpperCase() + property.slice(1)}`
                )
            );
          });
          // localStorage.setItem("userId", data.user.id);
          // localStorage.setItem("userEmail", data.user.email);
          // localStorage.setItem("userName", data.user.name);
          // console.log("Name: " + localStorage.getItem("userName"));
          // console.log("ID: " + localStorage.getItem("userId"));

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
                <label htmlFor="email">Email address: </label>
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
                <label htmlFor="password">Password: </label>
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
