import { CheckIn } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Clock, Dog, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';

interface RecentCheckInsProps {
  checkIns: CheckIn[];
  maxDisplay?: number;
}

export function RecentCheckIns({ checkIns, maxDisplay = 10 }: RecentCheckInsProps) {
  const displayedCheckIns = checkIns.slice(0, maxDisplay);
  const hasMore = checkIns.length > maxDisplay;

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
        {displayedCheckIns.map((checkIn, index) => (
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

      {/* Show "Go to Attendance" when more than maxDisplay */}
      {hasMore && (
        <div className="mt-4 pt-4 border-t border-border">
          <Link to="/attendance">
            <Button variant="outline" className="w-full gap-2">
              Ir a Asistencia
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
