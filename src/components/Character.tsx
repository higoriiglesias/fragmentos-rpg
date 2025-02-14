import React from 'react';
import { Shield, Sword, Backpack } from 'lucide-react';
import { Character as CharacterType } from '../types/game';
import { calculateRequiredExperience } from '../utils/experience';

interface CharacterProps {
  character: CharacterType;
}

export function Character({ character }: CharacterProps) {
  const requiredExp = calculateRequiredExperience(character.level);
  const expPercentage = (character.experience / requiredExp) * 100;

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold">{character.name}</h2>
          <p className="text-gray-600">Nivel {character.level}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-yellow-600">🪙</span>
          <span>{character.gold} Ouro</span>
        </div>
      </div>

      <div className="space-y-2">
        {/* Health Bar */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Vida</span>
            <span>{character.health}/{character.maxHealth}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-red-500 rounded-full h-4"
              style={{ width: `${(character.health / character.maxHealth) * 100}%` }}
            />
          </div>
        </div>

        {/* Mana/Stamina Bar */}
        {character.mana !== undefined && (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Mana</span>
              <span>{character.mana}/{character.maxMana}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 rounded-full h-4"
                style={{ width: `${(character.mana / character.maxMana!) * 100}%` }}
              />
            </div>
          </div>
        )}

        {character.stamina !== undefined && (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Estamina</span>
              <span>{character.stamina}/{character.maxStamina}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-yellow-500 rounded-full h-4"
                style={{ width: `${(character.stamina / character.maxStamina!) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Experience Bar */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Experiencia</span>
            <span>{character.experience}/{requiredExp}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-500 rounded-full h-4"
              style={{ width: `${expPercentage}%` }}
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Sword className="w-5 h-5" />
            <span>{character.equipment.weapon?.name || 'No weapon'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span>{character.equipment.armor?.name || 'No armor'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Backpack className="w-5 h-5" />
            <span>{character.inventory.length} items</span>
          </div>
        </div>
      </div>
    </div>
  );
}