import React, { useState } from "react";
import "./StoreRetailerDCard.css";
import images from "../../constants/images";
import { useMallContext } from "../../context/mall_context";
import Notification from "../../utils/Notification";
import ReactModal from "react-modal";
import { useStoreContext } from "../../context/store_context";



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

const StoreRetailerDCard = ({
  img,
  setIsOpen,
  itm,
  setSingleStoreData2,
  setTab,
  setStore_id2,
  getStoreList,
  getdelete_popup_data
}) => {
  const { DeleteRetailerBrandApi } = useStoreContext();

  const [deletemodal, setDeleteModal] = useState(false);

  function closeModal() {
    setDeleteModal(false);
  }

  const DeleteMallStoreData = async (id) => {
    
    {
      const formdata = await new FormData();
      await formdata.append("id", id);

      // ("-=-=-=->", formdata);
      const data = await DeleteRetailerBrandApi(formdata);
      if (data) {
        if (data.success === 1) {
          //           setIsOpen(false);

          Notification("success", "Success!", "Brand Deleted Successfully!");
          getStoreList();
          // getStore();
        }
      }
    }
  };

  return (
    <>
      <div
        // onClick={() => {
        //   setSingleStoreData2(itm);
        //   setIsOpen(true);
        // }}
        className="stored_card_wrapp"
      >
        <div className="stored_card_edit_wrapp">
          <button
            onClick={() => {

              // setIsOpen(true);
              setTab(30);
              setStore_id2(itm.id);
              setSingleStoreData2(itm);
            }}
            className="stored_card_edit_btn"
          >
            <img src={images.card_edit} alt="" />
          </button>
          <button
            onClick={() => {
              // setStore_id(itm.id);
              // DeleteMallStoreData(itm.id);
              setDeleteModal(true);
            }}
            className="stored_card_edit_btn"
          >
            <img src={images.card_cancle} alt="" />
          </button>
        </div>
        <img
          onClick={() => {
            setSingleStoreData2(itm);
            setIsOpen(true);
          }}
          src={img}
          alt=""
          style={{filter:"grayscale(100%)"}}
          className="stored_card_img"
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
        <div className="sd_model_wrapp sd_model_wrapp-delete">
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
              DeleteMallStoreData(itm.id);
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

export default StoreRetailerDCard;
