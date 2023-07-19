import BodyButton from "../components/BodyButton";
import React, { useState, useEffect } from "react";
import CategoryForm from "../components/CategoryForm";

export default function MainDash() {
  const [categories, setCategories] = useState([]);
  const [addCategory, setAddCategory] = useState(false);

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
  const toggleAddCategory = () => {
    setAddCategory((prevState) => !prevState);
  };
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
            {" "}
            {addCategory ? (
              // addCategory Form here
              <CategoryForm />
            ) : (
              <>
                <div className="my-1">
                  {" "}
                  <h2 className="font-color-secondary">
                    Pretty quiet today...
                  </h2>
                </div>
              </>
            )}
          </>
        )}

        <div className="footer">
          <button
            onClick={toggleAddCategory}
            type="button"
            className="btn-link"
          >
            <h3 className="font-color-primary">Add a Category</h3>
          </button>
        </div>
      </div>
    </>
  );
}
