import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AddTestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { date: Date; bodyPart: string; tests: string[] }) => void;
  isEditMode?: boolean;
}

const bodyParts = [
  "Cervical Spine",
  "Thoracic Spine",
  "Lumbar Spine",
  "Shoulder",
  "Elbow",
  "Wrist",
  "Hip",
  "Knee",
  "Ankle",
];

const testsByCategory = {
  "Range of Movement": [
    "Cervical Flexion",
    "Cervical Extension",
    "Cervical Rotation",
    "Cervical Lateral Flexion",
  ],
  "Endurance": [
    "Deep Neck Flexor Endurance Test",
    "Plank Hold",
    "Side Plank Hold",
  ],
  "Strength": [
    "Cervical Flexion Strength",
    "Cervical Extension Strength",
    "Grip Strength",
  ],
  "Power": [
    "Vertical Jump",
    "Broad Jump",
    "Medicine Ball Throw",
  ],
};

export const AddTestModal = ({ open, onOpenChange, onSubmit, isEditMode = false }: AddTestModalProps) => {
  const [date, setDate] = useState<Date>();
  const [bodyPart, setBodyPart] = useState<string>("");
  const [selectedTests, setSelectedTests] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const handleTestToggle = (test: string) => {
    const newSelected = new Set(selectedTests);
    if (newSelected.has(test)) {
      newSelected.delete(test);
    } else {
      newSelected.add(test);
    }
    setSelectedTests(newSelected);
  };

  const handleSelectAll = () => {
    const allTests = Object.values(testsByCategory).flat();
    setSelectedTests(new Set(allTests));
  };

  const handleSubmit = () => {
    if (date && bodyPart && selectedTests.size > 0) {
      onSubmit({
        date,
        bodyPart,
        tests: Array.from(selectedTests),
      });
      setDate(undefined);
      setBodyPart("");
      setSelectedTests(new Set());
      onOpenChange(false);
    }
  };

  const filteredCategories = Object.entries(testsByCategory).reduce((acc, [category, tests]) => {
    const filtered = tests.filter(test => 
      test.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Test" : "Add New Test"}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "MM/dd/yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bodyPart">Body Part</Label>
            <Select value={bodyPart} onValueChange={setBodyPart}>
              <SelectTrigger id="bodyPart">
                <SelectValue placeholder="Select body part" />
              </SelectTrigger>
              <SelectContent>
                {bodyParts.map((part) => (
                  <SelectItem key={part} value={part}>
                    {part}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Add Tests</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleSelectAll}
                className="h-8 text-xs"
              >
                Select All
              </Button>
            </div>
            
            <Input
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-2"
            />
            
            <div className="max-h-[300px] overflow-y-auto border rounded-md p-4 space-y-4">
              {Object.entries(filteredCategories).map(([category, tests]) => (
                <div key={category} className="space-y-2">
                  <h4 className="font-semibold text-sm text-primary">{category}</h4>
                  {tests.map((test) => (
                    <div key={test} className="flex items-center space-x-2">
                      <Checkbox
                        id={test}
                        checked={selectedTests.has(test)}
                        onCheckedChange={() => handleTestToggle(test)}
                      />
                      <Label
                        htmlFor={test}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {test}
                      </Label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!date || !bodyPart || selectedTests.size === 0}
          >
            <Plus className="mr-2 h-4 w-4" />
            {isEditMode ? "Update Tests" : "Add Tests"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
