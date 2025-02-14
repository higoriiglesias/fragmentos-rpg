export function calculateRequiredExperience(level: number): number {
  // Level 1 = 100 XP
  // Level 2 = 150 XP
  // Level 3 = 200 XP, etc.
  return 100 + ((level - 1) * 50);
}

export function checkLevelUp(currentExp: number, currentLevel: number): boolean {
  const requiredExp = calculateRequiredExperience(currentLevel);
  return currentExp >= requiredExp;
}