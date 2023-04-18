import React , {useState , useEffect} from 'react'  

import { Routes, Route, useParams } from 'react-router-dom';

import {useNavigate} from 'react-router-dom';

function PlayListsPage(index) {
  let param = useParams();
  const navigate = useNavigate();
  useEffect (()=>{
    index.setSupPage(3)
  },[])



  const [data, setData] = useState()
  useEffect(()=>{
      getData();
    },[])    


    let getData = async () => {

      let respons = await fetch (`https://127.0.0.1:8000/FrenchCourses/playlist/${param.id}/`)
      let data = await respons.json()
      setData(data)
      console.log(data)

    }
    console.log(data)
  return (
    <div className='PlayListsPage'>
      
       {
        (data != undefined)?
        <div>
          <div className='PLDetails '>
            <h2>{data['playlist']['name']}</h2>
            <p>{data['playlist']['description']}</p>
          </div>
          <div className='profile center'>
            <div className='pic center'>
              <img src={'http://127.0.0.1:8000/'+data['owner']['picture']} />
            </div>
            <div className='profD '>
              <h4>{data['owner']['full_name']}</h4>
              <p>{data['owner']['video_N']}  video <span> | </span>{data['owner']['PL_N']} playlists </p>
            </div>
          </div>

          {
                data['videos'].map((ob,i)=>
               
                
              <div key={i} className='video_layer center'>
                <video 
                src = {'http://127.0.0.1:8000/'+ob['video'][0]['video']}
                onClick={()=>navigate('/frenchcours/video/'+ob['video'][0]['id'])}
                />
                <div className='furtherDetials'>
                  <h2 onClick={()=>navigate('/frenchcours/video/'+ob['video'][0]['id'])} >{ob['video'][0]['name']} </h2>
                  <p>
                  {ob['video'][0]['description']}
                  </p>
                  <div className='spacebetween'>
                    <div className='box center'>
                        <div className='pic center'>
                          <img src={"http://127.0.0.1:8000/"+ob['owner']['picture']}/>   
                        </div>
                        <p>{ob['owner']['name']}</p>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>   
                )
              }



        </div>
        :""
       }
    </div>

  )
}

export default PlayListsPage