import React, { useEffect, useState } from "react";
import "./MallCheckout.css";
import { useMallContext } from "../../context/mall_context";
import { IoChevronBack } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import images from "../../constants/images";
import ReactModal from "react-modal";
import axios from "axios";
import Notification from "../../utils/Notification";


import {
  ACCEPT_HEADER,
  get_mall_analytic,
  get_mall_cart,
  get_ratecard_child,
  get_store_cart,
  start_mall_payment,
  start_payment,
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
import { Toggle } from "rsuite";

const AccordionData = [
  {
    id: 1,
    city: "Leaderboard Banners ",
  },
  {
    id: 2,
    city: "Promotional Banners",
  },
  {
    id: 3,
    city: "Product Banners",
  },
  {
    id: 4,
    city: "Product Tiles",
  },
];
const MallCheckout = ({ get_mall_auth_data, setTab,getMallModalData }) => {
  const [isload, SetLoad] = useState(false);
  const [totallead, SetTotalLead] = useState("");
  const [totalpro, SetTotalPro] = useState("");
  const [totalpduct, SetTotalPduct] = useState("");
  const [totalpducttil, SetTotalPducttil] = useState("");
  const [modalIsOpen4, setIsOpen4] = useState(false);
  const [getPricee, setpricee] = useState('');
  const [checkoutdisclaimermodal, setCheckoutDisclaimerModal] = useState(false);




  useEffect(() => {
    const procee = localStorage.getItem("checkoutproce")

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
        (JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          SetnearStore(res.data.data);
          SetTotalLead(res.data.total_leaderboard_amt);
          SetTotalPro(res.data.total_promotion_banner_amt);
          SetTotalPduct(res.data.total_product_banner_amt);
          SetTotalPducttil(res.data.total_product_banner_tile_amt);
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
        a.leaderboard_banner_id ? a.leaderboard_banner_id : ""
      );
      ("ffff", numDescending);
      SetSort_Array(numDescending);
    } else if (id == 2) {
      const numDescending = [...getnearStore].filter((a, b) =>
        a.promotion_banner_id ? a.promotion_banner_id : ""
      );
      ("ffff", numDescending);
      SetSort_Array(numDescending);
    } else if (id == 3) {
      const numDescending = [...getnearStore].filter((a, b) =>
        a.product_banner_id ? a.product_banner_id : ""
      );
      ("ffff", numDescending);
      SetSort_Array(numDescending);
    } else if (id == 4) {
      const numDescending = [...getnearStore].filter((a, b) =>
        a.product_banner_tile_id ? a.product_banner_tile_id : ""
      );
      ("ffff", numDescending);
      SetSort_Array(numDescending);
    } else {
      null;
    }
  };

  const [files, setFiles] = useState([]);

  // const [toggle, setToggle] = useState(null);
  const [toggle, setToggle] = useState(true);
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

  ("get_mall_auth_data",get_mall_auth_data);

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
  const [frist_mall, SetFrist_mall] = useState(get_mall_auth_data ?.first_name);
  const [last_mall, SetLast_mall] = useState(get_mall_auth_data ?.last_name);
  const [compname, SetComPname] = useState("");
  const [comregi, SetComRegi] = useState("");
  const [physicaladd, SetPhysicalAdd] = useState(get_mall_auth_data ?.address);
  const [physicaladd1, SetPhysicalAdd1] = useState(get_mall_auth_data ?.address2);
  const [pcode, SetPCode] = useState("");
  const [number, SetNumber] = useState(get_mall_auth_data ?.number);
  const [emailadd, SetEmailAdd] = useState(get_mall_auth_data ?.email);
  const [cardnum, SetCardName] = useState("");
  const [cardnumber, SetCardNumber] = useState("");
  const [cardcode, SetCardCode] = useState("");
  const [carddate, SetCardDate] = useState("");
  const [BrandName, setBrandName] = useState(get_mall_auth_data ?.regions?.name);
  const [getmode, setMode] = useState(1);
  const [getCartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getCartTotal, setCartTotal] = useState();
  const [fetchLoad, setfetchLoad] = useState(false);



  const [BrandId, setBrandId] = useState(get_mall_auth_data ?.regions?.id);
  const [paymode, SetPyMode] = useState(1);
  const [checkout_id, setCheckout_id] = useState("");

  const [isAcceptTerm, setIsAcceptTerm] = useState(0);
  const [isAcceptTerm2, setIsAcceptTerm2] = useState(0);
  const {StoreValue} =useMallContext()

  const handleTermChange = (e) => {
    setIsAcceptTerm(1);
  };
  const handleTermChange2 = (e) => {
    setIsAcceptTerm2(1);
  };

  function closeModal4() {
    setIsOpen4(false);
  }

  const [checkid, SetCheckId] = useState("");

  useEffect(() => {
    getCartDataApi();
  }, [])


  // const getCartDataApi = async () => {
  //   const token = JSON.parse(localStorage.getItem("is_token"));
  //   setLoading(true);
  //   axios
  //     .get(get_mall_cart, {
  //       headers: {
  //         Accept: ACCEPT_HEADER,
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((res) => {
  //       ("ggg", JSON.stringify(res.data, null, 2));
  //       setLoading(false);
  //       if (res.data.success == 1) {
  //         setCartData(res.data.data);
  //         setCartTotal(getCartData.length * res.data.data[0].price);
  //         ("mall cart data are", getCartData);
  //       } else {
  //         null;
  //       }
  //     })
  //     .catch((err) => {
  //      console.log("err11", err);
  //       setLoading(false);
  //     });
  // };


  const getCartDataApi = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    setLoading(true);
  
    try {
      const response = await axios.get(get_mall_cart, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.success === 1) {
        const cartData = response.data.data;
        setCartData(cartData);
        setCartTotal(cartData.length * cartData[0].price);
        ("mall cart data are", cartData);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };
  // const Place_Order = async () => {
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
  //   // await formdata.append("payment_mode", paymode);
  //   // await formdata.append("terms_condition", isAcceptTerm === true ? 1 : 0);
  //   formdata.append("terms_condition", isAcceptTerm);
  //   formdata.append("privacy_policy", isAcceptTerm2);
  //   // await formdata.append("name_card", cardnum);
  //   // await formdata.append("expiry_date", carddate);
  //   // await formdata.append("card_no", cardnumber);
  //   // await formdata.append("cvv_code", cardcode);
  //   // await formdata.append("status", getmode);

  //   axios
  //     .post(start_mall_payment, formdata, {
  //       headers: {
  //         Accept: ACCEPT_HEADER,
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((res) => {
  //       (JSON.stringify(res.data.data, null, 2));
  //       displayRazorpay(res.data.data.checkout_id);
  //       // check_data(res.data.data.checkout_id);
  //       SetCheckId(res.data.data.checkout_id);
  //       SetFrist_mall("");
  //       SetLast_mall("");
  //       SetComPname("");
  //       SetComRegi("");
  //       SetPhysicalAdd("");
  //       SetPhysicalAdd1("");
  //       SetPCode("");
  //       SetNumber("");
  //       SetEmailAdd("");
  //       SetCardName("");
  //       SetCardNumber("");
  //       SetCardCode("");
  //       SetCardDate("");
  //       setBrandName("");
  //       setMode("");
  //       setBrandId("");
  //     })
  //     .catch((err) => {
  //      console.log("err11", err);
  //     });
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
      formdata.append("terms_condition", isAcceptTerm);
      formdata.append("privacy_policy", isAcceptTerm2);      
      setLoading(true);
      try {
        const res = await axios.post(start_payment, formdata, {
          headers: {
            Accept: ACCEPT_HEADER,
            Authorization: "Bearer " + token,
          },
        });

        if (res.data.success === 1) {
          const checkoutId = res.data.data.data.checkout_id;
          ("Checkout ID:", checkoutId);
          // displayRazorpay(checkoutId);

          // fetchData();

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
  const fetchData = async () => {

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
    }else{
    try {
      setfetchLoad(true);
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
          amount:getCartTotal,
          currency: "ZAR",
          paymentType: "DB",
          merchantTransactionId: "TestInStore",
        }).toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      ("madhav--?", JSON.stringify(data.id, null, 2));
      StoreValue(frist_mall, last_mall)
      
      const checkout_Data ={
        frist_mall:frist_mall,
        last_mall:last_mall,
        compname:compname,
        comregi:comregi,
        BrandId:BrandId,
        physicaladd:physicaladd,
        physicaladd1:physicaladd1,
        pcode:pcode,
        number:number,
        email:email,
        isAcceptTerm:isAcceptTerm,
        isAcceptTerm2:isAcceptTerm2,
        is_mall_checkout:"true",
      }
      localStorage.setItem("checkout_Data", JSON.stringify(checkout_Data));
      setCheckoutDisclaimerModal(false);
      setfetchLoad(false);
      displayRazorpay(data.id);
      SetCheckId(data.id);
      setResponseData(data);
    } catch (err) {
      setError(err.message);
      setfetchLoad(false)
    }}
  };

  async function displayRazorpay(checkout_id) {
    ("Checkout ID for Razorpay:", checkout_id);
    const token = JSON.parse(localStorage.getItem("is_token"));
    const script = document.createElement("script");

    script.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkout_id}`;
    script.async = true;

    script.onload = () => {
      setIsOpen4(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }


  // const shopperResultUrl = `https://eu-test.oppwa.com/v1/checkouts/payment?entityId=8ac7a4c78aaf7f58018ab1fb531903ea&amount=92.00&currency=EUR&paymentBrand=VISA&paymentType=DB&merchantTransactionId=test`;
  // const shopperResultUrl = `https://eu-test.oppwa.com/v1/checkouts/${checkid}/paymententityId=8ac7a4c78aaf7f58018ab1fb531903ea&amount=92.00&currency=ZAR&paymentBrand=VISA&paymentType=DB&merchantTransactionId=test`;
  // const shopperResultUrl = `https://plance.in/In-store-front/profile-page`;
  const shopperResultUrl =`https://plance.in/In-store-front/Newpage/${checkid}`;
  // const shopperResultUrl =`http://localhost:3000/In-store-front/Newpage/${checkid}`;

  // useEffect(()=>{
  //   getCartDataApi();
  // },[])

  function handleSubmit(event) {

    event.preventDefault();

    
  }




  return (
    <div className="mm_main_wrapp mall_checkout_padding">
      {/* mall management name start */}
      <div className="mall_name_wrapp mall_mall_name_wrapp" style={{ paddingLeft: "0rem" }}>
        {/* <p className="mall_name_heading">
          {" "}
          {get_mall_auth_data &&
            get_mall_auth_data.retailers.name &&
            get_mall_auth_data.retailers.name}
          :
        </p> */}

        <p className="mall_name_heading mall_checkout_name_heading mall_mall_name_heading">
          {" "}
          {get_mall_auth_data &&
            get_mall_auth_data.name &&
            get_mall_auth_data.name}
          :
        </p>
        <span className="mall_mall_name_heading" style={{ fontWeight: "600" }}>Checkout</span>
      </div>
      {/* <div className="mm_horizontal_line"></div> */}
      <div className="" style={{ marginBottom: "2rem" }}></div>
      {/* mall management name end */}

      {/* mall management form start */}

      <div className="brand-checkout-main-flex-wrapp mall-checkout-main-flex-wrapp">
        <div className="store_checkout_form_input_wrapp brand_checkout_form_input_wrapp">
          {/* text-input wrapp start */}
          <div className="">
            <p className="brand-checkout-subheading">Billing Details</p>
            {/* single text-input */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div className="mm_form_single_input store-checkout-form-flex-column">
                <label htmlFor="">First Name</label>
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
                <label htmlFor="">Last Name</label>
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
              <label htmlFor="">Company Name</label>
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
              <label htmlFor="">Company Registration</label>
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
              <label htmlFor="">Region</label>
              <div className="select-wrapper" style={{ width: "100%" }}>
                <select
                  className="input_box"
                  onChange={(e) => {
                    ("rrr", e.target.value);
                    // setBrandName(e.target.value);
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
              <label htmlFor="">Physical Address</label>
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
              <label htmlFor="">Physical Address 1</label>
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
              <label htmlFor="">Postal code</label>
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
              <label htmlFor="">Contact Number</label>
              <input
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
              <label htmlFor="">Email Address</label>
              <input
                type="email"
                value={emailadd}
                onChange={(e) => SetEmailAdd(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>

            {/* single text-input */}
            {/* <div
                            className="mm_form_single_input store-checkout-form-flex-column"
                            style={{ alignItems: "flex-start" }}
                        >
                            <label htmlFor="">Payment methods</label>
                            <div className="checkout-payment-method-imgbox">
                                <button
                                    onClick={() => {
                                        SetPyMode(1);
                                    }}
                                >
                                    <img
                                        src={images.checkout_payment_method1}
                                        className="checkout-payment-method-img"
                                        style={{ opacity: paymode == 1 ? "0.5" : "1" }}
                                    />
                                </button>
                                <button
                                    onClick={() => {
                                        SetPyMode(2);
                                    }}
                                >
                                    <img
                                        src={images.checkout_payment_method2}
                                        className="checkout-payment-method-img"
                                        style={{ opacity: paymode == 2 ? "0.5" : "1" }}
                                    />
                                </button>
                                <button
                                    onClick={() => {
                                        SetPyMode(3);
                                    }}
                                >
                                    <img
                                        src={images.checkout_payment_method3}
                                        className="checkout-payment-method-img"
                                        style={{ opacity: paymode == 3 ? "0.5" : "1" }}
                                    />
                                </button>
                                <button
                                    onClick={() => {
                                        SetPyMode(4);
                                    }}
                                >
                                    <img
                                        src={images.checkout_payment_method4}
                                        className="checkout-payment-method-img"
                                        style={{ opacity: paymode == 4 ? "0.5" : "1" }}
                                    />
                                </button>
                            </div>
                        </div> */}
            {/* <div
                            className="mm_form_single_input store-checkout-form-flex-column"
                            style={{ alignItems: "flex-start" }}
                        >
                            <label htmlFor="">Name Of card</label>
                            <input
                                type="email"
                                value={cardnum}
                                onChange={(e) => SetCardName(e.target.value)}
                                name=""
                                id=""
                                className="input_box"
                            />
                        </div> */}
            {/* <div
                            className="mm_form_single_input store-checkout-form-flex-column"
                            style={{ alignItems: "flex-start" }}
                        >
                            <label htmlFor="">Card Number</label>
                            <input
                                type="email"
                                value={cardnumber}
                                onChange={(e) => SetCardNumber(e.target.value)}
                                name=""
                                id=""
                                className="input_box"
                            />
                        </div> */}
            {/* <div
                            className="mm_form_single_input store-checkout-form-flex-column"
                            style={{ alignItems: "flex-start" }}
                        >
                            <label htmlFor="">Expirey date</label>
                            <input
                                type="date"
                                value={carddate}
                                onChange={(e) => SetCardDate(e.target.value)}
                                name=""
                                id=""
                                className="input_box"
                            />
                        </div> */}
            {/* <div
                            className="mm_form_single_input store-checkout-form-flex-column"
                            style={{ alignItems: "flex-start" }}
                        >
                            <label htmlFor="">CVC code</label>
                            <input
                                type="email"
                                value={cardcode}
                                onChange={(e) => SetCardCode(e.target.value)}
                                name=""
                                id=""
                                className="input_box"
                            />
                        </div> */}

            {/* <div className="radio-btn-flex-brand">
                            <div className="radio-btn-inner-flex">
                                <input
                                    type="radio"
                                    id="Online"
                                    name="gender"
                                    value={getmode}
                                    onChange={(e) => setMode(1)}
                                />
                                <label className="course-form-txt" for="male">
                                    success
                                </label>
                            </div>

                            <div className="radio-btn-inner-flex">
                                <input
                                    type="radio"
                                    id="In-Person"
                                    name="gender"
                                    value={getmode}
                                    onChange={(e) => setMode(2)}
                                />
                                <label className="course-form-txt" for="specifyColor">
                                    Fail{" "}
                                </label>
                            </div>
                        </div> */}

            {/* mm terms condition wrapp */}
            <div className="checkout-terms-part checkout_mall_resp">
              <div className="mm_form_single_input">
                {/* <label htmlFor=""></label> */}
                <div>
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
                      <a className="signup_terms_link">Terms and Conditions</a>

                    </p>
                  </div>
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
                    className="btn btn-black"
                    style={{ width: "230px" }}
                    // onClick={() => fetchData()}
                    onClick={() => setCheckoutDisclaimerModal(true)}
                  // onClick={() => setIsOpen4(true)}
                     disabled={isAcceptTerm == 1 && isAcceptTerm2 == 1? false : true}
                  >
                   {fetchLoad === true ? "Loading....." : " Submit Order"}
                    {/* Submit Order */}
                  </button>
                </div>
              </div>
            </div>


          </div>
          {/* text-input wrapp end */}
        </div>
        {/*     Checkout second part */}

        <div className="checkout-main-wrapp checkout-main-wrapp-mall">
          <p className="brand-checkout-subheading">Summary</p>
          <div className="checkout-dropdown-main-wrapp">
            {getCartData && getCartData.length > 0
              ? getCartData.map((item, index) => {
                  return (
                    <>
                      <button
                        className="checkout-head-sub-part"
                        onClick={() => {
                          handleToggle(item.id);
                          // array_sort(item.id);
                        }}
                      >
                        <div className="checkout-heading-txt-part" style={{display:"flex",flexDirection:"row"}}>
                          <p className="checkout-heading-txt" style={{textAlign:"left"}}>
                            {item.analyticbundles?.cart_title}
                            
                           
                          </p>

                          {item.id === toggle ? (
                              <IoIosArrowUp size={20} color="#ff8b00" />
                            ) : (
                              <IoIosArrowDown size={20} />
                            )}
                        </div>
                        {/* {item.id == 1 ? (
                          <p className="checkout-price">R {totallead}</p>
                        ) : item.id == 2 ? (
                          <p className="checkout-price">R {totalpro}</p>
                        ) : item.id == 3 ? (
                          <p className="checkout-price">R {totalpduct}</p>
                        ) : item.id == 4 ? (
                          <p className="checkout-price">R {totalpducttil}</p>
                        ) : null} */}
                      </button>

                      {/* {item.id === toggle ? (
                        <div className="bim_accordian_mall_wrapp">
                          {sort_array.map((itm, ind) => {
                            return (
                              <>
                                {item.id == 1 ? (
                                  <button key={itm.id}>
                                    {itm.leaderboards.title}
                                  </button>
                                ) : item.id == 2 ? (
                                  <button key={itm.id}>
                                    {itm.promotionbanners.description}
                                  </button>
                                ) : item.id == 3 ? (
                                  <button key={itm.id}>
                                    {itm.productbanners.description}
                                  </button>
                                ) : item.id == 4 ? (
                                  <button key={itm.id}>
                                    {itm.productbannertiles.title}
                                  </button>
                                ) : null}
                              </>
                            );
                          })}
                        </div>
                      ) : null} */}
                    </>
                  );
                })
              : null}
            <div className="checkout-totalbox">
              <p className="checkout-total-txt">Total</p>
              <p className="checkout-total-txt">
                R {getCartTotal}
              </p>
            </div>
          </div>

       

        </div>

        <div className="checkout-terms-part checkout_mall_resp_view">
          <div className="mm_form_single_input">
            <div>
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
                  <a className="signup_terms_link">Terms and Conditions</a>

                </p>
              </div>
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
                className="btn btn-black"
                style={{ width: "230px" }}
                onClick={() => fetchData()}
              // onClick={() => setIsOpen4(true)}
              >
                Submit Order
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
        <div className="sd_model_wrapp sd_model_wrapp-delete" >
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
            <button onClick={() => fetchData()} className="delete-modal-btn">
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
    </div>
  );
};

export default MallCheckout;
