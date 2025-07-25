import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export interface ChartData {
  date: string;
  totalIntake: number;
}

interface WaterBarChartProps {
  data: ChartData[];
  goal?: number;
}

export default function WaterBarChart({ data, goal = 2000 }: WaterBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={d => d.slice(5)} />
        <YAxis domain={[0, Math.max(goal, ...data.map(d => d.totalIntake)) + 500]} />
        <Tooltip formatter={(v: number) => `${v} ml`} />
        <ReferenceLine y={goal} stroke="#8884d8" strokeDasharray="3 3" label={{ value: `${goal}ml goal`, position: 'right', fill: '#8884d8' }} />
        <Bar dataKey="totalIntake" fill="#38bdf8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
