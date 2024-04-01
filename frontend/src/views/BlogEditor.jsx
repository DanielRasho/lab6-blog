function BlogEditor({ mode = "create", blogInfo = {} }) {
  const [title, setTitle] = React.useState("");

  React.useEffect(() => {
    switch (mode) {
      case "editor":
        setTitle("Edit Blog");
        break;
      case "create":
        setTitle("Create Blog");
        break;
    }
  });

  return (
    <div class="blog-editor">
      <TopBar />
      <h1>New Blog</h1>
      <input type="text" />
      <input type="file" accept="image/"/>
    </div>
  );
}
