
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function MemberLoading() {
  return (
    <div className="space-y-6 animate-in fade-in-50">

      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-40" />
        </div>

        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      <Card>

        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>

        <CardContent>

          <div className="space-y-4">

            <div className="grid grid-cols-4 gap-4 pb-2 border-b">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20 ml-auto" />
            </div>

            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-4 gap-4 items-center border-b pb-3"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-20 ml-auto" />
              </div>
            ))}

          </div>

        </CardContent>
      </Card>
    </div>
  );
}