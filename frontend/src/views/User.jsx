function User() {
  const { navigate } = React.useContext(ROUTER_CONTEXT);
  const { token } = React.useContext(AUTH_CONTEXT);

  const [postsInfo, setPostsInfo] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const handleLoadPost = () => {
    setIsLoading(true);
    fetch("http://localhost:3000/user/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPostsInfo(data.posts);
        setIsLoading(false);
      })
      .catch((err) => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const handleDeletePost = (id) => {
    let confirmation = window.confirm(
      "Do you really want to delete this post?"
    );
    if (confirmation) {
      fetch(`http://localhost:3000/user/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      handleLoadPost();
    }
  };

  const handleEditPost = () => {};

  React.useEffect(() => {
    handleLoadPost();
  }, []);

  return (
    <div class="user-dashboard">
      <div class="user-sidebar">
        <div
          class="logo-container"
          onClick={() => {
            navigate(VIEW_ROUTES.HOME);
          }}
        >
          <img src="./media/brushWireLogo.png" alt="logo" />
        </div>
        <div class="categories-container">
          <button>Profile</button>
          <button>Your Posts</button>
        </div>
      </div>
      <div class="user-display">
        <div class="profile-category" hidden></div>
        <div class="posts-category">
          <div class="posts-category-header">
            <h2 class="font-display">Posts</h2>
            <button
              class="write-btn font-btn-confirmation"
              onClick={() =>
                navigate(VIEW_ROUTES.BLOG_EDITOR, { mode: "create" })
              }
            >
              <span>Write</span>
              <i class="fa-solid fa-pen-nib"></i>
            </button>
          </div>
          <div class="loader-container">
            <Loader isLoading={isLoading}></Loader>
          </div>

          <div>
            <ErrorLoading
              isError={isError}
              message="Something wrong happen. Unable to retrieve posts"
            ></ErrorLoading>
          </div>
          <div class="posts-container">
            {postsInfo.map((post) => {
              return (
                <PostUserCard
                  date={post.publishDate}
                  title={post.title}
                  tags={post.tags}
                  thumbnail={post.thumbnailPath}
                  onDelete = {() => handleDeletePost(post.id)}
                  onEdit = {() => handleEditPost(post.id)}
                ></PostUserCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
