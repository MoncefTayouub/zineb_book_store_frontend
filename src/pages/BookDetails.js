import React , {useState , useEffect} from 'react'
import dune from '../img/dune.png'
import BookSection from '../compoments/BookSection'
import {useParams } from "react-router-dom"
function BookDetails(id) {
  const backend_url = 'https://moncefwitcher.pythonanywhere.com/'

    const params = useParams() ;
    const [data , setDate] = useState()
    const [curBook , setCurBook] = useState([])
    useEffect(()=>{
        getData();
      },[])    
      let getData = async () => {

        let respons = await fetch (`${backend_url}bookdetails/${params.id}`)
        let data = await respons.json()
        setDate(data)
        setCurBook(data['theBook'][0])
      }


    return (
    <div className='BookDetails'>
        {
            (data != undefined)?
                <div>
                  
        <div className='bock center'>
            <div className='imgSection center'>
                 <img src={backend_url+curBook['cover']} />
            </div>
            <div className='details'>
                <h3>{curBook['name']} </h3>
                <p className='autheur'>{curBook['author']} </p>
                <div className='prices'>
                    <div className='box spacebetween' >
                        <p className='price'>{curBook['paperPrice']}</p>
                        <p>Expédie au Maroc</p>
                    </div>
                    <div className='box spacebetween'>
                        <p className='price'>{curBook['pdfPrice']}</p>
                        <p>PDF Version</p>
                    </div>
                </div>
                <button className='rad40' >Acheter maintenant</button>
            </div>
        </div>
        <h4 >Ce livre s'intéresse aux </h4>
        <p className='description' >
                {  curBook['description']}
        </p>
        <h4 className='descriptionH4' >D'autres livres qui peuvent vous <span> intéresser</span></h4>
        {/* <BookSection index={0} />
        <BookSection index={1} />
        <BookSection index={0} />
        <BookSection index={1} /> */}
          {
            data['otherbooks'].map((ob,i)=>
            <BookSection  index={i}  ob={ob}  key={i} />
            )
          }
          </div>
            : ''
        }
    </div>
  )
}

export default BookDetails