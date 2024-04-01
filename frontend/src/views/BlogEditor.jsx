function BlogEditor({ mode = "create", blogInfo = {} }) {
  const [titlePlaceholder, setTitlePlaceholder] = React.useState("");

  const [thumbnail, setThumbnail] = React.useState({});
  const [thumbnailURL, setThumbnailURL] = React.useState("");

  const titleRef = React.useRef();

  const auto_height = () => {
    titleRef.current.style.height = "auto";
    titleRef.current.style.height = titleRef.current.scrollHeight + "px";
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const thumbnailImage = e.target.files[0];
      setThumbnail(thumbnailImage);
      setThumbnailURL(URL.createObjectURL(thumbnailImage));

      /* Convert the selected image to Base64
      const reader = new FileReader();
      reader.readAsDataURL(thumbnailImage);
      reader.onload = () => {
        const base64Data = reader.result;
        console.log(base64Data);
      };
      */
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", auto_height);
    return () => {
      window.removeEventListener("resize", auto_height);
    };
  }, []);

  React.useEffect(() => {
    switch (mode) {
      case "editor":
        setTitlePlaceholder("Edit Blog");
        break;
      case "create":
        setTitlePlaceholder("Title here...");
        break;
    }
  });

  return (
    <div class="blog-editor">
      <TopBar />
      <div class="metadata-editor">
        <textarea
          ref={titleRef}
          onInput={auto_height}
          class="title"
          type="textarea"
          placeholder={titlePlaceholder}
          maxLength={45}
        />
        <div class="thumbnail-upload-wrapper">
          <img src={thumbnailURL} alt="" />
          <label htmlFor="thumbnail-upload">
            <i class="fa-regular fa-image"></i>
            <span>Upload image</span>
          </label>
          <input
            id="thumbnail-upload"
            onChange={handleFileChange}
            type="file"
            accept="image/"
            hidden
          />
        </div>
      </div>
      <div id="text-editor"></div>
    </div>
  );
}
