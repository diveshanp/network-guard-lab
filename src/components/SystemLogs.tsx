import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity } from "lucide-react";

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
}

interface SystemLogsProps {
  logs: LogEntry[];
}

export const SystemLogs = ({ logs }: SystemLogsProps) => {
  const getLogColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "error":
        return "text-cyber-red";
      case "warning":
        return "text-cyber-yellow";
      case "success":
        return "text-cyber-green";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-mono text-primary flex items-center gap-2">
          <Activity className="w-5 h-5" />
          System Logs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-2">
            {logs.length === 0 ? (
              <p className="text-xs text-muted-foreground font-mono">No logs yet</p>
            ) : (
              [...logs].reverse().map((log) => (
                <div key={log.id} className="text-xs font-mono border-l-2 border-border pl-2 py-1">
                  <span className="text-muted-foreground">[{log.timestamp}]</span>{" "}
                  <span className={getLogColor(log.type)}>{log.message}</span>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
