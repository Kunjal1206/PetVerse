import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { queryAiAssistant } from '../../services/aiService';

const AiAssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hi there! 🐾 I am your PetVerse Care Assistant. Ask me anything about pet care tips, training guidelines, food nutrition, or finding the right adoption match!"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    'How do I adopt a pet on PetVerse?',
    'What should I feed my kitten?',
    'Tips for potty training a puppy',
    'How do I know if my pet is sick?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const message = textToSend || inputText;
    if (!message.trim() || loading) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: message.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      // Build history
      const history = messages.map((m) => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await queryAiAssistant(message, history);
      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: res.text || "I am here to help you with pet care questions!"
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('AI query error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: "I am having trouble connecting right now, but feel free to browse our Pet Care Services or consult a verified vet clinic on the Nearby Services page!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Bubble */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-full shadow-2xl border-2 border-brand-accent transition-all group"
          aria-label="Open AI Pet Assistant"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white animate-spin-slow" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold leading-tight">AI Pet Assistant</p>
            <p className="text-[10px] text-brand-200">Ask pet questions</p>
          </div>
        </motion.button>
      )}

      {/* Expandable Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="w-[90vw] sm:w-96 h-[540px] bg-white rounded-3xl shadow-2xl border border-cream-300 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-brand-600 to-brand-500 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-white/15 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm leading-tight">
                    PetVerse Assistant
                  </h3>
                  <p className="text-[10px] text-brand-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    AI Care & Guidance
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Disclaimer Bar */}
            <div className="px-3 py-1.5 bg-amber-50 border-b border-amber-200/60 flex items-center gap-1.5 text-[10px] text-amber-800">
              <AlertCircle className="w-3 h-3 text-amber-600 shrink-0" />
              <span>For general guidance. Not a replacement for a veterinarian.</span>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-cream-50/50 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-2 ${
                    m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      m.sender === 'user'
                        ? 'bg-brand-accent text-white'
                        : 'bg-brand-500 text-white'
                    }`}
                  >
                    {m.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  </div>

                  <div
                    className={`max-w-[80%] rounded-2xl p-3 leading-relaxed ${
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
                <div className="flex items-center gap-2 text-charcoal-400 text-xs pl-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-500" />
                  <span>PetVerse Assistant is thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompt Chips */}
            {messages.length < 3 && (
              <div className="px-3 py-2 bg-white border-t border-cream-200 flex gap-1.5 overflow-x-auto scrollbar-hide">
                {suggestedPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p)}
                    className="whitespace-nowrap text-[11px] font-medium bg-cream-100 hover:bg-brand-50 text-charcoal-700 hover:text-brand-800 border border-cream-300 rounded-full px-2.5 py-1 transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-cream-200 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask a pet care question..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2 text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-brand-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || loading}
                className="p-2 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white shadow-xs transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AiAssistantWidget;
