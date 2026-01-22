import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { mockDogs, mockOwners } from '@/data/mockData';
import { Dog, Plus, Check } from 'lucide-react';
import { toast } from 'sonner';

interface QuickCheckInModalProps {
  children: React.ReactNode;
}

export function QuickCheckInModal({ children }: QuickCheckInModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState('');
  const [selectedDog, setSelectedDog] = useState('');
  const [serviceType, setServiceType] = useState<'daycare' | 'hotel'>('daycare');
  const [notes, setNotes] = useState('');

  const ownerDogs = mockDogs.filter((dog) => dog.ownerId === selectedOwner);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dog = mockDogs.find((d) => d.id === selectedDog);
    if (dog) {
      toast.success(`¡${dog.name} registrado exitosamente! 🐕`, {
        description: `Servicio: ${serviceType === 'hotel' ? 'Hotel' : 'Guardería'}`,
      });
      setOpen(false);
      setSelectedOwner('');
      setSelectedDog('');
      setNotes('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-display">
            <div className="p-2 rounded-xl gradient-warm">
              <Dog className="h-5 w-5 text-primary-foreground" />
            </div>
            Quick Check-in
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Owner Select */}
          <div className="space-y-2">
            <Label htmlFor="owner">Padre/Madre</Label>
            <Select value={selectedOwner} onValueChange={setSelectedOwner}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar dueño..." />
              </SelectTrigger>
              <SelectContent>
                {mockOwners.map((owner) => (
                  <SelectItem key={owner.id} value={owner.id}>
                    {owner.firstName} {owner.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dog Select */}
          <div className="space-y-2">
            <Label htmlFor="dog">Perrihijo</Label>
            <Select
              value={selectedDog}
              onValueChange={setSelectedDog}
              disabled={!selectedOwner}
            >
              <SelectTrigger>
                <SelectValue placeholder={selectedOwner ? "Seleccionar perro..." : "Primero selecciona un dueño"} />
              </SelectTrigger>
              <SelectContent>
                {ownerDogs.map((dog) => (
                  <SelectItem key={dog.id} value={dog.id}>
                    <div className="flex items-center gap-2">
                      <span>{dog.name}</span>
                      <span className="text-muted-foreground text-sm">
                        ({dog.breed})
                      </span>
                    </div>
                  </SelectItem>
                ))}
                {ownerDogs.length === 0 && selectedOwner && (
                  <SelectItem value="none" disabled>
                    No hay perros registrados
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Service Type */}
          <div className="space-y-2">
            <Label>Tipo de Servicio</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setServiceType('daycare')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  serviceType === 'daycare'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-2xl mb-1">☀️</div>
                <div className="font-medium">Guardería</div>
                <div className="text-sm text-muted-foreground">Día completo</div>
              </button>
              <button
                type="button"
                onClick={() => setServiceType('hotel')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  serviceType === 'hotel'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-2xl mb-1">🏨</div>
                <div className="font-medium">Hotel</div>
                <div className="text-sm text-muted-foreground">Con hospedaje</div>
              </button>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas (opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Instrucciones especiales para esta visita..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="gradient"
              className="flex-1"
              disabled={!selectedDog}
            >
              <Check className="h-4 w-4 mr-2" />
              Registrar Entrada
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
