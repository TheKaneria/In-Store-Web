import React, { useState } from 'react'
import { FaPhone } from 'react-icons/fa';
import ReactModal from 'react-modal';
import images from '../../constants/images';
import "./BrandInMallCard.css"

const BrandInMallCard = ({ img, setTab,brndItm }) => {

    const [brandModalOpen, setBrandModalClose] = useState(false)
    const [getDataStore, setDataStore] = useState()

    console.log("brndItm",brndItm);
    

    function closeModal() {
        setBrandModalClose(false);
    }

    

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
    return (
        <div className='my_brand_in_mall_logos_wrapp'>
            <button
                onClick={() => {
                    // setSingleStoreData(itm);
                    // setIsOpen(true);
                    setBrandModalClose(true);
                    setDataStore(brndItm);
                }}
                className="stored_card_wrapp stored_card_wrapp_brand_in"
            >
                {/* <div className="stored_card_edit_wrapp">
                    <button className="stored_card_edit_btn">
                        <img src={images.card_edit} alt="" />
                    </button>
                    <button className="stored_card_edit_btn">
                        <img src={images.card_cancle} alt="" />
                    </button>
                </div> */}
                <img src={img} alt="" className="stored_card_img" />
            </button>

            {/* store detail model */}

            <ReactModal
                isOpen={brandModalOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="sd_model_wrapp">
                    {/* edit btn */}
                    {/* edit and delete orange btns start */}
                    <div className="sd_model_edit_wrap">


                        {/* <button
                            className="sd_modal_edit_btn_wrapp"
                            onClick={() => {
                                setTab(10);
                                // setStore_id(getDataStore.id);
                            }}
                        >
                            <img src={images.edit_orange} alt="" />
                            <p>Edit</p>
                        </button>
                        <button
                            className="sd_modal_edit_btn_wrapp"
                            onClick={() => {
                                // setTab(9);
                                // setStore_id(getDataStore.id);
                                // DeleteMallStoreData();
                            }}
                        >
                            <img src={images.cancle_orange} alt="" />
                            <p>Delete</p>
                        </button> */}

                        <button onClick={closeModal}>
                            <img src={images.close} alt="" />
                        </button>
                    </div>
                    {/* edit and delete orange btns end */}

                    {/* pert - 1 */}
                 
                    <div className="sd_model_sec1">
                        <div className="sd_model_sec1_img_wrapp">
                            {/* <img src={images.et_logo2} alt="" /> */}
                            <img src={getDataStore?.store_logo_path} alt=""  style={{objectFit:"cover"}}/>
                        </div>
                        <div className="sd_model_sec1_name_part" style={{gap:"0.5rem"}}>
                            <h3
                                className="h3 mb_8"
                                style={{ letterSpacing: "1px", fontWeight: "600" }}
                            >
                                {/* PIER */}
                                {getDataStore?.name}
                            </h3>
                            {getDataStore?.role == 6 ? <>
                        
                        </> : <>
                            <p>
                                Shop no: <span>{getDataStore?.parrentstore?.store_no}</span>
                            </p>
                            <p>
                                Level:
                                <span>{getDataStore?.parrentstore?.store_level}</span>
                            </p>
                            {/* <p>
                                Trading Hours:
                                <span>
                                    9am - 9pm
                                </span>
                            </p> */}

                            <div className="sd_modal_time_inner">
                  <p>
                    <span style={{ fontSize: "14px", fontWeight: "400" }}>Mon - Fri: {getDataStore?.parrentstore?.mon_fri_from_time === "" ||
                      getDataStore?.parrentstore?.mon_fri_from_time == null ||
                      getDataStore?.parrentstore?.mon_fri_from_time == "undefined"
                      ? ""
                      : getDataStore?.parrentstore?.mon_fri_from_time}am - {getDataStore?.parrentstore?.mon_fri_to_time === "" ||
                        getDataStore?.parrentstore?.mon_fri_to_time == null ||
                        getDataStore?.parrentstore?.mon_fri_to_time == "undefined"
                        ? ""
                        : getDataStore?.parrentstore?.mon_fri_to_time}pm</span></p>

                  <p><span style={{ fontSize: "14px", fontWeight: "400" }}>Sat: {getDataStore?.parrentstore?.sat_from_time === "" ||
                    getDataStore?.parrentstore?.sat_from_time == null ||
                    getDataStore?.parrentstore?.sat_from_time == "undefined"
                    ? ""
                    : getDataStore?.parrentstore?.sat_from_time}am - {getDataStore?.sat_to_time === "" ||
                      getDataStore?.parrentstore?.sat_to_time == null ||
                      getDataStore?.parrentstore?.sat_to_time == "undefined"
                      ? ""
                      : getDataStore?.parrentstore?.sat_to_time}pm</span></p>

                  <p><span style={{ fontSize: "14px", fontWeight: "400" }}>Sun: {getDataStore?.parrentstore?.sun_from_time === "" ||
                    getDataStore?.parrentstore?.sun_from_time == null ||
                    getDataStore?.parrentstore?.sun_from_time == "undefined"
                    ? ""
                    : getDataStore?.parrentstore?.sun_from_time}am - {getDataStore?.parrentstore?.sun_to_time === "" ||
                      getDataStore?.parrentstore?.sun_to_time == null ||
                      getDataStore?.parrentstore?.sun_to_time == "undefined"
                      ? ""
                      : getDataStore?.parrentstore?.sun_to_time}pm</span></p>


                  <p><span style={{ fontSize: "14px", fontWeight: "400" }}>Public Holiday: {getDataStore?.parrentstore?.holiday_from_time === "" ||
                    getDataStore?.parrentstore?.holiday_from_time == null ||
                    getDataStore?.parrentstore?.holiday_from_time == "undefined"
                    ? ""
                    : getDataStore?.parrentstore?.holiday_from_time}am - {getDataStore?.parrentstore?.holiday_to_time === "" ||
                      getDataStore?.parrentstore?.holiday_to_time == null ||
                      getDataStore?.parrentstore?.holiday_to_time == "undefined"
                      ? ""
                      : getDataStore?.parrentstore?.holiday_to_time}pm</span></p>


                </div>
                </>}
                        </div>
                    </div>
                  
                    
                    {/* pert - 2 */}
                    <div className="sd_model_sec2">
                        <div className="sd_model_sec2_sigle">
                            <FaPhone color="var(--color-orange)" size={16} />
                            <p>{getDataStore?.number}</p>
                        </div>
                        <div className="sd_model_sec2_sigle">
                            <img src={images.send} alt="" />
                            <p>{getDataStore?.email}</p>
                        </div>
                    </div>
                    {/* pert - 3 */}
                    <div className="sd_model_sec3">
                        {/* <p>Situated in the Clock Tower on the Fish Quay is Vida e Caffè. Inspired by the street cafés of
                            Portugal, and infused with the vivacious energy of the people of Africa, Vida e Caffè is passionate
                            about their coffee. Based on the fare typical of a street in Lisbon, Vida e Caffè allows you to enjoy a
                            cup of Europe in Africa. A passion for perfection means this cafè always strives to serve the best
                            espresso and espresso-based caffè beverages possible. The signature coffee bean has been
                            meticulously selected and sourced from afar, taking up to three months to reach the stores. Here
                            they’ve mastered the art of blending, discovered the ideal roasting time, and found the exact
                            temperature to ensure your cup of Vida is the best quality it can possibly be. Also try some of the
                            delectable desserts and light meals.</p> */}
                        <p>{getDataStore?.description}</p>
                    </div>
                </div>
                {/* </div> */}
            </ReactModal>
        </div>
    );
}

export default BrandInMallCard