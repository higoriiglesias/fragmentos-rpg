import React from 'react';
import { Character } from './Character';
import { GameMap } from './GameMap';
import { Town } from './Town';
import { Combat } from './Combat';
import { RandomEventModal } from './RandomEventModal';
import { UserProfile } from './Profile/UserProfile';
import { DeathModal } from './Character/DeathModal';
import { InventoryPanel } from './Inventory/InventoryPanel';
import { LevelUpModal } from './LevelUp/LevelUpModal';
import { useGameState } from '../hooks/useGameState';
import { SavedCharacter, InventoryItem } from '../types/game';

interface GameContentProps {
  character: SavedCharacter;
  onCharacterUpdate: (character: SavedCharacter) => void;
  onLogout: () => void;
  onCreateNew: () => void;
}

export function GameContent({ character: initialCharacter, onCharacterUpdate, onLogout, onCreateNew }: GameContentProps) {
  const gameState = useGameState(initialCharacter, onCharacterUpdate);
  const [activeTab, setActiveTab] = React.useState<'map' | 'inventory'>('map');

  const handleEquipItem = (item: InventoryItem) => {
    const slot = item.type === 'weapon' ? 'weapon' : 'armor';
    const currentEquipped = gameState.character.equipment[slot];

    const updatedInventory = gameState.character.inventory.map(invItem => {
      if (invItem.id === item.id) {
        return { ...invItem, equipped: true };
      }
      if (currentEquipped && invItem.id === currentEquipped.id) {
        return { ...invItem, equipped: false };
      }
      return invItem;
    });

    const updatedEquipment = {
      ...gameState.character.equipment,
      [slot]: item
    };

    gameState.updateCharacter({
      inventory: updatedInventory,
      equipment: updatedEquipment
    });
  };

  const handleUnequipItem = (slot: 'weapon' | 'armor') => {
    const currentEquipped = gameState.character.equipment[slot];
    if (!currentEquipped) return;

    const updatedInventory = gameState.character.inventory.map(item => 
      item.id === currentEquipped.id ? { ...item, equipped: false } : item
    );

    const updatedEquipment = {
      ...gameState.character.equipment,
      [slot]: null
    };

    gameState.updateCharacter({
      inventory: updatedInventory,
      equipment: updatedEquipment
    });
  };

  const handleUsePotion = (item: InventoryItem) => {
    if (item.type !== 'potion') return;

    let updates: Partial<SavedCharacter> = {};
    let effectApplied = false;

    // Apply healing
    if (item.healing && gameState.character.health < gameState.character.maxHealth) {
      const newHealth = Math.min(
        gameState.character.health + item.healing,
        gameState.character.maxHealth
      );
      updates.health = newHealth;
      effectApplied = true;
    }

    // Apply mana restore
    if (item.manaRestore && 
        gameState.character.mana !== undefined && 
        gameState.character.maxMana !== undefined && 
        gameState.character.mana < gameState.character.maxMana) {
      const newMana = Math.min(
        gameState.character.mana + item.manaRestore,
        gameState.character.maxMana
      );
      updates.mana = newMana;
      effectApplied = true;
    }

    // Apply stamina restore
    if (item.staminaRestore && 
        gameState.character.stamina !== undefined && 
        gameState.character.maxStamina !== undefined && 
        gameState.character.stamina < gameState.character.maxStamina) {
      const newStamina = Math.min(
        gameState.character.stamina + item.staminaRestore,
        gameState.character.maxStamina
      );
      updates.stamina = newStamina;
      effectApplied = true;
    }

    // Only consume the potion if any effect was applied
    if (effectApplied) {
      const updatedInventory = gameState.character.inventory.map(invItem => {
        if (invItem.id === item.id) {
          return { ...invItem, quantity: invItem.quantity - 1 };
        }
        return invItem;
      }).filter(item => item.quantity > 0);

      updates.inventory = updatedInventory;
      gameState.updateCharacter(updates);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <UserProfile username={initialCharacter.name} onLogout={onLogout} />
        <Character character={gameState.character} />
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('map')}
              className={`flex-1 px-4 py-3 text-center font-medium ${
                activeTab === 'map'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Mapa
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`flex-1 px-4 py-3 text-center font-medium ${
                activeTab === 'inventory'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Inventário
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'map' ? (
              <>
                <GameMap
                  locations={gameState.mapLocations}
                  onLocationSelect={gameState.handleLocationSelect}
                />

                {gameState.currentLocation && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">{gameState.currentLocation.name}</h2>
                    {gameState.currentLocation.type === 'town' ? (
                      <Town 
                        gold={gameState.character.gold} 
                        inventory={gameState.character.inventory}
                        currentHealth={gameState.character.health}
                        maxHealth={gameState.character.maxHealth}
                        onBuyItem={gameState.handleBuyItem}
                        onSellItem={gameState.handleSellItem}
                        onRest={gameState.handleRest}
                      />
                    ) : (
                      gameState.enemy && (
                        <Combat
                          player={gameState.character}
                          enemy={gameState.enemy}
                          onAttack={gameState.handleAttack}
                          onCastSpell={gameState.handleCastSpell}
                          onUseAbility={gameState.handleUseAbility}
                        />
                      )
                    )}
                  </div>
                )}
              </>
            ) : (
              <InventoryPanel
                inventory={gameState.character.inventory}
                equipment={gameState.character.equipment}
                onEquipItem={handleEquipItem}
                onUnequipItem={handleUnequipItem}
                onUsePotion={handleUsePotion}
                currentHealth={gameState.character.health}
                maxHealth={gameState.character.maxHealth}
              />
            )}
          </div>
        </div>

        {gameState.showDeathModal && gameState.enemy && (
          <DeathModal
            characterName={gameState.character.name}
            killedBy={gameState.enemy.name}
            onRespawn={gameState.handleRespawn}
            onCreateNew={onCreateNew}
          />
        )}

        {gameState.showLevelUpModal && (
          <LevelUpModal
            level={gameState.character.level}
            attributes={gameState.character.attributes}
            onAttributeIncrease={gameState.handleAttributeIncrease}
            onSpellSelect={gameState.handleSpellSelect}
            onAbilitySelect={gameState.handleAbilitySelect}
            availablePoints={gameState.attributePoints}
            onClose={gameState.closeLevelUpModal}
            character={gameState.character}
          />
        )}
      </div>
    </div>
  );
}