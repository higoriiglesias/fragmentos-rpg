import React, { useState } from 'react';
import { LoginForm } from './components/Auth/LoginForm';
import { GameContent } from './components/GameContent';
import { CharacterSelection } from './components/Character/CharacterSelection';
import { CharacterCreation } from './components/Character/CharacterCreation';
import { useAuth } from './hooks/useAuth';
import { SavedCharacter, Race, CharacterClass, Attributes } from './types/game';
import { useCharacter } from './hooks/useCharacter';

function App() {
  const { user, isLoading, login, register, logout, saveCharacter, updateCharacter, deleteCharacter } = useAuth();
  const { createCharacter } = useCharacter();
  const [activeCharacter, setActiveCharacter] = useState<SavedCharacter | null>(null);
  const [showCharacterCreation, setShowCharacterCreation] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={login} onRegister={register} />;
  }

  const handleCreateNew = (characterToDelete?: SavedCharacter) => {
    if (characterToDelete) {
      deleteCharacter(characterToDelete.id);
    }
    setActiveCharacter(null);
    setShowCharacterCreation(true);
  };

  const handleBackToSelection = () => {
    setActiveCharacter(null);
    setShowCharacterCreation(false);
  };

  if (showCharacterCreation) {
    const handleCreateCharacter = (name: string, race: Race, characterClass: CharacterClass, attributes: Attributes) => {
      const newCharacter = createCharacter(name, race, characterClass, attributes);
      const savedCharacter: SavedCharacter = {
        ...newCharacter,
        id: Date.now().toString(),
        createdAt: Date.now(),
      };
      saveCharacter(savedCharacter);
      setShowCharacterCreation(false);
    };

    return (
      <div>
        <button
          onClick={handleBackToSelection}
          className="fixed top-4 left-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Voltar
        </button>
        <CharacterCreation onCreateCharacter={handleCreateCharacter} />
      </div>
    );
  }

  if (!activeCharacter) {
    return (
      <CharacterSelection
        characters={user.characters}
        onSelectCharacter={setActiveCharacter}
        onCreateNew={() => handleCreateNew()}
        onDeleteCharacter={deleteCharacter}
      />
    );
  }

  return (
    <div>
      <button
        onClick={handleBackToSelection}
        className="fixed top-4 left-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
      >
        Voltar para Seleção
      </button>
      <GameContent 
        character={activeCharacter}
        onCharacterUpdate={updateCharacter}
        onLogout={() => {
          setActiveCharacter(null);
          logout();
        }}
        onCreateNew={() => handleCreateNew(activeCharacter)}
      />
    </div>
  );
}

export default App;