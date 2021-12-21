import React, { memo } from "react";
import { useHistory } from "react-router-dom";

import { Feature } from "..";

import "./transcriptSummariser.css";

const transcriptSummariserData = [
  {
    title: "Selection Process Easier",
    text: "When researching documents, summaries make the selection process easier.",
  },
  {
    title: "Less Bias than Human",
    text: "Automatic summarization algorithms are less biased than human summarizers.",
  },
  {
    title: "Useful For Future Reference",
    text: "Personalized summaries are useful in question-answering systems as they provide personalized information.",
  },
  {
    title: "Reduces Time",
    text: "Summaries reduce reading time.",
  },
];

const TranscriptSummariser = () => {
  const history = useHistory();

  const handleButtonClick = (e) => {
    history.push(`/${e}`);
  };

  return (
    <div className="ts121Features sectionPadding" id="Summariser">
      <div className="ts121FeaturesHeading">
        <h1 className="gradientText">
          Transcript summarizer can condense text documents down to the key
          points instantly, while maintaining the original context.
        </h1>
        <div className="ts121Button">
          <button
            type="button"
            onClick={() => handleButtonClick("TranscriptSummariser")}
          >
            Transcript Summarise
          </button>
        </div>
      </div>

      <div className="ts121FeaturesContainer">
        {transcriptSummariserData.map((item, index) => (
          <Feature
            title={item.title}
            text={item.text}
            key={item.title + index}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(TranscriptSummariser);
