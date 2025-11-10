import { useState } from "react";
import { LineChart as LineChartIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

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
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);
  const [showNoLaterality, setShowNoLaterality] = useState(true);

  // Transform data for the chart
  const chartData = results.map((result, index) => ({
    name: result.name.substring(0, 20) + "...",
    left: result.left,
    right: result.right,
    noLaterality: result.noLaterality,
    expected: result.expected,
  }));

  return (
    <div className="border rounded-lg p-6 bg-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <LineChartIcon className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Performance Chart</h3>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Checkbox 
              id="left" 
              checked={showLeft} 
              onCheckedChange={(checked) => setShowLeft(checked === true)}
            />
            <Label htmlFor="left" className="cursor-pointer">Left</Label>
          </div>
          
          <div className="flex items-center gap-2">
            <Checkbox 
              id="right" 
              checked={showRight} 
              onCheckedChange={(checked) => setShowRight(checked === true)}
            />
            <Label htmlFor="right" className="cursor-pointer">Right</Label>
          </div>
          
          <div className="flex items-center gap-2">
            <Checkbox 
              id="noLaterality" 
              checked={showNoLaterality} 
              onCheckedChange={(checked) => setShowNoLaterality(checked === true)}
            />
            <Label htmlFor="noLaterality" className="cursor-pointer">No Laterality</Label>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
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
          <Line 
            type="monotone" 
            dataKey="expected" 
            stroke="hsl(var(--muted-foreground))" 
            strokeDasharray="5 5"
            name="Expected"
            dot={false}
          />
          {showLeft && (
            <Line 
              type="monotone" 
              dataKey="left" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Left"
              connectNulls
            />
          )}
          {showRight && (
            <Line 
              type="monotone" 
              dataKey="right" 
              stroke="#06b6d4" 
              strokeWidth={2}
              name="Right"
              connectNulls
            />
          )}
          {showNoLaterality && (
            <Line 
              type="monotone" 
              dataKey="noLaterality" 
              stroke="#6b7280" 
              strokeWidth={2}
              name="No Laterality"
              connectNulls
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
