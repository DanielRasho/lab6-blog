function ButtonSimple ({children, style, onClick}){
    return <button onClick={onClick} style={style} className="btn-simple font-btn"> 
        {children} 
    </button>
}