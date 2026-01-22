import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { OwnerCard } from '@/components/owners/OwnerCard';
import { OwnerDetailModal } from '@/components/owners/OwnerDetailModal';
import { NewOwnerModal } from '@/components/owners/NewOwnerModal';
import { NewDogModal } from '@/components/dogs/NewDogModal';
import { DogDetailModal } from '@/components/dogs/DogDetailModal';
import { mockOwners, mockDogs } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Users } from 'lucide-react';
import { usePagination } from '@/hooks/usePagination';
import { PaginationControls } from '@/components/common/PaginationControls';
import { Owner, Dog } from '@/types';

export default function Owners() {
  const [search, setSearch] = useState('');
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [ownerModalOpen, setOwnerModalOpen] = useState(false);
  const [dogModalOpen, setDogModalOpen] = useState(false);

  const filteredOwners = mockOwners.filter((owner) => {
    const fullName = `${owner.firstName} ${owner.lastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase()) ||
           owner.email.toLowerCase().includes(search.toLowerCase());
  });

  const { currentItems, currentPage, totalPages, goToPage } = usePagination({
    items: filteredOwners,
    itemsPerPage: 6,
  });

  const handleOwnerClick = (owner: Owner) => {
    setSelectedOwner(owner);
    setOwnerModalOpen(true);
  };

  const handleDogClick = (dog: Dog) => {
    setSelectedDog(dog);
    setDogModalOpen(true);
  };

  const getOwnerDogs = (owner: Owner) => {
    return mockDogs.filter((dog) => dog.ownerId === owner.id);
  };

  const getDogOwner = (dog: Dog) => {
    return mockOwners.find((owner) => owner.id === dog.ownerId) || null;
  };

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
          <NewOwnerModal>
            <Button variant="gradient" className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Padre/Madre
            </Button>
          </NewOwnerModal>
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
          {currentItems.map((owner, index) => {
            const ownerDogs = getOwnerDogs(owner);
            return (
              <div
                key={owner.id}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <OwnerCard
                  owner={owner}
                  dogs={ownerDogs}
                  onClick={() => handleOwnerClick(owner)}
                />
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />

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

      {/* Owner Detail Modal */}
      <OwnerDetailModal
        owner={selectedOwner}
        dogs={selectedOwner ? getOwnerDogs(selectedOwner) : []}
        open={ownerModalOpen}
        onOpenChange={setOwnerModalOpen}
        onDogClick={handleDogClick}
        onAddDog={() => {
          // Could open NewDogModal with preselected owner
        }}
      />

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
