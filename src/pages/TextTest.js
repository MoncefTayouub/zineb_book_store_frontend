import React , {useState , useEffect} from 'react'

function TextTest() {

    const [content, setContent] = useState('');

    function handleInput(event) {
        setContent(event.target.innerHTML);
    }

  return (
    <div className='TextTest'>
          <div
      contentEditable={true}
      onInput={handleInput}
      style={{
        height: '200px',
        width: '100%',
        border: '1px solid #ccc',
        padding: '10px'
      }}
    >
      {content}
    </div>
    </div>
  )
}

export default TextTest