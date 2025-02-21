import React from "react";
import images from "../constants/images";

const CustomerHeroCinema = ({getlist2, item, }) => {
  // console.log("aaaaaa", item);
  return (
    <div className="mall_hero_main_wrapp">
      <img
        src={
          item && item.store_banner_path === null
            ? images.mall_hero_banner
            : item && item.store_banner_path
        }
        alt=""
        className="mall_hero_banner_img img_fluid_position"
      />
      <div className="mall_hero_logo_wrapp">
        <img
          src={
            item && item.store_logo_path === null
              ? images.mall_hero_logo
              : item && item.store_logo_path
          }
          alt=""
        />
      </div>
    </div>
  );
};

export default CustomerHeroCinema;
