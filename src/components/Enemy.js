import React, { useEffect, useState} from 'react'
var randomSentence = require('random-sentence');

const Enemy = () => {

  

    const [word,setWord]=useState(randomSentence({words:10})+" "+ randomSentence({words:10})+" " +randomSentence({words:10})+ " "+randomSentence({words:10}) + " " +randomSentence({words:10}) +" "+ randomSentence({words:10})+" "+randomSentence({words:10})+" "+ randomSentence({words:10})+" "+randomSentence({words:10}) ) 
const [score,setScore]=useState(0);
  
  const [numberP,setNumberP]=useState(0);
  
  const handleKeyDown= (e)=> {
      
if(e.key==="Shift" || e.key==="Backspace"){
  return
}
validate(e.key);
   
  }
  let validate=(currentKey)=>{
    if(numberP===word.length){
     setWord(randomSentence({words:10})+" "+ randomSentence({words:10})+" " +randomSentence({words:10})+ " "+randomSentence({words:10}) + " " +randomSentence({words:10}) +" "+ randomSentence({words:10})+" "+randomSentence({words:10})+" "+ randomSentence({words:10})+" "+randomSentence({words:10}) )
      setNumberP(0);
      setScore((score)=>score+1)
      return
     
     }
    if(currentKey===word.charAt(numberP)){
      setNumberP((numberP) => { return numberP+1});
      console.log("nice")
      
    }
    else{
      console.log("type the correct letter");
    }
  }
 
    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    
        },[numberP,word]);

    
  return (
    <div>    <div className='bg-gradient-to-r from-orange-400 to-red-500  flex items-center mx-9 p-5 rounded-2xl shadow-2xl  mt-14'>
        <div  className='w-fit mx-auto font-bold text-2xl '><span className='text-white '>{ word.substring(0,numberP)}</span><span className='underline text-yellow-300'>{word.charAt(numberP)}</span>{word.substring(numberP+1)} </div>
    
        

    </div>
    <div className='p-5 rounded-full px-8 font-extrabold text-white text-4xl mt-5 bg-blue-500 mx-auto w-fit'>{score}</div>
    </div>

  )
}

export default Enemy