export default function Header(props) {
  const { isLoggedIn, setIsLoggedIn, setIsTokenValid } = props;
  const handleSignout = () => {
    localStorage.clear();
    console.log("Token: " + localStorage.getItem("token"));
    setIsLoggedIn(false);
    setIsTokenValid(false);
    // render login page
  };
  const nameExists = localStorage.getItem("userName");
  return (
    <div className="ff-primary header align-items-center display-flex flex-row bb-1 mb-1">
      {nameExists ? (
        <h1 className="fw-700 font-color-secondary">{`Hello, ${localStorage.getItem(
          "userName"
        )}!`}</h1>
      ) : (
        <>
          <h1 className="fw-700 font-color-secondary">My Journal</h1>
        </>
      )}

      {isLoggedIn ? (
        <>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleSignout}
          >
            Signout
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
