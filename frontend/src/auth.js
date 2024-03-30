
// Context for storing the current View to show.
const AUTH_CONTEXT = React.createContext({
  token: "",
  setToken: (token) => {},
});


function OuthProvider({ children }) {
  const [token, setOuthToken] = React.useState("");

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