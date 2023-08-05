export default function Header(props) {
  const { isLoggedIn, setIsLoggedIn } = props;

  const handleSignout = (e) => {
    e.preventDefault();
    console.log("Logging out");
    // Remove stored tokens or any other logic for handling signout
    localStorage.removeItem("access-token");
    localStorage.removeItem("uid");
    localStorage.removeItem("client");
    setIsLoggedIn(false);
  };

  return (
    <div className="ff-primary header align-items-center display-flex flex-row bb-1 mb-1">
      {isLoggedIn ? (
        <h1 className="fw-700 font-color-secondary">{`Hello, ${localStorage.getItem(
          "uid"
        )}!`}</h1>
      ) : (
        <>
          <h1 className="fw-700 font-color-secondary">My Journal</h1>
        </>
      )}

      {isLoggedIn && (
        <>
          <div className="header-btns">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleSignout}
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
