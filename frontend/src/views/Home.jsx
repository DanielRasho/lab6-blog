function Home() {
  const { navigate } = React.useContext(ROUTER_CONTEXT);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  let [postsInfo, setPostsInfo] = React.useState([]);

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

  React.useEffect(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/", {
        method: "get",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setPostsInfo(data.posts);
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false);
    }
  }, []);

  let posts = postsInfo.map((post) => {
    return (
      <PostCard
        id={post.id}
        date={formatDate(post.publishDate)}
        title={post.title}
        tags={post.tags}
        thumbnail={post.thumbnailPath}
      ></PostCard>
    );
  });

  return (
    <>
      <TopBar navLinks={navLinks} />
      <div class="home-header font-display">
        <h1>Blog spotlight</h1>
        <div class="gradient-container">
          <img src="./media/gradient-noise-green-red.png" alt="" />
        </div>
      </div>

      <div class="loader-container">
        <Loader isLoading={isLoading}></Loader>
      </div>
    
      <div>
        <ErrorLoading isError={isError} message="Something wrong happen. Unable to retrieve posts"></ErrorLoading>
      </div>

      <div class="post-container">
        {posts}
        </div>
      <Footer></Footer>
    </>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}