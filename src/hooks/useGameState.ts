import { useState } from 'react';
import {
  SavedCharacter,
  Item,
  Spell,
  MapLocation,
  Enemy,
  InventoryItem,
  Attributes,
  Ability,
} from '../types/game';
import { generateEnemy, generateBoss } from '../data/enemies';
import {
  INITIAL_LOCATIONS,
  generateRandomLocation,
  MAX_ENEMIES,
  MAX_EVENTS,
} from '../utils/locationManager';
import { generateRandomEvent } from '../utils/randomEvents';
import { calculateRequiredExperience, checkLevelUp } from '../utils/experience';

export function useGameState(
  initialCharacter: SavedCharacter,
  onCharacterUpdate: (character: SavedCharacter) => void
) {
  const [character, setCharacter] = useState<SavedCharacter>(initialCharacter);
  const [currentLocation, setCurrentLocation] = useState<MapLocation | null>(null);
  const [enemy, setEnemy] = useState<Enemy | null>(null);
  const [mapLocations, setMapLocations] = useState(INITIAL_LOCATIONS);
  const [showRandomEvent, setShowRandomEvent] = useState(false);
  const [randomEventReward, setRandomEventReward] = useState<{
    type: 'spell' | 'item';
    reward: Spell | Item;
  } | null>(null);
  const [showDeathModal, setShowDeathModal] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [attributePoints, setAttributePoints] = useState(0);

  const updateCharacter = (updates: Partial<SavedCharacter>) => {
    const updatedCharacter = { ...character, ...updates } as SavedCharacter;
    setCharacter(updatedCharacter);
    onCharacterUpdate(updatedCharacter);
  };

  const handleAttributeIncrease = (attribute: keyof Attributes) => {
    if (attributePoints > 0) {
      const updatedAttributes = {
        ...character.attributes,
        [attribute]: character.attributes[attribute] + 1,
      };
      updateCharacter({ attributes: updatedAttributes });
      setAttributePoints(points => points - 1);
    }
  };

  const handleSpellSelect = (spell: Spell) => {
    if (character.class.resourceType !== 'mana') return;

    const existingSpell = character.spells.find(s => s.id === spell.id);
    
    if (existingSpell) {
      // Level up existing spell
      const updatedSpells = character.spells.map(s => {
        if (s.id === spell.id) {
          const newLevel = s.level + 1;
          const damageIncrease = Math.floor(s.damage * 0.2); // 20% damage increase per level
          
          return {
            ...s,
            level: newLevel,
            damage: s.damage + damageIncrease,
            description: `${s.description} (Nível ${newLevel})`,
          };
        }
        return s;
      });
      
      updateCharacter({ spells: updatedSpells });
    } else {
      // Add new spell
      const updatedSpells = [...character.spells, { ...spell, level: 1 }];
      updateCharacter({ spells: updatedSpells });
    }
    
    setShowLevelUpModal(false);
  };

  const handleAbilitySelect = (ability: Ability) => {
    if (character.class.resourceType !== 'stamina') return;

    const existingAbility = character.abilities.find(a => a.id === ability.id);
    
    if (existingAbility) {
      // Level up existing ability
      const updatedAbilities = character.abilities.map(a => {
        if (a.id === ability.id) {
          const newLevel = a.level + 1;
          const damageIncrease = Math.floor(a.damage * 0.2); // 20% damage increase per level
          
          return {
            ...a,
            level: newLevel,
            damage: a.damage + damageIncrease,
            description: `${a.description} (Nível ${newLevel})`,
          };
        }
        return a;
      });
      
      updateCharacter({ abilities: updatedAbilities });
    } else {
      // Add new ability
      const updatedAbilities = [...character.abilities, { ...ability, level: 1 }];
      updateCharacter({ abilities: updatedAbilities });
    }
    
    setShowLevelUpModal(false);
  };

  const addItemToInventory = (item: Item) => {
    const existingItem = character.inventory.find((i) => i.id === item.id);
    const updatedInventory = existingItem
      ? character.inventory.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      : [...character.inventory, { ...item, quantity: 1 }];

    updateCharacter({
      inventory: updatedInventory,
    });
  };

  const handleLevelUp = (currentExp: number) => {
    if (checkLevelUp(currentExp, character.level)) {
      const newLevel = character.level + 1;
      const remainingExp = currentExp - calculateRequiredExperience(character.level);

      // Add attribute points on odd levels
      if (newLevel % 2 === 1) {
        setAttributePoints(2); // Give 2 points to distribute
      }

      // Restore health, mana, and stamina on level up
      const updates: Partial<SavedCharacter> = {
        level: newLevel,
        experience: remainingExp,
        maxHealth: character.maxHealth + 10,
        health: character.maxHealth + 10,
      };

      if (character.maxMana !== undefined) {
        updates.maxMana = character.maxMana + 5;
        updates.mana = character.maxMana + 5;
      }

      if (character.maxStamina !== undefined) {
        updates.maxStamina = character.maxStamina + 5;
        updates.stamina = character.maxStamina + 5;
      }

      updateCharacter(updates);
      setShowLevelUpModal(true);
      return true;
    }
    return false;
  };

const handleLocationSelect = (location: MapLocation) => {
  setCurrentLocation(location);
  if (location.type === 'enemy') {
    setEnemy(generateEnemy(location.level || 1));
  } else if (location.type === 'event') {
    if (location.name === 'trees') {
      // Adicionar o item "wood" ao inventário
      const woodItem = LOOT.find(item => item.id === 'wood');
      if (woodItem) {
        addItemToInventory(woodItem);
      }
    } else {
      setEnemy(generateBoss(location.level || 1));
    }
  } else {
    setEnemy(null);
  }
  setShowRandomEvent(false);
};

  const handleAttack = () => {
    if (!enemy) return;

    // Player attacks enemy
    const playerDamage = 10 + (character.equipment.weapon?.power || 0);
    const newEnemyHealth = enemy.health - playerDamage;

    if (newEnemyHealth <= 0) {
      handleEnemyDefeat();
      return;
    }

    // Enemy attacks player
    const enemyDamage = Math.max(
      0,
      5 + (enemy.level * 2) - (character.equipment.armor?.power || 0)
    );
    const newPlayerHealth = character.health - enemyDamage;

    if (newPlayerHealth <= 0) {
      setShowDeathModal(true);
      updateCharacter({ health: 0 });
      return;
    }

    setEnemy({ ...enemy, health: newEnemyHealth });
    updateCharacter({ health: newPlayerHealth });
  };

  const handleCastSpell = (spell: Spell) => {
    if (!enemy || !character.mana) return;

    // Check if player has enough mana
    if (character.mana < spell.manaCost) return;

    const newEnemyHealth = enemy.health - spell.damage;
    const newMana = character.mana - spell.manaCost;

    if (newEnemyHealth <= 0) {
      handleEnemyDefeat();
      return;
    }

    // Enemy attacks player
    const enemyDamage = Math.max(
      0,
      5 + (enemy.level * 2) - (character.equipment.armor?.power || 0)
    );
    const newPlayerHealth = character.health - enemyDamage;

    if (newPlayerHealth <= 0) {
      setShowDeathModal(true);
      updateCharacter({ health: 0 });
      return;
    }

    setEnemy({ ...enemy, health: newEnemyHealth });
    updateCharacter({ 
      health: newPlayerHealth,
      mana: newMana
    });
  };

  const handleUseAbility = (ability: Ability) => {
    if (!enemy || !character.stamina) return;

    // Check if player has enough stamina
    if (character.stamina < ability.staminaCost) return;

    const newEnemyHealth = enemy.health - ability.damage;
    const newStamina = character.stamina - ability.staminaCost;

    if (newEnemyHealth <= 0) {
      handleEnemyDefeat();
      return;
    }

    // Enemy attacks player
    const enemyDamage = Math.max(
      0,
      5 + (enemy.level * 2) - (character.equipment.armor?.power || 0)
    );
    const newPlayerHealth = character.health - enemyDamage;

    if (newPlayerHealth <= 0) {
      setShowDeathModal(true);
      updateCharacter({ health: 0 });
      return;
    }

    setEnemy({ ...enemy, health: newEnemyHealth });
    updateCharacter({ 
      health: newPlayerHealth,
      stamina: newStamina
    });
  };

  const handleEnemyDefeat = () => {
    if (!enemy || !currentLocation) return;

    // Update map locations
    setMapLocations((prev) => {
      const remainingLocations = prev.filter(
        (loc) => loc.id !== currentLocation.id
      );
      
      const newEnemyCount = remainingLocations.filter(
        (loc) => loc.type === 'enemy'
      ).length;
      
      const newEventCount = remainingLocations.filter(
        (loc) => loc.type === 'event'
      ).length;

      let newLocations = [...remainingLocations];

      // Add new enemy if needed
      if (newEnemyCount < MAX_ENEMIES) {
        const newLocation = generateRandomLocation();
        // Only add if it's an enemy or if we have room for more events
        if (newLocation.type === 'enemy' || (newLocation.type === 'event' && newEventCount < MAX_EVENTS)) {
          newLocations.push(newLocation);
        }
      }

      return newLocations;
    });

    // Calculate rewards
    const goldReward = enemy.isBoss ? (50 + enemy.level * 20) : (10 + enemy.level * 5);
    const expReward = enemy.experience;
    const newExp = character.experience + expReward;

    // Add gold and experience
    const updates: Partial<SavedCharacter> = {
      gold: character.gold + goldReward,
      experience: newExp,
    };

    // Add loot items to inventory
    if (enemy.loot && enemy.loot.length > 0) {
      const updatedInventory = [...character.inventory];
      
      enemy.loot.forEach(lootItem => {
        const existingItem = updatedInventory.find(item => item.id === lootItem.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          updatedInventory.push({
            ...lootItem,
            quantity: 1
          });
        }
      });
      
      updates.inventory = updatedInventory;
    }

    updateCharacter(updates);
    handleLevelUp(newExp);

    setEnemy(null);
    setCurrentLocation(null);
  };

  const handleRespawn = () => {
    if (character.gold >= 100) {
      const updates: Partial<SavedCharacter> = {
        health: character.maxHealth,
        gold: character.gold - 100,
      };

      // Restore mana or stamina based on class type
      if (character.maxMana !== undefined) {
        updates.mana = character.maxMana;
      }
      if (character.maxStamina !== undefined) {
        updates.stamina = character.maxStamina;
      }

      updateCharacter(updates);
      setShowDeathModal(false);
      setCurrentLocation(null);
      setEnemy(null);
    }
  };

  const handleRest = () => {
    const REST_COST = 20;
    if (character.gold >= REST_COST) {
      const updates: Partial<SavedCharacter> = {
        health: character.maxHealth,
        gold: character.gold - REST_COST,
      };

      // Restore mana or stamina based on class type
      if (character.maxMana !== undefined) {
        updates.mana = character.maxMana;
      }
      if (character.maxStamina !== undefined) {
        updates.stamina = character.maxStamina;
      }

      updateCharacter(updates);
    }
  };

  const handleBuyItem = (item: Item) => {
    if (character.gold >= item.price) {
      const existingItem = character.inventory.find((i) => i.id === item.id);

      const updatedInventory = existingItem
        ? character.inventory.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...character.inventory, { ...item, quantity: 1 }];

      updateCharacter({
        gold: character.gold - item.price,
        inventory: updatedInventory,
      });
    }
  };

  const handleSellItem = (item: InventoryItem) => {
    const sellPrice = Math.floor(item.price * 0.7);
    
    // Check if the item is currently equipped
    let updatedEquipment = { ...character.equipment };
    if (item.type === 'weapon' && character.equipment.weapon?.id === item.id) {
      updatedEquipment.weapon = null;
    } else if (item.type === 'armor' && character.equipment.armor?.id === item.id) {
      updatedEquipment.armor = null;
    }

    // Update inventory
    const updatedInventory = character.inventory
      .map((i) => {
        if (i.id === item.id) {
          return { ...i, quantity: i.quantity - 1, equipped: false };
        }
        return i;
      })
      .filter((i) => i.quantity > 0);

    updateCharacter({
      gold: character.gold + sellPrice,
      inventory: updatedInventory,
      equipment: updatedEquipment,
    });
  };

  return {
    character,
    currentLocation,
    enemy,
    mapLocations,
    showRandomEvent,
    randomEventReward,
    showDeathModal,
    showLevelUpModal,
    attributePoints,
    updateCharacter,
    handleLocationSelect,
    handleRest,
    handleAttack,
    handleCastSpell,
    handleUseAbility,
    handleRespawn,
    handleBuyItem,
    handleSellItem,
    handleAttributeIncrease,
    handleSpellSelect,
    handleAbilitySelect,
    closeLevelUpModal: () => setShowLevelUpModal(false),
  };
}