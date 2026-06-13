import React, { memo } from 'react';
import { MapPin, Mail, Phone, Send, Divide } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

const Contact: React.FC = () => {

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("Contact payload logged securely:", Object.fromEntries(formData));
  };
  const storeAddress = [
              { icon: <MapPin size={20} />, text: "212 7th St SE, Washington, DC, USA" },
              { icon: <Mail size={20} />, text: "rahulkandwal325@gmail.com" },
              { icon: <Phone size={20} />, text: "+91 8006073332" }
            ]

  return (
    <div className="bg-background text-foreground min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Connect With Us</h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Have questions about an invoice, delivery trajectory, or custom scale contract processing? Fill out the parameters block.
            </p>
          </div>
          <Separator className="my-12" />
      <div className="w-full bg-secondary/60 rounded-xl shadow-lg flex-col md:flex-row flex gap-12 items-start p-4 md:p-6">
        

        {/* Detail Column */}
          <div className="space-y-4 pt-4 - border-border">
            <h4 className='text-xl font-bold'>  Visit Our Flagship Store</h4>
            {storeAddress.map((info, idx) => (
              <div key={idx} className="flex items-center space-x-4 text-sm font-medium text-foreground/90">
                <Badge variant="destructive">{info.icon}</Badge>
                <span>{info.text}</span>
              </div>
            ))}
          </div>
        
        {/* Form Container */}
        <div className="lg:col-span-7 w-full max-w-xl mx-auto lg:ml-auto">
          <Card >
            <CardHeader>
              <CardTitle className="text-xl font-bold">Ask Your Queries</CardTitle>
              <CardDescription>We aim to process message packages within 24 operational windows.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email Address</Label>
                  <Input id="contact-email" name="email" type="email" required placeholder="corporate@domain.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message">Message Parameters</Label>
                  <Textarea 
                    id="contact-message" 
                    name="message" 
                    required 
                    rows={4} 
                    placeholder="Provide continuous transaction records or query scope documentation..."
                    // className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  />
                </div>
                <Button type="submit" className="w-full space-x-2">
                  <span>Dispatch Payload</span>
                  <Send size={16} />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>


      </div>
    </div>
  );
};

export default memo(Contact);