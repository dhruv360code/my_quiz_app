import './index.css';
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './Routes'


const App = () => (
  <Router>
    <AppRoutes/>  
  </Router>
)

export default App
