import React, {useState, useEffect, useCallback} from 'react';
import './App.css';

const App = () => {
  const [keystrokeCount, setkeystrokeCount] = useState(1)
  const [fragContainer, setfragContainer] = useState([])
  const [partialFrag, setPartialFrag] = useState('')
  const [cursorVisibility, setCursorVisibility] = useState('visible')
  const [name] = useState('Jack')
  const fragment = `All work and no play makes ${name} a dull boy`
  const getFullFragCount = () => Math.floor(keystrokeCount / fragment.length)
  const getPartialFrag = () => {
    const remainder = keystrokeCount % fragment.length
    return fragment.substr(0, remainder)
  }

  const getFragContainer = () => {
    let fragContainer = []
    var i;
    for (i=0; i < getFullFragCount(); i++ ) {
      fragContainer.push(<p>{fragment}</p>)
    }
    console.log('fragContainer', fragContainer)
    return fragContainer
  }

  // Event handlers
  const onDown = event => {
  }

  const onUp = event => {
    setkeystrokeCount(keystrokeCount+1)
    setfragContainer(getFragContainer())
    setPartialFrag(getPartialFrag())
  }

  const toggleCursorVisiblity = useCallback(() => {
    if (cursorVisibility === 'hidden') {
      setCursorVisibility('visible')
    } else {
      setCursorVisibility('hidden')
    }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      toggleCursorVisiblity()
    }, 500);
    return () => clearInterval(interval);
  }, [toggleCursorVisiblity]);

  useEffect(() => {
    window.addEventListener("keydown", onDown)
    window.addEventListener("keyup", onUp)
    return () => {
        window.removeEventListener("keydown", onDown)
        window.removeEventListener("keyup", onUp)
        
    }
    
  }, [keystrokeCount, onUp, toggleCursorVisiblity])

  const styles = {
    cursor: {
      marginTop: '1rem',
      fontSize: 25,
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
