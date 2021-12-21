import React, { useState, memo } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

import logo from '../../utils/assets/TLDWrite.png';

import './navbar.css';


const Menu = () =>{
  return (
    <>
    <p className="hover-underline-animation"><a href="#home">Home</a></p>
    <p className="hover-underline-animation"><a href="#tldWrite">What is TLDWrite?</a></p>
    <p className="hover-underline-animation"><a href="#Summariser">Transcript Summarisation</a></p>
    <p className="hover-underline-animation"><a href="#SpeechToText">Speech to Text</a></p>
  </>
  )
  
}

const Authentication = () =>{
  return (
  <>
    <p>Sign in</p>
    <button type="button">Sign up</button>
  </>
  )
}

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="nv11navbar">
      <div className="nv11navbarLinks">
        <div className="nv11navbarLinksLogo">
          <img src={logo} alt="logo" height="90" width="90"/>
          </div>
        <div className="nv11navbarLinksContainer">
          <Menu/>
        </div>
      </div>
      <div className="nv11navbarLinksSign">
      <Authentication/>
      </div>
      <div className="nv11navbarMenu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu ? (
        <div className="scale-up-center nv11navbarMenuContainer">
          <div className="nv11navbarMenuLinks">
            <Menu/>
          </div>
          <div className="nv11navbarMenuSigns">
          <Authentication/>
          </div>
        </div>
        ):null}
      </div>
    </div>
  );
};

export default memo(Navbar);
