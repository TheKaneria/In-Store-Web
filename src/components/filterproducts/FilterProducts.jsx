import React, { useEffect, useState } from "react";
import "../../components/customerbrandcard/CustomerBrandCard.css";
import images from "../../constants/images";
import { FiHeart } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

import { HiOutlineSearch } from "react-icons/hi";
import {
  ACCEPT_HEADER,
  add_wishlist,
  remove_wishlist,
} from "../../utils/Constant";
import axios from "axios";
import Modal from "react-modal";


const FilterProducts = ({ data, getmovieapi, replce, mainitem, getWishlist, getid, FilterApi, getsingalmalldata }) => {
  // console.log("replace", replce);
  // console.log("getid", getid);
  // useEffect(() => { ("=>", data); }, []);

  const [getlist, SetList] = useState([]);
  const [loading, SetLoading] = useState(false);

  const [getQrValue, setQrValue] = useState();
  const [getQrDiscount, setQrDiscount] = useState();


  const [modalIsOpen, setIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center",
      padding: "2rem",
    },
  };
  function closeModal() {
    setIsOpen(false);
  }

  const getmovielist = async () => {
    SetLoading(true);
    const token = JSON.parse(localStorage.getItem("is_token"));

    const formdata = new FormData();
    formdata.append("product_id", data.id);
    formdata.append("mall_id", getsingalmalldata.id);

    axios
      .post(add_wishlist, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // ("ggg", JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          // getmovieapi(getid);
          FilterApi()
          SetLoading(false);
        } else {
          null;
          SetLoading(false);
        }
      })
      .catch((err) => {
        console.log("err11", err);
        SetLoading(false);
      });
  };

  const removelist = async () => {

    // ('mainid', mainitem.id);
    SetLoading(true);
    const token = JSON.parse(localStorage.getItem("is_token"));

    const formdata = new FormData();
    formdata.append("product_banner_tiles_id", data.id);


    axios
      .post(remove_wishlist, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // ("ggg", JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          // getmovieapi(getid);
          FilterApi();
          SetLoading(false);
        } else {
          null;
          SetLoading(false);
        }
      })
      .catch((err) => {
        console.log("err11", err);
        SetLoading(false);
      });
  };

  return (
    <>
      <div className="cbc_main_wrapp">
        <div
          // className="cbc_img_wrapp" 
          className={`${data.is_cinema_product_banner_tiles === 1
              ? "cbc_img_wrapp cbc_img_wrapp_movie"
              : "cbc_img_wrapp"
            }`}>
          <img
            src={data.image_path ? data.image_path : ""}
            // src={images.brand_page_hero}
            className="cbc_img"
            alt="brand image"
          />
          {replce == 1 ? (
            <>
              {data.is_wishlist == 1 ? (
                <button
                  onClick={() => {
                    removelist(getid);
                  }}
                  className="cbc_card_hart_icon">
                  {/* <FiHeart size={20} /> */}
                  <img src={images.heart_orange} />
                </button>
              ) : (
                <button
                  className="cbc_card_hart_icon"
                  onClick={() => {
                    getmovielist(getid);
                  }}
                >
                  {/* <FiHeart size={20} /> */}
                  <img src={images.heart_img} style={{ width: "18px", height: "18px" }} />
                </button>
              )}
            </>
          ) : replce == 2 ? (
            <>
              <button
                className="cbc_card_hart_icon"
                onClick={() => {
                  removelist();
                }}
              >
                <img src={images.heart_orange} />
              </button>
            </>
          ) : null}
        </div>
        <p className="cbc_name cbc_name2">{data.title ? data.title : ""} </p>
        {/* <p className="cbc_name">fdgdfg </p> */}
        {data.is_cinema_product_banner_tiles === 1 ? <></> : <p className="cbc_price">R{data.price ? data.price : ""} </p>}

        {/* <p className="cbc_price">$23213 </p> */}
        <p className="cbc_des">
          {data.stores ? (data.stores.name ? data.stores.name : "") : ""}
        </p>
        {data.is_cinema_product_banner_tiles === 1 ? <>                <a href={data.booking_url} className="movies-card-btn btn btn-black" target="_blank">Book now</a>
        </> : <></>}

        <p className="cbc_des">Only Available In Store</p>

        {data?.qr_discount == null ? <></> : <>
          <button
            className="disc10_btn"
            onClick={() => {
              setQrValue(data.qr_image_path ? data.qr_image_path : "");
              setQrDiscount(data.qr_discount ? data.qr_discount : "");
              setIsOpen(true);

            }}>
            {data.qr_discount ? data.qr_discount : ""} Discount QR Code
          </button></>}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ alignSelf: "flex-end" }}>
            <RxCross2 style={{ position: "absolute", top: "15px", right: "10px", cursor: "pointer" }}
              onClick={() => {
                closeModal();
              }}
            />
          </div>
          <div
            style={{
              fontWeight: "600",
              fontSize: "18px"
            }}>
            Scan QR code to receive your In-store {getQrDiscount} discount!
          </div>
          <div>
            {/* <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
              alt=""
              style={{ height: "150px" }}
            /> */}
            <img
              src={getQrValue}
              alt=""
              style={{ height: "150px" }}
            />
          </div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "400",
              color: "darkslategray",
            }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et quidem
            excepturi possimus.
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FilterProducts;