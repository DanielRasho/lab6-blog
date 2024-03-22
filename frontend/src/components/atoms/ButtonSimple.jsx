function ButtonSimple ({children, onClick}){
    return <button onClick={onClick} className="btn-simple font-btn"> 
        {children} 
    </button>
}