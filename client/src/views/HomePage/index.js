import React,{memo} from "react";
import { useHistory } from "react-router-dom";

import './homePage.css';

const HomePage=()=>{
  const history = useHistory();

  const handleButtonClick=()=>{
    history.push('/FileUploader');
  }

  return (
    <div id="hp01Homepage">
      <div className="hp01TopBar">
        <div className="hp01In">
          Sign In &nbsp; &nbsp; &nbsp;Sign Up
        </div>
      </div> 
      <div className="hp01Summariser">
        Meeting Summariser<br/>
        <button onClick={handleButtonClick}>Enter</button>
      </div>
    </div>
   )
}

export default memo(HomePage);