import React from 'react';
import { LogOut, User } from 'lucide-react';

interface UserProfileProps {
  username: string;
  onLogout: () => void;
}

export function UserProfile({ username, onLogout }: UserProfileProps) {
  const handleBackToSelection = () => {
    // Force reload the page to go back to character selection
    window.location.reload();
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-blue-500" />
          <span className="font-medium">{username}</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackToSelection}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-600"
          >
            Seleção de Personagem
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-600"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}