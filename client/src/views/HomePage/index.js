import React,{memo} from "react";
import { useHistory } from "react-router-dom";

import './homePage.css';

const HomePage=()=>{
  const history = useHistory();

  const handleButtonClick=(e)=>{
    history.push(`/${e}`);
  }

  return (
    <div id="hp01Homepage">
      <div className="hp01TopBar">
        {/* <div className="hp01In">
          Sign In &nbsp; &nbsp; &nbsp;Sign Up
        </div> */}
      </div> 
      <div className="hp01Summariser">
        Meeting Assistant<br/>
        <button onClick={() => handleButtonClick("SpeechToText")}>Speech to Text</button>
        <button onClick={() => handleButtonClick("TextSummariser")}>Transcriopt Summarisation</button>
        <button onClick={() => handleButtonClick("MeetingSummariser")}>Meeting Audio Summarisation</button>
      </div>
    </div>
   )
}

export default memo(HomePage);