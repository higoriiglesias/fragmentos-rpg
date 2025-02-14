import { Item } from '../types/game';

export const WEAPONS: Item[] = [
  {
    id: 'sword',
    name: 'Espada de Ferro',
    type: 'weapon',
    price: 100,
    power: 10,
    description: 'Uma espada básica e confiável',
  },
  {
    id: 'axe',
    name: 'Machado de Batalha',
    type: 'weapon',
    price: 100,
    power: 10,
    description: 'Machado pesado e poderoso',
  },
  {
    id: 'staff',
    name: 'Cajado Arcano',
    type: 'weapon',
    price: 100,
    power: 10,
    description: 'Cajado magico',
  },
];

export const ARMORS: Item[] = [
  {
    id: 'leather',
    name: 'Armadura de Couro',
    type: 'armor',
    price: 100,
    power: 5,
    description: 'Proteção basica',
  },
  {
    id: 'chainmail',
    name: 'Armadura de Placa',
    type: 'armor',
    price: 100,
    power: 5,
    description: 'Sturdy chain armor',
  },
  {
    id: 'robe',
    name: 'Manto Magico',
    type: 'armor',
    price: 100,
    power: 5,
    description: 'Manto imbuido em magia',
  },
];

export const POTIONS: Item[] = [
  {
    id: 'health_potion',
    name: 'Poção de Cura',
    type: 'potion',
    price: 20,
    power: 20,
    healing: 20,
    description: 'Recupera 20 pontos de vida',
  },
  {
    id: 'mana_potion',
    name: 'Poção de Mana',
    type: 'potion',
    price: 20,
    power: 20,
    manaRestore: 20,
    description: 'Recupera 20 pontos de mana',
  },
  {
    id: 'stamina_potion',
    name: 'Poção de Estamina',
    type: 'potion',
    price: 20,
    power: 20,
    staminaRestore: 20,
    description: 'Recupera 20 pontos de estamina',
  }
];

export const LOOT: Item[] = [
  {
    id: 'garra',
    name: 'Garra',
    type: 'loot',
    price: 20,
    description: 'Pode ser vendida na loja',
  },
  {
    id: 'couro',
    name: 'Couro',
    type: 'loot',
    price: 20,
    description: 'Pode ser vendido na loja',
  },
  {
    id: 'wood',
    name: 'madeira',
    type: 'loot',
    price: 10,
    description: 'Pode ser vendido na loja ou usado na base',
  },
  {
    id: 'porrete',
    name: 'Porrete de madeira',
    type: 'loot',
    price: 20,
    description: 'Pode ser vendido na loja',
  },
];

export const RARE_ITEMS: Item[] = [
  {
    id: 'legendary_sword',
    name: 'Espada Lendária',
    type: 'weapon',
    price: 1000,
    power: 50,
    description: 'Uma espada forjada com poder ancestral',
    rarity: 'legendary',
  },
  {
    id: 'dragon_armor',
    name: 'Armadura do Dragão',
    type: 'armor',
    price: 1000,
    power: 50,
    description: 'Armadura forjada com escamas de dragão',
    rarity: 'legendary',
  },
  {
    id: 'power_staff',
    name: 'Cajado do Poder',
    type: 'weapon',
    price: 1000,
    power: 50,
    description: 'Cajado imbuído com energia pura',
    rarity: 'legendary',
  },
  {
    id: 'shadow_robe',
    name: 'Manto das Sombras',
    type: 'armor',
    price: 1000,
    power: 50,
    description: 'Manto tecido com essência das sombras',
    rarity: 'legendary',
  },
  {
    id: 'titan_hammer',
    name: 'Martelo Titânico',
    type: 'weapon',
    price: 1000,
    power: 50,
    description: 'Martelo forjado por gigantes ancestrais',
    rarity: 'legendary',
  },
  {
    id: 'crystal_armor',
    name: 'Armadura de Cristal',
    type: 'armor',
    price: 1000,
    power: 50,
    description: 'Armadura feita de cristais mágicos inquebraveis',
    rarity: 'legendary',
  },
];