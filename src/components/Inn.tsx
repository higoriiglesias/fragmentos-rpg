import React from 'react';
import { Bed } from 'lucide-react';

interface InnProps {
  gold: number;
  currentHealth: number;
  maxHealth: number;
  onRest: () => void;
}

const REST_COST = 50;

export function Inn({ gold, currentHealth, maxHealth, onRest }: InnProps) {
  const canAffordRest = gold >= REST_COST;
  const needsRest = currentHealth < maxHealth;

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <Bed className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-bold">Taverna</h3>
      </div>

      <div className="mb-4">
        <p className="text-gray-600">Descanse para recuperar sua vida.</p>
        <p className="text-yellow-600 font-medium">
          Custo: 🪙 {REST_COST} Ouros
        </p>
      </div>

      <button
        onClick={onRest}
        disabled={!canAffordRest || !needsRest}
        className={`w-full py-2 px-4 rounded-lg text-white transition-colors ${
          canAffordRest && needsRest
            ? 'bg-blue-500 hover:bg-blue-600'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {!needsRest
          ? 'Você esta curado'
          : !canAffordRest
          ? 'Not enough gold'
          : 'Descançado e recuperado'}
      </button>
    </div>
  );
}
