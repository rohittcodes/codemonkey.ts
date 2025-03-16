"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type Props = {
  onModeChange: (isCollaborative: boolean) => void;
  defaultCollaborative?: boolean;
};

export function EditorModeToggle({
  onModeChange,
  defaultCollaborative = false,
}: Props) {
  const [isCollaborative, setIsCollaborative] = useState(defaultCollaborative);

  const handleToggle = (checked: boolean) => {
    setIsCollaborative(checked);
    onModeChange(checked);
  };

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="editor-mode">Collaborative Mode</Label>
      <Switch
        id="editor-mode"
        checked={isCollaborative}
        onCheckedChange={handleToggle}
      />
    </div>
  );
}
