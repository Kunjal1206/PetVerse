import React, { useState, useRef, useEffect } from 'react';
import { queryAiAssistant } from '../../services/aiService';
import Button from '../../components/common/Button';
import { Bot, User, Send, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

const AssistantPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! 🐾 I am your full-time PetVerse AI Assistant. I can help answer pet health nutrition questions, training tips, socialization techniques, or guide you through adoption preparation."
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    'What human foods are toxic to dogs and cats?',
    'How do I introduce a newly adopted rescue dog to my home?',
    'What core vaccinations are required in India for puppies?',
    'Tips to calm a cat during Diwali or thunder storms'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (customText) => {
    const text = customText || inputText;
    if (!text.trim() || loading) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const history = messages.map(m => ({ sender: m.sender, text: m.text }));
      const res = await queryAiAssistant(text, history);
      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: res.text || 'I am here to support you with pet care information!'
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('AI chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'I am experiencing a temporary connection hiccup, but feel free to check our Pet Care Services or consult a vet!'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="pb-4 border-b border-cream-300">
        <div className="flex items-center gap-2">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal-900">
            PetVerse AI Assistant
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
            24/7 Guidance
          </span>
        </div>
        <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
          Ask questions about pet nutrition, behavioral tips, and preventative wellness.
        </p>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white rounded-3xl border border-cream-300 shadow-premium flex flex-col h-[600px] overflow-hidden">
        
        {/* Disclaimer Header */}
        <div className="p-3 bg-amber-50 border-b border-amber-200/70 flex items-center gap-2 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Medical Disclaimer:</strong> PetVerse Assistant provides general educational information and is not a substitute for professional veterinary diagnosis.
          </span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-cream-50/40">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-brand-accent text-white'
                    : 'bg-brand-500 text-white'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-3xl p-4 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-brand-500 text-white rounded-tr-xs'
                    : 'bg-white border border-cream-300 text-charcoal-800 rounded-tl-xs shadow-xs'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-charcoal-500 pl-3">
              <RefreshCw className="w-4 h-4 animate-spin text-brand-500" />
              <span>PetVerse Assistant is compiling guidance...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="p-3 bg-white border-t border-cream-200 flex gap-2 overflow-x-auto scrollbar-hide">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-xs whitespace-nowrap bg-cream-100 hover:bg-brand-50 hover:text-brand-800 text-charcoal-700 font-medium px-3 py-1.5 rounded-full border border-cream-300 transition-colors shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-4 bg-white border-t border-cream-200 flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="Type your pet care question here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-cream-50 border border-cream-300 rounded-2xl px-4 py-3 text-xs sm:text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-brand-500"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!inputText.trim() || loading}
            icon={Send}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AssistantPage;
