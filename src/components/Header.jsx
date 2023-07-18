export default function Header(props) {
  const { isLoggedIn, setIsLoggedIn } = props;
  const handleSignout = () => {
    const storedToken = localStorage.getItem("token");
    console.log(storedToken);
    const authorizationHeader = `Token ${storedToken}`;
    fetch("http://127.0.0.1:3000/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    localStorage.removeItem("token");
    console.log(localStorage.getItem("token"));
    setIsLoggedIn(null);
    // render login page
  };

  return (
    <div className="header display-flex flex-row bb-1 mb-7">
      <h1 className="font-color-primary">{`Hello, ${localStorage.getItem(
        "userEmail"
      )}!`}</h1>
      {isLoggedIn ? (
        <>
          <button
            type="button"
            className="header-btn"
            onClick={handleSignout}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
