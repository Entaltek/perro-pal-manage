import { MainLayout } from '@/components/layout/MainLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { RecentCheckIns } from '@/components/dashboard/RecentCheckIns';
import { PeakHoursChart } from '@/components/dashboard/PeakHoursChart';
import { QuickCheckInModal } from '@/components/dashboard/QuickCheckInModal';
import { Button } from '@/components/ui/button';
import { mockMetrics, mockCheckIns, peakHoursData } from '@/data/mockData';
import {
  Dog,
  Calendar,
  TrendingUp,
  Clock,
  Users,
  Percent,
  Plus,
  CalendarCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              ¡Bienvenido a Entaltek Sabueso!
            </h1>
            <p className="text-muted-foreground mt-1">
              Panel de control de tu guardería canina
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/attendance">
              <Button variant="outline" className="gap-2">
                <CalendarCheck className="h-4 w-4" />
                Ver Asistencia
              </Button>
            </Link>
            <QuickCheckInModal>
              <Button variant="hero" className="gap-2">
                <Plus className="h-4 w-4" />
                Quick Check-in
              </Button>
            </QuickCheckInModal>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <MetricCard
            title="Hoy"
            value={mockMetrics.todayDogs}
            subtitle="perrihijos"
            icon={<Dog className="h-6 w-6 text-primary" />}
            variant="primary"
          />
          <MetricCard
            title="Esta Semana"
            value={mockMetrics.weekDogs}
            subtitle="visitas"
            icon={<Calendar className="h-6 w-6 text-primary" />}
            trend={{ value: 12, positive: true }}
          />
          <MetricCard
            title="Este Mes"
            value={mockMetrics.monthDogs}
            subtitle="visitas totales"
            icon={<TrendingUp className="h-6 w-6 text-primary" />}
            trend={{ value: 8, positive: true }}
          />
          <MetricCard
            title="Promedio Diario"
            value={mockMetrics.avgAttendance}
            subtitle="perrihijos/día"
            icon={<Users className="h-6 w-6 text-primary" />}
          />
          <MetricCard
            title="Estancia Promedio"
            value={`${mockMetrics.avgStayDuration}h`}
            subtitle="por visita"
            icon={<Clock className="h-6 w-6 text-primary" />}
          />
          <MetricCard
            title="Ocupación"
            value={`${mockMetrics.occupancyRate}%`}
            subtitle={`${mockMetrics.todayDogs}/${mockMetrics.totalCapacity} lugares`}
            icon={<Percent className="h-6 w-6 text-primary" />}
            variant="success"
          />
        </div>

        {/* Charts & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PeakHoursChart data={peakHoursData} />
          <RecentCheckIns checkIns={mockCheckIns} />
        </div>
      </div>
    </MainLayout>
  );
}
