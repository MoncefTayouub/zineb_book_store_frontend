import React , {useState,useEffect , useRef} from 'react'
import { Routes, Route, useParams } from 'react-router-dom';
import VideoPlayer from '../compoments/VideoPlayer';
import VideoButtons from '../compoments/VideoButtons';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import meduimSeeMore from '../icons/meduimSeeMore.png'
import favourite from '../icons/favourite.svg'
import changeDir from '../icons/changeDir.svg'
import CoursesCategory from '../compoments/CoursesCategory'



function VideoStage({content , setContent ,contact , setContact ,userLogin, setUserLogin,setSupPage}) {
  const navigate = useNavigate();
  const slideDiv = useRef(null)

  const [if_log , setIf_log] = useState(false)
  const videoRef = useRef(null)
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
    }
  },[if_log])
  
  const navig =(id)=> {
    navigate(`/frenchcours/video/${id}`)
    window.location.reload(true)
  }


  let param = useParams();
  const [data , setDate] = useState()
  const [video , setVideo] = useState(false)
  const [PLVideos,setPLVideos] = useState()
      useEffect(()=>{
          getData();

        },[])    
        let getData = async () => {
          const jwt = localStorage.getItem('jwt_auth')
          axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
          axios.get(`http://127.0.0.1:8000/FrenchCourses/videos/${param.id}`)
          .then(response => {
            setDate(response.data)
            
            setVideo(response.data['currVideo'])

          });


        }
   console.log(data)
   const [location , setLocation] = useState(0)
   const slid = (mult)=>{
    if ((location +(mult *370)) <=0 && (location +((mult+0.3) *370)) > -(slideDiv.current.clientWidth-(3*370)) ) {
        setLocation(location +(mult *370))
        slideDiv.current.style.left = (location +(mult *370))+'px'
    }
    
}
     
  return (
    <div className='VideoStage'>
        {
          (data != undefined)?
            <div>
              {
                (video ?
                  <div>
                    <VideoPlayer url={'http://127.0.0.1:8000/'+video['video']['video'][0]['video']} V_id = {video['video']['video'][0]['id']} prog = {video['progress']} />
                    <div className='desc'>
                      <h3>{video['video']['video'][0]['name']}</h3>
                      <p>
                          {video['video']['video'][0]['description']}
                      </p>
                      <div className='spacebetween'>
                      <div className='profile center'>
                        <div className='picture center'>
                            <img src={'http://127.0.0.1:8000/'+video['video']['owner']['picture']} />
                        </div>
                        <div className='details'>
                              <h4>{video['video']['owner']['name']}</h4>
                              <p>{video['video']['owner']['video_nb']} video <span> | </span>{video['video']['owner']['number_of_playlist']} playlists </p>
                        </div>
                      </div>
                      <div className=''></div>
                    </div>
                  </div>
                  </div>

                  :'')
              }
              {
                data['videos'].map((ob,i)=>
               
                
              <div key={i} className='video_layer center'>
                {
                  (data['id'] == ob['video'][0]['id']) ?
                  <div className='hovering center' > Entrain de lecture </div>

                  :
                  ''
                }
                <video 
                src = {'http://127.0.0.1:8000/'+ob['video'][0]['video']}
                onClick={()=>navig(ob['video'][0]['id'])}
                />
                <div className='furtherDetials'>
                  <h2>{ob['video'][0]['name']} </h2>
                  <p>
                  {ob['video'][0]['description']}
                  </p>
                  <div className='spacebetween'>
                    <div className='box center'>
                        <div className='pic center'>
                          <img src={"http://127.0.0.1:8000/"+ob['owner']['picture']}/>   
                        </div>
                        <p>{ob['owner']['name']}</p>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>   
                )
              }
              <h5>Trouvez votre prochaine playlist préférée sur notre site</h5>
              {
                data['otherPlaysites'].map((ob,i)=> 
                  <div className='contaier center' key={i}>
                    <div className='otherPL'>
                      <div className='pic'>
                        <img src={'http://127.0.0.1:8000/'+ob['PL_cover']} />
                        <p className='center' onClick={()=>navigate('/frenchcours/playlist/'+ob['PL_ID'])}>PLAYLIST</p>
                      </div>
                      <div className='autheur center'>
                        <div className='auth_pic center'>
                          <img src={'http://127.0.0.1:8000/'+ob['owner_pic']} />  
                        </div>  
                          <p>{ob['ownerName']}</p>
                      </div>
                      <div className='content'>
                        <h3> {ob['PL_name']} </h3>
                        <p>{ob['PL_desc']}</p>
                      </div>
                      <div className='butns spacebetween'>
                        <img src={favourite}  />
                        <img src={meduimSeeMore} onClick={()=>navigate('/frenchcours/playlist/'+ob['PL_ID'])} />
                      </div>
                    </div>
                  </div>
                )
              }
                <div className='categories'>
                  <div className='changoDir center'>
                      <img src={changeDir} onClick={()=>slid(-1)} />
                  </div>
                  <div className=' center'>
            
                          <div className='cat center container' ref={slideDiv} >
                              {data['categry'].map((ob,i) =>
                                    <CoursesCategory key={i} ob={ob} /> 
                              )}
                              
                          </div>
                      
                  </div>
                  <div className='changL center'>
                          <img className='flipH' src={changeDir} onClick={()=>slid(1)}  />
                  </div>
              </div>
              </div>
          : ''
        }
    </div>
  )
}

export default VideoStage