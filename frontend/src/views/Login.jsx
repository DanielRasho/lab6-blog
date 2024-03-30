function Login() {
  const { navigate } = React.useContext(ROUTER_CONTEXT);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const backHome = (e) => {
    navigate("home");
  };

  return (
    <div class="login">
      <ButtonSimple
        style={{ position: "absolute", top: "2ch", left: "2ch" }}
        onClick={backHome}
      >
        <i class="fa-solid fa-arrow-left" style={{ marginRight: "1ch" }}></i>
        <span>Back</span>{" "}
      </ButtonSimple>
      <div class="login-card">
        <img src="./media/gradient-noise-purple.png" alt="" />
        <h2 class="font-subDisplay">Log in</h2>
        <h3> Get ready to share your advances </h3>
        <input
          type="text"
          required="required"
          autoFocus="autofocus"
          value={username}
          onChange={handleUsername}
          placeholder="Username"
          maxLength={30}
        />
        <input
          type="password"
          value={password}
          onChange={handlePassword}
          placeholder="Password"
          maxLength={30}
        />
        <button> Sign in </button>
      </div>
      <div class="signup-helper">
        <span>No account yet?</span> <a href="" onClick={(e) => { e.preventDefault(); navigate(VIEW_ROUTES.SIGNUP)}}>Sign up now</a>
      </div>
    </div>
  );
}
