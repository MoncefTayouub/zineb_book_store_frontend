import React ,{ useState , useEffect }from 'react'
import {useNavigate} from 'react-router-dom';
function VideoButtons(para) {
  const navigate = useNavigate();

  const changePath =(id)=>{
    navigate('/frenchcours/video/'+id);   
    window.location.reload(false);

} 
  return (
    <div className='VideoButtons'>
        <div className='cover'></div>
        <video 
        controls={false}
        src={'http://127.0.0.1:8000/' + para.ob['video'][0]['video']}
        onClick={()=>changePath(para.ob['video'][0]['id'])}
         />
         <div className='details center'>
            <div className='linearBorder center'>
                <img src={'http://127.0.0.1:8000/'+para.ob['owner']['picture']} />
            </div>
            <div className='titles'>
                <h3>{para.ob['video'][0]['name']}</h3>
                <h5>{para.ob['owner']['name']} </h5>
            </div>
         </div>
    </div>
  )
}

export default VideoButtons