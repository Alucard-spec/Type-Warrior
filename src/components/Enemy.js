import React, { useEffect, useState} from 'react'
import { IoReloadOutline } from "react-icons/io5";
import {generate} from "random-words";
import { FaKeyboard } from "react-icons/fa";

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
const [wrong,setWrong]= useState(0);


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
      setWrong((wrong)=>wrong+1);
      
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
      <div className='text-2xl md:text-5xl w-fit font-mono  p-5 mt-3 underline md:mb-16 md:mx-16 mb-10 font-bold text-yellow-500 items-center flex gap-3'>TYPE WARRIOR <FaKeyboard size={40} color='white'/></div> 
        
        <div className={(gameEnd&&!gameStart)?"hidden":" md:text-2xl font-bold text-yellow-600 md:mx-16 px-5 mt-10 flex font-serif justify-between"} ><div><span className='text-white'>Timer - </span>{timer} s</div><div><span className='text-white'> Word Count - </span>{wordCount}</div></div>
        <div className={(gameEnd&&!gameStart)?"hidden":'main text-gray-500 flex items-center md:mx-16 p-5   mt-9 tracking-wider '}>
        <div className='text-xl md:text-3xl '>
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
      
   
      <div className={(gameEnd&&!gameStart)?"w-fit mx-auto mt-12 space-y-9":"hidden"}>
        <div className='text-xl md:text-3xl font-serif font-bold cursor-default '><span className='text-white '>AVG SPEED - </span> <span className='text-red-500'>{wordCount*2} wpm</span>   </div>
        <div className='text-xl md:text-3xl font-serif font-bold cursor-default '><span className='text-white '>Wrong Chars - </span> <span className='text-red-500'>{wrong} </span>   </div>
        <br />
        <br />
        

      </div>
      <div className='w-fit mx-auto mt-7 cursor-pointer hover:scale-125 transition-all' onClick={()=>{ window.location.reload(); }}> <IoReloadOutline size={30} color='white'/></div>

    
    </div>


  )
}

export default Enemy