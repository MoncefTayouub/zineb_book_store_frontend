import React , {useState , useEffect} from 'react'
import x_mark from '../icons/x_mark.svg'
import whatsapp_linear from '../icons/whatsapp_linear.svg'
import insta_linear from '../icons/insta_linear.svg'
import facebook_linear from '../icons/facebook_linear.svg'
import axios from 'axios'
import Cookies from 'universal-cookie' ;
import jwt from 'jwt-decode' 
import changeDir from '../icons/changeDir.svg'
import whitelogo from '../icons/whitelogo.svg'
import profile_logo from '../icons/profile_logo.svg'
import hello_word_icon from '../icons/hello_word_icon.png'
import blue_x_mark from '../icons/blue_x_mark.svg'
import eyeOpen from '../icons/eyeOpen.svg'
import eyeClosed from '../icons/eyeClosed.svg'
import {useNavigate} from 'react-router-dom';



function UpPage({createProf , setCreateProf ,content , setContent ,contact , setContact,userLogin,setUserLogin, resp , setResp }) {

// -------------------error message ------------------

    const [errorMessage , setErrorMessage] = useState(false)
// 1 --- login : email incorect 
// 2 --- login : password incorect 
// 3 --- sign : email forma incorect 
// 4 --- sign  : incorect confirmation password  
// 5 ---  sign : full name is empty  
// 6 ---  sign : password is empty  
// 7 ---  sign : email is empty  
// 8 ---  sign : email existe
// 9 ---  change password : current password incorect
// 10 ---  change password : confirmation password incorrect
    // ----------- see password -------------

const [seePassword , setSeePassword] = useState(false)

//  --------------- edit password ------------------
const [currentPass , setCurrentPass] = useState('')
const [newPass , setNewPass] = useState('')
const [confNewPass , setconfNewPass] = useState('')



const UpdateUser =  async() => {
    const jwt = localStorage.getItem('jwt_auth')
    const dataL = new FormData();
    dataL.append('curr_password',currentPass);
    dataL.append('jwt',jwt);
    dataL.append('new_password',newPass);
      await axios ({
        method : 'post' , 
        url : 'http://127.0.0.1:8000/profile/updatekey' ,
        data : dataL
    })
    .then((response)=>{
        if (response.data == 1 ) {
            setContact(false)
        }
        if (response.data == -1) {
            setErrorMessage(9)
            console.log('incorrect password')
        }
    
    }) .catch(function (error) {
        console.log(error)
    });
}


// -------------------------------------
    var con = <div></div>

    const [name, nameSet] = useState('')
    const [password, SetPassword] = useState('')
    const [passwordConf, SetPasswordConf] = useState('')
    const [email, SetEmail] = useState('')

  const clearAllInp = ()=> {
    nameSet('')
    SetPassword('')
    SetEmail('')
  }


const login = async()=> {
    const DataForm= new FormData();
    DataForm.append('email' , email)
    DataForm.append('password' , password)
    await axios ({
        method : 'post' , 
        url : 'http://127.0.0.1:8000/login/' ,
        data : DataForm
    })
    .then((response)=>{
        if (response.data == 0) {
            setErrorMessage(2)
            console.log('password incorect ')
        }
        if (response.data == -1) {
            setErrorMessage(1)
            console.log('email incorect')
        }else {

            if (response.data != 0 ){
                localStorage.setItem('jwt_auth', response.data.token )
                localStorage.setItem('loged', true)
                setUserLogin(true)
                  clearAllInp()
                setContact(false)
                window.location.reload(true)
            }
        
           
        }
    }) .catch(function (error) {
        console.log(error)
      });
}

useEffect (()=> {
    var validRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email.match(validRegex)==null && email != '' ) {
        setErrorMessage(3)
    }else {
        setErrorMessage(false)
        
    }
},[email])
console.log(confNewPass)
useEffect(()=> {
    if (newPass.match(confNewPass) ==null && confNewPass != ''   ) {
        setErrorMessage(10)
    }else {
        setErrorMessage(false)
        
    }
},[confNewPass])

useEffect(()=> {
    if (passwordConf.match(password) ==null && passwordConf != ''   ) {
        setErrorMessage(4)
    }else {
        setErrorMessage(false)
        
    }
},[passwordConf])

const sign = async()=> {  
    console.log('siging')

    if (errorMessage == false && name != '' && email != '' && password != '' ) {
        console.log('me')
        const DataForm= new FormData();
        DataForm.append('name' , name)
        DataForm.append('password' , password)
        DataForm.append('email' , email)
        await axios ({
            method : 'post' , 
            url : 'http://127.0.0.1:8000/sign/' ,
            data : DataForm
        })
        .then((response)=>{
            if (response.data == 1) {
                setContent('log')
                clearAllInp()
            }else {
                console.log(response.data)
            }
            if (response.data == -1) {
                setErrorMessage(8)
            }
        }) .catch(function (error) {
            console.log(error)
          });
    }else {
        if (email == ''){
            setErrorMessage(7)
        }
        if (password == ''){
            setErrorMessage(6)
        }
        if (name == ''){
            setErrorMessage(5)
        }
    }


}

// ------------------- ask permission -------------- 
const send_permission_req =async()=> {
    const jwt = localStorage.getItem('jwt_auth')
    const DataForm= new FormData();
    DataForm.append('jwt' , jwt)
    await axios ({
        method : 'post' , 
        url : 'http://127.0.0.1:8000/set_permission/' ,
        data : DataForm
    })
    .then((response)=>{

        if (response.data == 0) {
            setContent('profile')
        }else {
            setResp(response.data)
            setContact(true)
            setContent('waiting')

        }
    }) .catch(function (error) {
        console.log(error)
      });
}

// ------------------ register profile ------------

const [picture , setPicture] = useState('')
const [job , setJob] = useState('')
const [desc , setDesc] = useState('')


const userRegProf =async()=> {
    const jwt = localStorage.getItem('jwt_auth')
    const DataForm= new FormData();
    DataForm.append('picture' , picture)
    DataForm.append('jwt' , jwt)
    DataForm.append('desc' , desc)
    DataForm.append('job' , job)

    await axios ({
        method : 'post' , 
        url : 'http://127.0.0.1:8000/profile_register/' ,
        data : DataForm
    })
    .then((response)=>{
        if (response.data == 1) {
            setContent('log')
        }
    }) .catch(function (error) {
        console.log(error)
      });


    setContact(true)
    setContent('ask_permission')
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

console.log(windowWidth)

    // ------------backg ------------
switch (content){
    case 'contact' :
        con = <div className='contanctSection center'>
            <img className='xmark' src={x_mark} onClick={()=>{setContact(false);setContent('contact')}} />
            <div className='email center'>
                    <div className='box'> 
                        {/* <p>Nom</p> */}
                        <input placeholder='Nom' onChange={(e)=>nameSet(e.target.value)} value={name} />
                    </div>
                    <div className='box'> 
                        {/* <p>Email</p> */}
                        <input placeholder='Email'  />
                    </div>
                    <div className='box'> 
                        {/* <p>Sujet</p> */}
                        <input placeholder='Sujet' />
                    </div>     
                    <div className='box'> 
                        {/* <p>Message</p> */}
                        <textarea placeholder='Message' />
                    </div>
                    <button >Envoyer</button>
                </div>
                <div className='attraction '>
                    <div className='textarea center'>
                        <h5>Bienvenue! Merci de nous avoir contactés.</h5>
                        <p>
                        Comment pouvons-nous vous aider aujourd'hui ? Y a-t-il une question ou une préoccupation spécifique que vous aimeriez aborder, ou y a-t-il autre chose dont vous aimeriez discuter ? Veuillez me le faire savoir et je ferai de mon mieux pour vous aider.
                        </p>
                    </div>
              
                    {
                        (windowWidth > 600) ?
                                <> 
                                    <h6>Suivez-nous dans :</h6>
                                    <div className='follow center'>
                                        <a href=''><img src={facebook_linear} /></a>
                                        <a href=''><img src={insta_linear} /></a>
                                        <a href=''><img src={whatsapp_linear} /></a>
                                    </div>
                                </>
                        : ''
                    }
                </div>
             </div>
             break ;



             case 'sign' :
                con = <div className='contanctSection center'>
                    <img className='xmark' src={x_mark} onClick={()=>{setContact(false);setContent('contact')}} />
                    <div className='email center'>
                            <div className='box'> 
                                {/* <p>nom et prénom</p> */}
                                <div className={(errorMessage == 5) ? 'inputPack center' : ''}>
                                    <input placeholder='nom et prénom' onChange={(e)=>nameSet(e.target.value)} value={name}  />
                                    <p className='messaage'>veuillez saisir votre nome et prénom </p>
                                </div>
                            </div>
                            <div className='box'> 
                                {/* <p>Email</p> */}
                                <div className={(errorMessage == 3 || errorMessage == 7 || errorMessage == 8 ) ? 'inputPack center' : ''}>
                                    <input placeholder='Email' onChange={(e)=>SetEmail(e.target.value)} value={email} />
                                    <p className='messaage'>{(errorMessage == 7 )?'veuillez saisir un e-mail':(errorMessage == 8) ? "l'email existe déjà" :"Format d'e-mail incorrect"}</p>
                                </div>

                            </div>
                            <div className='box'> 
                                <img className='eyes' onClick={()=>setSeePassword(!seePassword)} src={seePassword ? eyeOpen : eyeClosed} />
                                {/* <p>Mode de pass</p> */}
                                <div className={(errorMessage == 6) ? 'inputPack center' : ''}>
                                    <input placeholder='Mode de pass' type={seePassword ? 'text' : 'password'} onChange={(e)=>SetPassword(e.target.value)} value={password} />
                                    <p className='messaage'>veuillez saisir un mot de passe</p>
                                </div>
                            </div>     
                            <div className='box'> 
                            <img className='eyes' onClick={()=>setSeePassword(!seePassword)} src={seePassword ? eyeOpen : eyeClosed} />
                                {/* <p>Confirmer mode de pass</p> */}
                                <div className={(errorMessage == 4) ? 'inputPack center' : ''}>
                                    <input placeholder='Confirmer mode de pass' onChange={(e)=>SetPasswordConf(e.target.value)} value={passwordConf} type={seePassword ? 'text' : 'password'} />
                                    <p className='messaage'>le mot de passe ne correspondait pas</p>
                                </div>
                            </div>
                            <div className='box link'> 
                                
                                <a onClick={()=>{setContact(true);setContent('log')}}>vous avez déjà un compte</a>
                            </div>
                           
                            <button onClick={()=>sign()} >S'inscrire</button>
                        </div>
                        <div className='attraction '>
                            <div className='textarea center'>
                                <h5>Bienvenue dans notre librairie en ligne!</h5>
                                <p>
                                Nous sommes heureux que vous ayez choisi de vous inscrire pour devenir membre de notre communauté de lecteurs passionnés.
                                </p>
                            </div>
                            {
                                (windowWidth > 600) ?
                                        <> 
                                            <h6>Suivez-nous dans :</h6>
                                            <div className='follow center'>
                                                <a href=''><img src={facebook_linear} /></a>
                                                <a href=''><img src={insta_linear} /></a>
                                                <a href=''><img src={whatsapp_linear} /></a>
                                            </div>
                                        </>
                                : ''
                            }
                        </div>
                     </div>
                     break ;



                     case 'log' :
                        con = <div className='contanctSection center'>
                            <img className='xmark' src={x_mark} onClick={()=>{setContact(false);setContent('contact')}} />
                            <div className='email center'>
                                    <div className='box'> 
                                        <p>email</p>
                                        <div className={(errorMessage == 1) ? 'inputPack center' : ''}>
                                            <input onChange={(e)=>SetEmail(e.target.value)} value={email}/>
                                            <p className='messaage'>Adresse Email incorrecte</p>
                                        </div>
                                    </div>
                                    <div className='box'> 
                                    <img className='eyes' onClick={()=>setSeePassword(!seePassword)} src={seePassword ? eyeOpen : eyeClosed} />
                                        <p>Mode de pass</p>
                                        <div className={(errorMessage == 2) ? 'inputPack center' : ''}>
                                            <input type={seePassword ? 'text' : 'password'} onChange={(e)=>SetPassword(e.target.value)} value={password} />
                                            <p className='messaage'>Mode de pass incorrecte</p>

                                        </div>
                                    </div>
                                    <div className='box link'> 
                                        <a onClick={()=>{setContact(true);setContent('sign')}}>vous n'avez pas de compte</a>
                                    </div>  
                                    <button onClick={()=>login()} >Se connecter</button>
                                    
                                    
                                </div>
                                <div className='attraction '>
                                    <div className='textarea center'>
                                        <h5>Bienvenue dans notre librairie en ligne!</h5>
                                        <p>
                                        Nous sommes heureux que vous ayez choisi de vous inscrire pour devenir membre de notre communauté de lecteurs passionnés.
                                        </p>
                                    </div>
                                    {
                                        (windowWidth > 600) ?
                                                <> 
                                                    <h6>Suivez-nous dans :</h6>
                                                    <div className='follow center'>
                                                        <a href=''><img src={facebook_linear} /></a>
                                                        <a href=''><img src={insta_linear} /></a>
                                                        <a href=''><img src={whatsapp_linear} /></a>
                                                    </div>
                                                </>
                                        : ''
                                    }
                                </div>
                             </div>
                             break ;
                             case 'changePassword' :
                                con = <div className='contanctSection center'>
                                <img className='xmark' src={blue_x_mark} onClick={()=>{setContact(false);setContent('contact')}} />

                                    <div className='blue center'>
                                            <img src={whitelogo} />
                                            <p>EL Kadri Zineb </p>

                                    
                                    </div>
                                    <div className='container gazaline  center'>
                                    
                                       <div className='email center'>
                                        <div className='box current'> 
                                            <img className='eyes' onClick={()=>setSeePassword(!seePassword)} src={seePassword ? eyeOpen : eyeClosed} />
                                            <p>Actuelle Mode de pass</p>
                                            <div className={(errorMessage == 9) ? 'inputPack center' : ''}>
                                                <input type={seePassword ? 'text' : 'password'} onChange={(e)=>setCurrentPass(e.target.value)} value={currentPass} />
                                                <p className='messaage'>veuillez saisir un mode de passe correct </p>

                                            </div>
                                        </div> 
                                        <div className='box'> 
                                            <img className='eyes' onClick={()=>setSeePassword(!seePassword)} src={seePassword ? eyeOpen : eyeClosed} />
                                            <p>Nouveau mot de passe</p>
                                            <input type={seePassword ? 'text' : 'password'} onChange={(e)=>setNewPass(e.target.value)} value={newPass} />
                                        </div> 
                                        <div className='box'> 
                                            <img className='eyes' onClick={()=>setSeePassword(!seePassword)} src={seePassword ? eyeOpen : eyeClosed} />
                                            <p>Confirmation Mode de passR</p>
                                            <div className={(errorMessage == 10) ? 'inputPack center' : ''}>
                                            <input type={seePassword ? 'text' : 'password'} onChange={(e)=>setconfNewPass(e.target.value)} value={confNewPass} />
                                            <p className='messaage'>le mot de passe ne correspondait pas</p>

                                            </div>
                                        </div> 
                                        <button onClick={()=>UpdateUser()} >Enregister</button>

                                        </div>
                                        <div className='to_next spacebetween'>
                                            <div></div>
                                        
                                            <div className='follow center'>
                                                <a href=''><img src={facebook_linear} /></a>
                                                <a href=''><img src={insta_linear} /></a>
                                                <a href=''><img src={whatsapp_linear} /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                break ;
                            case 'profile' :
                                   con = <div className='contanctSection center'>
                                    <img className='xmark' src={blue_x_mark} onClick={()=>{setContact(false);setContent('contact')}} />

                                        <div className='blue center'>
                                                <img src={whitelogo} />
                                                <p>EL Kadri Zineb </p>

                                        
                                        </div>
                                        <div className='container email center'>
                                            <img className='pic_user' src={profile_logo} />
                                            <input type='file' onChange={(e)=>setPicture(e.target.files[0])} />   
                                        
                                            <div className='box center'>
                                                <p>Profession</p>
                                                <input onChange={(e)=> setJob(e.target.value) } value={job}  />
                                            </div>
                                            <div className='box center'> 
                                                <p>Dites-nous à propos de vous</p>
                                                <textarea onChange={(e)=> setDesc(e.target.value) } value={desc}  />
                                            </div>
                                            <div className=' to_next spacebetween'>
                                                <div></div>
                                                <div className='next center' onClick={()=>userRegProf()}>
                                                    <p>suivant</p>
                                                    <img className='flipH' src={changeDir} />
                                                </div>
                                            </div>
                                            <div className='to_next spacebetween'>
                                                <div></div>
                                            
                                                <div className='follow center'>
                                                    <a href=''><img src={facebook_linear} /></a>
                                                    <a href=''><img src={insta_linear} /></a>
                                                    <a href=''><img src={whatsapp_linear} /></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                break;
                            case 'ask_permission' :
                                con = 
                                <div className='contanctSection center'>
                                <img className='xmark' src={blue_x_mark} onClick={()=>{setContact(false);setContent('contact')}} />

                                        <div className='blue center'>
                                                <img src={whitelogo} />
                                                <p>EL Kadri Zineb </p>
                                        </div>
                                        <div className='container email center'>

                                           <img className='welcome' src={hello_word_icon} />
                                           <p className='text'>
                                           Vous cherchez une opportunité de faire partie d'une équipe de personnes dévouées et passionnées? Cherchez pas plus loin! Nous recherchons actuellement des personnes talentueuses et motivées pour se joindre à notre équipe.
                                            Faire partie de notre équipe, c'est faire partie d'un groupe dynamique et diversifié d'individus qui travaillent tous vers un objectif commun. Nous croyons que les membres de notre équipe sont la clé de notre succès et nous nous efforçons de créer un environnement favorable et inclusif où chacun peut s'épanouir.
                                           </p>
                                           <button className='perm_btn' onClick={()=>send_permission_req()}>Passer la demande</button>
                                        <div className='to_next spacebetween'>
                                                <div></div>
                                            
                                                <div className='follow center'>
                                                    <a href=''><img src={facebook_linear} /></a>
                                                    <a href=''><img src={insta_linear} /></a>
                                                    <a href=''><img src={whatsapp_linear} /></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            break ;
                            case 'waiting' : 
                            con = 
                            <div className='contanctSection center'>
                            <img className='xmark' src={blue_x_mark} onClick={()=>{setContact(false);setContent('contact')}} />

                                    <div className='blue center'>
                                            <img src={whitelogo} />
                                            <p>EL Kadri Zineb </p>
                                    </div>
                                            {
                                                (resp) ?
                                                <div className='container all_center center'>
                                                        <div className='profile_stage spacebetween'>
                                                            <div className='hold center' >
                                                                <img src={'http://127.0.0.1:8000/'+resp['picture']} />
                                                            </div>
                                                                <p>{resp['full_name']}</p>
                                                                <p>{resp['job']}</p>
                                                        </div>
                                                        <p className='text'>Nous avons bien reçu votre demande et nous nous assurerons de la traiter dans les plus brefs délais. Un membre de notre équipe s'occupera de votre demande et vous recevrez une réponse ici et par courriel.</p>
                                                        <div className=' to_next spacebetween'>
                                                            <div></div>
                                                            <div className='next center' onClick={()=>setContact(false)}>
                                                                <p>la page d'accueil</p>
                                                                <img className='flipH' src={changeDir} />
                                                            </div>
                                                        </div>
                                                </div>
                                                : <div className='container all_center center'></div>
                                            }
                                    
                                </div>
                            break ;
                            case 'shop' :
                                con = 
                                <div className='contanctSection pannier center'>
                                    <img className='xmark' src={blue_x_mark} onClick={()=>{setContact(false);setContent('contact')}} />
                                    <div className='cartNumber'>
                                        <p>Numéro de panier</p>
                                        <input placeholder='000 000 000 000 000 000' />
                                    </div>
                                    <div className='spacebetween'>
                                        <div className='box'>
                                            <p>Date d'expiration</p>
                                            <input placeholder='MM/JJ' />
                                        </div>
                                        <div className='box'>
                                            <p>cvc/cvv</p>
                                            <input placeholder='*****' type='password' />
                                        </div>
                                    </div>
                                    <button >Commander</button>
                                </div>
}
 
  return (
    <div className='UpPage'>
        {
            con
        }
    </div>
  )
}

export default UpPage