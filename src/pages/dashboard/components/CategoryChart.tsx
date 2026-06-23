 import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';

const COLORS = [
  '#ef4444',
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#a855f7',
];

interface Props {
  data: {
    categoryName: string;
    total: number;
  }[];
}

export function CategoryChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Por categoría</CardTitle>
      </CardHeader>

      <CardContent className="h-72">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="categoryName"
              outerRadius={90}
              label
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}