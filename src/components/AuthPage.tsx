import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car, Mail, Phone, User, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import heroImage from '@/assets/hero-cars.jpg';

interface AuthPageProps {
  onLogin: () => void;
}

const AuthPage = ({ onLogin }: AuthPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Handle signup with email verification
  const handleSignUp = async () => {
    if (!email || !password || !name || !phone) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: name,
            phone: phone,
          }
        }
      });

      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ 
          type: 'success', 
          text: 'Account created! Please check your email for verification link before signing in.' 
        });
        // Clear form
        setEmail('');
        setPassword('');
        setName('');
        setPhone('');
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle login
  const handleSignIn = async () => {
    if (!email || !password) {
      setMessage({ type: 'error', text: 'Please enter email and password' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message === 'Email not confirmed') {
          setMessage({ 
            type: 'error', 
            text: 'Please verify your email address before signing in. Check your inbox for verification link.' 
          });
        } else {
          setMessage({ type: 'error', text: error.message });
        }
      } else if (data.user && !data.user.email_confirmed_at) {
        setMessage({ 
          type: 'error', 
          text: 'Please verify your email address before signing in. Check your inbox for verification link.' 
        });
        await supabase.auth.signOut();
      } else {
        onLogin(); // Redirect to homepage
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Hero Section */}
        <div className="text-white space-y-6">
          <div className="flex items-center space-x-3 mb-8">
            <Car className="h-8 w-8 text-white" />
            <h1 className="text-3xl font-bold">LekhaBorgini</h1>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
            Premium Car Rentals in Vijayawada
          </h2>
          
          <p className="text-xl text-white/90">
            Explore Andhra Pradesh with our verified cars. Easy booking, secure payment, and 24/7 support.
          </p>
          
          <div className="hidden lg:block">
            <img 
              src={heroImage} 
              alt="Luxury cars available for rent" 
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Welcome Back</CardTitle>
                  <CardDescription>
                    Sign in to your LekhaBorgini account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {message && (
                    <Alert className={message.type === 'error' ? 'border-red-500 text-red-700' : 'border-green-500 text-green-700'}>
                      {message.type === 'error' ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      <AlertDescription>{message.text}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleSignIn}
                    disabled={isLoading}
                    className="w-full bg-gradient-primary hover:bg-primary-hover shadow-button"
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Signup Form */}
            <TabsContent value="signup">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Create Account</CardTitle>
                  <CardDescription>
                    Join LekhaBorgini for seamless car rentals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {message && (
                    <Alert className={message.type === 'error' ? 'border-red-500 text-red-700' : 'border-green-500 text-green-700'}>
                      {message.type === 'error' ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      <AlertDescription>{message.text}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleSignUp}
                    disabled={isLoading}
                    className="w-full bg-gradient-primary hover:bg-primary-hover shadow-button"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;