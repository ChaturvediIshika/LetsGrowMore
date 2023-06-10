import React, { useEffect, useRef } from 'react'

import './Header.css';

const Header = (props) => {

    const resultRef=useRef();
    useEffect(()=>{resultRef.current.scrollIntoView()},[props.history]);

    const expressionRef=useRef();
    useEffect(()=>{expressionRef.current.scrollLeft=expressionRef.current.scrollWidth},[props.expression]);

  return (
    <div className='header custom-scroll'>
        <div className='header_history'>
            {
                props.history &&
                props.history?.map((item)=>(<p key={item+""+Math.random()*45}>{item}</p>))
            }
        </div>
        <br/>
        <div ref={expressionRef} className='header_exp custom-scroll'>
            <p>{props.expression}</p>
        </div>
        <p ref={resultRef} className='header_result'>{props.result}</p>
    </div>
  )
}

export default Header