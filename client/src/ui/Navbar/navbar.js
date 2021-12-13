import React, { useState, memo } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

import logo from '../../utils/assets/TLDWrite.png';

import './navbar.css';


const Menu = () =>{
  return (
    <>
    <p><a href="#home">Home</a></p>
    <p><a href="#tldWrite">What is TLDWrite?</a></p>
    <p><a href="#Summariser">Transcript Summarisation</a></p>
    <p><a href="#SpeechToText">Speech to Text</a></p>
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
    <div className="gpt3__navbar nv11navbar">
      <div className="gpt3__navbar-links nv11navbarLinks">
        <div className="gpt3__navbar-links_logo nv11navbarLinksLogo">
          <img src={logo} alt="logo" height="90" width="90"/>
          </div>
        <div className="gpt3__navbar-links_container nv11navbarLinksContainer">
          <Menu/>
        </div>
      </div>
      <div className="gpt3__navbar-sign nv11navbarLinksSign">
      <Authentication/>
      </div>
      <div className="gpt3__navbar-menu nv11navbarMenu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu ? (
        <div className="gpt3__navbar-menu_container scale-up-center nv11navbarMenuContainer">
          <div className="gpt3__navbar-menu_container-links nv11navbarMenuLinks">
            <Menu/>
          </div>
          <div className="gpt3__navbar-menu_container-links-sign nv11navbarMenuSigns">
          <Authentication/>
          </div>
        </div>
        ):null}
      </div>
    </div>
  );
};

export default memo(Navbar);