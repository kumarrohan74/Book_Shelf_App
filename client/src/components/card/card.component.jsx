import React from "react";
import './card.styles.css';

const Card = (props) => {

    const {bookData} = props;
    return (
        <div className="card-container">
            <div className="img">
                <img src={bookData.Image_Url} />
            </div>
            <div className="details-container">
                <h1>{bookData.Title}</h1>
                <h2>By: {bookData.Author}</h2>
                <h3>Genre: {bookData.Genre}</h3>
                <h4>Published in year: {bookData.Published_Date}</h4>
            </div>

        </div>
    )

}

export default Card;