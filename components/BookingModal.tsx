'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Car, Clock, User, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { Car as CarType } from "@/data/cars";
import { cn } from "@/lib/utils";

interface BookingModalProps {
  car: CarType;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ car, isOpen, onClose }: BookingModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotalDays = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    return calculateTotalDays() * car.pricePerDay;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      toast({
        title: "Please select dates",
        description: "Please select both start and end dates for your booking.",
        variant: "destructive"
      });
      return;
    }

    if (startDate >= endDate) {
      toast({
        title: "Invalid date range",
        description: "End date must be after start date.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "0d898472-4e09-461e-93f9-29743a0ab380",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Car Booking Request:
          
Vehicle: ${car.brand} ${car.model} ${car.year}
Start Date: ${format(startDate, 'MMM dd, yyyy')}
End Date: ${format(endDate, 'MMM dd, yyyy')}
Total Days: ${calculateTotalDays()}
Total Price: $${calculateTotalPrice()}

Additional Message: ${formData.message}`,
          subject: `New Booking Request - ${car.brand} ${car.model}`,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        toast({ 
          title: "Booking request sent successfully!", 
          description: `Thank you, ${formData.name}. We'll contact you shortly to confirm your booking.` 
        });
        onClose();
        // Reset form
        setStartDate(undefined);
        setEndDate(undefined);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        toast({ 
          title: "Error sending booking request", 
          description: "Please try again or contact us directly.", 
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Booking submission error:", error);
      toast({ 
        title: "Error sending booking request", 
        description: "Please try again or contact us directly.", 
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full h-full md:w-auto md:h-auto md:max-w-4xl md:max-h-[90vh] overflow-y-auto p-0 border-0 shadow-2xl bg-background/85 backdrop-blur-md rounded-none md:rounded-lg">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left Panel - Car Details */}
          <div className="p-8 lg:p-12 sm:pt-12 pt-20 border-r border-border">
            <div className="space-y-8">
              {/* Car Image */}
              <div className="relative group">
                <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-elev">
                  <img 
                    src={car.images[0]} // Use first image from array
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Car Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Car className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl">{car.brand} {car.model}</h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="font-medium">{car.year}</span>
                  <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    car.stockStatus === "In Stock" 
                      ? "bg-green-500/10 text-green-600 border border-green-500/20" 
                      : "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20"
                  )}>
                    {car.stockStatus}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">${car.pricePerDay}</span>
                  <span className="text-muted-foreground">per day</span>
                </div>

                {/* Features Preview */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Key Features</h4>
                  <ul className="list-disc pl-2 space-y-1 text-muted-foreground">
                    {car.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-sm">
                        <span className="text-foreground">• {feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Booking Form */}
          <div className="p-8 lg:p-12 pt-20 ">
            <div className="space-y-6 ">
              <div>
                <DialogTitle className="font-display text-2xl mb-2">Book This Vehicle</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Complete your booking request for this luxury vehicle
                </DialogDescription>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Date Selection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <label className="text-sm font-medium text-muted-foreground">Select Dates</label>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-10",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "MMM dd") : "Start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 " align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          className="rounded-lg"
                          classNames={{
                           today: ""
                          }}
                          disabled={(date) => {
                            const yesterday = new Date();
                            yesterday.setDate(yesterday.getDate() - 1);
                            return date <= yesterday;
                          }}
                        />
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-10",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "MMM dd") : "End date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          className="rounded-lg"
                          classNames={{
                            today: ""
                          }}
                          disabled={(date) => !startDate || date <= startDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Price Summary */}
                  {startDate && endDate && (
                    <div className="surface p-4 rounded-lg">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium">{calculateTotalDays()} days</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Total Price:</span>
                          <span className="text-lg font-semibold text-primary">${calculateTotalPrice()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div>
                  <label className="text-sm text-muted-foreground">Full Name</label>
                  <Input 
                    name="name" 
                    required 
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <Input 
                      name="email" 
                      type="email" 
                      required 
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Phone</label>
                    <Input 
                      name="phone" 
                      type="tel" 
                      required 
                      placeholder="+90 ... / +971 ..."
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">Special Requests</label>
                  <Textarea 
                    name="message" 
                    rows={6} 
                    placeholder="Delivery location, special requirements, or any other requests..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                  />
                </div>

                <div className="text-sm text-muted-foreground">
                  By submitting, you agree to our rental conditions.
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="submit" 
                    variant="premium" 
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? "Sending..." : "Send Booking Request"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="hero" 
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
