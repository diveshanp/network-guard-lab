import { Bug, Zap, Lock, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type AttackType = "ddos" | "malware" | "bruteforce" | "mitm";

interface AttackPanelProps {
  onLaunchAttack: (type: AttackType) => void;
}

export const AttackPanel = ({ onLaunchAttack }: AttackPanelProps) => {
  const attacks = [
    { type: "ddos" as AttackType, label: "DDoS Attack", icon: Zap, color: "hover:bg-cyber-red/20 hover:border-cyber-red" },
    { type: "malware" as AttackType, label: "Malware", icon: Bug, color: "hover:bg-cyber-purple/20 hover:border-cyber-purple" },
    { type: "bruteforce" as AttackType, label: "Brute Force", icon: Lock, color: "hover:bg-cyber-yellow/20 hover:border-cyber-yellow" },
    { type: "mitm" as AttackType, label: "Man-in-Middle", icon: Wifi, color: "hover:bg-cyber-cyan/20 hover:border-cyber-cyan" },
  ];

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-mono text-primary flex items-center gap-2">
          <Bug className="w-5 h-5" />
          Attack Simulator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {attacks.map(({ type, label, icon: Icon, color }) => (
          <Button
            key={type}
            onClick={() => onLaunchAttack(type)}
            variant="outline"
            className={`w-full justify-start gap-2 border-border transition-all ${color}`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-mono text-sm">{label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
