import RootRouter from './AppRouter';
import { AuthContextProvider } from './context/AuthContext';
import './index.css';

function App() {
  return (
    <AuthContextProvider>
      <RootRouter />
    </AuthContextProvider>
  );
}

export default App;
