/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext()

//This is a function and all the things are defined in it are just the same as the normal React functional components.
const ContextProvider = (props) => {
    // these states are used to add functionalities by using "context api" into Folders like "Main and Sidebar"
    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');
    
    function delayPara(index,nextWord){
        setTimeout(function  () {
            setResultData(previous=>previous+nextWord)
        },75*index)
    }
    

//this is the response from Gemini    
    const onSent = async (prompt) =>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;

        if(prompt !== undefined){
            response = await run(prompt);
            setPreviousPrompt(prompt)
        }else{
            setPreviousPrompt((prev) => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }
        

        
        
        
        console.log('input:', input)
        //Before 
        //await run(input)
        // After

        
        // console.log({responsesharjeel: response})
        let responseArray = response.split("**");
        let newResonse = "";
        for(let i = 0 ; i <responseArray.length ; i++){
            if(i === 0 || i%2 !== 1){
                newResonse +=responseArray[i];
            }
            else{    
                newResonse += "<b>"+responseArray[i]+"</b>";
            }
        }
        

        let newResonse2 = newResonse.split('*').join('</br>');
        
        let newResonseArray = newResonse2.split(' ');
        for(let i = 0; i <newResonseArray.length; i++){
            const nextWord = newResonseArray[i];
            delayPara(i, nextWord+' ');
        } 

        // setResultData(newResonse2)
        setLoading(false)
        setInput('')



    }
    // onSent('My name is Mujeeb')
    

// This is an Object to Add different functionality. 
    const ContextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
    }

    return(
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;