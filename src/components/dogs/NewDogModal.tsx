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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Dog, Loader2 } from 'lucide-react';
import { Owner } from '@/types';

interface NewDogModalProps {
  children: React.ReactNode;
  owners: Owner[];
  preselectedOwnerId?: string;
  onDogCreated?: (dog: {
    name: string;
    breed: string;
    age: number;
    weight: number;
    ownerId: string;
    allergies: string;
    notes: string;
    vaccines: {
      rabies: boolean;
      bordetella: boolean;
      distemper: boolean;
      parvovirus: boolean;
    };
  }) => void;
}

export function NewDogModal({ children, owners, preselectedOwnerId, onDogCreated }: NewDogModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    weight: '',
    ownerId: preselectedOwnerId || '',
    allergies: '',
    notes: '',
    vaccines: {
      rabies: false,
      bordetella: false,
      distemper: false,
      parvovirus: false,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.breed || !formData.ownerId || !formData.age || !formData.weight) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    onDogCreated?.({
      ...formData,
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
    });
    
    const selectedOwner = owners.find((o) => o.id === formData.ownerId);
    toast.success(`¡${formData.name} registrado exitosamente! 🐕`, {
      description: `Dueño/a: ${selectedOwner?.firstName} ${selectedOwner?.lastName}`,
    });
    
    setFormData({
      name: '',
      breed: '',
      age: '',
      weight: '',
      ownerId: preselectedOwnerId || '',
      allergies: '',
      notes: '',
      vaccines: {
        rabies: false,
        bordetella: false,
        distemper: false,
        parvovirus: false,
      },
    });
    setLoading(false);
    setOpen(false);
  };

  const handleVaccineChange = (vaccine: keyof typeof formData.vaccines) => {
    setFormData({
      ...formData,
      vaccines: {
        ...formData.vaccines,
        [vaccine]: !formData.vaccines[vaccine],
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Dog className="h-5 w-5" />
            Nuevo Perrihijo
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Owner Selection */}
          <div className="space-y-2">
            <Label htmlFor="owner">Dueño/a *</Label>
            <Select
              value={formData.ownerId}
              onValueChange={(value) => setFormData({ ...formData, ownerId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el dueño/a" />
              </SelectTrigger>
              <SelectContent>
                {owners.map((owner) => (
                  <SelectItem key={owner.id} value={owner.id}>
                    {owner.firstName} {owner.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                placeholder="Nombre del perrihijo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="breed">Raza *</Label>
              <Input
                id="breed"
                placeholder="Ej: Golden Retriever"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Edad (años) *</Label>
              <Input
                id="age"
                type="number"
                min="0"
                max="25"
                placeholder="Ej: 3"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Peso (kg) *</Label>
              <Input
                id="weight"
                type="number"
                min="0"
                step="0.1"
                placeholder="Ej: 15.5"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Vaccines */}
          <div className="space-y-3">
            <Label>Vacunas</Label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(formData.vaccines).map(([vaccine, checked]) => (
                <div key={vaccine} className="flex items-center gap-2">
                  <Checkbox
                    id={vaccine}
                    checked={checked}
                    onCheckedChange={() => handleVaccineChange(vaccine as keyof typeof formData.vaccines)}
                  />
                  <label htmlFor={vaccine} className="text-sm capitalize cursor-pointer">
                    {vaccine}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Info */}
          <div className="space-y-2">
            <Label htmlFor="allergies">Alergias</Label>
            <Input
              id="allergies"
              placeholder="Ej: Pollo, Gluten"
              value={formData.allergies}
              onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas de Cuidado</Label>
            <Textarea
              id="notes"
              placeholder="Información importante sobre el perrihijo..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
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
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Guardando...
                </>
              ) : (
                'Registrar Perrihijo'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
