import { Owner, Dog } from '@/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Phone, Mail, MapPin, Dog as DogIcon } from 'lucide-react';

interface OwnerCardProps {
  owner: Owner;
  dogs: Dog[];
  onClick?: () => void;
}

export function OwnerCard({ owner, dogs, onClick }: OwnerCardProps) {
  const activeDogs = dogs.filter((d) => d.status === 'checked-in').length;

  return (
    <div
      onClick={onClick}
      className="glass-card p-5 cursor-pointer hover-lift animate-scale-in"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl gradient-warm flex items-center justify-center text-xl font-bold text-primary-foreground flex-shrink-0">
          {owner.firstName.charAt(0)}{owner.lastName.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-lg text-foreground truncate">
            {owner.firstName} {owner.lastName}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="gap-1">
              <DogIcon className="h-3 w-3" />
              {dogs.length} {dogs.length === 1 ? 'perrihijo' : 'perrihijos'}
            </Badge>
            {activeDogs > 0 && (
              <Badge variant="default" className="gap-1">
                🟢 {activeDogs} aquí
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <span>{owner.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span className="truncate">{owner.email}</span>
        </div>
        {owner.address && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{owner.address}</span>
          </div>
        )}
      </div>

      {/* Dogs Preview */}
      {dogs.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex -space-x-2">
            {dogs.slice(0, 4).map((dog) => (
              <div
                key={dog.id}
                className="w-10 h-10 rounded-full border-2 border-card overflow-hidden bg-muted"
                title={dog.name}
              >
                {dog.photo ? (
                  <img
                    src={dog.photo}
                    alt={dog.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full gradient-warm flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {dog.name.charAt(0)}
                  </div>
                )}
              </div>
            ))}
            {dogs.length > 4 && (
              <div className="w-10 h-10 rounded-full border-2 border-card bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                +{dogs.length - 4}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
