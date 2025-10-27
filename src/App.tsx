import { RouterProvider } from 'react-router-dom';
import './App.css'
import router from './route';
import { LocalizationProvider } from './contexts/LocalizationContext';

function App() {

 return (
    <LocalizationProvider>
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
}

export default App