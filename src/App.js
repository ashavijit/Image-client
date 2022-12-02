import {useState,useEffect} from 'react';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from './components/Home';
import DashBoard from './components/DashBoard';
import NavBar from './components/NavBar';
import MyAccount from './components/MyAccount';

function App() {
  const [user,setUser] = useState(null);
  console.log(process.env.REACT_APP_SERVER_URL+"/auth/login/success")
  const getUser = async ()=>{
    try{
      const url = process.env.REACT_APP_SERVER_URL+"/auth/login/success";
      const data = await axios.get(url,
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
          },
          withCredentials: true
        }
      );
      setUser(data.data.user)
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getUser();
  },[])
  // console.log(user)
  return (
    <div className="App">
      <Router>
        <NavBar user={user}/>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/signin" element={user ? <Navigate to="/dashboard" />:<SignIn />}/>
          <Route exact path="/signup" element={user ? <Navigate to="/dashboard" />:<SignUp />}/>
          <Route exact path="/myaccount" element={user ? <MyAccount user={user}/>:<Navigate to="/signin" />}/>
          <Route exact path="/dashboard" element={user ? <DashBoard />:<Navigate to="/signin" />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
