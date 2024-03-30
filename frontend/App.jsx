
// App's main component
function App() {
  return (
    <OuthProvider>
      <RouterProvider>
        <Router />
      </RouterProvider>
    </OuthProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
