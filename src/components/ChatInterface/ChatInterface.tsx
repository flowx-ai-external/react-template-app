import React, { useState } from 'react';
import './ChatInterface.scss';

interface PromptSuggestion {
  text: string;
  onClick?: () => void;
}

interface ChatInterfaceProps {
  className?: string;
  onSendMessage?: (message: string) => void;
  promptSuggestions?: PromptSuggestion[];
}

const defaultPromptSuggestions: PromptSuggestion[] = [
  { text: 'give me a list of all submissions' },
  { text: 'give me submissions having the status open' },
  { text: 'give me submissions where the priority is high' },
  { text: 'give me submissions having a win % > 60' },
];

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  className = '',
  onSendMessage,
  promptSuggestions = defaultPromptSuggestions,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handlePromptClick = (prompt: PromptSuggestion) => {
    if (prompt.onClick) {
      prompt.onClick();
    } else {
      setInputValue(prompt.text);
    }
  };

  return (
    <div className={`chat-interface ${className}`}>
      {/* Welcome Section */}
      <div className="chat-interface__welcome">
        <div className="chat-interface__avatar">
          <div className="chat-interface__avatar-inner">
            <div className="chat-interface__avatar-circle"></div>
          </div>
        </div>
        <h2 className="chat-interface__welcome-title">Welcome to Sugoi AI</h2>
        <p className="chat-interface__welcome-subtitle">Ask me anything - I'm here to help!</p>
      </div>

      {/* Input Section */}
      <div className="chat-interface__input-container">
        <form onSubmit={handleSubmit} className="chat-interface__form">
          <div className="chat-interface__input-wrapper">
            <svg
              className="chat-interface__input-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              className="chat-interface__input"
              placeholder="Ask anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="chat-interface__input-actions">
              <button
                type="button"
                className="chat-interface__attach-btn"
                aria-label="Attach file"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="chat-interface__voice-btn"
                aria-label="Voice input"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="submit"
                className="chat-interface__send-btn"
                disabled={!inputValue.trim()}
                aria-label="Send message"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Recommended Prompts */}
      {promptSuggestions.length > 0 && (
        <div className="chat-interface__prompts">
          <h3 className="chat-interface__prompts-title">Recommended prompts</h3>
          <div className="chat-interface__prompts-list">
            {promptSuggestions.map((prompt, index) => (
              <button
                key={index}
                className="chat-interface__prompt-chip"
                onClick={() => handlePromptClick(prompt)}
              >
                {prompt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="chat-interface__footer">
        <button className="chat-interface__footer-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>Sugoi App Store</span>
        </button>
        <button className="chat-interface__footer-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 11H3v10h6V11zM15 3h-6v18h6V3zM21 8h-6v13h6V8z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Risk Assessment</span>
        </button>
      </div>
    </div>
  );
};
