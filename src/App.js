import './App.css';
import Notes from "./pages/Notes"
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Note from './pages/Note';

function App() {
  return (
    <Router>
      <div className="container dark">
        <Routes>
          {/* <Route path="/" element= {<Header/>} /> */}
          <Route exact path="/" element= {<Notes/>} />
          <Route path="/note/:id" element={ <Note />} />
          {/* <Notes/> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;