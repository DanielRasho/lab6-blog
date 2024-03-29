// Context for storing the current View to show.
const CURRENT_VIEW_CONTEXT = React.createContext({
  currentView: VIEW_ROUTES.HOME,
  navigate: (view) => {},
});

// Context for storing the current View to show.
const AUTH_CONTEXT = React.createContext({
  token: "",
  setToken: (token) => {},
});

function RouterProvider({ children }) {
  const [currentView, setCurrentView] = React.useState("user");

  return (
    <CURRENT_VIEW_CONTEXT.Provider
      value={{ currentView: currentView, navigate: setCurrentView }}
    >
      {children}
    </CURRENT_VIEW_CONTEXT.Provider>
  );
}

function OuthProvider({ children }) {
  const [token, setOuthToken] = React.useState("");

  React.useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setOuthToken(token);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <AUTH_CONTEXT.Provider value={{ token: token, setToken: setOuthToken }}>
      {children}
    </AUTH_CONTEXT.Provider>
  );
}

// App Router, responsable of changin vue
function Router() {
  const { currentView } = React.useContext(CURRENT_VIEW_CONTEXT);

  switch (currentView) {
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

// App's main component
function App() {
  return (
    <OuthProvider>
      <RouterProvider>
        <Router />
      </RouterProvider>
    </OuthProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
