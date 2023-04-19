import React , {useRef, useState , useEffect } from 'react'
import check from '../icons/check.svg'
import saving_btn from '../icons/saving_btn.svg'
import gredia_xMark from '../icons/gredia_xMark.svg'
import YouTube from 'react-youtube';
import dropDown from '../icons/dropDown.svg'
import axios from 'axios';
import add_linear from '../icons/add_linear.svg'
import blue_x_mark from '../icons/blue_x_mark.svg'
import edit from '../icons/edit.svg'
import trash from '../icons/trash.svg'
import leftArrow from '../icons/leftArrow.svg'
import dots_settings_icon from '../icons/dots_settings_icon.svg'
import bold from '../icons/bold.svg'
import bold_normal from '../icons/bold_normal.svg'
import white_saving_btn from '../icons/white_saving_btn.svg'
import grey_plus from '../icons/grey_plus.svg'
import { Document, Page, pdfjs } from 'react-pdf';
import pdfjsLib from 'pdfjs-dist';
import {useNavigate} from 'react-router-dom';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function TextArea({edited_page_id , setEdited_page}) {

  const backend_url = 'https://moncefwitcher.pythonanywhere.com/'
  const er = "must be https not http"

  const navigate = useNavigate()

  const [update , setUpdate] = useState(false) 
  // ------------------- error message -------------------
  const [error_msg , set_error_msg] = useState(false)
  const errer_list = [
    'Veuillez remplir le champ de nom de page' , 
    'Vous devez commencer à créer du contenu' ,
    'Veuillez sélectionner une catégorie' ,
    'Veuillez remplir le champ de nom de sous page'
  ]
  // ------ error code list -----------
   
  // 1 page_title is empty
  // 2 text is empty
  // 3 must select the category 
  // 4 side table is empty 


  // -------------- load data ----------------------c=-----

  const [data , setDate] = useState()
  useEffect(()=>{
      getData();
    },[update])    
    let getData = async () => {
      let respons = await fetch (`${backend_url}add_page_cat`)
      let data = await respons.json()
      setDate(data)
    }

    
  


 //   ------------ add style ---------------------
      const [dropTextType , setdropTextType] = useState(false)
      const [TextType , setTextType] = useState(2)
      const textTypesList = ['Gros titre 1' , 'Gros titre 2' , 'Paragraphe' , 'Puce' , 'table'  , 'questionnaire','link youtub' , 'image' , 'document' ]
      const styles = ['h1','h2','para','puce','table'  , 'questionnaire' ,'link_youtub' , 'image' , 'document']


    // ------------------- add paragraphe ---------------
    const inputRef = useRef(null);
    const [highlightedText, setHighlightedText] = useState('');
    const [text , setText ] = useState([])


    const input_edite_Ref = useRef(null);
    const [edited , setEdited ] = useState('')
    const [editedIndx , setEditedIndx] = useState(-1)


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            text.push({ 'content' : highlightedText , 'style' :TextType , 'input_lines' : textHeight })
            setText([...text])
            setHighlightedText('')
            setTextHeight(1)
            if ( TextType == 0 || TextType == 1 || TextType == 4 ) {
              setTextType(2)
            }
          }
          
          if (event.key == 'Backspace' && highlightedText == '' && text.length > 0 ) {
            setEditedIndx(text.length - 1 )
          }

         
       
      };
      useEffect(() => {
        inputRef.current.focus();
      }, []);


    
    const handle_adding_paragraph = (event)=>{
      setHighlightedText(event.target.value)
      if (inputRef.current.scrollHeight > inputRef.current.clientHeight ) {
        let adding = ( inputRef.current.scrollHeight - inputRef.current.clientHeight)/20
        setTextHeight(textHeight + adding)
      } 
    }
// --------------- edite para -------------------
    
      const [editTypeText  , setEditTypeText] = useState(2)
      
    
      const handleEdite = (e) => {
        
        setEdited(e.target.value)
        text[editedIndx]['content'] = e.target.value
        if (input_edite_Ref.current.scrollHeight > input_edite_Ref.current.clientHeight ) {
          let adding = ( input_edite_Ref.current.scrollHeight - input_edite_Ref.current.clientHeight)/20
          text[editedIndx]['input_lines'] += adding
        } 

        setText([...text])
      };
      const addNewLine = (e)=> {

        if (e.key === 'Enter') {
          text.splice(editedIndx+1, 0, { 'content' : '' , 'style' : editTypeText })
          setEditedIndx(editedIndx+1)
          setText([...text])
          let N_style = editTypeText
          if (editTypeText == 0 || editTypeText == 1) {
            N_style = 2
          }
          
          setEdited('')
          setEditTypeText(N_style)

        }

        if (e.key == 'Backspace' && text[editedIndx]['content'] == ''){
            text.splice(editedIndx, 1, '')
            setEditedIndx(editedIndx-1)
            setText([...text])
        }
      }

      useEffect (()=> {
        if (editedIndx != -1) {
            setEdited(text[editedIndx]['content'])
            setEditTypeText(text[editedIndx]['style'])
            input_edite_Ref.current.focus();
        }
        setdropTextType(false)
      },[editedIndx])


    //   ------------ add style ---------------------

     const handel_edit_index =() => {
      if (text.length > editedIndx + 1 ) {
        setEditedIndx(-1)
      }else {
        setEditedIndx(editedIndx + 1)
      }
     }
 
    
    const handleEditText = (i)=> {
      
      if (editedIndx == -1) {
        setTextType(i)
        inputRef.current.focus();
      }else {
        if (i <= 3) {
        text[editedIndx]['style'] = i
        setEditTypeText(i)
        input_edite_Ref.current.focus();
      }




      if (i > 3) {
        if (i == 4) {
          text.splice( editedIndx , 0 ,  { 'content' : [
            [{
              'c':'',
              'w' : 180 ,
              'h' : 40 ,
              'back' : 'fff' ,
                'color' :  '000' ,
                'weight' : 'normal' ,
           },{
              'c':'',
              'w' : 180 ,
              'h' : 40 ,
              'back' : 'fff' ,
              'color' :  '000' ,
              'weight' : 'normal' ,
          }] ,
            [
                {
                  'c':'',
                  'w' : 180 ,
                  'h' : 40 ,
                  'back' : 'fff' ,
                  'color' :  '000' ,
                  'weight' : 'normal' ,
              },{
                  'c':'',
                  'w' : 180 ,
                  'h' : 40 ,
                  'back' : 'fff' ,
                  'color' :  '000' ,
                  'weight' : 'normal' ,
              }
        ] 
        ] , 'style' :i })
          setText([...text])

        }
      
        if (i == 5){
          text.splice( editedIndx , 0 ,{
          'content' :{
            'title' : '' ,
            'list' : []
          }, 
          'style' : 5 , 
        })
        setText([...text])
        
        }
        if (i == 6 ) {
          text.splice( editedIndx , 0 ,{'content' :{
            'link' : '' } , 
          'style' : 6
        })
        setText([...text])

      }
        if (i == 7 ) {
          text.splice( editedIndx , 0 ,{'content' :{
            'link' : '' } , 
          'style' : 7
        })
        setText([...text])
        
        }
        if (i == 8 ) {
          text.splice( editedIndx , 0 ,{'content' :{
            'link' : '' } , 
          'style' : 8
        })
        setText([...text])

      }
      handel_edit_index() ;
      }
      }
      setdropTextType(false)
    } 


   
    
    // --------------- edite style -----------------  

    // ------ table ------
    
    const cell_text_area = useRef(null)

    const [selectedCell , setSelectedCell] = useState([-1,-1,-1])
    const [hovring_Cell , set_hovring_Cell] = useState([-1,-1,-1])

    useEffect(()=>{
      if (TextType == 4) {
        text.push({ 'content' : [
          [{
            'c':'',
            'w' : 180 ,
            'h' : 40 ,
            'back' : 'fff' ,
              'color' :  '000' ,
              'weight' : 'normal' ,
         },{
            'c':'',
            'w' : 180 ,
            'h' : 40 ,
            'back' : 'fff' ,
            'color' :  '000' ,
            'weight' : 'normal' ,
        }] ,
          [
              {
                'c':'',
                'w' : 180 ,
                'h' : 40 ,
                'back' : 'fff' ,
                'color' :  '000' ,
                'weight' : 'normal' ,
            },{
                'c':'',
                'w' : 180 ,
                'h' : 40 ,
                'back' : 'fff' ,
                'color' :  '000' ,
                'weight' : 'normal' ,
            }
      ] 
      ] , 'style' :TextType })
        setText(text)
        setTextType(2)
      }
    
      if (TextType == 5){
        text.push({
        'content' :{
          'title' : '' ,
          'list' : []
        }, 
        'style' : 5 , 
      })
      setText([...text])
      setTextType(2)
      }
      if (TextType == 6 ) {
        text.push({'content' :{
          'link' : '' } , 
        'style' : 6
      })
      setText([...text])
      setTextType(2)
      }
      if (TextType == 7 ) {
        text.push({'content' :{
          'link' : '' } , 
        'style' : 7
      })
      setText([...text])
      setTextType(2)
      }
      if (TextType == 8 ) {
        text.push({'content' :{
          'link' : '' } , 
        'style' : 8
      })
      setText([...text])
      setTextType(2)
      }
    },[TextType])
    
  
    // --------------- edite cell ----------------------


    const change_column_width = ()=> {
        let table = text[selectedCell[2]]['content']
        table.map((ob,i)=>{
          ob[selectedCell[1]]['w'] += 10 
        })

    }

    const change_row_height = (line)=> {

      let table = text[selectedCell[2]]['content']
        table[selectedCell[0]].map((ob,i)=>{
          ob['h'] += 10 
        })

  } 

    const setTable =(val,line)=> {
      const textarea = cell_text_area.current;
      let tableLocation = text[line]['content']

      if (textarea.value.length <= 98) {
        tableLocation[selectedCell[0]][selectedCell[1]]['c'] = val
        setText([...text])
      }
      if (textarea.scrollHeight > textarea.clientHeight ) {
        let adding = ( textarea.scrollHeight - textarea.clientHeight)/20
        if (text[selectedCell[2]]['content'][selectedCell[0]][selectedCell[1]]['w'] <= 250){
          change_column_width()

        }else {
          change_row_height()
        }
      } 
    }


    const add_column =(i)=> {

      let col = []
      let editTab = text[i]['content']
      editTab[0].map((ok,l)=>{
        
        col.push({
          'c':'',
          'w' : ok['w'] ,
          'h' : 40 ,
          'back' :  ok['back'],
          'color' :   ok['color'] ,
          'weight' : 'normal' , 
      })
      })
      editTab.push(col)
      setText([...text])
    }

    const add_row = (i)=> {

      let editTab = text[i]['content']
      
      editTab.map((oc,i)=>{
        oc.push({
          'c':'',
          'w' : 180 ,
          'h' : oc[0]['h'] ,
          'back' :  oc[0]['back'],
          'color' :   oc[0]['color'] ,
          'weight' : 'normal' , 
      })
      })
      setText([...text])
    }

// --------- cell change style -----------------

const styles_list = [
  {'name':'blue','code' : '0274D4' , 'bol' : 0},
  {'name':'Orange','code' : 'FC8136' , 'bol' : 0},
  {'name':'Gris de Davy','code' : '58585D' , 'bol' : 0},
  {'name':'Gris de Philippine','code' : '898C8F' , 'bol' : 0},
  {'name':'Anti-Flash White','code' : 'EEF2F5' , 'bol' : 1},
  {'name':'Noir','code' : '000' , 'bol' : 0},
  {'name':'Blanc','code' : 'fff' , 'bol' : 1},
] 

// ---------------------- set hovring cell location  as an object ----------------------  

  const [edited_cell , set_edited_cell ] = useState([-1,-1,-1])

  const handle_edite_location = (position)=> {
    set_show_style_edite(position)
    set_edited_cell([hovring_Cell[0],hovring_Cell[1],hovring_Cell[2]])
  }




const Edit_column_btn = useRef(null)
const Edit_row_btn = useRef(null)


const [drop_color_list , set_drop_color_list] = useState(false)
const [show_style_edite , set_show_style_edite] = useState(false)
const [style_color_index , set_style_color_index] = useState(0)

const [param_colors , set_param_colors ] = useState(['fff','fff','normal'])

useEffect (()=>{
  if (style_color_index && edited_cell[0] != -1 && edited_cell[1] != -1 &&edited_cell[2] != -1 && text.length   ){
   
    if (show_style_edite == 1  ) {
      text[edited_cell[2]]['content'][edited_cell[0]].map((ob , b)=> {
        
        ob[drop_color_list] = style_color_index['code'] ;
      })
      setText([...text])

      
    }
    if (show_style_edite == 2) {
      text[edited_cell[2]]['content'].map((ob , b)=> {
        
        ob[edited_cell[1]][drop_color_list] = style_color_index['code'] ;
      })
      setText([...text])
    }
    


      set_drop_color_list(false)
      set_style_color_index(false)
      set_show_style_edite(false)
 
    }

},[style_color_index])

const correct_color =(list , situation)=> {
    if (situation ) {
      if (list['bol'] == 1 ) {
        return '000'
      }else {
        return  list['code']
      }
    }else {
      if (list['bol'] == 1 ) {
        return '898C8F'
      }else {
        return  'fff'
      }
    }
} 

useEffect (()=>{
    if (edited_cell[1] != -1) {
    let cell = text[edited_cell[2]]['content'][edited_cell[0]][edited_cell[1]]
    set_param_colors([cell['color'],cell['back'],cell['weight']])
    }
    
},[show_style_edite])


// --------------- edit side bar page --------------

const edit_side_Page = (ob)=> {

  setEdited_page(ob)
}

const handle_delete_page = async(id) => {
  const pack = new FormData();

  pack.append('id', id);
  
  
  await axios ({
      method : 'post' , 
      url : `${backend_url}add_page/delete` ,
      data : pack
  })
  .then((response)=>{

    setUpdate(!update)
     
  }) .catch(function (error) {
      console.log(error)
    });
}

// ------- table edit btn loatoin --------

useEffect(()=>{

  if (hovring_Cell[0] != -1 && hovring_Cell[1] != -1 &&hovring_Cell[2] != -1 && text.length){
    let top_btn = Edit_column_btn.current 
    let left_btn = Edit_row_btn.current 
    let cell_width = 0
    text[hovring_Cell[2]]['content'][hovring_Cell[0]].map((oc,i)=>{
        if (i < hovring_Cell[1] ) {
          cell_width += oc['w']
        }
        if (i == hovring_Cell[1]) {
          cell_width += (oc['w'] - top_btn.clientWidth) / 2 
        }
    })

    let cell_height = 40

     text[hovring_Cell[2]]['content'].map((oc,i)=>{
        if (i < hovring_Cell[0] ) {
          cell_height += oc[hovring_Cell[1]]['h']
        }
        if (i == hovring_Cell[0]) {
          cell_height += (oc[hovring_Cell[1]]['h'] - top_btn.clientWidth) / 2 
        }
    })
 
    top_btn.style.left = cell_width +'px'
    left_btn.style.top = cell_height +'px'
  }
},[hovring_Cell])    

// --------------- text area key down --------

const handle_key_down_table =(e)=> {
  if (e.key == 'Enter' ) {
    let table = text[selectedCell[2]]['content']
    if (table.length >( selectedCell[0] + 1) ) {
      selectedCell[0] += 1
      setSelectedCell([...selectedCell])
      cell_text_area.current.focus()
    }else {
      setSelectedCell([-1,-1,-1])
    }
  }
}


// ------------------ youtub video ------------------
const [youtub_link , setYoutub_link] = useState('')
const videoId = 'IeE3atomrqk';
const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 1,
  },
};
// https://youtu.be/oo1uTqtbqH8
  const youtubId = () => {
    let arr = youtub_link.split('/')
    return arr[arr.length -1]
  }

  const handel_youtub = (line) => {
    let lining = text[line]['content']
    let id = youtubId()
    if (id != '' ) {
      lining['link'] = id
      setText([...text])
    }    

  }
// -------------- drop page category -----------------
  const [cat_drop , setCat_drop ] = useState(false)

// ------------------- handel category ------------
  const [cat_select , set_cat_select] = useState (null)
  const [page_title , set_page_title] = useState('')
  const [parent_type , set_parent_type] = useState(0)

 



  const parent_type_list =  ['category', 'pages à droite' , 'A propos']
  
  const [homePage_desc , set_homePage_desc ] = useState()

  useEffect(()=>{
    if ( cat_select?.['type'] == 2 ) {  
      setText(data?.['about']['content'])
      set_homePage_desc(data?.['about']['desc'])
    }
  },[cat_select])

  const handel_page = async ()=> {
        const pack = new FormData();
        let send = true 
        if (text.length && cat_select  ){
          pack.append('content', JSON.stringify(text));
          pack.append('page_type', cat_select['type']);

          if (cat_select?.['type'] == 2 ) {
              pack.append('desc', homePage_desc);
          }else {
              pack.append('page_title', page_title);
              pack.append('category', cat_select['id']);

          }

        if (edited_page_id) {
          pack.append('edit_state', JSON.stringify(edited_page_id));
        }else {
          pack.append('edit_state', JSON.stringify(false));
        }
    
       if (send ){
         await axios ({
            method : 'post' , 
            url : `${backend_url}add_page`,
            data : pack
        }) 
        .then((response)=>{

          setUpdate(!update)
            navigate('/elementpage')   
        }) .catch(function (error) {
            console.log(error)
          });
        }


        }else {
          if (page_title == '') {
            set_error_msg(1)
          }
          if (text.length == 0 ) {
            set_error_msg(2)
          }
          if (cat_select == null) {
            set_error_msg(3)
          }
        }
  }
// ---------- Edited page ------------------


  useEffect(()=>{ 
      if (edited_page_id && data){
        set_page_title(edited_page_id['name'])
        if (edited_page_id['as_sidepage'] == null) {
            data['category_list'].map((om,j)=>{
              if (edited_page_id['library'] == om['id']){
    
                set_cat_select({
                  'id' : om['id'] ,
                  'name' : om['name'] ,
                  'type' : 0 ,
                })
    
              }
            })

        }else {
          data['side_table'].map((om,j)=>{
            if (edited_page_id['as_sidepage'] == om['id']){
  
              set_cat_select({
                'id' : om['id'] ,
                'name' : om['name'] ,
                'type' : 1 ,
              })
  
            }
          })
        }
        setText([...edited_page_id['content']])

      }
  },[edited_page_id , data])


  // ---------------------- text input adjast ------------------

  const [textHeight , setTextHeight] = useState(1)  
  const textareaRef = useRef(null)
  

  const handel_text_height = (event)=> {
    if (textareaRef.current.scrollHeight > textareaRef.current.clientHeight ) {
      let adding = ( textareaRef.current.scrollHeight - textareaRef.current.clientHeight)/20
      setTextHeight(textHeight + adding)
    } 
    if (event.key = 'Backspace') {
      // setTextHeight(1)
      console.log(textareaRef.current.scrollHeight , textareaRef.current.clientHeight)
    
    }
  }

// ------------------ quiz edite -------------

    const [dropEditQuiz , set_dropEditQuiz] = useState(false)
    const [page_index , set_page_index] = useState(1)
    const [quize_ob , set_quize_ob] = useState()

    const handel_set_quiz = (line)=> {
      if (dropEditQuiz) {
          document.body.style.overflow = 'auto'
          set_dropEditQuiz(false)
          set_page_index(1)
      }else {
          set_dropEditQuiz(true)
          window.scrollTo(0, 0);
          document.body.style.overflow = 'hidden';
          set_quize_ob([text[line],line] )

      }
  }


  const Handle_adding_quiz = (locatoin) => {
    set_page_index(locatoin)
    if (locatoin == 3 ) {
      quize_ob [0]['content']['list'].push ({
        'type' : 1 ,
        'options' :  [] ,
        'answer' : -1 ,
        'question' : '' , 
        'user_answer' : -1 , 

      })
      set_quize_ob([...quize_ob])
    }
    if (locatoin == 4 ) {
      quize_ob [0]['content']['list'].push ({
        'type' : 0 ,
        'options' :  [] ,
        'answer' : '' ,
        'question' : '' ,
        'user_answer' : '' ,    
      })
      set_quize_ob([...quize_ob])
    }
  }

   // ------------ edit question -------------

const [edit_mode_question , set_edit_mode_question] = useState(false)

const handel_edit_quiz_question = (index) => {
  let type = quize_ob?.[0]['content']['list'][index]['type'] 
  if (type) {
    set_page_index(3)
  }else {
    set_page_index(4)
  }
  set_edit_mode_question(index + 1)

}

  // --------------- quiz title ------------------

  
  const handel_quiz_title = (value)=> {
    quize_ob [0]['content']['title'] = value
    set_quize_ob([...quize_ob])
  }
  
  const QCM_question = (value) => {
    if (quize_ob [0]['content']['list'].length ) {
      if (edit_mode_question){
        quize_ob [0]['content']['list'][ edit_mode_question - 1 ]['question'] = value
        set_quize_ob([...quize_ob])
      }else {
        quize_ob [0]['content']['list'][ quize_ob [0]['content']['list'].length - 1 ]['question'] = value
        set_quize_ob([...quize_ob])

      }
    }
  }

  // ------------------ add to options ----------------------
  const [option , setOptions] = useState('')

  const push_options = (key)=> {
    if (key == 'Enter') {
      if (edit_mode_question) {
        quize_ob [0]['content']['list'][ edit_mode_question - 1 ]['options'].push(option)
        setOptions('')
      }else {
        quize_ob [0]['content']['list'][ quize_ob [0]['content']['list'].length - 1 ]['options'].push(option)
        setOptions('')
    }
    }
   
  }

// -------- handle Q and A -----------------

  
const Q_A_answer = (value) => {
  if (quize_ob [0]['content']['list'].length ) {
    if (edit_mode_question) {
      quize_ob [0]['content']['list'][ edit_mode_question - 1 ]['answer'] = value
      set_quize_ob([...quize_ob])
    }else {
      quize_ob [0]['content']['list'][ quize_ob [0]['content']['list'].length - 1 ]['answer'] = value
      set_quize_ob([...quize_ob])
    }
  }
}


// ------------------ delete question ---------------

const delete_question = (index) => {
  quize_ob?.[0]['content']['list'].splice(index,1)
  set_quize_ob([...quize_ob])    
}     

   
// --------------- edit options -----------------

const [edit_options , set_edit_options] = useState(-1)


const handle_edite_options =(val) => {

      if (edit_mode_question && edit_options != -1 ) {
        quize_ob [0]['content']['list'][ edit_mode_question - 1 ]['options'][edit_options] = val
        set_quize_ob([...quize_ob]) 
      }else {
        quize_ob [0]['content']['list'][ quize_ob [0]['content']['list'].length - 1 ]['options'][edit_options] = val
        set_quize_ob([...quize_ob]) 
    }
    
}

const handle_edite_options_keyDown = (key)=> {

  if (key == 'Enter') {
    set_edit_options(-1)
  }
}

// ----------------- delete option -------------
const [show_x_mark , set_show_x_mark] = useState(false)

const handel_delete_options = (index)=> {
  if (edit_mode_question && edit_options != -1 ) {
    quize_ob [0]['content']['list'][ edit_mode_question - 1 ]['options'].splice(index , 1) 
    set_quize_ob([...quize_ob]) 
  }else {
    quize_ob [0]['content']['list'][ quize_ob [0]['content']['list'].length - 1 ]['options'].splice(index , 1) 
    set_quize_ob([...quize_ob]) 
}
}

// ---------------- adding image -----------

const [picture_file , set_picture_file] = useState()

const register_picture = async (line)=> {
  const dataL = new FormData();
  dataL.append('picture', picture_file);

  await axios ({
      method : 'post' , 
      url : `${backend_url}add_page/register_picture` ,
      data : dataL
  })
  .then((response)=>{
      if (response.data != 0 ) {
        text[line]['content']['link'] = response.data
        setText([...text])
      }
 
  }) .catch(function (error) {
      console.log(error)
    });
}

// ----------------- registring file ---------------
const [doc_file , set_doc_file] = useState()



const register_document = async (line)=> {
  const dataL = new FormData();
  dataL.append('file', doc_file);

  await axios ({
      method : 'post' , 
      url : `${backend_url}add_page/register_pdf` ,
      data : dataL
  })
  .then((response)=>{
      if (response.data != 0 ) {
        text[line]['content']['link'] = response.data
        setText([...text])
      }
 
  }) .catch(function (error) {
      console.log(error)
    });
}

const downloadPDF = (url) => {
  window.open(url, "_blank");
};
// --------- saving -------------------

const handle_saveing = ()=> {
  set_page_index(1);
  set_edit_mode_question(false)
  set_show_x_mark(false)
}  



// ------------- delete added items ---------------
const [delete_item_line , set_delete_item_line] = useState(-1)
const [drop_delete_item_line , set_drop_delete_item_line] = useState(false)

const edited_btn = useRef(null)
  useEffect(()=>{
      if (delete_item_line != -1 && text.length ){
      let edited_section = document.getElementById('item_'+delete_item_line)
      edited_btn.current.style.top =  (edited_section.offsetTop+(edited_section.offsetHeight / 2) ) + 'px'
    }
  },[delete_item_line])

const handel_delete_line = ()=> {
  text.splice(delete_item_line, 1)
  set_drop_delete_item_line(false)
  set_delete_item_line(-1) 
  setText([...text])
}

// -------------- add side table ------------------
const [sideTable_title , set_sideTable_title] = useState('')
const [index_edit_sideTable , set_index_edit_sideTable ] = useState(false)
const [delete_sideTable , set_delete_sideTable ] = useState(false)

const handle_adding_side_table = async ()=> {
  if (sideTable_title != ''){
    let url =  `${backend_url}register_side_table`
    const dataL = new FormData();
  dataL.append('table_name', sideTable_title);
  
  if (index_edit_sideTable) {
      dataL.append('id', index_edit_sideTable - 1);

      url = `${backend_url}edit_side_table`
    }

  await axios ({
      method : 'post' , 
      url : url  ,
      data : dataL
  })
  .then((response)=>{
    setUpdate(!update)
    set_sideTable_title('')
    set_index_edit_sideTable(false)
 
  }) .catch(function (error) {
      console.log(error)
    });
  }else {
    if (sideTable_title == '') {
      setUpdate(4)
    }
  }
}

  const handle_delete_side_table = async (id)=> {
   
      const dataL = new FormData();
       dataL.append('id', id);

  
    await axios ({
        method : 'post' , 
        url : `${backend_url}delete_side_table`  ,
        data : dataL
    })
    .then((response)=>{
      setUpdate(!update)
      
   
    }) .catch(function (error) {
        console.log(error)
      });
    
  }
// -------- side bar addin page btn ----------------
const hadle_add_side_page = (oc)=> {
  set_parent_type(true)
  set_cat_select({
    'id' : oc['id'] ,
    'name' : oc['name'] ,
    'type' : 1 ,
  })

}

const handle_editing_side_table =  (id , content)=> {
  set_sideTable_title(content)
  set_index_edit_sideTable(id + 1)
}

// ---------- handle adding on text ----------

const handle_adding_text = (param)=> {
  if (dropTextType) {
    if (param != dropTextType) {
      setdropTextType(param)
    }else {
      setdropTextType(false)
    }
  }else {
      setdropTextType(param)
    
  }
}

// ------------------



return (
    <div className='TextArea PageTemplate'  >
      <div className='page_location'>

      </div>
      {
        error_msg ? 
              <div className='eror_msg ' onClick={()=>set_error_msg()}>
                <div className='cont center'>
                    <p> {errer_list[error_msg - 1] } </p>
                      <img src={gredia_xMark}  />
                </div>
              </div>

        :''
      }
    {
      (dropEditQuiz) ?
    <div className='passing_theTest center'>

      {
        (page_index == 1 ) ?
            <div className='container center'>
                          
            <img className='x_mar' onClick={()=>handel_set_quiz()}   src= {blue_x_mark} />
            <div className='inputSection center'><input placeholder='Donner un titre à ce questionnaire' onChange={(e)=>handel_quiz_title(e.target.value)} value={quize_ob[0]['content']['title']} /></div>
            <div className='hdeader spacebetween'> 
                <p>les questions de ce  questionnaire </p>
                <div className='add_anoter center'>
                  <div className='border spacebetween' onClick={()=>set_page_index(2)}>
                    <p>Ajouter</p>
                    <img src={add_linear} />
                  </div>
                </div>
            </div>
            <div className='question_container '>
              {(quize_ob[0]['content']['list'].length ) ?
                quize_ob[0]['content']['list'].map((oc , c)=>
                
                    <div className='question spacebetween'>
                      <p> {oc['question']} </p>
                      <div className='btns spacebetween'>
                        <img onClick={()=>handel_edit_quiz_question(c)}  src={edit} />
                        <img onClick={()=>delete_question(c)} src={trash} />
                      </div>
                    </div>
                )
              
              :  <div className='question center'>
              <p>make sure to insert a question </p>
            </div>
              }

          
            </div>
            <button onClick={()=>handel_set_quiz()} >Enregister</button>
        </div>
      
        : (page_index == 2 ) ?
        <div className='container center'>
          <img className='x_mar' onClick={()=>handel_set_quiz()}   src= {blue_x_mark} />
          <img src={leftArrow} className ='return flipH' onClick={()=>set_page_index(1)}  />
          <div className='the_options center'>
            <button className='qcm' onClick={()=>Handle_adding_quiz(3)}>QCM</button>
            <button className='Q_A' onClick={()=>Handle_adding_quiz(4)}>Question et reponse</button>
          </div>
      </div> 

        : (page_index == 3 ) ?
        <div className='container center fsd_column'>
            <img className='x_mar' onClick={()=>handel_set_quiz()}   src= {blue_x_mark} />
            <img src={leftArrow} className ='return flipH' onClick={()=>set_page_index(1)}  />

          <input className='question_input' onChange={(e)=>QCM_question(e.target.value)}  placeholder='La question......' value={edit_mode_question ? quize_ob [0]['content']['list'][ edit_mode_question - 1 ]['question'] : quize_ob [0]['content']['list'][ quize_ob [0]['content']['list'].length - 1 ]['question'] }  />
          <div className='options'>
          
                 
                {

              edit_mode_question ? 
                    
                  quize_ob?.[0]['content']['list'][ edit_mode_question - 1 ]?.['options']?.map((ok,k)=>
                      <div className='box center' onMouseEnter={()=>set_show_x_mark(k+1)} onMouseLeave={()=>set_show_x_mark(false)} >
                        <div onClick={()=>Q_A_answer(k)} className={(quize_ob?.[0]['content']['list'][edit_mode_question - 1]?.['answer'] == k) ? 'circle active'  : 'circle' } ></div>
                        {
                        (edit_options == k) ?
                        <input onKeyDown={(e)=>handle_edite_options_keyDown(e.key)} onChange={(e)=>handle_edite_options(e.target.value)} value={ok} />   
                        :
                        <p className=''  onClick={()=>set_edit_options(k)}> {ok}  {(show_x_mark -1 == k)? <img src={gredia_xMark} onClick={()=>handel_delete_options(k)} /> : ''} </p>
                        }
                    </div>
                  )

                  :
                  quize_ob?.[0]['content']['list'][quize_ob [0]['content']['list'].length - 1]?.['options']?.map((ok,k)=>
                      <div className='box center' onMouseEnter={()=>set_show_x_mark(k+1)} onMouseLeave={()=>set_show_x_mark(false)} >
                        <div onClick={()=>Q_A_answer(k)} className={(quize_ob?.[0]['content']['list'][quize_ob [0]['content']['list'].length - 1]?.['answer'] == k) ? 'circle active'  : 'circle' } ></div>
                        
                        {
                        (edit_options == k) ?
                        <input onKeyDown={(e)=>handle_edite_options_keyDown(e.key)} onChange={(e)=>handle_edite_options(e.target.value)} value={ok} />   
                        :
                        <p className=''  onClick={()=>set_edit_options(k)}> {ok} {(show_x_mark -1 == k)? <img src={gredia_xMark} onClick={()=>handel_delete_options(k)}  /> : ''} </p>
                        }

                    </div>
                  )
                //   :  <div className='box center'>
               
                //   <p>fill the options  </p>
                // </div>
                }
          </div>

          <div className='add_options' >
            <input placeholder='l’option ' onKeyDown={(e)=> push_options(e.key)} onChange={(e)=>setOptions(e.target.value)} value={option} />
            <img src={saving_btn} onClick={()=>push_options('Enter')} />
          </div>
          <button onClick={()=>handle_saveing()}>Enregister</button>
        </div>

        : (page_index == 4 ) ?
            <div className='container center fsd_column'>
              <img className='x_mar' onClick={()=>handel_set_quiz()}   src= {blue_x_mark} />
              <img src={leftArrow} className ='return flipH' onClick={()=>set_page_index(1)}  />
              <input placeholder='La question......' value={edit_mode_question ? quize_ob [0]['content']['list'][ edit_mode_question - 1 ]['question'] : quize_ob [0]['content']['list'][ quize_ob [0]['content']['list'].length - 1 ]['question'] } className='question_input_Q' onChange={(e)=>QCM_question(e.target.value)} />
              <textarea placeholder='Insérer la bonne question ....' value={edit_mode_question ? quize_ob [0]['content']['list'][ edit_mode_question - 1 ]['answer'] : quize_ob [0]['content']['list'][ quize_ob [0]['content']['list'].length - 1 ]['answer'] } className='respons_input_Q' onChange={(e)=>Q_A_answer(e.target.value)}  />
              <button onClick={()=>handle_saveing()}>Enregister</button>
          </div> 
        : ''
      }
                </div> : ''
        }
            {
              (cat_select?.['type'] == 2 ) ?
              <div className='f_box center'>
                <p>Ma description sur la page d'accueil</p>
                <textarea onChange={(e)=>set_homePage_desc(e.target.value)}  value={homePage_desc} />   
              </div>
              :
                <div className='f_box center'>
                  <p>Cette page titre</p>
                  <input onChange={(e)=>set_page_title(e.target.value)} value = {page_title} />   
                </div>
            }
      


        <div className='page_select center' >
          <div className='inside_border spacebetween'  >
            {
              (cat_drop && data )? 
                <div className='drop_shit'>
                  {
                  (Math.abs(parent_type%3) == 1) ? 
                    <>
                  {

                    (data['side_table'].map((oc,i)=>
                    <li key={i} onClick={()=>{set_cat_select({
                      'id' : oc['id'] ,
                      'name' : oc['name'] ,
                      'type' : 1 ,
                    });
                    setCat_drop(false)
                    }}>{oc['name']}</li> 

                    ))
                  }  
                    </>
                  : (Math.abs(parent_type%3 )== 0  ) ?
                  <>
                  {

                    (data['category_list'].map((oc,i)=>
                    <li key={i} onClick={()=>{set_cat_select({
                      'id' : oc['id'] ,
                      'name' : oc['name'] ,
                      'type' : 0 ,
                    });
                    setCat_drop(false)
                  }}>{oc['name']}</li> 
                    
                    ))
                  }
                  </>
                  : (Math.abs(parent_type%3) == 2) ?
                      <li  onClick={()=>{set_cat_select({
                        'id' : '' ,
                        'name' : 'A propos' ,
                        'type' : 2 ,
                      });
                      setCat_drop(false)
                    }}>A propos de moi</li> 
                  :''
                  }   
                 <div className='parentType center'>
                    {/* <h4 onClick={()=> set_parent_type(false)} className={parent_type ? 'center' : 'center current'}>category</h4>
                    <h4 onClick={()=> set_parent_type(true)}  className={parent_type ? 'center current' : 'center'} >sous Page</h4> */}

                    <img src={dropDown} className='left'  onClick={()=>set_parent_type(parent_type - 1)} />
                    <h4   className={ 'center'} >{parent_type_list[Math.abs(parent_type%3)]}</h4>
                    <img src={dropDown} className='right' onClick={()=>set_parent_type(parent_type + 1)} />
                 </div>
                </div>   
              : ''   
            }
              <p onClick={()=>setCat_drop(!cat_drop)} > {   cat_select ? cat_select['name'] : '---------' } </p>
              <img src={dropDown} onClick={()=>setCat_drop(!cat_drop)}  />
          </div>
        </div>


        <div className='fix_textArea center'>

       
        <div className='text_read page_content'>
            {
              (delete_item_line != -1) ? 
                <div ref={edited_btn} className='forEditing' onClick={()=>set_drop_delete_item_line(!drop_delete_item_line)} >
                  <img className='set_img' src={dots_settings_icon} />
                  {
                    (drop_delete_item_line) ? 
                        <div className='cont'>

                          <div className='droped_list'>
                            <div className='square spacebetween' onClick={()=>handel_delete_line()}>
                                <p>supprimer</p> 
                                <img src={trash} />
                            </div>
                          </div>
                        </div>
                    : ''
                  }

                </div>
              : '' 
            }
            {
                text.map((ob,i)=> 
                (editedIndx == i) ?
                <div className='box' key={i}>
                  <div className='dropToSee center'>
                    <div className='drop_select_textType'>
                        <p className='' onClick={()=>setdropTextType(!dropTextType)}>{textTypesList[editTypeText]  }</p>
                        {
                          (dropTextType == 1 ) ? 
                              <div className='droped'> 
                              {
                                textTypesList.map((oc,j)=>
                                (j <= 3) ?
                                  <div onClick={()=>handleEditText(j)} key={j} className='spacebetween'>
                                    <p >{oc}</p>
                                    {
                                      (editTypeText == j) 
                                      ?
                                      <img src={check} />
                                      : ''
                                    }
                                  </div>
                                  : ''
                                )   
                              }
                            </div>
                          : ''
                        }
                    </div>
                    <div className='drop_select_textType while_adding center' onClick={()=>handle_adding_text(2)}>
                        <p>Ajouter</p>
                        <img className='grey_plus' src={grey_plus} />
                        {
                            (dropTextType == 2) ? 
                                <div className='droped'> 
                                {
                                  textTypesList.map((ob,i)=>
                                  (i > 3) ?
                                    <div onClick={()=>handleEditText(i)} key={i} className='spacebetween'>
                                      <p>{ob}</p>
                                      {
                                        (TextType == i) 
                                        ?
                                        <img src={check} />
                                        : ''
                                      }
                                    </div>
                                    : ''
                                  )  
                                }
                              </div>
                            :''
                          }
                      </div>
                  </div>
                  {/* ------------- edite -------------- */}
                  
                  <textarea 
                    className={styles[ob['style']] + ' text_input'}
                     key={i}
                     onKeyDown={(e)=> addNewLine(e)}
                     ref={input_edite_Ref}
                     onChange={(e)=>handleEdite(e)}
                     value={edited}
                     style={{height : 20*ob['input_lines']+'px'}}      
                     
                  /> 
                </div>
                 : 
                    (ob['style']== 4) ?

                  <div className='table_inp center margin_bottom' id={'item_'+i} onMouseEnter={()=>set_delete_item_line(i)} >



                      <div className='border' onMouseLeave={()=>set_hovring_Cell([-1,-1,-1])}  >
                        
                      {
                        (show_style_edite && edited_cell[2] == i) ? 
                          <div className='linear_border center'>
                            <div className='change_style_table_items spacebetween'>
                              {
                                drop_color_list ?

                                  <div className='droped_colors'>
                                      {
                                        (styles_list.map((color , c_index)=>
                                        <div key={c_index} className='droped_colors_droped_box center'>
                                            <div style={{backgroundColor : '#'+color['code'] , border : '1px solid #'+ correct_color(color , 0)}} className='color_box'></div>
                                            <p onClick={()=>set_style_color_index(color)} style={{color : '#'+correct_color(color , 1) }}>{color['name']}</p>
                                        </div>
                                        ))
                                      }
                                  </div>

                                : ''
                              }

                              <div className='container_select_color center' onClick={()=>set_drop_color_list('back')}>
                                <p className='text_color'>Arrière</p>
                                <div className='color_box' style={{backgroundColor : '#'+param_colors[1]}}  ></div>
                              </div>  
                              <div className='container_select_color center' onClick={()=>set_drop_color_list('color')}>
                                <p className='text_color'>Couleur</p>
                                <div  className='color_box'  style={{backgroundColor : '#'+param_colors[0]}}  ></div>
                              </div>
                              <div className='container_select_color'>
                                  <div className='blure_active'>
                                  </div>   
                                    <img src={bold} />  
                              </div>


                            </div>
                        </div>  
                        : ''
                      }
                  <div className='add_column center' onClick={()=>add_column(i)}><img src={add_linear} /></div>
                  <div className='add_row center' onClick={()=>add_row(i)}><img src={add_linear} /></div>
              
                  <>
                      {   
                        (hovring_Cell[2] == i && hovring_Cell[0] != -1  ) ? 
                        <>
                          <div ref={Edit_column_btn} className='settings_btn top_settings'><img src={dots_settings_icon} onClick={()=>handle_edite_location(2)}  /></div>
                          <div ref={Edit_row_btn}  className='settings_btn left_settings'><img src={dots_settings_icon} onClick={()=>handle_edite_location(1)}   /></div>
                        </>
                        : ''
                      }
                  </>
                                   
                    {
                      ob['content'].map((om,c)=>
                          <div key={c} className={(c == 0 )?'first_colmn column center' : 'column center'}>
                              {om.map((oc,r)=>
          
                                    <div style={{backgroundColor : '#'+oc['back'],color : '#'+oc['color'] , width : oc['w'],height : oc['h']}} onMouseEnter={()=>set_hovring_Cell([c,r,i])} className='cell' key={r+100}  >
                                      {
                                        (selectedCell[0]== c && selectedCell[1]== r && selectedCell[2]== i) ?
                                        <textarea ref={cell_text_area} onKeyDown={(e)=>handle_key_down_table(e)} onChange={(e)=>setTable(e.target.value,i)} value={oc['c']}   />
                                          :
                                        <p className=''  onClick={()=>setSelectedCell([c,r,i])}>{oc['c']}</p>
                                      }
                                    </div>
                               
                              )}
                          </div>
                      )
                    }
                    </div>
                  </div>






                    : (ob['style']== 5) ?
                    <div className='Taking_the_test margin_bottom center'  id={'item_'+i} onMouseEnter={()=>set_delete_item_line(i)} >
                        <h3>{ob['content']['title'] == '' ? 'Relevez le défi! Testez vos compétences dès maintenant!' : ob['content']['title']  }</h3>
                        <p>
                        Êtes-vous prêt à tester vos connaissances sur ce sujet fascinant? Notre quiz vous offre l'opportunité de découvrir à quel point vous maîtrisez le contenu de cette page. Que vous soyez un expert ou un débutant, ce quiz vous permettra de vous amuser tout en apprenant. Alors, qu'attendez-vous? Lancez-vous dans notre quiz maintenant et voyons à quel point vous êtes doué!
                          </p>
                         <button onClick={()=>handel_set_quiz(i)}>Modifier le questionnaire</button>
                    </div> 
                   
                    : (ob['style'] == 6) ?
                       (ob['content']['link'] == '' ) ?
                       <div className='youtube center margin_bottom'  id={'item_'+i} onMouseEnter={()=>set_delete_item_line(i)}>   
                          <div className='register_video center'>
                              <input onChange={(e)=>setYoutub_link(e.target.value)} value={youtub_link} /> 
                              <button onClick={()=>handel_youtub(i)}>register</button>
                          </div>
                       </div>
                       : <div className='youtube center margin_bottom' id={'item_'+i} onMouseEnter={()=>set_delete_item_line(i)}>   
                      
                            <YouTube videoId={ob['content']['link']} opts={opts} />
                            
                        </div> 
                       
                    : (ob['style'] == 7) ?
                    (ob['content']['link'] == '' ) ?

                    <div className='youtube center margin_bottom'  id={'item_'+i} onMouseEnter={()=>set_delete_item_line(i)} >   
                          <div className='register_video center'>
                              <input type='file' onChange={(e)=> set_picture_file(e.target.files[0])} /> 
                              <button onClick={()=>register_picture(i)} >register</button>
                          </div>
                       </div>
                       : <div className='img_container  center margin_bottom' id={'item_'+i} onMouseEnter={()=>set_delete_item_line(i)}>   
                            <img className='' src={backend_url+ob['content']['link']} />
                           
                        </div> 

                    : (ob['style'] == 8) ?
                    (ob['content']['link'] == '' ) ?

                    <div className='youtube center margin_bottom'  id={'item_'+i} onMouseEnter={()=>set_delete_item_line(i)}>   
                          <div className='register_video center'>
                              <input type='file' onChange={(e)=> set_doc_file(e.target.files[0])} /> 
                              <button onClick={()=>register_document(i)} >register</button>
                          </div>
                       </div>
                       : <div className='file_section center margin_bottom' id={'item_'+i} onMouseEnter={()=>set_delete_item_line(i)}>
                       <Document file={backend_url+ob['content']['link']} noData={true} noInteractive={true}>
                           <Page pageNumber={1} width={300} renderMode="" />
                       </Document>
                       <button onClick={()=>downloadPDF(backend_url+ob['content']['link'])}>Telecharger</button>
                     </div>
                        :
                  <li className={styles[ob['style']] + ' margin_bottom' } onClick={()=>setEditedIndx(i)} key={i}>{ob['content']}</li>
                )
            }
           <div className='box' >
                  {
                    (editedIndx == -1) ?
                    <div className='dropToSee center'>
                      <div className='drop_select_textType center'>
                          <p onClick={()=>handle_adding_text(1)}>{textTypesList[TextType]  }</p>
                          {
                            (dropTextType == 1) ? 
                                <div className='droped'> 
                                {
                                  textTypesList.map((ob,i)=>
                                  (i<=3) ?
                                    <div onClick={()=>handleEditText(i)} key={i} className='spacebetween'>
                                      <p>{ob}</p>
                                      {
                                        (TextType == i) 
                                        ?
                                        <img src={check} />
                                        : ''
                                      }
                                    </div>
                                    : ''
                                  )  
                                }
                              </div>
                            :''
                          }
                      </div>
                      <div className='drop_select_textType while_adding center' onClick={()=>handle_adding_text(2)}>
                        <p>Ajouter</p>
                        <img className='grey_plus' src={grey_plus} />
                        {
                            (dropTextType == 2) ? 
                                <div className='droped'> 
                                {
                                  textTypesList.map((ob,i)=>
                                  (i > 3) ?
                                    <div onClick={()=>handleEditText(i)} key={i} className='spacebetween'>
                                      <p>{ob}</p>
                                      {
                                        (TextType == i) 
                                        ?
                                        <img src={check} />
                                        : ''
                                      }
                                    </div>
                                    : ''
                                  )  
                                }
                              </div>
                            :''
                          }
                      </div>
                    </div>
                    : ''
                  }
                  {/* ------------- add -------------- */}
                  
          
            
              <textarea 
                  onKeyDown={handleKeyDown}
                  onClick={()=>{setEditedIndx(-1);setdropTextType(false);}}
                  ref={inputRef}
                  onChange={(e)=>handle_adding_paragraph(e)}
                  value={highlightedText} 
                  style={{height : 20*textHeight+'px'}}
                  className='text_input'  
              />
            
              
            </div>
            <div className='center'>
                  <button onClick={()=>handel_page()}>Enregister cette Page</button>
            </div>  
        </div>
        <div className='side_tables center'>
                  {
                    data?.['side_table'].map((os , s)=>
                        <div className='table' key={s}>
                            <div className='title'>
                              {
                                (os['id'] == (index_edit_sideTable - 1) ) ?
                                <>
                                    <input onChange={(e)=>set_sideTable_title(e.target.value)} value={sideTable_title} className='title' placeholder='insérer le nom..'/>
                                    <img  src={white_saving_btn} className='saving_btn' onClick={()=>handle_adding_side_table()} />    
                                </>
                                :
                                  <>
                                    <p>{os['name']}</p>     
                                    <div className='editBtn center'>
                                      <img src={edit} onClick={()=>handle_editing_side_table(os['id'],os['name'])} />
                                      <img src={trash} onClick={()=>handle_delete_side_table(os['id'])} />
                                    </div>
                                  </>
                              }
                            </div>
                            {
                              os['tables'].map((om,o)=>     
                                <div className='page_container'>
                                  <div className='editBtn center'>
                                      <img src={edit} onClick={()=>edit_side_Page(om)}  />
                                      <img src={trash} onClick={()=>handle_delete_page(om['id'])} />
                                    </div>
                                  <li key={o}>{om['name']}</li>
                                </div>
                              )
                            }
                          
                            <div className='box center' onClick={()=>hadle_add_side_page(os)} >
                                <h4 className='text_color'>Ajouter une page</h4>
                                <img src={add_linear} />
                          </div>
                        </div>
                    )
                  }

            <div className='table'>
                
                <input onChange={(e)=>set_sideTable_title(e.target.value)} value={sideTable_title} className='title' placeholder='insérer le nom..'/>
                <img src={white_saving_btn} className='saving_btn' onClick={()=>handle_adding_side_table()} />    
               
             
            </div>

           

         </div>
        </div>
          
    </div>
  )
}

export default TextArea