import React , {useState , useEffect , useRef } from 'react'
import changeDir from '../icons/changeDir.svg'
import dropDown from '../icons/dropDown.svg'
import search from '../icons/search.png'
import white_x_marque from '../icons/white_x_marque.png'
import blue_x_mark from '../icons/blue_x_mark.svg'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import soryy from '../img/soryy.png'
import team_page from '../icons/team_page.svg'
import leftArrow  from '../icons/leftArrow.svg'
import edit from '../icons/edit.svg'
import trash from '../icons/trash.svg'
import add_new_icon from '../icons/add_new_icon.svg'
import check_linear from '../icons/check_linear.svg'
import grey_x_mark from '../icons/grey_x_mark.svg'



function Admin({setSetTest , edited_page_id , setEdited_page}) {
    const navigate = useNavigate()
    const [clicked , setClicked] = useState(5)
    const img_btn = useRef(null)
    const backend_url = 'https://moncefwitcher.pythonanywhere.com/'

    
    // ---------- get data ------------

    const [data , setDate] = useState()
    const [update ,setUpdate] = useState(false)
    useEffect(()=>{
        getData();
      },[update])    
      let getData = async () => {
        const jwt = localStorage.getItem('jwt_auth')
        if (jwt == null ){
            navigate('/')
            
        }else {
        const Fdata = new FormData();
        Fdata.append('jwt', jwt);
        await axios ({
            method : 'post' , 
            url : backend_url+'permission_data/' ,
            data : Fdata
        })
        .then((response)=>{
            
            setDate(response.data)
            setProfile_desc(response.data['generalProfile']['description'])
            setlink_youtube(response.data['links']['youtube'])
            setfacebook(response.data['links']['facebook'])
            setInstagram(response.data['links']['insta'])
            setwhatsapp(response.data['links']['whatsapp'])
            setgmail(response.data['links']['gmail'])
            console.log(respo)
           
        }) .catch(function (error) {
            console.log(error)
          });
        
        }

   
      }
    

    // ---------- drop down -------------
    const [drop , setDrop ] = useState(false)

    // ------------ add category =----------------
    const [catIndex , setCatIndex ] = useState(false)
    const [C_name , setC_name] = useState('')
    const [C_desc , setC_desc] = useState('')

    useEffect (()=> {
        if (catIndex && data) {
            data['categories'].map((ob,i)=>{
                if (ob['id'] == catIndex) {
                    setC_name(ob['title'])
                    setC_desc(ob['description'])
                    window.scrollTo(0, 0);
                    return 0
                }
            })
        }

    },[catIndex])

    const add_category = async()=> {
        const data = new FormData();
        if (C_name != '' && C_desc != '' ){
        data.append('name', C_name);
        data.append('desc', C_desc);
        
        let url = backend_url+'/add_category/'
        if (catIndex) {
            data.append('id',catIndex );
            url = backend_url+'/add_category/edite'
        }
        await axios ({
            method : 'post' , 
            url : url,
            data : data
        })
        .then((response)=>{
            console.log(response.data)
            setUpdate(!update)
            setCatIndex(false)
           
        }) .catch(function (error) {
            console.log(error)
          });
          setC_name('')
          setC_desc('')
        }
    }
    // -------------- remove category ------------
    const [del_cate_index , setDel_cate_index] = useState(false)
    const [obj_cat , setObj_cat] = useState()

    useEffect(()=>{
        if (del_cate_index && data) {
            data['categories'].map((ob,i)=>{
                if (ob['id'] == del_cate_index) {
                    setObj_cat(ob)
                    
                    return 0
                }
            })
        }
    },[del_cate_index])

    const del_category = async ()=> {
        const dataL = new FormData();
        dataL.append('id', del_cate_index);

        await axios ({
            method : 'post' , 
            url : backend_url+'/add_category/delete' ,
            data : dataL
        })
        .then((response)=>{
            console.log(response.data)
            setUpdate(!update)
            setObj_cat()
            setDel_cate_index()
        }) .catch(function (error) {
            console.log(error)
          });
    }

    // ------------ remove book -----------
    const [delBook , setDelBook] = useState(false)
    const [delObject , setDelObject] = useState()
    

    const delete_book =async()=> {

        const dataL = new FormData();
        dataL.append('id', delBook);

        await axios ({
            method : 'post' , 
            url : backend_url+'bookdetails/rm' ,
            data : dataL
        })
        .then((response)=>{
            console.log(response.data)
            setUpdate(!update)
            setDelObject()
           
        }) .catch(function (error) {
            console.log(error)
          });
    }
   
    // -------add book  -------  
    const [b_name , setB_name] = useState ('')
    const [b_auth , setB_auth] = useState ('')
    const [b_cover , setB_cover] = useState ('')
    const [b_category , setB_category] = useState (0)
    const [b_descriptions , setB_descriptions] = useState ('')
    const [b_pdfP , setB_pdfP] = useState (2.99)
    const [b_pPrice , setB_pPrice] = useState (4.99)
    const [b_file , setB_file] = useState ('')
    const [bookEdit , setBookEdit] = useState(false)
    

    const cate_selected_id =() => {
        let name = ''
        data['categories'].map((oc,i)=> {
            if (b_category == oc['id']) {
                name = oc['title']
            }
        })
        return name
    }


    useEffect (()=> {
        if ( bookEdit && data != undefined) {
            data['books'].map((ob,i)=> {
                if (ob['id'] == bookEdit) {
                    setB_name(ob['name'])
                    setB_auth(ob['author'])
                    setB_category(ob['category'])
                    setB_descriptions(ob['description'])
                    setB_pdfP(ob['pdfPrice'])
                    setB_pPrice(ob['paperPrice'])
                    window.scrollTo(0, 0);
                    return 0
                }
            })
        }
    },[bookEdit])
    useEffect (()=> {
        if ( delBook && data != undefined) {
            data['books'].map((ob,i)=> {
                if (ob['id'] == delBook) {
                    setDelObject(ob)
                    return 0
                }
            })
        }
    },[delBook])

    const add_book = async ()=> {
        const data = new FormData();
        data.append('name', b_name);
        data.append('author', b_auth);
        data.append('pdfPrice', b_pdfP);
        data.append('paperPrice', b_pPrice);
        data.append('category', b_category);
        data.append('description', b_descriptions);
        data.append('file', b_file);
        if (b_cover != '') {
            data.append('picture', b_cover);
        }

        let url = backend_url+'add_book/'
        if (bookEdit ) {
            data.append('id' , bookEdit)
            url =  backend_url+'bookdetails/edit'
        }

        

        await axios ({
            method : 'post' , 
            url : url ,
            data : data
        })
        .then((response)=>{
            console.log(response.data)
            setB_name('')
            setB_auth('')
            setB_category('')
            setB_descriptions('')
            setB_pdfP(2.99)
            setB_pPrice(4.99)
            setUpdate(!update)
           
        }) .catch(function (error) {
            console.log(error)
          });
     
        }
    // ------------ admit permission -------
    const handel_accept = async(id)=> {

        
        const data = new FormData();
        data.append('id', id);
        data.append('resp', 1);

        
        await axios ({
            method : 'post' , 
            url : backend_url+'permission_accept/' ,
            data : data
        })
        .then((response)=>{
            console.log(response.data)
            setUpdate(!update)
           
        }) .catch(function (error) {
            console.log(error)
          });
     
        }
    
// ----------- deni permission ----------------
const handel_refuse = async(id)=> {

        
    const data = new FormData();
    data.append('id', id);
    data.append('resp', false);
    await axios ({
        method : 'post' , 
        url : backend_url+'permission_accept/' ,
        data : data
    })
    .then((response)=>{
        console.log(response.data)
        setUpdate(!update)
       
    }) .catch(function (error) {
        console.log(error)
      });
 
    }

// ------------ remove perm from profile -----------
const prof_rm_perm = async(id)=> {

        
    const data = new FormData();
    data.append('id', id);

    
    await axios ({
        method : 'post' , 
        url : backend_url+'prof_rm_perm/' ,
        data : data
    })
    .then((response)=>{
        console.log(response.data)
        setUpdate(!update)
       
    }) .catch(function (error) {
        console.log(error)
      });
 
    }
  
    
    // ----------------- set links ------------------------
    const [picture , setPicture] = useState()
    const [profile_desc , setProfile_desc] = useState('')
    const [link_youtube , setlink_youtube] = useState('')
    const [link_facebook , setfacebook] = useState('')
    const [link_Instagram , setInstagram] = useState('')
    const [link_whatsapp , setwhatsapp] = useState('')
    const [link_gmail , setgmail] = useState('')

    const setLinks =async()=> {
        const data = new FormData();
        data.append('facebook', link_facebook);
        data.append('youtube', link_youtube);
        data.append('picture', picture);
        data.append('instagram', link_Instagram);
        data.append('whatsapp', link_whatsapp);
        data.append('desc', profile_desc);
        data.append('gmail', link_gmail);
        await axios ({
            method : 'post' , 
            url : backend_url+'setlinks/' ,
            data : data
        })
        .then((response)=>{
            // console.log(response.data)
            // setProfile_desc('')
            // setlink_youtube('')
            // setfacebook('')
            // setInstagram('')
            // setwhatsapp('')
            // setgmail('')
        }) .catch(function (error) {
            console.log(error)
          });
    }

// -------------- add pages category ------------

const [cat_page_name , set_cat_page_name] = useState ('')
const [cat_page_desc , set_cat_page_desc] = useState ('')
const [edit_cat_page , set_edit_cat_page] = useState(false)

const add_page_cat = async() => {
    const pack = new FormData();
    pack.append('name', cat_page_name);
    pack.append('desc', cat_page_desc);
    
    if (edit_cat_page) {
        pack.append('id', edit_cat_page - 1);
        pack.append('edit', 1);
    }else {
        pack.append('edit', 0);
    }
    await axios ({
        method : 'post' , 
        url : backend_url+'/add_page_cat' ,
        data : pack
    })
    .then((response)=>{
        console.log(response.data)
        set_cat_page_name('')
        set_cat_page_desc('')
        setUpdate(!update)
        set_edit_cat_page(false)
       
    }) .catch(function (error) {
        console.log(error)
      });
}

// ------------- edit page category ------------

const handel_edit_cat_page = (om)=> {
    set_cat_page_name(om['category']['name'])
    set_cat_page_desc(om['category']['description'])
    set_edit_cat_page(om['category']['id'] + 1)
    window.scrollTo(0, 0);
    console.log(om)
}


// -------- edite page ------------

const handel_set_edite_page = (id)=> {
    setEdited_page(id)
    navigate('/textarea')

}

const handle_delete_page = async(id) => {
    const pack = new FormData();

    pack.append('id', id);
    
    
    await axios ({
        method : 'post' , 
        url : backend_url+'/add_page/delete' ,
        data : pack
    })
    .then((response)=>{
        console.log(response.data)
        setUpdate(!update)
       
    }) .catch(function (error) {
        console.log(error)
      });
}

const handle_delete_cat_page = async(id) => {
    const pack = new FormData();

    pack.append('id', id);
    
    
    await axios ({
        method : 'post' , 
        url : backend_url+'/add_page_cat/delete' ,
        data : pack
    })
    .then((response)=>{
        console.log(response.data)
        setUpdate(!update)
       
    }) .catch(function (error) {
        console.log(error)
      });
}

// --------------- handel adding a blank page ---------------  
    const add_new_page = ()=> {
        navigate('/textarea')
    }

// ----------------- quiz ---------------

const [quiz_location , setQuiz_location ] = useState(1)
const [quiz_obejct , set_quiz_obejct] = useState(false)
const [question_index, set_question_index] = useState(false)
const [comment , set_comment] = useState('')
const see_user_answer = (ob)=> {
    set_quiz_obejct(ob) 
    setQuiz_location(2)
}

useEffect(()=>{
    console.log(question_index , quiz_obejct )
    if (question_index) {
        quiz_obejct?.['ques'].map((ob,b)=>{
            if (question_index == b + 1) {
                set_comment(ob['comment'])
            }
        })
    }
},[question_index])


    const handle_correcting_question = async(ob) => {
        const pack = new FormData();
    
        pack.append('pk', ob['pk']);
        pack.append('q_index', ob['q_index']);
        pack.append('comment', comment);


        
        await axios ({
            method : 'post' , 
            url : backend_url+'register_quiz_correction' ,
            data : pack
        })
        .then((response)=>{
            console.log(response.data)
            setUpdate(!update)
            set_comment('')
            set_question_index(0)
        }) .catch(function (error) {
            console.log(error)
          });
    }

console.log(quiz_obejct)

    return (
    (data) ? 
    <div className='Admin'>
        {
            (obj_cat) ?
            <div className='confirmation center'>
            <div className='msg '>
                <div className='container center'>
                <img className='xmark_' src={blue_x_mark} onClick={()=>setObj_cat()}  />
                <h4>êtes-vous sûr de vouloir supprimer ceci</h4>
                <div  className='book_edit rm center' >

                            <div className='bookD'>
                                <div className='center bx'>
                                    <p className='Index'>nome de categorie <span> : </span>  </p>
                                    <p className='answer'>{obj_cat['title']}  </p>
                                </div>
                            
                                <div className='center  bx'>
                                    <p className='Index'> description <span> : </span>  </p>
                                    <p className='answer'>
                                    {obj_cat['description']}
                                    </p>
                                </div>
                            </div>
                        
                        
                        </div>
                        <button onClick={()=> del_category()}>supprimer </button>
                        </div>
            </div>
        </div>
        :''
        }
        {(delObject) ?
        
            <div className='confirmation center'>
                <div className='msg '>
                    <div className='container center'>
                    <img className='xmark_' src={blue_x_mark} onClick={()=>setDelObject()}  />
                    <h4>êtes-vous sûr de vouloir supprimer ceci</h4>
                    <div  className='book_edit center' >
                                <img className='book_cover' src={backend_url+delObject['cover']}/>
                                <div className='bookD'>
                                    <div className='center bx'>
                                        <p className='Index'>nome de livre <span> : </span>  </p>
                                        <p className='answer'>{delObject['name']}  </p>
                                    </div>
                                    <div className='center  bx'>
                                        <p className='Index'>autheur de livre <span> : </span>  </p>
                                        <p className='answer'>{delObject['author']} </p>
                                    </div>
                                    <div className='center  bx'>
                                        <p className='Index'>prix de PDF <span> : </span>  </p>
                                        <p className='answer'>{delObject['pdfPrice']}  </p>
                                    </div>
                                    <div className='center  bx'>
                                        <p className='Index'>prix en papier <span> : </span> </p>
                                        <p className='answer'>{delObject['paperPrice']} </p>
                                    </div>
                                
                                    <div className='center  bx'>
                                        <p className='Index'> description <span> : </span>  </p>
                                        <p className='answer'>
                                        {delObject['description']}
                                        </p>
                                    </div>
                                </div>
                            
                            
                            </div>
                            <button onClick={()=> delete_book()}>supprimer </button>
                            </div>
                </div>
            </div>
              
        
        :""}
        <nav className='center'>
            <li className={(clicked == 1 )? 'selected':''} onClick={()=>setClicked(1)}>Ajouter un livre </li>
            <li className={(clicked == 2 )? 'selected':''} onClick={()=>setClicked(2)}>categories des livers</li>
            {/* <li className={(clicked == 3 )? 'selected':''} onClick={()=>setClicked(3)}>permission de publier</li> */}
            <li className={(clicked == 5 )? 'selected':''} onClick={()=>setClicked(5)}>Les cours</li>
            <li className={(clicked == 4 )? 'selected':''} onClick={()=>setClicked(4)}>element de site web</li>
            <li className={(clicked == 6 )? 'selected':''} onClick={()=>setClicked(6)}>les quiz</li>
        </nav>
        {
            (clicked == 1 ) ?

            <div className='form'>
            <div className='center'>

            <h1>Ajouter un livre </h1>
            </div>
            <div className='f_box center'>
                <p>Title </p>
                <input value={b_name} onChange={(e)=> setB_name(e.target.value)} />    
            </div>
            <div className='f_box center'>
                    <p>Nom de l’autheur </p>
                    <input value={b_auth} onChange={(e)=> setB_auth(e.target.value)} />    
            </div>
            <div className='f_box center'>
                    <p>couverture du livre</p>
                    
                    <input type='file' id='img_inp'  onChange={(e)=> setB_cover(e.target.files[0])} ref={img_btn} />    
            </div>
            <div className='f_box center'>
                    <p>categories</p>
                    <div onClick={()=>setDrop(!drop)} className='dropDown center'>
                        <p> {(b_category == 0)? '------------' : cate_selected_id() }</p>
                        <img className={(drop ? 'flipv' : '')} src={dropDown}  />
                        {
                            (drop) ?
                                <div className='list center'>
                                    {
                                        data['categories'].map((ob,i)=>
                                           <p className='dropedP' onClick={()=>setB_category(ob['id'])}>{ob['title']}</p>
                                        )
                                    }
                                </div>
                                : ''
                        }
            </div>
            </div>
            <div className='f_box center'>
                    <p>descriptions </p>
                    <textarea value={b_descriptions} onChange={(e)=> setB_descriptions(e.target.value)} />    
            </div>
            <div className='f_box center'>
                <p>prix en PDF </p>
                <input value={b_pdfP} type='number' onChange={(e)=> setB_pdfP(e.target.value)} />    
            </div>
            <div className='f_box center'>
                <p>prix en papier </p>
                <input value={b_pPrice} type='number' onChange={(e)=> setB_pPrice(e.target.value)} />    
            </div>
            <div className='f_box center'>
                    <p>fichier PDF</p>
                   
                    <input type='file' id='img_inp' onChange={(e)=> setB_file(e.target.files[0])} ref={img_btn} />    
            </div>
            <div className='center'>
                <button onClick={()=>add_book()}>Enregister</button>
            </div>


            {
                (data) ?
                    (data['books'].map((ob,i)=> 
                        <div key={i} className={(i%2 ) ? 'book_edit center linear' : 'book_edit center' }>
                            <img className='book_cover' src={backend_url+ob['cover']}/>
                            <div className='controle spacebetween'>
                                <img src={edit} onClick={()=>setBookEdit(ob['id'])} />
                                <img src={trash} onClick={()=>setDelBook(ob['id'])}  />
                            </div>
                            <div className='bookD'>
                                <div className='center bx'>
                                    <p className='Index'>nome de livre <span> : </span>  </p>
                                    <p className='answer'>{ob['name']}  </p>
                                </div>
                                <div className='center  bx'>
                                    <p className='Index'>autheur de livre <span> : </span>  </p>
                                    <p className='answer'>{ob['author']} </p>
                                </div>
                                <div className='center  bx'>
                                    <p className='Index'>prix de PDF <span> : </span>  </p>
                                    <p className='answer'>{ob['pdfPrice']}  </p>
                                </div>
                                <div className='center  bx'>
                                    <p className='Index'>prix en papier <span> : </span> </p>
                                    <p className='answer'>{ob['paperPrice']} </p>
                                </div>
                            
                                <div className='center  bx'>
                                    <p className='Index'> description <span> : </span>  </p>
                                    <p className='answer'>
                                    {ob['description']}
                                    </p>
                                </div>
                            </div>
                        
                        
                        </div>
                    
                    
                    ))
                : ''
            }
        </div>
        : 
        <div>
        {
            ((clicked == 2 ) ? 
            
            <div className='form'>
                <div className='center'>
    
                <h1>Ajouter une liver category</h1>
                </div>
                <div className='f_box center'>
                    <p>Title </p>
                    <input value={C_name} onChange={(e)=>setC_name(e.target.value)} />    
                </div>
                
            
                <div className='f_box center'>
                        <p>descriptions</p>
                        <textarea value={C_desc} onChange={(e)=>setC_desc(e.target.value)} />    
                </div>
                
                <div className='center'>
                    <button onClick={()=>add_category()}>Enregister</button>
                </div>
                <div className='conta center'>
                    {
                        data['categories'].map((ob,i)=>
                            <div  key={i} className='cat_leble'>
                            <div className='controle spacebetween'>
                                        <img src={edit} onClick={()=>setCatIndex(ob['id'])} />
                                        <img src={trash} onClick={()=>setDel_cate_index(ob['id'])}  />
                            </div>
                                <h2>{ob['title']}</h2>
                                <p> {ob['description']} </p>

                            </div>
                        
                        )
                    }
                </div>
            </div>
            : (clicked == 3) ?
            
            <div className='permission center'>
                <h4>les personnes qui demandent la permission de publier <span> des vidéos </span></h4>

                <div className='search spacebetween'>
                    <div></div>
                    <div className='search_box center' > 
                        <input placeholder='recherche'/>
                        <div className='pic_cont center'>
                            <img src={search} />
                        </div>
                    </div>
                </div>
        {
           
                    (Object.keys(data['permission']).length > 0 )?
                    (data['permission'].map((ob,i)=> 
                    
                <div key={i} className={(i%2 == 0)?'profile_users liear  spacebetween':'profile_users spacebetween'}>
                    <div className='center p_box'>
                        <div className='pic center'>  
                            <img src={backend_url+ob['picture']} />
                        </div>
                        <p>{ob['name']}</p>
                        <p>{ob['job']}</p>
                       
                    </div>
                    <div className='center p_box'>
                        <button className='allow' onClick={()=>handel_accept(ob['id'])} >Autoriser</button>
                        <button onClick={()=>handel_refuse(ob['id'])} className='deni center'>
                            <img src={white_x_marque} />
                        </button>
                    </div>
                </div>
                    ))
                    : <div className='null center'>
                        <p> Aucun utilisateur ne demande la permission </p>
                    </div>
                
           
        }
        <h4>les personnes qui demandent la permission de publier <span> des vidéos </span></h4>

        <div className='search spacebetween'>
            <div></div>
            <div className='search_box center' > 
                <input placeholder='recherche'/>
                <div className='pic_cont center'>
                    <img src={search} />
                </div>
            </div>
        </div>
        {
   
             (Object.keys(data['users']).length > 0 )?
            (data['users'].map((ob,i)=> 
            
        <div key={i} className={(i%2 == 0)?'profile_users liear  spacebetween':'profile_users spacebetween'}>
            <div className='center p_box'>
                <div className='pic center'>  
                    <img src={backend_url+ob['picture']} />
                </div>
                <p>{ob['name']}</p>
                <p>{ob['job']}</p>
                <p>{ob['video_nb']} video <span> |  </span>{ob['playlist_nb']} playlist </p>
            
            </div>
            <div className='center p_box'>

                <button onClick={()=>prof_rm_perm(ob['profile_id'])} className='deni center'>
                    <img src={white_x_marque} />
                </button>
            </div>
        </div>
            ))
            : <div className='null center'>
                        <p> Aucun utilisateur ne demande la permission </p>
            </div>

      
        }
            </div> : (clicked == 4) ? 
            <div className='form page'>
                
                <div className='f_box cover '>
                    <div className='pic center'>
                        <img src={backend_url+data['picture']} />
                    </div>
                    <input type='file' id='img_inp'  onChange={(e)=> setPicture(e.target.files[0])} ref={img_btn} />    

                </div>
                <div className='f_box center'>
                        <p>que voulez-vous que les gens sachent sur vous</p>
                        <textarea value={profile_desc} onChange={(e)=>setProfile_desc(e.target.value)} />    
                </div>
                <div className='f_box center'>
                    <p>lien chaine youtube </p>
                    <input value={link_youtube}  onChange={(e)=> setlink_youtube(e.target.value)} />    
                </div>
                <div className='f_box center'>
                    <p>lien facebook</p>
                    <input value={link_facebook} onChange={(e)=> setfacebook(e.target.value)} />    
                </div>
                <div className='f_box center'>
                    <p>lien instagram</p>
                    <input value={link_Instagram}  onChange={(e)=> setInstagram(e.target.value)} />    
                </div>
                <div className='f_box center'>
                    <p>numero whatsapp</p>
                    <input value={link_whatsapp}  onChange={(e)=> setwhatsapp(e.target.value)} />    
                </div>
                <div className='f_box center'>
                    <p>Compte gmail </p>
                    <input value={link_gmail}  onChange={(e)=> setgmail(e.target.value)} />    
                </div>
                <div className='center'>
                    <button onClick={()=>setLinks()} >Enregister</button>
                </div>
            </div>
            :(clicked == 5) ?
            <div className='form page'>
                
                <div className='f_box center'>
                    <p>Nom de categorie</p>
                    <input value={cat_page_name}  onChange={(e)=> set_cat_page_name(e.target.value)} />    
                </div>
                <div className='f_box center'>
                    <p>Description</p>
                    <textarea value={cat_page_desc}  onChange={(e)=> set_cat_page_desc(e.target.value)} />    
                </div>
                <div className='center'>
                    <button onClick={()=>add_page_cat()}  >Enregister</button>
                </div>

                <div className='center'>
                { 
                    (data['pages_cat'].map((om , k )=>
                    
                        <div className='pages_container' key={k}>
                            <div className='head_ spacebetween'>
                                <p>{om['category']['name']}</p>
                                <div className='btn center'>
                                    <img src={edit} onClick= {()=>handel_edit_cat_page(om)} />  
                                    <img src={trash} onClick={()=>handle_delete_cat_page(om['category']['id'])} />
                                </div>
                            </div>
                            <div className='pages'>
                                {
                                    om['pages'].map((ok , j)=>       
                                        <div className='pagesBox spacebetween' key={j}>
                                                <p className='pageTitle'>{ok['name']} </p>
                                                <div className='btn center'>
                                                    <img src={edit} onClick={()=>handel_set_edite_page(ok)} />  
                                                    <img src={trash} onClick={()=>handle_delete_page(ok['id'])} />
                                                </div>
                                        </div>
                                    )
                                }

                                

                            </div>
                                
                            <div className='add_btn_page center' onClick={()=>add_new_page()}  >
                                <img src={add_new_icon} />
                                <p>Ajouter une page</p>
                            </div>

                        </div>
                    ))
                }

                </div>
            </div>
            : (clicked == 6) ?
                <div className='form page '>
                    {
                        (quiz_location == 1 )?
                            <div className='quizSection center'>
                                <h3>Quiz à corriger</h3>
                                <div className='line center active_line first_line'>
                                    <div className="box center"> Utilisateur </div>
                                    <div className="box center"> Titre de page </div>
                                    <div className="box center"> Nom de la page  </div>
                                    <div className="box center">  </div>
                                    
                                </div>
                                    {
                                        data['quizes'].map((os, s)=>
                                            <div className='line center' key={s}>
                                                <div className="box center fs"> 
                                                    <div className='cover'>
                                                        <img className='profile_pic' src={backend_url+os['cover']} />
                                                    </div>
                                                    <p className='username'>{os['name']}</p>
                                                </div>
                                                <div className="box center"> {os['page_title']}</div>
                                                <div className="box center"> {os['quiz_name']}</div>
                                                <div className="box center"> <img className='pointer' onClick={()=>see_user_answer(os)} src={leftArrow} /> </div>
                                                
                                            </div>
                                        )
                                    }
                            </div>
                        : (quiz_location == 2 )?
                        <div className='correct_quiz quizSection center'>
                            <div className='line center'>
                                            <div className="box center"> 
                                                    <img onClick={()=>setQuiz_location(1)} src={leftArrow}  className='flipH pointer returnBtn' />
                                             </div>                    
                                                <div className="box center fs"> 
                                                    <div className='cover'>
                                                        <img className='profile_pic' src={backend_url+quiz_obejct?.['cover']} />
                                                    </div>
                                                    <p className='username'>{quiz_obejct?.['name']}</p>
                                                </div>
                                                <div className="box center"> {quiz_obejct?.['page_title']}</div>
                                                <div className="box center"> {quiz_obejct?.['quiz_name']}</div>
                            </div>
                            {
                                quiz_obejct?.['ques'].map((ok,k)=>
                                <>
                                    
                                    <div onClick={()=>set_question_index(k+1)} className='v_cor spacebetween' key={k}>
                                        <div className='center'>
                                            <img className={(question_index == k+1)? 'dropDown flipv' : 'dropDown' } src={dropDown} />
                                            <p>{ok['question']}</p>
                                        </div>
                                        <div className='cicle center'>
                                            <img src={check_linear} />
                                        </div>
                                    </div>
                                    {
                                        (question_index == k+1) ?
                                        <div className='answer center' >
                                            <img src={grey_x_mark} className='grey_x_mark' onClick={()=>set_question_index(0)} />
                                            <div className='rt center'>
                                                <h4>user answer is :</h4>
                                                <p>
                                                    {ok['answer']}
                                                    </p>
                                            </div>
                                        <textarea onChange={(e)=>set_comment(e.target.value)}  value={comment}  />
                                        <button onClick={()=>handle_correcting_question(ok)} >Enregister</button>
                                        </div>
                                        : ''
                                    }
                                </>
                                )
                            }
                           
                        </div>
                        : ''
                    }
                    
                </div>
            : ''
            )
        }
        </div>
        }
        
    </div>
    :<div className='Admin worning center'>
        <img src={team_page}  />  
        <p>Cette page est uniquement réservée aux administrateurs</p>
    </div>
  )
}

export default Admin