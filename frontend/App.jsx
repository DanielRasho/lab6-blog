function App(){
  
  const [currentView, setView] = React.useState('home');
  
  return <h1> This is Smaugthur {currentView}</h1>
}

ReactDOM.render(<App />, document.getElementById('root'));