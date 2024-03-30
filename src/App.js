import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Dashboard from "./components/dashboard";
import Adminstart from "./components/adminstart";
import CreateFeed from "./components/createfeeds";
import Managefeeds from './components/managefeed';
import Recordsstate from './contextstate';
import Viewpage from "./components/viewpage";
import Editpage from "./components/editpage";
import Performance from './components/showperformance';

function App() {
  
    
  return (
    <>
    <Recordsstate>
      <Router> 

        <Routes>

          <Route exact path='/' element={<Adminstart/>}></Route>

          <Route exact path='/dashboard' element={<Dashboard/>}></Route>

          <Route exact path='/viewpage/:id' element={<Viewpage/>}></Route>
             
          <Route exact path='/createfeed' element={<CreateFeed/>}></Route>

          <Route exact path='/managefeed' element={<Managefeeds/>}></Route>

          <Route exact path='/editpage/:id' element={<Editpage/>}></Route>

          <Route exact path='/performance' element={<Performance/>}></Route>

        </Routes>
      </Router>

    </Recordsstate>
    
    </>
  );
}

export default App;
