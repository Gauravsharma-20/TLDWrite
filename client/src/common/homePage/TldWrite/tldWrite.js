import React, {memo} from 'react';
import { Feature } from '../../../common/homePage';

import './tldWrite.css';

const tldWrite = () => (
  <div className="gpt3__whatgpt3 sectionMargin" id="tldWrite">
    <div className="gpt3__whatgpt3-feature">
      <Feature title="What is TLDWrite" text="Your time, your mind, and your experience is unique and precious! In order to succeed, you must focus on what matters.

That's why TLDWrite created a smart solution for Automated Meeting Minutes, converting conversations into actions, empowering your skills, and saving hours of your time." />
    </div>
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradientText">Smart Meeting Assistance at your Service</h1>
    </div>
    <div className="gpt3__whatgpt3-container">
      <Feature title="Speech to Text" text="Import your audio recordings from the past or from other sources, and test them to summarise into text." />
      <Feature title="Transcript Summarisation" text="TLDWrite transcribes your conversations on the fly. TLDWrite will generate a transcript enriched with speaker identification and voice separation." />
    </div>
  </div>
);

export default memo(tldWrite);