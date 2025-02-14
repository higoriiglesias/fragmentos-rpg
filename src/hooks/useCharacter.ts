import { useState } from 'react';
import { Character, Race, CharacterClass, DeadCharacter, Attributes, InventoryItem } from '../types/game';

interface Quest {
  id: number;
  name: string;
  description: string;
  type: 'kill' | 'collect';
  target: string;
  amount: number;
  completed: boolean;
}

export function useCharacter() {
  const [deadCharacters, setDeadCharacters] = useState<DeadCharacter[]>([]);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [enemyKillCount, setEnemyKillCount] = useState<Record<string, number>>({});

  const createCharacter = (
    name: string, 
    race: Race, 
    characterClass: CharacterClass,
    attributes: Attributes
  ): Character => {
    const maxHealth = characterClass.baseHealth + race.bonuses.health;
    
    const finalAttributes = {
      strength: Math.round(attributes.strength * characterClass.attributeModifiers.strength),
      effort: Math.round(attributes.effort * characterClass.attributeModifiers.effort),
      resistance: Math.round(attributes.resistance * characterClass.attributeModifiers.resistance),
      intelligence: Math.round(attributes.intelligence * characterClass.attributeModifiers.intelligence),
      accuracy: Math.round(attributes.accuracy * characterClass.attributeModifiers.accuracy),
    };

    const resourceSetup = characterClass.resourceType === 'mana' 
      ? {
          mana: characterClass.baseResource,
          maxMana: characterClass.baseResource,
          stamina: undefined,
          maxStamina: undefined,
        }
      : {
          stamina: characterClass.baseResource,
          maxStamina: characterClass.baseResource,
          mana: undefined,
          maxMana: undefined,
        };

    return {
      name,
      health: maxHealth,
      maxHealth,
      ...resourceSetup,
      gold: characterClass.startingGold,
      equipment: {
        weapon: characterClass.startingEquipment.find(item => item.type === 'weapon') || null,
        armor: characterClass.startingEquipment.find(item => item.type === 'armor') || null,
      },
      spells: characterClass.startingSpells,
      abilities: characterClass.startingAbilities,
      level: 1,
      experience: 0,
      inventory: [],
      race,
      class: characterClass,
      attributes: finalAttributes,
    };
  };

  const handleCharacterDeath = (character: Character, killedBy: string) => {
    const deadCharacter: DeadCharacter = {
      id: Date.now().toString(),
      name: character.name,
      race: character.race,
      class: character.class,
      level: character.level,
      killedBy,
      timestamp: Date.now(),
    };

    setDeadCharacters(prev => [...prev, deadCharacter]);
  };

  const acceptQuest = (quest: Quest) => {
    setQuests(prev => [...prev, { ...quest, completed: false }]);
  };

  const registerKill = (enemyName: string) => {
    setEnemyKillCount(prev => ({
      ...prev,
      [enemyName]: (prev[enemyName] || 0) + 1,
    }));
  };

  const completeQuest = (questId: number) => {
    setQuests(prev => prev.map(q => q.id === questId ? { ...q, completed: true } : q));
  };

  return {
    createCharacter,
    handleCharacterDeath,
    acceptQuest,
    registerKill,
    completeQuest,
    deadCharacters,
    quests,
    enemyKillCount,
  };
}
