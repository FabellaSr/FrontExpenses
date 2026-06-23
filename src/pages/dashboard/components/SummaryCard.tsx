import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Props {
  title: string;
  value: string | number;
}

export function SummaryCard({
  title,
  value,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="text-3xl font-bold">
        {value}
      </CardContent>
    </Card>
  );
}