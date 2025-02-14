import React from 'react';
import { Skull } from 'lucide-react';

interface DeathModalProps {
  characterName: string;
  killedBy: string;
  onRespawn: () => void;
  onCreateNew: () => void;
}

export function DeathModal({ characterName, killedBy, onRespawn, onCreateNew }: DeathModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <Skull className="w-16 h-16 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Seu heroi morreu</h2>
        <p className="text-gray-600 mb-6">
          {characterName} morto por {killedBy}
        </p>
        <div className="space-y-3">
          <button
            onClick={onRespawn}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Renascer na cidade (Custo: 100 Ouros)
          </button>
          <button
            onClick={onCreateNew}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          >
            Criar novo personagem
          </button>
        </div>
      </div>
    </div>
  );
}