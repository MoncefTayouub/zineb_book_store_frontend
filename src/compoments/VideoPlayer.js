import React, { useRef, useEffect , useState , useLayoutEffect } from 'react';
import sound from '../icons/sound.svg'
import fullScreen from '../icons/fullScreen.svg'
import exitFullScreen from '../icons/exitFullScreen.svg'
import back5 from '../icons/back5.svg'
import prev from '../icons/prev.svg'
import play_video from '../icons/play_video.svg'
import next from '../icons/next.svg'
import next5 from '../icons/next5.svg'
import pause from '../icons/pause.svg'
import axios from 'axios';

function VideoPlayer({url , V_id,prog}) {
 

  const videoRef = useRef(null);

  

  const [size , setSize ] = useState(window.innerWidth)
  useEffect ( ()=> {
    const HandleSize = () => {
      setSize(window.innerWidth)
    }
    window.addEventListener('resize' , HandleSize);


  }, [])
  
  const [plausBool , setPlausBool] = useState(false) 
  const [fullScreenBool , SetFullScreenBool] = useState(false)
  const [totalDuration , setTotalDuration ] = useState(0)
  const [ currTiming , setCurrTiming ] = useState(0)
  const [soundHover , setSoundHover] = useState(false)
  const [videoHover , setVideoHover ] = useState(false)

 
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setTotalDuration(video.duration)
  };

 
  let intervalId ;

  useEffect(() => {
    function updateCurrentTime() {
    
      setCurrTiming(videoRef.current.currentTime)
    }
    if (plausBool){

       intervalId = setInterval(updateCurrentTime, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [plausBool]);

 

  const fixTiming = (seconds)=>{

    let min , calc , sec ,Csesc = 0  
    
    if (seconds >= 60){
      calc = seconds / 60 
      Csesc = calc % 1 
      min = calc - Csesc  
      sec = (seconds % 60 ).toFixed(0)
     
    }else {
        min = '0'
        sec = seconds.toFixed(0)
    }

    return min + ' : ' + sec
  }




  const setHistoryVideo = async ()=> {
    if (plausBool){

      const jwt = localStorage.getItem('jwt_auth')
        const DataForm= new FormData();
        DataForm.append('user' , jwt)
        DataForm.append('V_id' , V_id)
        DataForm.append('prog' , currTiming)
        // await axios ({
        //     method : 'post' , 
        //     url : 'http://127.0.0.1:8000/setvideohistory/' ,
        //     data : DataForm
        // })
        // .then((response)=>{
        //     console.log (response.data)
        // }) .catch(function (error) {
        //     console.log(error)
        //   });
    }
  }
// ----------------- play / pause ----------------------

useEffect(()=> {
  if (plausBool) {
  videoRef.current.play()
  }else {
      videoRef.current.pause()
      
  }
} , [plausBool] )
  
 
// ------------------- sound controler ----------------------
const [hover , setHover] = useState(false )
  const l_ref = useRef(null)
  const O_ref = useRef(null)
  const bar_ref = useRef(null)
  const [clientx , setClientx] = useState(0)
  const [ifClicked, setIfClicked] = useState(false)

  

  useEffect (()=> {
    if (ifClicked) {
      O_ref.current.style.left = (clientx-l_ref.current.getBoundingClientRect().left)+'px'
      bar_ref.current.style.width = ((clientx-l_ref.current.getBoundingClientRect().left )/l_ref.current.offsetWidth)*100 + '%'
    }
  },[clientx])




  const handle_clicking = (e)=> {
    O_ref.current.style.left = e.clientX - l_ref.current.getBoundingClientRect().left+'px'
    bar_ref.current.style.width =  ((e.clientX - l_ref.current.getBoundingClientRect().left)/l_ref.current.offsetWidth)*100 + '%'
    videoRef.current.volume = ((e.clientX - l_ref.current.getBoundingClientRect().left)/l_ref.current.offsetWidth)

  }

  const handleMouseMove = (e)=> {
    if (hover) {
      setClientx( e.clientX)
    }
  }
  // ---------------------bar controler ------------------------
  const [cliked_prog , setCliked_prog] = useState(false)
  const videoBare = useRef(null);
  const videoPerc = useRef(null);
  const videoDot = useRef(null);

  


  const handle_changing =(e)=> {
    let client_x = e.clientX - videoBare.current.getBoundingClientRect().left
    videoPerc.current.style.width = (client_x / videoBare.current.offsetWidth)*100 + '%'
    videoDot.current.style.left = client_x - 4+'px'
    // videoRef.current.currentTime = client_x * totalDuration / videoBare.current.offsetWidth
    console.log(client_x * totalDuration / videoBare.current.offsetWidth , totalDuration)
  }

  const handleM = (e)=> {
    if (cliked_prog) {
      let client_x = e.clientX - videoBare.current.getBoundingClientRect().left
      videoPerc.current.style.width = (client_x / videoBare.current.offsetWidth)*100 + '%'
      videoDot.current.style.left = client_x - 4+'px'
    }
  }


console.log(currTiming/totalDuration*100 ,currTiming,totalDuration )
  useEffect (()=> {
    let totalW 
    if (videoBare.current) {
       totalW = videoBare.current.offsetWidth 
    }else {
      totalW = 0
    }
    // TD -> TW
    // Curr -> 
    let x = (currTiming * totalW)/totalDuration
    if (videoDot.current && videoPerc.current ) {
      videoDot.current.style.left = x +'px'
      videoPerc.current.style.width = currTiming / totalDuration * 100 + '%'
    }

  },[currTiming])

  // ----------------------full screen area ------------------------
  useEffect(()=> {
    if (fullScreenBool) {
      videoRef.current.requestFullscreen();
    }

  },[fullScreenBool])
  // --------------- change timnig --------------- 

  const chang_5 = (seconds)=> {
    console.log(currTiming , currTiming+5,currTiming+5>totalDuration)
    videoRef.current.currentTime  = 20
  }

//  --------------- 
  return (
    
    <div className='VideoPlayer'>
  
     
        <div className='VideoPlayGround center' 
        onMouseEnter={() => setVideoHover(true)}
        onMouseLeave={() => setVideoHover(false)}
        >
      <video
        ref={videoRef}  
        
        onLoadedMetadata={handleLoadedMetadata}
        src={url} 
        volume = {0}
        style={{ }}
        controls = {false}
      />
      {
        (videoHover) ? 
   
      <div className='bore spacebetween'>
        <div className='playing_perc' onMouseLeave={()=>setCliked_prog(false)}  onMouseMove={handleM} onClick={(e)=>handle_changing(e)}  ref={videoBare} ><div className='perc center' ref={videoPerc}  ><div className='dot' onMouseUp={()=>setCliked_prog(true)} onMouseDown={()=>setCliked_prog(false)}  ref={videoDot}  ></div></div></div>
        <div className="playPause spacebetween">   
            <img src={back5}  />
            {/* <img className='small' src={prev}  /> */}
            <img onClick={()=>{setPlausBool(!plausBool);setHistoryVideo()}} src={(plausBool)? pause : play_video } /> 
            <img src={next} className='small' />
            <img src={next5} onClick={()=>chang_5(5)} />
            <div className='timing'>
              {fixTiming(currTiming)} / {fixTiming(totalDuration)}
            </div>
        </div>
        <div className='settings spacebetween'>
          <div
            className = "center container"
           onMouseEnter={() => setSoundHover(true)}
           onMouseLeave={() => {setSoundHover(true);setIfClicked(false)}}
          >
            {    
              (soundHover) ?  
              <div className='soundControler' onClick={(e)=>handle_clicking(e)} onMouseMove={handleMouseMove} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} ref={l_ref} >
                <div className='prog_bar' ref={bar_ref} ></div>
                <div className='circle' onMouseUp={()=>setIfClicked(false)} onMouseDown={()=>setIfClicked(true)} ref={O_ref}></div>
               </div>
              : ''
            }
            <img src={sound} />
          </div>
            <img src={ fullScreenBool ? exitFullScreen : fullScreen  } onClick={()=>{SetFullScreenBool(!fullScreenBool);}}  />

        </div>
        </div>
      : '' 
      }
        </div>
    </div>
  );
}


export default VideoPlayer