import React from 'react';
import { MainLayout } from '../components/MainLayout';
import { ChatInterface } from '../components/ChatInterface';

const HomePage: React.FC = () => {
  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
    // TODO: Implement actual message handling when backend is ready
  };

  return (
    <MainLayout>
      <ChatInterface onSendMessage={handleSendMessage} />
    </MainLayout>
  );
};

export default HomePage;
