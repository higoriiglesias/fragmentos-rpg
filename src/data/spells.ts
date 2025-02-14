import { Spell } from '../types/game';

function updateSpellLevel(spellId: string) {
  const spell = playerSpells.find(s => s.id === spellId);
  if (spell) {
    spell.level += 1; // Aumenta o nível da habilidade
  }
}


export const SPELLS: Spell[] = [
  {
    id: 'fireball',
    name: 'Bola de Fogo',
    damage: 30,
    manaCost: 20,
    level: 1,
    description: 'Lança uma poderosa bola de fogo contra o inimigo',
  },
  {
    id: 'magic_missile',
    name: 'Mísseis Mágicos',
    damage: 30,
    manaCost: 20,
    level: 1,
    description: 'Dispara dardos de energia mágica contra o alvo',
  },
  {
    id: 'ice_shard',
    name: 'Estilhaço de Gelo',
    damage: 30,
    manaCost: 20,
    level: 1,
    description: 'Lança fragmentos afiados de gelo',
  },
  {
    id: 'shadow_bolt',
    name: 'Seta Sombria',
    damage: 30,
    manaCost: 20,
    level: 1,
    description: 'Dispara uma seta de energia sombria',
  }
];