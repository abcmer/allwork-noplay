import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
var qs = require('qs');

const App = () => {
  const [keystrokeCount, setkeystrokeCount] = useState(1)
  const [fragContainer, setfragContainer] = useState([])
  const [partialFrag, setPartialFrag] = useState('')
  const [cursorVisibility, setCursorVisibility] = useState('visible')  
  const [name, setName] = useState('Jack')
  const [gender, setGender] = useState('boy')

  useEffect(() => {
    setName(qs.parse(window.location.search, { ignoreQueryPrefix: true }).name || 'Jack')
    const genderValue = qs.parse(window.location.search, { ignoreQueryPrefix: true }).gender || '';
    const gender = ['BOY', 'MALE', 'M'].includes(genderValue.toUpperCase()) ? 'boy' : ['GIRL', 'G', 'FEMALE', 'F'].includes(genderValue.toUpperCase()) ? 'girl' : 'boy'
    setGender(gender)
  }, [])

  const fragment = `All work and no play makes ${name} a dull ${gender}`

  const getFullFragCount = useCallback(() => Math.floor(keystrokeCount / fragment.length), [fragment.length, keystrokeCount])

  const getPartialFrag = useCallback(() => {
    const remainder = keystrokeCount % fragment.length
    return fragment.substr(0, remainder)
  }, [fragment, keystrokeCount])

  const getFragContainer = useCallback(() => {
    let fragContainer = []
    var i;
    for (i=0; i < getFullFragCount(); i++ ) {
      fragContainer.push(<p>{fragment}</p>)
    }
    console.log('fragContainer', fragContainer)
    return fragContainer
  }, [fragment, getFullFragCount])

  const onUp = useCallback(() => {
    setkeystrokeCount(keystrokeCount+1)
    setfragContainer(getFragContainer())
    setPartialFrag(getPartialFrag())    
  }, [getFragContainer, getPartialFrag, keystrokeCount])

  const toggleCursorVisiblity = useCallback(() => {
    if (cursorVisibility === 'hidden') {
      setCursorVisibility('visible')
    } else {
      setCursorVisibility('hidden')
    }
  }, [cursorVisibility])

  useEffect(() => {
    const interval = setInterval(() => {
      toggleCursorVisiblity()
    }, 500);
    return () => clearInterval(interval);
  }, [toggleCursorVisiblity]);

  useEffect(() => {
    window.addEventListener("keyup", onUp)
    return () => {
        window.removeEventListener("keyup", onUp)        
    }
  }, [keystrokeCount, onUp, toggleCursorVisiblity])

  const styles = {
    cursor: {
      marginTop: '.45em',
      fontSize: '1.5em',
      visibility: cursorVisibility
    }
  }
  return (
    <div className="App">
      <form>
        <input type="text" id="fname" name="fname" autofocus={true}/>
      </form>  
      <div className="frag-container">
        {fragContainer}
        <div className='partial-frag'>
          <p>{partialFrag}</p>
          <p style={styles.cursor}>|</p>
          </div>
      </div>
    </div>
  );
}

export default App;
