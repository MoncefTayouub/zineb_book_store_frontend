

import React , {useEffect , useState} from 'react'
import YouTube from 'react-youtube';
import satic_img from '../icons/satic_img.svg'
import photo_kadri_zineb from '../img/photo_kadri_zineb.jpg'
import dropDown from '../icons/dropDown.svg'
import blue_x_mark from '../icons/blue_x_mark.svg'
import {useParams } from "react-router-dom"
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import leftArrow from '../icons/leftArrow.svg'
import changeDir from '../icons/changeDir.svg'
import add_linear from '../icons/add_linear.svg'
import well_done from '../icons/well_done.svg'
import jwt from 'jwt-decode' 

function About_us() {
    const params = useParams() ;
    const backend_url = 'https://moncefwitcher.pythonanywhere.com/'
    const redirect = (index)=> {

      window.location.href = `/renderpage/${index}`;
     
    }



    const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 1,
  },
};


const styles = ['h1','h2','para','puce','table'  , 'questionnaire' ,'link_youtub' , 'image' , 'document']
const [update,setUpdate] = useState(false)

// --------------- passing the test --------------------------

    const [passQuiz , setPassQuiz ] = useState(false)

    const handel_set_quiz = ()=> {
        if (passQuiz) {
            document.body.style.overflow = 'auto'
            setPassQuiz(false)
            set_page_index(1)
        }else {
            setPassQuiz(true)
            set_page_index(1)
            window.scrollTo(0, 0);
            document.body.style.overflow = 'hidden';
        }
    }

    const [text , setText] = useState ()
    const [quiz_answers , set_quiz_answers ] = useState()
    const [comments_pack , set_comments_pack] = useState()
    const [side_table , set_side_table] = useState()

    const [data , setDate] = useState()
    useEffect(()=>{
        getData();
      },[])    
      let getData = async () => {

        let respons = await fetch (`${backend_url}/about_page`)
        let data = await respons.json()
        setText(data['content'])
      }


    const downloadPDF = (url) => {
        window.open(url, "_blank");
      };

    //   ------------- set quiz ------------------
    const [quize_ob , set_quize_ob] = useState()

    useEffect (()=> {
        set_quize_ob([text?.[passQuiz-1],passQuiz-1])
    },[passQuiz])

    const [page_index , set_page_index] = useState(1)
    const [question , setQestion ] = useState()
    
    // ------------- handel quiz type --------------
    const handle_set_historic_user_answer = (Q_index , index)=> {
      let the_line = -1 
      let return_respo = null
      console.log(quiz_answers)
      if (question && quiz_answers &&quize_ob ){       
        the_line =  quize_ob?.[1]
        quiz_answers.map((ob,i)=>{
            if(ob['line']==the_line) {
              ob['answer'].map((oc,j)=>{

                if (oc['q_index'] == index) {
                  return_respo =  oc['answer']
                }
              })
            }
        })
    }
     return return_respo
    }
    const select_quiz_type = (type,Q_index,index)=> {

        if (type ){
            set_page_index(3)
        }else {
            set_page_index(4)
        }
        let user_answer = handle_set_historic_user_answer (Q_index , index) ;
        if (user_answer != null) {
          Q_index['user_answer'] = user_answer
        }
        console.log(Q_index , index)     
        setQestion([Q_index,index])  

    }


    const handle_user_answer =(answer)=> {
      let existe = false 
      user_answers.map((ob,i)=>{
        if (ob['q_index'] == question[1]) {
          existe = i+1 
        }
      })
      if (existe) {
        user_answers[existe-1]['answer'] = answer 
      }else {
        
        user_answers.push({
          'q_index' : question[1] ,
          'answer' : answer ,
          'result' : -1 ,
          'comment' : '' ,
        })  
      }
      set_user_answers ([...user_answers])
    }

    const handel_seting_user_answer =(k)=> {
      
      handle_user_answer(k)
      

        question[0]['user_answer'] = k
        setQestion([...question])
        text[quize_ob[1]]['content']['list'][question[1]]['user_answer'] = k
        setText([...text])

    }


    // ---------------- handle page indexing -----------------

    const [question_index , set_question_index] = useState([-1,-1])

    useEffect(()=>{
      let line_text = text?.[quize_ob?.[1]]['content']['list']
        set_question_index([line_text?.length,question?.[1]])
    },[question])


    const set_question_by_index = (index)=> {
      let the_queston = quize_ob?.[0]['content']?.['list'][index]
      let type = the_queston?.['type']
      select_quiz_type (type,the_queston,index)
      
    }
    const set_handle_indexing = (direction)=> {

      if (direction) {
          if (question_index[0]-1 > question_index[1]) {
            set_question_by_index(question_index[1]+1)
          }
        }else {
          if (0 < question_index[1]){
            set_question_by_index(question_index[1]-1)
          }
        }
    }

    // ---------------- quiz question and response --------------------
    const [Q_R_answer , set_Q_R_answer ] = useState('')

   
    
    //  -------- user answer output ------------------
    const handle_user_answer_output = ()=> {

    }



    // -------- register user quiz ------------
    const [user_answers , set_user_answers ] = useState([])


    const handle_user_taking_quiz =async()=> {
      const jwt = localStorage.getItem('jwt_auth')

      
      if (jwt != null) {
        
        const dataL = new FormData();
        dataL.append('jwt', jwt);
        dataL.append('page', params.id);
        dataL.append('line', quize_ob?.[1] );
        dataL.append('answers', JSON.stringify(user_answers) );
  
        await axios ({
            method : 'post' , 
            url : '${backend_url}/register_quiz_answers' ,
            data : dataL
        })
        .then((response)=>{
            console.log(response.data)
            
           
        }) .catch(function (error) {
            console.log(error)
          });
      }
  }

  // ------ save comment  -------------
  const [comment , setComment ] = useState ('')



 






    return (
    <div className='PageTemplate center'>
        {
            (passQuiz ) ? 
            <div className='passing_theTest center'>
                
      {
        (page_index == 1 ) ?
            <div className='container center'>
            <img className='x_mar' onClick={()=>handel_set_quiz()}   src= {blue_x_mark} />
            <div className='inputSection center'>
            <div className='headline_container '>
                 <h3 className='text_color'>{quize_ob?.[0]?.['content']['title']}</h3>
             </div>
               </div>
            <div className='hdeader spacebetween'> 
                <p>les questions de ce  questionnaire </p>
                <div className=''>

                </div>
            </div>
            <div className='question_container '>
              {(quize_ob?.[0]?.['content']['list'].length ) ?
                quize_ob?.[0]?.['content']['list'].map((oc , c)=>
                
                    <div className='question spacebetween' key={c}>
                      <p onClick={()=>select_quiz_type(oc['type'],oc,c)} > {oc['question']} </p>
                      <div className='btns spacebetween'>

                      </div>
                    </div>
                )
              
              :  <div className='question center'>
              <p>make sure to insert a question </p>
            </div>
              }

          
            </div>
            <button onClick={()=>handel_set_quiz()} >passe le maintenant</button>

        </div>
      
        : (page_index == 2 ) ?
        <div className='container center'>
        
      </div> 

        : (page_index == 3 ) ?
        <div className='container center fsd_column'>
            <img className='x_mar' onClick={()=>handel_set_quiz()}   src= {blue_x_mark} />
            <img src={leftArrow} className ='return flipH' onClick={()=>set_page_index(1)}  />

            <div className='question_headline'>
                 <h4 className=''>{question?.[0]['question']}</h4>
            </div>
              
          <div className='options'>
                {
                question?.[0]['options']?.map((ok,k)=>
                      <div className='box center' key={k} onClick={()=>handel_seting_user_answer(k)} >
                        <div  className={(question[0]['user_answer'] == k)? 'circle active' : 'circle'}    ></div>
                        <p className=''  > {ok}  </p>
                    </div>
                  )
                }
          </div>

                <div className='page_location spacebetween'>
                  
                  {
                      ( 0 == question_index[1]) ?
                        <div className='prev center'>
                        
                        </div>
                      : 
                      <div className='prev center' onClick={()=>set_handle_indexing(0)}>
                           <img src={changeDir} />
                           <p className='text_color'>précédent</p>
                    </div>
                    }
                  <div className='dots_circls center'>
                    {
                      quize_ob?.[0]['content']['list'].map((ok , k)=>
                          <div onClick={()=>set_question_by_index(k)} className={(question?.[1]==k)? 'circle current' : 'circle'} key={k}></div>
                      )
                    }
                 
                  </div>
                  {
                      (question_index[0]-1 == question_index[1]) ?
                        <div className='prev center'>
                            <p className='text_color' onClick={()=>handle_user_taking_quiz()} >terminer le quizz</p>
                        </div>
                      : 
                      <div className='prev center' onClick={()=>set_handle_indexing(1)}>
                            <p className='text_color'>suivant</p>
                            <img src={changeDir} className='flipH' />
                    </div>
                    }
                </div>

        </div>

        : (page_index == 4 ) ?
            <div className='container center fsd_column'>
               <img className='x_mar' onClick={()=>handel_set_quiz()}   src= {blue_x_mark} />
            <img src={leftArrow} className ='return flipH' onClick={()=>set_page_index(1)}  />
        
            <div className='question_headline'>
                 <h4 className=''>{question?.[0]['question']}</h4>
            </div>
            <textarea onChange={(e)=>handel_seting_user_answer(e.target.value)} value={question?.[0]['user_answer']} className='respons_input_Q' placeholder='Insérer la bonne reponse ....'   />

              
            <div className='page_location spacebetween'>
                  
                  {
                      ( 0 == question_index[1]) ?
                        <div className='prev center'>
                        
                        </div>
                      : 
                      <div className='prev center' onClick={()=>set_handle_indexing(0)} >
                           <img src={changeDir} />
                           <p className='text_color'>précédent</p>
                    </div>
                    }
                  <div className='dots_circls center'>
                    {
                      quize_ob?.[0]['content']['list'].map((ok , k)=>
                          <div onClick={()=>set_question_by_index(k)} className={(question[1]==k)? 'circle current' : 'circle'} key={k}></div>
                      )
                    }
                 
                  </div>
                  {
                      (question_index[0]-1 == question_index[1]) ?
                        <div className='prev center'>
                          <p className='text_color' onClick={()=>handle_user_taking_quiz()} >terminer le quizz</p>
                        </div>
                      : 
                      <div className='prev center' onClick={()=>set_handle_indexing(1)}>
                            <p className='text_color'>suivant</p>
                            <img src={changeDir} className='flipH' />
                    </div>
                    }
                </div>
          </div> 
        : (page_index == 5 ) ?
        <div className='container lastone center fsd_column'>
            <img className='x_mar' onClick={()=>handel_set_quiz()}   src= {blue_x_mark} />
             <img src={leftArrow} className ='return flipH' onClick={()=>set_page_index(1)}  />
              <img src={well_done} className='well_done_icon' />
              <p>Félicitations pour avoir passé le test ! C'est une grande réussite d'avoir terminé cette épreuve et vous devriez être fier(e) de vous. J'espère que vous avez trouvé l'examen enrichissant et que vous avez pu démontrer toutes vos compétences. Bonne chance pour les résultats !</p>
              <li>Mise à jour importante : vos réponses seront corrigées et envoyées à votre adresse e-mail ! Vérifiez ici également les résultats corrigés</li>
              <div className='border center'>
                  <button className=''>Découvrez tous les résultats</button>
              </div>
        </div>
        : ''
      }
            </div>  
            : ''
        }





        <div className='page_content'>

        {
                text?.map((ob,i)=> 
                
                    (ob['style']== 4) ?

                  <div key={i} className='table_inp center margin_bottom' >

                      <div className='border'   >
                                
                    {
                      ob['content'].map((om,c)=>
                          <div key={c} className={(c == 0 )?'first_colmn column center' : 'column center'}>
                              {om.map((oc,r)=>
                                    <div style={{backgroundColor : '#'+oc['back'],color : '#'+oc['color'] , width : oc['w'],height : oc['h']}} className='cell' key={r+100}  >
                                        <p className=''  >{oc['c']}</p>
                                    </div>
                              )}
                          </div>
                      )
                    }
                    </div>
                  </div>






                    : (ob['style']== 5) ?
                    <div className='Taking_the_test margin_bottom center'  >
                        <h3>{ob['content']['title'] == '' ? 'Relevez le défi! Testez vos compétences dès maintenant!' : ob['content']['title']  }</h3>
                        <p>
                        Êtes-vous prêt à tester vos connaissances sur ce sujet fascinant? Notre quiz vous offre l'opportunité de découvrir à quel point vous maîtrisez le contenu de cette page. Que vous soyez un expert ou un débutant, ce quiz vous permettra de vous amuser tout en apprenant. Alors, qu'attendez-vous? Lancez-vous dans notre quiz maintenant et voyons à quel point vous êtes doué!
                          </p>
                         <button className='large_btn' onClick={()=>setPassQuiz(i+1)} >passer le quiz</button>
                    </div> 
                   
                    : (ob['style'] == 6) ?
                        <div className='youtube center margin_bottom'>   
                      
                            <YouTube videoId={ob['content']['link']} opts={opts} />
                            
                        </div> 
                       
                    : (ob['style'] == 7) ?
                        <div className='img_container  center margin_bottom' >   
                            <img className='' src={backend_url+ob['content']['link']} />
                           
                        </div> 

                    : (ob['style'] == 8) ?
               

                    <div className='file_section center margin_bottom' >
                       <Document file={backend_url+ob['content']['link']} noData={true} noInteractive={true}>
                           <Page pageNumber={1} width={300} renderMode="" />
                       </Document>
                       <button onClick={()=>downloadPDF( backend_url + ob['content']['link'])}>Telecharger</button>
                     </div>
                        :
                  <li className={styles[ob['style']] + ' margin_bottom' }  key={i}>{ob['content']}</li>
                )
            }
            
        </div>
        {/* <div className='side_tables center'>
            <div className='table'>
                <p className='title'>
                Discover more
                </p>
                <p>life is not that good</p>
                <p>life is not that good</p>
                <p>life is not that good</p>
                <p>life is not that good</p>
            </div>

          

               

        </div> */}


    </div>
  )
}

export default About_us