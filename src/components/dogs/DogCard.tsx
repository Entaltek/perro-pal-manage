import { Dog } from '@/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Clock, Syringe, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface DogCardProps {
  dog: Dog;
  onClick?: () => void;
}

const statusConfig = {
  'checked-in': {
    label: 'En guardería',
    variant: 'default' as const,
    emoji: '🟢',
  },
  'checked-out': {
    label: 'En casa',
    variant: 'secondary' as const,
    emoji: '🏠',
  },
  'reserved': {
    label: 'Reservado',
    variant: 'outline' as const,
    emoji: '📅',
  },
};

export function DogCard({ dog, onClick }: DogCardProps) {
  const status = statusConfig[dog.status];
  const hasVaccineAlert = !dog.medical.vaccines.rabies || !dog.medical.vaccines.bordetella;
  const hasMedication = dog.medical.medications.length > 0;

  return (
    <div
      onClick={onClick}
      className={cn(
        "glass-card p-4 cursor-pointer hover-lift animate-scale-in",
        "flex gap-4"
      )}
    >
      {/* Photo */}
      <div className="relative flex-shrink-0">
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-muted">
          {dog.photo ? (
            <img
              src={dog.photo}
              alt={dog.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full gradient-warm flex items-center justify-center text-2xl font-bold text-primary-foreground">
              {dog.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="absolute -bottom-1 -right-1 text-lg">
          {status.emoji}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display font-bold text-lg text-foreground truncate">
            {dog.name}
          </h3>
          <Badge variant={status.variant} className="flex-shrink-0 text-xs">
            {status.label}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground mb-2">
          {dog.breed} • {dog.age} años • {dog.weight}kg
        </p>

        {/* Alerts */}
        <div className="flex flex-wrap gap-2">
          {dog.status === 'checked-in' && dog.checkInTime && (
            <Badge variant="secondary" className="gap-1 text-xs">
              <Clock className="h-3 w-3" />
              {format(new Date(dog.checkInTime), 'HH:mm', { locale: es })}
            </Badge>
          )}

          {hasVaccineAlert && (
            <Badge variant="destructive" className="gap-1 text-xs">
              <AlertTriangle className="h-3 w-3" />
              Vacunas
            </Badge>
          )}

          {hasMedication && (
            <Badge variant="default" className="gap-1 text-xs bg-success text-success-foreground">
              <Syringe className="h-3 w-3" />
              Medicamento
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
