import './index.css';
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './Routes'
import QuizProvider from './context';


const App = () => (
  <Router>
    <QuizProvider>
    <AppRoutes/> 
  </QuizProvider> 
  </Router>
)

export default App
