import React , {useState , useEffect,useRef} from 'react'
import logo from '../icons/logo.svg'
import { NavLink } from 'react-router-dom';
import profile from '../icons/profile.svg'
import favourite from '../icons/favourite.svg'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import drop_full_down from '../icons/drop_full_down.svg'


function NavBar({userLogin , setUserLogin ,supPage , setSupPage , content , setContent ,contact , setContact , resp , setResp }) {
  
  const [drop , setdrop] = useState(false)
  const [permissionSet , SetPermissionSet] = useState(false)
  const [data , setData] = useState()
  const signOut =()=> {
    localStorage.removeItem('jwt_auth')
    setUserLogin(false)
    setdrop(false)
}

const handelPub = ()=> {
  setdrop(false)

  if (data) {
   
      if (data['profile']== false) {
        setContact(true)
        setContent('profile')
        setdrop(false)
      }else {  
    
        if (data['permission']==false){
          setContact(true)
          setContent('ask_permission')
          setdrop(false)
        }else {
          setResp(data['data'])
          setContent('waiting')
          setContact(true)
    
        }
      }

    
  }
}


//---------------- make  page_index_livrary stick to the top page --------------
const [isSticky, setIsSticky] = useState(false);
  const menuRef = useRef(null);
  const navBar = useRef(null) ;

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
      if (navBar.current.clientHeight <= currentPosition) {
        setIsSticky(true)
      }else {
        setIsSticky(false)
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [geenralData , set_generat_data] = useState()
  const [drop_list_index , set_drop_list_index] = useState(false)
  useEffect(()=>{
      getData();
    },[])    
    let getData = async () => {

      let respons = await fetch ('http://moncefwitcher.pythonanywhere.com/general/pages_indexing')
      let output = await respons.json()
      set_generat_data(output)
    }

    const handel_set_drop_list_index = (index)=> {
        if (index == drop_list_index) {
          set_drop_list_index(false)
        }else {
          set_drop_list_index(index)

        }
    }

    // ------------ redirect to another page ---------------
    
    const redirect = (location,index)=> {
      if (location == -1 ) {
        window.location.href = `book_category/${index}`;
      }
      if (location == 1 ) {

        window.location.href = `renderpage/${index}`;
      }

      if (location == 2 ) {

        window.location.href = `a_propos_de_nous`;
      }
      
    }


    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      // Cleanup function to remove the event listener
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);


    
    // -----------------------------------
    const respo = ()=> {
      const jwt = localStorage.getItem('jwt_auth')
      if (jwt == null) {
        if (windowWidth > 790) {
          return true
        }else {
          return false
        }
      }else {
        if (windowWidth >620) {
          return true 
        }else {
          return false
        }
      }
    }

    return (
    <div className=''>
      <div className='NavBar spacebetween' ref={navBar}>

          <a href={'/' }>
              <img src={logo} />
          </a>



          <div className='center contactUs'>
             {
              respo() ?
              <>
                  <p onClick={()=>redirect(2,false)} className='text_color' >A propos de nous</p>
                  <p onClick={()=>{setContact(true);setContent('contact')}} className='text_color'  >Contacter nous</p>
                </>
               : ''
             }
          </div>
          
            {
              (userLogin) ?
                <div className='profile center'>
                  <img src={profile} onClick={()=>setdrop(!drop)} />
                  {
                    (drop) ? 
                    
                    <div className='droped center'>
                      
                      <p className='h3' onClick={()=>{signOut();}}>Déconnecter</p>
                      {
                        respo() ? 
                        <>
                           <p className='h3' onClick={()=>{redirect(2,false);}}>A propos de nous</p>
                           <p className='h3' onClick={()=>{setContact(true);setContent('contact');}}>Contacter nous</p>
                        </>
                        : ''
                      }
                   
                    </div>
                    : ""
                  }
                </div>
              
              :
              <div>
                <button className='sign' onClick={()=>{setContact(true);setContent('sign')}} >S'inscrire</button>
                <button className='log' onClick={()=>{setContact(true);setContent('log')}}>log in</button>
              </div> 
            }
      </div>
      <div ref={menuRef} className={isSticky ? 'page_index_livrary sticky center' : 'page_index_livrary center'}>
            <div className='frame center'>
              <p className={(drop_list_index == -1) ? 'text_color' : ''} onClick={()=>handel_set_drop_list_index(-1)}>livres</p>
              <img className={(drop_list_index == -1) ? 'flipv' : ''} onClick={()=>handel_set_drop_list_index(-1)} src={drop_full_down} />
              {
                (drop_list_index == -1) ?
                  <div className='drop_for_frame' >
                    {
                      geenralData?.['books'].map((ob,i)=>  
                      <li onClick={()=>redirect(-1,ob['id'])} key={i}>{ob['title']}</li>
                      )
                    }
                  </div>
                :''
              }
            </div>
            {
              geenralData?.['pages'].map((os,s)=>
                <div className='frame center' key={s}>
                  <p className={(drop_list_index == s+1) ? 'text_color' : ''} onClick={()=>handel_set_drop_list_index(s+1)}>{os['category']}</p>
                  <img className={(drop_list_index == s+1) ? 'flipv' : ''} src={drop_full_down} />
                  {
                    (drop_list_index == s+1) ?
                      <div className='drop_for_frame'>
                        {
                          os['pages'].map((om,m)=>
                            <li onClick={()=>redirect(1,om['id'])} key={m}>{om['name']}</li>
                          )
                        }
                      </div>
                    :''
                  }
                </div>
              
              )
            }
      </div>
    </div>
  )
}

export default NavBar    


