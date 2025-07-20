import React, { forwardRef } from 'react';
import { HeadphonesIcon, Clock, MessageSquare } from 'lucide-react';

const Support = forwardRef((props, ref) => {
  return (
    <section className="py-24 " ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#2A6041] text-center mb-16">
          Our Support
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: HeadphonesIcon,
              title: '24/7 Support',
              description: 'Our dedicated team is always here to help you with any questions or concerns',
            },
            {
              icon: Clock,
              title: 'Quick Response',
              description: 'Get expert answers to your questions within minutes, not hours',
            },
            {
              icon: MessageSquare,
              title: 'Expert Advice',
              description: 'Access professional healthcare guidance from certified medical experts',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg hover:-translate-y-2 transition-all duration-300 overflow-hidden bg-green-100"
            >
              {/* Glowing Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20 animate-glow" />
              
              {/* Content */}
              <div className="relative z-10 ">
                <div className="w-16 h-16 flex items-center justify-center mb-6 bg-white/20 backdrop-blur-md rounded-2xl">
                  <item.icon size={48} className="text-[#4CAF50]" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-4">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-black">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes glow {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-glow {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            animation: glow 2.5s linear infinite;
          }
        `}
      </style>
    </section>
  );
});

export default Support;
