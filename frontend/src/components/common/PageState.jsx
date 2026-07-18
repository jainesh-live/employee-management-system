import LoadingSpinner from "./LoadingSpinner";
import ErrorState from "./ErrorState";

function PageState({ loading, onRetry, errorState, children }) {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (errorState) {
    return (
      <ErrorState
        title={errorState.title}
        message={errorState.message}
        onRetry={onRetry}
      />
    );
  }

  return children;
}

export default PageState;
