function User() {
  const { navigate } = React.useContext(ROUTER_CONTEXT);

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
      thumbnail: "https://i.ytimg.com/vi/HaK5r_ejdNA/maxresdefault.jpg",
    },
  ];

  let posts = postsInfo.map((post) => {
    return (
      <PostUserCard
        id={1}
        date={post.date}
        title={post.title}
        tags={post.tags}
        thumbnail={post.thumbnail}
      ></PostUserCard>
    );
  });
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
            <button class="write-btn font-btn-confirmation" onClick={() => navigate(VIEW_ROUTES.BLOG_EDITOR)}>
              <span>Write</span>
              <i class="fa-solid fa-pen-nib"></i>
            </button>
          </div>
          <div class="posts-container">{posts}</div>
        </div>
      </div>
    </div>
  );
}
