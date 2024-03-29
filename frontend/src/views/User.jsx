function User() {
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
    <div>
      {posts}
    </div>
  );
}
