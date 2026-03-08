import { Suspense } from 'react';
import App from '@/components/App';

export default function Home() {
  return (
    <Suspense>
      <App />
    </Suspense>
  );
}
