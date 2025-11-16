'use client';

import { useState } from 'react';
import {
  Users,
  GraduationCap,
  Briefcase,
  UserCheck,
  Calendar,
  Clock,
  Euro,
  Package,
  MessageSquare,
  Send,
  School,
  FileText,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  prompt: string;
  color: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickActions: QuickAction[] = [
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Élèves',
      prompt: 'Aide-moi à gérer les élèves de l\'école',
      color: 'bg-blue-500'
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      label: 'Enseignants',
      prompt: 'Aide-moi à gérer les enseignants',
      color: 'bg-green-500'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Horaires',
      prompt: 'Aide-moi à organiser les horaires des cours',
      color: 'bg-purple-500'
    },
    {
      icon: <Euro className="w-5 h-5" />,
      label: 'Finances',
      prompt: 'Aide-moi à gérer les finances de l\'école',
      color: 'bg-yellow-500'
    },
    {
      icon: <Package className="w-5 h-5" />,
      label: 'Fournitures',
      prompt: 'Aide-moi à commander des fournitures scolaires',
      color: 'bg-orange-500'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Travail',
      prompt: 'Aide-moi à gérer les horaires de travail du personnel',
      color: 'bg-indigo-500'
    },
    {
      icon: <UserCheck className="w-5 h-5" />,
      label: 'Responsables',
      prompt: 'Aide-moi à gérer les personnes responsables des élèves',
      color: 'bg-pink-500'
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: 'Rapports',
      prompt: 'Génère-moi un rapport sur l\'école',
      color: 'bg-teal-500'
    }
  ];

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      if (!response.ok) throw new Error('Erreur de communication');

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Désolé, une erreur s\'est produite. Veuillez réessayer.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <School className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Assistant École Fondamentale
              </h1>
              <p className="text-sm text-gray-600">
                Gestion complète de votre établissement belge
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                Actions rapides
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(action.prompt)}
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 text-left group"
                  >
                    <div className={`${action.color} p-2 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-blue-900">Info</h3>
                    <p className="text-xs text-blue-700 mt-1">
                      Cet assistant vous aide dans toutes les tâches de gestion administrative de votre école fondamentale.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 12rem)' }}>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-10 h-10 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Bienvenue dans votre assistant scolaire
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Posez-moi vos questions sur la gestion des élèves, enseignants, horaires, finances, et bien plus encore.
                    </p>
                  </div>
                ) : (
                  messages.map((message, idx) => (
                    <div
                      key={idx}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Posez votre question sur la gestion de l'école..."
                    className="flex-1 resize-none rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={1}
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={isLoading || !input.trim()}
                    className="bg-indigo-600 text-white rounded-lg px-6 py-3 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
