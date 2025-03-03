
import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheam } from './theam/DarkTheam';
import HomePage from './customer/pages/HomePage/HomePage';
import Routers from './routers/Routers';

function App() {
  return (
    <ThemeProvider theme={darkTheam}> 
    <CssBaseline/>
      
      <Routers/>

    </ThemeProvider>
    
  );
}

export default App;
