import './App.css';
import Todo from './Todo';
import {
  Router,
  Routes,
  Route
} from 'react-router-dom';
import Welcome from './Welcome';
import SplashScreen from './SplashScreen';
function App() {
    return (
    <div className="App">
        <Routes>
          <Route path="/" element={<SplashScreen/>}/>
          <Route path="/welcome" element={<Welcome/>}/>
          <Route path="/mainPage" element={<Todo/>}/>
        </Routes>
    </div>
  );
}

export default App;
