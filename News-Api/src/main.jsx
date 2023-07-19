import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { LayoutProvider} from './LayoutContext.jsx';
import { ThemeProvider } from './ThemeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
      <ThemeProvider>
        <LayoutProvider>
    <App />
    </LayoutProvider>
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
