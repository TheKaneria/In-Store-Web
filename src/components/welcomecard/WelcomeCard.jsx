import React from 'react'
import "./WelcomeCard.css";
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const WelcomeCard = ({ img1, h3, h4, color, wc_btn, wc_btnlink }) => {
  return (
    <div
      className="wc_card_main_wrapp wc_card_main_wrapp_retailer"
      style={{ background: color, margin: "0px" }}>
      <img src={img1} alt="" className="wc_bottom_img" />
      {/* <div className="wc_top_dot"></div> */}
      <div className="wc_text_wrapp">
        <h3
          className="h3 wel_card_headd"
          dangerouslySetInnerHTML={{
            __html: h3, 
          }}
          >
          {/* {h3} */}
          
        </h3>
        {/* <h4 className="h4">{h4}</h4> */}
        <h4
          
          className="h4 h3 wel_card_sub_headd"
          dangerouslySetInnerHTML={{
            __html: h4,
          }}></h4>
        {wc_btn && (
          <Link to={wc_btnlink} className="wc_btn_wrapp wc_btn_wrapp_comp">
            <p className="mall_cards_btn">{wc_btn}</p>
            <BsArrowRight size={26} color="#fff" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default WelcomeCard