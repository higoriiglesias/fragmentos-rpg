import { useState, useEffect } from 'react';
import { User, SavedCharacter } from '../types/game';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    // In a real app, this would be an API call
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.email === email) {
        setUser(user);
        return;
      }
    }
    alert('Email ou senha incorretos');
  };

  const register = (email: string, password: string) => {
    // In a real app, this would be an API call
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.email === email) {
        alert('Email já cadastrado');
        return;
      }
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      characters: [],
    };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const saveCharacter = (character: SavedCharacter) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      characters: [...user.characters, character],
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const updateCharacter = (character: SavedCharacter) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      characters: user.characters.map(c => 
        c.id === character.id ? character : c
      ),
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const deleteCharacter = (characterId: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      characters: user.characters.filter(c => c.id !== characterId),
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return { 
    user, 
    isLoading, 
    login,
    register,
    logout,
    saveCharacter,
    updateCharacter,
    deleteCharacter,
  };
}