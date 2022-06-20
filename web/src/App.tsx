import { ToastProvider } from 'react-toast-notifications';
import Layout from "./Shared/Components/Layout";


declare global {
  interface Window { electron: any; }
}

function App() {
  return (
    <ToastProvider>
            <Layout />
    </ToastProvider>
  );
}

export default App;
