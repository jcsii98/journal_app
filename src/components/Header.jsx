export default function Header(props) {
  const {
    addCategory,
    setAddCategory,
    isLoggedIn,
    setIsLoggedIn,
    setIsTokenValid,
    isTokenValid,
  } = props;
  const handleSignout = () => {
    localStorage.clear();
    console.log("Token: " + localStorage.getItem("token"));
    setIsLoggedIn(false);
    setIsTokenValid(false);
    // render login page
  };
  const nameExists = localStorage.getItem("userName");
  const toggleAddCategory = () => {
    setAddCategory((prevState) => !prevState);
    console.log("toggle clicked");
  };
  return (
    <div className="ff-primary header align-items-center display-flex flex-row bb-1 mb-1">
      {nameExists && isTokenValid ? (
        <h1 className="fw-700 font-color-secondary">{`Hello, ${localStorage.getItem(
          "userName"
        )}!`}</h1>
      ) : (
        <>
          <h1 className="fw-700 font-color-secondary">My Journal</h1>
        </>
      )}

      {isTokenValid && (
        <>
          <div className="header-btns">
            <button
              onClick={toggleAddCategory}
              type="button"
              className="mx-3 btn-secondary btn"
            >
              Add category
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleSignout}
            >
              Signout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
