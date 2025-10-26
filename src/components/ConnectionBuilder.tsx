import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Device {
  id: string;
  type: string;
}

interface ConnectionBuilderProps {
  devices: Device[];
  onConnect: (fromId: string, toId: string) => void;
}

export const ConnectionBuilder = ({ devices, onConnect }: ConnectionBuilderProps) => {
  const [fromDevice, setFromDevice] = React.useState<string>("");
  const [toDevice, setToDevice] = React.useState<string>("");

  const handleConnect = () => {
    if (fromDevice && toDevice && fromDevice !== toDevice) {
      onConnect(fromDevice, toDevice);
      setFromDevice("");
      setToDevice("");
    }
  };

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-mono text-primary flex items-center gap-2">
          <Link className="w-5 h-5" />
          Connect Devices
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-xs font-mono text-muted-foreground mb-1 block">From</label>
          <Select value={fromDevice} onValueChange={setFromDevice}>
            <SelectTrigger className="w-full border-border bg-background/50">
              <SelectValue placeholder="Select device" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {devices.map((device) => (
                <SelectItem key={device.id} value={device.id}>
                  {device.type.toUpperCase()} - {device.id.slice(0, 8)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-mono text-muted-foreground mb-1 block">To</label>
          <Select value={toDevice} onValueChange={setToDevice}>
            <SelectTrigger className="w-full border-border bg-background/50">
              <SelectValue placeholder="Select device" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {devices.map((device) => (
                <SelectItem key={device.id} value={device.id}>
                  {device.type.toUpperCase()} - {device.id.slice(0, 8)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleConnect}
          disabled={!fromDevice || !toDevice || fromDevice === toDevice}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Create Connection
        </Button>
      </CardContent>
    </Card>
  );
};

import React from "react";
