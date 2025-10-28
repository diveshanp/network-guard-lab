import { Monitor, Server, Router, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type DeviceType = "pc" | "server" | "router";

interface NetworkDeviceProps {
  id: string;
  name: string;
  type: DeviceType;
  position: { x: number; y: number };
  isSelected: boolean;
  health: number;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onRepair: (id: string) => void;
  onDrag: (id: string, position: { x: number; y: number }) => void;
}

export const NetworkDevice = ({
  id,
  name,
  type,
  position,
  isSelected,
  health,
  onSelect,
  onRemove,
  onRepair,
  onDrag,
}: NetworkDeviceProps) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      onDrag(id, {
        x: e.clientX - startX,
        y: e.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const getIcon = () => {
    switch (type) {
      case "pc":
        return <Monitor className="w-8 h-8" />;
      case "server":
        return <Server className="w-8 h-8" />;
      case "router":
        return <Router className="w-8 h-8" />;
    }
  };

  const getHealthColor = () => {
    if (health > 70) return "text-cyber-green";
    if (health > 40) return "text-cyber-yellow";
    return "text-cyber-red";
  };

  return (
    <div
      className={cn(
        "absolute cursor-move select-none transition-all duration-200",
        isSelected && "scale-110"
      )}
      style={{ left: position.x, top: position.y }}
      onClick={() => onSelect(id)}
      onMouseDown={handleMouseDown}
    >
      <div
        className={cn(
          "relative p-4 rounded-lg border-2 bg-card backdrop-blur-sm transition-all",
          isSelected
            ? "border-primary shadow-cyber"
            : "border-border hover:border-primary/50"
        )}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(id);
          }}
          className="absolute -top-2 -right-2 p-1 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/80 transition-colors z-10"
        >
          <X className="w-3 h-3" />
        </button>
        
        <div className={cn("mb-2", getHealthColor())}>
          {getIcon()}
        </div>
        
        <div className="text-xs font-mono text-foreground font-semibold">
          {name}
        </div>
        
        <div className="text-xs font-mono text-muted-foreground uppercase">
          {type}
        </div>
        
        <div className="mt-2 w-16 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-500",
              health > 70 && "bg-cyber-green",
              health > 40 && health <= 70 && "bg-cyber-yellow",
              health <= 40 && "bg-cyber-red"
            )}
            style={{ width: `${health}%` }}
          />
        </div>
        
        <div className={cn("text-xs font-mono mt-1", getHealthColor())}>
          {health}%
        </div>
        
        {health < 100 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRepair(id);
            }}
            className="mt-2 w-full text-xs font-mono px-2 py-1 rounded bg-cyber-green/20 text-cyber-green hover:bg-cyber-green/30 transition-colors border border-cyber-green/50"
          >
            REPAIR
          </button>
        )}
      </div>
    </div>
  );
};
