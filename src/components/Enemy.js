import React, { useEffect, useState} from 'react'

import {generate} from "random-words";

const Enemy = () => {

  

    const [word,setWord]=useState(generate({exactly:50})) 

const [currentIndex,setIndex]= useState(0);
const [wrongIndex,setWrongIndex]=useState(-1);
const [innerIndex,setInnerIndex]= useState(-1);
const [wordCount,setWordCount]=useState(0);
const [gameStart,setGameStart]=useState(true);
const [gameEnd,setGameEnd]=useState(false);
let time=30;
const [timer,setTimer]=useState(time);

let watch=()=>{
  setInterval(()=>{
   
    if(time<=0){
      
      setGameStart(false);
      clearInterval();

    }
    else{
      time-=1;
      setTimer(time);
    }
  },"1000")
}

  
  const handleKeyDown= (e)=> {
    
    
    if(gameStart){
   
    if(e.key===' ' && innerIndex===word[currentIndex].length-1 && wrongIndex===-1){
      
      setIndex((currentIndex)=> currentIndex+1);
      setWordCount((wordCount)=>wordCount+1);
      if(currentIndex===word.length-1){
        setWord(generate({exactly:50}));
        setIndex(0);
        setInnerIndex(-1);
        return;
      }
      
      
      
      setInnerIndex(-1);
    
    }
    
    if(e.key==='Backspace'){
      if(innerIndex>=0){
       
        if(innerIndex<=wrongIndex){
          setWrongIndex(-1);
        }
      setInnerIndex((innerIndex)=> innerIndex-1)}
        return;
        
    }
    if(innerIndex+1===word[currentIndex].length){
      return;
    }
    if(e.key==='Shift'||e.key==='Alt' || e.key==='Control' ){
      return;
    }
    if( e.key!==word[currentIndex][innerIndex+1]){
      if(wrongIndex>innerIndex+1 || wrongIndex===-1){
      setWrongIndex(innerIndex+1);}
      setInnerIndex((innerIndex)=>innerIndex+1);
      
    }
    if(e.key===word[currentIndex][innerIndex+1]){
      if(wrongIndex===innerIndex+1){
        setWrongIndex(-1);
      }
      setInnerIndex((innerIndex)=>innerIndex+1);
      
    }
  }
  if(!gameEnd){
   
    setGameEnd(true)
    watch();
  }
  }
  
 
    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    
        },[word,currentIndex,innerIndex,wrongIndex]);

    
  return (
    <div>  
        
        <div className={(gameEnd&&!gameStart)?"hidden":" text-2xl font-bold text-yellow-600 mx-20 px-5 mt-10 flex font-serif justify-between"} ><div><span className='text-white'>Timer - </span>{timer}</div><div><span className='text-white'> Word Count - </span>{wordCount}</div></div>
        <div className={(gameEnd&&!gameStart)?"hidden":'main text-gray-500 flex items-center mx-20 p-5   mt-9 tracking-wider '}>
        <div className='text-3xl '>
      {word.map((element,index)=>{
        if(index===currentIndex){

          if(wrongIndex===-1){
          return <span key={index}><span className='text-white'>{element.substring(0,innerIndex+1)}</span><span className='border-b-4'>{element[innerIndex+1]}</span>{element.substring(innerIndex+2)} </span>}
          return <span key={index}><span className='text-white'>{element.substring(0,wrongIndex)}</span><span className='text-red-500'>{element.substring(wrongIndex,innerIndex+1)}</span><span className='border-b-4'>{element[innerIndex+1]}</span>{element.substring(innerIndex+2)} </span>
        }


         return <span key={index} className={index<currentIndex?"text-white":""}>{element + " "}</span>
      })}
      
    </div>
 
           

    </div>
      
   
      <div className={(gameEnd&&!gameStart)?"w-fit mx-auto mt-12":"hidden"}>
        <div className='text-3xl font-serif font-bold cursor-default '><span className='text-white '>AVG SPEED - </span> <span className='text-red-500'>{wordCount*2} wpm</span>   </div>
        <></>
        

      </div>

    
    </div>


  )
}

export default Enemy