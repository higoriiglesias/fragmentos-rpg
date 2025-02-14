import React, { useState, useEffect } from 'react';
import { InventoryItem } from '../types/game';
import { enemies } from '../data/enemies';

interface Quest {
  id: number;
  name: string;
  description: string;
  requirements: string;
  type: 'kill' | 'collect';
  target: string;
  amount: number;
  completed: boolean;
}

interface QuestsProps {
  inventory: InventoryItem[];
  enemyKillCount?: Record<string, number>;
}

const initialQuests: Quest[] = [
  { id: 1, name: 'Caça aos Lobos', description: 'Mate 5 lobos na floresta.', requirements: 'Derrotar 5 lobos', type: 'kill', target: 'Lobo', amount: 5, completed: false },
  { id: 2, name: 'Coleta de Couro', description: 'Pegue 3 Couros.', requirements: 'Coletar 3 Couros', type: 'collect', target: 'Couro', amount: 3, completed: false },
  { id: 3, name: 'Derrotar o Lich', description: 'Enfrente e derrote o Lich.', requirements: 'Derrotar o Lich', type: 'kill', target: 'Lich', amount: 1, completed: false }
];

// Função para normalizar nomes (remover acentos, espaços e converter para minúsculas)
const normalizeName = (name: string) => {
  return name
    .toLowerCase()
    .normalize('NFD') // Remove acentos
    .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos
    .trim(); // Remove espaços extras
};

export function Quests({ inventory = [], enemyKillCount = {} }: QuestsProps) {
  const [quests, setQuests] = useState(initialQuests);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [canComplete, setCanComplete] = useState(false);

  useEffect(() => {
    if (selectedQuest) {
      if (selectedQuest.type === 'kill') {
        const killCount = enemyKillCount[selectedQuest.target] ?? 0;
        setCanComplete(killCount >= selectedQuest.amount);
      } else if (selectedQuest.type === 'collect') {
        // Normaliza o nome do item para comparação
        const targetItemName = normalizeName(selectedQuest.target);
        const item = inventory.find(i => normalizeName(i.name) === targetItemName);

        console.log('Inventário:', inventory); // Log para depuração
        console.log('Item procurado:', targetItemName); // Log para depuração
        console.log('Item encontrado:', item); // Log para depuração

        setCanComplete((item?.quantity || 0) >= selectedQuest.amount);
      }
    }
  }, [selectedQuest, inventory, enemyKillCount]);

  const startQuest = (quest: Quest) => {
    setSelectedQuest(quest);
  };

  const completeQuest = () => {
    if (selectedQuest && canComplete) {
      setQuests((prevQuests) =>
        prevQuests.map((q) =>
          q.id === selectedQuest.id ? { ...q, completed: true } : q
        )
      );
      setSelectedQuest(null);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-bold mb-4">Missões do Rei</h3>
      {selectedQuest ? (
        <div>
          <h4 className="text-lg font-semibold">{selectedQuest.name}</h4>
          <p className="text-gray-700">{selectedQuest.description}</p>
          <p className="text-gray-500">Objetivo: {selectedQuest.requirements}</p>
          {selectedQuest.type === 'kill' ? (
            <p className="text-gray-600">Progresso: {enemyKillCount[selectedQuest.target] ?? 0}/{selectedQuest.amount}</p>
          ) : (
            <p className="text-gray-600">Progresso: {(inventory.find(i => normalizeName(i.name) === normalizeName(selectedQuest.target))?.quantity || 0)}/{selectedQuest.amount}</p>
          )}
          <button onClick={completeQuest} disabled={!canComplete} className={`mt-4 px-4 py-2 rounded-lg ${canComplete ? 'bg-green-500 text-white' : 'bg-gray-400 text-gray-700'}`}>
            Concluir Missão
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {quests.map((quest) => (
            <button
              key={quest.id}
              onClick={() => startQuest(quest)}
              disabled={quest.completed}
              className={`block w-full p-4 border rounded-lg ${quest.completed ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
            >
              {quest.name} {quest.completed && '(Concluída)'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}