import {useState} from "react";


export default function Player({initalName , symbol , isActive , onChangeName}){

  const [playerName , setPlayerName] = useState(initalName);
const [isEditing , setisEditing] = useState(false);
 
function handleChange(event){
  setPlayerName(event.target.value)
}

function setEdit(){
   setisEditing((editing) => !editing);

   if(isEditing){
    onChangeName(symbol , playerName);
   }
}

  return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
            {isEditing ? <input type="text" value={playerName} onChange={handleChange}/> : <span className="player-name">{playerName}</span>}
            <span className="player-symbol">{symbol}</span>
           
            </span>
            <button onClick={setEdit}>{isEditing? 'Save' : 'Edit'}</button>
            
          </li>
    );
}