import React, { useState } from "react";

export default function LoginPage(props) {
  const { isTokenValid, setIsTokenValid, isLoggedIn, setIsLoggedIn } = props;
  const [showSignup, setShowSignup] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    resetForm();
    setError();
  };

  const handleSignup = (formData) => {
    setIsLoading(true);
    setError(null);
    const url = "http://127.0.0.1:3000/auth/signup";
    const method = "POST";
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 422) {
            return response.json().then((data) => {
              if (data.email && data.email.length > 0) {
                throw new Error(`Email ${data.email[0]}`);
              } else {
                throw new Error("Credentials invalid");
              }
            });
          } else {
            throw new Error("Network response was not ok");
          }
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        console.log(data);

        if (data.token && data.user) {
          // Handle successful signup

          // store token n user deets
          localStorage.setItem("token", data.token);

          const userProperties = ["id", "email", "name"];
          userProperties.forEach((property) => {
            localStorage.setItem(
              `user${property.charAt(0).toUpperCase() + property.slice(1)}`,
              data.user[property]
            );
          });
          setIsTokenValid(true);
          setIsLoggedIn(true);
        } else if (data.error) {
          setError(data.error);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  };

  const handleSignin = (formData) => {
    setIsLoading(true);
    setError(null);
    const url = "http://127.0.0.1:3000/auth/signin";
    fetch(url, {
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
      .then((response) => {
        if (!response.ok) {
          setIsLoading(false);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.user && data.token !== "not found") {
          setIsLoading(false);
          // Successful authentication
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
        } else {
          setIsLoading(false);
          setError("User not found");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
        setError(error);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit called");
    if (!showSignup) {
      handleSignin(formData);
    } else {
      handleSignup(formData);
    }
  };
  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      name: "",
      password_confirmation: "",
    });
  };
  return (
    <>
      <div className="form-container mb-1">
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
            {isLoading && <div>Loading</div>}
            {error && <div className="text-danger">{error}</div>}
          </div>

          <div className="button-container">
            {" "}
            <button type="submit" className="btn btn-secondary">
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
