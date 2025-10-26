import { Activity, AlertTriangle, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface SystemHealthProps {
  overallHealth: number;
  activeThreats: number;
  blockedAttacks: number;
}

export const SystemHealth = ({
  overallHealth,
  activeThreats,
  blockedAttacks,
}: SystemHealthProps) => {
  const getHealthStatus = () => {
    if (overallHealth > 70) return { label: "Secure", color: "text-cyber-green" };
    if (overallHealth > 40) return { label: "At Risk", color: "text-cyber-yellow" };
    return { label: "Critical", color: "text-cyber-red" };
  };

  const status = getHealthStatus();

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-mono text-primary flex items-center gap-2">
          <Activity className="w-5 h-5" />
          System Health
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-mono text-muted-foreground">Overall Status</span>
            <span className={cn("text-sm font-mono font-bold", status.color)}>
              {status.label}
            </span>
          </div>
          <Progress value={overallHealth} className="h-2" />
          <div className={cn("text-right text-xs font-mono mt-1", status.color)}>
            {overallHealth}%
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-cyber-red">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-mono">Active Threats</span>
            </div>
            <div className="text-2xl font-mono font-bold text-cyber-red">
              {activeThreats}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-cyber-green">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-mono">Blocked</span>
            </div>
            <div className="text-2xl font-mono font-bold text-cyber-green">
              {blockedAttacks}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
