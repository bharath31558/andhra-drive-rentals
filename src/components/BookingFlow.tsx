import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, CreditCard, CheckCircle, Car, IndianRupee } from 'lucide-react';
import { cars, cities, optionalFacilities } from '@/data/mockData';

interface BookingFlowProps {
  carId: string;
  onBack: () => void;
  onBookingComplete: () => void;
}

const BookingFlow = ({ carId, onBack, onBookingComplete }: BookingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [pickupCity, setPickupCity] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Find the selected car
  const selectedCar = cars.find(car => car.id === carId);
  
  if (!selectedCar) {
    return <div>Car not found</div>;
  }

  // Calculate total price
  const calculateTotalPrice = () => {
    const days = startDate && endDate 
      ? Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24))
      : 1;
    
    const carPrice = selectedCar.pricePerDay * days;
    const facilitiesPrice = selectedFacilities.reduce((total, facilityId) => {
      const facility = optionalFacilities.find(f => f.id === facilityId);
      return total + (facility ? facility.price : 0);
    }, 0);
    
    return { days, carPrice, facilitiesPrice, total: carPrice + facilitiesPrice };
  };

  const pricing = calculateTotalPrice();

  // Handle facility selection
  const handleFacilityToggle = (facilityId: string) => {
    setSelectedFacilities(prev => 
      prev.includes(facilityId) 
        ? prev.filter(id => id !== facilityId)
        : [...prev, facilityId]
    );
  };

  // Handle payment processing
  const handlePayment = async () => {
    setIsProcessingPayment(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      setCurrentStep(4); // Move to confirmation
    }, 3000);
  };

  const steps = [
    { number: 1, title: 'Select Locations', icon: MapPin },
    { number: 2, title: 'Choose Dates & Facilities', icon: Calendar },
    { number: 3, title: 'Payment', icon: CreditCard },
    { number: 4, title: 'Confirmation', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              <Car className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-lg font-semibold">Book {selectedCar.name}</h1>
                <p className="text-sm text-muted-foreground">{selectedCar.model} Model</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                  ${currentStep >= step.number 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-muted-foreground text-muted-foreground'
                  }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <span className={`ml-2 text-sm font-medium hidden sm:block
                  ${currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'}
                `}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 sm:w-24 h-0.5 ml-4 sm:ml-8
                    ${currentStep > step.number ? 'bg-primary' : 'bg-muted'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Select Locations */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Select Pickup & Drop Locations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="pickup-city">Pickup City</Label>
                    <Select value={pickupCity} onValueChange={setPickupCity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your pickup city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map(city => (
                          <SelectItem key={city.id} value={city.name}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="pickup-location">Pickup Location</Label>
                    <Input
                      id="pickup-location"
                      placeholder="Enter specific pickup address"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="drop-location">Drop Location</Label>
                    <Input
                      id="drop-location"
                      placeholder="Enter drop-off address"
                      value={dropLocation}
                      onChange={(e) => setDropLocation(e.target.value)}
                    />
                  </div>

                  <Button 
                    onClick={() => setCurrentStep(2)}
                    className="w-full bg-gradient-primary"
                    disabled={!pickupCity || !pickupLocation || !dropLocation}
                  >
                    Continue to Dates & Facilities
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Choose Dates & Facilities */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Select Dates & Optional Facilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-date">End Date</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Optional Facilities</Label>
                    <div className="mt-3 space-y-3">
                      {optionalFacilities.map(facility => (
                        <div key={facility.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={facility.id}
                            checked={selectedFacilities.includes(facility.id)}
                            onCheckedChange={() => handleFacilityToggle(facility.id)}
                          />
                          <Label htmlFor={facility.id} className="flex-1">
                            {facility.name}
                          </Label>
                          <span className="text-sm font-medium">₹{facility.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => setCurrentStep(3)}
                    className="w-full bg-gradient-primary"
                    disabled={!startDate || !endDate}
                  >
                    Proceed to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-accent p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Booking Summary</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Car rental ({pricing.days} days)</span>
                        <span>₹{pricing.carPrice}</span>
                      </div>
                      {selectedFacilities.length > 0 && (
                        <div className="flex justify-between">
                          <span>Optional facilities</span>
                          <span>₹{pricing.facilitiesPrice}</span>
                        </div>
                      )}
                      <div className="border-t pt-1 flex justify-between font-medium">
                        <span>Total Amount</span>
                        <span>₹{pricing.total}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handlePayment}
                    className="w-full bg-gradient-primary"
                    disabled={isProcessingPayment}
                  >
                    {isProcessingPayment ? 'Processing Payment...' : `Pay ₹${pricing.total}`}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl text-green-600">Booking Confirmed!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-accent p-4 rounded-lg">
                    <h3 className="font-medium mb-4">Booking Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Booking ID:</span>
                        <span className="font-mono">LB{Date.now().toString().slice(-6)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Car:</span>
                        <span>{selectedCar.name} {selectedCar.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pickup:</span>
                        <span>{pickupLocation}, {pickupCity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{pricing.days} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Paid:</span>
                        <span className="font-semibold">₹{pricing.total}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    <p>Confirmation email sent to your registered email address.</p>
                    <p>Please keep this booking reference for pickup.</p>
                  </div>

                  <Button 
                    onClick={onBookingComplete}
                    className="w-full bg-gradient-primary"
                  >
                    Continue to Homepage
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Car Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Your Selection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <img
                    src={selectedCar.image}
                    alt={selectedCar.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                
                <div>
                  <h3 className="font-semibold">{selectedCar.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedCar.model} Model</p>
                  <p className="text-lg font-bold text-primary">₹{selectedCar.pricePerDay}/day</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Included Facilities:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedCar.facilities.map((facility, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>

                {currentStep >= 2 && startDate && endDate && (
                  <div className="pt-4 border-t">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{pricing.days} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Car rental:</span>
                        <span>₹{pricing.carPrice}</span>
                      </div>
                      {pricing.facilitiesPrice > 0 && (
                        <div className="flex justify-between">
                          <span>Facilities:</span>
                          <span>₹{pricing.facilitiesPrice}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold text-base pt-2 border-t">
                        <span>Total:</span>
                        <span className="text-primary">₹{pricing.total}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;