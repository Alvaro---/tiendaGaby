import { DataProvider } from './GlobalState'
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import MainPages from './Components/MainPage'
import { BrowserRouter as Router } from 'react-router-dom'



function App() {
  return (
    <DataProvider>
      <Router>
        <NavBar />
        <MainPages />
        <Footer />
      </Router>
    </DataProvider>
  );
}

export default App;
