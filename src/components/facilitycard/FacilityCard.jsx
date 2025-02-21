import React, { useEffect, useState } from 'react'
import "./FacilityCard.css";
import images from '../../constants/images';
import { useMallContext } from '../../context/mall_context';
import ReactModal from 'react-modal';
import Notification from "../../utils/Notification";
import Switch from "react-switch";
import { ACCEPT_HEADER, create_facility, delete_facility } from '../../utils/Constant';
import axios from 'axios';


const FacalityCard = ({ item, setTab, setfacility_id, getsinglefacilitydata, setsinglefacilitydata, load, setLoad }) => {



  const { DeleteFacilityApi, getFacilityApi } = useMallContext();

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

  const [deletemodal, setDeleteModal] = useState(false);
  const [checked, setChecked] = useState(0);
  const [checkedId, setCheckedId] = useState(null);

  const handleChange = (currentChecked, id, mall_facility_id) => {

    setChecked(!currentChecked); // Toggle the checked state
    setCheckedId(id);
    console.log("checked", checked);

    if (currentChecked == 1) {
      deletefacility(mall_facility_id)
    } else if (currentChecked == 0) {
      createfacilitydata(id);
    } else {

    }

  };

  const createfacilitydata = async (id) => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    setLoad(true);
    const formdata = new FormData();
    await formdata.append("facility_id", id);

    // ("-=-=-=->", formdata);
    axios
      .post(create_facility, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // ("ggg", JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          Notification("success", "Success!", "Facility Activated Successfully!");
          getFacilityApi();
          setLoad(false);
        } else {

          null;
        }
      })
      .catch((err) => {
        console.log("err11", err);
      });
  };

  const deletefacility = async (id) => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    const formdata = new FormData();
    await formdata.append("id", id);

    // ("-=-=-=->", formdata);
    axios
      .post(delete_facility, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // ("ggg", JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          Notification("success", "Success!", "Facility Deactivated Successfully!");
          getFacilityApi();
          setLoad(false);
        } else {

          null;
        }
      })
      .catch((err) => {
        console.log("err11", err);
      });
  };

  useEffect(() => {
    console.log("Updated checked:", checked);
    console.log("Updated checkedId:", checkedId);
  }, [checked, checkedId]);

  // const getNotificationcheck = async () => {
  //   const token = await JSON.parse(localStorage.getItem("is_token"));
  //   const formdata = new FormData();
  //   formdata.append("mall_id", getsingalmalldata.id);
  //   axios
  //     .post(get_notification_url, formdata, {
  //       headers: {
  //         Accept: ACCEPT_HEADER,
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.success === 1) {
  //         setIsOpen3(res.data.data.notification === 0);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("errr", err);
  //     });
  // };

  // }

  function closeModal() {
    setDeleteModal(false);
  }

  const deleteFacilityData = async () => {

    const formdata = await new FormData();
    await formdata.append("id", item.id);

    // ("-=-=-=->", formdata);
    const data = await DeleteFacilityApi(formdata);
    if (data) {
      if (data.success == 1) {
        Notification("success", "Success!", "Facility Deleted Successfully!");
        getFacilityApi();
        setTab(6);
      }
    }


  };
  return (
    <>
      <div className="facility_card_main_wrapp">
        {/* style={{ background: item.bg_colour == 1 ? item.sky_blue : item.bg_colour == 2 ? item.orange : item.bg_colour == 3 ? item.pink : null }}> */}
        <div className="stored_card_edit_wrapp">
          <Switch onChange={() => { handleChange(item.status, item.id, item.mall_facility_id) }} checked={item.status} checkedIcon={false} uncheckedIcon={false} onColor="#ff8b00" width={53} />

          <button disabled={
            item.status == 1 ? false : true
          }
            onClick={() => {
              setTab(12); setfacility_id(item.mall_facility_id); setsinglefacilitydata(item)
            }} className="stored_card_edit_btn">
            <img src={images.card_edit} alt="" />
          </button>
          <button disabled={true} className="stored_card_edit_btn" onClick={() => setDeleteModal(true)}>
            <img src={images.card_cancle} alt="" />
          </button>
        </div>
        {/* {
        item.bg_colour == 1 ? <>
          <img src={images.wcard_1} alt="" className="wc_bottom_img" />

        </> :
          item.bg_colour == 2 ? <>
            <img src={images.wcard_2} alt="" className="wc_bottom_img" />

          </> :
            item.bg_colour == 3 ? <>
              <img src={images.wcard_3} alt="" className="wc_bottom_img" />

            </> : null

      } */}
        {/* <img src={item.facilities && item.facilities.image_path} alt="" className="facility_logo" style={{ opacity: checked === true ? 1 : 0.6, }} /> */}
        <img src={item.image_path} alt="" className="facility_logo" style={{ opacity: item.status == 1 ? 1 : 0.6, }} />
        {/* <h5 className="facility_card_heading" style={{ opacity: checked === true ? 1 : 0.6, }}>{item.facilities && item.facilities.name}</h5> */}
        <h5 className="facility_card_heading" style={{ opacity: item.status == 1 ? 1 : 0.6, }}>{item.name}</h5>
        <p className="facility_card_des" style={{ opacity: item.status == 1 ? 1 : 0.6, }}>{item.description}</p>
      </div>

      {/* store delete model */}

      <ReactModal
        isOpen={deletemodal}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <div className="sd_model_wrapp sd_model_wrapp-delete">
          {/* edit and delete orange btns start */}
          <div className="sd_model_edit_wrap">
            <button onClick={closeModal}>
              <img src={images.close} alt="" />
            </button>
          </div>
          {/* edit and delete orange btns end */}

          <p>Are you sure you want to delete ?</p>
          <div className="delete-modal-btn-box">
            <button
              onClick={() => {
                // setStore_id(itm.id);
                deleteFacilityData();
                setDeleteModal(false);
              }}
              className="delete-modal-btn">
              Yes
            </button>
            {/* onClick={() => {
              // setStore_id(itm.id);
              // DeleteMallStoreData(itm.id);
              setDeleteModal(true);
            }} */}

            <button onClick={closeModal} className="delete-modal-btn">
              No
            </button>
          </div>
        </div>
        {/* </div> */}
      </ReactModal>
    </>
  );
};

export default FacalityCard