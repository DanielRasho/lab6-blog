function BlogEditor() {
  const { navigate } = React.useContext(ROUTER_CONTEXT);
  const [title, setTitle] = React.useState("");
  const [thumbnail, setThumbnail] = React.useState({});
  const [thumbnailURL, setThumbnailURL] = React.useState("");
  const [tagInput, setTagInput] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [content, setContent] = React.useState({});
  const MAX_TAGS = 3;

  const titleRef = React.useRef();
  const editorRef = React.useRef(null);

  const auto_height = () => {
    titleRef.current.style.height = "auto";
    titleRef.current.style.height = titleRef.current.scrollHeight + "px";
  };

  const handleTitleInput = (event) => {
    setTitle(event.target.value);
  };

  const handleTagInput = (event) => {
    setTagInput(event.target.value);
  };

  const handleCreateTag = (event) => {
    if (
      event.key == "Enter" &&
      !tags.includes(tagInput) &&
      tags.length < MAX_TAGS
    ) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleDeleteTag = (id) => {
    console.log(id);
    setTags(tags.filter((tag) => tag !== id));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const thumbnailImage = e.target.files[0];
      setThumbnail(thumbnailImage);
      setThumbnailURL(URL.createObjectURL(thumbnailImage));
    }
  };

  const publish = (title, tags, image64, content) => {
    try {
      fetch("http://localhost:3000/user/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: title,
          tags: tags,
          thumbnail: image64,
          content: JSON.stringify(content),
        }),
      });
    } catch (error) {
      console.log("something went wrong");
    }
  };

  const handlePublishPost = async () => {
    let content = await editorRef.current.save();
    const reader = new FileReader();
    let thumbnailBase64 = reader.result;
    const fileLoadedPromise = new Promise((resolve, reject) => {
      reader.onload = () => {
        thumbnailBase64 = reader.result;
        resolve(thumbnailBase64); // Resolve the promise once the file is loaded
      };
      reader.onerror = reject; // Reject the promise in case of an error
    });

    await reader.readAsDataURL(thumbnail);

    try {
      await fileLoadedPromise; // Wait until the file is loaded
      publish(title, tags, thumbnailBase64, content);
      navigate(VIEW_ROUTES.USER);
    } catch (error) {
      console.error("Error loading file:", error);
    }
  };

  React.useEffect(() => {
    // EDITOR JS Instance
    const editorInstance = new EditorJS({
      holder: "text-editor",
      placeholder: 'Write something, type "/" for input a command',
      minHeight: 30,
      tools: {
        header: Header,
        list: List,
        image: SimpleImage,
        underline: Underline,
        quote: {
          class: Quote,
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
      },
    });

    editorRef.current = editorInstance;

    // ADD EVENT WHEN RESIZING
    window.addEventListener("resize", auto_height);
    return () => {
      window.removeEventListener("resize", auto_height);
      editorInstance.destroy();
    };
  }, []);

  return (
    <div class="blog-editor">
      <TopBar />
      <div class="metadata-editor">
        <textarea
          ref={titleRef}
          value={title}
          onInput={auto_height}
          onChange={handleTitleInput}
          class="title"
          type="textarea"
          placeholder="Title here..."
          maxLength={45}
        />
        <div class="tag-container">
          <input
            type="text"
            value={tagInput}
            onChange={handleTagInput}
            onKeyDown={handleCreateTag}
            placeholder="Input a tag..."
          />
          <div class="tags-list">
            {tags.map((tag) => {
              return (
                <span key={tag} class="tag">
                  {tag}
                  <i
                    onClick={() => handleDeleteTag(tag)}
                    class="fa-solid fa-xmark"
                  ></i>
                </span>
              );
            })}
          </div>
        </div>
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
      <div class="submit-buttons">
        <button>
          <span>Delete Draft</span>
          <i class="fa-solid fa-trash-can"></i>
        </button>
        <button onClick={handlePublishPost}>
          <span>Post</span>
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}

function createEditor(readonly) {}
