import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    { icon: <ShieldCheck className="text-primary" size={24} />, title: "Secure Checkout", desc: "Production grade SSL encryption mapping." },
    { icon: <Truck className="text-primary" size={24} />, title: "Next-Day Delivery", desc: "Global supply distribution systems automated." },
    { icon: <RotateCcw className="text-primary" size={24} />, title: "Easy Returns", desc: "30-day hassle-free structural claim operations." },
    { icon: <Sparkles className="text-primary" size={24} />, title: "Premium Quality", desc: "Curated source verification standards." }
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Header Frame */}
      <section className="py-16 md:py-24 px-4 border-b border-border bg-muted/20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
            Our Mission is <span className="text-muted-foreground font-medium">Clarity.</span>
          </h1>
          <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We operate a unified architectural distribution tier designed to provide premium experiences with minimal latency and high layout execution integrity.
          </p>
        </div>
      </section>

      {/* Grid Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, index) => (
            <Card key={index} className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div className="p-3 bg-secondary rounded-xl w-fit border border-border">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-card-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default memo(About);