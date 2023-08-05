import React, { useState, useEffect } from "react";

export default function LoginPage(props) {
  const { setIsLoggedIn } = props;
  // state variables for loginPage
  const [showSignup, setShowSignup] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // state variables for signup
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordConfirm, setSignupPasswordConfirm] = useState("");

  // state variables for signin
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");

  const API_URL = "https://journal-api-cxui.onrender.com/auth";

  const handleSignup = async (event) => {
    event.preventDefault();

    const requestData = {
      email: signupEmail,
      password: signupPassword,
      password_confirmation: signupPasswordConfirm,
    };

    const response = await fetch(`${API_URL}`, {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: { "Content-Type": "application/json" },
    });

    await handleAuthResponse(response);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/sign_in`, {
      method: "POST",
      body: JSON.stringify({
        email: signinEmail,
        password: signinPassword,
      }),
      headers: { "Content-Type": "application/json" },
    });

    await handleAuthResponse(response);
  };

  const handleSignupToggle = (event) => {
    event.preventDefault();
    setError("");
    setShowSignup((prevState) => !prevState);
    setSignupEmail("");
    setSignupPassword("");
    setSignupPasswordConfirm("");
    setSigninEmail("");
    setSigninPassword("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    if (showSignup) {
      handleSignup(event);
    } else {
      handleSignin(event);
    }
  };

  const handleAuthResponse = async (response) => {
    if (response.ok) {
      console.log("response is ok");
      const responseData = await response.json();

      if (
        responseData.data &&
        responseData.data.email &&
        responseData.data.uid &&
        !responseData.data.errors
      ) {
        localStorage.setItem(
          "access-token",
          response.headers.get("access-token")
        );
        localStorage.setItem("uid", response.headers.get("uid"));
        localStorage.setItem("client", response.headers.get("client"));

        setIsLoggedIn(true);
        setError("");
      } else {
        console.error("Authentication Error: Invalid response data");
      }
    } else {
      console.log("response is not ok");

      const errorResponseData = await response.json();
      if (errorResponseData.errors && errorResponseData.errors.full_messages) {
        setError(errorResponseData.errors.full_messages.join(", "));
      } else if (errorResponseData.errors) {
        setError(errorResponseData.errors.join(", "));
      } else {
        setError("Authentication Error: " + response.status);
      }
    }
    setIsLoading(false);
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
            {showSignup ? (
              <>
                <div className="form-group mb-1">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="form-control"
                    placeholder="sample@email.com"
                  />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="password-confirmation">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="password_confirmation"
                    value={signupPasswordConfirm}
                    onChange={(e) => setSignupPasswordConfirm(e.target.value)}
                    className="form-control"
                    placeholder="Password confirmation"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group mb-1">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={signinEmail}
                    onChange={(e) => setSigninEmail(e.target.value)}
                    className="form-control"
                    placeholder="sample@email.com"
                  />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={signinPassword}
                    onChange={(e) => setSigninPassword(e.target.value)}
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
              </>
            )}
            {isLoading && <div className="form-group mb-1">Loading</div>}
            {error && <div className="text-danger mb-3">{error}</div>}
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
                className="mx-3 btn-link"
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
