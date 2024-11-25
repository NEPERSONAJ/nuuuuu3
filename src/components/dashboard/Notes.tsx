import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Save, X, Edit2 } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

interface EditingNote {
  id: string;
  title: string;
  content: string;
}

export const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState<EditingNote | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async () => {
    try {
      if (!title.trim()) {
        throw new Error('Заголовок обязателен');
      }

      const { data, error } = await supabase
        .from('notes')
        .insert([
          {
            title: title.trim(),
            content: content.trim(),
            user_id: (await supabase.auth.getUser()).data.user?.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setNotes([data, ...notes]);
      setTitle('');
      setContent('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleStartEditing = (note: Note) => {
    setEditingNote({
      id: note.id,
      title: note.title,
      content: note.content,
    });
  };

  const handleCancelEditing = () => {
    setEditingNote(null);
  };

  const handleUpdateNote = async () => {
    if (!editingNote) return;

    try {
      if (!editingNote.title.trim()) {
        throw new Error('Заголовок обязателен');
      }

      const { error } = await supabase
        .from('notes')
        .update({
          title: editingNote.title.trim(),
          content: editingNote.content.trim(),
        })
        .eq('id', editingNote.id);

      if (error) throw error;

      setNotes(notes.map(note => 
        note.id === editingNote.id 
          ? { ...note, title: editingNote.title.trim(), content: editingNote.content.trim() }
          : note
      ));
      setEditingNote(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setNotes(notes.filter(note => note.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-[var(--neon-cyan)]">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="mb-4 p-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* Note Input */}
      <div className="mb-4 space-y-3">
        <input
          type="text"
          placeholder="Заголовок заметки..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="cyber-input w-full normal-case text-base"
          style={{ textTransform: 'none' }}
        />
        <textarea
          placeholder="Содержание заметки..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="cyber-input w-full h-24 resize-none normal-case text-base"
          style={{ textTransform: 'none' }}
        />
        <button
          onClick={handleCreateNote}
          className="cyber-button w-full text-base"
          disabled={!title.trim()}
        >
          <Plus className="w-4 h-4 mr-2" />
          Добавить заметку
        </button>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 neon-border rounded-lg bg-[rgba(0,229,255,0.05)] hover:shadow-[var(--neon-glow)]
                     transition-all duration-300"
          >
            {editingNote?.id === note.id ? (
              // Editing Mode
              <div className="space-y-3">
                <input
                  type="text"
                  value={editingNote.title}
                  onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                  className="cyber-input w-full normal-case text-base"
                  style={{ textTransform: 'none' }}
                />
                <textarea
                  value={editingNote.content}
                  onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                  className="cyber-input w-full h-24 resize-none normal-case text-base"
                  style={{ textTransform: 'none' }}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleCancelEditing}
                    className="cyber-button px-3 py-1 text-sm bg-red-500 bg-opacity-10 hover:bg-opacity-20"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Отмена
                  </button>
                  <button
                    onClick={handleUpdateNote}
                    className="cyber-button px-3 py-1 text-sm"
                    disabled={!editingNote.title.trim()}
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Сохранить
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0"> {/* Add min-w-0 to enable text wrapping */}
                    <h3 className="text-[var(--neon-cyan)] font-semibold text-base mb-2 normal-case break-words">
                      {note.title}
                    </h3>
                    <p className="text-[var(--neon-cyan)] opacity-80 whitespace-pre-wrap text-base normal-case break-words">
                      {note.content}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-2 flex-shrink-0">
                    <button
                      onClick={() => handleStartEditing(note)}
                      className="p-1 hover:bg-[rgba(0,229,255,0.1)] rounded transition-colors"
                      title="Редактировать заметку"
                    >
                      <Edit2 className="w-4 h-4 text-[var(--neon-cyan)]" />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1 hover:bg-[rgba(255,0,0,0.1)] rounded transition-colors"
                      title="Удалить заметку"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-[var(--neon-cyan)] opacity-60">
                  {new Date(note.created_at).toLocaleString()}
                </div>
              </>
            )}
          </div>
        ))}

        {notes.length === 0 && (
          <div className="text-center text-[var(--neon-cyan)] opacity-60 py-4 text-base">
            Заметок пока нет. Создайте свою первую заметку!
          </div>
        )}
      </div>
    </div>
  );
};