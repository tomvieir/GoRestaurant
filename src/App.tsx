import { BrowserRouter as Router } from 'react-router-dom';
import { HandlersContextProvider } from './Context/HandlersContext';

import Routes from './routes';

import GlobalStyle from './styles/global';

export function App() {
  return (
    <HandlersContextProvider>
      <GlobalStyle />
      <Router>
        <Routes />
      </Router>
    </HandlersContextProvider>
  )
  
}

