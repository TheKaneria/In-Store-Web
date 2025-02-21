import React, { useState } from "react";
// import "./StoreDCard.css";
import images from "../../constants/images";
import { useMallContext } from "../../context/mall_context";
import Notification from "../../utils/Notification";
import ReactModal from "react-modal";
import { mall_delete_eatery } from "../../utils/Constant";
import axios from "axios";

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

const StoreECard = ({
    img,
    setIsOpen,
    itm,
    setSingleStoreData,
    setTab,
    setStore_id,
    getStoreList,
    getEateryList,
    getdelete_popup_data,
}) => {
    const { DeleteStoreApi, DeleteEateriesApi } = useMallContext();


    const [deletemodal, setDeleteModal] = useState(false);

    function closeModal() {
        setDeleteModal(false);
    }
    // const DeleteMallEateryData = async (id) => {
    //     {
    //         const formdata = await new FormData();
    //         await formdata.append("eatery_id", id);

    //         // ("-=-=-=->", formdata);
    //         const data = await DeleteEateriesApi(formdata);
    //         if (data) {
    //             if (data.success === 1) {
    //                 //                     setIsOpen(false);

    //                 Notification("success", "Success!", "Eatery Deleted Successfully!");
    //                 // getStoreList();
    //                 getEateryList();
    //                 // getStore();
    //             }
    //         }
    //     }
    // };

    // const DeleteMallEateryData = async (id) => {
    //     // Validate inputs
    
    
    //     try {
    //       const formdata = await new FormData();
    //       await formdata.append("eatery_id",id);
    
    //       const token = JSON.parse(localStorage.getItem("is_token"));
    
    //       const response = await axios.post(mall_delete_eatery, formdata, {
    //         headers: {
    //           Accept: "application/x.inapp.v1+json",
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });
    //       console.log("res",response);
    //       if (response.data.success === 1) {
    //         Notification("success", "Success!", "Eateries Deleted Successfully!");    
    //         getEateryList();
    //       } else {
    //         Notification("error", "Error!", "Failed to Delete Eatery!");
    //       }
    //     } catch (error) {
    //       console.error("Error deleting eatery:", error);
    //       if (error.response) {
    //         console.error("Response data:", error.response.data);
    //         console.error("Response status:", error.response.status);
    //         console.error("Response headers:", error.response.headers);
    //       }
    //       Notification("error", "Error!", "An error occurred while deleting the eatery.");
    //     }
    //   };

    const DeleteMallEateryData = async (id) => {
        {
          const formdata = await new FormData();
          await formdata.append("store_id",id);
    
          // ("-=-=-=->", formdata);
          const data = await DeleteStoreApi(formdata);
          if (data) {
            if (data.success === 1) {
                        setIsOpen(false);
    
              Notification("success", "Success!", "Eatery Deleted Successfully!");
              setTab(4);
              // getStore();
             getEateryList();
    
            }
          }
        }
      };
    

    return (
        <>
            <div
                // onClick={() => {
                //   setSingleStoreData(itm);
                //   setIsOpen(true);
                // }}
                className="stored_card_wrapp"
            >
                <div className="stored_card_edit_wrapp">
                    <button
                        onClick={() => {

                            // setIsOpen(true);

                            setStore_id(itm.id);
                            setSingleStoreData(itm);
                            setTab(8);
                        }}
                        className="stored_card_edit_btn"
                    >
                        <img src={images.card_edit} alt="" />
                    </button>
                    <button
                        onClick={() => {
                            // setStore_id(itm.id);
                            // DeleteMallEateryData(itm.id);
                            setDeleteModal(true);

                        }}
                        className="stored_card_edit_btn"
                    >
                        <img src={images.card_cancle} alt="" />
                    </button>
                </div>
                <img
                    onClick={() => {
                        setSingleStoreData(itm);
                        setIsOpen(true);
                    }}
                    src={img}
                    alt=""
                    style={{filter:"grayscale(100%)"}} className="stored_card_img"
                />
            </div>

            {/* store delete model */}

            <ReactModal
                isOpen={deletemodal}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="sd_model_wrapp sd_model_wrapp-delete" >
                    {/* edit and delete orange btns start */}
                    <div className="sd_model_edit_wrap">




                        <button onClick={closeModal}>
                            <img src={images.close} alt="" />
                        </button>

                    </div>
                    {/* edit and delete orange btns end */}

                    <p>{getdelete_popup_data ? getdelete_popup_data.details : ""}</p>
                    <div className="delete-modal-btn-box">
                        <button onClick={() => {
                            // setStore_id(itm.id);
                            DeleteMallEateryData(itm.id);
                            // setDeleteModal(true);
                        }} className="delete-modal-btn">
                            {getdelete_popup_data ? getdelete_popup_data.confirm_button : ""}
                        </button>
                        {/* onClick={() => {
              // setStore_id(itm.id);
              // DeleteMallStoreData(itm.id);
              setDeleteModal(true);
            }} */}

                        <button onClick={closeModal} className="delete-modal-btn">
                        {getdelete_popup_data ? getdelete_popup_data.cancel_button : ""}
                        </button>
                    </div>
                </div>
                {/* </div> */}
            </ReactModal>
        </>
    );
};

export default StoreECard;
