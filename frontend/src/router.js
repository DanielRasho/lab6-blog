const VIEW_ROUTES = Object.freeze({
  LOGIN: "login",
  SIGNUP: "signup",
  USER: "user",
  POST: "post",
  BLOG_EDITOR: "blog-editor",
  HOME: "home",
});

// Context for storing the current View to show.
const ROUTER_CONTEXT = React.createContext({
  route: VIEW_ROUTES.HOME,
  props: {},
  navigate: (route, props = {}) => {},
});

function RouterProvider({ children }) {
  const [route, setRoute] = React.useState(VIEW_ROUTES.BLOG_EDITOR);
  const [props, setProps] = React.useState({});

  const navigate = (route, newProps={}) => {
    setProps({ ...newProps });
    setRoute(route);
  };

  return (
    <ROUTER_CONTEXT.Provider
      value={{ route: route, props: props, navigate: navigate}}
    >
      {children}
    </ROUTER_CONTEXT.Provider>
  );
}

// App Router, responsable of changin vue
function Router() {
  const { route, props, navigate } = React.useContext(ROUTER_CONTEXT);

  switch (route) {
    case VIEW_ROUTES.LOGIN:
      return <Login {...props} />;
    case VIEW_ROUTES.SIGNUP:
      return <SignUp {...props} />;
    case VIEW_ROUTES.USER:
      return <User {...props} />;
    case VIEW_ROUTES.BLOG_EDITOR:
      return <BlogEditor {...props} />;
    case VIEW_ROUTES.POST:
      return <Post {...props} />;
    case VIEW_ROUTES.HOME:
      return <Home {...props} />;
  }
}
