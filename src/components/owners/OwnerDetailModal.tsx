import { Owner, Dog } from '@/types';
import { DogCard } from '@/components/dogs/DogCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Calendar, Edit, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface OwnerDetailModalProps {
  owner: Owner | null;
  dogs: Dog[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDogClick?: (dog: Dog) => void;
  onAddDog?: () => void;
}

export function OwnerDetailModal({
  owner,
  dogs,
  open,
  onOpenChange,
  onDogClick,
  onAddDog,
}: OwnerDetailModalProps) {
  if (!owner) return null;

  const activeDogs = dogs.filter((d) => d.status === 'checked-in').length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl gradient-warm flex items-center justify-center text-2xl font-bold text-primary-foreground flex-shrink-0">
              {owner.firstName.charAt(0)}{owner.lastName.charAt(0)}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-display">
                {owner.firstName} {owner.lastName}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">
                  {dogs.length} {dogs.length === 1 ? 'perrihijo' : 'perrihijos'}
                </Badge>
                {activeDogs > 0 && (
                  <Badge variant="default">
                    🟢 {activeDogs} en guardería
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Contact Info */}
        <div className="glass-card p-4 mt-4">
          <h4 className="font-semibold mb-3">Información de Contacto</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{owner.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{owner.email}</span>
            </div>
            {owner.address && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{owner.address}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Cliente desde {format(new Date(owner.createdAt), "MMMM 'de' yyyy", { locale: es })}</span>
            </div>
          </div>
        </div>

        {/* Dogs Section */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">Perrihijos</h4>
            <Button variant="outline" size="sm" className="gap-1" onClick={onAddDog}>
              <Plus className="h-3 w-3" />
              Agregar Perrihijo
            </Button>
          </div>
          
          {dogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {dogs.map((dog) => (
                <DogCard
                  key={dog.id}
                  dog={dog}
                  onClick={() => onDogClick?.(dog)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground glass-card">
              <p>No tiene perrihijos registrados</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={onAddDog}>
                Registrar Primer Perrihijo
              </Button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <Button variant="outline" className="flex-1 gap-2">
            <Phone className="h-4 w-4" />
            Llamar
          </Button>
          <Button variant="gradient" className="flex-1 gap-2">
            <Edit className="h-4 w-4" />
            Editar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
