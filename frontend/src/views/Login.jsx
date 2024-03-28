function Login() {
  const { navigate } = React.useContext(CURRENT_VIEW_CONTEXT);

  const handleOnClick = (e) => {
    navigate("home");
  };

  return <div onClick={handleOnClick}> HOME </div>;
}
