

// Context for storing the current View to show.
const CURRENT_VIEW_CONTEXT = React.createContext({
  currentView : VIEW_ROUTES.HOME,
  setCurrentView: (view) => {}
});

// Context for storing the current View to show.
const AUTH_CONTEXT = React.createContext({
  token : VIEW_ROUTES.HOME,
  setToken: (token) => {}
});

function RouterProvider({children}){

  const [currentView, setCurrentView] = React.useState('home')

  return (
    <CURRENT_VIEW_CONTEXT.Provider value={{currentView, setCurrentView}}>
      {children}
    </CURRENT_VIEW_CONTEXT.Provider>
  )
}

function OuthProvider({children}){

  const [token, currentToken] = React.useState('home')

  React.useEffect(() => {
    const token = localStorage.getItem('token')
    setToken(token)
  }, [])

  React.useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <CURRENT_VIEW_CONTEXT.Provider value={{currentView, setCurrentView}}>
      {children}
    </CURRENT_VIEW_CONTEXT.Provider>
  )
}


// App Router, responsable of changin vue 
function Router(){
  
  const { currentView } = React.useContext(CURRENT_VIEW_CONTEXT)

  switch (currentView) {
    case VIEW_ROUTES.LOGIN:
      return <Login></Login>
    case VIEW_ROUTES.SIGNUP:
      return <SignUp></SignUp>
    case VIEW_ROUTES.USER:
      return <User></User>
    case VIEW_ROUTES.POST:
      return <Post></Post>
    case VIEW_ROUTES.HOME:
      return <Home/>
  }
}

// App's main component
function App(){
  return (
  <RouterProvider>
    <Router />
  </RouterProvider>
  )
}


ReactDOM.render(
    <App/>
  , document.getElementById('root'));