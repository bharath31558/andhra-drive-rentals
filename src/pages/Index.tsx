import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import AuthPage from '@/components/AuthPage';
import Homepage from '@/components/Homepage';
import BookingFlow from '@/components/BookingFlow';
import BookingHistory from '@/components/BookingHistory';

type AppState = 'auth' | 'homepage' | 'booking' | 'history';

const Index = () => {
  const [currentView, setCurrentView] = useState<AppState>('auth');
  const [selectedCarId, setSelectedCarId] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && session.user.email_confirmed_at) {
          setCurrentView('homepage');
        } else {
          setCurrentView('auth');
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user && session.user.email_confirmed_at) {
        setCurrentView('homepage');
      } else {
        setCurrentView('auth');
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle user login
  const handleLogin = () => {
    setCurrentView('homepage');
  };

  // Handle user logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

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
