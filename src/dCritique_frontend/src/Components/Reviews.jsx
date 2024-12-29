import React, { useState, useEffect } from "react";
import r from "../Styles/Reviews.module.css";

import { dCritique_backend } from "../../../declarations/dCritique_backend/index";
function Reviews() {
  const [LikeCount, setLikeCount] = useState(0)
  const [DisCount, setDisCount] = useState(0)
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await dCritique_backend.getReview();
    setData(res);
    console.log(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

      const handleButtonClick = (event) => {
        var a = 0;
      const button = event.target;
      const buttonType = button.getAttribute("data-type");
  
      if (
        buttonType === "like" ||
        buttonType === "dislike"
      ) {
        const post = button.closest(".votebtns");
        const activeButton = post.querySelector(`.${buttonType}Active`);
  
        if (activeButton) {
          activeButton.classList.remove(`${buttonType}Active`);
          activeButton.classList.add(`${buttonType}`);
        } else {
          button.classList.add(`${buttonType}Active`);
          button.classList.remove(`${buttonType}`);
        }
  
        if (buttonType === "like") {
          a+=1;
          setLikeCount(a)
          setDisCount(0)
          post.querySelector(".b").classList.add("dislike");
          post.querySelector(".b").classList.remove("dislikeActive");
        } else if (buttonType === "dislike") {
          a+=1;
          setDisCount(a)
          setLikeCount(0)
          post.querySelector(".a").classList.add("like");
          post.querySelector(".a").classList.remove("likeActive");
        }
      }
    };

  const reviews = data.map((a) => (
    <ul>
      <li className={r.item}>
        <div className={r.review}>
          <div className={r.imgContainer}>
            <img className={r.image} src={a.images} alt="rev" />
          </div>
          <span className={r.text}>{a.review}</span>
        </div>
        <span className={r.star}>{a.stars}⭐</span>
        <div onClick={handleButtonClick} className="votebtns">
          <button id="like" data-type="like" className="like a">👍{LikeCount}</button>
          <button id="dislike" data-type="dislike" className="dislike b">👎{DisCount}</button>
        </div>
      </li>
    </ul>
  ));

  return <>{reviews}</>;
}

export { Reviews };
