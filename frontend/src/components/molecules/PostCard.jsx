function PostCard({date, title, tags, thumbnail}) {
    let displayTags = tags.map(tag => {
        return <PostTag>{tag}</PostTag>
    })
  return (
    <article class="post-card">
      <div class="post-card-info">
        <span class="date font-card-tag">{date}</span>
        <h3 class="font-card-title" >{title}</h3>
        {displayTags}
      </div>
      <div class="image-container">
        <img
          src={thumbnail}
        />
      </div>
    </article>
  );
}
