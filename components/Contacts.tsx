'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const Contacts = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "0d898472-4e09-461e-93f9-29743a0ab380",
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          subject: "New Car Rental Request - Mousa Cars",
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        toast({ 
          title: "Request sent successfully!", 
          description: `Thank you, ${data.get("name")}. Our team will contact you shortly.` 
        });
        form.reset();
      } else {
        toast({ 
          title: "Error sending request", 
          description: "Please try again or contact us directly.", 
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({ 
        title: "Error sending request", 
        description: "Please try again or contact us directly.", 
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 pt-10 pb-6">
        <h1 className="font-display text-3xl md:text-4xl mb-2">Contacts & Conditions</h1>
        <p className="text-muted-foreground">We serve with discretion and professionalism. Reach us anytime.</p>
      </section>
      <section className="container mx-auto px-4 pb-16 grid lg:grid-cols-2 gap-8">
        <div className="surface p-6">
          <h2 className="font-display text-xl mb-4">Contact Form</h2>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="text-sm text-muted-foreground">Full Name</label>
              <Input name="name" required placeholder="Your full name" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <Input name="email" type="email" required placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Phone</label>
                <Input name="phone" type="tel" required placeholder="+90 ... / +971 ..." />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Your Message</label>
              <Textarea name="message" rows={5} placeholder="Desired dates, preferred car, special requests..." />
            </div>
            <div className="text-sm text-muted-foreground">
              By submitting, you agree to our rental conditions below.
            </div>
            <div className="flex gap-3">
              <Button type="submit" variant="premium" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Request"}
              </Button>
              <Button asChild variant="hero">
                <a href="mailto:booking@mousacars.com" aria-label="Email Mousa Cars">Email Us</a>
              </Button>
            </div>
          </form>
        </div>

        <aside className="surface p-6">
          <h2 className="font-display text-xl mb-4">Rental Terms (Summary)</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Driver's license (valid 2+ years) and passport/ID required at pickup.</li>
            <li>• Security deposit depends on vehicle class; fully refundable upon return.</li>
            <li>• Comprehensive insurance included with standard excess; upgrades available.</li>
            <li>• Daily mileage allowance applies; additional km charged at listed rates.</li>
            <li>• Premium delivery/collection available across major cities and airports.</li>
            <li>• 24/7 concierge assistance for our clients across Arabia & Türkiye.</li>
          </ul>
          <div className="mt-6 text-sm">
            <div>Phone: <a className="story-link" href="tel:+971500000000">+971 50 000 0000</a> / <a className="story-link" href="tel:+905300000000">+90 530 000 00 00</a></div>
            <div>Email: <a className="story-link" href="mailto:booking@mousacars.com">booking@mousacars.com</a></div>
            <div>Locations: Dubai, Abu Dhabi, Istanbul, Ankara</div>
          </div>
        </aside>
      </section>
      <section className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <article className="surface p-6 lg:col-span-1">
            <h2 className="font-display text-xl mb-4">Contact Details</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <div className="text-foreground mb-1 font-medium">Phone & WhatsApp</div>
                <div><a className="story-link" href="tel:+971500000000">+971 50 000 0000</a> (UAE)</div>
                <div><a className="story-link" href="tel:+905300000000">+90 530 000 00 00</a> (Türkiye)</div>
              </div>
              <div>
                <div className="text-foreground mb-1 font-medium">Email</div>
                <div><a className="story-link" href="mailto:booking@mousacars.com">booking@mousacars.com</a></div>
              </div>
              <div>
                <div className="text-foreground mb-1 font-medium">Hours</div>
                <div>Mon–Sun, 09:00–21:00 (local time)</div>
              </div>
              <div>
                <div className="text-foreground mb-1 font-medium">Locations</div>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Dubai & Abu Dhabi — airport delivery available</li>
                  <li>Istanbul & Ankara — city center & airport pickup</li>
                </ul>
              </div>
            </div>
          </article>

          <article className="surface p-6 lg:col-span-2">
            <h2 className="font-display text-xl mb-4">Rental Conditions (Full)</h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div className="space-y-3">
                <div>
                  <h3 className="text-foreground font-medium">Requirements & Eligibility</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Valid driver's license (minimum 2 years)</li>
                    <li>Passport/ID required at pickup</li>
                    <li>Minimum age depends on vehicle class</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-foreground font-medium">Insurance & Coverage</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Comprehensive insurance with standard excess</li>
                    <li>Optional zero-excess coverage available</li>
                    <li>Damage due to misuse is not covered</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-foreground font-medium">Deposits & Payments</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Refundable security deposit held on card</li>
                    <li>Credit/debit cards and bank transfers accepted</li>
                    <li>VAT and local taxes may apply</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-foreground font-medium">Mileage, Fuel & Usage</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Daily mileage allowance; extras billed per km</li>
                    <li>Return with same fuel level or refueling fee applies</li>
                    <li>No off-road, racing, or towing permitted</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-foreground font-medium">Delivery, Drivers & Fines</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Citywide delivery/collection on request</li>
                    <li>Additional drivers must be registered</li>
                    <li>Traffic fines and Salik/HGS are renter's responsibility</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-foreground font-medium">Cancellations & Assistance</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Free cancellation window; late cancellations may incur fees</li>
                    <li>No-show policy applies after scheduled pickup time</li>
                    <li>24/7 roadside assistance for mechanical issues</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Full conditions are provided on your rental agreement. Please contact us for bespoke arrangements.</p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
