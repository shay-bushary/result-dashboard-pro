import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";

interface TestResult {
  id: string;
  name: string;
  unit: string;
  expected: number;
  left: number | null;
  right: number | null;
  noLaterality: number | null;
}

interface TestResultsChartProps {
  results: TestResult[];
}

export const TestResultsChart = ({ results }: TestResultsChartProps) => {
  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  // Get unique test names for selection
  const testOptions = results.map(result => ({
    id: result.id,
    name: result.name
  }));

  // Filter and transform data based on selected tests
  const chartData = results
    .filter(result => selectedTests.length === 0 || selectedTests.includes(result.id))
    .map((result) => ({
      name: result.name.substring(0, 15) + "...",
      [`${result.name} - Left`]: result.left,
      [`${result.name} - Right`]: result.right,
    }));

  const handleTestToggle = (testId: string) => {
    setSelectedTests(prev => {
      if (prev.includes(testId)) {
        return prev.filter(id => id !== testId);
      }
      if (prev.length < 2) {
        return [...prev, testId];
      }
      return prev;
    });
  };

  return (
    <div className="border rounded-lg p-6 bg-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Performance Chart</h3>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Select tests (max 2):</span>
          <div className="flex gap-2">
            {testOptions.map((test) => (
              <button
                key={test.id}
                onClick={() => handleTestToggle(test.id)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  selectedTests.includes(test.id)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary-hover'
                }`}
              >
                {test.name.substring(0, 20)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--foreground))"
            tick={{ fill: "hsl(var(--foreground))" }}
          />
          <YAxis 
            stroke="hsl(var(--foreground))"
            tick={{ fill: "hsl(var(--foreground))" }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "hsl(var(--popover))", 
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--popover-foreground))"
            }}
          />
          <Legend />
          <ReferenceLine y={100} stroke="hsl(var(--success))" strokeWidth={2} strokeDasharray="3 3" />
          {selectedTests.map((testId, index) => {
            const test = results.find(r => r.id === testId);
            if (!test) return null;
            
            const colors = [
              { left: '#3b82f6', right: '#93c5fd' },
              { left: '#10b981', right: '#6ee7b7' }
            ];
            
            return (
              <>
                <Bar 
                  key={`${testId}-left`}
                  dataKey={`${test.name} - Left`}
                  fill={colors[index].left}
                  name={`${test.name} - Left`}
                />
                <Bar 
                  key={`${testId}-right`}
                  dataKey={`${test.name} - Right`}
                  fill={colors[index].right}
                  name={`${test.name} - Right`}
                />
              </>
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
