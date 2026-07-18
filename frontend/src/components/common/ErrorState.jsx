function ErrorState({ title = "Something went wrong", message, onRetry }) {
  return (
    <div className="container mt-4">
      <div className="alert alert-danger shadow-sm text-center py-5">
        <h3>{title}</h3>

        <p className="mb-4">{message}</p>

        <button className="btn btn-danger" onClick={onRetry}>
          Retry
        </button>
      </div>
    </div>
  );
}

export default ErrorState;
