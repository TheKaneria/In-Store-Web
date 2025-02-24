import React from "react";
import "./MoviesCard.css";
import images from "../../constants/images";
import { Link } from "react-router-dom";

const MoviesCard = ({ item }) => {
    return (
        <div>
            <div className="movies-card-main">
                <img
                    className="movies-card-img"
                    src={item.image_path ? item.image_path : images.movies_card}
                />
                <p className="movies-card-name">{item.title ? item.title : ""} </p>
                <p className="movies-card-digit">
                    {" "}
                    {item.age_restrictions ? item.age_restrictions.name : ""}{" "}
                </p>
                <p className="movies-card-desc">
                    {" "}
                    {item.genres ? item.genres.name : ""}{" "}
                </p>
                <a href={item.booking_url} className="movies-card-btn btn btn-black" target="_blank">Book now</a>
                {/* <Link to={`${item.booking_url}`} target="_blank">Test</Link> */}
            </div>
        </div>
    );
};

export default MoviesCard;