import React, { useState, useEffect } from 'react';
import ReviewHighlighter from './ReviewHighlighter';
// import data from './reviews_data.json';

const ReviewList = () => {
  
  const [reviews, setReviews] = useState([]);
  // let currentIndex=0;
  useEffect(() => {
    // Fetch reviews from the JSON file (assuming it's in the public folder)
    const fetchData = async () => {
      try {
        const response = await fetch('./reviews_data.json');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Reviews</h2>
      <div className='reviewbox'>
        {reviews.map((review,index) => (
          <div key={review.review_id}>
            <div className='top'>
              <img className="user" src='/user.jpeg' alt='#user'></img>
              <h3>{review.reviewer_name}</h3><p>wrote at</p><h3>{review.source.name}</h3>
              <div className='date'>{review.date}</div>
            </div>
            <div className="content"> 
              <div className='rating'>
                Rating: {review.rating_review_score}
              </div>
              {/* <div className='content-text'>
                {review.content}
              </div> */}
            <ReviewHighlighter className="content-text" review={review}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
