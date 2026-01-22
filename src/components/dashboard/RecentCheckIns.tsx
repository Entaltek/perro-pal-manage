import { CheckIn } from '@/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Clock, Dog } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface RecentCheckInsProps {
  checkIns: CheckIn[];
}

export function RecentCheckIns({ checkIns }: RecentCheckInsProps) {
  return (
    <div className="glass-card p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-display font-bold text-foreground">
          Check-ins Recientes
        </h3>
        <Badge variant="secondary" className="gap-1">
          <Dog className="h-3 w-3" />
          {checkIns.length} activos
        </Badge>
      </div>

      <div className="space-y-3">
        {checkIns.map((checkIn, index) => (
          <div
            key={checkIn.id}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors",
              "animate-fade-in"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-12 h-12 rounded-xl gradient-warm flex items-center justify-center text-primary-foreground font-bold text-lg">
              {checkIn.dogName.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground truncate">
                {checkIn.dogName}
              </h4>
              <p className="text-sm text-muted-foreground truncate">
                {checkIn.ownerName}
              </p>
            </div>

            <div className="text-right">
              <Badge
                variant={checkIn.serviceType === 'hotel' ? 'default' : 'secondary'}
                className="mb-1"
              >
                {checkIn.serviceType === 'hotel' ? '🏨 Hotel' : '☀️ Guardería'}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {format(new Date(checkIn.checkInTime), 'HH:mm', { locale: es })}
              </div>
            </div>
          </div>
        ))}

        {checkIns.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Dog className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No hay check-ins activos</p>
          </div>
        )}
      </div>
    </div>
  );
}
