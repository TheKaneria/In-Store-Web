import React, { useEffect, useState } from "react";
// import "./StoreCheckout.css";
import "./Cinemacheckout.css";
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
    name: "Cinemas Product Tiles",
  },
  {
    id: 7,
    name: "Cinema Analytics Bundles",
  },
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
  const [totalbundleanalytic, SetBundleAnalytic] = useState("");
  const [modalIsOpen4, setIsOpen4] = useState(false);
  const [fetchLoad, setfetchLoad] = useState(false);
  const [checkoutdisclaimermodal, setCheckoutDisclaimerModal] = useState(false);

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
        // (JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          SetnearStore(res.data.data);
          SetTotalLead(res.data.total_leaderboard_amt);
          SetTotalPro(res.data.total_promotion_banner_amt);
          SetTotalPduct(res.data.total_product_banner_amt);
          SetTotalPducttil(res.data.total_product_banner_tile_amt);
          SetTotalSquare(res.data.total_landing_page_square_tile_amt);
          SetTotalOnebyTwo(res.data.total_landing_page_tile_amt);
          SetLandingLeaderboard(res.data.total_landing_page_leaderboard_amt);
          SetBundleAnalytic(res.data.total_analitic_bundle_amt);
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
      // ("ffff", numDescending);
      SetSort_Array(numDescending);
    } else if (id == 2) {
      const numDescending = [...getnearStore].filter((a, b) =>
        a.landing_page_square_tile_id ? a.landing_page_square_tile_id : ""
      );
      // ("ffff", numDescending);
      SetSort_Array(numDescending);
    } else if (id == 3) {
      const numDescending = [...getnearStore].filter((a, b) =>
        a.landing_page_leaderboard_id ? a.landing_page_leaderboard_id : ""
      );
      // ("ffff", numDescending);
      SetSort_Array(numDescending);
    } else if (id == 4) {
      const numDescending = [...getnearStore].filter((a, b) =>
        a.leaderboard_banner_id ? a.leaderboard_banner_id : ""
      );
      // ("ffff", numDescending);
      SetSort_Array(numDescending);
    } else if (id == 5) {
      const numDescending = [...getnearStore].filter((a, b) =>
        a.promotion_banner_id ? a.promotion_banner_id : ""
      );
      // ("ffff", numDescending);
      SetSort_Array(numDescending);
    } else if (id == 6) {
      const numDescending = [...getnearStore].filter((a, b) =>
        a.product_banner_tile_id ? a.product_banner_tile_id : ""
      );
      // ("ffff", numDescending);
      SetSort_Array(numDescending);
    } else if (id == 7) {
      const numDescending = [...getnearStore].filter((a, b) =>
        a.analytic_bundle_id ? a.analytic_bundle_id : ""
      );
      // ("ffff", numDescending);
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

  const [BrandId, setBrandId] = useState("");
  const [paymode, SetPyMode] = useState(1);
  const [checkout_id, setCheckout_id] = useState("");

  const [isAcceptTerm, setIsAcceptTerm] = useState(0);
  const [isAcceptTerm2, setIsAcceptTerm2] = useState(0);

  // const handleTermChange = (event) => {
  //   setIsAcceptTerm((current) => !current);
  // };

  const handleTermChange = (e) => {
    setIsAcceptTerm(1);
  };
  const handleTermChange2 = (e) => {
    setIsAcceptTerm2(1);
  };
  const [modalloading, SetModalLoading] = useState(false);

  function closeModal4() {
    setIsOpen4(false);
    setfetchLoad(false);
    SetModalLoading(false);
  }

  const [checkid, SetCheckId] = useState("");
  const [isloading, SetIsLoading] = useState(false);

  // const Place_Order = async () => {
  //   if(frist_mall == ""){
  //     Notification("error", "Error!", "Please Enter First Name!");
  //     return;
  // }else if(last_mall === ""){
  //   Notification("error", "Error!", "Please Enter Second Name!");

  // }else if(compname === ""){
  //   Notification("error", "Error!", "Please Enter Company Name!");

  // }else if(comregi === ""){
  //   Notification("error", "Error!", "Please Enter Company Registration!");

  // }else if(BrandId === ""){
  //   Notification("error", "Error!", "Please Select Region!");

  // }else if(physicaladd === ""){
  //   Notification("error", "Error!", "Please Enter Address!");

  // }else if(physicaladd1 === ""){
  //   Notification("error", "Error!", "Please Enter Address1!");
  // }else if(pcode === ""){
  //   Notification("error", "Error!", "Please Enter Postal Code!");

  // }else if(number === ""){
  //   Notification("error", "Error!", "Please Enter Number!");

  // }else if(emailadd === ""){
  //   Notification("error", "Error!", "Please Enter Email!");

  // }else{
  //   const token = JSON.parse(localStorage.getItem("is_token"));

  //   const formdata = await new FormData();
  //   await formdata.append("first_name", frist_mall);
  //   await formdata.append("last_name", last_mall);
  //   await formdata.append("company_name", compname);
  //   await formdata.append("company_reg", comregi);
  //   await formdata.append("region_id", BrandId);
  //   await formdata.append("address_1", physicaladd);
  //   await formdata.append("address_2", physicaladd1);
  //   await formdata.append("pin_code", pcode);
  //   await formdata.append("number", number);
  //   await formdata.append("email", emailadd);
  //   await formdata.append("terms_condition", isAcceptTerm === true ? 1 : 0);

  //   SetIsLoading(true);

  //   axios
  //     .post(start_payment, formdata, {
  //       headers: {
  //         Accept: ACCEPT_HEADER,
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((res) => {
  //       (JSON.stringify(res.data.data, null, 2));
  //       if(res.data.success === 1) {
  //         const checkoutId = res.data.data.data.checkout_id;
  //         ("Checkout ID:", checkoutId);
  //         // displayRazorpay(res.data.data.checkout_id);

  //         SetCheckId(res.data.data.checkout_id);
  //         SetFrist_mall("");
  //         SetLast_mall("");
  //         SetComPname("");
  //         SetComRegi("");
  //         SetPhysicalAdd("");
  //         SetPhysicalAdd1("");
  //         SetPCode("");
  //         SetNumber("");
  //         SetEmailAdd("");
  //         SetCardName("");
  //         SetCardNumber("");
  //         SetCardCode("");
  //         SetCardDate("");
  //         setBrandName("");
  //         setMode("");
  //         setBrandId("");
  //       } else if(res.data.success === 0){
  //         Notification(
  //           "error",
  //           "Error!",
  //           res.data.message
  //         );
  //       }

  //     })
  //     .catch((err) => {
  //      console.log("err11", err);
  //     });
  //   }
  // };

  const Place_Order = async () => {
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
      formdata.append("email", emailadd);
      formdata.append("terms_condition", isAcceptTerm === true ? 1 : 0);
      SetIsLoading(true);
      try {
        const res = await axios.post(start_payment, formdata, {
          headers: {
            Accept: ACCEPT_HEADER,
            Authorization: "Bearer " + token,
          },
        });

        if (res.data.success === 1) {
          const checkoutId = res.data.data.data.checkout_id;
          "Checkout ID:", checkoutId;
          // displayRazorpay(checkoutId);

          Notification("success", "Success!", "Order Submitted Successfully!");
        } else {
          Notification("error", "Error!", res.data.message);
        }
      } catch (err) {
        console.error("Error:", err);
        Notification(
          "error",
          "Error!",
          "An error occurred while processing your order."
        );
      }
    }
  };

  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const OPPWA_CHECKOUT_URL = "https://eu-test.oppwa.com/v1/checkouts";
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
              "ak_bmsc=4188111AB30A51C978AED10DC4A83BA1~000000000000000000000000000000~YAAQwvIVAr/d2N6PAQAAjKSe4hjeOUKbC3c4aGdc2jo9Q7LAlGTGeBTOjZR6oHC3Lo0IiBSntTA3vGurvpUaJ2/vQp8hwwHwl+jgGAcF0SALg+7TSxvlBGfeJBVjkSy2BdnwpPogtyKcDaaEbSn1zFzck9UeqCRZfpuM4ftE0SSqjlkRJTRx2vv9yDNGBUFOMf8wwKQduIjZQ0mJdGV8P25jKmeo8PVFei1BKbuPG0VE5RrRvhXwHP8dyPs7oSLxSMo817IpeJdV2Ks00XYcmW3pcLhkulOCny1J0g7xWfOh0X49HSO8Lc5E/PKvChMrJuMqXzSBhSUXtyZLoWMaQk30Ayq/Asfuhrb9OFo+RiocF1BEXEiC33kifdU=' \
--data-urlencode 'entityId=8ac7a4c78aaf7f58018ab1fb531903ea", // Replace with your actual cookie value
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
          is_cinema_checkout: "true",
        };
        localStorage.setItem("checkout_Data", JSON.stringify(checkout_Data));
        setCheckoutDisclaimerModal(false);
        SetModalLoading(true);
        displayRazorpay(data.id);
        SetCheckId(data.id);
        setResponseData(data);
      } catch (err) {
        setError(err.message);
      }
    }
  };
  // const check_data = async (id) => {
  //   const token = JSON.parse(localStorage.getItem("is_token"));
  //   const data =
  //     `entityId=${id}` + "&amount=92.00" + "&currency=INR" + "&paymentType=DB";

  //   const url = "https://eu-test.oppwa.com/v1/checkouts/";

  //   axios
  //     .post(url, data, {
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((res) => {
  //       ("resss", res.data);
  //     })
  //     .catch((err) => {
  //       ("errr", err);
  //     });
  // };

  async function displayRazorpay(checkout_id) {
    "Checkout ID for Razorpay:", checkout_id;
    const token = JSON.parse(localStorage.getItem("is_token"));
    const script = document.createElement("script");

    script.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkout_id}`;
    script.async = true;

    script.onload = () => {
      setIsOpen4(true);
      SetModalLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }
  // this site will be done by PARTH KARIA and Madhav Sapariya
  // const shopperResultUrl = `https://plance.in/In-store-front/cinemadashboard`;
  // const shopperResultUrl = `https://plance.in/In-store-front/Newpage/${checkid}`;
  // const shopperResultUrl = `http://localhost:3000/In-store-front/Newpage/${checkid}`;
  // const shopperResultUrl = `https://getmynfc.com/In-store-front/Newpage/${checkid}`;
  // const shopperResultUrl = `https://plance.in/In-store-front/Newpage/${checkid}`;
  const shopperResultUrl = `https://plance.in/In-store-front/Newpage/${checkid}`;

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="mm_main_wrapp mm_main_wrapp_cinema_checkout mm_main_wrapp_cinema_checkoutt">
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
          <div className="mall_name_wrapp" style={{ paddingLeft: "0rem" }}>
            <p className="mall_name_heading">
              {" "}
              {/* {get_mall_auth_data &&
            get_mall_auth_data.retailers.name &&
            get_mall_auth_data.retailers.name} */}
              {get_mall_auth_data &&
                get_mall_auth_data.name &&
                get_mall_auth_data.name}
              :
            </p>
            {/* <p className="mall_name_heading">Sterkinikor</p> */}
            <span style={{ fontWeight: "600" }}>Checkout</span>
          </div>
          <div className="mm_horizontal_line"></div>
          {/* mall management name end */}

          {/* mall management form start */}

          <div className="brand-checkout-main-flex-wrapp cinema-checkout-main-flex-wrapp">
            <div className="store_checkout_form_input_wrapp cinema_checkout_form_input_wrapp">
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
                    type="number"
                    value={number}
                    maxLength={10}
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
                  <div
                    className="mm_form_single_input"
                    style={{ flexDirection: "column", gap: "0px" }}
                  >
                    {/* <label htmlFor=""></label> */}
                    <div
                      className="signup_terms_wrapp"
                      style={{ marginBottom: "0px" }}
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
                    <div
                      className="signup_terms_wrapp"
                      style={{ marginBottom: "10px" }}
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
                        marginTop: "20px",
                      }}
                    >
                      <button
                        className="btn btn-orange"
                        style={{ backgroundColor: "#000" }}
                        disabled={
                          isAcceptTerm == 1 && isAcceptTerm2 == 1 ? false : true
                        }
                        onClick={() => setCheckoutDisclaimerModal(true)}
                        // onClick={() => setIsOpen4(true)}
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

            <div className="checkout-main-wrapp cinemaa-checkout-main-wrapp">
              <p className="brand-checkout-subheading">Summary</p>
              <div className="checkout-dropdown-main-wrapp">
                {AccordionData && AccordionData.length > 0
                  ? AccordionData.map((item, index) => {
                      return (
                        <>
                          <button
                            className="checkout-head-sub-part checkout-head-sub-part-cinema"
                            onClick={() => {
                              handleToggle(item.id);
                              array_sort(item.id);
                            }}
                          >
                            <div className="checkout-heading-txt-part">
                              <p className="checkout-heading-txt checkout-head-sub-part-cinema">
                                {item.name}

                                {item.id === toggle ? (
                                  <IoIosArrowUp size={20} color="#ff8b00" />
                                ) : (
                                  <IoIosArrowDown size={20} />
                                )}
                              </p>
                            </div>
                            {item.id == 1 ? (
                              <>
                                <p className="checkout-price">
                                  R {totalomebytwo}
                                </p>
                              </>
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
                              <p className="checkout-price">
                                R {totalpducttil}
                              </p>
                            ) : item.id == 7 ? (
                              <p className="checkout-price">
                                R {totalbundleanalytic}
                              </p>
                            ) : null}
                          </button>

                          {item.id === toggle ? (
                            <div className="bim_accordian_mall_wrapp">
                              {sort_array.map((itm, ind) => {
                                return (
                                  <>
                                    {item.id == 1 ? (
                                      <button key={itm.id}>
                                        {itm.landingpagetiles.title}
                                      </button>
                                    ) : item.id == 2 ? (
                                      <button key={itm.id}>
                                        {itm.landingpagesquaretiles.title}
                                      </button>
                                    ) : item.id == 3 ? (
                                      <button key={itm.id}>
                                        {itm.landingpageleaderborads.title}
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
                                        {itm.productbannertiles.title}
                                      </button>
                                    ) : item.id == 7 ? (
                                      <button
                                        key={itm.id}
                                        style={{ textAlign: "start" }}
                                      >
                                        {itm.analyticbundles.option1}
                                        <br />
                                        {itm.analyticbundles.option2}
                                        <br />
                                        {itm.analyticbundles.option3}
                                        <br />
                                        {itm.analyticbundles.option4}
                                        <br />
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
                      totalpducttil +
                      totalbundleanalytic}{" "}
                  </p>
                </div>
              </div>
            </div>

            {/* mm terms condition wrapp */}
            <div className="checkout-terms-part-responsive">
              <div
                className="mm_form_single_input"
                style={{ flexDirection: "column", gap: "0px" }}
              >
                {/* <label htmlFor=""></label> */}
                <div
                  className="signup_terms_wrapp"
                  // style={{ marginBottom: "10px" }}
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
                <div
                  className="signup_terms_wrapp"
                  // style={{ marginBottom: "10px" }}
                >
                  <input
                    type="checkbox"
                    value={isAcceptTerm2}
                    onChange={handleTermChange2}
                    checked={isAcceptTerm2}
                  />
                  <p className="fs-des">
                    I have read and agree to the{" "}
                    <a className="signup_terms_link">Terms and Conditions</a>
                  </p>
                </div>
              </div>

              {/* upload button */}
              {/* <div className="mm_form_single_input">
            <div className="mall_upload_btn_wrapp">
              <button
                className="btn btn-orange"
              >
                Update
              </button>
            </div>
          </div> */}
              <div className="mm_form_single_input">
                {/* <label htmlFor=""></label> */}
                <div
                  className="mall_upload_btn_wrapppp"
                  style={{
                    width: "100% !important",
                    display: "block !important",
                    marginTop: "20px",
                  }}
                >
                  <button
                    className="btn btn-orange"
                    style={{ backgroundColor: "#000" }}
                    onClick={() => setCheckoutDisclaimerModal(true)}
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

          {/* mall management form end */}
          {/* model 4 */}
          <ReactModal
            isOpen={modalIsOpen4}
            // onAfterOpen={afterOpenModal}
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
                  onSubmit={handleSubmit}
                ></form>
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