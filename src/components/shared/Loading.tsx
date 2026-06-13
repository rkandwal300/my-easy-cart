import React, { memo } from 'react';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Loading: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8 bg-background min-h-[600px] flex flex-col justify-center">
      {/* Centered Processing Indicator */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground tracking-wider animate-pulse">
          Loading Application Chunks...
        </p>
      </div>

      {/* Grid Skeleton Content Frame */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4 p-4 border border-border rounded-xl bg-card">
            <Skeleton className="h-48 w-full rounded-lg bg-muted" />
            <Skeleton className="h-6 w-3/4 bg-muted" />
            <Skeleton className="h-4 w-full bg-muted" />
            <Skeleton className="h-4 w-5/6 bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Loading);