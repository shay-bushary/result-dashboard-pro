import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface TestCardProps {
  testName: string;
  testType: "rangeOfMotion" | "endurance" | "strength" | "power";
  onRemove: () => void;
}

export const TestCard = ({ testName, testType, onRemove }: TestCardProps) => {
  const renderTestInputs = () => {
    switch (testType) {
      case "rangeOfMotion":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="left" className="text-sm font-medium">Left</Label>
              <div className="relative">
                <Input
                  id="left"
                  type="number"
                  defaultValue="0"
                  className="pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  degrees
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="right" className="text-sm font-medium">Right</Label>
              <div className="relative">
                <Input
                  id="right"
                  type="number"
                  defaultValue="0"
                  className="pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  degrees
                </span>
              </div>
            </div>
          </div>
        );
      
      case "endurance":
        return (
          <div className="space-y-2">
            <Label htmlFor="score" className="text-sm font-medium">Score</Label>
            <div className="relative">
              <Input
                id="score"
                type="number"
                defaultValue="0"
                className="pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                seconds
              </span>
            </div>
          </div>
        );
      
      case "strength":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="score-strength" className="text-sm font-medium">Score</Label>
                <div className="relative">
                  <Input
                    id="score-strength"
                    type="number"
                    defaultValue="0"
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    N
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="equipment" className="text-sm font-medium">Equipment</Label>
                <Select defaultValue="dynamometer">
                  <SelectTrigger id="equipment">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dynamometer">Dynamometer</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="machine">Machine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="default" />
              <Label htmlFor="default" className="text-sm font-medium cursor-pointer">
                Set as default
              </Label>
            </div>
          </div>
        );
      
      case "power":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="left-power" className="text-sm font-medium">Left</Label>
              <div className="relative">
                <Input
                  id="left-power"
                  type="number"
                  defaultValue="0"
                  className="pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  degrees
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="right-power" className="text-sm font-medium">Right</Label>
              <div className="relative">
                <Input
                  id="right-power"
                  type="number"
                  defaultValue="0"
                  className="pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  degrees
                </span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-test-card border border-test-card-border rounded-lg p-4 relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <h3 className="text-primary font-semibold mb-4 pr-8">{testName}</h3>
      
      {renderTestInputs()}
    </div>
  );
};
