import { MapLocation } from '../types/game';

let lastEnemyId = 0;
let lastEventId = 0;

export function generateEnemyId(): string {
  lastEnemyId += 1;
  return `enemy_${lastEnemyId}_${Date.now()}`;
}

export function generateEventId(): string {
  lastEventId += 1;
  return `event_${lastEventId}_${Date.now()}`;
}

export function generateRandomLocation(): MapLocation {
  const x = 20 + Math.random() * 60; // Keep within 20-80% of map
  const y = 20 + Math.random() * 60;
  
  // 10% chance de gerar um evento
  if (Math.random() < 0.1) {
    // 50% chance de ser um evento "trees"
    if (Math.random() < 0.5) {
      return {
        id: generateEventId(),
        type: 'event',
        x,
        y,
        name: 'trees',
        level: 1,
        rewards: {
          items: [{ id: 'wood', quantity: 1 }] // Recompensa: 1 madeira
        } // Removido o ponto e vírgula aqui
      };
    } else {
      return {
        id: generateEventId(),
        type: 'event',
        x,
        y,
        name: 'Evento Misterioso',
        level: Math.floor(Math.random() * 3) + 1,
      };
    }
  }

  return {
    id: generateEnemyId(),
    type: 'enemy',
    x,
    y,
    name: 'Inimigo Desconhecido',
    level: Math.floor(Math.random() * 3) + 1,
  };
}

export const MAX_ENEMIES = 5;
export const MAX_EVENTS = 1; // Only allow 1 event at a time

export const INITIAL_LOCATIONS: MapLocation[] = [
  { id: 'town_1', type: 'town', x: 50, y: 50, name: 'Cidade' },
  { id: 'enemy_1', type: 'enemy', x: 30, y: 30, name: 'Encontro 1', level: 1 },
  { id: 'enemy_2', type: 'enemy', x: 70, y: 30, name: 'Encontro 2', level: 2 },
  { id: 'enemy_3', type: 'enemy', x: 30, y: 70, name: 'Encontro 3', level: 3 },
];