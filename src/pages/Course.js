import React , {useState , useEffect} from 'react'
import CoursesCategory from '../compoments/CoursesCategory'
import PlayList from '../compoments/PlayList'
import changeDir from '../icons/changeDir.svg'
import { Routes, Route, useParams } from 'react-router-dom';
import headerCategory from '../icons/headerCategory.png'
import seeMore from '../icons/seeMore.svg'   
import VideoButtons from '../compoments/VideoButtons';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
function Course({content , setContent ,contact , setContact ,userLogin, setUserLogin,setSupPage}) {
    let param = useParams();
    const navigate = useNavigate();
    const [if_log , setIf_log] = useState(false)
    useEffect (()=>{
        setSupPage(3)
        const jwt = localStorage.getItem('jwt_auth')
        if (jwt == null ) {
            setContact(true)
            setContent('log')  
            setIf_log(true)
        }
     
       
       
      },[])

      useEffect (()=> {
        if ( if_log == true && contact == false &&   localStorage.getItem('jwt_auth') == null ) {
            navigate('/frenchcours/');
            setIf_log(false)
            console.log('navigate')
        }
      },[if_log])
 


      const changePath =(id)=>{
        
        navigate('/frenchcours/playlist/'+id+'/');
        window.location.reload(false);
       
    }


      const [curCat , SetcurCat] = useState([])
      const [data , setDate] = useState()
  
      useEffect(()=>{
          getData();
        },[])    
        let getData = async () => {
  
          let respons = await fetch (`http://127.0.0.1:8000/FrenchCourses/category/${param.id}`)
          let data = await respons.json()
          setDate(data)
          SetcurCat(data['currCategoru'][0])
        }
  return (
    <div className='Course '>
        {
        (data != undefined) ? 
            <div>
                <div className='headCate header center'>
                    <img className="headCate_img" src={headerCategory} />
                    
                    <h3>{curCat['name']}</h3>
                    <h3 className='desc'>{curCat['desc']}</h3>
                    
                </div>
                {
                    data['playLists'].map((ob,i)=>
                    
                <div className='playListDetails' key={i} >
                    <div className='stage spacebetween'>
                        {
                            ob['videos'].map((oc,j)=>
                            <VideoButtons ob={oc} key={j} />
                            )
                        }
                    </div>
                    <div className='details'>
                        <div className='spacebetween'>
                            <h4>{ob['PL']['name']}</h4>
                            <div className='seeMore_btn center ' onClick={()=>changePath(ob['PL']['id'])}>
                                <p>voir tous  </p>
                                <img src={seeMore}  />
                             </div>
                        </div>
                        <p className='Desc_text'>
                            {ob['PL']['desc']}
                        </p>
                    </div>
                </div>
                    )
                }
            </div>   
            : ''
        }
    </div>
  )
}

export default Course