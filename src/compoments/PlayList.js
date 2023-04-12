import React from 'react'
import frenchcover from '../img/frenchcover.png'
import heart from '../icons/heart.svg'
import meduimSeeMore from '../icons/meduimSeeMore.png'
import {useNavigate} from 'react-router-dom';

function PlayList(index) {

  
  const child = (e)=> {
    console.log('this child')
    e.stopPropagation();
  }

  const navigate = useNavigate();
  
  
  const changePath =()=>{      
    navigate('/frenchcours/playlist/'+index.ob['id']);
    window.location.reload(false);

} 

  return (
    <div className='PlayList_obrder center' onClick={()=> changePath() }  > 
        <div className='PlayList'>
            <img className='cover' src={'http://127.0.0.1:8000'+index.ob['cover']} />
            <div className='desc'>
                <h3>{index.ob['name']}</h3>
                <p>
                  {index.ob['description']}
                  </p>
            </div>
            <div className='bare spacebetween'>
                <img className='heart' src={heart} onClick={(e)=> child(e) }  />
                <img className='' src={meduimSeeMore} />
            </div>
        </div>
    </div>
  )
}

export default PlayList