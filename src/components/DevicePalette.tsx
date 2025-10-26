import { Monitor, Server, Router, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeviceType } from "./NetworkDevice";

interface DevicePaletteProps {
  onAddDevice: (type: DeviceType) => void;
}

export const DevicePalette = ({ onAddDevice }: DevicePaletteProps) => {
  const devices = [
    { type: "pc" as DeviceType, label: "PC", icon: Monitor },
    { type: "server" as DeviceType, label: "Server", icon: Server },
    { type: "router" as DeviceType, label: "Router", icon: Router },
  ];

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-mono text-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Devices
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {devices.map(({ type, label, icon: Icon }) => (
          <Button
            key={type}
            onClick={() => onAddDevice(type)}
            variant="outline"
            className="w-full justify-start gap-2 border-border hover:border-primary hover:bg-primary/10 transition-all"
          >
            <Icon className="w-4 h-4" />
            <span className="font-mono text-sm">{label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
