import React from "react";

import "./article.css";

const Article = ({ imgUrl, title, link }) => (
  <div className="ar91container">
    <div className="ar91containerImage">
      <img src={imgUrl} alt="blogImage" />
    </div>
    <div className="ar91containerContent">
      <div>
        <h3>{title}</h3>
      </div>
      <a href={link} target="_blank" rel="noreferrer">
        Read Full Article
      </a>
    </div>
  </div>
);

export default Article;
