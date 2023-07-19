export default function Header(props) {
  const { isLoggedIn, setIsLoggedIn } = props;
  const handleSignout = () => {
    localStorage.clear();
    console.log("Token: " + localStorage.getItem("token"));
    setIsLoggedIn(null);
    // render login page
  };

  return (
    <div className="header display-flex flex-row bb-1 mb-7">
      <h1 className="font-color-primary">{`Hello, ${localStorage.getItem(
        "userName"
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
