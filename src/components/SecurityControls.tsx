import { Shield, Eye, Lock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SecurityControlsProps {
  firewall: boolean;
  ids: boolean;
  encryption: boolean;
  onToggleFirewall: () => void;
  onToggleIds: () => void;
  onToggleEncryption: () => void;
}

export const SecurityControls = ({
  firewall,
  ids,
  encryption,
  onToggleFirewall,
  onToggleIds,
  onToggleEncryption,
}: SecurityControlsProps) => {
  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-mono text-primary flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Security Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className={cn("w-4 h-4", firewall ? "text-cyber-green" : "text-muted-foreground")} />
            <span className="text-sm font-mono">Firewall</span>
          </div>
          <Switch checked={firewall} onCheckedChange={onToggleFirewall} />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className={cn("w-4 h-4", ids ? "text-cyber-green" : "text-muted-foreground")} />
            <span className="text-sm font-mono">IDS</span>
          </div>
          <Switch checked={ids} onCheckedChange={onToggleIds} />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className={cn("w-4 h-4", encryption ? "text-cyber-green" : "text-muted-foreground")} />
            <span className="text-sm font-mono">Encryption</span>
          </div>
          <Switch checked={encryption} onCheckedChange={onToggleEncryption} />
        </div>
      </CardContent>
    </Card>
  );
};
