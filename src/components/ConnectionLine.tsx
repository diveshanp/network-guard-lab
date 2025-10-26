import { cn } from "@/lib/utils";

interface ConnectionLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  isActive: boolean;
  isUnderAttack?: boolean;
}

export const ConnectionLine = ({ from, to, isActive, isUnderAttack }: ConnectionLineProps) => {
  const centerX = from.x + 50;
  const centerY = from.y + 50;
  const targetX = to.x + 50;
  const targetY = to.y + 50;

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.6" />
        </linearGradient>
        
        <linearGradient id="attackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--cyber-red))" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(var(--cyber-yellow))" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      
      <line
        x1={centerX}
        y1={centerY}
        x2={targetX}
        y2={targetY}
        stroke={isUnderAttack ? "url(#attackGradient)" : "url(#lineGradient)"}
        strokeWidth={isActive ? "3" : "2"}
        strokeDasharray={isUnderAttack ? "5,5" : "none"}
        className={cn(
          "transition-all duration-300",
          isActive && !isUnderAttack && "animate-pulse-slow"
        )}
        style={{
          filter: isUnderAttack
            ? "drop-shadow(0 0 4px hsl(var(--cyber-red)))"
            : isActive
            ? "drop-shadow(0 0 4px hsl(var(--primary)))"
            : "none",
        }}
      />
      
      {isActive && (
        <circle
          r="4"
          fill={isUnderAttack ? "hsl(var(--cyber-red))" : "hsl(var(--primary))"}
          className="animate-ping-slow"
        >
          <animateMotion
            dur={isUnderAttack ? "1s" : "2s"}
            repeatCount="indefinite"
            path={`M ${centerX},${centerY} L ${targetX},${targetY}`}
          />
        </circle>
      )}
    </svg>
  );
};
