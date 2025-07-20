import React, { forwardRef, useEffect, useRef } from 'react';
import { Clock, Filter, Truck, Shield } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Instant Approvals',
    description: 'Get instant, doctor-approved validation for your medicine cart to ensure accurate treatment choices',
  },
  {
    icon: Filter,
    title: 'Smart Filters',
    description: 'Easily find the right medicines with customizable filters by type, price, and alternate options tailored to your needs',
  },
  {
    icon: Truck,
    title: 'Continuous Supply',
    description: 'Ensure uninterrupted access to essential medicines for long-term care with options for reliable, ongoing delivery from trusted pharmacies',
  },
  {
    icon: Shield,
    title: 'Secure & Safe',
    description: 'Protecting your health information and ensuring a safe, trusted experience with top-notch data security.',
  },
];

const Benefits = forwardRef((props, ref) => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      cardsRef.current.forEach((card) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        // Increase sensitivity by removing division with window size
        const deltaX = clientX - cardCenterX;
        const deltaY = clientY - cardCenterY;

        // Apply a stronger effect by increasing rotation multiplier
        // card.style.transform = `
        //   perspective(800px)
        //   rotateX(${deltaY * 0.03}deg)
        //   rotateY(${deltaX * 0.03}deg)
        //   scale(1)
        // `;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#2A6041] text-center mb-16">
          Your Benefits
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative bg-white p-8 rounded-xl transition-transform duration-100 ease-out"
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: '0 0 20px rgba(76, 175, 80, 0.1)',
              }}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#4CAF50]/10 to-[#66BB6A]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 rounded-xl border-2 border-[#4CAF50]/20 group-hover:border-[#4CAF50]/40 transition-colors" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-2xl flex items-center justify-center mb-6 transform -rotate-6 group-hover:rotate-0 transition-transform">
                  <benefit.icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-[#2A6041] mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Benefits;
