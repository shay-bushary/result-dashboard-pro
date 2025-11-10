import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Info, LineChart } from "lucide-react";
import { AddTestModal } from "@/components/AddTestModal";
import { TestResultsChart } from "@/components/TestResultsChart";

interface TestResult {
  id: string;
  name: string;
  unit: string;
  expected: number;
  left: number | null;
  right: number | null;
  noLaterality: number | null;
}

// Mock test dates for the patient
const mockTestDates = [
  "2025-01-15",
  "2025-02-10",
  "2025-03-05",
];

// Mock test results
const mockTestResults: TestResult[] = [
  {
    id: "1",
    name: "Weight bearing lunge test (Ankle)",
    unit: "Degrees",
    expected: 41.0,
    left: 5.0,
    right: 3.0,
    noLaterality: null,
  },
  {
    id: "2",
    name: "Single leg calf raise (Ankle)",
    unit: "Repetitions",
    expected: 30.0,
    left: 10,
    right: 10,
    noLaterality: null,
  },
];

const TestingResults = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPercentage, setShowPercentage] = useState(false);

  const handleOpenModal = (editMode: boolean) => {
    setIsEditMode(editMode);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (data: { date: Date; bodyPart: string; tests: string[] }) => {
    console.log("Test data submitted:", data);
    setIsModalOpen(false);
  };

  const getExpectedColor = (actual: number, expected: number) => {
    const percentage = (actual / expected) * 100;
    if (percentage >= 100) return "text-green-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const formatValue = (actual: number | null, expected: number) => {
    if (actual === null) return "-";
    if (showPercentage) {
      const percentage = (actual / expected) * 100;
      return `${percentage.toFixed(1)}%`;
    }
    return actual.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Testing & Results</h1>
        
        {/* Top Controls */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-foreground">Test Date</label>
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {mockTestDates.map((date) => (
                  <SelectItem key={date} value={date}>
                    {new Date(date).toLocaleDateString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 flex items-end">
            <Button
              variant="default"
              className="w-full"
              onClick={() => handleOpenModal(false)}
            >
              Create New Test
            </Button>
          </div>
        </div>

        {/* Results Section */}
        {selectedDate && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-foreground">Result</h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        <p className="text-red-600">• 0-75%: Below expected</p>
                        <p className="text-yellow-600">• 75-99%: Near expected</p>
                        <p className="text-green-600">• 100%+: At or above expected</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleOpenModal(true)}
                >
                  Edit Current Test
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">Absolute/Percentage Values</span>
                  <Switch
                    checked={showPercentage}
                    onCheckedChange={setShowPercentage}
                  />
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="mb-8 border rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-primary">
                  <TableRow className="hover:bg-primary">
                    <TableHead className="text-primary-foreground font-semibold">Test</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Unit</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">
                      <div className="flex items-center gap-2">
                        Expected
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-3 w-3" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Target value for this test</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Left</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Right</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">No Laterality</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTestResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-medium">{result.name}</TableCell>
                      <TableCell>{result.unit}</TableCell>
                      <TableCell>{result.expected.toFixed(1)}</TableCell>
                      <TableCell className={result.left ? getExpectedColor(result.left, result.expected) : ""}>
                        {formatValue(result.left, result.expected)}
                      </TableCell>
                      <TableCell className={result.right ? getExpectedColor(result.right, result.expected) : ""}>
                        {formatValue(result.right, result.expected)}
                      </TableCell>
                      <TableCell className={result.noLaterality ? getExpectedColor(result.noLaterality, result.expected) : ""}>
                        {formatValue(result.noLaterality, result.expected)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Chart Section */}
            <TestResultsChart results={mockTestResults} />
          </>
        )}

        {/* Empty State */}
        {!selectedDate && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              Select a test date to view results
            </p>
            <p className="text-muted-foreground mb-6">
              Or create a new test to get started
            </p>
          </div>
        )}
      </div>

      <AddTestModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleModalSubmit}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default TestingResults;
