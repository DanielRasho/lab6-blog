function Home() {
  const { currentView, navigate } = React.useContext(CURRENT_VIEW_CONTEXT);

  const navLinks = [
    {
      content: "Trending",
      onClick: () => navigate(VIEW_ROUTES.HOME),
    },
    {
      content: "About Us",
      onClick: () => navigate(VIEW_ROUTES.HOME),
    },
  ];

  return (
    <>
      <TopBar navLinks={navLinks} owo={["hello", "adios"]} />
    </>
  );
}
