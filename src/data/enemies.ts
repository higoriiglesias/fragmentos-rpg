import { Enemy } from '../types/game';
import { WEAPONS, ARMORS, LOOT, RARE_ITEMS } from './items';

const BOSS_TYPES = [
  {
    name: 'Dragão Ancião',
    baseHealth: 200,
    baseDamage: 50,
    baseExp: 100,
    loot: [
      { item: RARE_ITEMS[0], chance: 0.4 }, // Espada Lendária
      { item: RARE_ITEMS[1], chance: 0.3 }, // Armadura do Dragão
      { item: LOOT[0], chance: 1.0 }, // Garantido
    ],
  },
  {
    name: 'Lich Supremo',
    baseHealth: 200,
    baseDamage: 50,
    baseExp: 100,
    loot: [
      { item: RARE_ITEMS[2], chance: 0.4 }, // Cajado do Poder
      { item: RARE_ITEMS[3], chance: 0.3 }, // Manto das Sombras
      { item: LOOT[1], chance: 1.0 }, // Garantido
    ],
  },
  {
    name: 'Golem Ancestral',
    baseHealth: 200,
    baseDamage: 50,
    baseExp: 100,
    loot: [
      { item: RARE_ITEMS[4], chance: 0.4 }, // Martelo Titânico
      { item: RARE_ITEMS[5], chance: 0.3 }, // Armadura de Cristal
      { item: LOOT[2], chance: 1.0 }, // Garantido
    ],
  },
];

export function generateBoss(level: number): Enemy {
  const bossType = BOSS_TYPES[Math.floor(Math.random() * BOSS_TYPES.length)];
  
  // Generate loot based on chances
  const loot = bossType.loot
    .filter(lootItem => Math.random() <= lootItem.chance)
    .map(lootItem => lootItem.item);

  // Boss stats scale with level
  const scalingFactor = 1 + (level * 0.5); // Stronger scaling for bosses

  return {
    name: bossType.name,
    health: Math.floor(bossType.baseHealth * scalingFactor),
    maxHealth: Math.floor(bossType.baseHealth * scalingFactor),
    damage: Math.floor(bossType.baseDamage * scalingFactor),
    level,
    loot,
    experience: bossType.baseExp * level,
    isBoss: true,
  };
}

export function generateEnemy(level: number): Enemy {
  const types = [
    { 
      name: 'Goblim', 
      baseHealth: 50, 
      baseLoot: [
        { item: LOOT[2], chance: 0.4 },
      ],
      baseExp: 25 
    },
    { 
      name: 'Lobo', 
      baseHealth: 50, 
      baseLoot: [
        { item: LOOT[1], chance: 0.8 },
      ],
      baseExp: 25 
    },
    { 
      name: 'Bandido', 
      baseHealth: 50, 
      baseLoot: [
        { item: LOOT[2], chance: 0.4 },
      ],
      baseExp: 25 
    },
    { 
      name: 'Ogros', 
      baseHealth: 50, 
      baseLoot: [
        { item: LOOT[0], chance: 0.9 },
      ],
      baseExp: 25 
    },
  ];

  const enemyType = types[Math.floor(Math.random() * types.length)];
  
  const loot = enemyType.baseLoot
    .filter(() => Math.random() <= 0.7)
    .filter(lootItem => Math.random() <= lootItem.chance)
    .map(lootItem => lootItem.item);

  return {
    name: enemyType.name,
    health: enemyType.baseHealth + level * 20,
    maxHealth: enemyType.baseHealth + level * 20,
    level,
    loot,
    experience: enemyType.baseExp * level,
    isBoss: false,
  };
}