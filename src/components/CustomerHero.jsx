import React from "react";
import images from "../constants/images";

const CustomerHero = ({ getsingalmalldata, getbdetalis, sidebaropen }) => {
  // console.log("aaaaaa", sidebaropen);
  return (
    <div className="mall_hero_main_wrapp" style={{marginLeft: sidebaropen === true ? "-28px" : "-31px", width: '-webkit-fill-available'}}>
      <img
        src={
          getbdetalis.store_banner_path === null
            ? images.mall_hero_banner
            : getbdetalis.store_banner_path
        }
        alt=""
        className="mall_hero_banner_img img_fluid_position"
      />
      <div className="mall_hero_logo_wrapp">
        <img
          src={
            getbdetalis.store_logo_path === null
              ? images.mall_hero_logo
              : getbdetalis.store_logo_path
          }
          alt=""
        />
      </div>
    </div>
  );
};

export default CustomerHero;
