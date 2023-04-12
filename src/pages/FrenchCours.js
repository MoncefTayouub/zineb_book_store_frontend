import React , {useState , useEffect , useRef } from 'react'
import frenchCoursHeader from '../icons/frenchCoursHeader.svg'
import CoursesCategory from '../compoments/CoursesCategory'
import changeDir from '../icons/changeDir.svg'
import seeMore from '../icons/seeMore.svg'
import meduimSeeMore from '../icons/meduimSeeMore.png'
import PlayList from '../compoments/PlayList'
import VideoButtons from '../compoments/VideoButtons'
import {useNavigate} from 'react-router-dom';

function FrenchCours(index) {
    useEffect (()=>{
        index.setSupPage(3)    
      },[])

      const slideDiv = useRef(null)
      
      const navigate = useNavigate();
      const changePath =(id)=>{
        navigate('/frenchcours/course/'+id);
        window.location.reload(false);
       
    }

      const [data , setDate] = useState()

    useEffect(()=>{
        getData();
      },[])    
      let getData = async () => {

        let respons = await fetch ('http://127.0.0.1:8000/FrenchCourses')
        let data = await respons.json()
        setDate(data)
      }
    
    //   console.log(data)
    useEffect(()=>{
        
    },[])

    const [location , setLocation] = useState(0)
    const slid = (mult)=>{
        if ((location +(mult *370)) <=0 && (location +((mult+0.3) *370)) > -(slideDiv.current.clientWidth-(3*370)) ) {
            setLocation(location +(mult *370))
            slideDiv.current.style.left = (location +(mult *370))+'px'
        }
        
    }
  return (
    <div className='FrenchCours'>
        <div className='DevBooks'>
            <div className='headSection header center'>
                <h3>Améliorez vos compétences en français grâce à nos offres de cours complets!</h3>
                <img src={frenchCoursHeader} />
            </div>
        </div>
        {
                (data != undefined)?
                <div>
        <div className='categories'>
                <div className='changoDir center'>
                    <img src={changeDir} onClick={()=>slid(-1)} />
                </div>
            <div className=' center'>
      
                    <div className='cat center container' ref={slideDiv} >
                        {data['cat'].map((ob,i) =>
                              <CoursesCategory key={i} ob={ob} /> 
                        )}
                        
                    </div>
                
            </div>
            <div className='changL center'>
                    <img className='flipH' src={changeDir} onClick={()=>slid(1)}  />
            </div>
        </div>
        {/* <div className='spacebetween'>
            <div></div>
            <div className='seeAllBtn spacebetween'>
                <p>voir tous</p>
                <img src={meduimSeeMore} />
            </div>
        </div> */}
        <div  className='headVideo center'>
            {
                data['head_video'].map((ob,i)=>
                    <VideoButtons ob={ob} key={i} />
                )
            }
          
        </div>


            {
                data['categories'].map((ob,i)=>
                
                <div className = 'categories_head' key={i}>
                    <div className = "bigTitle spacebetween">
                        <h3>{ob['categroy'][0]['name']}</h3>
                        <div className='seeMore_btn center ' onClick={()=>changePath(ob['categroy'][0]['id'])} >
                            <p>voir tous </p>
                            <img src={seeMore}  />
                        </div>
                    </div>
                    <div className='videos spacebetween'>
                        {
                            ob['videos'].map((oc,j)=>
                            <VideoButtons ob={oc} key={j} />

                            )
                        }
                    </div>
                </div>
                )
            }
        </div>
        :''
    }



    </div>
  )
}

export default FrenchCours