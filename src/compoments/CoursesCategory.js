import React from 'react'
import meduimSeeMore from '../icons/meduimSeeMore.png'
import {useNavigate} from 'react-router-dom';

function CoursesCategory(index) {
  const navigate = useNavigate();
  
  
  const changePath =()=>{      
    navigate('/frenchcours/course/'+index.ob['id']);
    window.location.reload(false);

} 
  return (
    <div className='CoursesCategory_border center' onClick={()=>changePath()}>
        <div className='CoursesCategory'>
            <h5>{index.ob['name']}</h5>
            <p>
                {index.ob['desc']}
            </p>
            <img src={meduimSeeMore}  />
        </div>
    </div>
  )
}

export default CoursesCategory