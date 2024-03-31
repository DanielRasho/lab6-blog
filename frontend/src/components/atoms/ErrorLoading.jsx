function ErrorLoading({ isError, message }) {
  if (isError)
    return (
      <div class="error-loading">
        <i class="fa-regular fa-face-sad-cry"></i>
        <span>{message}</span>
      </div>
    );
  else return null;
}
