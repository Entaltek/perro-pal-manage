import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DogList } from '@/components/dogs/DogList';
import { mockDogs } from '@/data/mockData';
import { Dog } from '@/types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
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
} from 'lucide-react';

export default function Dogs() {
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);

  return (
    <MainLayout>
      <DogList dogs={mockDogs} onDogClick={setSelectedDog} />

      {/* Dog Detail Sheet */}
      <Sheet open={!!selectedDog} onOpenChange={() => setSelectedDog(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedDog && (
            <>
              <SheetHeader className="text-left">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-muted flex-shrink-0">
                    {selectedDog.photo ? (
                      <img
                        src={selectedDog.photo}
                        alt={selectedDog.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full gradient-warm flex items-center justify-center text-3xl font-bold text-primary-foreground">
                        {selectedDog.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <SheetTitle className="text-2xl font-display">
                      {selectedDog.name}
                    </SheetTitle>
                    <p className="text-muted-foreground">
                      {selectedDog.breed} • {selectedDog.age} años • {selectedDog.weight}kg
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge>{selectedDog.status === 'checked-in' ? '🟢 En guardería' : '🏠 En casa'}</Badge>
                    </div>
                  </div>
                </div>
              </SheetHeader>

              <Tabs defaultValue="medical" className="mt-6">
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

                <TabsContent value="medical" className="space-y-6 mt-4">
                  {/* Vaccines */}
                  <div className="glass-card p-4">
                    <h4 className="font-semibold mb-3">Vacunas</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(selectedDog.medical.vaccines).map(([vaccine, status]) => (
                        <div
                          key={vaccine}
                          className={`flex items-center gap-2 p-2 rounded-lg ${
                            status ? 'bg-success/10' : 'bg-destructive/10'
                          }`}
                        >
                          {status ? (
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
                    <Badge variant={selectedDog.medical.dewormed ? 'default' : 'destructive'}>
                      {selectedDog.medical.dewormed ? '✓ Al día' : '⚠ Pendiente'}
                    </Badge>
                  </div>

                  {/* Medications */}
                  {selectedDog.medical.medications.length > 0 && (
                    <div className="glass-card p-4">
                      <h4 className="font-semibold mb-3">Medicamentos</h4>
                      <div className="space-y-2">
                        {selectedDog.medical.medications.map((med) => (
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
                    <p className="text-muted-foreground">{selectedDog.medical.allergies || 'Ninguna conocida'}</p>
                  </div>
                </TabsContent>

                <TabsContent value="care" className="space-y-4 mt-4">
                  <div className="glass-card p-4">
                    <h4 className="font-semibold mb-2">Notas de Cuidado</h4>
                    <p className="text-muted-foreground">{selectedDog.medical.notes || 'Sin notas'}</p>
                  </div>
                  <div className="glass-card p-4">
                    <h4 className="font-semibold mb-2">Limitaciones Físicas</h4>
                    <p className="text-muted-foreground">{selectedDog.medical.limitations || 'Ninguna'}</p>
                  </div>
                </TabsContent>

                <TabsContent value="photos" className="mt-4">
                  <div className="text-center py-12 text-muted-foreground">
                    <Camera className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Las fotos del día aparecerán aquí</p>
                    <Button variant="outline" className="mt-4">
                      Subir Fotos
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="mt-4">
                  <div className="text-center py-12 text-muted-foreground">
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
            </>
          )}
        </SheetContent>
      </Sheet>
    </MainLayout>
  );
}
