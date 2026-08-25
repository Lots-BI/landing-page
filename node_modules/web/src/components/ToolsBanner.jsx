import React from 'react';

const ToolsBanner = () => {
  const tools = [
    'Meta',
    'Google Ads',
    'Google Analytics',
    'Canva',
    'CapCut',
  ];

  // Repeat the tools array to ensure it's wide enough to fill large screens
  // before it even starts scrolling, preventing empty space at the end.
  const repeatedTools = [...tools, ...tools, ...tools];

  return (
    <div className="relative overflow-hidden py-8 bg-muted/30 flex">
      {/* 
        The container is w-max and holds two identical blocks.
        Translating it by -50% moves exactly one block's width,
        creating a perfectly seamless infinite loop.
      */}
      <div className="flex animate-scroll whitespace-nowrap w-max">
        <div className="flex items-center">
          {repeatedTools.map((tool, index) => (
            <span 
              key={`set1-${index}`} 
              className="mx-8 text-2xl font-semibold text-muted-foreground/60"
            >
              {tool}
            </span>
          ))}
        </div>
        <div className="flex items-center">
          {repeatedTools.map((tool, index) => (
            <span 
              key={`set2-${index}`} 
              className="mx-8 text-2xl font-semibold text-muted-foreground/60"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsBanner;