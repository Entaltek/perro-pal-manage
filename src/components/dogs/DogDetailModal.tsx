import { Dog, Owner } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Syringe,
  Heart,
  Camera,
  History,
  Edit,
  Phone,
  Check,
  X,
  User,
  Mail,
  MapPin,
} from 'lucide-react';

interface DogDetailModalProps {
  dog: Dog | null;
  owner?: Owner | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

export function DogDetailModal({
  dog,
  owner,
  open,
  onOpenChange,
}: DogDetailModalProps) {
  if (!dog) return null;

  const status = statusConfig[dog.status];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-muted flex-shrink-0">
              {dog.photo ? (
                <img
                  src={dog.photo}
                  alt={dog.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full gradient-warm flex items-center justify-center text-3xl font-bold text-primary-foreground">
                  {dog.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-display">
                {dog.name}
              </DialogTitle>
              <p className="text-muted-foreground">
                {dog.breed} • {dog.age} años • {dog.weight}kg
              </p>
              <div className="flex gap-2 mt-2">
                <Badge variant={status.variant}>
                  {status.emoji} {status.label}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Owner Info */}
        {owner && (
          <div className="glass-card p-4 mt-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              Dueño/a
            </h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl gradient-warm flex items-center justify-center text-lg font-bold text-primary-foreground">
                {owner.firstName.charAt(0)}{owner.lastName.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="font-medium">{owner.firstName} {owner.lastName}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {owner.phone}
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Phone className="h-3 w-3" />
                Llamar
              </Button>
            </div>
          </div>
        )}

        <Tabs defaultValue="medical" className="mt-4">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="medical" className="gap-1">
              <Syringe className="h-4 w-4" />
              <span className="hidden sm:inline">Médico</span>
            </TabsTrigger>
            <TabsTrigger value="care" className="gap-1">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Cuidados</span>
            </TabsTrigger>
            <TabsTrigger value="photos" className="gap-1">
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Fotos</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-1">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">Historial</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="medical" className="space-y-4 mt-4">
            {/* Vaccines */}
            <div className="glass-card p-4">
              <h4 className="font-semibold mb-3">Vacunas</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(dog.medical.vaccines).map(([vaccine, vaccineStatus]) => (
                  <div
                    key={vaccine}
                    className={`flex items-center gap-2 p-2 rounded-lg ${
                      vaccineStatus ? 'bg-success/10' : 'bg-destructive/10'
                    }`}
                  >
                    {vaccineStatus ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                    <span className="capitalize text-sm">{vaccine}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deworming */}
            <div className="glass-card p-4">
              <h4 className="font-semibold mb-2">Desparasitación</h4>
              <Badge variant={dog.medical.dewormed ? 'default' : 'destructive'}>
                {dog.medical.dewormed ? '✓ Al día' : '⚠ Pendiente'}
              </Badge>
            </div>

            {/* Medications */}
            {dog.medical.medications.length > 0 && (
              <div className="glass-card p-4">
                <h4 className="font-semibold mb-3">Medicamentos</h4>
                <div className="space-y-2">
                  {dog.medical.medications.map((med) => (
                    <div key={med.id} className="p-3 bg-muted rounded-lg">
                      <div className="font-medium">{med.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {med.dosage} - {med.frequency}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Allergies */}
            <div className="glass-card p-4">
              <h4 className="font-semibold mb-2">Alergias</h4>
              <p className="text-muted-foreground">{dog.medical.allergies || 'Ninguna conocida'}</p>
            </div>
          </TabsContent>

          <TabsContent value="care" className="space-y-4 mt-4">
            <div className="glass-card p-4">
              <h4 className="font-semibold mb-2">Notas de Cuidado</h4>
              <p className="text-muted-foreground">{dog.medical.notes || 'Sin notas'}</p>
            </div>
            <div className="glass-card p-4">
              <h4 className="font-semibold mb-2">Limitaciones Físicas</h4>
              <p className="text-muted-foreground">{dog.medical.limitations || 'Ninguna'}</p>
            </div>
          </TabsContent>

          <TabsContent value="photos" className="mt-4">
            <div className="text-center py-12 text-muted-foreground glass-card">
              <Camera className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Las fotos del día aparecerán aquí</p>
              <Button variant="outline" className="mt-4">
                Subir Fotos
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <div className="text-center py-12 text-muted-foreground glass-card">
              <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>El historial de visitas aparecerá aquí</p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" className="flex-1 gap-2">
            <Phone className="h-4 w-4" />
            Llamar Dueño
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
