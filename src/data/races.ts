import { Race } from '../types/game';

export const RACES: Race[] = [
  {
    id: 'human',
    name: 'Humano',
    description:
      'Versáteis e adaptáveis, os Humanos são equilibrados em todos os aspectos.',
    bonuses: {
      health: 10,
      damage: 1,
      defense: 1,
    },
  },
  {
    id: 'elf',
    name: 'Elfo',
    description:
      'Graciosos e mágicos, os Elfos são excelentes em conjurar magias.',
    bonuses: {
      health: 10,
      damage: 1,
      defense: 1,
    },
  },
  {
    id: 'dwarf',
    name: 'Anão',
    description: 'Robustos e resilientes, os Anões são tanques naturais.',
    bonuses: {
      health: 10,
      damage: 1,
      defense: 1,
    },
  },
  {
    id: 'halfling',
    name: 'Metadilho',
    description:
      'Pequenos, mas sortudos, os Metadilhos são surpreendentemente resistentes',
    bonuses: {
      health: 10,
      damage: 1,
      defense: 1,
    },
  },
];
