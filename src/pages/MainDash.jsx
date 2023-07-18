import BodyButton from "../components/BodyButton";
import React, { useState, useEffect } from "react";

export default function MainDash() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log(storedToken);
    const authorizationHeader = `Token ${storedToken}`;
    fetch("http://127.0.0.1:3000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="main-dash">
        {/* nav with dynamically created categories */}
        {categories.length > 0 ? (
          <>
            {categories.map((category) => (
              <BodyButton key={category.id} category={category} />
            ))}
          </>
        ) : (
          <>
            <h2 className="font-color-secondary">Add a Category</h2>
          </>
        )}

        <div className="footer">
          <h1 className="font-color-primary"></h1>
        </div>
      </div>
    </>
  );
}
