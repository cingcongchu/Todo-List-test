/**
 * ErrorMessage Component
 * Displays error messages to the user
 */

interface ErrorMessageProps {
  message: string | null;
  onDismiss?: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="error-banner">
      <p className="error-text">⚠️ {message}</p>
      {onDismiss && (
        <button onClick={onDismiss} className="btn-icon">
          ✕
        </button>
      )}
    </div>
  );
}
