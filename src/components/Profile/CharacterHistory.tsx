import React from 'react';
import { DeadCharacter } from '../../types/game';
import { Skull } from 'lucide-react';

interface CharacterHistoryProps {
  deadCharacters: DeadCharacter[];
}

export function CharacterHistory({ deadCharacters }: CharacterHistoryProps) {
  if (deadCharacters.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Skull className="w-5 h-5 text-red-500" />
        Fallen Heroes
      </h2>
      <div className="space-y-4">
        {deadCharacters.map((character) => (
          <div
            key={character.id}
            className="border-b pb-4 last:border-b-0 last:pb-0"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">
                  {character.name} - Level {character.level}
                </h3>
                <p className="text-sm text-gray-600">
                  {character.race.name} {character.class.name}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(character.timestamp).toLocaleDateString()}
              </div>
            </div>
            <p className="text-sm text-red-600 mt-1">
              Defeated by {character.killedBy}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}