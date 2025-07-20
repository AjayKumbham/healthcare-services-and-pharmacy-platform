import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddNoteDialog = ({ isOpen, onClose, onSave }) => {
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (note.trim()) {
      onSave(note);
      setNote('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Medical Note</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none"
          placeholder="Enter your medical note..."
        />

        <button
          onClick={handleSave}
          disabled={!note.trim()}
          className="mt-4 w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Note
        </button>
      </div>
    </div>
  );
};

export default AddNoteDialog;
