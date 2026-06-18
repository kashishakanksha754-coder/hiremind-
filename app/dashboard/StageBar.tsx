import type { StageKey } from "@/types";
import { STAGE_COLORS, STAGE_LABELS, STAGE_ORDER } from "./mock-data";

interface StageBarProps {
  distribution: Record<StageKey, number>;
  className?: string;
}

// Segmented colored bar showing applicant distribution across the 6 stages.
export function StageBar({ distribution, className }: StageBarProps) {
  const total = STAGE_ORDER.reduce((sum, s) => sum + (distribution[s] || 0), 0);

  if (total === 0) {
    return (
      <div className={className}>
        <div className="h-2 w-full rounded-full bg-bg-secondary" />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-bg-secondary">
        {STAGE_ORDER.map((stage) => {
          const count = distribution[stage] || 0;
          if (count === 0) return null;
          const pct = (count / total) * 100;
          return (
            <div
              key={stage}
              className={STAGE_COLORS[stage]}
              style={{ width: `${pct}%` }}
              title={`${STAGE_LABELS[stage]}: ${count}`}
            />
          );
        })}
      </div>
    </div>
  );
}
