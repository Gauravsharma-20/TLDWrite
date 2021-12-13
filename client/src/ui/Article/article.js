import React from 'react';

import './article.css';

const Article = ({ imgUrl, title, link }) => (
  <div className="gpt3__blog-container_article">
    <div className="gpt3__blog-container_article-image">
      <img src={imgUrl} alt="blog_image" />
    </div>
    <div className="gpt3__blog-container_article-content">
      <div>
        <h3>{title}</h3>
      </div>
      <a href={link}>Read Full Article</a>
    </div>
  </div>
);

export default Article;