import React, { useState } from "react";

const API_URL = "http://127.0.0.1:3000/auth";

const AuthPage = () => {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordConfirm, setSignupPasswordConfirm] = useState("");
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupPassword !== signupPasswordConfirm) {
      alert("Passwords do not match");
      return;
    }

    const requestData = {
      email: signupEmail,
      password: signupPassword,
      password_confirmation: signupPasswordConfirm,
    };

    const response = await fetch(`${API_URL}`, {
      // Use the standard user registration route
      method: "POST",
      body: JSON.stringify(requestData),
      headers: { "Content-Type": "application/json" },
    });
    // store tokens on successful signup
    await handleAuthResponse(response);
    userSession();
    console.log(response);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/sign_in`, {
      // Use the standard user login route
      method: "POST",
      body: JSON.stringify({
        user: {
          email: signinEmail,
          password: signinPassword,
        },
      }),
      headers: { "Content-Type": "application/json" },
    });
    // store tokens on successful login
    await handleAuthResponse(response);
    userSession();
  };

  const handleSignout = (e) => {
    e.preventDefault();
    console.log("Logging out");
    // remove stored tokens
  };

  return (
    <div>
      <div>
        <h1>Signup</h1>
        <form id="sign_up_form" onSubmit={handleSignup}>
          <input
            type="email"
            id="signup-email"
            placeholder="Email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />
          <input
            type="password"
            id="signup-password"
            placeholder="Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
          <input
            type="password"
            id="signup-password-confirm"
            placeholder="Confirm Password"
            value={signupPasswordConfirm}
            onChange={(e) => setSignupPasswordConfirm(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div>
        <h1>Signin</h1>
        <form id="sign_in_form" onSubmit={handleSignin}>
          <input
            type="email"
            id="signin-email"
            placeholder="Email"
            value={signinEmail}
            onChange={(e) => setSigninEmail(e.target.value)}
          />
          <input
            type="password"
            id="signin-password"
            placeholder="Password"
            value={signinPassword}
            onChange={(e) => setSigninPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div>
        <button id="sign_out" onClick={handleSignout}>
          Sign Out
        </button>
      </div>
      <div id="user">
        {userEmail ? `Logged in as: ${userEmail}` : "Not authenticated"}
      </div>
    </div>
  );
};

export default AuthPage;
