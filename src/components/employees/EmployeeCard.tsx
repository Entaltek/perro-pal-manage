import { Employee } from '@/types';
import { Badge } from '@/components/ui/badge';
import { mockDogs } from '@/data/mockData';
import { Phone, Mail, Dog } from 'lucide-react';

interface EmployeeCardProps {
  employee: Employee;
  onClick?: () => void;
}

const roleLabels: Record<Employee['role'], string> = {
  caretaker: 'Cuidador',
  admin: 'Administrador',
  groomer: 'Estilista',
  trainer: 'Entrenador',
};

const roleColors: Record<Employee['role'], string> = {
  caretaker: 'bg-primary/10 text-primary',
  admin: 'bg-accent/10 text-accent',
  groomer: 'bg-secondary/10 text-secondary-foreground',
  trainer: 'bg-success/10 text-success',
};

export function EmployeeCard({ employee, onClick }: EmployeeCardProps) {
  const assignedDogs = mockDogs.filter((dog) =>
    employee.assignedDogs.includes(dog.id)
  );

  return (
    <div
      className="glass-card p-5 hover-lift cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {/* Photo */}
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-muted flex-shrink-0">
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

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-semibold text-foreground truncate">
              {employee.firstName} {employee.lastName}
            </h3>
            <Badge
              variant="outline"
              className={`${roleColors[employee.role]} border-0 text-xs`}
            >
              {roleLabels[employee.role]}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span className="truncate">{employee.phone}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Mail className="h-3 w-3" />
            <span className="truncate">{employee.email}</span>
          </div>
        </div>
      </div>

      {/* Assigned Dogs */}
      {employee.role === 'caretaker' && assignedDogs.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Dog className="h-4 w-4" />
            <span>Perritos a cargo ({assignedDogs.length})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {assignedDogs.slice(0, 3).map((dog) => (
              <div
                key={dog.id}
                className="flex items-center gap-2 bg-muted rounded-lg px-2 py-1"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  {dog.photo ? (
                    <img
                      src={dog.photo}
                      alt={dog.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center text-xs">
                      {dog.name.charAt(0)}
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium">{dog.name}</span>
              </div>
            ))}
            {assignedDogs.length > 3 && (
              <span className="text-xs text-muted-foreground self-center">
                +{assignedDogs.length - 3} más
              </span>
            )}
          </div>
        </div>
      )}

      {/* Status Badge */}
      <div className="absolute top-3 right-3">
        <Badge
          variant={employee.status === 'active' ? 'default' : 'secondary'}
          className="text-xs"
        >
          {employee.status === 'active' ? 'Activo' : 'Inactivo'}
        </Badge>
      </div>
    </div>
  );
}
