import React, { useEffect, useState } from "react";
import "./AboutInStorePage.css";
import { Navbar } from "../../common";
import images from "../../constants/images";
import { RegisterMall } from "../../container";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import { ACCEPT_HEADER, add_rating, get_about } from "../../utils/Constant";
import Notification from "../../utils/Notification";

import ReactModal from "react-modal";
import Rating from "react-rating";
import { AiOutlineClose } from "react-icons/ai";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
    backgroundColor: "none",
    border: "none",
    borderRadius: "0px",
  },
  overlay: {
    zIndex: 10000,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
};

const AboutInStorePage = () => {
  const [getStoreData, setStoreData] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalIsOpen5, setIsOpen5] = useState(false);
  const [getsingalmalldata2, SetSingalMallData2] = useState({});
  const [getrating, setRating] = useState("");


  useEffect(() => {
    getStoreDataApi();
    showModal();
  }, []);

  const showModal = async () => {
    const data = JSON.parse(localStorage.getItem("malldata"));
    if (data) {
      setIsOpen5(true);
      SetSingalMallData2(data);
    } else {
      setIsOpen5(false);
    }
  }

  const getStoreDataApi = async () => {
    setLoading(true);
    axios
      .get(get_about, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      })
      .then((res) => {
       
       
        if (res.data.success == 1) {
          setStoreData(res.data.data[0]);
          setLoading(false);
        } else {
          // null;
        }
      })
      .catch((err) => {
        console.log("error11",err);

      });
  };

  function closeModal5() {
    setIsOpen5(false);
  }

    // Add Rating Api

    const addRating = async () => {
      const token = await JSON.parse(localStorage.getItem("is_token"));
  
      if (getrating == "" || undefined) {
        Notification("error", "Error!", "Please give rating");
      } else {
        const formdata = await new FormData();
        formdata.append("mall_id", getsingalmalldata2.id);
        formdata.append("rating", getrating);
  
        try {
          const response = await axios.post(add_rating, formdata, {
            headers: {
              Accept: ACCEPT_HEADER,
              Authorization: "Bearer " + token,
            },
          });
  
          if (response.data.success == 1) {
            // setTab(4);
            setIsOpen5(false);
            localStorage.removeItem("malldata");
            // logout();
            // getMallList();
            // window.location.reload(true);
  
          }
          return response.data;
        } catch (error) {
          console.log("error11", error);
  
        }
      };
    }

  return (
    <>
      {loading === true ? (
        <div
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <Helmet>
            <title>About | In-store</title>
          </Helmet>
          <Navbar
          // setCustomerDropdown={setCustomerDropdown}
          // getcustomerDropdown={getcustomerDropdown}
          />

          <div>
            {/* <Navbar /> */}
            {/* hero start */}
            {/* <div className="about_hero_wrapp">
          <img src={images.about_hero} alt="" />
        </div> */}

            <div
              className="about_hero_wrapp"
              style={{
                // backgroundImage: `url(${images.about_hero})`,
                backgroundImage: `url(${getStoreData ? getStoreData.image_path : ""
                  })`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}>
              {/* <img src={images.hero_banner} alt="" /> */}
              <div className="homehero_text_main">
                <div className="homehero_text_base homehero_text_base_retailer">
                  {/* <img src={images.instore_app_header_logo} alt="" /> */}
                  <img
                    src={getStoreData ? getStoreData.logo_img_path : ""}
                    alt=""
                  />
                  {/* social media account button start */}
                  <div className="apps_logos_wrapp">
                    {/* <img src={images.play_store_logo} alt="play store logo" /> */}
                    <img
                      src={getStoreData ? getStoreData.play_store_img_path : ""}
                      alt="play store logo"
                      className="app_logo"
                    />
                    <img
                      src={getStoreData ? getStoreData.app_store_img_path : ""}
                      alt="app store logo"
                      className="app_logo"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* hero end */}
            {/* about in store start */}
            <div className="main_wrapp mt_16">
              <div className="container whayjoin_wrapp about-extra-gap-section">
                <h1 className="h1 mb_10" style={{fontWeight:"600"}}>
                  {getStoreData ? getStoreData.about_title : ""}
                </h1>
                <p className="mb_16 about_page_about_sec_txt" style={{fontSize:"14px"}}>
                  {getStoreData ? getStoreData.about_description : ""}
                  {/* Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat. */}
                </p>
                <div className="whyjoin_grid">
                  <div className="whyjoin_grid_item">
                    <img
                      src={getStoreData ? getStoreData.about_image_1_path : ""}
                      alt=""
                    />

                    <p style={{fontSize:"14px"}}>
                      {getStoreData ? getStoreData.about_1 : ""}

                      {/* Shopping centre/Mall, promotions and activities are displayed
                  first in the user experience. */}
                    </p>
                  </div>
                  <div className="whyjoin_grid_item">
                    {/* <img src={images.home_location} alt="" /> */}
                    <img
                      src={getStoreData ? getStoreData.about_image_2_path : ""}
                      alt=""
                    />
                    <p style={{fontSize:"14px"}}>
                      {getStoreData ? getStoreData.about_2 : ""}
                      {/* Users can view the shopping centre/Mall from anywhere */}
                    </p>
                  </div>
                  <div className="whyjoin_grid_item">
                    {/* <img src={images.home_shapes} alt="" /> */}
                    <img
                      src={getStoreData ? getStoreData.about_image_3_path : ""}
                      alt=""
                    />
                    <p style={{fontSize:"14px"}}>
                      {getStoreData ? getStoreData.about_3 : ""}
                      {/* Multiple marketing initiatives, promo events, competitions can
                  be featured simultaneously on the platform. */}
                    </p>
                  </div>
                  <div className="whyjoin_grid_item">
                    {/* <img src={images.home_archive} alt="" /> */}
                    <img
                      src={getStoreData ? getStoreData.about_image_4_path : ""}
                      alt=""
                    />
                    <p style={{fontSize:"14px"}}>
                      {getStoreData ? getStoreData.about_4 : ""}
                      {/* Shopping centre/Mall can engage with users via notifications
                  for specials, sales, or events. */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* about instore end */}

            {/* about in store register part-1 start*/}
            {/* <div className="main_wrapp registermall_main_wrapp bg-blue"> */}
            <div className="main_wrapp registermall_main_wrapp " style={{background:"#fff"}}>
              <div className="container registermall_base_wrapp">
                <div className="registermall_sec1">
                  <h2 className="h2"style={{color:"#000",fontWeight:"600"}}>
                    {getStoreData ? getStoreData.details_title_1 : ""}
                    {/* Malls Have More
                <br /> Presence */}
                  </h2>
                  <p style={{color:"#000",fontSize:"14px",fontWeight:"400"}}>
                    {getStoreData ? getStoreData.details_description_1 : ""}

                    {/* Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo. */}
                  </p>
                  <Link to="/mall" className="homepage-black-btn">
                    Register your mall
                  </Link>
                </div>
                <div className="registermall_sec2">
                  <img
                    src={getStoreData ? getStoreData.details_image_1_path : ""}
                    alt=""
                  />
                </div>
              </div>
            </div>
            {/* about in store register part-1 end*/}

            {/* about in store register part-2 start*/}
            <div className="main_wrapp registermall_main_wrapp" style={{background:"#fff"}}>
              <div className="container registermall_base_wrapp fd-rr">
                <div className="registermall_sec1">
                  <h2 className="h2" style={{color:"#000",fontWeight:"600"}}>
                    {getStoreData ? getStoreData.details_title_2 : ""}
                    {/* Stores Can Track
                <br /> Customer Data */}
                  </h2>
                  <p style={{color:"#000", fontWeight:"400", fontSize:"14px"}}>
                    {getStoreData ? getStoreData.details_description_2 : ""}

                    {/* Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo. */}
                  </p>
                  <Link to="/retailer" className="homepage-black-btn">
                    Register your brand
                  </Link>
                </div>
                <div className="registermall_sec2">
                  <img
                    src={getStoreData ? getStoreData.details_image_2_path : ""}
                    alt=""
                  />
                </div>
              </div>
            </div>
            {/* about in store register part-2 end*/}

            <RegisterMall getStoreData={getStoreData} />
          </div>
        </>
      )}

        {/* Rating Modal */}

        <ReactModal
            isOpen={modalIsOpen5}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal5}
            style={customStyles}
          >
            <div className="home_login_model_1sec_inner home_login_model_1sec_inner_cus_rating mall_rating_pading_resp" style={{ padding: "2rem" }}>
              <button className="signup_modal_close" onClick={closeModal5}>
                {/* <span
              style={{ fontSize: "16px" }}
              className="brand-lable-radio-btn-txt"
            >
              Cancel
            </span>{" "} */}
                <AiOutlineClose color="black" />
              </button>
              <div className="f-b900 fs-22 mb_16 signup_headign" style={{ marginTop: "40px", fontSize: "23px", textAlign: "center" }}>How was the {getsingalmalldata2?.name}?</div>
              <p style={{ textAlign: "center", width: "100%", fontSize: "17px" }}>We would really appreciate your feedback!</p>


              <div className="rating-star-box">
                {/* <AiFillStar className="rating-star-icon" key={index}
              onClick={() => handleRatingClick(index + 1)}
              color={index + 1 <= rating ? '#ffc107' : '#e4e5e9'} /> */}
                {/* <AiFillStar className="rating-star-icon" />
            <AiFillStar className="rating-star-icon" />
            <AiFillStar className="rating-star-icon" />
            <AiFillStar className="rating-star-iconn" /> */}
                {/* <Rating
              emptySymbol={<img src={images.graystar} className="icon" style={{marginRight:"20px"}} />}
              fullSymbol={<img src={images.orangestar} className="icon" style={{marginRight:"20px"}}/>}
              onClick={(e) => { 
                setRating(e)
              }}
            /> */}
                <Rating
                  emptySymbol={<img src={images.graystar} className="icon" style={{ marginRight: "20px" }} />}
                  fullSymbol={<img src={images.orangestar} className="icon" style={{ marginRight: "20px" }} />}
                  initialRating={getrating}
                  onClick={(e) => {
                    // console.log("e", e);
                    setRating(e);
                  }}
                />
              </div>
              <div className="sign_input_wrapp">

                {/* <div className="signup_terms_wrapp">
              <input
                type="checkbox"
                value={isAcceptTerm}
                onChange={handleTermChange}
                checked={isAcceptTerm}
              />
              <p className="fs-des">
                I have read and agree to the{" "}
                <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                <a className="signup_terms_link">Privacy Policy</a>
              </p>
            </div> */}
                <div style={{ height: "1px", background: "#aaa", width: '100%', marginTop: "20px", marginBottom: "20px" }}></div>

                {/* <button className="signup_model_forgate">Forgot password?</button> */}
              </div>
              <button
                className="btn btn-orange mb_16"
                onClick={() => addRating()}
              // disabled={isAcceptTerm ? false : true}
              >
                Submit
              </button>

            </div>
          </ReactModal>
    </>
  );
};

export default AboutInStorePage;
