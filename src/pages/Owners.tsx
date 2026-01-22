import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { OwnerCard } from '@/components/owners/OwnerCard';
import { mockOwners, mockDogs } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Users } from 'lucide-react';

export default function Owners() {
  const [search, setSearch] = useState('');

  const filteredOwners = mockOwners.filter((owner) => {
    const fullName = `${owner.firstName} ${owner.lastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase()) ||
           owner.email.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Padres & Madres
            </h2>
            <p className="text-muted-foreground">
              {mockOwners.length} familias registradas
            </p>
          </div>
          <Button variant="gradient" className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Padre/Madre
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOwners.map((owner, index) => {
            const ownerDogs = mockDogs.filter((dog) => dog.ownerId === owner.id);
            return (
              <div
                key={owner.id}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <OwnerCard owner={owner} dogs={ownerDogs} />
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredOwners.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Users className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-display font-bold text-lg text-foreground mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-muted-foreground">
              Intenta con otro término de búsqueda
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
