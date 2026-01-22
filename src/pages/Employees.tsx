import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { EmployeeCard } from '@/components/employees/EmployeeCard';
import { NewEmployeeModal } from '@/components/employees/NewEmployeeModal';
import { mockEmployees } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Users } from 'lucide-react';
import { usePagination } from '@/hooks/usePagination';
import { PaginationControls } from '@/components/common/PaginationControls';
import { Employee } from '@/types';

export default function Employees() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filteredEmployees = mockEmployees.filter((employee) => {
    const matchesSearch =
      `${employee.firstName} ${employee.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || employee.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const { currentItems, currentPage, totalPages, goToPage } = usePagination({
    items: filteredEmployees,
    itemsPerPage: 6,
  });

  const handleEmployeeClick = (employee: Employee) => {
    navigate(`/employees/${employee.id}`);
  };

  const caretakers = mockEmployees.filter((e) => e.role === 'caretaker');

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Users className="h-7 w-7 text-primary" />
              Empleados
            </h2>
            <p className="text-muted-foreground">
              {mockEmployees.length} empleados registrados • {caretakers.length} cuidadores
            </p>
          </div>
          <NewEmployeeModal>
            <Button variant="gradient" className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Empleado
            </Button>
          </NewEmployeeModal>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar empleados..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtrar por rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los roles</SelectItem>
              <SelectItem value="caretaker">🐕 Cuidadores</SelectItem>
              <SelectItem value="groomer">✂️ Estilistas</SelectItem>
              <SelectItem value="trainer">🎾 Entrenadores</SelectItem>
              <SelectItem value="admin">💼 Administradores</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-display font-bold text-foreground">
              {mockEmployees.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Empleados</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-display font-bold text-primary">
              {caretakers.length}
            </div>
            <div className="text-sm text-muted-foreground">Cuidadores</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-display font-bold text-success">
              {mockEmployees.filter((e) => e.status === 'active').length}
            </div>
            <div className="text-sm text-muted-foreground">Activos</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-display font-bold text-secondary-foreground">
              {mockEmployees.reduce((acc, e) => acc + e.assignedDogs.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Perritos Asignados</div>
          </div>
        </div>

        {/* Employee Grid */}
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentItems.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onClick={() => handleEmployeeClick(employee)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No se encontraron empleados.
          </div>
        )}

        {/* Pagination */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </div>
    </MainLayout>
  );
}
