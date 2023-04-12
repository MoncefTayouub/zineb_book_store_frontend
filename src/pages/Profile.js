import React , {useState , useEffect} from 'react'
import VideoButtons from '../compoments/VideoButtons'
import axios from 'axios'
import dropDown from '../icons/dropDown.svg'
import {useNavigate} from 'react-router-dom';
import edit from '../icons/edit.svg'
import trash from '../icons/trash.svg'
import blue_x_mark from '../icons/blue_x_mark.svg'
import changeDir from '../icons/changeDir.svg'

function Profile({content , setContent ,contact , setContact}) {
    const navigate = useNavigate();
    const navig =(id)=> {
        navigate(`/frenchcours/video/${id}`)
        window.location.reload(true)
      }

    const [update , setUpdate] = useState(false)
      
    // ----------------- slid buttons ----------------
    const [area , setArea ] = useState(3)
    // ------------------- drop --------------
    const [drop , setDrop] = useState(false)   
   

    //-------------------- loaded data ---------------
    const [data , getData] = useState()

    useEffect (()=> {
        const jwt = localStorage.getItem('jwt_auth')
        if (jwt == null ){
         
            
          
        }else {
          axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
          axios.get('http://127.0.0.1:8000/video/add')
          .then(response => {
            getData(response.data)
            
          });
        }
        },[update])
 // ----------------- editProfile ------------------

 const [editProfile , setEditProfile] = useState(false)
 const [username , setUsername] = useState('')
 const [userJob , setUserJob ] = useState('')
 const [userDesc , setUserDesc] = useState('')
 const [userPic , setUserPic] = useState()

    useEffect(()=> {
    if (editProfile && data) {
        setUsername(data['username'])
        setUserJob(data['userProfile']['job'])
        setUserDesc(data['userProfile']['desc'])
    }
    },[editProfile])

    const EditProfile_back = async()=> {
        const jwt = localStorage.getItem('jwt_auth')
        const pack = new FormData();
        pack.append('username', username );
        pack.append('job', userJob );
        pack.append('desc', userDesc );
        pack.append('picture', userPic );
        pack.append('jwt', jwt );

        
        
        await axios ({
            method : 'post' , 
            url : 'http://127.0.0.1:8000/profile/edit' ,
            data : pack
        })
        .then((response)=>{
            setUpdate(!update)
            setEditProfile(false)
        }) .catch(function (error) {
            console.log(error)
        });
    }
   // ------------------ edit video ---------------
   const [editIndex , setEditeIndex] = useState(false) 
    
   useEffect (()=> {
       if (editIndex && data) {

           data['select_playlist'].map((ob,i)=> {
               if (editIndex['video'][0]['playlist'] == ob['id']) {
                   
                   setPl_title(ob['name'])
                   setVideo_PL(ob['id'])

                }
           })
           setVideo_title(editIndex['video'][0]['name'])
           setvideo_Desc(editIndex['video'][0]['description'])
           
       }
   },[editIndex])

    // ---------------- remove video --------------------
    
    const [delObj , setDelObj] = useState(false)
    
    const delVideo = async()=> {
        const data = new FormData();
        data.append('id', delObj['video'][0]['id']);

        
        
        await axios ({
            method : 'post' , 
            url : 'http://127.0.0.1:8000/video/delete' ,
            data : data
        })
        .then((response)=>{
            setDelObj(false)
            setUpdate(!update)
        
        }) .catch(function (error) {
            console.log(error)
        });
    }

    // ----------------- add video -----------------
    const [video_title , setVideo_title] = useState('')
    const [videoFile , setVideoFile] = useState('')
    const [video_PL , setVideo_PL] = useState()
    const [video_Desc , setvideo_Desc ] = useState('')
    const [pl_title , setPl_title ] = useState('')
    
    
    const Add_video = async()=> {
        const data = new FormData();
        data.append('name', video_title);
        data.append('video', videoFile);
        data.append('playlist', video_PL);
        data.append('desc', video_Desc);
        
        let url = 'http://127.0.0.1:8000/video/add'
        if (editIndex) {
            data.append('id', editIndex['video'][0]['id']);
            data.append('PL_id', video_PL);
            url = 'http://127.0.0.1:8000/video/edit'
        }

        await axios ({
            method : 'post' , 
            url : url ,
            data : data
        })
        .then((response)=>{
            console.log(response.data)
            setUpdate(!update)
            setVideo_title('')
            setVideoFile()
            setVideo_PL()
            setvideo_Desc('')
            setPl_title('')
            setEditeIndex(false)
            
        }) .catch(function (error) {
            console.log(error)
          });
    }


    // ------------- edit playlist -------------
    const [editPL , setEditPL] = useState(false)
    useEffect (()=> {
        if (editPL) {
            console.log(editPL)
            setPL_name(editPL['name'])
            setPL_desc(editPL['desc'])
            data['select_cat'].map((ob,i)=> {
                if (ob['id'] == editPL['cat_id']) {

                    setPL_cat(editPL['cat_id'])
                    setPl_catContent(ob['name'])
                }
            })
        }
    },[editPL])

    // -------------------- add playlist ----------------
    const [pl_name , setPL_name] = useState('')
    const [pl_cat , setPL_cat] = useState()
    const [pl_desc , setPL_desc] = useState('')
    const [pl_catContent , setPl_catContent] = useState('')

    const add_playlist=async() => { 
        const jwt = localStorage.getItem('jwt_auth')
        const dataL = new FormData();
        dataL.append('name', pl_name);
        dataL.append('cat_id', pl_cat);
        dataL.append('desc', pl_desc);
        dataL.append('jwt', jwt);
        
        let url = 'http://127.0.0.1:8000/video/playlist/add'
        if (editPL) {
            dataL.append('id', editPL['id']);
            url = 'http://127.0.0.1:8000/video/playlist/edit'
        }

        await axios ({
            method : 'post' , 
            url : url ,
            data : dataL
        })
        .then((response)=>{
            console.log(response.data)
            setPL_name('')
            setPL_cat(-1)
            setPL_desc('')
            setPl_catContent('')
            setEditPL()
            setUpdate(!update)
        }) .catch(function (error) {
            console.log(error)
          });
    }
    // ------------- delete the palylist ----------
    const [del_pl_obj , setDel_pl_obj] = useState(false) 

    const handel_pl_delete = async() => {
        console.log(del_pl_obj['id'])
        const dataL = new FormData();
        dataL.append('id', del_pl_obj['id']);

          await axios ({
            method : 'post' , 
            url : 'http://127.0.0.1:8000/video/playlist/delete' ,
            data : dataL
        })
        .then((response)=>{
            setDel_pl_obj(false)
            setUpdate(!update)
        
        }) .catch(function (error) {
            console.log(error)
        });
    }
// --------------- account settings ----------------
  

const setEdit = ()=> {
    setContact(true);
    setContent('changePassword');
}
    return (
        (editProfile && data) ?
                <div className='Profile Admin EditProf'>
                        <div onClick={()=>setEditProfile(false)} className='goBack center'>
                            <img src={changeDir} />
                            <p>return</p>
                        </div>
                        <div className='userProfile form center'>
                            <div className='pic center'>
                                <img src={'http://127.0.0.1:8000/' + data['userProfile']['picture']} />
                            </div>
                            <div className='f_box'>
                                <input type='file' id='img_inp' onChange={(e)=> setUserPic(e.target.files[0])}  />    

                            </div>

                         </div>
                         <div className='form'>
                            <div className='f_box center'>
                                <p>Nom et prénom</p>
                                <input value={username} onChange={(e)=> setUsername(e.target.value)} />    
                            </div>
                            <div className='f_box center'>
                                <p>Profession</p>
                                <input value={userJob} onChange={(e)=> setUserJob(e.target.value)} />    
                            </div>
                            <div className='f_box center'>
                                <p>Dites-nous à propos de vous</p>
                                <textarea value={userDesc} onChange={(e)=> setUserDesc(e.target.value)} />    
                            </div>
                            <div className='center'>
                                <button onClick={()=>EditProfile_back()} >Enregister</button>
                            </div>
                         </div>
                </div>
            :
    <div className='Profile'>
        {
            
            (delObj) ?
                <div className='Admin'>
                <div className='confirmation center'>
                        <div className='msg '>
                            <div className='container center'>
                                <img className='xmark_' onClick={()=>setDelObj()} src={blue_x_mark}  />

                                <div  className='video_layer center'>
                        
                                    <video 
                                        src = {'http://127.0.0.1:8000/'+delObj['video'][0]['video']}
                                        onClick={()=>navig(delObj['video'][0]['id'])}
                                    />
                                    <div className='furtherDetials'>
                                    <h2>{delObj['video'][0]['name']} </h2>
                                    <p>
                                        {delObj['video'][0]['description']}
                                    </p>
                                    <div className='spacebetween'>
                                        <div className='box center'>
                                            <div className='pic center'>
                                            <img src={"http://127.0.0.1:8000/"+delObj['owner']['picture']}/>   
                                            </div>
                                            <p>{delObj['owner']['name']}</p>
                                        </div>
                                        <div className=''>
                                        
                                        </div>
                            </div>
                            </div>
                        </div>  
                        <button onClick={()=>delVideo()} >supprimer </button>
                            </div>
                        </div>
                    </div>
                    </div>

            :''
        }
        {(data)? 
            <div className='userProfile center'>
                <div className='pic center'>
                    <img src={'http://127.0.0.1:8000/' + data['userProfile']['picture']} />


                </div>
                <div className='desc'>
                    <h4>{data['username']}</h4>
                    <p className='text'>
                         {data['userProfile']['desc']}
                    </p>   
                    <p className='btn' onClick={()=>setEditProfile(!editProfile)} >modifier profile</p>
                    <p className='btn' onClick={()=>setEdit()}>paramter de compte</p>
                </div>
            </div>
        
        : ''}
        <a id='edit'></a>
        <div className='pageDirection spacebetween'>
            <h3 onClick={()=>setArea(1)} className={(area == 1)? 'active' : ''}>ma chaine </h3>
            <h3 onClick={()=>setArea(2)} className={(area == 2)? 'active' : ''}>ajouter video</h3>
            <h3 onClick={()=>setArea(3)} className={(area == 3)? 'active' : ''} >ajouter playlist</h3>

        </div>
        {
            (data ) ? 

                 
            <div className='pageContent  '>
            {(area == 1)? 
                <div className='Course '>
                     {
                    data['playLists'].map((ob,i)=>
                        <div className='playListDetails' key={i} >
                            <div className='border'> </div>

                            <div className='details'>
                                <div className='spacebetween'>
                                    <h4>{ob['PL']['name']}</h4>
                                    <div className='seeMore_btn center ' >
                                        <p>voir tous  </p>
                                    
                                    
                                    </div>
                                </div>
                                <p className='Desc_text'>
                                    {ob['PL']['desc']}
                                </p>
                            </div>
                            <div className='stage spacebetween'>
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
            
            :(area == 2)?
                <div className='Admin'>
                    <div className='form'>
                        <div className='f_box center'>
                            <p>Title de video  </p>
                            <input value={video_title} onChange={(e)=> setVideo_title(e.target.value)} />    
                         </div>
                    
                
                        <div className='f_box center'>
                            <p>importer la vidéo </p>
                            <input type='file' id='img_inp'  onChange={(e)=> setVideoFile(e.target.files[0])}  />    
 
                         </div>
                  
                    <div className='f_box center'>
                        <p>ajouter le video a un playlist</p>
                        <div onClick={()=>setDrop(!drop)} className='dropDown center'>
                            <p> {pl_title}</p>
                            <img className={(drop ? 'flipv' : '')} src={dropDown}  />
                            {
                                (drop) ?
                                    <div className='list center'>
                                       {
                                        data['select_playlist'].map((ob,i)=> 
                                        <p className='dropedP' key={i}  onClick={()=>{setVideo_PL(ob['id']);setPl_title(ob['name'])}} >{ob['name']}</p>

                                        )                                      
                                       }
                                    </div>
                                    : ''
                            }
                    </div>
                    </div>
                    <div className='f_box center'>
                        <p>descriptions </p>
                            <textarea value={video_Desc} onChange={(e)=> setvideo_Desc(e.target.value)} />    
                    </div>
                    <div className='center'>
                        <button onClick={()=>Add_video()} >Enregister</button>
                    </div>
                    </div>
                    <div className='VideoStage'>
                    {
                            data['videos'].map((ob,i)=>
                        
                            
                            <div key={i} className='video_layer center'>
                            


                            
                            <video 
                                src = {'http://127.0.0.1:8000/'+ob['video'][0]['video']}
                                onClick={()=>navig(ob['video'][0]['id'])}
                            />
                            <div className='furtherDetials'>
                            <h2>{ob['video'][0]['name']} </h2>
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
                                <div className='edit_btn spacebetween'>
                                    <a href='#edit'>
                                        <img src={edit} onClick={()=>setEditeIndex(ob)}/>

                                    </a>
                                    <img src={trash} onClick={()=>setDelObj(ob)}/>
                                </div>
                            </div>
                            </div>
                        </div>   
                            )
              }
              </div>
                </div>
            

            :(area == 3) ?
                  <div className='Admin'>
                    {
            (del_pl_obj) ?
                <div className='Admin'>
                <div className='confirmation center'>
                        <div className='msg '>
                            <div className='container center'>
                                <img className='xmark_' onClick={()=>setDel_pl_obj()} src={blue_x_mark}  />

                                <div className=''>
                                <div className='cat_leble'>

                                    
                                    <h2>{del_pl_obj['name']}</h2>  
                                    <p> {del_pl_obj['desc']} </p>
                                    <h5>Nombre des video <span> {del_pl_obj['nb_video']}</span></h5>
                                </div>
                                </div>
                                 
                               <button onClick={()=>handel_pl_delete()} >supprimer </button>
                            </div>
                        </div>
                    </div>
                    </div>

            :''
        }
                    <div className='form'>
                        <div className='f_box center'>
                            <p>nom de playlist</p>
                            <input value={pl_name} onChange={(e)=> setPL_name(e.target.value)}  />    
                         </div>
                    
              
                       
                  
                    <div className='f_box center'>
                        <p>ajouter a un category </p>
                        <div onClick={()=>setDrop(!drop)} className='dropDown center'>
                            <p> {pl_catContent}</p>
                            <img className={(drop ? 'flipv' : '')} src={dropDown}  />
                            {
                                (drop) ?
                                    <div className='list center'>
                                      {
                                        data['select_cat'].map((ob,i)=> 
                                        <p className='dropedP' key={i}  onClick={()=>{setPL_cat(ob['id']);setPl_catContent(ob['name'])}} >{ob['name']}</p>
                                        )
                                      }
                                      
                                    </div>
                                    : ''
                            }
                    </div>
                    </div>
                    <div className='f_box center'>
                        <p>descriptions </p>  
                            <textarea value={pl_desc} onChange={(e)=> setPL_desc(e.target.value)}  />    
                    </div>
                    <div className='center'>
                        <button onClick={()=>add_playlist()} >Enregister</button>
                    </div>
                    </div>
                    
                    <div className='Admin center'>
                        <div className='form'>
                            <div className='VideoStage'>
                            {
                        (editPL) ?
                        editPL['video_pack'].map((ob,i)=>
                        
                            
                        <div key={i} className='video_layer center'>                                                    
                            <video 
                                src = {'http://127.0.0.1:8000/'+ob['video'][0]['video']}
                                onClick={()=>navig(ob['video'][0]['id'])}
                            />
                            <div className='furtherDetials'>
                            <h2>{ob['video'][0]['name']} </h2>
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
                                <div className='edit_btn spacebetween'>
                                    <a href='#edit'>
                                        <img src={edit} onClick={()=>{setEditeIndex(ob);setArea(2)}}/>

                                    </a>
                                    <img src={trash} onClick={()=>setDelObj(ob)}/>
                                </div>
                            </div>
                            </div>
                        </div>   
                        )
                        :""
                    }
                            </div>
                        <div className='conta center'>

                     
                        {
                            data['playlist_update'].map((ob,i) => 
                            <div className='cat_leble' key={i}>

                                <div className='controle spacebetween'>
                                        <a href='#edit'>
                                            <img src={edit} onClick={()=>setEditPL(ob)} />
                                        </a>
                                        <img src={trash} onClick={()=>setDel_pl_obj(ob)} />
                                    </div>
                                <h2>{ob['name']}</h2>  
                                <p> {ob['desc']} </p>
                                <h5>Nombre des video <span> {ob['nb_video']}</span></h5>
                            </div>
                            )      
                        }
                        </div>
                        </div>
                </div>
                </div>
            :''
        
            }
        </div>

            : ''
        }
    </div>
  )
}

export default Profile