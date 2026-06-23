// pages/dashboard/components/MembersChart.tsx

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

interface Props {
  data: {
    userName: string;
    total: number;
  }[];
}

export function MembersChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ranking miembros</CardTitle>
      </CardHeader>

      <CardContent className="h-72">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="userName" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="total"
              fill="hsl(var(--primary))"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}