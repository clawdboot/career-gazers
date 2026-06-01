import React, { useState, useEffect, useRef } from 'react';
import { BotMessage, getSaarthiResponse } from '../data/mockData';

interface SaarthiGPTProps {
  isOpen: boolean;
  onClose: () => void;
  setView: (view: string) => void;
  onSelectCollege: (collegeId: string) => void;
}

export const SaarthiGPT: React.FC<SaarthiGPTProps> = ({ isOpen, onClose, setView, onSelectCollege }) => {
  const [messages, setMessages] = useState<BotMessage[]>([
    {
      text: "Hello! I am **SaarthiGPT**, your personal AI Career Counselor at Career Gazers. I can help you find your dream college, predict admissions based on your scores, recommend entrance exams, or assist with your Common Application Form (CAF). \n\nWhat would you like to explore today?",
      isBot: true,
      options: ['Explore Colleges', 'Predict Admissions', 'Apply to Colleges (CAF)', 'Take Career Compass Quiz']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const newUserMessage: BotMessage = { text, isBot: false };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate smart bot response timeout
    setTimeout(() => {
      setIsTyping(false);
      const response = getSaarthiResponse(text);
      setMessages(prev => [...prev, { text: response.reply, isBot: true, options: response.options }]);
    }, 1000);
  };

  const handleOptionClick = (option: string) => {
    // Check if the option should trigger an action in the parent
    if (option === 'Explore Colleges' || option === 'Search Engineering Colleges' || option === 'Search MBA Colleges' || option === 'Search Medical Colleges' || option === 'Search Law Colleges' || option === 'Search and Filter by Fees') {
      setView('directory');
      onClose();
    } else if (option === 'Predict Admissions' || option === 'Open College Predictor' || option === 'Predict College Admissions') {
      setView('predictor');
      onClose();
    } else if (option === 'Apply to Colleges (CAF)' || option === 'Fill Common Application (CAF)' || option === 'Go to CAF Portal' || option === 'Common Application Form') {
      setView('caf');
      onClose();
    } else if (option === 'Take Career Compass Quiz' || option === 'Take Career Compass Test') {
      setView('compass');
      onClose();
    } else if (option === 'Track Existing Applications') {
      setView('dashboard');
      onClose();
    } else if (option === 'Read FMS Delhi Details') {
      onSelectCollege('fms-delhi');
      onClose();
    } else {
      handleSendMessage(option);
    }
  };

  const renderMarkdown = (text: string) => {
    // Simple helper to replace bold markdown
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      // handle newlines
      if (part.includes('\n')) {
        return part.split('\n').map((line, lIdx) => (
          <React.Fragment key={`${index}-${lIdx}`}>
            {line}
            {lIdx < part.split('\n').length - 1 && <br />}
          </React.Fragment>
        ));
      }
      return part;
    });
  };

  return (
    <div className="saarthi-drawer-backdrop animate-fadeIn">
      <div className="saarthi-drawer animate-slideLeft">
        {/* Drawer Header */}
        <div className="saarthi-drawer-header">
          <div className="saarthi-header-title">
            <span className="live-glow-dot"></span>
            <div>
              <h3>SaarthiGPT AI</h3>
              <p>Online Career Guidance</p>
            </div>
          </div>
          <button className="close-drawer-btn" onClick={onClose}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Chat Streams */}
        <div className="saarthi-chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message-wrapper ${msg.isBot ? 'bot' : 'user'}`}>
              {msg.isBot && (
                <div className="bot-avatar">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
              )}
              <div className="chat-bubble">
                <div className="bubble-text">{renderMarkdown(msg.text)}</div>
                
                {/* Options / Pill selection */}
                {msg.isBot && msg.options && msg.options.length > 0 && (
                  <div className="message-options">
                    {msg.options.map((opt, optIndex) => (
                      <button
                        key={optIndex}
                        className="option-pill-btn"
                        onClick={() => handleOptionClick(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="chat-message-wrapper bot">
              <div className="bot-avatar">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
                </svg>
              </div>
              <div className="chat-bubble typing-bubble">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Drawer Chat Input */}
        <form
          className="saarthi-chat-footer"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
        >
          <input
            type="text"
            placeholder="Ask me anything (e.g. best MBA colleges, JEE main dates...)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
          />
          <button type="submit" disabled={!inputValue.trim() || isTyping}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};
