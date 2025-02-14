import React, { useState } from 'react';
import { Item, InventoryItem } from '../types/game';
import { WEAPONS, ARMORS, LOOT, POTIONS } from '../data/items';
import { Inn } from './Inn';
import { Quests } from './Quests';

interface TownProps {
  gold: number;
  inventory: InventoryItem[];
  currentHealth: number;
  maxHealth: number;
  onBuyItem: (item: Item) => void;
  onSellItem: (item: InventoryItem) => void;
  onRest: () => void;
}

export function Town({
  gold,
  inventory,
  currentHealth,
  maxHealth,
  onBuyItem,
  onSellItem,
  onRest,
}: TownProps) {
  const [activeTab, setActiveTab] = useState<'shop' | 'inn' | 'sell' | 'king'>('shop');

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Cidade</h2>
        <p className="text-lg">Ouro: 🪙 {gold}</p>
      </div>

      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab('shop')} className={`px-4 py-2 rounded-lg ${activeTab === 'shop' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>Loja</button>
        <button onClick={() => setActiveTab('inn')} className={`px-4 py-2 rounded-lg ${activeTab === 'inn' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>Taverna</button>
        <button onClick={() => setActiveTab('sell')} className={`px-4 py-2 rounded-lg ${activeTab === 'sell' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>Vender</button>
        <button onClick={() => setActiveTab('king')} className={`px-4 py-2 rounded-lg ${activeTab === 'king' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>Rei</button>
      </div>

      {activeTab === 'inn' ? (
        <Inn gold={gold} currentHealth={currentHealth} maxHealth={maxHealth} onRest={onRest} />
      ) : activeTab === 'sell' ? (
        <div>
          <h3 className="text-lg font-semibold mb-4">Seu inventário</h3>
          <div className="grid grid-cols-2 gap-4">
            {inventory.map((item) => (
              <button key={item.id} onClick={() => onSellItem(item)} className="p-3 border rounded-lg hover:bg-gray-50">
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-600">{item.description}</div>
                <div className="text-yellow-600 mt-2">Vender por 🪙 {Math.floor(item.price * 0.7)}</div>
                <div className="text-sm text-gray-500">Quantidade: {item.quantity}</div>
              </button>
            ))}
          </div>
        </div>
      ) : activeTab === 'king' ? (
        <Quests />
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Armas</h3>
            <div className="grid grid-cols-2 gap-4">
              {WEAPONS.map((weapon) => (
                <button key={weapon.id} onClick={() => onBuyItem(weapon)} disabled={gold < weapon.price} className="p-3 border rounded-lg hover:bg-gray-50 disabled:opacity-50">
                  <div className="font-medium">{weapon.name}</div>
                  <div className="text-sm text-gray-600">{weapon.description}</div>
                  <div className="text-yellow-600 mt-2">🪙 {weapon.price}</div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Armaduras</h3>
            <div className="grid grid-cols-2 gap-4">
              {ARMORS.map((armor) => (
                <button key={armor.id} onClick={() => onBuyItem(armor)} disabled={gold < armor.price} className="p-3 border rounded-lg hover:bg-gray-50 disabled:opacity-50">
                  <div className="font-medium">{armor.name}</div>
                  <div className="text-sm text-gray-600">{armor.description}</div>
                  <div className="text-yellow-600 mt-2">🪙 {armor.price}</div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Poções</h3>
            <div className="grid grid-cols-2 gap-4">
              {POTIONS.map((potion) => (
                <button key={potion.id} onClick={() => onBuyItem(potion)} disabled={gold < potion.price} className="p-3 border rounded-lg hover:bg-gray-50 disabled:opacity-50">
                  <div className="font-medium">{potion.name}</div>
                  <div className="text-sm text-gray-600">{potion.description}</div>
                  <div className="text-yellow-600 mt-2">🪙 {potion.price}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}