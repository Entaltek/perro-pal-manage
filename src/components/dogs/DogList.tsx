import { useState } from 'react';
import { Dog } from '@/types';
import { DogCard } from './DogCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Plus, Dog as DogIcon } from 'lucide-react';

interface DogListProps {
  dogs: Dog[];
  onDogClick?: (dog: Dog) => void;
}

export function DogList({ dogs, onDogClick }: DogListProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredDogs = dogs.filter((dog) => {
    const matchesSearch =
      dog.name.toLowerCase().includes(search.toLowerCase()) ||
      dog.breed.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || dog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Perrihijos
          </h2>
          <p className="text-muted-foreground">
            {dogs.length} registrados • {dogs.filter((d) => d.status === 'checked-in').length} en guardería
          </p>
        </div>
        <Button variant="gradient" className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Perrihijo
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o raza..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="checked-in">En guardería</SelectItem>
            <SelectItem value="checked-out">En casa</SelectItem>
            <SelectItem value="reserved">Reservado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDogs.map((dog, index) => (
          <div
            key={dog.id}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <DogCard dog={dog} onClick={() => onDogClick?.(dog)} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDogs.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
            <DogIcon className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="font-display font-bold text-lg text-foreground mb-2">
            No se encontraron perrihijos
          </h3>
          <p className="text-muted-foreground">
            {search ? 'Intenta con otro término de búsqueda' : 'Registra tu primer perrihijo'}
          </p>
        </div>
      )}
    </div>
  );
}
