import React , {useEffect , useState} from 'react'
import instagram from '../icons/instagram.svg'
import gmail from '../icons/gmail.svg'
import whatsap from '../icons/whatsap.svg'
import facebook from '../icons/facebook.svg'
import whitelogo from '../icons/whitelogo.svg'
function Footer({setContent ,contact , setContact}) {


    const [data , setDate] = useState()
    useEffect(()=>{
        getData();
      },[])    
      let getData = async () => {

        let respons = await fetch ('http://127.0.0.1:8000/for_footer/')
        let data = await respons.json()
        setDate(data)
        
      }

      const visite_socail_media = (link)=> {
        window.open( link , "_blank");
      }

      const whatsap_linking = (number)=> {
        window.open( `https://api.whatsapp.com/send?phone=${number}&text=Bonjour`, "_blank");
      }


      const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      // Cleanup function to remove the event listener
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return (
    <div className={windowWidth > 450 ? 'Footer center' : 'Footer center'}>
        <div className='infos'>
        <div className='socialM center '>
            <div className='box center'>
                <img src={gmail} onClick={()=>{setContact(true);setContent('contact')}} />
            </div>
            <div className='box center'>
                <img src={facebook} onClick={()=>visite_socail_media(data?.['links']['facebook'])} />
            </div>
            <div className='box center'>
                <img src={instagram} onClick={()=>visite_socail_media(data?.['links']['insta'])} />
            </div>
            <div className='box center'>
                <img src={whatsap} onClick={()=>whatsap_linking(data?.['links']['whatsapp'])} />
            </div>
        </div>
        <div className='ourProduct'>
            <nav className='spacebetween'>
                <ul>
                    <h4 >Nos produit</h4>
                    <li>EL Kadri Zineb Livres</li>
                    <li>development personnel</li>
                    <li>Français de l'éducation</li>
                </ul>

            <ul>
                    <li>
                        <h4>Contact</h4>
                        <li>contact@gmail.com</li>
                        <li>05 43 67 90 12</li>
                        <li>fes , fesshore , 12</li>
                    </li>
                </ul>
            </nav>
        </div>
        </div>
        <div className='logoSection center'>
            <img src={whitelogo} />
        </div>
    </div>
  )
}

export default Footer