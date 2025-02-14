import { useState } from 'react';
import { Character, Enemy } from '../types/game';

export function useCombat() {
  const calculateDamage = (attacker: Character | Enemy, defender: Character | Enemy) => {
    if ('equipment' in attacker) {
      // Player attacking
      return 10 + (attacker.equipment.weapon?.power || 0);
    } else {
      // Enemy attacking
      const baseEnemyDamage = 5 + (attacker.level * 3);
      const scaledEnemyDamage = baseEnemyDamage * (1 + (attacker.level - 1) * 0.2);
      const defenderArmor = (defender as Character).equipment.armor?.power || 0;
      return Math.max(0, scaledEnemyDamage - defenderArmor);
    }
  };

  return { calculateDamage };
}