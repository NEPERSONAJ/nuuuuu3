import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Loader2, Settings, Copy, Check, Plus, Trash2, Save, X, Maximize2, Minimize2, MessageSquare, Edit2, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { supabase } from '../../lib/supabase';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

interface Chat {
  id: string;
  title: string;
  created_at: string;
  is_expanded: boolean;
}

interface Preset {
  id: string;
  name: string;
  system_prompt: string;
  created_at: string;
}

const API_KEY = 'sk-K8UFZvz7K59xvk8EoUfF0fC9x8Op4QbTP1HFcDost0qMi1Y0';
const API_URL = 'https://api.typegpt.net/v1/chat/completions';

const models = [
  { id: 'gpt-4o', name: 'GPT-4O' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
  { id: 'claude-2', name: 'Claude 2' },
  { id: 'gemini-pro', name: 'Gemini Pro' },
];

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState(models[0].id);
  const [showSettings, setShowSettings] = useState(false);
  const [presets, setPresets] = useState<Preset[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);
  const [newPreset, setNewPreset] = useState({ name: '', system_prompt: '' });
  const [showNewPreset, setShowNewPreset] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingChatTitle, setEditingChatTitle] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatListRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchChats();
    fetchPresets();
  }, []);

  useEffect(() => {
    if (currentChat) {
      fetchMessages(currentChat.id);
    }
  }, [currentChat]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsExpanded(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!isExpanded) {
        if (containerRef.current) {
          await containerRef.current.requestFullscreen();
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

  const fetchChats = async () => {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setChats(data || []);
      if (data && data.length > 0 && !currentChat) {
        setCurrentChat(data[0]);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const fetchMessages = async (chatId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const createNewChat = async () => {
    try {
      const chatCount = chats.length + 1;
      const defaultTitle = `Чат ${chatCount}`;

      const { data, error } = await supabase
        .from('chats')
        .insert([{
          title: defaultTitle,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        }])
        .select()
        .single();

      if (error) throw error;

      setChats([data, ...chats]);
      setCurrentChat(data);
      setMessages([]);
      setShowSidebar(false);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const updateChatTitle = async (chatId: string, newTitle: string) => {
    try {
      const { error } = await supabase
        .from('chats')
        .update({ title: newTitle })
        .eq('id', chatId);

      if (error) throw error;

      setChats(chats.map(chat => 
        chat.id === chatId ? { ...chat, title: newTitle } : chat
      ));
      setEditingChatId(null);
    } catch (error) {
      console.error('Error updating chat title:', error);
    }
  };

  const deleteChat = async (chatId: string) => {
    try {
      const { error } = await supabase
        .from('chats')
        .delete()
        .eq('id', chatId);

      if (error) throw error;

      setChats(chats.filter(chat => chat.id !== chatId));
      if (currentChat?.id === chatId) {
        const remainingChats = chats.filter(chat => chat.id !== chatId);
        setCurrentChat(remainingChats[0] || null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const fetchPresets = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_presets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPresets(data || []);
    } catch (error) {
      console.error('Error fetching presets:', error);
    }
  };

  const handleCreatePreset = async () => {
    try {
      if (!newPreset.name.trim() || !newPreset.system_prompt.trim()) {
        throw new Error('Имя и системный промпт обязательны');
      }

      const { data, error } = await supabase
        .from('chat_presets')
        .insert([{
          name: newPreset.name.trim(),
          system_prompt: newPreset.system_prompt.trim(),
          user_id: (await supabase.auth.getUser()).data.user?.id,
        }])
        .select()
        .single();

      if (error) throw error;

      setPresets([data, ...presets]);
      setNewPreset({ name: '', system_prompt: '' });
      setShowNewPreset(false);
    } catch (error) {
      console.error('Error creating preset:', error);
    }
  };

  const handleDeletePreset = async (id: string) => {
    try {
      const { error } = await supabase
        .from('chat_presets')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPresets(presets.filter(preset => preset.id !== id));
      if (selectedPreset?.id === id) {
        setSelectedPreset(null);
      }
    } catch (error) {
      console.error('Error deleting preset:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const formatMessage = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index)
        });
      }

      parts.push({
        type: 'code',
        language: match[1] || 'plaintext',
        content: match[2].trim()
      });

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex)
      });
    }

    return parts;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !currentChat) return;

    const userMessage = input.trim();
    setInput('');
    
    try {
      const { data: messageData, error: messageError } = await supabase
        .from('chat_messages')
        .insert([{
          chat_id: currentChat.id,
          role: 'user',
          content: userMessage
        }])
        .select()
        .single();

      if (messageError) throw messageError;
      setMessages(prev => [...prev, messageData]);

      setIsLoading(true);
      setError(null);

      let apiMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      if (selectedPreset) {
        apiMessages = [
          { role: 'system', content: selectedPreset.system_prompt },
          ...apiMessages
        ];
      }

      apiMessages.push({ role: 'user', content: userMessage });

      const response = await axios.post(API_URL, {
        model: selectedModel,
        messages: apiMessages
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const assistantMessage = response.data.choices[0].message.content;
      
      const { data: assistantData, error: assistantError } = await supabase
        .from('chat_messages')
        .insert([{
          chat_id: currentChat.id,
          role: 'assistant',
          content: assistantMessage
        }])
        .select()
        .single();

      if (assistantError) throw assistantError;
      setMessages(prev => [...prev, assistantData]);

    } catch (error: any) {
      console.error('Error:', error);
      setError(error.response?.data?.error?.message || error.message || 'Произошла ошибка при отправке сообщения');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full relative" ref={containerRef}>
      {/* Sidebar toggle buttons */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[rgba(0,229,255,0.1)] p-2 rounded-r-lg
                   hover:bg-[rgba(0,229,255,0.2)] transition-colors border-r border-t border-b border-[var(--neon-cyan)] border-opacity-20"
      >
        {showSidebar ? (
          <ChevronLeft className="w-5 h-5 text-[var(--neon-cyan)]" />
        ) : (
          <ChevronRight className="w-5 h-5 text-[var(--neon-cyan)]" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-64 bg-[rgba(4,7,20,0.98)] border-r border-[var(--neon-cyan)] border-opacity-20
                   transition-transform duration-300 z-20 transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4 bg-[rgba(0,229,255,0.05)]">
          <button
            onClick={createNewChat}
            className="cyber-button w-full py-2 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Новый чат
          </button>
        </div>

        {/* Close button */}
        <button
          onClick={() => setShowSidebar(false)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[rgba(0,229,255,0.1)] p-2 rounded-l-lg
                     hover:bg-[rgba(0,229,255,0.2)] transition-colors border-l border-t border-b border-[var(--neon-cyan)] border-opacity-20"
        >
          <ChevronLeft className="w-5 h-5 text-[var(--neon-cyan)]" />
        </button>
        
        <div
          ref={chatListRef}
          className="overflow-y-auto h-[calc(100%-4rem)] scrollbar-thin scrollbar-thumb-[var(--neon-cyan)] scrollbar-track-transparent"
        >
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`p-3 hover:bg-[rgba(0,229,255,0.1)] cursor-pointer ${
                currentChat?.id === chat.id ? 'bg-[rgba(0,229,255,0.15)]' : ''
              }`}
              onClick={() => {
                setCurrentChat(chat);
                setShowSidebar(false);
              }}
            >
              <div className="flex items-center justify-between">
                {editingChatId === chat.id ? (
                  <input
                    type="text"
                    value={editingChatTitle}
                    onChange={(e) => setEditingChatTitle(e.target.value)}
                    onBlur={() => updateChatTitle(chat.id, editingChatTitle)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        updateChatTitle(chat.id, editingChatTitle);
                      }
                    }}
                    className="cyber-input py-1 px-2 text-sm w-full"
                    autoFocus
                  />
                ) : (
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <MessageSquare className="w-4 h-4 text-[var(--neon-cyan)] flex-shrink-0" />
                    <span className="text-[var(--neon-cyan)] truncate">{chat.title}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingChatId(chat.id);
                      setEditingChatTitle(chat.title);
                    }}
                    className="p-1 hover:bg-[rgba(0,229,255,0.2)] rounded"
                  >
                    <Edit2 className="w-3 h-3 text-[var(--neon-cyan)]" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                    }}
                    className="p-1 hover:bg-[rgba(255,0,0,0.1)] rounded"
                  >
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col h-full">
        <div className="flex justify-between items-center p-4 bg-[rgba(0,229,255,0.05)] border-b border-[var(--neon-cyan)] border-opacity-20">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-[var(--neon-cyan)]" />
            <span className="text-[var(--neon-cyan)] font-semibold">
              {currentChat?.title || 'Новый чат'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-[rgba(0,229,255,0.1)] rounded transition-colors"
              title={isExpanded ? 'Свернуть' : 'Развернуть'}
            >
              {isExpanded ? (
                <Minimize2 className="w-5 h-5 text-[var(--neon-cyan)]" />
              ) : (
                <Maximize2 className="w-5 h-5 text-[var(--neon-cyan)]" />
              )}
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-[rgba(0,229,255,0.1)] rounded transition-colors"
            >
              <Settings className="w-5 h-5 text-[var(--neon-cyan)]" />
            </button>
          </div>
        </div>

        {showSettings && (
          <div className="p-4 bg-[rgba(0,229,255,0.05)] border-b border-[var(--neon-cyan)] border-opacity-20">
            <div className="space-y-4">
              <div>
                <label className="block text-[var(--neon-cyan)] mb-2">Выберите модель:</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-[rgba(4,7,20,0.95)] border-2 border-[var(--neon-cyan)] rounded-lg p-2
                           text-[var(--neon-cyan)] focus:outline-none focus:ring-2 focus:ring-[var(--neon-cyan)]"
                >
                  {models.map(model => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[var(--neon-cyan)]">Пресеты:</label>
                  <button
                    onClick={() => setShowNewPreset(!showNewPreset)}
                    className="cyber-button py-1 px-2 text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Новый пресет
                  </button>
                </div>

                {showNewPreset && (
                  <div className="mb-4 p-4 bg-[rgba(4,7,20,0.95)] rounded-lg space-y-3">
                    <input
                      type="text"
                      placeholder="Название пресета..."
                      value={newPreset.name}
                      onChange={(e) => setNewPreset({ ...newPreset, name: e.target.value })}
                      className="cyber-input w-full text-sm"
                    />
                    <textarea
                      placeholder="Системный промпт..."
                      value={newPreset.system_prompt}
                      onChange={(e) => setNewPreset({ ...newPreset, system_prompt: e.target.value })}
                      className="cyber-input w-full h-24 text-sm resize-none"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowNewPreset(false)}
                        className="cyber-button px-3 py-1 text-sm bg-red-500 bg-opacity-10 hover:bg-opacity-20"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Отмена
                      </button>
                      <button
                        onClick={handleCreatePreset}
                        className="cyber-button px-3 py-1 text-sm"
                        disabled={!newPreset.name.trim() || !newPreset.system_prompt.trim()}
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Сохранить
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {presets.map(preset => (
                    <div
                      key={preset.id}
                      className={`p-2 rounded-lg flex items-center justify-between ${
                        selectedPreset?.id === preset.id
                          ? 'bg-[rgba(0,229,255,0.2)]'
                          : 'bg-[rgba(4,7,20,0.95)] hover:bg-[rgba(0,229,255,0.1)]'
                      }`}
                    >
                      <button
                        onClick={() => setSelectedPreset(selectedPreset?.id === preset.id ? null : preset)}
                        className="flex-1 text-left text-[var(--neon-cyan)] text-sm"
                      >
                        {preset.name}
                      </button>
                      <button
                        onClick={() => handleDeletePreset(preset.id)}
                        className="p-1 hover:bg-[rgba(255,0,0,0.1)] rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[var(--neon-cyan)] scrollbar-track-transparent">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${ message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-[rgba(0,229,255,0.2)] ml-4'
                    : 'bg-[rgba(0,229,255,0.1)] mr-4'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.role === 'assistant' && (
                    <Bot className="w-4 h-4 text-[var(--neon-cyan)]" />
                  )}
                  <span className="text-[var(--neon-cyan)] text-sm font-semibold">
                    {message.role === 'user' ? 'Вы' : 'Ассистент'}
                  </span>
                </div>
                <div className="space-y-2">
                  {formatMessage(message.content).map((part, partIndex) => (
                    part.type === 'code' ? (
                      <div key={partIndex} className="relative">
                        <div className="absolute right-2 top-2">
                          <button
                            onClick={() => handleCopyCode(part.content, index * 1000 + partIndex)}
                            className="p-1 hover:bg-[rgba(0,229,255,0.2)] rounded transition-colors"
                          >
                            {copiedIndex === index * 1000 + partIndex ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-[var(--neon-cyan)]" />
                            )}
                          </button>
                        </div>
                        <SyntaxHighlighter
                          language={part.language}
                          style={atomOneDark}
                          customStyle={{
                            margin: 0,
                            borderRadius: '0.5rem',
                            padding: '1rem'
                          }}
                        >
                          {part.content}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <p key={partIndex} className="text-[var(--neon-cyan)] whitespace-pre-wrap">
                        {part.content}
                      </p>
                    )
                  ))}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[rgba(0,229,255,0.1)] p-3 rounded-lg mr-4">
                <Loader2 className="w-5 h-5 text-[var(--neon-cyan)] animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--neon-cyan)] border-opacity-20">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Введите сообщение..."
              className="flex-1 bg-transparent border-2 border-[var(--neon-cyan)] rounded-lg p-3
                       text-[var(--neon-cyan)] placeholder-[var(--neon-cyan)] placeholder-opacity-50
                       focus:outline-none focus:ring-2 focus:ring-[var(--neon-cyan)]"
              disabled={isLoading || !currentChat}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim() || !currentChat}
              className="cyber-button px-4 py-2 flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};