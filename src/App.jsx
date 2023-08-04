// function App() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isTokenValid, setIsTokenValid] = useState(false);
//   const rememberMe = localStorage.getItem("token");
//   const [isLoggedIn, setIsLoggedIn] = useState(!!rememberMe);
//   const [userDetails, setUserDetails] = useState({});
//   const [addCategory, setAddCategory] = useState(false);
//   const [addTask, setAddTask] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState(null);

//   useEffect(() => {
//     const checkTokenValidity = () => {
//       const storedToken = localStorage.getItem("token");
//       const storedUserId = localStorage.getItem("userId");
//       if (storedToken && storedUserId) {
//         const url = `http://127.0.0.1:3000/user/${storedUserId}`;
//         fetch(url, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${storedToken}`,
//           },
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             console.log(data);
//             if (data.token === storedToken) {
//               setUserDetails(data);
//               setIsTokenValid(true);
//             } else {
//               setIsTokenValid(false);
//               localStorage.clear();
//             }
//             setIsLoading(false); // Hide the loading screen after token validation
//           })
//           .catch((error) => {
//             setIsTokenValid(false);
//             localStorage.clear();
//             console.error(error);
//             setIsLoading(false); // Hide the loading screen in case of an error
//           });
//       } else {
//         setIsTokenValid(false);
//         localStorage.clear();
//         setIsLoading(false); // Hide the loading screen when there's no token
//       }
//     };
//     checkTokenValidity();
//   }, []); // Empty dependency array to call the function once on initial render

//   return (
//     <>
//       {isLoading ? (
//         <>
//           <h1 className="fw-700 font-color-secondary">Loading...</h1>
//         </>
//       ) : (
//         <>
//           <div className="outer-wrapper">
//             <Header
//               activeTab={activeTab}
//               setActiveTab={setActiveTab}
//               isEditing={isEditing}
//               setIsEditing={setIsEditing}
//               addCategory={addCategory}
//               setAddTask={setAddTask}
//               setAddCategory={setAddCategory}
//               isTokenValid={isTokenValid}
//               setIsTokenValid={setIsTokenValid}
//               isLoggedIn={isLoggedIn}
//               setIsLoggedIn={setIsLoggedIn}
//             />
//             <div className="app-wrapper border-radius-1 py-4 px-4 display-flex flex-column">
//               {isTokenValid && isLoggedIn ? (
//                 <MainDash
//                   activeTab={activeTab}
//                   setActiveTab={setActiveTab}
//                   isEditing={isEditing}
//                   setIsEditing={setIsEditing}
//                   setAddTask={setAddTask}
//                   addTask={addTask}
//                   addCategory={addCategory}
//                   setAddCategory={setAddCategory}
//                   setIsTokenValid={setIsTokenValid}
//                   isLoggedIn={isLoggedIn}
//                   setIsLoggedIn={setIsLoggedIn}
//                 />
//               ) : (
//                 <LoginPage
//                   setIsTokenValid={setIsTokenValid}
//                   isTokenValid={isTokenValid}
//                   isLoggedIn={isLoggedIn}
//                   setIsLoggedIn={setIsLoggedIn}
//                 />
//               )}
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import MainDash from "./pages/MainDash";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <div className="outer-wrapper">
        {" "}
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="app-wrapper border-radius-1 py-4 px-4 display-flex flex-column">
          {isLoggedIn ? (
            <MainDash />
          ) : (
            <LoginPage setIsLoggedIn={setIsLoggedIn} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
