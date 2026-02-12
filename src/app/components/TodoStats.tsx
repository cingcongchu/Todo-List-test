/**
 * TodoStats Component
 * Displays todo statistics summary
 */

interface TodoStatsProps {
  total: number;
  completed: number;
  active: number;
}

export function TodoStats({ total, completed, active }: TodoStatsProps) {
  if (total === 0) return null;

  return (
    <div className="stats-bar">
      <p className="stats-text">
        Total: {total} | Completed: {completed} | Active: {active}
      </p>
    </div>
  );
}
