import React, { useState } from 'react';
import { CLASSES } from '../../data/classes';
import { RACES } from '../../data/races';
import { Race, CharacterClass, Attributes } from '../../types/game';
import { Sword, Shield, Brain, Target, Dumbbell } from 'lucide-react';

const TOTAL_ATTRIBUTE_POINTS = 10;
const MIN_ATTRIBUTE_VALUE = 0;
const MAX_ATTRIBUTE_VALUE = 10;

interface CharacterCreationProps {
  onCreateCharacter: (
    name: string,
    race: Race,
    characterClass: CharacterClass,
    attributes: Attributes
  ) => void;
}

export function CharacterCreation({
  onCreateCharacter,
}: CharacterCreationProps) {
  const [name, setName] = useState('');
  const [selectedRace, setSelectedRace] = useState<Race>(RACES[0]);
  const [selectedClass, setSelectedClass] = useState<CharacterClass>(
    CLASSES[0]
  );
  const [attributes, setAttributes] = useState<Attributes>({
    strength: 0,
    effort: 0,
    resistance: 0,
    intelligence: 0,
    accuracy: 0,
  });

  const usedPoints =
    attributes.strength +
    attributes.effort +
    attributes.resistance +
    attributes.intelligence +
    attributes.accuracy;

  const remainingPoints = TOTAL_ATTRIBUTE_POINTS - usedPoints;

  const handleAttributeChange = (
    attribute: keyof Attributes,
    value: number
  ) => {
    if (value < MIN_ATTRIBUTE_VALUE || value > MAX_ATTRIBUTE_VALUE) return;

    const pointDifference = value - attributes[attribute];
    if (remainingPoints - pointDifference < 0) return;

    setAttributes((prev) => ({
      ...prev,
      [attribute]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && remainingPoints === 0) {
      onCreateCharacter(name, selectedRace, selectedClass, attributes);
    }
  };

  const renderAttributeControl = (
    attribute: keyof Attributes,
    label: string,
    icon: React.ReactNode,
    baseValue: number
  ) => {
    const finalValue = attributes[attribute];
    const modifier = selectedClass.attributeModifiers[attribute];
    const modifiedValue = Math.round(finalValue * modifier);

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <label className="text-sm font-medium text-gray-700">{label}</label>
          </div>
          <div className="text-sm">
            <span className="font-medium">{finalValue}</span>
            <span className="text-gray-500 ml-2">(Final: {modifiedValue})</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              handleAttributeChange(attribute, attributes[attribute] - 1)
            }
            className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 disabled:opacity-50"
            disabled={attributes[attribute] <= MIN_ATTRIBUTE_VALUE}
          >
            -
          </button>
          <div className="flex-1 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{ width: `${(finalValue / MAX_ATTRIBUTE_VALUE) * 100}%` }}
            />
          </div>
          <button
            type="button"
            onClick={() =>
              handleAttributeChange(attribute, attributes[attribute] + 1)
            }
            className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 disabled:opacity-50"
            disabled={
              attributes[attribute] >= MAX_ATTRIBUTE_VALUE ||
              remainingPoints <= 0
            }
          >
            +
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Criar Personagem
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Personagem
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Raça
            </label>
            <div className="grid grid-cols-2 gap-4">
              {RACES.map((race) => (
                <button
                  key={race.id}
                  type="button"
                  onClick={() => setSelectedRace(race)}
                  className={`p-4 border rounded-lg text-left ${
                    selectedRace.id === race.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <h3 className="font-medium">{race.name}</h3>
                  <p className="text-sm text-gray-600">{race.description}</p>
                  <div className="mt-2 text-sm">
                    <div>Vida: {race.bonuses.health}</div>
                    <div>Dano: {race.bonuses.damage}</div>
                    <div>Defesa: {race.bonuses.defense}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Classe
            </label>
            <div className="grid grid-cols-2 gap-4">
              {CLASSES.map((characterClass) => (
                <button
                  key={characterClass.id}
                  type="button"
                  onClick={() => setSelectedClass(characterClass)}
                  className={`p-4 border rounded-lg text-left ${
                    selectedClass.id === characterClass.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <h3 className="font-medium">{characterClass.name}</h3>
                  <p className="text-sm text-gray-600">
                    {characterClass.description}
                  </p>
                  <div className="mt-2 text-sm">
                    <div>Vida Base: {characterClass.baseHealth}</div>
                    <div>Ouro Inicial: {characterClass.startingGold}</div>
                    <div className="mt-1 font-medium">Modificadores:</div>
                    <div>
                      Força: x{characterClass.attributeModifiers.strength}
                    </div>
                    <div>
                      Esforço: x{characterClass.attributeModifiers.effort}
                    </div>
                    <div>
                      Resistência: x
                      {characterClass.attributeModifiers.resistance}
                    </div>
                    <div>
                      Inteligência: x
                      {characterClass.attributeModifiers.intelligence}
                    </div>
                    <div>
                      Acurácia: x{characterClass.attributeModifiers.accuracy}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-medium text-gray-700">
                Atributos
              </label>
              <span
                className={`text-sm font-medium ${
                  remainingPoints === 0 ? 'text-green-500' : 'text-blue-500'
                }`}
              >
                Pontos restantes: {remainingPoints}
              </span>
            </div>
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              {renderAttributeControl(
                'strength',
                'Força',
                <Sword className="w-4 h-4" />,
                selectedClass.baseAttributes.strength
              )}
              {renderAttributeControl(
                'effort',
                'Esforço',
                <Dumbbell className="w-4 h-4" />,
                selectedClass.baseAttributes.effort
              )}
              {renderAttributeControl(
                'resistance',
                'Resistência',
                <Shield className="w-4 h-4" />,
                selectedClass.baseAttributes.resistance
              )}
              {renderAttributeControl(
                'intelligence',
                'Inteligência',
                <Brain className="w-4 h-4" />,
                selectedClass.baseAttributes.intelligence
              )}
              {renderAttributeControl(
                'accuracy',
                'Acurácia',
                <Target className="w-4 h-4" />,
                selectedClass.baseAttributes.accuracy
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim() || remainingPoints !== 0}
            className={`w-full py-2 px-4 rounded-md transition-colors ${
              !name.trim() || remainingPoints !== 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {!name.trim()
              ? 'Digite um nome'
              : remainingPoints !== 0
              ? `Distribua os ${remainingPoints} pontos restantes`
              : 'Criar Personagem'}
          </button>
        </form>
      </div>
    </div>
  );
}
