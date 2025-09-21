import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Car, MapPin, Calendar, IndianRupee } from 'lucide-react';
import { cars } from '@/data/mockData';

interface BookingHistoryProps {
  onBack: () => void;
}

// Mock booking data
const mockBookings = [
  {
    id: 'LB123456',
    carId: '1',
    pickupCity: 'Vijayawada',
    pickupLocation: 'Railway Station',
    dropLocation: 'Airport',
    startDate: '2024-01-15',
    endDate: '2024-01-17',
    totalAmount: 3600,
    paymentStatus: 'completed' as const,
    bookingStatus: 'completed' as const,
    optionalFacilities: ['Driver', 'GPS Navigation'],
    createdAt: '2024-01-10'
  },
  {
    id: 'LB789012',
    carId: '3',
    pickupCity: 'Guntur',
    pickupLocation: 'Bus Stand',
    dropLocation: 'City Center',
    startDate: '2024-02-20',
    endDate: '2024-02-22',
    totalAmount: 5700,
    paymentStatus: 'completed' as const,
    bookingStatus: 'ongoing' as const,
    optionalFacilities: ['Extra Insurance'],
    createdAt: '2024-02-18'
  },
  {
    id: 'LB345678',
    carId: '2',
    pickupCity: 'Visakhapatnam',
    pickupLocation: 'Beach Road',
    dropLocation: 'IT Park',
    startDate: '2024-03-01',
    endDate: '2024-03-03',
    totalAmount: 4200,
    paymentStatus: 'completed' as const,
    bookingStatus: 'confirmed' as const,
    optionalFacilities: [],
    createdAt: '2024-02-28'
  }
];

const BookingHistory = ({ onBack }: BookingHistoryProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-orange-100 text-orange-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Trip Completed';
      case 'ongoing':
        return 'Ongoing Trip';
      case 'confirmed':
        return 'Upcoming Trip';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Homepage
            </Button>
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">My Bookings</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Your Booking History
          </h2>
          <p className="text-muted-foreground">
            View all your past and upcoming car rentals
          </p>
        </div>

        <div className="space-y-6">
          {mockBookings.map((booking) => {
            const car = cars.find(c => c.id === booking.carId);
            if (!car) return null;

            return (
              <Card key={booking.id} className="shadow-card">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        Booking #{booking.id}
                        <Badge 
                          className={`ml-3 ${getStatusColor(booking.bookingStatus)}`}
                        >
                          {getStatusText(booking.bookingStatus)}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Booked on {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        ₹{booking.totalAmount}
                      </p>
                      <Badge 
                        variant={booking.paymentStatus === 'completed' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {booking.paymentStatus === 'completed' ? 'Paid' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Car Details */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Vehicle Details
                      </h3>
                      <div className="flex items-center space-x-3">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{car.name}</p>
                          <p className="text-sm text-muted-foreground">{car.model}</p>
                        </div>
                      </div>
                      
                      {booking.optionalFacilities.length > 0 && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Add-ons:</p>
                          <div className="flex flex-wrap gap-1">
                            {booking.optionalFacilities.map((facility, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {facility}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Location Details */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Trip Details
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Pickup</p>
                            <p className="text-sm text-muted-foreground">
                              {booking.pickupLocation}, {booking.pickupCity}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Drop-off</p>
                            <p className="text-sm text-muted-foreground">
                              {booking.dropLocation}, {booking.pickupCity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date Details */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Duration
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Start Date</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(booking.startDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-sm font-medium">End Date</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(booking.endDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="pt-2 border-t">
                          <p className="text-sm font-medium text-primary">
                            {Math.ceil((new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 3600 * 24))} days total
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-4 border-t flex gap-3">
                    <Button variant="outline" size="sm">
                      View Receipt
                    </Button>
                    {booking.bookingStatus === 'confirmed' && (
                      <Button variant="outline" size="sm">
                        Modify Booking
                      </Button>
                    )}
                    {booking.bookingStatus === 'completed' && (
                      <Button variant="outline" size="sm">
                        Book Again
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {mockBookings.length === 0 && (
          <div className="text-center py-12">
            <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No bookings yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Start exploring our cars to make your first booking
            </p>
            <Button onClick={onBack} className="bg-gradient-primary">
              Browse Cars
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;