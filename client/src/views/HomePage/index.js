import React from "react";
// import meetingImage from '../../utils/images/meeting.jpg';

import './homePage.css';

class HomePage extends React.Component{
  render(){
    return (
      <div id="hp01Homepage">
       <div className="hp01TopBar">
         <div className="hp01In">
           Sign In &nbsp; &nbsp; &nbsp;Sign Up
         </div>
        </div> 
       <div className="hp01Summariser">
         Meeting Summariser
       </div>
      </div>
   )
  }
}

export default HomePage;