function Home() {
  const { navigate } = React.useContext(ROUTER_CONTEXT);

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
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDz_gGDhjWQCGsN3qAqPbUWnOYGhye-aaq5g&usqp=CAU",
    },
    {
      date: "mar 13,2024",
      title: "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
      tags: ["allow", "artist"],
      thumbnail: "https://c.files.bbci.co.uk/F382/production/_123883326_852a3a31-69d7-4849-81c7-8087bf630251.jpg"
    },
    {
      date: "mar 13,2024",
      title: "hello morning",
      tags: ["allow", "artist"],
      thumbnail: "https://phantom-marca.unidadeditorial.es/c9ede2e9ff24c60e07218519c3e67fe6/resize/828/f/jpg/assets/multimedia/imagenes/2022/09/16/16633380346741.jpg",
    },
    {
      date: "mar 13,2024",
      title: "hello morning",
      tags: ["allow", "artist"],
      thumbnail: "https://i.ytimg.com/vi/hak5r_ejdna/maxresdefault.jpg"
    },
    {
      date: "mar 13,2024",
      title: "hello morning",
      tags: ["allow", "artist"],
      thumbnail: "https://m.media-amazon.com/images/i/61hp2owlvkl.jpg",
    },
    {
      date: "mar 13,2024",
      title: "hello morning",
      tags: ["allow", "artist"],
      thumbnail: "https://phantom-marca.unidadeditorial.es/c9ede2e9ff24c60e07218519c3e67fe6/resize/828/f/jpg/assets/multimedia/imagenes/2022/09/16/16633380346741.jpg"
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
      <TopBar navLinks={navLinks}/>
      <div class="home-header font-display">
        <h1>Blog spotlight</h1>
        <div class="gradient-container">
          <img src="./media/gradient-noise-green-red.png" alt="" />
        </div>
      </div>
      <div class="post-container">
        {posts}
      </div>
      <Footer></Footer>
    </>
  );
}
