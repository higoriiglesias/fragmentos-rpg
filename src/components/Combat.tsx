import React from 'react';
import { Character, Spell, Ability } from '../types/game';

interface CombatProps {
  player: Character;
  enemy: {
    name: string;
    health: number;
    maxHealth: number;
    level: number;
  };
  onAttack: () => void;
  onCastSpell: (spell: Spell) => void;
  onUseAbility: (ability: Ability) => void;
}

export function Combat({ player, enemy, onAttack, onCastSpell, onUseAbility }: CombatProps) {
  const hasResource = (cost: number, type: 'mana' | 'stamina') => {
    if (type === 'mana' && player.mana !== undefined) {
      return player.mana >= cost;
    }
    if (type === 'stamina' && player.stamina !== undefined) {
      return player.stamina >= cost;
    }
    return false;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold">{player.name}</h3>
          <div className="space-y-2">
            <div>
              <div className="w-48 bg-gray-200 rounded-full h-4 mt-2">
                <div
                  className="bg-green-500 rounded-full h-4"
                  style={{ width: `${(player.health / player.maxHealth) * 100}%` }}
                />
              </div>
              <div className="text-sm text-gray-600">
                Vida: {player.health}/{player.maxHealth}
              </div>
            </div>
            
            {player.mana !== undefined && (
              <div>
                <div className="w-48 bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 rounded-full h-4"
                    style={{ width: `${(player.mana / player.maxMana!) * 100}%` }}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  Mana: {player.mana}/{player.maxMana}
                </div>
              </div>
            )}
            
            {player.stamina !== undefined && (
              <div>
                <div className="w-48 bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-yellow-500 rounded-full h-4"
                    style={{ width: `${(player.stamina / player.maxStamina!) * 100}%` }}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  Stamina: {player.stamina}/{player.maxStamina}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="text-center">
          <span className="text-2xl">⚔️</span>
        </div>
        <div>
          <h3 className="text-lg font-bold">{enemy.name} (Level {enemy.level})</h3>
          <div className="w-48 bg-gray-200 rounded-full h-4 mt-2">
            <div
              className="bg-red-500 rounded-full h-4"
              style={{ width: `${(enemy.health / enemy.maxHealth) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={onAttack}
          className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Ataque Básico
        </button>

        {player.class.resourceType === 'mana' && player.spells.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {player.spells.map((spell) => (
              <button
                key={`${spell.id}_${spell.level}`}
                onClick={() => onCastSpell(spell)}
                disabled={!hasResource(spell.manaCost, 'mana')}
                className={`py-2 px-4 rounded-lg ${
                  hasResource(spell.manaCost, 'mana')
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <div className="text-sm font-medium">{spell.name}</div>
                <div className="text-xs">Dano: {spell.damage} | Mana: {spell.manaCost}</div>
                {spell.level > 1 && (
                  <div className="text-xs text-blue-200">Nível {spell.level}</div>
                )}
              </button>
            ))}
          </div>
        )}

        {player.class.resourceType === 'stamina' && player.abilities.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {player.abilities.map((ability) => (
              <button
                key={`${ability.id}_${ability.level}`}
                onClick={() => onUseAbility(ability)}
                disabled={!hasResource(ability.staminaCost, 'stamina')}
                className={`py-2 px-4 rounded-lg ${
                  hasResource(ability.staminaCost, 'stamina')
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <div className="text-sm font-medium">{ability.name}</div>
                <div className="text-xs">Dano: {ability.damage} | Stamina: {ability.staminaCost}</div>
                {ability.level > 1 && (
                  <div className="text-xs text-yellow-200">Nível {ability.level}</div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}