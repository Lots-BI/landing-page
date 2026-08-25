import React from 'react';

const TimelineStep = ({ icon: Icon, title, description, stepNumber, isLast, delay = 0 }) => {
  // Determine the specific hover class based on the step number
  const hoverClass = `timeline-card-${stepNumber}-hover`;

  return (
    <div 
      className="relative flex flex-col md:flex-row gap-6 md:gap-8 timeline-card-enter"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Mobile Line */}
      {!isLast && (
        <div className="absolute left-6 top-14 bottom-[-2rem] w-px bg-white/20 md:hidden z-0" />
      )}
      
      <div className="flex-shrink-0 relative z-10">
        <div className="timeline-icon-container flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/30 glass-effect transition-all duration-300">
          <Icon className="timeline-icon h-5 w-5 transition-transform duration-300" />
        </div>
      </div>
      
      <div className={`flex-1 pb-8 md:pb-0 glass-effect p-6 relative ${hoverClass}`}>
        {/* Desktop Line */}
        {!isLast && (
          <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-white/20 transform -translate-y-1/2 z-0" />
        )}
        <span className="text-sm font-bold text-primary mb-2 block transition-colors duration-300 glass-text-shadow">Passo {stepNumber}</span>
        <h3 className="text-xl font-semibold mb-2 text-white glass-text-shadow transition-colors duration-300">{title}</h3>
        <p className="text-gray-100 glass-text-shadow leading-relaxed transition-colors duration-300">{description}</p>
      </div>
    </div>
  );
};

export default TimelineStep;