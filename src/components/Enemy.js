import React, { useEffect, useState} from 'react'

const Enemy = () => {

  

    const [word,setWord]=useState("start") 

   const retriveWord= async ()=>{
        try{
            let res= await fetch("https://random-word-api.herokuapp.com/word");
            let data= await res.json();
            console.log(data[0]);
            setWord(data[0]);
        }
        catch(err){
          console.error(err);
        }
   }
  const [numberP,setNumberP]=useState(0);
  
  const handleKeyDown= (e)=> {
      
if(e.key==="Shift" || e.key==="Backspace"){
  return
}
validate(e.key);
   
  }
  let validate=(currentKey)=>{
    if(numberP===word.length){
      retriveWord();
      setNumberP(0);
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
    <div className='bg-gradient-to-r from-orange-400 to-red-500  flex items-center w-fit p-5 rounded-2xl shadow-2xl  mx-auto mt-14'>
        <div  className='w-fit mx-auto font-bold text-2xl '><span className='text-white '>{ word.substring(0,numberP)}</span>{word.substring(numberP)} </div>

        

    </div>
  )
}

export default Enemy