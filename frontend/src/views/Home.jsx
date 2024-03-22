
function Home(){
    const {currentView, setCurrentView} = React.useContext(CURRENT_VIEW_CONTEXT)

    return (
    <> 
        <nav className="topBar">
            <button>
                <img src="./media/brushWireLogo.png" alt="BrushWire Logo" />
            </button>

            <div class="search-bar">
                <input class="search-input" type="text" placeholder="Search" />
                <button class="search-submit" type="submit">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>

            <ButtonSimple>Home</ButtonSimple>
            <ButtonSimple onClick={() => setCurrentView('login')}>Login</ButtonSimple>
            <ButtonImportant > 
                <i class="fa-solid fa-arrow-right"></i>
                <span>Sign Up</span>
                <i class="fa-solid fa-arrow-right"></i>
            </ButtonImportant>
        </nav>
    </>)
}

Home.propTypes = { 
    color : PropTypes.number
}

Home.defaultProps = {
    color : 'adios'
}