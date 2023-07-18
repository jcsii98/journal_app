export default function BodyButton() {
  const handleClick = () => {
    fetch("https://journal-api-cxui.onrender.com/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: "jose3@email.com",
          password: "password",
        },
      }),
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
      <button type="button" className="body-btn btn-link" onClick={handleClick}>
        <h2 className="font-color-primary">For Today</h2>
      </button>
    </>
  );
}
