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
          const { content, highlight_indices } = review;
      
          if (!content || !highlight_indices || !highlight_indices.length) {
            return <div>{content}</div>;
          }
      
          let lastIndex = 0;


          const highlightedText = highlight_indices.map((highlight, index) => {
            const [start, end, sentiment] = highlight;
            // if(start === -1){
            //   return null;
            // }
            const nonHighlightedPart = content.slice(lastIndex, start);
            const highlightedPart = content.slice(start, end);
      
            lastIndex = end;
      
            const color = getColorForSentiment(sentiment);
      
            return (
              <React.Fragment key={index}>
                {nonHighlightedPart}
                <span style={{ backgroundColor: color }}>{highlightedPart}</span>
              </React.Fragment>
            );
          });
      
          // Including  remaining text after highlighted section
          const remainingText = content.slice(lastIndex);
          
          return [...highlightedText, <span key="remaining">{remainingText}</span>];
        };
        return <div>{renderHighlightedText()}</div>;
      };
      
      
      export default ReviewHighlighter;