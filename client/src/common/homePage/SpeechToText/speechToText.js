import React, {memo} from 'react';
import { useHistory } from "react-router-dom";

import mlvoice from '../../../utils/assets/mlvoice.png';

import './speechToText.css';

const SpeechToText = () => {
  const history = useHistory();

  const handleButtonClick=(e)=>{
    history.push(`/${e}`);
  }

  return ( 
    <div className="sr121Container sectionPadding" id="speechToText">
      <div className="sr121ContainerImage">
        <img src={mlvoice} alt="SpeechToText" />
      </div>
      <div className="sr121Content">
        <h1 className="gradientText">Speech service feature that  <br /> accurately transcribes spoken audio to text </h1>
        <p>Speech is the most common means of communication and the majority of the population in the world relies on speech to communicate with one another. Speech recognition system basically translates spoken languages into text.</p>
        <div className="sr121Button">
        <button type="button" onClick={() => handleButtonClick("SpeechToText")}>Speech To Text</button>
        </div>  
      </div>
    </div>
  );
}

export default memo(SpeechToText);