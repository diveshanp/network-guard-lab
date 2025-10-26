import { useState, useEffect } from "react";
import { NetworkDevice, DeviceType } from "@/components/NetworkDevice";
import { ConnectionLine } from "@/components/ConnectionLine";
import { SecurityControls } from "@/components/SecurityControls";
import { SystemHealth } from "@/components/SystemHealth";
import { AttackPanel, AttackType } from "@/components/AttackPanel";
import { DevicePalette } from "@/components/DevicePalette";
import { ConnectionBuilder } from "@/components/ConnectionBuilder";
import { toast } from "sonner";

interface Device {
  id: string;
  type: DeviceType;
  position: { x: number; y: number };
  health: number;
}

interface Connection {
  from: string;
  to: string;
}

const Index = () => {
  const [devices, setDevices] = useState<Device[]>([
    { id: "router-1", type: "router", position: { x: 400, y: 200 }, health: 100 },
  ]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [firewall, setFirewall] = useState(true);
  const [ids, setIds] = useState(true);
  const [encryption, setEncryption] = useState(false);
  const [activeAttacks, setActiveAttacks] = useState<Set<string>>(new Set());
  const [blockedAttacks, setBlockedAttacks] = useState(0);

  const addDevice = (type: DeviceType) => {
    const newDevice: Device = {
      id: `${type}-${Date.now()}`,
      type,
      position: { x: Math.random() * 600 + 100, y: Math.random() * 300 + 100 },
      health: 100,
    };
    setDevices([...devices, newDevice]);
    toast.success(`${type.toUpperCase()} added to network`);
  };

  const removeDevice = (id: string) => {
    setDevices(devices.filter((d) => d.id !== id));
    setConnections(connections.filter((c) => c.from !== id && c.to !== id));
    if (selectedDevice === id) setSelectedDevice(null);
    toast.info("Device removed from network");
  };

  const updateDevicePosition = (id: string, position: { x: number; y: number }) => {
    setDevices(devices.map((d) => (d.id === id ? { ...d, position } : d)));
  };

  const connectDevices = (fromId: string, toId: string) => {
    const exists = connections.some(
      (c) => (c.from === fromId && c.to === toId) || (c.from === toId && c.to === fromId)
    );
    if (!exists) {
      setConnections([...connections, { from: fromId, to: toId }]);
      toast.success("Connection established");
    } else {
      toast.error("Connection already exists");
    }
  };

  const launchAttack = (type: AttackType) => {
    const targetDevices = devices.filter((d) => d.health > 0);
    if (targetDevices.length === 0) {
      toast.error("No devices to attack");
      return;
    }

    const target = targetDevices[Math.floor(Math.random() * targetDevices.length)];
    const attackId = `attack-${Date.now()}`;
    
    // Check security measures
    const isBlocked = (firewall && Math.random() > 0.3) || (ids && Math.random() > 0.5);
    
    if (isBlocked) {
      setBlockedAttacks((prev) => prev + 1);
      toast.success(`${type.toUpperCase()} attack blocked by security systems!`, {
        description: `Target: ${target.type.toUpperCase()}`,
      });
      return;
    }

    setActiveAttacks((prev) => new Set(prev).add(attackId));
    
    const damage = encryption ? Math.random() * 15 + 5 : Math.random() * 30 + 10;
    
    setDevices((prevDevices) =>
      prevDevices.map((d) =>
        d.id === target.id ? { ...d, health: Math.max(0, d.health - damage) } : d
      )
    );

    toast.error(`${type.toUpperCase()} attack in progress!`, {
      description: `Target: ${target.type.toUpperCase()} - Damage: ${damage.toFixed(0)}%`,
    });

    setTimeout(() => {
      setActiveAttacks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(attackId);
        return newSet;
      });
    }, 2000);
  };

  const overallHealth = Math.round(
    devices.reduce((sum, d) => sum + d.health, 0) / Math.max(devices.length, 1)
  );

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-[1800px] mx-auto">
        <header className="mb-6">
          <h1 className="text-4xl font-bold font-mono text-primary mb-2 tracking-tight">
            CYBERSECURITY SIMULATOR
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            Network Defense Training Environment
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 space-y-4">
            <div className="relative bg-card/30 rounded-lg border border-border min-h-[500px] backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-cyber opacity-10" />
              
              {connections.map((conn, idx) => {
                const fromDevice = devices.find((d) => d.id === conn.from);
                const toDevice = devices.find((d) => d.id === conn.to);
                if (!fromDevice || !toDevice) return null;

                return (
                  <ConnectionLine
                    key={idx}
                    from={fromDevice.position}
                    to={toDevice.position}
                    isActive={true}
                    isUnderAttack={activeAttacks.size > 0}
                  />
                );
              })}

              {devices.map((device) => (
                <NetworkDevice
                  key={device.id}
                  id={device.id}
                  type={device.type}
                  position={device.position}
                  health={device.health}
                  isSelected={selectedDevice === device.id}
                  onSelect={setSelectedDevice}
                  onRemove={removeDevice}
                  onDrag={updateDevicePosition}
                />
              ))}

              {devices.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground font-mono text-sm">
                    Add devices to get started
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ConnectionBuilder devices={devices} onConnect={connectDevices} />
              <AttackPanel onLaunchAttack={launchAttack} />
            </div>
          </div>

          <div className="space-y-4">
            <SystemHealth
              overallHealth={overallHealth}
              activeThreats={activeAttacks.size}
              blockedAttacks={blockedAttacks}
            />
            
            <SecurityControls
              firewall={firewall}
              ids={ids}
              encryption={encryption}
              onToggleFirewall={() => setFirewall(!firewall)}
              onToggleIds={() => setIds(!ids)}
              onToggleEncryption={() => setEncryption(!encryption)}
            />
            
            <DevicePalette onAddDevice={addDevice} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
