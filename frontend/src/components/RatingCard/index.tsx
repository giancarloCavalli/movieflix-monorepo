import { ReactComponent as RatingStar } from "assets/images/rating-star.svg";
import { Review } from "types/review";

import "./styles.css";

type Props = {
  review: Review
}

const RatingCard = ({ review }: Props) => {
  return (
    <div className="rating-card-container">
      <span className="star-wrapper"><RatingStar /></span>
      <span className="rating-username"><b>{review.user.name}</b></span>
      <div className="comment-box">
        {review.text}
      </div>
    </div>
  );
};

export default RatingCard;
