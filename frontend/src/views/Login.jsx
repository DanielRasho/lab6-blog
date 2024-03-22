
function Login (){
    const {currentView, setCurrentView} = React.useContext(CURRENT_VIEW_CONTEXT)

    const handleOnClick = (e) => { setCurrentView('home') }

    return (<div onClick={handleOnClick}> HOME </div>) 
}