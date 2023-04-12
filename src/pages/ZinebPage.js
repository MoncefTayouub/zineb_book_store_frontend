import React , {useState , useEffect} from 'react'
import auteurPicture from '../img/auteurPicture.png'
import dropDown from '../icons/dropDown.svg'
import BookSection from '../compoments/BookSection'
import zinebProf_header from '../icons/zinebProf_header.png'

function ZinebPage(index) {

    useEffect (()=>{
        index.setSupPage(1)
      },[])

    const [data , setDate] = useState()

    useEffect(()=>{
        getData();
      },[])    
      let getData = async () => {

        let respons = await fetch ('http://127.0.0.1:8000/zinebprofile')
        let data = await respons.json()
        setDate(data)
      }

      console.log(data)
  return (
    <div className='ZinebPage' >
        {(data != undefined) ? 

        <div>

        
        <div className='presenting_autheur center'>
          <img className='headerImage' src={zinebProf_header} />
            <div className='imgSection center'>
                <img className='flowers' src={'http://127.0.0.1:8000/'+data['zinebProf'][0]['picture']} /> 
            </div>
            <h3>{data['zinebProf'][0]['name']}</h3>
            <p> 
            {data['zinebProf'][0]['description']}
            </p>
        </div>
        {
            data['zinebBooks'].map((ob,i)=>
                <BookSection  index={i}  ob={ob}  key={i} />
            )
        }
        </div>
        :"" 
        }
    </div>
  )
}

export default ZinebPage