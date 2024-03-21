

// Context for storing the current View to show.
const currentViewContext = React.createContext({
  currentView : 'home',
  setCurrentView: (view) => {}
});

// App's main component
function App(){
  
  const [currentView, setCurrentView] = React.useState('login')
  
  return (<currentViewContext.Provider value={{currentView, setCurrentView}}>
    <Router></Router>
  </currentViewContext.Provider>)
}

// App Router, responsable of changin vue 
function Router(){
  
  const { currentView } = React.useContext(currentViewContext)

  switch (currentView) {
    case 'login':
      return <Login></Login>
    case 'signup':
      return <SignUp></SignUp>
    case 'post':
      return <Post></Post>
    case 'user':
      return <User></User>
    default:
      return <Home></Home>
  }
}

ReactDOM.render(
    <App/>
  , document.getElementById('root'));