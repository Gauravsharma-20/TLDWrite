import React from 'react';
import { useHistory } from 'react-router';

import ai from '../../../utils/assets/ai.png';

import './header.css';


const Header = () =>{ 
    const history = useHistory();

    const handleButtonClick=(e)=>{
        history.push(`/${e}`);
    }

  return(
    <div className="gpt3__header sectionPadding" id="home">
        <div className="gpt3__header-content">
        <h1 className="gradientText">
            Let&apos;s summarise Meetings with TLDWrite</h1>
        <p>Convenient and always in reach. Use your smartphone in the office or on the go with your customers. Straight from your pocket to perfectly organized and precisely-captured meeting notes. TLDWrite will back you up with smart automated meeting summaries, wherever you are, to keep your knowledge available for you.</p>

        <div className="gpt3__header-content__input">
            <button type="button" onClick={() => handleButtonClick("MeetingSummariser")}>Get Started</button>
        </div>
        </div>

        <div className="gpt3__header-image">
        <img src={ai} alt="aiImage"/>
        </div>
    </div>
    );
}

export default Header;