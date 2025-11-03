import React from 'react';
import './DiscoverPanel.scss';

interface DiscoverPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const recommendedPrompts = [
  'give me a list of all submissions',
  'Go / No-go + why',
  'Coverage gap check',
  'Generate a broker follow-ups',
  'Summarize exposures + top 5 unknowns',
  'give me submissions having the status open',
  'give me submissions where the priority is high',
  'give me submissions having a win % > 60',
];

export const DiscoverPanel: React.FC<DiscoverPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="discover-panel">
      <div className="discover-panel__header">
        <h2 className="discover-panel__title">Discover</h2>
        <button className="discover-panel__close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="discover-panel__content">
        <h3 className="discover-panel__subtitle">Recommended prompts</h3>
        <div className="discover-panel__prompts">
          {recommendedPrompts.map((prompt, index) => (
            <button key={index} className="discover-panel__prompt-item">
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
