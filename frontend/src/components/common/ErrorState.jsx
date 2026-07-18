function ErrorState({
    title = "Something went wrong",
    message,
    onRetry
}) {
    return (
        <div className="d-flex justify-content-center mt-5">
            <div
                className="card shadow border-danger"
                style={{ maxWidth: "500px" }}
            >
                <div className="card-body text-center">

                    <h3 className="text-danger">
                        {title}
                    </h3>

                    <p className="text-muted">
                        {message}
                    </p>

                    <button
                            className="btn btn-primary"
                            onClick={onRetry}
                        >
                            Retry
                        </button>
                </div>
            </div>
        </div>
    );
}

export default ErrorState;