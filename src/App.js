import React, {useState, useEffect, useCallback} from 'react';
import './App.css';

const App = () => {
  const [keystrokeCount, setkeystrokeCount] = useState(1)
  const [fragContainer, setfragContainer] = useState([])
  const [partialFrag, setPartialFrag] = useState('')
  const [cursorVisibility, setCursorVisibility] = useState('visible')
  const [name] = useState('Jack')
  const fragment = `All work and no play makes ${name} a dull boy`

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
