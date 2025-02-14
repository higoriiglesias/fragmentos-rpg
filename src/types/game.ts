export interface User {
  id: string;
  email: string;
  characters: SavedCharacter[];
}

export interface Race {
  id: string;
  name: string;
  description: string;
  bonuses: {
    health: number;
    damage: number;
    defense: number;
  };
}

export interface CharacterClass {
  id: string;
  name: string;
  description: string;
  baseHealth: number;
  resourceType: 'mana' | 'stamina';
  baseResource: number;
  startingGold: number;
  startingEquipment: Item[];
  startingSpells: Spell[];
  startingAbilities: Ability[];
  baseAttributes: Attributes;
  attributeModifiers: AttributeModifiers;
}

export interface Attributes {
  strength: number;
  effort: number;
  resistance: number;
  intelligence: number;
  accuracy: number;
}

export interface AttributeModifiers {
  strength: number;
  effort: number;
  resistance: number;
  intelligence: number;
  accuracy: number;
}

export interface Item {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'potion' | 'loot';
  description: string;
  price: number;
  power?: number;
  healing?: number;
  manaRestore?: number;
  staminaRestore?: number;
  duration?: number;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  requirements?: {
    level?: number;
    class?: string[];
    attributes?: Partial<Attributes>;
  };
}

export interface InventoryItem extends Item {
  quantity: number;
  equipped?: boolean;
}

export interface Equipment {
  weapon: Item | null;
  armor: Item | null;
}

export interface Spell {
  id: string;
  name: string;
  description: string;
  damage: number;
  manaCost: number;
  level: number;
  cooldown?: number;
  effects?: SpellEffect[];
  requirements?: {
    level?: number;
    class?: string[];
    attributes?: Partial<Attributes>;
  };
}

export interface Ability {
  id: string;
  name: string;
  description: string;
  damage: number;
  staminaCost: number;
  level: number;
  cooldown?: number;
  effects?: SpellEffect[];
  requirements?: {
    level?: number;
    class?: string[];
    attributes?: Partial<Attributes>;
  };
}

export interface SpellEffect {
  type: 'damage' | 'heal' | 'buff' | 'debuff';
  value: number;
  duration: number;
  target: 'self' | 'enemy' | 'area';
}

export interface Character {
  name: string;
  health: number;
  maxHealth: number;
  mana?: number;
  maxMana?: number;
  stamina?: number;
  maxStamina?: number;
  gold: number;
  equipment: Equipment;
  spells: Spell[];
  abilities: Ability[];
  level: number;
  experience: number;
  inventory: InventoryItem[];
  race: Race;
  class: CharacterClass;
  attributes: Attributes;
  effects?: StatusEffect[];
  skills?: Skill[];
  quests: Quest[]; // Adicionado para rastrear missões
  enemyKillCount?: Record<string, number>; // Adicionado para rastrear mortes de inimigos
}

export interface SavedCharacter extends Character {
  id: string;
  createdAt: number;
  lastPlayed?: number;
  playTime?: number;
  achievements?: Achievement[];
}

export interface DeadCharacter {
  id: string;
  name: string;
  race: Race;
  class: CharacterClass;
  level: number;
  killedBy: string;
  timestamp: number;
  totalPlayTime?: number;
  achievements?: Achievement[];
}

export interface Enemy {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  level: number;
  damage?: number;
  defense?: number;
  loot: Item[];
  experience: number;
  abilities?: EnemyAbility[];
  immunities?: string[];
  weaknesses?: string[];
  isBoss?: boolean;
}

export interface EnemyAbility {
  id: string;
  name: string;
  damage: number;
  cooldown: number;
  effects?: SpellEffect[];
}

export interface MapLocation {
  id: string;
  type: 'town' | 'enemy' | 'event' | 'trees' | 'dungeon' | 'shop' | 'quest';
  name: string;
  x: number;
  y: number;
  level?: number;
  requirements?: {
    level?: number;
    quest?: string;
    item?: string;
  };
  rewards?: {
    gold?: number;
    experience?: number;
    items?: Item[];
  };
}

// Interface Quest adicionada
export interface Quest {
  id: number;
  name: string;
  description: string;
  requirements: string;
  type: 'kill' | 'collect';
  target: string;
  amount: number;
  completed: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  requirement: {
    type: 'level' | 'kills' | 'gold' | 'quests';
    value: number;
  };
  reward?: {
    gold?: number;
    items?: Item[];
    title?: string;
  };
  completed: boolean;
  completedAt?: number;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  requirements: {
    characterLevel: number;
    attributes?: Partial<Attributes>;
  };
  effects: {
    type: 'damage' | 'defense' | 'healing' | 'utility';
    value: number;
    scaling?: {
      attribute: keyof Attributes;
      ratio: number;
    };
  }[];
}

export interface ShopInventory {
  weapons: Item[];
  armors: Item[];
  potions: Item[];
  spells: Spell[];
  specialItems: Item[];
}