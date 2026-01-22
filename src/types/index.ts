export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  photo?: string;
  ownerId: string;
  status: 'checked-in' | 'checked-out' | 'reserved';
  checkInTime?: Date;
  checkOutTime?: Date;
  medical: {
    vaccines: {
      rabies: boolean;
      bordetella: boolean;
      distemper: boolean;
      parvovirus: boolean;
    };
    dewormed: boolean;
    allergies: string;
    medications: Medication[];
    notes: string;
    limitations: string;
  };
  createdAt: Date;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

export interface Owner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  dogs: string[];
  createdAt: Date;
}

export interface CheckIn {
  id: string;
  dogId: string;
  dogName: string;
  ownerName: string;
  serviceType: 'daycare' | 'hotel';
  checkInTime: Date;
  checkOutTime?: Date;
  expectedCheckOut?: Date;
  notes?: string;
  status: 'active' | 'completed';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'daycare' | 'hotel' | 'grooming' | 'training';
  duration?: string;
}

export interface DashboardMetrics {
  todayDogs: number;
  weekDogs: number;
  monthDogs: number;
  avgAttendance: number;
  avgStayDuration: number;
  occupancyRate: number;
  totalCapacity: number;
}
