import React, { useState } from 'react';
import { FileText, PlusCircle, X } from 'lucide-react';
import Card from './Card';
import AddNoteDialog from './AddNoteDialog';

const NotesCard = () => {
  const [notes, setNotes] = useState([
    { id: '1', content: 'Avoid ibuprofen due to potential interactions with current medications.' }
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddNote = (content) => {
    const newNote = {
      id: Math.random().toString(36).substr(2, 9),
      content
    };
    setNotes([...notes, newNote]);
  };

  const handleRemoveNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <>
      <Card title="Personal Notes" icon={FileText} className="relative">
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
        >
          <PlusCircle size={20} />
        </button>

        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="p-4 bg-gray-50 rounded-lg relative group">
              <button
                onClick={() => handleRemoveNote(note.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
              <p className="text-gray-600 pr-6">{note.content}</p>
            </div>
          ))}
        </div>
      </Card>

      <AddNoteDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddNote}
      />
    </>
  );
};

export default NotesCard;
