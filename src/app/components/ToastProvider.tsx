import { Toaster } from 'sonner';

interface ToastProviderProps {
  darkMode?: boolean;
}

export function ToastProvider({ darkMode = true }: ToastProviderProps) {
  return (
    <Toaster
      position="top-center"
      theme={darkMode ? 'dark' : 'light'}
      toastOptions={{
        style: darkMode ? {
          background: 'rgba(10, 10, 15, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#ffffff',
        } : {
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          border: '1px solid #e5e7eb',
          color: '#0f172a',
        },
        duration: 3000,
      }}
      richColors
    />
  );
}
