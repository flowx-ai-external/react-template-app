import React from 'react';
import { DetailLayout, BreadcrumbItem, ActionButton } from '../components/DetailLayout';
import Process from '../process.tsx'

const ProcessPage: React.FC = () => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Process' },
  ];

  const actions: ActionButton[] = [
    {
      label: 'Back',
      onClick: () => window.history.back(),
      variant: 'secondary',
    },
  ];

  return (
    <DetailLayout
      title="Process Renderer"
      subtitle="FlowX process execution and visualization"
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      <Process />
    </DetailLayout>
  );
};

export default ProcessPage;

