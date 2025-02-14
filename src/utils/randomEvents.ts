import { Item, Spell } from '../types/game';

export const RARE_WEAPONS: Item[] = [
  {
    id: 'legendary_sword',
    name: 'Legendary Sword',
    type: 'weapon',
    price: 500,
    power: 25,
    description: 'A powerful ancient sword',
  },
  {
    id: 'thunder_axe',
    name: 'Thunder Axe',
    type: 'weapon',
    price: 600,
    power: 30,
    description: 'An axe imbued with lightning',
  },
];

export const RARE_SPELLS: Spell[] = [
  {
    id: 'lightning_bolt',
    name: 'Lightning Bolt',
    damage: 35,
    manaCost: 25,
    description: 'Strikes enemies with lightning',
  },
  {
    id: 'meteor',
    name: 'Meteor Strike',
    damage: 45,
    manaCost: 40,
    description: 'Calls down a devastating meteor',
  },
];

export function generateRandomEvent(level: number): { type: 'spell' | 'item'; reward: Spell | Item } {
  const isSpell = Math.random() > 0.5;
  
  if (isSpell) {
    const spell = RARE_SPELLS[Math.floor(Math.random() * RARE_SPELLS.length)];
    return { type: 'spell', reward: spell };
  } else {
    const item = RARE_WEAPONS[Math.floor(Math.random() * RARE_WEAPONS.length)];
    return { type: 'item', reward: item };
  }
}