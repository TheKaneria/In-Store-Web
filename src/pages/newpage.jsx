import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useMallContext } from "../context/mall_context";
import Notification from "../utils/Notification";
import {
  ACCEPT_HEADER,
  start_mall_payment,
  start_payment,
} from "../utils/Constant";
import { HomeNavbar } from "../common";
import images from "../constants/images";

const newpage = () => {
  
  const { get_mall_auth_data } = useMallContext();

  // const [paymentStatus, setPaymentStatus] = useState("");
  const [getRole, setRole] = useState();
  const [loadCheckoutPayment, setLoadCheckoutPayment] = useState("");
  // const checkoutdata = JSON.parse(localStorage.getItem("checkout_Data"));

  useEffect(() => {
    CheckPayment();
    // const checkoutdata = JSON.parse(localStorage.getItem("checkout_Data"));

    const rolee = JSON.parse(localStorage.getItem("role"));
    setRole(rolee);
  }, []);

  const paramm = useParams();

  var slug = paramm.id;

  const [loading, setLoading] = useState(false);
  const [payment_status, setpayment_status] = useState();
  const [order_status, setorder_status] = useState();

  const CheckPayment = async () => {
    
    setLoadCheckoutPayment(true);
    const checkoutId = `${slug}`;
    const entityId = "8ac7a4c78aaf7f58018ab1fb531903ea";
    const authToken =
      "Bearer OGFjN2E0Yzg4YWFmODFjZDAxOGFiMWZhZjk4YTE2YWR8MlNKcUQzbjJtQQ==";

    const url = `https://eu-test.oppwa.com/v1/checkouts/${checkoutId}/payment`;

    const options = {
      params: {
        entityId: entityId,
      },
      headers: {
        Authorization: authToken,
      },
    };

    try {
      const response = await axios.get(url, options);

      if (response.data.result.code === "000.100.110") {
        Notification(
          "success",
          "Success!",
          response?.data?.result?.code?.description
        );
        setpayment_status(1);

        Place_Order();
        setLoadCheckoutPayment(false);
      } else {
        Notification("error", "Error!", "Something wrong");
        setpayment_status(0);
        setLoadCheckoutPayment(false);
      }
    } catch (error) {
      console.log("error11", error);
    }
  };

  // Place Order

  const Place_Order = async () => {
    // if (frist_mall === "") {
    //   Notification("error", "Error!", "Please Enter First Name!");
    //   return;
    // } else if (last_mall === "") {
    //   Notification("error", "Error!", "Please Enter Second Name!");
    //   return;
    // } else if (compname === "") {
    //   Notification("error", "Error!", "Please Enter Company Name!");
    //   return;
    // } else if (comregi === "") {
    //   Notification("error", "Error!", "Please Enter Company Registration!");
    //   return;
    // } else if (BrandId === "") {
    //   Notification("error", "Error!", "Please Select Region!");
    //   return;
    // } else if (physicaladd === "") {
    //   Notification("error", "Error!", "Please Enter Address!");
    //   return;
    // } else if (physicaladd1 === "") {
    //   Notification("error", "Error!", "Please Enter Address1!");
    //   return;
    // } else if (pcode === "") {
    //   Notification("error", "Error!", "Please Enter Postal Code!");
    //   return;
    // } else if (number === "") {
    //   Notification("error", "Error!", "Please Enter Number!");
    //   return;
    // } else if (emailadd === "") {
    //   Notification("error", "Error!", "Please Enter Email!");
    //   return;
    // } else {
    const token = JSON.parse(localStorage.getItem("is_token"));
    const checkoutdata = JSON.parse(localStorage.getItem("checkout_Data"));

    const formdata = new FormData();
    formdata.append("first_name", checkoutdata.frist_mall);
    formdata.append("last_name", checkoutdata.last_mall);
    formdata.append("company_name", checkoutdata.compname);
    formdata.append("company_reg", checkoutdata.comregi);
    formdata.append("region_id", checkoutdata.BrandId);
    formdata.append("address_1", checkoutdata.physicaladd);
    formdata.append("address_2", checkoutdata.physicaladd1);
    formdata.append("pin_code", checkoutdata.pcode);
    formdata.append("number", checkoutdata.number);
    formdata.append("email", checkoutdata.email);
    formdata.append("terms_condition", checkoutdata.isAcceptTerm);
    formdata.append("privacy_policy", checkoutdata.isAcceptTerm2);
    setLoading(true);
    if (checkoutdata.is_mall_checkout === "true") {
      try {
        const res = await axios.post(start_mall_payment, formdata, {
          headers: {
            Accept: ACCEPT_HEADER,
            Authorization: "Bearer " + token,
          },
        });
        console.log(
          "ressssssstart_mall_payment:",
          JSON.stringify(res.data, null, 2)
        );
        if (res.data.success === 1) {
          setLoading(false);
          Notification("success", "Success!", "Order Submitted Successfully!");
          setorder_status(1);
          localStorage.removeItem("checkout_Data");
        } else {
          setLoading(false);
          Notification("error", "Error!", res.data.message);
          setorder_status(0);
          localStorage.removeItem("checkout_Data");
        }
      } catch (err) {
        console.error("Error:", err);
        Notification(
          "error",
          "Error!",
          "An error occurred while processing your order."
        );
        setorder_status(0);
        localStorage.removeItem("checkout_Data");
        setLoading(false);
      }
    } else {
      try {
        const res = await axios.post(start_payment, formdata, {
          headers: {
            Accept: ACCEPT_HEADER,
            Authorization: "Bearer " + token,
          },
        });

        console.log("ressssssstart_payment", JSON.stringify(res.data, null, 2));
        if (res.data.success === 1) {
          setLoading(false);
          Notification("success", "Success!", "Order Submitted Successfully!");
          setorder_status(1);
          localStorage.removeItem("checkout_Data");
        } else {
          setLoading(false);
          Notification("error", "Error!", res.data.message);
          setorder_status(0);
          localStorage.removeItem("checkout_Data");
        }
      } catch (err) {
        console.error("Error:", err);
        Notification(
          "error",
          "Error!",
          "An error occurred while processing your order."
        );
        localStorage.removeItem("checkout_Data");
        setorder_status(0);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {loading === true || loadCheckoutPayment === true ? (
        <>
          <div
            style={{
              width: "100%",
              height: "80vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="loader"></div>
          </div>
        </>
      ) : (
        <>
          <HomeNavbar />
          {/* {paymentStatus && <div>Payment Status: {paymentStatus}</div>} */}
          <div style={{ minHeight: "80vh" }}>
            <div className="">
              {/* {checkoutdata?.is_mall_checkout === "true" ? <>
        <MallHero get_mall_auth_data={get_mall_auth_data} />
      </> : <>
        <BrandHero get_mall_auth_data={get_store_data}/>
      </>} */}
            </div>
            {/* <div className="MallCart2_main"> */}
            <div
              style={{
                maxWidth: "1140px",
                margin: "0 auto",
                padding: "3rem 1rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {payment_status == 1 && order_status == 1 ? (
                <>
                  <img
                    src={images.payment_success}
                    alt="Payment Success"
                    style={{ width: "250px", height: "250px" }}
                  />
                </>
              ) : (
                <>
                  <img
                    src={images.payment_fail}
                    alt="Payment Success"
                    style={{ width: "250px", height: "250px" }}
                  />
                </>
              )}
              {payment_status == 1 && order_status == 1 ? (
                <>
                  <p style={{ fontSize: "22px", fontWeight: "600" }}>
                    your order is Submitted successfully
                  </p>
                  <h3 className="h3" style={{ fontWeight: "600" }}>
                    Thank you for purchasing {get_mall_auth_data?.name}!{" "}
                  </h3>
                  <p>
                    By selecting the multiple options below we will be able to
                    establish your complete &nbsp;
                    <Link
                      to={""}
                      style={{
                        color: "var(--color-orange)",
                        fontWeight: "700",
                      }}
                    >
                      Analytics Dashboard
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  <p style={{ fontSize: "22px", fontWeight: "600" }}>
                    Something went wrong
                  </p>
                </>
              )}
              {getRole == 2 ? (
                <>
                  <Link
                    to="/profile-page"
                    className="btn btn-orange"
                    style={{ width: "200px" }}
                  >
                    Go Back
                  </Link>
                </>
              ) : getRole === 6 ? (
                <>
                  <Link
                    to="/CinemaDashboard"
                    className="btn btn-orange"
                    style={{ width: "200px" }}
                  >
                    Go Back
                  </Link>
                </>
              ) : getRole === 3 ? (
                <>
                  <Link
                    to="/branddashboard"
                    className="btn btn-orange"
                    style={{ width: "200px" }}
                  >
                    Go Back
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="btn btn-orange"
                    style={{ width: "200px" }}
                  >
                    Go Back
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default newpage;