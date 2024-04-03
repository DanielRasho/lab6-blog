function BlogEditor({
  id = undefined,
  initTitle = "",
  initTags = [],
  initThumbnail = "",
  initContent = {},
}) {
  const { navigate } = React.useContext(ROUTER_CONTEXT);
  const { token } = React.useContext(AUTH_CONTEXT);

  const [title, setTitle] = React.useState(initTitle);
  const [thumbnail, setThumbnail] = React.useState({});
  const [thumbnailURL, setThumbnailURL] = React.useState(initThumbnail);
  const [tagInput, setTagInput] = React.useState("");
  const [tags, setTags] = React.useState(initTags);
  const [content, setContent] = React.useState(initContent);

  const [editMode, setEditMode] = React.useState(
    areAllTruthy(id, initTitle, initTags, initThumbnail, initContent)
  );

  const MAX_TAGS = 3;

  const titleRef = React.useRef();
  const editorRef = React.useRef(null);

  const auto_height = () => {
    titleRef.current.style.height = "auto";
    titleRef.current.style.height = titleRef.current.scrollHeight + "px";
  };

  const handleTitleInput = (event) => {
    if (editMode == false) setTitle(event.target.value);
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

  const handleDeleteDraft = (e) => {
    let confirmation = window.confirm(
      "Do you really want to delete your draft?"
    );
    if (confirmation) navigate(VIEW_ROUTES.USER);
  };

  const publish = (image64, content) => {
    try {
      fetch("http://localhost:3000/user/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          title: title,
          tags: tags,
          thumbnail: image64,
          content: JSON.stringify(content),
        }),
      }).then( response => navigate(VIEW_ROUTES.USER));
    } catch (error) {
      console.log("something went wrong");
    }
  };

  const edit = (image64, content) => {
    try {
      fetch("http://localhost:3000/user/posts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          id: id,
          title: title,
          tags: tags,
          thumbnail: image64,
          content: JSON.stringify(content),
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    } catch (error) {
      console.log("something went wrong");
    }
  };

  const handleSendPost = async () => {
    let content = await editorRef.current.save();
    let thumbnailBase64;

    if (!!thumbnail) {
      console.log(thumbnail);
      try {
        const reader = new FileReader();

        reader.onload = () => {
          thumbnailBase64 = reader.result;
          console.log(thumbnailBase64); // Log the thumbnailBase64 here to ensure it's properly assigned
          // Once thumbnailBase64 is assigned, proceed with further actions
          if (editMode) {
            edit(thumbnailBase64, content);
          } else {
            publish(thumbnailBase64, content);
          }
        };

        reader.onerror = (error) => {
          console.error("Error loading file:", error);
        };

        await reader.readAsDataURL(thumbnail);
      } catch (error) {
        console.error("Error loading file:", error);
      }
    } else {
      // If thumbnail is empty, proceed with further actions directly
      if (editMode) {
        edit(thumbnailURL, content);
      } else {
        publish(thumbnailURL, content);
      }
    }
  };

  React.useEffect(() => {
    // EDITOR JS Instance
    const editorInstance = new EditorJS({
      holder: "text-editor",
      data: initContent,
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
          readOnly={editMode}
          style={{ cursor: editMode ? "default" : "text" }}
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
        <button onClick={handleDeleteDraft}>
          <span>Delete Draft</span>
          <i class="fa-solid fa-trash-can"></i>
        </button>
        <button onClick={handleSendPost}>
          <span>{editMode ? "Edit" : "Post"}</span>
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}

function areAllTruthy(...args) {
  return args.every((value) => !!value);
}

function isEmpty(value) {
  for (let prop in value) {
    if (value.hasOwnProperty(prop)) return false;
  }
  return true;
}
