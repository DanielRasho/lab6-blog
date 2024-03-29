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

  let postsInfo = [
    {
      date: "mar 13,2024",
      title: "hello morning",
      tags: ["allow", "artist"],
      thumbnail: "https://m.media-amazon.com/images/I/61HP2OWLvkL.jpg",
    },
    {
      date: "mar 13,2024",
      title: "hello morning",
      tags: ["allow", "artist"],
      thumbnail: "https://i.ytimg.com/vi/HaK5r_ejdNA/maxresdefault.jpg"
    },
  ];

  let posts = postsInfo.map((post) => {
    return (
      <PostCard
        date={post.date}
        title={post.title}
        tags={post.tags}
        thumbnail={post.thumbnail}
      ></PostCard>
    );
  });

  return (
    <>
      <TopBar navLinks={navLinks} owo={["hello", "adios"]} />
      {posts}
    </>
  );
}
