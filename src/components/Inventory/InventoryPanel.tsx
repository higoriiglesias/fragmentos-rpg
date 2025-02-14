import React from 'react';
import { Shield, Sword, FlaskRound as Flask, Package } from 'lucide-react';
import { InventoryItem, Equipment } from '../../types/game';

interface InventoryPanelProps {
  inventory: InventoryItem[];
  equipment: Equipment;
  currentHealth: number;
  maxHealth: number;
  onEquipItem: (item: InventoryItem) => void;
  onUnequipItem: (slot: 'weapon' | 'armor') => void;
  onUsePotion: (item: InventoryItem) => void;
}

export function InventoryPanel({
  inventory,
  equipment,
  onEquipItem,
  onUnequipItem,
  onUsePotion,
}: InventoryPanelProps) {
  const [activeTab, setActiveTab] = React.useState<'equipment' | 'potions' | 'loot'>('equipment');
  
  const equippableItems = inventory.filter(
    (item) => item.type === 'weapon' || item.type === 'armor'
  );

  const potions = inventory.filter(
    (item) => item.type === 'potion'
  );

  const lootItems = inventory.filter(
    (item) => item.type === 'loot'
  );

  const renderPotionEffect = (potion: InventoryItem) => {
    const effects = [];
    if (potion.healing) {
      effects.push(<span key="health" className="text-red-500">Vida: +{potion.healing}</span>);
    }
    if (potion.manaRestore) {
      effects.push(<span key="mana" className="text-blue-500">Mana: +{potion.manaRestore}</span>);
    }
    if (potion.staminaRestore) {
      effects.push(<span key="stamina" className="text-yellow-500">Estamina: +{potion.staminaRestore}</span>);
    }
    return effects;
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('equipment')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            activeTab === 'equipment'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          <Sword className="w-4 h-4" />
          Equipamento
        </button>
        <button
          onClick={() => setActiveTab('potions')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            activeTab === 'potions'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          <Flask className="w-4 h-4" />
          Poções
        </button>
        <button
          onClick={() => setActiveTab('loot')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            activeTab === 'loot'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          <Package className="w-4 h-4" />
          Espólios
        </button>
      </div>

      {activeTab === 'equipment' ? (
        <div className="space-y-6">
          {/* Equipment Slots */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sword className="w-5 h-5 text-gray-600" />
                <h3 className="font-medium">Arma</h3>
              </div>
              {equipment.weapon ? (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{equipment.weapon.name}</p>
                    <p className="text-sm text-gray-600">Poder: {equipment.weapon.power}</p>
                  </div>
                  <button
                    onClick={() => onUnequipItem('weapon')}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    Desequipar
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Nenhuma arma equipada</p>
              )}
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-gray-600" />
                <h3 className="font-medium">Armadura</h3>
              </div>
              {equipment.armor ? (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{equipment.armor.name}</p>
                    <p className="text-sm text-gray-600">Defesa: {equipment.armor.power}</p>
                  </div>
                  <button
                    onClick={() => onUnequipItem('armor')}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    Desequipar
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Nenhuma armadura equipada</p>
              )}
            </div>
          </div>

          {/* Inventory Items */}
          <div>
            <h3 className="font-medium mb-3">Itens Equipáveis</h3>
            <div className="grid grid-cols-2 gap-4">
              {equippableItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      {item.power && (
                        <p className="text-sm text-blue-600">
                          {item.type === 'weapon' ? 'Poder: ' : 'Defesa: '}
                          {item.power}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        Quantidade: {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => onEquipItem(item)}
                      className="text-sm text-blue-500 hover:text-blue-600"
                    >
                      Equipar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === 'potions' ? (
        <div>
          <div className="grid grid-cols-2 gap-4">
            {potions.map((potion) => (
              <div key={potion.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Flask className="w-4 h-4 text-red-500" />
                      <p className="font-medium">{potion.name}</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{potion.description}</p>
                    <div className="flex flex-col gap-1">
                      {renderPotionEffect(potion)}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Quantidade: {potion.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => onUsePotion(potion)}
                    disabled={potion.quantity <= 0}
                    className={`ml-4 px-3 py-1 rounded ${
                      potion.quantity > 0
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Usar
                  </button>
                </div>
              </div>
            ))}
            {potions.length === 0 && (
              <div className="col-span-2 text-center py-8 text-gray-500">
                Nenhuma poção no inventário
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="font-medium mb-3">Itens Coletados</h3>
          <div className="grid grid-cols-2 gap-4">
            {lootItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-yellow-600">🪙 {item.price}</span>
                      <span className="text-sm text-gray-500">
                        Quantidade: {item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {lootItems.length === 0 && (
              <div className="col-span-2 text-center py-8 text-gray-500">
                Nenhum item coletado ainda
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}