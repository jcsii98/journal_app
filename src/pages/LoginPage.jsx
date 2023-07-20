import React, { useState } from "react";

export default function LoginPage(props) {
  const { isTokenValid, setIsTokenValid, isLoggedIn, setIsLoggedIn } = props;
  const [showSignup, setShowSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    password_confirmation: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSignupToggle = (event) => {
    event.preventDefault();
    setShowSignup((prevState) => !prevState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit called");
    const url = showSignup
      ? "https://journal-api-cxui.onrender.com/auth/signup"
      : "https://journal-api-cxui.onrender.com/auth/signin";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          ...(showSignup && {
            name: formData.name,
            password_confirmation: formData.password_confirmation,
          }),
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
          setIsTokenValid(true);
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="bb-1 mb-1">
        <div className="mb-3">
          <h2 className="font-color-primary">
            {showSignup ? <>Signup</> : <>Log in</>}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="font-color-primary">
          <div className="mb-3">
            {showSignup && (
              <>
                <div className="form-group mb-1">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
              </>
            )}
            <div className="form-group mb-1">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="sample@email.com"
              />
            </div>
            <div className="form-group mb-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Password"
              />
            </div>

            {showSignup && (
              <>
                <div className="form-group mb-1">
                  <label htmlFor="password-confirmation">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Password confirmation"
                  />
                </div>
              </>
            )}
          </div>

          <div className="button-container">
            {" "}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <p className="text-muted">
              <button
                type="button"
                onClick={handleSignupToggle}
                className="mx-3 btn btn-link"
              >
                {" "}
                {showSignup ? (
                  <>Already have an account? Login here</>
                ) : (
                  <>Don't have an account? Sign up here</>
                )}
              </button>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
