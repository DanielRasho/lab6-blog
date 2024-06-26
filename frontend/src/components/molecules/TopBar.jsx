function TopBar({ navLinks = []}) {
  const { navigate } = React.useContext(ROUTER_CONTEXT);

  let isLogged = React.useContext(AUTH_CONTEXT).token == '' ? false : true;

  let links = navLinks.map((navLink) => {
    return (
      <ButtonSimple onClick={navLink.onClick}> {navLink.content} </ButtonSimple>
    );
  });

  return (
    <>
      <nav className="topBar">
        <button onClick={() => navigate(VIEW_ROUTES.HOME)}>
          <img src="./media/brushWireLogo.png" alt="BrushWire Logo" />
        </button>
        <div class="search-bar">
          <input class="search-input" type="text" placeholder="Search" />
          <button class="search-submit" type="submit">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        {links}

        <LoginButtons isLogged={isLogged}/>
      </nav>
    </>
  );
}

function LoginButtons({ isLogged }) {

  const { navigate } = React.useContext(ROUTER_CONTEXT);
  if (isLogged) {
    return (
      <ButtonImportant onClick={() => navigate(VIEW_ROUTES.USER)}>
        <i class="fa-solid fa-arrow-right"></i>
        <span>Profile</span>
        <i class="fa-solid fa-arrow-right"></i>
      </ButtonImportant>
    );
  } else {
    return (
      <>
        <ButtonSimple onClick={() => navigate(VIEW_ROUTES.LOGIN)}>
          Login
        </ButtonSimple>
        <ButtonImportant onClick={() => navigate(VIEW_ROUTES.SIGNUP)}>
          <i class="fa-solid fa-arrow-right"></i>
          <span>Sign Up</span>
          <i class="fa-solid fa-arrow-right"></i>
        </ButtonImportant>
      </>
    );
  }
}
