
// Context for storing the current View to show.
const AUTH_CONTEXT = React.createContext({
  token: "",
  setToken: (token) => {},
});


function OuthProvider({ children }) {
  const [token, setOuthToken] = React.useState("eyJhbGciOiJIUzI1NiJ9.c21hdWc.7yGTYJRMY5cjXsuYKqtR2KIDwIwoa1opat7-3nUXdQw");

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