// app/page.tsx - Updated to use new layout
import { AppLayout } from '@/components/AppLayout';
import { ChatInterface } from '@/components/ChatInterface';

export default function Home() {
  return (
    <AppLayout>
      <ChatInterface />
    </AppLayout>
  );
}
