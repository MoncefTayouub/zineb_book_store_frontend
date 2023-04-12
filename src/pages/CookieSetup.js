import React, { useRef, useEffect , useState } from 'react';
import Cookies from 'universal-cookie' ;
import jwt from 'jwt-decode' 

function CookieSetup() {

  const [totalDuration , setTotalDuration ] = useState()
  const videoReff = useRef(null);

  const handleLoadedMetadata = () => {
    const video = videoReff.current;
    if (!video) return;
    setTotalDuration(video.duration)
  };

  
  const handleLoadedData = () => {
   
      videoReff.current.currentTime =10;
    
  }
  const [hover , setHover] = useState(false )
  const l_ref = useRef(null)
  const O_ref = useRef(null)
  const [clientx , setClientx] = useState(0)
  const [ifClicked, setIfClicked] = useState(false)
  
  useEffect (()=> {
    if (ifClicked) {
      O_ref.current.style.left = (clientx-l_ref.current.getBoundingClientRect().left)+'px'
    }
  },[clientx])


  useEffect (()=>{
    console.log(clientx,ifClicked,l_ref.current.offsetWidth)
  },[clientx])


  const handleMouseMove = (e)=> {
    if (hover) {
      setClientx( e.clientX)
    }
  }

  // console.log(clientx,ifClicked,l_ref.current.offsetWidth)

  return (
    <div className='CookieSetup'>
      <div className='container_ center'> 
        <div className='line' ref={l_ref} onMouseMove={handleMouseMove} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} >
      <div className='circl' onMouseUp={()=>setIfClicked(false)} onMouseDown={()=>setIfClicked(true)} ref={O_ref}  ></div>
    </div>
     </div> 

   
         {/* <video
        ref={videoReff}  
        autoPlay
        onLoadedMetadata={handleLoadedData}
        src={'http://127.0.0.1:8000/video/2SHOUL1.MP4.mp4'} 
        style={{ width: 'auto', height: 450+'px'  , border : '1px solid white'}}

      />
      <br/>
      <button onClick={()=>videoReff.current.play()}>play</button>
      <br/>
      <button  onClick={()=>videoReff.current.pause()}>pause</button>
      <br/>
    <button onClick={()=>{handleLoadedData()}}>play5</button> */}



    


    </div>
  )
}

export default CookieSetup