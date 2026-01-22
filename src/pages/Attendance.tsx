import { MainLayout } from '@/components/layout/MainLayout';
import { mockCheckIns, mockDogs } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QuickCheckInModal } from '@/components/dashboard/QuickCheckInModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Plus, LogOut, Clock, CalendarCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function Attendance() {
  const handleCheckOut = (dogName: string) => {
    toast.success(`¡${dogName} ha salido! 👋`, {
      description: 'Check-out registrado exitosamente',
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Asistencia de Hoy
            </h2>
            <p className="text-muted-foreground">
              {format(new Date(), "EEEE, d 'de' MMMM", { locale: es })}
            </p>
          </div>
          <QuickCheckInModal>
            <Button variant="gradient" className="gap-2">
              <Plus className="h-4 w-4" />
              Registrar Entrada
            </Button>
          </QuickCheckInModal>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-display font-bold text-foreground">
              {mockCheckIns.filter((c) => c.status === 'active').length}
            </div>
            <div className="text-sm text-muted-foreground">Activos Ahora</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-display font-bold text-success">
              {mockCheckIns.filter((c) => c.serviceType === 'daycare').length}
            </div>
            <div className="text-sm text-muted-foreground">Guardería</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-display font-bold text-primary">
              {mockCheckIns.filter((c) => c.serviceType === 'hotel').length}
            </div>
            <div className="text-sm text-muted-foreground">Hotel</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-display font-bold text-foreground">
              20
            </div>
            <div className="text-sm text-muted-foreground">Capacidad Total</div>
          </div>
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Perrihijo</TableHead>
                <TableHead>Dueño</TableHead>
                <TableHead>Servicio</TableHead>
                <TableHead>Entrada</TableHead>
                <TableHead>Salida Est.</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCheckIns.map((checkIn) => {
                const dog = mockDogs.find((d) => d.id === checkIn.dogId);
                return (
                  <TableRow key={checkIn.id} className="animate-fade-in">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                          {dog?.photo ? (
                            <img
                              src={dog.photo}
                              alt={checkIn.dogName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full gradient-warm flex items-center justify-center text-sm font-bold text-primary-foreground">
                              {checkIn.dogName.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold">{checkIn.dogName}</div>
                          <div className="text-xs text-muted-foreground">
                            {dog?.breed}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{checkIn.ownerName}</TableCell>
                    <TableCell>
                      <Badge
                        variant={checkIn.serviceType === 'hotel' ? 'default' : 'secondary'}
                      >
                        {checkIn.serviceType === 'hotel' ? '🏨 Hotel' : '☀️ Guardería'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3" />
                        {format(new Date(checkIn.checkInTime), 'HH:mm')}
                      </div>
                    </TableCell>
                    <TableCell>
                      {checkIn.expectedCheckOut && (
                        <div className="flex items-center gap-1 text-sm">
                          <CalendarCheck className="h-3 w-3" />
                          {format(new Date(checkIn.expectedCheckOut), 'HH:mm')}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => handleCheckOut(checkIn.dogName)}
                      >
                        <LogOut className="h-3 w-3" />
                        Salida
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
