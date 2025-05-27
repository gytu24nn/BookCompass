import { FallbackProps } from "react-error-boundary";

function ErrorBoundaryFallback({ error, resetErrorBoundary} : FallbackProps) {
    return (
        <div className="errorBoundaryContainer" role="alert">
            <h1 className="errorBoundaryMessage">Oops! An error occurred.</h1>
            <p className="errorMessage">{error.message}</p>
            <button className="errorBoundaryBtn" onClick={resetErrorBoundary}>Try again!</button>
        </div>
    )
}

export default ErrorBoundaryFallback;