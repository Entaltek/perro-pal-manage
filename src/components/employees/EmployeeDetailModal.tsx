import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Employee, Dog } from '@/types';
import { mockDogs, mockOwners, mockCheckIns, mockAttendanceHistory } from '@/data/mockData';
import { Phone, Mail, Calendar, Dog as DogIcon, Briefcase, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface EmployeeDetailModalProps {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const roleLabels: Record<Employee['role'], string> = {
  caretaker: 'Cuidador',
  admin: 'Administrador',
  groomer: 'Estilista',
  trainer: 'Entrenador',
};

export function EmployeeDetailModal({
  employee,
  open,
  onOpenChange,
}: EmployeeDetailModalProps) {
  if (!employee) return null;

  const assignedDogs = mockDogs.filter((dog) =>
    employee.assignedDogs.includes(dog.id)
  );

  const getDogOwner = (dog: Dog) =>
    mockOwners.find((o) => o.id === dog.ownerId);

  // Get recent check-ins handled by this employee
  const allCheckIns = [...mockCheckIns, ...mockAttendanceHistory];
  const employeeCheckIns = allCheckIns
    .filter((c) => c.caretakerId === employee.id)
    .sort((a, b) => new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime())
    .slice(0, 5);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl font-display">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-muted flex-shrink-0">
              {employee.photo ? (
                <img
                  src={employee.photo}
                  alt={`${employee.firstName} ${employee.lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full gradient-warm flex items-center justify-center text-xl font-bold text-primary-foreground">
                  {employee.firstName.charAt(0)}
                  {employee.lastName.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <span>
                {employee.firstName} {employee.lastName}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {roleLabels[employee.role]}
                </Badge>
                <Badge
                  variant={employee.status === 'active' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {employee.status === 'active' ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Contact Info */}
          <div className="glass-card p-4">
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary" />
              Información de Contacto
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Desde {format(new Date(employee.hireDate), "MMMM yyyy", { locale: es })}
                </span>
              </div>
            </div>
          </div>

          {/* Assigned Dogs */}
          {employee.role === 'caretaker' && (
            <div className="glass-card p-4">
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <DogIcon className="h-4 w-4 text-primary" />
                Perritos a Cargo ({assignedDogs.length})
              </h4>
              {assignedDogs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {assignedDogs.map((dog) => {
                    const owner = getDogOwner(dog);
                    return (
                      <div
                        key={dog.id}
                        className="flex items-center gap-3 p-3 bg-muted rounded-xl"
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                          {dog.photo ? (
                            <img
                              src={dog.photo}
                              alt={dog.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full gradient-warm flex items-center justify-center text-sm font-bold text-primary-foreground">
                              {dog.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{dog.name}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {dog.breed}
                          </div>
                          {owner && (
                            <div className="text-xs text-muted-foreground truncate">
                              Dueño: {owner.firstName} {owner.lastName}
                            </div>
                          )}
                        </div>
                        <Badge
                          variant={
                            dog.status === 'checked-in'
                              ? 'default'
                              : dog.status === 'reserved'
                              ? 'secondary'
                              : 'outline'
                          }
                          className="text-xs"
                        >
                          {dog.status === 'checked-in'
                            ? 'En guardería'
                            : dog.status === 'reserved'
                            ? 'Reservado'
                            : 'En casa'}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Sin perritos asignados actualmente.
                </p>
              )}
            </div>
          )}

          {/* Recent Activity */}
          <div className="glass-card p-4">
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Actividad Reciente
            </h4>
            {employeeCheckIns.length > 0 ? (
              <div className="space-y-2">
                {employeeCheckIns.map((checkIn) => (
                  <div
                    key={checkIn.id}
                    className="flex items-center justify-between p-2 bg-muted rounded-lg text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{checkIn.dogName}</span>
                      <Badge variant="outline" className="text-xs">
                        {checkIn.serviceType === 'hotel' ? '🏨 Hotel' : '☀️ Guardería'}
                      </Badge>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {format(new Date(checkIn.checkInTime), "dd MMM", { locale: es })}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Sin actividad reciente.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
