import { MainLayout } from '@/components/layout/MainLayout';
import { mockServices } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, DollarSign, Clock } from 'lucide-react';

const typeConfig = {
  daycare: { label: 'Guardería', emoji: '☀️', color: 'bg-sun-yellow' },
  hotel: { label: 'Hotel', emoji: '🏨', color: 'bg-primary' },
  grooming: { label: 'Estética', emoji: '✨', color: 'bg-grass-green' },
  training: { label: 'Entrenamiento', emoji: '🎓', color: 'bg-accent' },
};

export default function Services() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Catálogo de Servicios
            </h2>
            <p className="text-muted-foreground">
              Configura los servicios que ofreces
            </p>
          </div>
          <Button variant="gradient" className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Servicio
          </Button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockServices.map((service, index) => {
            const type = typeConfig[service.type];
            return (
              <div
                key={service.id}
                className="glass-card p-5 animate-scale-in hover-lift"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${type.color} flex items-center justify-center text-2xl`}>
                      {type.emoji}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground">
                        {service.name}
                      </h3>
                      <Badge variant="secondary" className="mt-1">
                        {type.label}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4">
                  {service.description}
                </p>

                {/* Details */}
                <div className="flex items-center gap-4 text-sm mb-4">
                  <div className="flex items-center gap-1 text-foreground">
                    <DollarSign className="h-4 w-4 text-success" />
                    <span className="font-bold">${service.price}</span>
                  </div>
                  {service.duration && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {service.duration}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <Edit className="h-3 w-3" />
                    Editar
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
