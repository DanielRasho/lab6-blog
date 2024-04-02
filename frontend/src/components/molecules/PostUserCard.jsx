function PostUserCard({ date, title, tags, thumbnail, onDelete, onEdit}) {
  let displayTags = tags.map((tag) => {
    return <PostTag>{tag}</PostTag>;
  });

  return (
    <article class="post-user-card">
      <div class="image-container">
        <img src={thumbnail} />
      </div>
      <div class="post-user-card-info">
        <div class="info">
          <span>{date}</span>
          <h3>{title}</h3>
          {displayTags}
        </div>
        <div class="buttons">
          <button onClick={onEdit} class="font-btn-confirmation">Edit</button>
          <button onClick={onDelete} class="font-btn-confirmation">Delete</button>
        </div>
      </div>
    </article>
  );
}
