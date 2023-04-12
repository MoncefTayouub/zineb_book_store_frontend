import React from 'react'
import bloodpines from '../img/bloodpines.png'
import dune from '../img/dune.png'
import leftArrow from '../icons/leftArrow.svg'
import {useNavigate} from 'react-router-dom';

function BookSection(index ) {
    const navigate = useNavigate();

    let cla = ''
    if (index['index'] % 2 == 1){
        cla = 'boxActive'
    }
    const changePath =(id)=>{
        
        navigate('/bockdetails/'+id);
        window.location.reload(false);
    
  } 
  return (
    <div className={'BookSection center '+cla}>
        <div className='image center'>
        <img src={'http://127.0.0.1:8000/'+index.ob['cover']} />
        </div>
        <div className='details'>
            <h4>{index.ob['name']} </h4>
            <p className='auteur'>{index.ob['author']} </p>
            <p className='desc'>
            {index.ob['description']}
            </p>
            <div className='description'>
                <div className='prices center'>
                    <p className='pr'>{index.ob['paperPrice']}</p>
                    <p className=''>Expédie au Maroc</p>
                </div>
                <div className='prices center'>
                    <p className='pr'>{index.ob['pdfPrice']}</p>
                    <p className=''>PDF Version</p>
                </div>
                <div className='botns center'>
                    <button className=' btn buy rad40' onClick={()=>{index.setContact(true);index.setContent('shop')}} >Acheter maintenant</button>
                    <div className=' btn seeMore center' onClick={()=>changePath(index.ob['id'])} >voir plus <img src={leftArrow} /></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BookSection