import { ReactNode } from 'react';

export default function ResearchLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {children}
      </div>
    </div>
  );
}
