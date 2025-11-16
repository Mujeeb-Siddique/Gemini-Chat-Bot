/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React,{useContext, useState} from 'react'
import '/src/Components/SideBar/Sidebar.css'
import {assets} from '/src/assets/assets.js'
import { Context } from '/src/context/Context'

const Sidebar = () => {

  const [extended, setExtended] = useState(false)
  const { onSent, previousPrompt, setRecentPrompt } = useContext(Context);

  const loadPrompt = async(prompt) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
  };
  
  return (
    <div className='sidebar'>
      <div className='top'>
          <img className='menu' onClick={()=>setExtended(prev=>!prev)} src={assets.menu_icon} alt=''/>
          <div className='new-chat'>
            <img src={assets.plus_icon} alt=''/>
            {extended?<p>New Chat</p>:null}
          </div>
          {extended?
          <div className='recent'>
            <p className='recent-title'>Recent</p>
            {Array.isArray(previousPrompt) && previousPrompt.length > 0 ? (
              previousPrompt.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => loadPrompt(item)}
                    className='recent-entry'
                  >
                    <img src={assets.message_icon} alt='' />
                    <p>{item.slice(0, 18)}...</p>
                  </div>
                );
              })
            ) : (
              <p>No recent prompts</p>
            )}
            
          </div>
            :null
          }
      </div>

{/* bootom */}

      <div className='bottom'>
        <div className='bottom-item recent-entry'>
          <img src={assets.question_icon} alt=''/>
          {extended?<p>Help</p>:null}
        </div>
        <div className='bottom-item recent-entry'>
          <img src={assets.history_icon} alt=''/>
          {extended?<p>Activity</p>:null}
        </div>
        <div className='bottom-item recent-entry'>
          <img src={assets.setting_icon} alt=''/>
          {extended?<p>Settings</p>:null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
