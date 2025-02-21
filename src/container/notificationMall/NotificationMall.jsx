import React, { useState } from "react";
import "./NotificationMall.css";
import { MallHero } from "../../components";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ACCEPT_HEADER, create_notification } from "../../utils/Constant";
import Notification from "../../utils/Notification";

import axios from "axios";
const NotificationMall = ({ get_mall_auth_data, setTab }) => {

  const [title, setTitle] = useState("");
  const [getaccept, setaccept] = useState("0");


  const AddStoreNallData = async () => {

    const token = JSON.parse(localStorage.getItem("is_token"));

    if (title == "" || undefined) {
      Notification("error", "Error!", "Please Enter Notification Title!");
      return;
    } else {
      // ("notification title--->", title);
      const formdata = await new FormData();
      await formdata.append("particular", title);

      // ("-=-=-=->", formdata);

      // const data = await AddMallStore(formdata);
      // if (data) {
      //   if (data.success === 1) {
      //           //     setTab(3);
      //   }
      // }
      // }

      axios
        .post(create_notification, formdata, {
          headers: {
            Accept: ACCEPT_HEADER,
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          // ("create_notification", JSON.stringify(res.data, null, 2));
          if (res.data.success == 1) {
            Notification("success", "Success!", res.data.message);
            setTitle("");
            setaccept(0);
            // setTab(3);
            // getStoreList();
          } else if (res.data.success == 0) {
            Notification("error", "Error!", res.data.message);
            // setTab(3);
            // getStoreList();
          } else {
            null;
          }
        })
        .catch((err) => {
          console.log("err11", err);
        });
    }
  };
  return (
    <div className="NotificationMall_main">
      <MallHero get_mall_auth_data={get_mall_auth_data} />
      <div className="mm_main_wrapp">
        {/* <div className="edit-brand-back-iconbox" onClick={() => setTab(3)}>
          <IoChevronBack className="edit-brand-back-icon" />{" "}
          <p className="edit-brand-back-txt">Back</p>
        </div> */}
        <div className="mall_name_wrapp mm_form_wrapp_name_padding">
          <p className="mall_name_heading">
            {get_mall_auth_data.name ? get_mall_auth_data.name : ""}:
          </p>
          <span style={{ fontWeight: 600 }}>Notification</span>
        </div>
        <div style={{ marginTop: "2rem" }}></div>
        <div
          className="mm_form_input_wrapp notification_main_top_space"
          style={{ marginTop: "0px" }}>
          <div className="mm_form_single_input">
            <label htmlFor="" style={{ minWidth: "148px" }}>
              Title<span className="star_require">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name=""
              id=""
              className="input_box"
            />
          </div>
        

          <div className="mm_form_single_input_notification mb_8" style={{ marginTop: "1rem" }}>
            <label htmlFor="" style={{ minWidth: "148px" }} className="mm_form_single_input_notification_lable"></label>
            <div className="signup_terms_wrapp" style={{ marginTop: "-12px" }}>
              <input
                type="checkbox"
                onChange={() => setaccept(getaccept === "0" ? "1" : "0")}
                checked={getaccept === "1"}
              />

              <p className="fs-des" style={{ fontWeight: "400", fontSize: "14px" }}>
                I have read and agree to the{" "}
                <Link to="" className="signup_terms_link"> 
                  Terms and Conditions
                </Link>
              </p>
            </div>
          </div>

          <div className="mm_form_single_input ">
            <button
              className="btn btn-black notification_btnnnn"
              disabled={getaccept == 1 ? false : true}
              onClick={() => AddStoreNallData()}
              style={{ width: "200px", marginLeft: "10rem" }}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationMall;
