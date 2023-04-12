import React from 'react'
import frenchcover from '../img/frenchcover.png'
import play from '../icons/play.svg'
import CoursesCategory from './CoursesCategory'
import changeDir from '../icons/changeDir.svg'
function VideoPresentation({ob}) {
    console.log(ob['name'])
  return (
    <div className='VideoPresentation center'>
        <div className='imgSection center'>
            {/* <video  
            
            /> */}
            <video className='cover' src={'http://127.0.0.1:8000/'+ob['video']} />
            <div className='btnPlay center'>
                <div className='heightlight center'>
                    <img src={play} />
                </div>
            </div>
        </div>
        <div className='description'>
            <h3> {ob['name']}</h3>   
            <p> 
                {ob['description']}
                </p>
        </div>


    
        
           
    </div>
  )
}

export default VideoPresentation