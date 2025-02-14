import React from 'react';
import { Item, Spell } from '../types/game';
import { Sparkles } from 'lucide-react';

interface RandomEventModalProps {
  reward: { type: 'spell' | 'item'; reward: Spell | Item };
  onClaim: () => void;
}

export function RandomEventModal({ reward, onClaim }: RandomEventModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold">Special Discovery!</h2>
        </div>

        <div className="mb-6">
          <p className="text-lg mb-4">
            You've discovered a {reward.type === 'spell' ? 'new spell' : 'rare item'}!
          </p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">{reward.reward.name}</h3>
            <p className="text-gray-600">{reward.reward.description}</p>
            {reward.type === 'item' && (
              <p className="mt-2 text-blue-600">Power: {(reward.reward as Item).power}</p>
            )}
            {reward.type === 'spell' && (
              <p className="mt-2 text-blue-600">Damage: {(reward.reward as Spell).damage}</p>
            )}
          </div>
        </div>

        <button
          onClick={onClaim}
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Claim Reward
        </button>
      </div>
    </div>
  );
}