import { DataProvider } from './GlobalState'
import NavBar from "./Components/NavBar";
import MainPages from './Components/MainPage'
import { BrowserRouter as Router } from 'react-router-dom'



function App() {
  return (
    <DataProvider>
      <Router>
        <NavBar />
        <div className="App">
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
