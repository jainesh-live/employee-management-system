function LoadingSpinner({ message = "Loading..." }) {
    return (
        <div className="d-flex flex-column align-items-center mt-5">
            <div
                className="spinner-border text-primary"
                role="status"
            >
                <span className="visually-hidden">
                    Loading
                </span>
            </div>

            <p className="mt-3 text-muted">
                {message}
            </p>
        </div>
    );
}

export default LoadingSpinner;