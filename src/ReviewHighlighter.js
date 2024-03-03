import React from 'react';

// const ReviewHighlighter = ({ reviews }) => {
//   const getColorForSentiment = (sentiment) => {
//     const colorCodes = {
//       positive: '#D9F2DD',
//       negative: '#F2DBD9',
//       mixed:'#e8bd6d3d',
//       neutral: '#eaf09b6b',
//     };
//   }
// }

const ReviewHighlighter = ({ review }) => {
  if (!review) {
    return <div>No content to display.</div>;
  }

  const getColorForSentiment = (sentiment) => {
    switch (sentiment) {
      case 'Positive':
        return '#D9F2DD';
      case 'Negative':
        return '#F2DBD9';
      case 'mixed':
        return '#e8bd6d3d';
      case 'neutral':
        return '#eaf09b6b';
      default:
        return 'transparent';
    }
  };

  const renderHighlightedText = () => {
    const { content, analytics } = review;

  if (!content || !analytics || !analytics.length) {
    return <div>{content}</div>;
  }

  let lastIndex = 0;

  const highlightedText = analytics.map((analytic, index) => {
    const { sentiment, sentences } = analytic;

    if (!sentences || !sentences.length) {
      return null;
    }

    const highlightedSentences = sentences.map((sentence, sentenceIndex) => {
      const color = getColorForSentiment(sentiment);
      const highlightedPart = <span style={{ backgroundColor: color }}>{sentence}</span>;

      if (sentenceIndex === 0) {
        // For the first sentence, include the non-highlighted text before it
        const nonHighlightedPart = content.slice(lastIndex, sentence.start);
        lastIndex = sentence.end;
        return (
          <React.Fragment key={sentenceIndex}>
            {nonHighlightedPart}
            {highlightedPart}
          </React.Fragment>
        );
      } else {
        return highlightedPart;
      }
    });

    return highlightedSentences;
  });

  // const remainingText = content.slice(lastIndex);

  return (
    <div>
      {highlightedText.flat()}
      {/* <span key="remaining">{remainingText}</span> */}
    </div>
  );
  };
  return <div className="content-text" >{renderHighlightedText()}</div>;
};


export default ReviewHighlighter;