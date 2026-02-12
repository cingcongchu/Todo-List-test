interface LoadingSpinnerProps {
  show: boolean;
}

export function LoadingSpinner({ show }: LoadingSpinnerProps) {
  if (!show) return null;

  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );
}
