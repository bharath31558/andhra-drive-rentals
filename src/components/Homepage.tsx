import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, User, LogOut, Search, Filter, MapPin, Fuel, Users, Star } from 'lucide-react';
import { cars, cities } from '@/data/mockData';

interface HomepageProps {
  onLogout: () => void;
  onBookCar: (carId: string) => void;
  onViewBookings: () => void;
}

const Homepage = ({ onLogout, onBookCar, onViewBookings }: HomepageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCity, setFilterCity] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // Filter cars based on search and filters
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || car.type === filterType;
    
    const matchesPrice = priceRange === 'all' || 
      (priceRange === 'budget' && car.pricePerDay <= 1500) ||
      (priceRange === 'mid' && car.pricePerDay > 1500 && car.pricePerDay <= 2500) ||
      (priceRange === 'premium' && car.pricePerDay > 2500);
    
    return matchesSearch && matchesType && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Car className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">LekhaBorgini</h1>
                <p className="text-xs text-muted-foreground">Vijayawada</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={onViewBookings}
                className="hidden sm:flex"
              >
                My Bookings
              </Button>
              
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome to LekhaBorgini
          </h2>
          <p className="text-muted-foreground text-lg">
            Find and book the perfect car for your journey across Andhra Pradesh
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cars by name or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Button */}
            <Button variant="outline" size="default">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Car Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Hatchback">Hatchback</SelectItem>
                <SelectItem value="Sedan">Sedan</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
                <SelectItem value="Compact SUV">Compact SUV</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Budget (₹0-1500)</SelectItem>
                <SelectItem value="mid">Mid-range (₹1500-2500)</SelectItem>
                <SelectItem value="premium">Premium (₹2500+)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCity} onValueChange={setFilterCity}>
              <SelectTrigger>
                <SelectValue placeholder="Available In" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city.id} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Card key={car.id} className="shadow-card hover:shadow-lg transition-shadow duration-200">
              <div className="relative">
                <img
                  src={car.image}
                  alt={`${car.name} ${car.model}`}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge 
                  className="absolute top-2 right-2 bg-secondary text-secondary-foreground"
                >
                  {car.type}
                </Badge>
              </div>

              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{car.name}</CardTitle>
                    <CardDescription className="text-sm">
                      Model {car.model}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      ₹{car.pricePerDay}
                    </p>
                    <p className="text-xs text-muted-foreground">per day</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Facilities */}
                <div>
                  <p className="text-sm font-medium mb-2">Facilities:</p>
                  <div className="flex flex-wrap gap-1">
                    {car.facilities.slice(0, 3).map((facility, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {facility}
                      </Badge>
                    ))}
                    {car.facilities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{car.facilities.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Quick Info */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Fuel className="h-4 w-4 mr-1" />
                    <span>Petrol</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>5 Seats</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    <span>4.5</span>
                  </div>
                </div>

                {/* Book Button */}
                <Button 
                  onClick={() => onBookCar(car.id)}
                  className="w-full bg-gradient-primary hover:bg-primary-hover shadow-button"
                  disabled={!car.available}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {car.available ? 'Book Now' : 'Not Available'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No cars found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;