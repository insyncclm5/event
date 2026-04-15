import { Link } from 'react-router-dom';
import { Calendar, Users, QrCode, Award, ArrowRight, CheckCircle, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/MainLayout';

const features = [
  {
    icon: Calendar,
    title: 'Event Management',
    description: 'Create and manage events with custom registration forms, agendas, and speaker profiles.',
  },
  {
    icon: Users,
    title: 'Attendee Registration',
    description: 'Seamless registration with automatic QR code generation and email confirmations.',
  },
  {
    icon: QrCode,
    title: 'QR Check-In',
    description: 'Fast and efficient check-in with mobile QR scanning for staff and self-service kiosks.',
  },
  {
    icon: Award,
    title: 'Certificates & Badges',
    description: 'Automatic certificate generation with custom templates and verification.',
  },
];

const benefits = [
  'Mobile-first design that works on any device',
  'Install as an app on your phone',
  'Real-time attendance tracking',
  'Automated email notifications',
  'Excel export for all data',
  'Multi-organizer support',
];

export default function Index() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="container-mobile py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Smartphone className="h-4 w-4" />
              <span>Install as a mobile app</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Professional Event Management Made{' '}
              <span className="text-primary">Simple</span>
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              From registration to check-in, certificates to engagement tracking. 
              Everything you need to run successful events, all in one platform.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link to="/events">
                  Browse Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <Link to="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container-mobile">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Everything You Need</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful features designed for modern event management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container-mobile">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Built for the Mobile Era
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Event-Sync is designed from the ground up for mobile devices. 
                Install it as an app, work offline, and manage your events from anywhere.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center">
                <div className="bg-card rounded-2xl shadow-2xl p-6 w-64 transform rotate-3">
                  <div className="h-8 w-24 bg-primary/10 rounded mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                  <div className="mt-6 h-10 bg-primary rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 gradient-primary">
        <div className="container-mobile text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers who trust Event-Sync to manage their events.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="w-full sm:w-auto text-foreground"
            >
              <Link to="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/events">View Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
