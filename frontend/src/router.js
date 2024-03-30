
const VIEW_ROUTES = Object.freeze({
  LOGIN: 'login',
  SIGNUP: 'signup',
  USER: 'user',
  POST: 'post',
  HOME: 'home',
})

// Context for storing the current View to show.
const ROUTER_CONTEXT = React.createContext({
  route: VIEW_ROUTES.HOME,
  navigate: (view) => {},
});


function RouterProvider({ children }) {
  const [route, setRoute] = React.useState(VIEW_ROUTES.HOME);

  const navigate = (route, props) => {
    setRoute(route)
  }

  return (
    <ROUTER_CONTEXT.Provider value={{ route: route, navigate: setRoute}}>
      {children}
    </ROUTER_CONTEXT.Provider>
  );
}



// App Router, responsable of changin vue
function Router() {
  const { route, navigate } = React.useContext(ROUTER_CONTEXT);

  switch (route) {
    case VIEW_ROUTES.LOGIN:
      return <Login></Login>;
    case VIEW_ROUTES.SIGNUP:
      return <SignUp></SignUp>;
    case VIEW_ROUTES.USER:
      return <User></User>;
    case VIEW_ROUTES.POST:
      return <Post></Post>;
    case VIEW_ROUTES.HOME:
      return <Home />;
  }
}