import React, { useEffect } from "react";
import "./PromotionHero.css";
import images from "../../constants/images";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const PromotionHero = ({ getdprodata }) => {
  var settings = {
    // dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };

  // ("123 slider",getdprodata);

  return (
    <Carousel  autoPlay={true}       // Enable autoplay
    interval={2000}       // Set autoplay interval to 1 second (1000 ms)
    infiniteLoop={true}   // Loop carousel infinitely
    showThumbs={false}    // Optional: Hide thumbnail navigation
    showStatus={false}    // Optional: Hide the status (e.g., 1/3)
    showArrows={true}     // Optional: Show left/right arrows
    stopOnHover={true}
    showIndicators={false} // Hide the dots (indicators)

     >
   {getdprodata && getdprodata.length > 0
        ? getdprodata.map((x, i) => {
          return (
            <div className="mall_hero_main_wrapp customer_side_leaderboard_main">
              <img 
                src={
                  x.image_path === null
                    ? images.hero_profile_banner
                    : x.image_path
                }
                alt=""
                className="mall_hero_banner_img customer_side_leaderboard_img" style={{ objectFit: "initial" }}
              />
            </div>
          );
        })
        : null}
</Carousel>
    // <Slider {...settings}>
    // {/* {getdprodata && getdprodata.length > 0
    //     ? getdprodata.map((x, i) => {
    //       return (
    //         <div className="mall_hero_main_wrapp customer_side_leaderboard_main">
    //           <img 
    //             src={
    //               x.image_path === null
    //                 ? images.hero_profile_banner
    //                 : x.image_path
    //             }
    //             alt=""
    //             className="mall_hero_banner_img customer_side_leaderboard_img" style={{ objectFit: "initial" }}
    //           />
    //         </div>
    //       );
    //     })
    //     : null} */}
    // </Slider>

    // <Slider {...settings}>
    //   {getdprodata && getdprodata.length > 0
    //      ? getdprodata.map((x, i) => {
    //        return (
    //          <div className="mall_hero_main_wrapp">
    //            <img
    //              src={
    //                x.image_path === null
    //                  ? images.hero_profile_banner
    //                  : x.image_path
    //              }
    //              alt=""
    //              className="mall_hero_banner_img" style={{ objectFit: "initial" }}
    //            />
    //          </div>
    //        );
    //      })
    //      : null}
    //  </Slider>
    // <div style={{width:"100%"}}>
    //  <Slider {...settings}>
      
    //         <div className="mall_hero_main_wrapp">
    //           <img
    //             src={
    //                images.hero_profile_banner
                    
    //             }
    //             alt=""
    //             className="mall_hero_banner_img" style={{ objectFit: "initial" }}
    //           />
    //         </div>
    //         <div className="mall_hero_main_wrapp">
    //           <img
    //             src={
    //               images.hero_profile_banner
                    
    //             }
    //             alt=""
    //             className="mall_hero_banner_img" style={{ objectFit: "initial" }}
    //           />
    //         </div>
        
    // </Slider>
    // </div>

    //     <Slider {...settings}>
     
    //         <div className="mall_hero_main_wrapp">
    //           <img
    //             src={
             
    //                  images.hero_profile_banner
                
    //             }
    //             alt=""
    //             className="mall_hero_banner_img" style={{ objectFit: "initial" }}
    //           />
    //         </div>
    //         <div className="mall_hero_main_wrapp">
    //           <img
    //             src={
                 
    //                  images.hero_profile_banner
                 
    //             }
    //             alt=""
    //             className="mall_hero_banner_img" style={{ objectFit: "initial" }}
    //           />
    //         </div>
      
    // </Slider>
  );
};

export default PromotionHero;

//  <div className="mall_hero_main_wrapp">
//         <img
//           src={images.hero_profile_banner}
//           alt=""
//           className="mall_hero_banner_img"
//         />
//       </div>
//       <div className="mall_hero_main_wrapp">
//         <img
//           src={images.hero_profile_banner}
//           alt=""
//           className="mall_hero_banner_img"
//         />
//       </div>
