import React from 'react';
import {Article} from '../../../ui';

import { blog01, blog02, blog03, blog04, blog05 } from './imports';

import './blog.css';

const blogLinks = [
    {
      title: 'Natural Language Processing Technology',
      imgUrl: blog01,
      link: 'https://medium.com/greyatom/a-dive-into-natural-language-processing-103ae9b0a588',
    },
    {
      title: 'Speech Recognition',
      imgUrl: blog02,
      link: 'https://jonathan-hui.medium.com/speech-recognition-deep-speech-ctc-listen-attend-and-spell-d05e940e9ed1',
    },
    {
      title: 'Text Summarisation Using Deep Learning',
      imgUrl: blog03,
      link: 'https://medium.com/@blogsupport/link-summarization-using-deep-learning-techniques-fb9fb628881d',
    },
    {
      title: 'Speech to Text Conversion',
      imgUrl : blog04,
      link: 'https://towardsdatascience.com/easy-speech-to-link-with-python-3df0d973b426',
    },
    {
        title: 'Coding In Deep Learning',
        imgUrl : blog05,
        link: 'https://towardsdatascience.com/coding-deep-learning-for-beginners-start-a84da8cb5044'
    }
  ];
    

const Blog = () => (
  <div className="gpt3__blog sectionPadding" id="blog">
    <div className="gpt3__blog-heading">
      <h1 className="gradientText">A lot is happening about this, <br /> Our Refrences for Deep Learning.</h1>
    </div>
    <div className="gpt3__blog-container">
      <div className="gpt3__blog-container_groupA">
        <Article imgUrl={blog01} title={blogLinks[0].title} link={blogLinks[0].link} />
      </div>
      <div className="gpt3__blog-container_groupB">
        {blogLinks.map((item, index) => 
            <>
            {index ? 
                <Article imgUrl={item.imgUrl} title={item.title} link={item.link} key={item.title + index} />
                :null
            }
        </>
      )}     
      </div>
    </div>
  </div>
);

export default Blog;