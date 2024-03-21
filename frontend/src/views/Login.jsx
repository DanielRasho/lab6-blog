
function Login (){
    const {setCurrentView} = React.useContext(currentViewContext)

    const handleOnClick = (e) => { setCurrentView('home') }

    return (<div onClick={handleOnClick}> HOME </div>) 
}