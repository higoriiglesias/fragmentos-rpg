import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { Attributes, Spell, Ability, Character } from '../../types/game';
import { SPELLS } from '../../data/spells';
import { ABILITIES } from '../../data/abilities';

interface LevelUpModalProps {
  level: number;
  attributes: Attributes;
  onAttributeIncrease: (attribute: keyof Attributes) => void;
  onSpellSelect: (spell: Spell) => void;
  onAbilitySelect: (ability: Ability) => void;
  availablePoints: number;
  onClose: () => void;
  character: Character;
}

export function LevelUpModal({
  level,
  attributes,
  onAttributeIncrease,
  onSpellSelect,
  onAbilitySelect,
  availablePoints,
  onClose,
  character,
}: LevelUpModalProps) {
  const isEvenLevel = level % 2 === 0;
  const usesMana = character.class.resourceType === 'mana';

  const getSpellStatus = (spell: Spell) => {
    const existingSpell = character.spells.find(s => s.id === spell.id);
    if (existingSpell) {
      return {
        level: existingSpell.level,
        nextDamage: Math.floor(existingSpell.damage * 1.2), // 20% increase
      };
    }
    return null;
  };

  const getAbilityStatus = (ability: Ability) => {
    const existingAbility = character.abilities.find(a => a.id === ability.id);
    if (existingAbility) {
      return {
        level: existingAbility.level,
        nextDamage: Math.floor(existingAbility.damage * 1.2), // 20% increase
      };
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center gap-2 mb-6">
          {isEvenLevel ? (
            <Sparkles className="w-6 h-6 text-yellow-500" />
          ) : (
            <ArrowUp className="w-6 h-6 text-blue-500" />
          )}
          <h2 className="text-2xl font-bold">Nível {level}!</h2>
        </div>

        {isEvenLevel ? (
          <div>
            <p className="text-gray-600 mb-4">
              {usesMana 
                ? 'Escolha uma nova magia ou melhore uma existente:'
                : 'Escolha uma nova habilidade ou melhore uma existente:'}
            </p>
            <div className="space-y-3">
              {usesMana ? (
                // Spells for mana users
                SPELLS.map((spell) => {
                  const status = getSpellStatus(spell);
                  return (
                    <button
                      key={spell.id}
                      onClick={() => {
                        onSpellSelect(spell);
                        onClose();
                      }}
                      className="w-full p-3 border rounded-lg hover:bg-gray-50 text-left"
                    >
                      <div className="font-medium">
                        {spell.name}
                        {status && <span className="text-green-500 ml-2">(Nível {status.level})</span>}
                      </div>
                      <p className="text-sm text-gray-600">{spell.description}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-red-500">
                          Dano: {status ? `${spell.damage} → ${status.nextDamage}` : spell.damage}
                        </span>
                        <span className="text-blue-500">Mana: {spell.manaCost}</span>
                      </div>
                      {status && (
                        <p className="text-sm text-green-600 mt-1">
                          Melhorar para o nível {status.level + 1}
                        </p>
                      )}
                    </button>
                  );
                })
              ) : (
                // Abilities for stamina users
                ABILITIES.map((ability) => {
                  const status = getAbilityStatus(ability);
                  return (
                    <button
                      key={ability.id}
                      onClick={() => {
                        onAbilitySelect(ability);
                        onClose();
                      }}
                      className="w-full p-3 border rounded-lg hover:bg-gray-50 text-left"
                    >
                      <div className="font-medium">
                        {ability.name}
                        {status && <span className="text-green-500 ml-2">(Nível {status.level})</span>}
                      </div>
                      <p className="text-sm text-gray-600">{ability.description}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-red-500">
                          Dano: {status ? `${ability.damage} → ${status.nextDamage}` : ability.damage}
                        </span>
                        <span className="text-yellow-500">Estamina: {ability.staminaCost}</span>
                      </div>
                      {status && (
                        <p className="text-sm text-green-600 mt-1">
                          Melhorar para o nível {status.level + 1}
                        </p>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">
                Distribua seus pontos de atributo:
              </p>
              <span className="font-medium text-blue-500">
                Pontos: {availablePoints}
              </span>
            </div>
            <div className="space-y-4">
              <AttributeButton
                name="Força"
                value={attributes.strength}
                onClick={() => onAttributeIncrease('strength')}
                disabled={availablePoints === 0}
              />
              <AttributeButton
                name="Esforço"
                value={attributes.effort}
                onClick={() => onAttributeIncrease('effort')}
                disabled={availablePoints === 0}
              />
              <AttributeButton
                name="Resistência"
                value={attributes.resistance}
                onClick={() => onAttributeIncrease('resistance')}
                disabled={availablePoints === 0}
              />
              <AttributeButton
                name="Inteligência"
                value={attributes.intelligence}
                onClick={() => onAttributeIncrease('intelligence')}
                disabled={availablePoints === 0}
              />
              <AttributeButton
                name="Acurácia"
                value={attributes.accuracy}
                onClick={() => onAttributeIncrease('accuracy')}
                disabled={availablePoints === 0}
              />
            </div>

            <button
              onClick={onClose}
              disabled={availablePoints > 0}
              className={`w-full mt-6 py-2 px-4 rounded-lg ${
                availablePoints > 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {availablePoints > 0
                ? `Distribua os ${availablePoints} pontos restantes`
                : 'Confirmar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface AttributeButtonProps {
  name: string;
  value: number;
  onClick: () => void;
  disabled: boolean;
}

function AttributeButton({ name, value, onClick, disabled }: AttributeButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-3 border rounded-lg flex justify-between items-center ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
      }`}
    >
      <span className="font-medium">{name}</span>
      <div className="flex items-center gap-2">
        <span className="text-lg">{value}</span>
        <ArrowUp
          className={`w-4 h-4 ${disabled ? 'text-gray-400' : 'text-blue-500'}`}
        />
      </div>
    </button>
  );
}