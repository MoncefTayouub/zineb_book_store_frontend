import React, { useEffect , useState } from 'react'
import headerDev from '../icons/headerDev.svg'
import BookSection from '../compoments/BookSection'
import {useParams } from "react-router-dom"

function DevBooks(index) {
  const params = useParams() ;
  const backend_url = 'https://moncefwitcher.pythonanywhere.com/'

  useEffect (()=>{
      index.setSupPage(2)
    },[])
    const [data , setDate] = useState()

    useEffect(()=>{
        getData();
      },[])    
      let getData = async () => {

        let respons = await fetch (`${backend_url}general/book_category/${params.index}`)
        let data = await respons.json()
        setDate(data)
      }  
      console.log(data)
  return (
    <div className='DevBooks'>
     { (data != undefined) ? 
     <div>
        <div className='header center'>
          <div className='text'>
              <h3>{data?.['category']['title']}</h3>
              <p>{data?.['category']['description']}</p>
          </div>
            <img src={headerDev} />
        </div>
        {data['books'].map((ob,i)=>
        
          <BookSection index={i} backend_url={backend_url}  ob={ob}  key={i}  />
        )}
        <div className='headline_container center'>
            <h3>Élargissez vos horizons littéraires : découvrez plus de livres !</h3>
        </div>
        {data['other_books'].map((ob,i)=>
        
          <BookSection index={i} backend_url={backend_url}  ob={ob}  key={i}  />
        )}
        </div> : '' }   
    </div>
  )
}

export default DevBooks