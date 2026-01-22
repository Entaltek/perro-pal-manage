import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { DogCard } from '@/components/dogs/DogCard';
import { DogDetailModal } from '@/components/dogs/DogDetailModal';
import { NewDogModal } from '@/components/dogs/NewDogModal';
import { mockEmployees, mockDogs, mockOwners, mockCheckIns, mockAttendanceHistory } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Dog as DogIcon,
  Briefcase,
  Clock,
  Plus,
  UserPlus,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Dog, Employee } from '@/types';
import { toast } from 'sonner';

const roleLabels: Record<Employee['role'], string> = {
  caretaker: 'Cuidador',
  admin: 'Administrador',
  groomer: 'Estilista',
  trainer: 'Entrenador',
};

export default function EmployeeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [dogModalOpen, setDogModalOpen] = useState(false);
  const [assignDogId, setAssignDogId] = useState('');

  const employee = mockEmployees.find((e) => e.id === id);

  if (!employee) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <DogIcon className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-display font-bold mb-2">Empleado no encontrado</h2>
          <p className="text-muted-foreground mb-4">El empleado que buscas no existe.</p>
          <Button onClick={() => navigate('/employees')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Empleados
          </Button>
        </div>
      </MainLayout>
    );
  }

  const assignedDogs = mockDogs.filter((dog) =>
    employee.assignedDogs.includes(dog.id)
  );

  const unassignedDogs = mockDogs.filter(
    (dog) => !employee.assignedDogs.includes(dog.id)
  );

  const getDogOwner = (dog: Dog) =>
    mockOwners.find((o) => o.id === dog.ownerId) || null;

  // Get recent check-ins handled by this employee
  const allCheckIns = [...mockCheckIns, ...mockAttendanceHistory];
  const employeeCheckIns = allCheckIns
    .filter((c) => c.caretakerId === employee.id)
    .sort((a, b) => new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime())
    .slice(0, 10);

  const handleDogClick = (dog: Dog) => {
    setSelectedDog(dog);
    setDogModalOpen(true);
  };

  const handleAssignDog = () => {
    if (!assignDogId) return;
    const dog = mockDogs.find((d) => d.id === assignDogId);
    if (dog) {
      toast.success(`¡${dog.name} asignado a ${employee.firstName}! 🐕`);
      setAssignDogId('');
    }
  };

  const handleDogCreated = (dogData: any) => {
    toast.success(`¡Nuevo perrihijo registrado y asignado a ${employee.firstName}!`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => navigate('/employees')}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Cuidadores
        </Button>

        {/* Header */}
        <div className="glass-card p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Photo */}
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-muted flex-shrink-0">
              {employee.photo ? (
                <img
                  src={employee.photo}
                  alt={`${employee.firstName} ${employee.lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full gradient-warm flex items-center justify-center text-3xl font-bold text-primary-foreground">
                  {employee.firstName.charAt(0)}
                  {employee.lastName.charAt(0)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl font-display font-bold text-foreground">
                  {employee.firstName} {employee.lastName}
                </h1>
                <Badge variant="outline">{roleLabels[employee.role]}</Badge>
                <Badge
                  variant={employee.status === 'active' ? 'default' : 'secondary'}
                >
                  {employee.status === 'active' ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    Desde {format(new Date(employee.hireDate), "MMMM yyyy", { locale: es })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-display font-bold text-primary">
              {assignedDogs.length}
            </div>
            <div className="text-sm text-muted-foreground">Perritos a Cargo</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-display font-bold text-success">
              {assignedDogs.filter((d) => d.status === 'checked-in').length}
            </div>
            <div className="text-sm text-muted-foreground">En Guardería Hoy</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-display font-bold text-foreground">
              {employeeCheckIns.length}
            </div>
            <div className="text-sm text-muted-foreground">Check-ins Recientes</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-display font-bold text-secondary-foreground">
              {new Set(assignedDogs.map((d) => d.ownerId)).size}
            </div>
            <div className="text-sm text-muted-foreground">Familias</div>
          </div>
        </div>

        {/* Assigned Dogs Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <h2 className="text-xl font-display font-semibold text-foreground flex items-center gap-2">
              <DogIcon className="h-5 w-5 text-primary" />
              Perritos a Cargo ({assignedDogs.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {/* Assign existing dog */}
              <div className="flex gap-2">
                <Select value={assignDogId} onValueChange={setAssignDogId}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Asignar perrito..." />
                  </SelectTrigger>
                  <SelectContent>
                    {unassignedDogs.map((dog) => (
                      <SelectItem key={dog.id} value={dog.id}>
                        {dog.name} ({dog.breed})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleAssignDog}
                  disabled={!assignDogId}
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>

              {/* Add new dog */}
              <NewDogModal owners={mockOwners} onDogCreated={handleDogCreated}>
                <Button variant="gradient" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nuevo Perrihijo
                </Button>
              </NewDogModal>
            </div>
          </div>

          {assignedDogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assignedDogs.map((dog) => (
                <DogCard
                  key={dog.id}
                  dog={dog}
                  onClick={() => handleDogClick(dog)}
                />
              ))}
            </div>
          ) : (
            <div className="glass-card p-8 text-center">
              <DogIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                Este cuidador no tiene perritos asignados todavía.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Usa el selector de arriba para asignar perritos o registra uno nuevo.
              </p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Actividad Reciente
          </h3>
          {employeeCheckIns.length > 0 ? (
            <div className="space-y-2">
              {employeeCheckIns.map((checkIn) => (
                <div
                  key={checkIn.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-background">
                      {mockDogs.find((d) => d.id === checkIn.dogId)?.photo ? (
                        <img
                          src={mockDogs.find((d) => d.id === checkIn.dogId)?.photo}
                          alt={checkIn.dogName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full gradient-warm flex items-center justify-center text-xs font-bold text-primary-foreground">
                          {checkIn.dogName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{checkIn.dogName}</div>
                      <div className="text-xs text-muted-foreground">
                        {checkIn.ownerName}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {checkIn.serviceType === 'hotel' ? '🏨 Hotel' : '☀️ Guardería'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(checkIn.checkInTime), "dd MMM yyyy", { locale: es })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              Sin actividad reciente.
            </p>
          )}
        </div>
      </div>

      {/* Dog Detail Modal */}
      <DogDetailModal
        dog={selectedDog}
        owner={selectedDog ? getDogOwner(selectedDog) : null}
        open={dogModalOpen}
        onOpenChange={setDogModalOpen}
      />
    </MainLayout>
  );
}
