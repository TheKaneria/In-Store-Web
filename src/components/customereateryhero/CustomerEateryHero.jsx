import React from "react";
import images from "../../constants/images";

const CustomerEateryHero = ({ getsingalmalldata, getedetalis, sidebaropen }) => {
    // ("aaaaaa", getsingalmalldata);
    return (
        <div className="mall_hero_main_wrapp" style={{marginLeft: sidebaropen ? "-28px" : "-31px", width: '-webkit-fill-available'}}>
            <img
                src={
                    getedetalis.store_banner_path === null
                        ? images.mall_hero_banner
                        : getedetalis.store_banner_path
                }
                alt=""
                className="mall_hero_banner_img img_fluid_position"
            />
            <div className="mall_hero_logo_wrapp">
                <img
                    src={
                        getedetalis.store_logo_path === null
                            ? images.mall_hero_logo
                            : getedetalis.store_logo_path
                    }
                    alt=""
                />
            </div>
        </div>
    );
};

export default CustomerEateryHero;
