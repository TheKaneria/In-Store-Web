import React, { useEffect, useState } from "react";
import "./StoreCheckout.css";
import { useMallContext } from "../../context/mall_context";
import { IoChevronBack } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import images from "../../constants/images";
import ReactModal from "react-modal";
import axios from "axios";
import Notification from "../../utils/Notification";

import {
  ACCEPT_HEADER,
  get_store_cart,
  start_payment,
  start_payment_validation,
  store_checkout,
} from "../../utils/Constant";
import { useAuthContext } from "../../context/auth_context";
import { useNavigate } from "react-router-dom";
import {
  GrClose,
  GrFacebook,
  GrFacebookOption,
  GrGoogle,
} from "react-icons/gr";
import { processPayment } from "./peachPaymentsService";

const AccordionData = [
  {
    id: 1,
    name: "Landing Page 1/2 Tile",
  },
  {
    id: 2,
    name: "Landing Page Square Tiles",
  },
  {
    id: 3,
    name: "Landing Page Leaderboard Banner",
  },
  {
    id: 4,
    name: "Leaderboard Banner Mall",
  },
  {
    id: 5,
    name: "Promotional Banner",
  },
  {
    id: 6,
    name: "In Mall Brand Banner slider",
  },
  {
    id: 7,
    name: "In Mall Product Tiles",
  },
  // {
  //   id: 7,
  //   name: "Cinema Analytics Bundles",
  // },
];
const StoreCheckout = ({ get_mall_auth_data, setTab, getMallModalData }) => {
  const [isload, SetLoad] = useState(false);
  const [totallead, SetTotalLead] = useState("");
  const [totalpro, SetTotalPro] = useState("");
  const [totalpduct, SetTotalPduct] = useState("");
  const [totalpducttil, SetTotalPducttil] = useState("");
  const [totalsquare, SetTotalSquare] = useState("");
  const [totalomebytwo, SetTotalOnebyTwo] = useState("");
  const [totallandingleaderboard, SetLandingLeaderboard] = useState("");
  const [modalIsOpen4, setIsOpen4] = useState(false);
  const [checkoutdisclaimermodal, setCheckoutDisclaimerModal] = useState(false);

  // console.log("totalpducttil", totalpducttil);

  useEffect(() => {
    Get_cart();
  }, []);



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

  const history = useNavigate();

  function closeModal() {
    setCheckoutDisclaimerModal(false);
    setfetchLoad(false);
  }

  const Get_cart = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    SetLoad(true);
    axios
      .get(get_store_cart, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        JSON.stringify(res.data, null, 2);
        if (res.data.success == 1) {
          SetnearStore(res.data.data);
          SetTotalLead(res.data.total_leaderboard_amt);
          SetTotalPro(res.data.total_promotion_banner_amt);
          SetTotalPduct(res.data.total_product_banner_amt);
          SetTotalPducttil(res.data.total_product_banner_tile_amt);
          SetTotalSquare(res.data.total_landing_page_square_tile_amt);
          SetTotalOnebyTwo(res.data.total_landing_page_tile_amt);
          SetLandingLeaderboard(res.data.total_landing_page_leaderboard_amt);
          SetLoad(false);
        } else {
          SetLoad(false);
        }
      })
      .catch((err) => {
        console.log("err11", err);
        SetLoad(false);
      });
  };
  const [getnearStore, SetnearStore] = useState([]);
  const [sort_array, SetSort_Array] = useState([]);

  const array_sort = (id) => {
    if (id == 1) {
      const numDescending = [...getnearStore].filter((a, b) =>
        a.landing_page_tile_id ? a.landing_page_tile_id : ""
      );
      "ffff", numDescending;
      SetSort_Array(numDescending);
    } else if (id == 2) {
      const numDescending = [...getnearStore].filter((a, b) =>
        a.landing_page_square_tile_id ? a.landing_page_square_tile_id : ""
      );
      "ffff", numDescending;
      SetSort_Array(numDescending);
    } else if (id == 3) {
      const numDescending = [...getnearStore].filter((a, b) =>
        a.landing_page_leaderboard_id ? a.landing_page_leaderboard_id : ""
      );
      "ffff", numDescending;
      SetSort_Array(numDescending);
    } else if (id == 4) {
      const numDescending = [...getnearStore].filter((a, b) =>
        a.leaderboard_banner_id ? a.leaderboard_banner_id : ""
      );
      "ffff", numDescending;
      SetSort_Array(numDescending);
    } else if (id == 5) {
      const numDescending = [...getnearStore].filter((a, b) =>
        a.promotion_banner_id ? a.promotion_banner_id : ""
      );
      "ffff", numDescending;
      SetSort_Array(numDescending);
    } else if (id == 6) {
      const numDescending = [...getnearStore].filter((a, b) =>
        a.product_banner_id ? a.product_banner_id : ""
      );
      "ffff", numDescending;
      SetSort_Array(numDescending);
    } else if (id == 7) {
      const numDescending = [...getnearStore].filter((a, b) =>
        a.product_banner_tile_id ? a.product_banner_tile_id : ""
      );
      "ffff", numDescending;
      SetSort_Array(numDescending);
    } else {
      null;
    }
  };

  const [files, setFiles] = useState([]);

  const [toggle, setToggle] = useState(null);
  let handleToggle = (id) => {

    if (toggle === id) {
      setToggle(null);
      return false;
    }
    setToggle(id);
  };

  const onHandleEmailChange = (e) => {
    let email = e.target.value;
    if (email === "" || regEx.test(email)) {
      setEmail(email);
    } else {
      return;
    }
  };

  const onHandleMallEmailChange = (e) => {
    let mallEmail = e.target.value;
    if (mallEmail === "" || regEx.test(mallEmail)) {
      setMallEmail(mallEmail);
    } else {
      return;
    }
  };

  const [getbrandData, setBrandData] = useState(
    get_mall_auth_data && get_mall_auth_data
  );
  const { UpdateMall } = useMallContext();
  const regEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // ("check getbrandData", getbrandData);

  // update mall states
  const [mallName, setMallName] = useState(
    getbrandData.name ? getbrandData.name : ""
  );
  const [physicalAddress, setPhysicalAddress] = useState(
    getbrandData.address ? getbrandData.address : ""
  );
  const [province, setProvince] = useState(
    getbrandData.province ? getbrandData.province : ""
  );
  const [mallWebsite, setMallWebsite] = useState(
    getbrandData.website ? getbrandData.website : ""
  );
  const [mallEmail, setMallEmail] = useState(
    getbrandData.email_mall ? getbrandData.email_mall : ""
  );
  const [mallInsta, setMallInsta] = useState(
    getbrandData.insta ? getbrandData.insta : ""
  );
  const [mallfb, setMallfb] = useState(getbrandData.fb ? getbrandData.fb : "");
  const [mallTwitter, setMallTwitter] = useState(
    getbrandData.tweet ? getbrandData.tweet : ""
  );
  const [contactPerson, setContactPerson] = useState(
    getbrandData.contact_person && getbrandData.contact_person
  );
  const [contactNumber, setContactNumber] = useState(
    getbrandData.number && getbrandData.number
  );
  const [email, setEmail] = useState(
    getbrandData.email ? getbrandData.email : ""
  );

  // tranding times
  const [monFromTime, setMonFromTime] = useState(
    getbrandData.mon_fri_from_time && getbrandData.mon_fri_from_time
  );
  const [monToTime, setMonToTime] = useState(
    getbrandData.mon_fri_to_time && getbrandData.mon_fri_to_time
  );
  const [satFromTime, setSatFromTime] = useState(
    getbrandData.sat_from_time && getbrandData.sat_from_time
  );
  const [satToTime, setSatToTime] = useState(
    getbrandData.sat_to_time && getbrandData.sat_to_time
  );
  const [sunFromTime, setSunFromTime] = useState(
    getbrandData.sun_from_time && getbrandData.sun_from_time
  );
  const [sunToTime, setSunToTime] = useState(
    getbrandData.sun_to_time && getbrandData.sun_to_time
  );
  const [holidayFromTime, setHolidayFromTime] = useState(
    getbrandData.holiday_from_time && getbrandData.holiday_from_time
  );
  const [holidayToTime, setHolidayToTime] = useState(
    getbrandData.holiday_to_time && getbrandData.holiday_to_time
  );

  const { region_data } = useAuthContext();
  const [frist_mall, SetFrist_mall] = useState(get_mall_auth_data?.first_name);
  const [last_mall, SetLast_mall] = useState(get_mall_auth_data?.last_name);
  const [compname, SetComPname] = useState(get_mall_auth_data?.name);
  // const [comregi, SetComRegi] = useState(get_mall_auth_data?.company_reg_no);
  const [comregi, SetComRegi] = useState("");
  const [physicaladd, SetPhysicalAdd] = useState(get_mall_auth_data?.address);
  const [physicaladd1, SetPhysicalAdd1] = useState(
    get_mall_auth_data?.address_2
  );
  const [pcode, SetPCode] = useState("");
  const [number, SetNumber] = useState(get_mall_auth_data?.number);
  const [emailadd, SetEmailAdd] = useState(get_mall_auth_data?.email);
  const [cardnum, SetCardName] = useState("");
  const [cardnumber, SetCardNumber] = useState("");
  const [cardcode, SetCardCode] = useState("");
  const [carddate, SetCardDate] = useState("");
  const [BrandName, setBrandName] = useState("");
  const [getmode, setMode] = useState(1);
  const [fetchLoad, setfetchLoad] = useState(false);

  const [BrandId, setBrandId] = useState("");
  const [paymode, SetPyMode] = useState(1);
  const [checkout_id, setCheckout_id] = useState("");

  const [isAcceptTerm, setIsAcceptTerm] = useState(false);
  const [isAcceptTerm2, setIsAcceptTerm2] = useState(false);

  const handleTermChange = (event) => {
    setIsAcceptTerm((current) => !current);
  };
  const handleTermChange2 = (event) => {
    setIsAcceptTerm2((current) => !current);
  };

  console.log("BrandName", BrandName);

  function closeModal4() {
    setIsOpen4(false);
    setfetchLoad(false);
    SetModalLoading(false);
  }

  const [checkid, SetCheckId] = useState("");
  const [getbuildNumber, SetbuildNumber] = useState("");

  const [isloading, SetIsLoading] = useState(false);

  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const OPPWA_CHECKOUT_URL = "https://eu-test.oppwa.com/v1/checkouts";

  const [modalloading, SetModalLoading] = useState(false);

  const CheckingPayment = async () => {
    if (frist_mall === "") {
      Notification("error", "Error!", "Please Enter First Name!");
      return;
    } else if (last_mall === "") {
      Notification("error", "Error!", "Please Enter Second Name!");
      return;
    } else if (compname === "") {
      Notification("error", "Error!", "Please Enter Company Name!");
      return;
    } else if (comregi === "") {
      Notification("error", "Error!", "Please Enter Company Registration!");
      return;
    } else if (BrandId === "") {
      Notification("error", "Error!", "Please Select Region!");
      return;
    } else if (physicaladd === "") {
      Notification("error", "Error!", "Please Enter Address!");
      return;
    } else if (physicaladd1 === "") {
      Notification("error", "Error!", "Please Enter Address1!");
      return;
    } else if (pcode === "") {
      Notification("error", "Error!", "Please Enter Postal Code!");
      return;
    } else if (number === "") {
      Notification("error", "Error!", "Please Enter Number!");
      return;
    } else if (emailadd === "") {
      Notification("error", "Error!", "Please Enter Email!");
      return;
    } else {
      setfetchLoad(true);
      const token = JSON.parse(localStorage.getItem("is_token"));

      const formdata = new FormData();
      formdata.append("first_name", frist_mall);
      formdata.append("last_name", last_mall);
      formdata.append("company_name", compname);
      formdata.append("company_reg", comregi);
      formdata.append("region_id", BrandId);
      formdata.append("address_1", physicaladd);
      formdata.append("address_2", physicaladd1);
      formdata.append("pin_code", pcode);
      formdata.append("number", number);
      formdata.append("email", email);
      formdata.append("terms_condition", isAcceptTerm ? 1 : 0);
      formdata.append("privacy_policy", isAcceptTerm2 ? 1 : 0);

      try {
        const res = await axios.post(start_payment_validation, formdata, {
          headers: {
            Accept: ACCEPT_HEADER,
            Authorization: "Bearer " + token,
          },
        });

        if (res.data.success === 1) {
          setCheckoutDisclaimerModal(false);
          Notification("success", "Success!", res.data.message);
          fetchData();
        } else {
          setfetchLoad(false);
          setCheckoutDisclaimerModal(false);
          Notification("error", "Error!", res.data.message);
        }
      } catch (err) {
        console.error("Error:", err);
        Notification(
          "error",
          "Error!",
          "An error occurred while processing your order."
        );
        setfetchLoad(false);
      }
    }
  };
  const fetchData = async () => {
    setfetchLoad(true);
    if (frist_mall === "") {
      Notification("error", "Error!", "Please Enter First Name!");
      return;
    } else if (last_mall === "") {
      Notification("error", "Error!", "Please Enter Second Name!");
      return;
    } else if (compname === "") {
      Notification("error", "Error!", "Please Enter Company Name!");
      return;
    } else if (comregi === "") {
      Notification("error", "Error!", "Please Enter Company Registration!");
      return;
    } else if (BrandId === "") {
      Notification("error", "Error!", "Please Select Region!");
      return;
    } else if (physicaladd === "") {
      Notification("error", "Error!", "Please Enter Address!");
      return;
    } else if (physicaladd1 === "") {
      Notification("error", "Error!", "Please Enter Address1!");
      return;
    } else if (pcode === "") {
      Notification("error", "Error!", "Please Enter Postal Code!");
      return;
    } else if (number === "") {
      Notification("error", "Error!", "Please Enter Number!");
      return;
    } else if (emailadd === "") {
      Notification("error", "Error!", "Please Enter Email!");
      return;
    } else {
      try {
        const response = await fetch(OPPWA_CHECKOUT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Bearer OGFjN2E0Yzg4YWFmODFjZDAxOGFiMWZhZjk4YTE2YWR8MlNKcUQzbjJtQQ==", // Replace with your actual token
            Cookie:
              "ak_bmsc=4188111AB30A51C978AED10DC4A83BA1~000000000000000000000000000000~YAAQwvIVAr/d2N6PAQAAjKSe4hjeOUKbC3c4aGdc2jo9Q7LAlGTGeBTOjZR6oHC3Lo0IiBSntTA3vGurvpUaJ2/vQp8hwwHwl+jgGAcF0SALg+7TSxvlBGfeJBVjkSy2BdnwpPogtyKcDaaEbSn1zFzck9UeqCRZfpuM4ftE0SSqjlkRJTRx2vv9yDNGBUFOMf8wwKQduIjZQ0mJdGV8P25jKmeo8PVFei1BKbuPG0VE5RrRvhXwHP8dyPs7oSLxSMo817IpeJdV2Ks00XYcmW3pcLhkulOCny1J0g7xWfOh0X49HSO8Lc5E/PKvChMrJuMqXzSBhSUXtyZLoWMaQk30Ayq/Asfuhrb9OFo+RiocF1BEXEiC33kifdU='\--data-urlencode'entityId=8ac7a4c78aaf7f58018ab1fb531903ea", // Replace with your actual cookie value
          },
          body: new URLSearchParams({
            entityId: "8ac7a4c78aaf7f58018ab1fb531903ea",
            amount:
              totalomebytwo +
              totalsquare +
              totallandingleaderboard +
              totallead +
              totalpro +
              totalpduct +
              totalpducttil,
            currency: "ZAR",
            paymentType: "DB",
            merchantTransactionId: "TestInStore",
          }).toString(),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const checkout_Data = {
          frist_mall: frist_mall,
          last_mall: last_mall,
          compname: compname,
          comregi: comregi,
          BrandId: BrandId,
          physicaladd: physicaladd,
          physicaladd1: physicaladd1,
          pcode: pcode,
          number: number,
          email: email,
          isAcceptTerm: isAcceptTerm,
          isAcceptTerm2: isAcceptTerm2,
          is_mall_checkout: "false",
        };


        localStorage.setItem("checkout_Data", JSON.stringify(checkout_Data));
        setCheckoutDisclaimerModal(false);
        SetModalLoading(true);
        displayRazorpay(data.id);

        SetCheckId(data.id);
        SetbuildNumber(data.buildNumber);
        setResponseData(data);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  async function displayRazorpay(checkout_id) {
    const script = document.createElement("script");

    script.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkout_id}`;
    script.async = true;

    // Set loading to true while script is loading
    SetModalLoading(true);

    script.onload = () => {
      setIsOpen4(true); // Open the modal when the script is loaded
      SetModalLoading(false); // Set loading to false once the script is loaded
    };

    script.onerror = () => {
      SetModalLoading(false); // Handle error scenario
      console.error("Failed to load the payment widget script");
    };

    document.body.appendChild(script);

    // Cleanup function to remove script when it's no longer needed
    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }

  // const shopperResultUrl = `https://plance.in/In-store-front/branddashboard`;
  // const shopperResultUrl = `https://plance.in/In-store-front/Newpage/${checkid}`;
  // const shopperResultUrl = `http://localhost:3000/In-store-front/Newpage/${checkid}`;
  // const shopperResultUrl = `https://getmynfc.com/In-store-front/Newpage/${checkid}`;
  const shopperResultUrl = `https://plance.in/In-store-front/Newpage/${checkid}`;
  // const shopperResultUrl = `http://localhost:3000/In-store-front/Newpage/${checkid}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="mm_main_wrapp">
      {/* mall management name start */}
      {modalloading === true ? (
        <>
          <div
            style={{
              width: "80%",
              height: "60vh",
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
          <div
            className="mall_name_wrapp mall_name_wrapp_check"
            style={{ paddingLeft: "3rem" }}
          >
            <p className="mall_name_heading">
              {" "}
              {get_mall_auth_data &&
                get_mall_auth_data.name &&
                get_mall_auth_data.name}
              :
            </p>
            <span style={{ fontWeight: "600" }}>Checkout</span>
          </div>
          {/* <div className="mm_horizontal_line"></div> */}
          {/* mall management name end */}

          {/* mall management form start */}

          <div className="brand-checkout-main-flex-wrapp">
            <div className="store_checkout_form_input_wrapp">
              {/* text-input wrapp start */}
              <div className="">
                <p className="brand-checkout-subheading">Billing Details</p>
                {/* single text-input */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <div className="mm_form_single_input store-checkout-form-flex-column">
                    <label htmlFor="">
                      First Name<span className="star_require">*</span>
                    </label>
                    <input
                      type="text"
                      value={frist_mall}
                      onChange={(e) => SetFrist_mall(e.target.value)}
                      name=""
                      id=""
                      className="input_box"
                    />
                  </div>
                  <div className="mm_form_single_input store-checkout-form-flex-column">
                    <label htmlFor="">
                      Last Name<span className="star_require">*</span>
                    </label>
                    <input
                      type="text"
                      value={last_mall}
                      onChange={(e) => SetLast_mall(e.target.value)}
                      name=""
                      id=""
                      className="input_box"
                    />
                  </div>
                </div>

                {/* single text-input */}
                <div
                  className="mm_form_single_input store-checkout-form-flex-column"
                  style={{ alignItems: "flex-start" }}
                >
                  <label htmlFor="">
                    Company Name<span className="star_require">*</span>
                  </label>
                  <input
                    type="text"
                    value={compname}
                    onChange={(e) => SetComPname(e.target.value)}
                    name=""
                    id=""
                    className="input_box"
                  />
                </div>
                {/* single text-input */}
                <div className="mm_form_single_input store-checkout-form-flex-column">
                  <label htmlFor="">
                    Company Registration<span className="star_require">*</span>
                  </label>
                  <input
                    type="text"
                    value={comregi}
                    // disabled={true}

                    onChange={(e) => SetComRegi(e.target.value)}
                    name=""
                    id=""
                    className="input_box"
                  />
                </div>

                {/* single text-input */}
                {/* <div className="mm_form_single_input">
            <label htmlFor="">Province</label>
            <input
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              name=""
              id=""
              className="input_box"
            />
          </div> */}
                {/* single text-input */}
                <div className="mm_form_single_input store-checkout-form-flex-column">
                  <label htmlFor="">
                    Region<span className="star_require">*</span>
                  </label>
                  <div className="select-wrapper" style={{ width: "100%" }}>
                    <select
                      className="input_box"
                      onChange={(e) => {
                        // ("rrr", e.target.value);
                        setBrandName(e.target.value);
                        setBrandId(e.target.value);
                      }}
                    >
                      <option selected disabled value="">
                        {BrandName}
                      </option>
                      {region_data &&
                        region_data.map((item, index) => {
                          return (
                            <>
                              <option value={item.id} key={index}>
                                {item.name}
                              </option>
                            </>
                          );
                        })}
                    </select>
                  </div>
                </div>
                {/* single text-input */}
                <div className="mm_form_single_input store-checkout-form-flex-column">
                  <label htmlFor="">
                    Physical Address<span className="star_require">*</span>
                  </label>
                  <input
                    type="text"
                    value={physicaladd}
                    onChange={(e) => SetPhysicalAdd(e.target.value)}
                    // onChange={(e) => onHandleMallEmailChange(e)}
                    name=""
                    id=""
                    className="input_box"
                  />
                </div>
                <div className="mm_form_single_input store-checkout-form-flex-column">
                  <label htmlFor="">
                    Physical Address 1<span className="star_require">*</span>
                  </label>
                  <input
                    type="text"
                    value={physicaladd1}
                    onChange={(e) => SetPhysicalAdd1(e.target.value)}
                    // onChange={(e) => onHandleMallEmailChange(e)}
                    name=""
                    id=""
                    className="input_box"
                  />
                </div>

                {/* single text-input */}
                <div className="mm_form_single_input store-checkout-form-flex-column">
                  <label htmlFor="">
                    Postal code<span className="star_require">*</span>
                  </label>
                  <input
                    type="number"
                    value={pcode}
                    onChange={(e) => SetPCode(e.target.value)}
                    name=""
                    id=""
                    className="input_box"
                  />
                </div>
                {/* single text-input */}
                <div className="mm_form_single_input store-checkout-form-flex-column">
                  <label htmlFor="">
                    Contact Number<span className="star_require">*</span>
                  </label>
                  <input
                    maxLength={10}
                    type="number"
                    value={number}
                    onChange={(e) => SetNumber(e.target.value)}
                    name=""
                    id=""
                    className="input_box"
                  />
                </div>

                {/* single text-input */}
                <div
                  className="mm_form_single_input store-checkout-form-flex-column"
                  style={{ alignItems: "flex-start" }}
                >
                  <label htmlFor="">
                    Email Address<span className="star_require">*</span>
                  </label>
                  <input
                    type="email"
                    value={emailadd}
                    onChange={(e) => SetEmailAdd(e.target.value)}
                    name=""
                    id=""
                    className="input_box"
                  />
                </div>

                {/* mm terms condition wrapp */}
                <div className="checkout-terms-part">
                  <div className="mm_form_single_input">
                    {/* <label htmlFor=""></label> */}
                    <div
                      className="signup_terms_wrapp"
                      style={{ marginBottom: "10px" }}
                    >
                      <input
                        type="checkbox"
                        value={isAcceptTerm}
                        onChange={handleTermChange}
                        checked={isAcceptTerm}
                      />
                      <p className="fs-des">
                        I have read and agree to the{" "}
                        <a className="signup_terms_link">Privacy Policy</a>
                      </p>
                    </div>
                  </div>
                  <div className="mm_form_single_input">
                    {/* <label htmlFor=""></label> */}
                    <div
                      className="signup_terms_wrapp"
                      style={{ marginBottom: "10px", marginTop: "0rem" }}
                    >
                      <input
                        type="checkbox"
                        value={isAcceptTerm2}
                        onChange={handleTermChange2}
                        checked={isAcceptTerm2}
                      />
                      <p className="fs-des">
                        I have read and agree to the{" "}
                        <a className="signup_terms_link">
                          Terms and Conditions
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* upload button */}
                  <div className="mm_form_single_input">
                    {/* <label htmlFor=""></label> */}
                    <div
                      className="mall_upload_btn_wrapppp"
                      style={{
                        width: "100% !important",
                        display: "block !important",
                      }}
                    >
                      <button
                        className="btn btn-black checkout_brand_submit"
                        onClick={() => setCheckoutDisclaimerModal(true)}
                        // onClick={() => setIsOpen4(true)}
                        disabled={
                          isAcceptTerm == 1 && isAcceptTerm2 == 1 ? false : true
                        }
                      >
                        {fetchLoad === true ? "Loading....." : " Submit Order"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* text-input wrapp end */}
            </div>
            {/*     Checkout second part */}

            <div className="checkout-main-wrapp">
              <p className="brand-checkout-subheading">Summary</p>
              <div className="checkout-dropdown-main-wrapp">
                {AccordionData && AccordionData.length > 0
                  ? AccordionData.map((item, index) => {
                    return (
                      <>
                        <button
                          className="checkout-head-sub-part"
                          onClick={() => {
                            handleToggle(item.id);
                            array_sort(item.id);
                          }}
                        >
                          <div className="checkout-heading-txt-part">
                            <p className="checkout-heading-txt">
                              {item.name}
                              {/* {item.city} {"(" + item.mall.length + ")"} &nbsp;
                            &nbsp;{" "} */}
                              {item.id === toggle ? (
                                <IoIosArrowUp size={20} color="#ff8b00" />
                              ) : (
                                <IoIosArrowDown size={20} />
                              )}
                            </p>
                          </div>
                          {item.id == 1 ? (
                            <p className="checkout-price">
                              R {totalomebytwo}
                            </p>
                          ) : item.id == 2 ? (
                            <p className="checkout-price">R {totalsquare}</p>
                          ) : item.id == 3 ? (
                            <p className="checkout-price">
                              R {totallandingleaderboard}
                            </p>
                          ) : item.id == 4 ? (
                            <p className="checkout-price">R {totallead}</p>
                          ) : item.id == 5 ? (
                            <p className="checkout-price">R {totalpro}</p>
                          ) : item.id == 6 ? (
                            <p className="checkout-price">R {totalpduct}</p>
                          ) : item.id == 7 ? (
                            <p className="checkout-price">
                              R {totalpducttil}
                            </p>
                          ) : null}
                        </button>

                        {item.id === toggle ? (
                          <div className="bim_accordian_mall_wrapp">
                            {sort_array.map((itm, ind) => {
                              console.log("itm", itm);
                              return (
                                <>
                                  {item.id == 1 ? (
                                    <button key={itm.id}>
                                      {itm.landingpagetiles?.title}
                                    </button>
                                  ) : item.id == 2 ? (
                                    <button key={itm.id}>
                                      {itm.landingpagesquaretiles?.title}
                                    </button>
                                  ) : item.id == 3 ? (
                                    <button key={itm.id}>
                                      {itm.landingpageleaderborads?.title}
                                    </button>
                                  ) : item.id == 4 ? (
                                    <button key={itm.id}>
                                      {itm.leaderboards.title}
                                    </button>
                                  ) : item.id == 5 ? (
                                    <button key={itm.id}>
                                      {itm.promotionbanners.description}
                                    </button>
                                  ) : item.id == 6 ? (
                                    <button key={itm.id}>
                                      {itm.productbanners.description}
                                    </button>
                                  ) : item.id == 7 ? (
                                    <button key={itm.id}>
                                      {itm.productbannertiles.title}
                                    </button>
                                  ) : null}
                                </>
                              );
                            })}
                          </div>
                        ) : null}
                      </>
                    );
                  })
                  : null}
                <div className="checkout-totalbox">
                  <p className="checkout-total-txt">Total</p>
                  <p className="checkout-total-txt">
                    R{" "}
                    {totalomebytwo +
                      totalsquare +
                      totallandingleaderboard +
                      totallead +
                      totalpro +
                      totalpduct +
                      totalpducttil}{" "}
                  </p>
                </div>
              </div>
            </div>

            {/* mm terms condition wrapp */}
            <div className="checkout-terms-part-responsive">
              <div className="mm_form_single_input">
                {/* <label htmlFor=""></label> */}
                <div
                  className="signup_terms_wrapp"
                  style={{ marginBottom: "10px" }}
                >
                  <input type="checkbox" />
                  <p className="fs-des">
                    I have read and agree to the{" "}
                    <a className="signup_terms_link">Privacy Policy</a>
                  </p>
                </div>
              </div>
              <div className="mm_form_single_input">
                {/* <label htmlFor=""></label> */}
                <div
                  className="signup_terms_wrapp"
                  style={{ marginBottom: "10px", marginTop: "0rem" }}
                >
                  <input type="checkbox" />
                  <p className="fs-des">
                    I have read and agree to the{" "}
                    <a className="signup_terms_link">Terms and Conditions</a>
                  </p>
                </div>
              </div>

              {/* upload button */}
              <div className="mm_form_single_input">
                {/* <label htmlFor=""></label> */}
                {/* <div className="mall_upload_btn_wrapp"> */}
                <div className="">
                  <button
                    style={{ marginTop: "1rem" }}
                    className="btn btn-black checkout_brand_submit"
                  // onClick={() => UpdateMallData()}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ReactModal
            isOpen={modalIsOpen4}
            onRequestClose={closeModal4}
            style={customStyles}
          >
            <div className="card_payment1">
              <button className="signup_modal_close" onClick={closeModal4}>
                <GrClose />
              </button>
              <div className="card_payment">
                <form
                  action={shopperResultUrl}
                  className="paymentWidgets"
                  data-brands="VISA MASTER AMEX"
                  onSubmit={() => handleSubmit()}
                >
                  <button type="submit">Pay Now</button>
                </form>
              </div>
            </div>
          </ReactModal>

          <ReactModal
            isOpen={checkoutdisclaimermodal}
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

              {/* <p>Are you sure you want to Reset all Data</p> */}
              <p>{getMallModalData?.checkout_description}</p>
              <div className="delete-modal-btn-box">
                <button
                  onClick={() => CheckingPayment()}
                  className="delete-modal-btn"
                >
                  {getMallModalData?.checkout_button1}
                </button>
                {/* onClick={() => {
              // setStore_id(itm.id);
              // DeleteMallStoreData(itm.id);
              setDeleteModal(true);
            }} */}

                <button onClick={closeModal} className="delete-modal-btn">
                  {getMallModalData?.checkout_button2}
                </button>
              </div>
            </div>
            {/* </div> */}
          </ReactModal>
        </>
      )}
    </div>
  );
};

export default StoreCheckout;