import React, { useState } from 'react';
import { SavedCharacter } from '../../types/game';
import { UserCircle2, Plus, Swords, Trash2 } from 'lucide-react';

interface CharacterSelectionProps {
  characters: SavedCharacter[];
  onSelectCharacter: (character: SavedCharacter) => void;
  onCreateNew: () => void;
  onDeleteCharacter: (characterId: string) => void;
}

export function CharacterSelection({
  characters,
  onSelectCharacter,
  onCreateNew,
  onDeleteCharacter,
}: CharacterSelectionProps) {
  const MAX_CHARACTERS = 3;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleDeleteClick = (characterId: string) => {
    setShowDeleteConfirm(characterId);
  };

  const handleConfirmDelete = (characterId: string) => {
    onDeleteCharacter(characterId);
    setShowDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Seus Personagens
        </h2>

        <div className="grid grid-cols-1 gap-4 mb-6">
          {characters.map((character) => (
            <div
              key={character.id}
              className="relative border rounded-lg hover:bg-gray-50 transition-colors"
            >
              {showDeleteConfirm === character.id ? (
                <div className="p-4">
                  <p className="text-center mb-4">
                    Tem certeza que deseja excluir {character.name}?
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleConfirmDelete(character.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(null)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center p-4">
                  <div className="flex-shrink-0 mr-4">
                    <UserCircle2 className="w-12 h-12 text-blue-500" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-lg">{character.name}</h3>
                    <p className="text-sm text-gray-600">
                      Nível {character.level} {character.race.name}{' '}
                      {character.class.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleDeleteClick(character.id)}
                      className="p-2 text-red-500 hover:text-red-600 transition-colors"
                      title="Excluir personagem"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onSelectCharacter(character)}
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
                    >
                      <Swords className="w-5 h-5" />
                      <span>Jogar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {characters.length < MAX_CHARACTERS && (
            <button
              onClick={onCreateNew}
              className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-6 h-6 text-gray-400 mr-2" />
              <span className="text-gray-600">Criar Novo Personagem</span>
            </button>
          )}
        </div>

        <div className="text-center text-sm text-gray-500">
          {characters.length} de {MAX_CHARACTERS} personagens criados
        </div>
      </div>
    </div>
  );
}