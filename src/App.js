import React, { useState, useEffect, useRef } from "react"
import ChainImg from "./img/chain.png"
import CrossImg from "./img/cross.png"

function App() {

  const displayRef = useRef(null)
  const [isChained, setIsChained] = useState(true)
  const [borders, setBorders] = useState({
    "top_left": '0',
    "top_right": '0',
    "bottom_left": '0',
    "bottom_right": '0'
  })

  const [output, setOutput] = useState({
    "outputWebkit": <p>-webkit-border-radius: 0px;</p>,
    "outputMoz": <p>-moz-border-radius: 0px;</p>,
    "outputChrome": <p>border-radius: 0px;</p>
  })

  function toggleChain (){
    setIsChained(prevChained => !prevChained)
  }

  function handleChange(value, key) {

    if(isChained){
      Object.keys(borders).map(key => {
        setBorders(prevBorders => ({
          ...prevBorders,
          [key]: value
        }))
      return null})
    } else {
      setBorders(prevBorders => ({
        ...prevBorders,
        [key]: value
      }))
    }
  }

  function focusInput(e) {
    e.target.select()
  }

  function resetBorders(){
    Object.keys(borders).map(key => {
      setBorders(prevBorders => ({
        ...prevBorders,
        [key]: '0'
      }))
    })
  }

  useEffect(() => {
    setOutput({
      outputWebkit: <p>-webkit-{displayRef.current.style.cssText}</p>,
      outputMoz: <p>-moz-{displayRef.current.style.cssText}</p>,
      outputChrome: <p>{displayRef.current.style.cssText}</p>    
    })
  }, [borders])
  
  return (
    <div className="main-cont">
      <div className="border-cont">
        <div className="settings-cont">
          <div className="top-row">
            <input 
              type="number" 
              className="input-number topleft"
              value={borders.top_left}
              onChange={(e) => handleChange(e.currentTarget.value, "top_left")}
              onClick={focusInput}
              />
            <input 
              type="number" 
              className="input-number topright"
              value={borders.top_right}
              onChange={(e) => handleChange(e.currentTarget.value, "top_right")}
              onClick={focusInput}
              />
          </div>
          <div className="bottom-row bottomleft">
            <input 
              type="number" 
              className="input-number"
              value={borders.bottom_left}
              onChange={(e) => handleChange(e.currentTarget.value, "bottom_left")}
              onClick={focusInput}
              />
            <input 
              type="number" 
              className="input-number bottomright"
              value={borders.bottom_right}
              onChange={(e) => handleChange(e.currentTarget.value, "bottom_right")}
              onClick={focusInput}
              />
          </div>
          <div className="button-cont">
            <div onClick={toggleChain} className={`chain-button ${isChained ? 'on' : 'off'}`}>
              <img className="chain-img" src={ChainImg} alt="Chain icon"></img>
            </div>
            <div onClick={resetBorders} className='chain-button'>
              <img className="chain-img" src={CrossImg} alt="Cross icon"></img>
            </div>
          </div>
        </div>
        <div className="display-cont">
          <div 
          className="preview"
          ref={displayRef} 
          style={{
            borderTopLeftRadius: `${borders.top_left}px`,
            borderTopRightRadius: `${borders.top_right}px`,
            borderBottomLeftRadius: `${borders.bottom_left}px`,
            borderBottomRightRadius: `${borders.bottom_right}px`
            }}
          ></div>
        </div>
      </div>
      <div className="output">
        <div>
          <React.Fragment>
          {output.outputWebkit}
          {output.outputMoz}
          {output.outputChrome}
          </React.Fragment>
        </div>
      </div>
    </div>
  );
}

export default App;
