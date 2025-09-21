// Mock data for LekhaBorgini Car Rental

export interface Car {
  id: string;
  name: string;
  model: string;
  image: string;
  pricePerDay: number;
  facilities: string[];
  type: string;
  available: boolean;
}

export interface City {
  id: string;
  name: string;
  state: string;
}

// Andhra Pradesh Cities
export const cities: City[] = [
  { id: '1', name: 'Vijayawada', state: 'Andhra Pradesh' },
  { id: '2', name: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { id: '3', name: 'Guntur', state: 'Andhra Pradesh' },
  { id: '4', name: 'Nellore', state: 'Andhra Pradesh' },
  { id: '5', name: 'Kurnool', state: 'Andhra Pradesh' },
  { id: '6', name: 'Rajahmundry', state: 'Andhra Pradesh' },
  { id: '7', name: 'Tirupati', state: 'Andhra Pradesh' },
  { id: '8', name: 'Anantapur', state: 'Andhra Pradesh' },
  { id: '9', name: 'Kadapa', state: 'Andhra Pradesh' },
  { id: '10', name: 'Eluru', state: 'Andhra Pradesh' },
  { id: '11', name: 'Chittoor', state: 'Andhra Pradesh' },
  { id: '12', name: 'Machilipatnam', state: 'Andhra Pradesh' },
];

// Available Cars
export const cars: Car[] = [
  {
    id: '1',
    name: 'Maruti Swift',
    model: '2023',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop',
    pricePerDay: 1200,
    facilities: ['AC', 'Music System', 'GPS'],
    type: 'Hatchback',
    available: true,
  },
  {
    id: '2',
    name: 'Honda City',
    model: '2023',
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&h=400&fit=crop',
    pricePerDay: 1800,
    facilities: ['AC', 'Music System', 'GPS', 'Leather Seats'],
    type: 'Sedan',
    available: true,
  },
  {
    id: '3',
    name: 'Toyota Innova',
    model: '2023',
    image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=600&h=400&fit=crop',
    pricePerDay: 2500,
    facilities: ['AC', 'Music System', 'GPS', '7 Seater', 'USB Charging'],
    type: 'SUV',
    available: true,
  },
  {
    id: '4',
    name: 'Hyundai Creta',
    model: '2023',
    image: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=600&h=400&fit=crop',
    pricePerDay: 2200,
    facilities: ['AC', 'Music System', 'GPS', 'Sunroof', 'Reverse Camera'],
    type: 'SUV',
    available: true,
  },
  {
    id: '5',
    name: 'Mahindra XUV700',
    model: '2023',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop',
    pricePerDay: 3000,
    facilities: ['AC', 'Music System', 'GPS', '7 Seater', 'Premium Audio', 'Sunroof'],
    type: 'SUV',
    available: true,
  },
  {
    id: '6',
    name: 'Tata Nexon',
    model: '2023',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop',
    pricePerDay: 1600,
    facilities: ['AC', 'Music System', 'GPS', 'Safety Features'],
    type: 'Compact SUV',
    available: true,
  },
];

// Optional facilities that can be added
export const optionalFacilities = [
  { id: '1', name: 'Driver', price: 500 },
  { id: '2', name: 'Extra Insurance', price: 200 },
  { id: '3', name: 'Child Seat', price: 100 },
  { id: '4', name: 'GPS Navigation', price: 150 },
  { id: '5', name: 'Phone Charger', price: 50 },
];

// Mock booking data structure
export interface Booking {
  id: string;
  userId: string;
  carId: string;
  pickupCity: string;
  pickupLocation: string;
  dropLocation: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  bookingStatus: 'confirmed' | 'ongoing' | 'completed' | 'cancelled';
  optionalFacilities: string[];
  createdAt: string;
}