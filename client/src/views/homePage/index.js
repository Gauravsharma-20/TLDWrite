import React,{memo} from "react";

import { Header, TldWrite, SpeechToText , TranscriptSummariser, Blog } from "../../common/homePage";
import { Navbar } from "../../ui";

import './homePage.css';

const HomePage=()=>{

  return (
    <div id="hp01Homepage">
      <div className="gradientBackground">
        <Navbar/>
        <Header/>
      </div>
      <TldWrite/>
      <TranscriptSummariser/>
      <SpeechToText />
      <Blog/>
    </div>
   )
}

export default memo(HomePage);