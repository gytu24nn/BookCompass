import { FallbackProps } from "react-error-boundary";

/**
 * ErrorBoundaryFallback component
 * 
 * En återanvändbar felhanteringskomponent för React-applikationer som använder react-error-boundary.
 * Visar ett användarvänligt felmeddelande, en knapp för att försöka igen, valfri titel och ett meddelande som beskriver felet.
 * Loggar även felet till konsolen för felsökning (kan bytas ut till serverloggning vid behov).
 * 
 * @param error - Felobjektet som kastats av en barnkomponent.
 * @param resetErrorBoundary - Funktion för att återställa felgränsen och försöka igen.
 * @param title - Valfri titel för felmeddelandet (standard är "Oops! An error occurred.").
 * @param children - Valfri text eller extra innehåll att visa under felmeddelandet.
 * 
 */
function ErrorBoundaryFallback({ 
    error, 
    resetErrorBoundary,
    title = "Oops! an error accurred",
    children
} : FallbackProps & {title?: string, children?: React.ReactNode}) {
    // exempel på loggning (byt till serverloggning frivilligt eller vid behov)
    console.error("ErrorBoundary caught an error:", error);

    return (
        <div className="errorBoundaryContainer" role="alert">
            <h1 className="errorBoundaryMessage">{title}</h1>
            <p className="errorMessage">{error.message}</p>
            {children}
            <button className="errorBoundaryBtn" onClick={resetErrorBoundary}>Try again!</button>
        </div>
    )
}

export default ErrorBoundaryFallback;