import React from 'react';
import { MapLocation } from '../types/game';
import { Sword, Home, Sparkles, Trees } from 'lucide-react';

interface GameMapProps {
  locations: MapLocation[];
  onLocationSelect: (location: MapLocation) => void;
}

export function GameMap({ locations, onLocationSelect }: GameMapProps) {
  return (
    <div className="relative w-full h-[400px] bg-emerald-100 rounded-lg">
      {locations.map((location) => (
        <button
          key={location.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full
            ${location.type === 'enemy' ? 'bg-red-500' : 
              location.type === 'trees' ? 'bg-green-500' : 
              location.type === 'event' ? 'bg-yellow-500' : 'bg-blue-500'}
            hover:scale-110 transition-transform`}
          style={{ left: `${location.x}%`, top: `${location.y}%` }}
          onClick={() => onLocationSelect(location)}
        >
          {location.type === 'enemy' ? (
            <Sword className="w-6 h-6 text-white" />
          ) : location.type === 'trees' ? (
            <Trees className="w-6 h-6 text-white" />
          ) : location.type === 'event' ? (
            <Sparkles className="w-6 h-6 text-white" />
          ) : (
            <Home className="w-6 h-6 text-white" />
          )}
        </button>
      ))}
    </div>
  );
}