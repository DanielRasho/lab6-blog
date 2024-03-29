function SignUp (){

  const { navigate } = React.useContext(CURRENT_VIEW_CONTEXT);

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
    <div class="signup">
      <ButtonSimple
        style={{ position: "absolute", top: "2ch", left: "2ch" }}
        onClick={backHome}
      >
        <i class="fa-solid fa-arrow-left" style={{ marginRight: "1ch" }}></i>
        <span>Back</span>{" "}
      </ButtonSimple>
      <div class="signup-card">
        <img src="./media/gradient-noise-purple.png" alt="" />
        <h2 class="font-subDisplay">Sign up</h2>
        <h3> Join our community of artists </h3>
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
      <div class="login-helper">
        <span>Already have and account?</span> <a href="" onClick={(e) => { e.preventDefault(); navigate(VIEW_ROUTES.LOGIN)}}>Login here</a>
      </div>
    </div>
  );
}