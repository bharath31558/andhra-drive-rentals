import { useState } from 'react';
import AuthPage from '@/components/AuthPage';
import Homepage from '@/components/Homepage';
import BookingFlow from '@/components/BookingFlow';
import BookingHistory from '@/components/BookingHistory';

type AppState = 'auth' | 'homepage' | 'booking' | 'history';

const Index = () => {
  const [currentView, setCurrentView] = useState<AppState>('auth');
  const [selectedCarId, setSelectedCarId] = useState<string>('');

  // Handle user login
  const handleLogin = () => {
    setCurrentView('homepage');
  };

  // Handle user logout
  const handleLogout = () => {
    setCurrentView('auth');
  };

  // Handle car booking
  const handleBookCar = (carId: string) => {
    setSelectedCarId(carId);
    setCurrentView('booking');
  };

  // Handle booking completion
  const handleBookingComplete = () => {
    setCurrentView('homepage');
  };

  // Handle view bookings
  const handleViewBookings = () => {
    setCurrentView('history');
  };

  // Handle back navigation
  const handleBack = () => {
    setCurrentView('homepage');
  };

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'auth':
        return <AuthPage onLogin={handleLogin} />;
      
      case 'homepage':
        return (
          <Homepage 
            onLogout={handleLogout}
            onBookCar={handleBookCar}
            onViewBookings={handleViewBookings}
          />
        );
      
      case 'booking':
        return (
          <BookingFlow 
            carId={selectedCarId}
            onBack={handleBack}
            onBookingComplete={handleBookingComplete}
          />
        );
      
      case 'history':
        return <BookingHistory onBack={handleBack} />;
      
      default:
        return <AuthPage onLogin={handleLogin} />;
    }
  };

  return renderCurrentView();
};

export default Index;
