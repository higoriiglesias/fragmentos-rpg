import { Ability } from '../types/game';

export const ABILITIES: Ability[] = [
  {
    id: 'fury_blade',
    name: 'Lâmina Furiosa',
    damage: 30,
    staminaCost: 20,
    level: 1,
    description: 'Potencializa sua arma com energia furiosa',
  },
  {
    id: 'thunder_strike',
    name: 'Golpe Trovejante',
    damage: 30,
    staminaCost: 20,
    level: 1,
    description: 'Ataca com a força do trovão',
  },
  {
    id: 'rage_strike',
    name: 'Golpe Selvagem',
    damage: 30,
    staminaCost: 20,
    level: 1,
    description: 'Um ataque brutal que canaliza sua fúria',
  },
  {
    id: 'shadow_strike',
    name: 'Golpe Sombrio',
    damage: 30,
    staminaCost: 20,
    level: 1,
    description: 'Um ataque furtivo das sombras',
  },
];