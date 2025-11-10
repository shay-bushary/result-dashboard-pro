import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AddTestModal } from "@/components/AddTestModal";
import { TestCard } from "@/components/TestCard";

interface Test {
  id: string;
  name: string;
  type: "rangeOfMotion" | "endurance" | "strength" | "power";
}

const TestingResults = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>("");

  const handleAddTests = (data: { date: Date; bodyPart: string; tests: string[] }) => {
    const testTypeMap: Record<string, "rangeOfMotion" | "endurance" | "strength" | "power"> = {
      "Cervical Flexion": "rangeOfMotion",
      "Cervical Extension": "rangeOfMotion",
      "Cervical Rotation": "rangeOfMotion",
      "Cervical Lateral Flexion": "rangeOfMotion",
      "Deep Neck Flexor Endurance Test": "endurance",
      "Plank Hold": "endurance",
      "Side Plank Hold": "endurance",
      "Cervical Flexion Strength": "strength",
      "Cervical Extension Strength": "strength",
      "Grip Strength": "strength",
      "Vertical Jump": "power",
      "Broad Jump": "power",
      "Medicine Ball Throw": "power",
    };

    const newTests = data.tests.map((testName) => ({
      id: `${Date.now()}-${Math.random()}`,
      name: testName,
      type: testTypeMap[testName] || "rangeOfMotion",
    }));

    setTests([...tests, ...newTests]);
    setSelectedDate(data.date);
    setSelectedBodyPart(data.bodyPart);
  };

  const handleRemoveTest = (id: string) => {
    setTests(tests.filter((test) => test.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Testing & Results</h1>
        
        {/* Top Controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-2 text-foreground">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "MM/dd/yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-2 text-foreground">Body Part</label>
            <Button
              variant="default"
              className="w-full"
              disabled={!selectedBodyPart}
            >
              <Plus className="mr-2 h-4 w-4" />
              {selectedBodyPart || "Select body part"}
            </Button>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-2 text-foreground">Add Tests</label>
            <Button
              variant="default"
              className="w-full"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Tests
            </Button>
          </div>
        </div>

        {/* Test Cards */}
        {tests.length > 0 && (
          <div className="space-y-4 mb-8">
            {tests.map((test) => (
              <TestCard
                key={test.id}
                testName={test.name}
                testType={test.type}
                onRemove={() => handleRemoveTest(test.id)}
              />
            ))}
          </div>
        )}

        {/* Save Button */}
        {tests.length > 0 && (
          <div className="flex justify-end">
            <Button size="lg" className="min-w-[150px]">
              Save Tests
            </Button>
          </div>
        )}

        {/* Empty State */}
        {tests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No tests added yet
            </p>
            <p className="text-muted-foreground mb-6">
              Click "Add Tests" to get started
            </p>
          </div>
        )}
      </div>

      <AddTestModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleAddTests}
      />
    </div>
  );
};

export default TestingResults;
