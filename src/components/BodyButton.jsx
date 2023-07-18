export default function BodyButton() {
  const handleClick = () => {
    fetch("https://journal-api-cxui.onrender.com/auth/signin", {
      method: "POST", // Adjust the HTTP method as per your API endpoint requirements
      headers: {
        "Content-Type": "application/json",
        email: "jose3@email.com",
        password: "password", // Adjust the headers as needed
      },
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
      <button className="body-btn btn-link" onClick={handleClick}>
        <h2 className="font-color-primary">For Today</h2>
      </button>
    </>
  );
}
