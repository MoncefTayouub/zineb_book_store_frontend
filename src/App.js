import logo from './logo.svg';
import './App.css';
import React , {useState , useEffect} from 'react'
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './pages/NavBar';
import Footer from './pages/Footer';
import DevBooks from './pages/DevBooks';
import BookDetails from './pages/BookDetails';
import ZinebPage from './pages/ZinebPage';
import FrenchCours from './pages/FrenchCours';
import Course from './pages/Course';
import VideoStage from './pages/VideoStage';
import CookieSetup from './pages/CookieSetup';
import axios from 'axios'
import Cookies from 'universal-cookie' ;
import jwt from 'jwt-decode' 
import UpPage from './compoments/UpPage';
import PlayListsPage from './pages/PlayListsPage';
import Admin from './pages/Admin';
import {useNavigate} from 'react-router-dom';
import Profile from './pages/Profile';
import TextArea from './compoments/TextArea';
import TextTest from './pages/TextTest';
import PageTemplate from './pages/PageTemplate';
import About_us from './pages/About_us';

function App() {
  const [supPage , setSupPage ] = useState(0)
  const [contact , setContact] = useState(false)
  const [content , setContent ] = useState()
  const [userLogin, setUserLogin] = useState(false)
  const [resp , setResp ] = useState()

  

  

  useEffect (()=> {
    const jwt = localStorage.getItem('jwt_auth')
    if (jwt == null ){
      setUserLogin(false)
      
    }else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
      axios.get('http://127.0.0.1:8000/authorization/')
      .then(response => {
        if (response.status == 200) {
          setUserLogin(true)
        }else {
          setUserLogin(false)
        }
      });
    }
    },[])
 
  useEffect(()=>{

    if (contact){
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
        window.scrollTo(0, 0);
    }else {
        document.getElementsByTagName('body')[0].style.overflow = 'auto'
        
    }
  },[contact])

  const [permission , setPermission ] = useState(false)
  const [setTest , setSetTest] = useState(true)

     //   -------------- Edited page handling ---------------
     const [edited_page_id , setEdited_page] = useState(null)



  return (
    <div className="App " >  
      {/* <div className='message'></div> */}
      <NavBar setUserLogin={setUserLogin} userLogin={userLogin} setContent={setContent} content={content}  setContact={setContact} contact={contact} setSupPage={setSupPage} supPage={supPage} permission={permission} setPermission={setPermission} resp={resp} setResp={setResp} />
      {(contact)? 
          <UpPage setUserLogin={setUserLogin} userLogin={userLogin} setContent={setContent} content={content}  setContact={setContact} contact={contact}  resp={resp} setResp={setResp}  />
        : ''
        }
      <BrowserRouter>
           <Routes>
                 <Route path="/" element={<Home setUserLogin={setUserLogin} userLogin={userLogin} setContent={setContent} content={content}  setContact={setContact} contact={contact} supPage={supPage} setSupPage={setSupPage}  />} />    
                 <Route path="/bockdetails/:id" element={<BookDetails setSupPage={setSupPage} />} />    
                 <Route path="/profile" element={<Profile setSupPage={setSupPage} setContent={setContent} content={content}  setContact={setContact} contact={contact} />} />    
                 <Route path="/book_category/:index" element={<DevBooks  setSupPage={setSupPage} />} />    
                 <Route path="/zinebpage/" element={<ZinebPage setSupPage={setSupPage} />} />    
                 <Route path="/frenchcours/" element={<FrenchCours setSupPage={setSupPage} />} />    
                 <Route path="/authetification/" element={<UpPage setUserLogin={setUserLogin} userLogin={userLogin} setContent={setContent} content={content}  setContact={setContact} contact={contact}  />} />    
                 <Route path="/frenchcours/course/:id" element={<Course setContent={setContent} content={content}  setContact={setContact} contact={contact} s userLogin={userLogin} setUserLogin={setUserLogin} setSupPage={setSupPage} />} />    
                 <Route path="/frenchcours/video/:id" element={<VideoStage setContent={setContent} content={content}  setContact={setContact} contact={contact} s userLogin={userLogin} setUserLogin={setUserLogin} setSupPage={setSupPage} />} />    
                 <Route path="/frenchcours/playlist/:id/" element={<PlayListsPage setContent={setContent} content={content}  setContact={setContact} contact={contact} s userLogin={userLogin} setUserLogin={setUserLogin} setSupPage={setSupPage}  />} />    
                 <Route path="/CookieSetup" element={<CookieSetup setSupPage={setSupPage} />} />    
                 <Route path="/elementpage" element={<Admin setSetTest={setSetTest} edited_page_id={edited_page_id}  setEdited_page = {setEdited_page}  />} />    
                 <Route path="/textarea" element={<TextArea setSetTest={setSetTest} edited_page_id={edited_page_id}  setEdited_page = {setEdited_page} />} />    
                 <Route path="/renderpage/:id" element={<PageTemplate setSetTest={setSetTest}  setContent={setContent} content={content}  setContact={setContact} contact={contact} />} />    
               
                 <Route path="/a_propos_de_nous" element={<About_us setSetTest={setSetTest}  />} />    
            </Routes>
      </BrowserRouter>
      <Footer setContent={setContent} content={content}  setContact={setContact} contact={contact} />
    </div >
  );
}
export default App;
