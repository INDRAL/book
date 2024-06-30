
import './App.css';
import {BrowserRouter,
  Routes,
  Route  ,Navigate} from "react-router-dom";
import Login from './login'
import Home from './Home';
import MyBookshelf from './MyBookshelf';
import Signup from './Signup';
import Axios from "axios";

Axios.defaults.baseURL = "http://ec2-54-80-124-46.compute-1.amazonaws.com:8188/";
function App() {
  
    return (
    <BrowserRouter>
    <div className="wrapper">
    <Routes>
    <Route path= "/Home" element={<Home />}/> 
    <Route path="/Mybookshelf" element={<MyBookshelf />} />
     
    <Route path="/Login" element={<Login />} />
    <Route path="/" element={<Navigate replace to="/Home" />} />
    <Route path="/Signup" element={<Signup/>} />
    </Routes>
    </div>
    </BrowserRouter>
   );
 }
 


export default App;
