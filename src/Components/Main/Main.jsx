/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import "./Main.css";
import { assets } from "/src/assets/assets.js";
import { Context } from "/src/context/Context";

const Main = () => {
  const {onSent, recentPrompt,showResult,loading,resultData,setInput,input}= useContext(Context);
  // console.log('showResult', showResult)
  // console.log("loading", loading)
  // console.log("resultData", resultData)
  
  return (
    <div className="main">
      <div className="nav">
        <p>Nova</p>
        <img src={assets.user_icon2} alt="" />
      </div>

      {/* main container  */}

      <div className="main-container">

        {   // ternory operator is used "if the showResult is not true then do this, which initial value from context api is false"
          !showResult?<>
          <div className="greet">
          <p>
            <span>Hello, Mujeeb</span>
          </p>
          <p>How can I help you today?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Road Map to become an entrepreneur.</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Best way to Ace in Exams.</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card">
            <p>Books to learn The Buisness.</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card">
            <p>Road map to become a Game Devolper.</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>
        </>
        // if show result is true then do this
              :<div className="result">
                  <div className="result-title">
                      <img src={assets.user_icon} alt=""/>
                      <p>{recentPrompt}</p>
                  </div>
                  <div className="result-data">
                      <img src={assets.star_icon} alt=""/>
                      {/* this is a terrnory operator which is used to show the result or not  */}
                      {//if the loading is true then show the loader
                        loading
                        ?<div className="loader">
                            <hr/>
                            <hr/>
                            <hr className="HR3"/>
                        </div>
                      // if loader is not true then show result
                      : <p dangerouslySetInnerHTML={{ __html: resultData }} />
                      }
                  </div>
              </div>
        }

        
        
            <div className="main-botom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)}
                    onKeyDown={(e)=>{
                      if(e.key === "Enter"){
                        onSent()
                      }
                    }}
                     value={input} type="text" placeholder="Enter a prompt here (English only)"/>
                    <div>
                        <img src={assets.gallery_icon} alt=""/>
                        <img src={assets.mic_icon} alt=""/>
                        <img onClick={()=>{onSent()}}  src={assets.send_icon} alt=""/>
                    </div>  
                </div>
                <p className="bottom-info">
                     Nova: A private Gemini clone, designed by Mujeeb Siddique, offering identical functionality with enhanced privacy.
                </p>
            </div>
     
      </div>
    </div>
  );
};

export default Main;
