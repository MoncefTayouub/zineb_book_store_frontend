import React , {useState , useEffect} from 'react'
import picture from '../img/picture.png'
import BookSection from '../compoments/BookSection'
import auteurPicture from '../img/auteurPicture.png'
import dropDown from '../icons/dropDown.svg'
import bigLeftArrow from '../icons/bigLeftArrow.svg'
import {useNavigate} from 'react-router-dom';
import UpPage from '../compoments/UpPage'
import youtube from '../icons/youtube.svg'
function Home({content , setContent ,contact , setContact , userLogin,setUserLogin}) {
    const navigate = useNavigate();
    const [zinebBox , setZinebBox] = useState([])
    const [devBox , setDebBooks] = useState([])
    const backend_url = 'http://moncefwitcher.pythonanywhere.com/'
    
    const [data , setDate] = useState()
    useEffect(()=>{
        getData();
      },[])    
      let getData = async () => {

        let respons = await fetch (`${backend_url}zinebprofile`)
        let data = await respons.json()
        setDate(data)
        
      }


      const changePath =(supage,id)=>{
        
            navigate('/'+supage);
        
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
      
      const [index_counter , set_index_counter] = useState(0)

      console.log(data)

  return (
    <div className='Home'>
      
    {
        (data != undefined) ?
        <div>
    <div className='headlines center'>
        <img src={picture} />
        <div className='desc'>
            <h2>Trouvez votre prochaine lecture préférée </h2>
            {/* <p>
            nous fournissons une plate-forme complète pour les personnes qui souhaitent apprendre le français ou améliorer leurs connaissances existantes de la langue. Le français est l'une des langues les plus parlées au monde et est une langue de communication internationale, ce qui en fait une compétence essentielle pour les étudiants, les professionnels et les passionnés de langues. 

            </p> */}
            <div className='btns spacebetween'>
            <a href='#magazin'>
                  <button className='rad40 CTA'   >Aller au magasin</button>
              </a>
                <button className='rad40 contact' onClick={()=>{setContact(true);setContent('contact')}} >Contactez-nous</button>
            </div>
        </div>
    </div>
    <div className='about center'>  
        <div className='auteurImage center'>
            <div className='borders center'>

            <img src={backend_url+data['zinebProf']['picture']} />
            </div>
        </div>
        <div className='detailsAut'>
            <h3>{data['zinebProf']['name']}</h3>
            <p>
                {data['zinebProf']['description']} 
                 </p>
            <div className='line spacebetween'>
                <a href={data['links']['youtube']} target="_blank">
                    <div className='center'><img src={youtube} /> <p>{data['zinebProf']['name']}</p> </div>
                </a>
                <div className='seeMore' onClick={()=>changePath('a_propos_de_nous')} >{(windowWidth > 580) ? 'voir plus' : ''} <img src={dropDown} /> </div>
                </div>
        </div>
    </div>
       <a id='magazin'></a>
    {data['books'].map((om,i)=>
            <>
            
            <div className='headline_container center'>
                 <h3>{om['cat']['title']}</h3>
             </div>
            
            {
                om['books'].map((or,r)=>
                <BookSection  index={i}  ob={or}  key={r} setContent={setContent} content={content} backend_url={backend_url}  setContact={setContact} contact={contact} />     
                )
                
            }
            <div className='spacebetween '><div></div> <div className='bigSeemore spacebetween rad40' onClick={()=>changePath(`book_category/${om['cat']['id']}`,-1)}  ><p>Autre lives </p> <img src={bigLeftArrow} /></div> </div>
            </>
        )}


   
   
   
    </div>
        :''
    }
    
    </div>
    
  )
}

export default Home