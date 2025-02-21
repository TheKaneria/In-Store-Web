import React, { useEffect, useState } from "react";

import { HomeHero, RegisterMall, WelcomeStore, WhayJoin } from "../container";
import { Helmet } from "react-helmet";
import images from "../constants/images";
import { Navbar, RetailerNavbar } from "../common";
import { AiOutlineClose } from "react-icons/ai";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import Urls from "../utils/Urls";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { ImGoogle } from "react-icons/im";
import { useAuthContext } from "../context/auth_context";
import { useStoreContext } from "../context/store_context";
import { useMallContext } from "../context/mall_context";
import { IoClose } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  ACCEPT_HEADER,
  dynamic_model_popup,
  get_brand_landing,
  get_brand_multiple,
  get_mall,
  get_mall_master,
  unregisterd_retailer,
  unregisterd_retailer_new,
} from "../utils/Constant";
import {
  GrClose,
  GrFacebook,
  GrFacebookOption,
  GrGoogle,
} from "react-icons/gr";

import ReactCSSTransitionGroup from "react-transition-group";
import axios from "axios";
import { RetailerPageNavbar, RetailerWelcomeStore } from "../components";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import WhayJoinRetailer from "../components/whyjoinreailer/WhyJoinRetailer";
import { useDropzone } from "react-dropzone";
const animatedComponents = makeAnimated();

const AfterLoginPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    setLogin,
    setMallRegister,
    RegisterCustomer,
    region_data,
    forgotPassword,
    login_loading,
  } = useAuthContext();

  const [modalIsOpen3, setIsOpen3] = useState(false);



  const [signButn, SetsignButn] = useState(2);
  const [regButn, SetregButn] = useState(2);
  const [boldButn, SetboldButn] = useState(2);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [getregisterCustomerOpen, setRegisterCustomerOpen] = useState(false);
  const [mallsOption2, setMallsOption2] = useState([]);


  let navigate = useNavigate();

  const regEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [modalIsOpenBrand, setModalIsOpenBrand] = useState(false);

  const [getmallname, setMallname] = useState([]);
  const [getfirstname, setFirstname] = useState("");
  const [retailertype, setRetailertype] = useState("");
  const [getlastname, setLastname] = useState("");
  const [getemail, setEmail] = useState("");
  const [getpassword, setPassword] = useState("");
  const [getsidebarOpen, setSidebarOpen] = useState(false);
  const [getaccountOpen, setAccountOpen] = useState(false);
  const [getcondation, SetCondation] = useState(false);
  const [getgender, setGender] = useState("");
  const [getmallmasterid, setmallmasterid] = useState("");

  const [getvat_no, setvat_no] = useState("");
  const [getearh_no, setearh_no] = useState("");
  const [getaddretailername, setAddRetailerName] = useState("");
  const [getaddretailernamemain, setAddRetailerNameMain] = useState("");
  const [getaddretailermainbrand, setAddRetailerMainBrand] = useState("");
  const [getaddretailernamemaingroup, setAddRetailerNameMainGroup] = useState("");
  const [getaddretailermainbrandGroup, setAddRetailerMainBrandGroup] = useState("");
  const [getBranddId, setBrandId] = useState("");

  const mallLoginModalOpen = () => {
    setIsOpen(false);
    setIsOpen3(true);
  };

  const [profile, setProfile] = useState("");
  const [isAcceptTerm, setIsAcceptTerm] = useState(0);
  const [isAcceptTerm2, setIsAcceptTerm2] = useState(0);

  const {
    setRegisterStore,
    retailer_data,
    getRetailerApi,
    cinema_mall_data,
    setRegisterCinema,
    getCinemaNameApi,
    register_store_loading,
  } = useStoreContext();

  const {
    get_brand_data,
    getBrand,
    get_brand_data_multiple,
    getBrandMultiple,
  } = useMallContext();
  const [getModal, setModal] = useState(false);
  const [brandModalIsOpen3, setbrandModalIsOpen3] = useState(false);
  const [registerModalIsOpenBrand, setRegisterModalIsOpenBrand] =
    useState(false);

  const [getregion, setRegion] = useState("");
  const [getcompanyregnumber, setCompanyRegNumber] = useState("");
  const [getMultipleBrand, setMultipleBrand] = useState([]);
  const [mallsOption, setMallsOption] = useState([]);
  const [getRetailerBrandId, setRetailerBrandId] = useState([]);

  // const [getvat_no, setvat_no] = useState("");

  // console.log("register_store_loading", register_store_loading);

  const getMutipleBrand = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    axios
      .get(get_brand_multiple, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success == 1) {
          setMultipleBrand(res.data.data);
        } else {
          null();
        }
      })
      .catch((err) => {
        console.log("error11", err);
      });
  };

  useEffect(() => {
    getMutipleBrand();
  }, []);

  const brandLoginModalOpen = () => {
    setModalIsOpenBrand(false);
    setIsOpen3(true);
  };

  function closeModalBrand() {
    setModalIsOpenBrand(false);
  }

  // const handleTermChange = (event) => {
  //   setIsAcceptTerm((current) => !current);
  // };

  const handleTermChange = (event) => {
    setIsAcceptTerm(1);
  };
  const handleTermChange2 = (e) => {
    setIsAcceptTerm2(1);
  };

  const handleTermChange3 = (e) => {
    setIsAcceptTerm2(1);
  };

  function closeModal3() {
    setIsOpen3(false);
  }
  function closeBrandModal() {
    setbrandModalIsOpen3(false);
  }

  useEffect(() => {
    // ("get brand data is", get_brand_data);
    // ("get retailer data is", retailer_data);
  }, []);

  // get mall master

  useEffect(() => {
    getMallMaster();
  }, []);

  const [getmallarray, SetMallArray] = useState([]);
  const [getmallarray2, SetMallArray2] = useState([]);
  const [getmallarrayregion, SetMallArrayRegion] = useState([]);
  const [modalIsOpenForgot, setIsOpenForgot] = useState(false);
  const [getUnregisterRetailer, setUnregisterRetailer] = useState([]);
  const [getDropDown, setDropDown] = useState(false);
  const [getDropDown2, setDropDown2] = useState(false);

  const [getforgotemail, setForgotEmail] = useState("");
  const [getmall, SetMall] = useState("");
  const [getmall2, SetMall2] = useState("");
  const [getMallModalData, setMallModalData] = useState("");

  // console.log("getDropDown",getDropDown);

  const getMallMaster = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    axios
      .get(get_mall, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success == 1) {
          SetMallArray(res.data.data);
        } else {
          null();
        }
      })
      .catch((err) => {
        console.log("error11", err);
      });
  };
  const unRegisterRetailer = async (id) => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    const formdata = await new FormData();
    await formdata.append("store_type", id);
    axios
      .post(unregisterd_retailer_new, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success == 1) {
          setUnregisterRetailer(res.data.data);
        } else {
          null();
        }
      })
      .catch((err) => {
        console.log("error11", err);
      });
  };

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
      maxHeight: "670px",
      paddingBottom: "10px",
    },
    overlay: {
      zIndex: 10000,
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  };
  const customStyles1 = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "1rem",
      backgroundColor: "none",
      border: "none",
      borderRadius: "0px",
      maxHeight: "670px",
    },
    overlay: {
      zIndex: 10000,
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  };

  function closeModal() {
    setIsOpen(false);
  }
  function closeModal22() {
    setModal(false);
    navigate("/");
  }
  // Brand Google signin

  const SigninCustomerGoogle = async (gmail, type, data) => {
    if (gmail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(gmail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else {
      var params = {
        role: 3,
        email: gmail,
        // password: "",
        type: type,
      };

      //
      const data = await setLogin(params);
      if (data) {
        if (data.success === 1) {
          setIsOpen3(false);
          navigate("/");
          setEmail("");
          window.location.reload(false);
        }
      }
    }
  };

  // Brand Facebook signin

  const SigninCustomerFacebook = async (fdata, type) => {
    var params = {
      role: 3,
      fb_id: fdata.id,
      first_name: fdata.first_name,
      last_name: fdata.last_name,
      type: type,
      name: fdata.name,
    };

    //
    const data = await setLogin(params);
    if (data) {
      if (data.success === 1) {
        setIsOpen3(false);
        navigate("/");
        setEmail("");
        window.location.reload(false);
      }
    }
  };
// console.log("retailertype",retailertype);
// console.log("getaddretailernamemain",getaddretailernamemain);
// console.log("getaddretailernamemaingroup",getaddretailernamemaingroup);
  // Signup Brand

  const SigninBrand = async (type) => {
    const errors = [];
    const minLength = 8;
    const hasNumber = /[0-9]/.test(getpassword);
    const hasUpperCase = /[A-Z]/.test(getpassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(getpassword);

    if (getgender === "") {
      alert("Select Retailer type......!");
      return;
    }
    // else if (getmallmasterid === "") {
    //   alert("Please Select Mall......!");
    //   return;
    // }
    else if ((retailertype === "" && getaddretailernamemain === "") && (getaddretailernamemaingroup === "")) {
      if (getgender == 1) {
        alert("Please Enter Retailer Name......!");
      } else if (getgender == 2) {
        alert("Please Enter Holding Company Name......!");
      } else {
        alert("Please Enter Retailer Name......!");
      }

      return;
    } else if (getgender === "") {
      alert("Select Retailer type......!");
      return;
    } else if (
      mallsOption.length === 0 &&
      getaddretailername === "" &&
      getgender == 2 && getaddretailermainbrandGroup === ""
    ) {
      alert(
        "Please select any Retailer/Brand Name or Add New Retailer/Brand Name"
      );
      return;
    } else if (getaddretailername === "" && getDropDown === true) {
      alert("Please Add New Retailer/Brand Name");
      return;
    } else if (getaddretailernamemain != "" && getaddretailermainbrand === "") {
      alert("Please Add New Brand Name");
      return;
    }
    // else if (getgender == 2 && mallsOption.length <= 0) {
    //   alert("Please Select any Brand otherwise select Independent Retailer");
    //   return;
    // }
    // else if (getmallname === "") {
    //   alert("Please Select Brand......!");
    //   return;
    // }
    // else if (getregion === "") {
    //   alert("Please Select Region......!");
    //   return;
    // }
    else if (getcompanyregnumber === "") {
      alert("Please Enter Company Registration Number......!");
      return;
    } else if (getvat_no === "") {
      alert("Please Enter VAT Number......!");
      return;
    } else if (getfirstname === "") {
      alert("Enter the First Name......!");
      return;
    } else if (getlastname === "") {
      alert("Enter the Last Name......!");
      return;
    } else if (getemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getemail) === false) {
      alert("Enter the valid Email....!");

      return;
    } else if (getpassword === "") {
      alert("Enter the password....!");
      return;
    } else if (
      getpassword.length < minLength ||
      !hasNumber ||
      !hasUpperCase ||
      !hasSpecialChar
    ) {
      alert(
        "Password must be at least 8 characters long.Password must contain at least one number,Password must contain at least one uppercase letter & Password must contain at least one special character"
      );
      return;
    } else if (files.length == 0) {
      alert("Please Upload Company Registration Document ....!");
      return;
    } else if (files2.length == 0) {
      alert("Please Upload VAT Registration Document ....!");
      return;
    } else {
      // var params = {
      //   mall_id: getmallmasterid,
      //   // mall_master_id: getmallmasterid,
      //   retailer_id: retailertype,
      //   store_type: getgender,
      //   brand: getmallname,
      //   first_name: getfirstname,
      //   last_name: getlastname,
      //   email: getemail,
      //   role: 3,
      //   password: getpassword,
      //   terms_condition: isAcceptTerm,
      //   company_reg_document: files[0],
      //   vat_document: files2[0],
      // };

      const formdata = await new FormData();
      // if(getregion === ""){
      if (getregion == "") {
        await formdata.append("mall_id", getmallmasterid);
      } else {
      }

      if (getmallmasterid == "") {
        await formdata.append("mall_id", getmall2);
      } else {
      }

      // }else{}

      if (getaddretailernamemain == "" && getaddretailernamemaingroup == "") {
        await formdata.append("retailer_id", retailertype); 
      } else { }
      await formdata.append("store_type", getgender);
      // await formdata.append("brand", getmallname);
      if (getgender == 2) {
        for (let i = 0; i < mallsOption.length; i++) {
          await formdata.append(`brand[${i}]`, mallsOption[i].value);
        }
      } else {
        if (getDropDown === false) {
          await formdata.append("brand", getBranddId);
        } else {
          await formdata.append("add_new_brand", getaddretailername);
        }
      }

      if (getDropDown === true && getaddretailername && getgender == 2) {
        await formdata.append("add_new_brand", getaddretailername);
      }
      if (getDropDown2 === true && getBranddId === "" && mallsOption2.length <= 0 && getgender == 1) {
        await formdata.append("retailer_name", getaddretailernamemain);

      }
      if (getDropDown2 === true && getaddretailermainbrand && mallsOption2.length <= 0 && getgender == 1) {
        await formdata.append("add_new_brand", getaddretailermainbrand);

      }

      if (getDropDown2 === true && getBranddId === "" && mallsOption2.length <= 0 && getgender == 2) {
        await formdata.append("retailer_name", getaddretailernamemaingroup);

      }
      if (getDropDown2 === true && getaddretailermainbrandGroup && mallsOption2.length <= 0 && getgender == 2) {
        await formdata.append("add_new_brand", getaddretailermainbrandGroup);

      }
      await formdata.append("company_reg_no", getcompanyregnumber);
      await formdata.append("vat_no", getvat_no);

      await formdata.append("role", 3);
      await formdata.append("email", getemail);
      await formdata.append("password", getpassword);
      await formdata.append("first_name", getfirstname);
      await formdata.append("last_name", getlastname);
      await formdata.append("terms_condition", isAcceptTerm);

      await formdata.append("company_reg_document", files[0]);
      await formdata.append("vat_document", files2[0]);

      const data = await setRegisterStore(formdata);
      if (data) {
        if (data.success === 1) {
          setIsOpen(false);
          setModalIsOpenBrand(false);
          setmallmasterid("");
          setRetailertype("");
          setGender("");
          setMallname("");
          setFirstname("");
          setLastname("");
          setEmail("");
          setPassword("");
          setIsAcceptTerm("");
          setModal(true);

          // window.location.reload(false);
        }
      }
    }
  };

  // Password validation for Brand / Retailer start

  // const SigninBrand = async (type) => {
  //   const passwordValidation = (password) => {
  //     const errors = [];
  //     const minLength = 8;
  //     const hasNumber = /[0-9]/.test(password);
  //     const hasUpperCase = /[A-Z]/.test(password);
  //     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  //     if (password.length < minLength) {
  //       errors.push("Password must be at least 8 characters long.");
  //     }
  //     if (!hasNumber) {
  //       errors.push("Password must contain at least one number.");
  //     }
  //     if (!hasUpperCase) {
  //       errors.push("Password must contain at least one uppercase letter.");
  //     }
  //     if (!hasSpecialChar) {
  //       errors.push("Password must contain at least one special character.");
  //     }
  //     return errors;
  //   };

  //   let errors = [];

  //   if (getgender === "") {
  //     errors.push("Select Retailer type.");
  //   }
  //   if (getmallmasterid === "") {
  //     errors.push("Please Select Mall.");
  //   }
  //   if (retailertype === "") {
  //     if (getgender == 1) {
  //       errors.push("Please enter Retailer Name.");
  //     } else if (getgender == 2) {
  //       errors.push("Please enter Holding Company Name.");
  //     } else {
  //       errors.push("Please enter Retailer Name.");
  //     }
  //   }
  //   if (getgender === "") {
  //     errors.push("Select Retailer type.");
  //   }
  //   if (getgender == 2 && mallsOption.length <= 0) {
  //     errors.push("Please Select any Brand otherwise select Independent Retailer.");
  //   }
  //   if (getcompanyregnumber === "") {
  //     errors.push("Please enter Company Registration Number.");
  //   }
  //   if (getvat_no === "") {
  //     errors.push("Please enter VAT Number.");
  //   }
  //   if (getfirstname === "") {
  //     errors.push("Enter the First Name.");
  //   }
  //   if (getlastname === "") {
  //     errors.push("Enter the Last Name.");
  //   }
  //   if (getemail === "") {
  //     errors.push("Enter the Email.");
  //   } else if (regEx.test(getemail) === false) {
  //     errors.push("Enter a valid Email.");
  //   }

  //   const passwordErrors = passwordValidation(getpassword);
  //   if (passwordErrors.length > 0) {
  //     errors.push(...passwordErrors);
  //   }

  //   if (files.length == 0) {
  //     errors.push("Please Upload Company Registration Document.");
  //   }
  //   if (files2.length == 0) {
  //     errors.push("Please Upload VAT Registration Document.");
  //   }

  //   if (errors.length > 0) {
  //     alert(errors.join("\n"));
  //     return;
  //   }

  //   const formdata = new FormData();
  //   if (getregion == "") {
  //     formdata.append("mall_id", getmallmasterid);
  //   }
  //   if (getmallmasterid == "") {
  //     formdata.append("mall_id", getmall2);
  //   }
  //   formdata.append("retailer_id", retailertype);
  //   formdata.append("store_type", getgender);

  //   for (let i = 0; i < getmallname.length; i++) {
  //     formdata.append(`brand[${i}]`, getmallname[i]);
  //   }
  //   formdata.append("company_reg_no", getcompanyregnumber);
  //   formdata.append("vat_no", getvat_no);
  //   formdata.append("role", 3);
  //   formdata.append("email", getemail);
  //   formdata.append("password", getpassword);
  //   formdata.append("first_name", getfirstname);
  //   formdata.append("last_name", getlastname);
  //   formdata.append("terms_condition", isAcceptTerm);
  //   formdata.append("company_reg_document", files[0]);
  //   formdata.append("vat_document", files2[0]);

  //   const data = await setRegisterStore(formdata);
  //   if (data) {
  //     if (data.success === 1) {
  //       setIsOpen(false);
  //       setModalIsOpenBrand(false);
  //       setmallmasterid("");
  //       setRetailertype("");
  //       setGender("");
  //       setMallname("");
  //       setFirstname("");
  //       setLastname("");
  //       setEmail("");
  //       setPassword("");
  //       setIsAcceptTerm("");
  //       setModal(true);
  //       // window.location.reload(false);
  //     }
  //   }
  // };

  // Password validation for Brand / Retailer end

  const handleOptionChange = (event) => {
    const value = event.target.value;
    console.log("value are", value);

    const [id, brand_id] = value.split("_");
    console.log("ID:", id); // Output: ID: 39
    console.log("Brand ID:", brand_id); // Output: Brand ID: 101
    setRetailertype(id);
    if (getgender == 2) {
      getBrandMultiple(id);
    } else {
      getBrand(id);
    }
    // setMallname(brand_id.split(","));
  };

  useEffect(() => {
    if (get_brand_data && get_brand_data.length > 0) {
      // setMallname(get_brand_data[0].id);
      setBrandId(get_brand_data[0].id);
    }
  }, [get_brand_data]);

  // console.log("brand id", getBranddId);

  const getMallModalApi = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    setLoading(true);
    const formdata = await new FormData();
    await formdata.append("id", 2);
    axios
      .post(dynamic_model_popup, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          // Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success === 1) {
          setLoading(false);
          setMallModalData(res.data.data);
          // Notification("success", "Success!", "Mall Registerated Successfully!");
        } else {
        }
      })
      .catch((err) => {
        console.log("err11", err);
        setLoading(false);
      });
  };

  // Brand Login

  const LoginBrand = async (e) => {
    if (getemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getemail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else if (getpassword === "") {
      alert("Enter the password....!");
    } else {
      var params = {
        role: 3,
        email: getemail,
        password: getpassword,
        type: "1",
      };

      const data = await setLogin(params);
      if (data) {
        if (data.success === 1) {
          // ("brand-data", data);
          setIsOpen3(false);
          setEmail("");
          setPassword("");
          // window.location.reload(true);
          navigate("/branddashboard");
        }
      }
    }
  };

  const onHandleForgotEmailChange = (e) => {
    let email = e.target.value;

    if (email === "" || regEx.test(email)) {
      setForgotEmail(email);
    } else {
      return;
    }
  };

  function closeModalFogot() {
    setIsOpenForgot(false);
  }

  const [getRetailerHomeData, setRetailerHomeData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRetailerHomeDataApi();
    getMallModalApi();
    // ("Get Home Data--->", getHomeData);
  }, []);

  const getRetailerHomeDataApi = async () => {
    setLoading(true);
    axios
      .get(get_brand_landing, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      })
      .then((res) => {
        if (res.data.success == 1) {
          setRetailerHomeData(res.data.data[0]);
          setLoading(false);
        } else {
          null();
        }
      })
      .catch((err) => {
        console.log("error11", err);
      });
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onLoginStart = () => {
    //
  };

  // Signup Cinema

  const SigninCinema = async (type) => {
    if (getgender === "") {
      alert("Select Retailer type......!");
      return;
    } else if (getfirstname === "") {
      alert("Enter the FirstName No......!");
      return;
    } else if (getlastname === "") {
      alert("Enter the LastName No......!");
      return;
    } else if (getemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getemail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else if (getpassword === "") {
      alert("Enter the password....!");
      return;
    } else {
      var params = {
        mall_id: getmallmasterid,
        // mall_master_id: getmallmasterid,
        retailer_id: retailertype,
        store_type: getgender,
        brand: getmallname,
        first_name: getfirstname,
        last_name: getlastname,
        email: getemail,
        // role: 3,
        password: getpassword,
        privacy_policy: isAcceptTerm,
        terms_condition: isAcceptTerm2,
      };

      //
      const data = await setRegisterCinema(params);
      if (data) {
        if (data.success === 1) {
          //
          setModalIsOpenBrand(false);
          setmallmasterid("");
          setRetailertype("");
          setGender("");
          setMallname("");
          setFirstname("");
          setLastname("");
          setEmail("");
          setPassword("");
          setIsAcceptTerm("");
          setIsAcceptTerm2("");
          setIsOpen3(false);
          // window.location.reload(false);
        }
      }
    }
  };

  const LoginCinema = async (e) => {
    if (getemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getemail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else if (getpassword === "") {
      alert("Enter the password....!");
    } else {
      var params = {
        role: 6,
        email: getemail,
        password: getpassword,
        type: "1",
      };

      //
      const data = await setLogin(params);
      if (data) {
        if (data.success === 1) {
          // ("cinema-data", data);
          setIsOpen3(false);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
          navigate("/CinemaDashboard");
        }
      }
    }
  };

  const LoginMall = async (e) => {
    if (getemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getemail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else if (getpassword === "") {
      alert("Enter the password....!");
    } else {
      var params = {
        role: 2,
        email: getemail,
        password: getpassword,
        type: "1",
      };

      //
      const data = await setLogin(params);
      if (data) {
        if (data.success === 1) {
          //           setIsOpen3(false);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
          navigate("/profile-page");
        }
      }
    }
  };

  const [position, setPosition] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);
  const onHandleEmailChange = (e) => {
    let email = e.target.value;

    if (email === "" || regEx.test(email)) {
      setEmail(email);
    } else {
      return;
    }
  };

  const LoginCustomer = async (e) => {
    if (getemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getemail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else if (getpassword === "") {
      alert("Enter the password....!");
    } else {
      var params = {
        role: 4,
        email: getemail,
        password: getpassword,
        type: "1",
      };

      //
      const data = await setLogin(params);
      if (data) {
        if (data.success === 1) {
          // ("customer-data", data);
          setIsOpen3(false);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
          navigate("/mallnearme");
        }
      }
    }
  };

  const SigninMall = async (type) => {
    if (getvat_no === "") {
      alert("Enter the VAT No......!");
      return;
    } else if (getearh_no === "") {
      alert("Enter the earh No......!");
      return;
    } else if (getfirstname === "") {
      alert("Enter the First Name....!");
      return;
    } else if (getlastname === "") {
      alert("Enter the Last        Name....!");
      return;
    } else if (getemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getemail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else if (getpassword === "") {
      alert("Enter the password....!");
      return;
    } else {
      var params = {
        mall_maser_id: getmall,
        vat_no: getvat_no,
        earh_no: getearh_no,
        role: 2,
        email: getemail,
        password: getpassword,
        first_name: getfirstname,
        last_name: getlastname,
        terms_condition: isAcceptTerm,
        lat: position.latitude,
        log: position.longitude,
      };

      //
      const data = await setMallRegister(params);
      if (data) {
        if (data.success === 1) {
          //
          setIsOpen(false);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
        }
      }
    }
  };

  const SigninCustomer = async (type) => {
    // if (getmallname === "") {
    //   alert("Enter the Mall Name......!");
    //   return;
    // }
    if (getfirstname === "") {
      alert("Enter the First Name....!");
      return;
    } else if (getlastname === "") {
      alert("Enter the First Name....!");
      return;
    } else if (getemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getemail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else if (getpassword === "") {
      alert("Enter the password....!");
      return;
    } else {
      var params = {
        role: 4,
        email: getemail,
        // region_id: getRegioncus,
        password: getpassword,
        name: getmallname,
        first_name: getfirstname,
        last_name: getlastname,
      };

      //
      const data = await RegisterCustomer(params);
      if (data) {
        if (data.success === 1) {
          //
          // setIsOpen(false);
          // setIsOpen3(true);
          setRegisterCustomerOpen(false);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
        }
      }
    }
  };

  // Upload Document
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const { getRootProps: getRootlogoProps, getInputProps: getInputlogoProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        {
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          );
        }
      },
    });

  const { getRootProps: getRootMapProps, getInputProps: getInputMapProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        {
          setFiles2(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          );
        }
      },
    });

  function closeModalRegisterNavbar() {
    setRegisterCustomerOpen(false);
  }

  const ForgotPassApi = async (e) => {
    if (getforgotemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getforgotemail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else {
      var params = {
        email: getforgotemail,
      };

      //
      const data = await forgotPassword(params);
      if (data) {
        if (data.success === 1) {
          //           setIsOpenForgot(false);
          setEmail("");
          // setPassword("");
          // window.location.reload(false);
          // navigate("/profile-page");
        }
      }
    }
  };
  return (
    <>
      {loading === true || register_store_loading === true || login_loading === true ? (
        <div
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="loader" style={{ zIndex: "1111" }}></div>
        </div>
      ) : (
        <>
          <Helmet>
            <title>Brand Home Page</title>
          </Helmet>
          {/* <Navbar
      // setCustomerDropdown={setCustomerDropdown}
      // getcustomerDropdown={getcustomerDropdown}
      /> */}
          <RetailerNavbar />

          <div>
            {/* <HomeHero img={images.after_login_img} /> */}
            <div
              className="about_hero_wrapp"
              style={{
                backgroundImage: `url(${getRetailerHomeData ? getRetailerHomeData.image_path : ""
                  })`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              {/* <img src={images.hero_banner} alt="" /> */}
              <div className="homehero_text_main">
                <div className="homehero_text_base homehero_text_base_retailer">
                  <img
                    src={
                      getRetailerHomeData
                        ? getRetailerHomeData.logo_img_path
                        : ""
                    }
                    alt=""
                  />
                  <p
                    style={{
                      fontSize: "32px",
                      fontWeight: "500",
                      color: "var(--color-orange)",
                    }}
                  >
                    for retailers
                  </p>
                  <button
                    className="btn btn-black"
                    style={{ width: "200px", fontSize: "14px" }}
                    // onClick={() => setModalIsOpenBrand(true)}>
                    onClick={() => {
                      //  SetsignButn(2), SetboldButn(2);
                      brandLoginModalOpen(true);
                      SetsignButn(2);
                      SetboldButn(2);
                    }}
                  >
                    Register your brand
                  </button>
                  {/* <button
                    className="btn btn-black"
                    style={{ width: "auto" }}
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    Test Modal
                  </button> */}
                  {/* <div className="apps_logos_wrapp">
                  <img src={images.play_store_logo} alt='play store logo' />
                  <img src={images.app_store_logo} alt='app store logo' />
                </div> */}
                </div>
              </div>
            </div>
            <RetailerWelcomeStore
              WcBtn={true}
              title={getRetailerHomeData}
              des={getRetailerHomeData}
            />
            <WhayJoinRetailer getRetailerHomeData={getRetailerHomeData} />

            {/* about in store register part-3 start*/}
            <div className="main_wrapp">
              <div className="container registermall_base_wrapp">
                <div className="registermall_sec1" style={{ color: "black" }}>
                  <h2 className="h2" style={{ fontWeight: "600" }}>
                    {getRetailerHomeData
                      ? getRetailerHomeData.details_title_1
                      : ""}
                  </h2>
                  <p style={{ fontSize: "14px" }}>
                    {getRetailerHomeData
                      ? getRetailerHomeData.details_description_1
                      : ""}
                  </p>
                  <button
                    className="btn btn-black"
                    style={{ width: "200px", fontSize: "14px" }}
                    // onClick={() => setModalIsOpenBrand(true)}>
                    onClick={() => {
                      //  SetsignButn(2), SetboldButn(2);
                      brandLoginModalOpen(true);
                      SetsignButn(2);
                      SetboldButn(2);
                    }}
                  >
                    Register your brand
                  </button>
                </div>

                <div className="registermall_sec2">
                  {/* <img src={images.retailer_home_last_card} alt="" /> */}
                  <img
                    src={
                      getRetailerHomeData
                        ? getRetailerHomeData.details_image_1_path
                        : ""
                    }
                    alt=""
                  />
                </div>
              </div>
            </div>
            {/* about in store register part-3 start*/}
          </div>
        </>
      )}

      {/* Brand register */}

      <ReactModal
        isOpen={modalIsOpenBrand}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModalBrand}
        style={customStyles}
      >
        <div className="home_model_4wrapp">
          <button className="signup_modal_close" onClick={closeModalBrand}>
            <span
              style={{ fontSize: "16px" }}
              className="brand-lable-radio-btn-txt"
            >
              Cancel
            </span>{" "}
            <AiOutlineClose color="red" />
          </button>
          <button className="f-b900 fs-22 mb_16 signup_headign">
            Register to In-store
          </button>
          <div className="radio-btn-flex sign_input_wrapp_padding_less">
            {/* <label className="course-form-txt course-form-margin-right">
              Mode Of Delivery:
            </label> */}
            <div className="radio-btn-inner-flex">
              <input
                type="radio"
                id="Online"
                name="gender"
                defaultValue={retailer_data.type}
                onChange={(e) => {
                  setGender(1);
                }}
              />
              <label className="brand-lable-radio-btn-txt" for="male">
                Independent Retailer
              </label>
            </div>

            <div className="radio-btn-inner-flex">
              <input
                type="radio"
                id="In-Person"
                name="gender"
                // value={2}
                // onChange={(e) => setMode(e.target.value)}
                value={getgender}
                onChange={(e) => setGender(2)}
              />
              <label className="brand-lable-radio-btn-txt" for="specifyColor">
                Group Retailer
              </label>
            </div>
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="mall">Retailer Name</label>
            <select
              className="leaderboard-card-inp"
              onChange={(e) => {
                setRetailertype(e.target.value);
                getBrand(e.target.value);
                // (e.target.value);
              }}
            >
              <option defaultValue value=""></option>
              {retailer_data &&
                retailer_data.map((item, index) => {
                  return (
                    <>
                      {/* <option selected disabled value="">
                      Auto-fill from database
                    </option> */}
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="mall">Mall Name</label>
            <select
              className="leaderboard-card-inp"
              onChange={(e) => {
                setmallmasterid(e.target.value);
                getRetailerApi(e.target.value);
                // (e.target.value);
              }}
            >
              {getmallarray &&
                getmallarray.map((item, index) => {
                  return (
                    <>
                      <option selected disabled value=""></option>
                      <option value={item.id} key={index}>
                        {item.name} {item.id} &nbsp;&nbsp;&nbsp;{" "}
                        {item.from_date} &nbsp;&nbsp;&nbsp; {item.to_date}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>

          {/* <div className="mm_form_single_input">
            <label htmlFor="">Brand Name</label>
            <select className="leaderboard-card-inp" onChange={(e) => {
              setStoreName(e.target.value);
              (e.target.value);
            }}>
              {get_brand_data && get_brand_data.map((item, index) => {
                return (
                  <>
                    <option selected disabled value="">
                      Auto-fill from database
                    </option>
                    <option key={item.id} value={item.id}>{item.name}</option>
                  </>
                )
              })}

            </select>
          </div> */}

          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="first-name">Brands (if applicable)</label>
            <select
              className="leaderboard-card-inp"
              onChange={(e) => {
                setMallname(e.target.value);
                // (e.target.value);
              }}
            >
              {get_brand_data &&
                get_brand_data.map((item, index) => {
                  return (
                    <>
                      {/* <option selected disabled value="">
                      Auto-fill from database
                    </option> */}
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="last-name">Account Manager First Name</label>
            <input
              type="text"
              value={getfirstname}
              onChange={(e) => setFirstname(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label>Account Manager Last Name</label>
            <input
              type="text"
              value={getlastname}
              onChange={(e) => setLastname(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="email">Account Manager Email Address</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name=""
              id=""
              value={getemail}
            />
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="password">Set a Password</label>
            <input
              type="password"
              value={getpassword}
              onChange={(e) => setPassword(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="signup_terms_wrapp mb_16">
            <input
              type="checkbox"
              value={isAcceptTerm}
              onChange={handleTermChange}
              checked={isAcceptTerm}
            />
            <p className="fs-des">
              I have read and agree to the{" "}
              <a className="signup_terms_link">Terms and Conditions</a> &{" "}
              <a className="signup_terms_link">Privacy Policy</a>
            </p>
          </div>
          <button
            className="btn btn-orange mb_16"
            disabled={isAcceptTerm ? false : true}
            onClick={() => SigninCustomer()}
          >
            Register
          </button>
          <p style={{ color: "black", fontWeight: "600", marginBottom: "5px" }}>
            OR
          </p>
          <p className="fs-des" style={{ paddingBottom: "20px" }}>
            If you are already registered, then{" "}
            <span
              onClick={() => brandLoginModalOpen()}
              className="signup_terms_link"
            >
              login here
            </span>
          </p>
        </div>
      </ReactModal>

      {/* Brand Login Modal Start */}
      <ReactModal
        isOpen={brandModalIsOpen3}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal3}
        onRequestClose={closeBrandModal}
        style={customStyles}
      >
        <div className="home_login_model_1sec_inner">
          {/* <button className="signup_modal_close" onClick={closeBrandModal}>
            <span
              style={{ fontSize: "16px" }}
              className="brand-lable-radio-btn-txt">
              Cancel
            </span>{" "}
            <GrClose />
          </button> */}
          <div className="f-b900 fs-22 mb_16 signup_headign">Welcome Back!</div>
          <div className="sign_input_wrapp">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name=""
              id=""
              value={getemail}
              className="signup_input"
              autoFocus="true"
            // style={{ background: "#DAD9D8", border: 'none' }}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={getpassword}
              onChange={(e) => setPassword(e.target.value)}
              name=""
              id=""
              className="signup_input"
            // style={{ background: "#DAD9D8", border: 'none' }}
            />
            <div className="signup_terms_wrapp">
              <input
                type="checkbox"
                value={isAcceptTerm}
                onChange={handleTermChange}
                checked={isAcceptTerm}
              />
              <p className="fs-des">
                I have read and agree to the{" "}
                <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                <a className="signup_terms_link">Privacy Policy</a>
              </p>
            </div>
            <button className="signup_model_forgate">
              Forgot your password?
            </button>
          </div>
          <button
            className="btn btn-orange mb_16"
            onClick={() => LoginBrand()}
            disabled={isAcceptTerm ? false : true}
          >
            Login
          </button>
          <p
            style={{
              alignSelf: "center",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            or
          </p>

          <div style={{ width: "100%" }}>
            {/* facebook button */}

            <LoginSocialFacebook
              appId="1377758369684897"
              fieldsProfile={
                "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
              }
              // version={3}
              onLoginStart={(e) => e}
              onLogoutSuccess={(e) => e}
              redirect_uri={Urls.base_url}
              onResolve={({ data }: IResolveParams) => {
                // setProfile(data);
                // (data);
                SigninCustomerFacebook(data, "3");
              }}
              onReject={(err) => {
              }}
            >
              <button
                className="mb_8 modal-social-btn "
                style={{
                  justifyContent: "center",
                  width: "100%",
                  color: "var(--color-gray)",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                <FaFacebookF
                  color="var(--color-gray)"
                  style={{
                    marginRight: "8px",
                    fontSize: "16px",
                    marginBottom: "-2px",
                  }}
                />
                Continue with Facebook
              </button>
            </LoginSocialFacebook>

            {/* google button */}

            <LoginSocialGoogle
              // client_id="775372553139-o2l7tmtgohlmu3q31o0ufsfne62g47tk.apps.googleusercontent.com"
              client_id="826718979042-bhij4jt5s6p85n55hbuhh0v40i4b3ng4.apps.googleusercontent.com"
              // onLoginStart={onLoginStart}
              redirect_uri={Urls.base_url}
              scope="openid profile email"
              discoveryDocs="claims_supported"
              access_type="offline"
              onResolve={({ data }: IResolveParams) => {
                setProfile(data);
                // ("gdata", data);
                // registerWithGoogle(data);
                // registerWithGoogle(data);
                SigninCustomerGoogle(data.email, "2", data);
              }}
              onReject={(err) => {
              }}
            >
              <button
                className="mb_8 modal-social-btn "
                style={{
                  justifyContent: "center",
                  width: "100%",
                  color: "var(--color-gray)",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                <ImGoogle
                  color="var(--color-gray)"
                  style={{
                    marginRight: "8px",
                    fontSize: "16px",
                    marginBottom: "-2px",
                  }}
                />
                Continue with Google
              </button>
              {/* <button onClick={() => {}} className="twitter-btn w-100">
              <i className="fab fa-google"></i> Google
            </button> */}
            </LoginSocialGoogle>
          </div>
          <button className="h6 mb_10 mt_10" style={{ alignSelf: "center" }}>
            Not Registered Yet?
          </button>
          <button
            onClick={() => {
              setIsOpen3(false);
              // setModalIsOpenBrand(true);
              setbrandModalIsOpen3(false);
              setRegisterModalIsOpenBrand(true);
            }}
            className="btn btn-blue"
          >
            Register Your Brand
          </button>
        </div>
      </ReactModal>
      {/* Brand Login Modal End */}

      {/* Brand Register Modal Start */}
      <ReactModal
        isOpen={registerModalIsOpenBrand}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModalBrand}
        style={customStyles}
      >
        <div className="home_model_4wrapp">
          <button
            className="signup_modal_close"
            //  onClick={closeModalBrand}>
            onClick={() => {
              setRegisterModalIsOpenBrand(false);
            }}
          >
            <span
              style={{ fontSize: "16px" }}
              className="brand-lable-radio-btn-txt"
            ></span>{" "}
            <GrClose />
          </button>
          <button className="f-b900 fs-22 mb_16 signup_headign">
            Register to In-store
          </button>
          <div className="radio-btn-flex sign_input_wrapp_padding_less">
            {/* <label className="course-form-txt course-form-margin-right">
              Mode Of Delivery:
            </label> */}
            <div className="radio-btn-inner-flex">
              <input
                type="radio"
                id="Online"
                name="gender"
                defaultValue={retailer_data.type}
                onChange={(e) => {
                  setGender(1);
                }}
              />
              <label className="brand-lable-radio-btn-txt" for="male">
                Independent Retailer
              </label>
            </div>

            <div className="radio-btn-inner-flex">
              <input
                type="radio"
                id="In-Person"
                name="gender"
                // value={2}
                // onChange={(e) => setMode(e.target.value)}
                value={getgender}
                onChange={(e) => setGender(2)}
              />
              <label className="brand-lable-radio-btn-txt" for="specifyColor">
                Group Retailer
              </label>
            </div>
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="mall">Mall Name</label>
            <select
              className="leaderboard-card-inp"
              onChange={(e) => {
                setmallmasterid(e.target.value);
                getRetailerApi(e.target.value);
                // (e.target.value);
              }}
            >
              {getmallarray &&
                getmallarray.map((item, index) => {
                  return (
                    <>
                      {/* <option selected disabled value=""></option> */}
                      <option value={item.id} key={index}>
                        {item.name} {item.id} &nbsp;&nbsp;&nbsp;{" "}
                        {item.from_date} &nbsp;&nbsp;&nbsp; {item.to_date}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="mall">Retailer Name</label>
            <select
              className="leaderboard-card-inp"
              onChange={(e) => {
                setRetailertype(e.target.value);
                // ("retailertype is", retailertype);
                getBrand(e.target.value);
                // (e.target.value);
              }}
            >
              <option defaultValue value=""></option>
              {retailer_data &&
                retailer_data.map((item, index) => {
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

          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="first-name">Brands (if applicable)</label>
            <select
              className="leaderboard-card-inp"
              onChange={(e) => {
                setMallname(e.target.value);
                // (e.target.value);
              }}
            >
              {get_brand_data &&
                get_brand_data.map((item, index) => {
                  return (
                    <>
                      {/* <option selected disabled value="">
                      Auto-fill from database
                    </option> */}
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="last-name">Account Manager First Name</label>
            <input
              type="text"
              value={getfirstname}
              onChange={(e) => setFirstname(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label>Account Manager Last Name</label>
            <input
              type="text"
              value={getlastname}
              onChange={(e) => setLastname(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="email">Account Manager Email Address</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name=""
              id=""
              value={getemail}
            />
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="password">Set a Password</label>
            <input
              type="password"
              value={getpassword}
              onChange={(e) => setPassword(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="signup_terms_wrapp mb_16">
            <input
              type="checkbox"
              value={isAcceptTerm}
              onChange={handleTermChange}
              checked={isAcceptTerm}
            />
            <p className="fs-des">
              I have read and agree to the{" "}
              <a className="signup_terms_link">Terms and Conditions</a> &{" "}
              <a className="signup_terms_link">Privacy Policy</a>
            </p>
          </div>
          <button
            className="btn btn-orange mb_16"
            disabled={isAcceptTerm ? false : true}
            onClick={() => SigninCustomer()}
          >
            Register Your Brand
          </button>
          <p style={{ color: "black", fontWeight: "600", marginBottom: "5px" }}>
            OR
          </p>
          <p className="fs-des" style={{ paddingBottom: "20px" }}>
            If you are already registered, then{" "}
            <span
              // onClick={() => brandLoginModalOpen()}
              onClick={() => {
                brandLoginModalOpen(true);
                setRegisterModalIsOpenBrand(false);
                // setbrandModalIsOpen3(true);
              }}
              className="signup_terms_link"
            >
              login here
            </span>
          </p>
        </div>
      </ReactModal>
      {/* Brand Register Modal End */}

      {/* Register Customer modal */}
      <ReactModal
        isOpen={getregisterCustomerOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModalRegisterNavbar}
        style={customStyles}
      >
        <div className="home_model_4wrapp">
          <button
            className="signup_modal_close"
            onClick={closeModalRegisterNavbar}
          >
            <GrClose />
          </button>
          <button className="f-b900 fs-22 mb_16 signup_headign">
            Hi, nice to meet you!
          </button>
          <div className="sign_input_wrapp">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              value={getfirstname}
              onChange={(e) => setFirstname(e.target.value)}
              name=""
              id=""
              autoFocus="true"
            />
          </div>
          <div className="sign_input_wrapp">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              value={getlastname}
              onChange={(e) => setLastname(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="sign_input_wrapp">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={(e) => onHandleEmailChange(e)}
              name=""
              id=""
            />
          </div>

          {/* <div className="sign_input_wrapp">
                        <label htmlFor="email">Region</label>
                        <select
                            className="leaderboard-card-inp"
                            onChange={(e) => {
                                setRegion(e.target.value);
                                (e.target.value);
                            }}
                        >
                            <option value="" selected disabled>
                                Select Region
                            </option>

                            {region_data &&
                                region_data.map((itm, ind) => {
                                    return (
                                        <option key={itm.id} value={itm.id}>
                                            {itm.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div> */}

          <div className="sign_input_wrapp">
            <label htmlFor="password">Set a password</label>
            <input
              type="password"
              value={getpassword}
              onChange={(e) => setPassword(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="signup_terms_wrapp mb_16">
            <input
              type="checkbox"
              value={isAcceptTerm}
              onChange={handleTermChange}
              checked={isAcceptTerm}
            />
            <p className="fs-des">
              I have read and agree to the{" "}
              <a className="signup_terms_link">Terms and Conditions</a> &{" "}
              <a className="signup_terms_link">Privacy Policy</a>
            </p>
          </div>
          <button
            className="btn btn-orange mb_16"
            disabled={isAcceptTerm ? false : true}
            onClick={() => SigninCustomer()}
          >
            Register
          </button>
          {/* <button
            className="btn btn-orange mb_16"
            disabled={isAcceptTerm === 1 ? false : true}
            onClick={() => {
              ("bsdjhfgsjfhjksdfg");
              SigninCustomer();
            }}
          >
            Register
          </button> */}

          <p
            style={{
              alignSelf: "center",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            or
          </p>

          <div style={{ width: "100%" }}>
            {/* facebook button */}

            <LoginSocialFacebook
              appId="1377758369684897"
              fieldsProfile={
                "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
              }
              // version={3}
              onLoginStart={(e) => e}
              onLogoutSuccess={(e) => e}
              redirect_uri={Urls.base_url}
              onResolve={({ data }: IResolveParams) => {
                // setProfile(data);
                // (data);
                SigninCustomerFacebook(data, "4");
              }}
              onReject={(err) => {
              }}
            >
              <button
                className="mb_8 modal-social-btn "
                style={{
                  justifyContent: "center",
                  width: "100%",
                  color: "var(--color-gray)",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                <FaFacebookF
                  color="var(--color-gray)"
                  style={{
                    marginRight: "8px",
                    fontSize: "16px",
                    marginBottom: "-2px",
                  }}
                />
                Continue with Facebook
              </button>
            </LoginSocialFacebook>

            {/* google button */}

            <LoginSocialGoogle
              // client_id="775372553139-o2l7tmtgohlmu3q31o0ufsfne62g47tk.apps.googleusercontent.com"
              client_id="826718979042-bhij4jt5s6p85n55hbuhh0v40i4b3ng4.apps.googleusercontent.com"
              onLoginStart={onLoginStart}
              redirect_uri={Urls.base_url}
              scope="openid profile email"
              discoveryDocs="claims_supported"
              access_type="offline"
              onResolve={({ data }: IResolveParams) => {
                setProfile(data);
                // registerWithGoogle(data);
                // registerWithGoogle(data);
                SigninCustomerGoogle(data.email, "4", data);
              }}
              onReject={(err) => {
              }}
            >
              <button
                className="mb_8 modal-social-btn "
                style={{
                  justifyContent: "center",
                  width: "100%",
                  color: "var(--color-gray)",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                <ImGoogle
                  color="var(--color-gray)"
                  style={{
                    marginRight: "8px",
                    fontSize: "16px",
                    marginBottom: "-2px",
                  }}
                />
                Continue with Google
              </button>
              {/* <button onClick={() => {}} className="twitter-btn w-100">
              <i className="fab fa-google"></i> Google
            </button> */}
            </LoginSocialGoogle>

            <p
              style={{
                marginTop: "10px",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Already have an account?
            </p>

            <button
              onClick={() => {
                setRegisterCustomerOpen(false);
                setIsOpen3(true);
              }}
              className="btn btn-blue"
              style={{ marginBottom: "20px" }}
            >
              Sign in
            </button>
          </div>
        </div>
      </ReactModal>
      {/* End Register Customer modal  */}

      {/* Login / Register modal start active */}

      {/* Register modal start */}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        style={customStyles}
      >
        <div className="model_sizing">
          <div style={{ backgroundColor: "var(--color-bg)" }}>
            <div style={{ height: "25px" }}>
              <button
                className="signup_modal_close"
                style={{ right: "7px", top: "9px" }}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <span style={{ fontSize: "16px" }}></span>
                <IoClose />
              </button>
            </div>
            <div className="tab_btn_main" style={{ height: "0px" }}>
              {signButn == 2 ? null : (
                <button
                  onClick={() => {
                    SetregButn(1);
                    SetboldButn(1);
                  }}
                  style={{
                    backgroundColor: regButn == 1 ? "white" : "#dad9d8",
                    fontWeight: boldButn == 1 ? "600" : "200",
                  }}
                  className="tab_btn_styling"
                >
                  Mall Login / Sign Up
                </button>
              )}

              {/* {signButn == 2 ? (
                <button
                  onClick={() => {
                    SetregButn(2);
                    SetboldButn(2);
                  }}
                  style={{
                    backgroundColor: regButn == 2 ? "white" : "#dad9d8",
                    fontWeight: boldButn == 2 ? "600" : "200",
                  }}
                  className="tab_btn_styling"
                >
                  Brand Login / Sign Up
                </button>
              ) : null} */}

              {signButn == 2 ? null : (
                <button
                  onClick={() => {
                    //  setCustLoginModalIsOpen3(true);
                    SetregButn(3);
                    SetboldButn(3);
                    // regButn(3);
                  }}
                  style={{
                    backgroundColor: regButn == 3 ? "white" : "#dad9d8",
                    fontWeight: boldButn == 3 ? "600" : "200",
                  }}
                  className="tab_btn_styling"
                >
                  Consumer Login / Sign Up
                </button>
              )}

              {signButn == 2 ? null : (
                <button
                  onClick={() => {
                    //  setCustLoginModalIsOpen3(true);
                    SetregButn(4);
                    SetboldButn(4);
                    // regButn(3);
                  }}
                  style={{
                    backgroundColor: regButn == 4 ? "white" : "#dad9d8",
                    fontWeight: boldButn == 4 ? "600" : "200",
                  }}
                  className="tab_btn_styling"
                >
                  Cinema Login / Sign Up
                </button>
              )}
            </div>
          </div>
          {regButn == 1 ? (
            <div className="home_model_4wrapp">
              {/* <button
                className="signup_modal_close"
                // onClick={closeModalRegisterNavbar}>
                onClick={() => {
                  setIsOpen(false);
                }}>
                <GrClose />
              </button> */}
              <h3 className="f-b900 fs-22 mb_16 signup_headign">
                Register Your Mall
              </h3>
              <div className="sign_input_wrapp">
                <label htmlFor="mall">Mall Name</label>
                <select
                  className="leaderboard-card-inp"
                  onChange={(e) => {
                    SetMall(e.target.value);
                  }}
                >
                  <option selected disabled value=""></option>
                  {getmallarray &&
                    getmallarray.map((item, index) => {
                      return (
                        <>
                          {/* <option selected disabled value=""></option> */}
                          <option value={item.id} key={index}>
                            {item.name} &nbsp;&nbsp;&nbsp; {item.from_date}{" "}
                            &nbsp;&nbsp;&nbsp; {item.to_date}
                          </option>
                        </>
                      );
                    })}
                </select>
                {/* <input
              type="text"
              value={getmallname}
              onChange={(e) => setMallname(e.target.value)}
              name=""
              id=""
            /> */}
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="mall">VAT Number</label>
                <input
                  type="text"
                  value={getvat_no}
                  onChange={(e) => setvat_no(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="mall">ERF Number</label>
                <input
                  type="text"
                  value={getearh_no}
                  onChange={(e) => setearh_no(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="first-name">First Name</label>
                <input
                  type="text"
                  value={getfirstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="last-name">Last Name</label>
                <input
                  type="text"
                  value={getlastname}
                  onChange={(e) => setLastname(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  onChange={(e) => onHandleEmailChange(e)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={getpassword}
                  onChange={(e) => setPassword(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="password">Latitude</label>
                <input
                  disabled
                  type=""
                  value={position.latitude}
                  // onChange={(e) => setPassword(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="password">Longitude</label>
                <input
                  disabled
                  type=""
                  value={position.longitude}
                  // onChange={(e) => setPassword(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="signup_terms_wrapp mb_16">
                <input
                  type="checkbox"
                  value={isAcceptTerm}
                  onChange={handleTermChange}
                  checked={isAcceptTerm === 1}
                />
                <p className="fs-des">
                  I have read and agree to the{" "}
                  <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                  <a className="signup_terms_link">Privacy Policy</a>
                </p>
              </div>
              <button
                className="btn btn-orange mb_16"
                disabled={isAcceptTerm === 1 ? false : true}
                onClick={() => SigninMall()}
              >
                Register
              </button>
              <p
                style={{
                  color: "black",
                  fontWeight: "600",
                  marginBottom: "5px",
                }}
              >
                OR
              </p>
              <p className="fs-des" style={{ paddingBottom: "20px" }}>
                If you are already registered, then{" "}
                <span
                  onClick={() => {
                    mallLoginModalOpen();
                    SetsignButn(1);
                  }}
                  // onClick={() => setModalIsOpen4(true)}
                  className="signup_terms_link"
                >
                  login here
                </span>
              </p>
            </div>
          ) : regButn == 2 ? (
            <div className="home_model_4wrapp">
              <button
                className="signup_modal_close"
                //  onClick={closeModalBrand}>
                onClick={() => {
                  setRegisterModalIsOpenBrand(false);
                }}
              >
                <span
                  style={{ fontSize: "16px" }}
                  className="brand-lable-radio-btn-txt"
                ></span>{" "}
                {/* <GrClose /> */}
              </button>
              <h3 className="f-b900 fs-22 mb_16 signup_headign">
                {/* Brand Registration to In-store for Retailers */}
                In-store for in mall Retailers registration
              </h3>

              <div
                style={{
                  gap: "1rem",
                  justifyContent: "space-between",
                }}
                className="radio-btn-flex sign_input_wrapp_padding_less"
              >
                {/* <label className="course-form-txt course-form-margin-right">
              Mode Of Delivery:
            </label> */}
                <div className="radio-btn-inner-flex">
                  <input
                    type="radio"
                    id="Online"
                    name="gender"
                    defaultValue={retailer_data.type}
                    onChange={(e) => {
                      setGender(1); unRegisterRetailer(1); setAddRetailerName(""); setMallsOption2("");
                    }}
                  />
                  <label className="brand-lable-radio-btn-txt" for="male">
                    Independent Retailer
                  </label>
                </div>

                <div className="radio-btn-inner-flex">
                  <input
                    type="radio"
                    id="In-Person"
                    name="gender"
                    // value={2}
                    // onChange={(e) => setMode(e.target.value)}
                    value={getgender}
                    onChange={(e) => { setGender(2); unRegisterRetailer(2); setAddRetailerName(""); setMallsOption2(""); }}
                  />
                  <label
                    className="brand-lable-radio-btn-txt"
                    for="specifyColor">
                    Group Retailer
                  </label>
                </div>
              </div>

              {/* <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="mall">
                  Select Mall Name<span className="star_require">*</span>
                </label>
                <div className="select-wrapper" style={{ width: "100%" }}>
                  <select
                    className="leaderboard-card-inp cons_select_nav"
                    onChange={(e) => {
                      setmallmasterid(e.target.value);
                      getRetailerApi(e.target.value);
                    }}>
                    <option value="" >
                      Select Mall Name
                    </option>
                    {getmallarray &&
                      getmallarray.map((item, index) => {
                        return (
                          <>
                            <option value={item.id} key={index}>
                              {item.name} &nbsp;&nbsp;&nbsp; {item.from_date}{" "}
                              &nbsp;&nbsp;&nbsp; {item.to_date}
                            </option>
                          </>
                        );
                      })}
                  </select>
                  <div
                    style={{
                      paddingTop: "0.5rem",
                      color: "gray",
                      fontSize: "14px",
                    }}>
                    Select all your malls in all your regions
                  </div>
                </div>
              </div> */}

              {/* <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                {getgender == 2 ? (
                  <>
                    <label htmlFor="mall">
                      Holding Company Name
                      <span className="star_require">*</span>
                    </label>
                  </>
                ) : (
                  <>
                    <label htmlFor="mall">
                      Holding Company Name
                      <span className="star_require">*</span>
                    </label>
                  </>
                )}

                <div className="select-wrapper" style={{ width: "100%" }}>
                  <select
                    className="leaderboard-card-inp cons_select_nav"
                    disabled={getgender ? false : true}
                    onChange={(e) => {
                      handleOptionChange(e);
                    }}
                  >
                    <option defaultValue value=""></option>
                    
                    {getUnregisterRetailer &&
                      getUnregisterRetailer.map((item, index) => {
                        return (
                          <>
                            <option
                              // value={`${item.id}_${item.brand_id}`}
                              value={item.id}
                              key={index}
                            >
                              {item.name}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div> */}

              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                {getgender == 2 ? <>
                  <label htmlFor="mall">
                    Holding Company Name<span className="star_require">*</span>
                  </label>
                </> : <>
                  <label htmlFor="mall">
                    Retailer Name<span className="star_require">*</span>
                  </label>
                </>}

                {/* <div className="select-wrapper" style={{ width: "100%" }}> */}
                {/* <select
                    className="leaderboard-card-inp cons_select_nav"
                    disabled={getgender ? false : true}
                    onChange={(e) => {
                      handleOptionChange(e);
                    }}>
                    <option defaultValue value=""></option>
                    {getUnregisterRetailer &&
                      getUnregisterRetailer.map((item, index) => {
                        return (
                          <>
                            <option
                              // value={`${item.id}_${item.brand_id}`}
                              value={item.id}
                              key={index}>
                              {item.name}
                            </option>
                          </>
                        );
                      })}
                  </select> */}

                <Select
                  value={mallsOption2}
                  style={{ width: "100%", padding: "0px", maxHeight: "35px !important" }}
                  className="leaderboard-card-inp brand_reg_multi2"
                  components={animatedComponents}
                  placeholder=""
                  options={getUnregisterRetailer.map((item) => ({
                    value: `${item.value}`,
                    label: item.label,
                  }))}
                  onChange={(selectedOptions) => {
                    if (getaddretailernamemain || getaddretailermainbrand || getaddretailernamemaingroup || getaddretailermainbrandGroup) {
                      // If getaddretailernamemain has a value, do not allow change
                      return;
                    } else {
                      setMallsOption2(selectedOptions);
                      console.log("selected option", selectedOptions);

                      if (selectedOptions) {
                        // Get the value of the first selected option
                        const selectedValue = selectedOptions.value;
                        console.log("sss", selectedValue);
                        // Destructure the ID and brand_id
                        const [id, brand_id] = selectedValue.split("_");

                        console.log("ID:", id);
                        console.log("Brand ID:", brand_id);

                        setRetailertype(id);

                        // Call the appropriate function based on gender
                        if (getgender === 2) {
                          getBrandMultiple(id);
                        } else {
                          getBrand(id);
                        }
                      }
                    }
                  }}
                // isDisabled={!getgender}
                />


                <div
                  style={{
                    // paddingTop: "0.5rem",
                    color: "gray",
                    fontSize: "12px",
                  }}
                >
                  If you don’t see your retailer listed above,
                  <span
                    onClick={() => {
                      setDropDown2(!getDropDown2);
                      if(getDropDown === true){
                            setDropDown(false);
                          }
                    }}
                    style={{ fontWeight: "700", cursor: "pointer" }}
                  >
                    click here
                  </span>{" "}
                  to add new.
                  {/* Dont see your mall listed? Add your mall below.  */}
                </div>

              </div>

              {getDropDown2 === true && getgender == 1 ? (
                <>
                  <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                    <label htmlFor="last-name">
                      Add New Retailer Name
                      {/* <span className="star_require">*</span> */}
                    </label>
                    {/* <input
                    type="text"
                    value={getaddretailername}
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/[ ,]/g, ''); // Remove commas and spaces
                      setAddRetailerName(newValue);
                    }}
                    name=""
                    id=""
                  /> */}

                    <input
                      type="text"
                      value={getaddretailernamemain}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/,/g, ""); // Remove only commas
                        setAddRetailerNameMain(newValue);
                        if (getaddretailernamemain) {
                          setMallsOption2([]);
                          setBrandId("");
                          setMallname("");
                        }
                      }}
                      name=""
                      id=""
                    />
                  </div>


                  <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                    <label htmlFor="last-name">
                      Add New Brand Name
                      {/* <span className="star_require">*</span> */}
                    </label>

                    <input
                      type="text"
                      value={getaddretailermainbrand}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/,/g, ""); // Remove only commas
                        setAddRetailerMainBrand(newValue);
                        if (getaddretailermainbrand) {
                          setMallsOption2([]);
                          setBrandId("");
                          setMallname("");
                        }
                      }}
                      name=""
                      id=""
                    />
                  </div>
                </>
              ) : (
                <>
                  {getDropDown2 === true && getgender == 2 ? (
                    <>
                      <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                        <label htmlFor="last-name">
                          Add New Holding Company Name
                          {/* <span className="star_require">*</span> */}
                        </label>
                        <input
                          type="text"
                          value={getaddretailernamemaingroup}
                          onChange={
                            (e) => {
                              setAddRetailerNameMainGroup(e.target.value)
                              if (getaddretailernamemaingroup) {
                                setMallsOption2([]);
                                setMallsOption([]);
                                setBrandId("");
                                setMallname("");
                              }
                            }}
                          name=""
                          id=""
                        />
                      </div>
                      <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                        <label htmlFor="last-name">
                          Add New Brand Name
                          {/* <span className="star_require">*</span> */}
                        </label>
                        <input
                          type="text"
                          value={getaddretailermainbrandGroup}
                          onChange={(e) => {
                            setAddRetailerMainBrandGroup(e.target.value);
                            if (getaddretailermainbrandGroup) {
                              setMallsOption2([]);
                              setMallsOption([]);
                              setBrandId("");
                              setMallname("");
                            }
                          }}

                          name=""
                          id=""
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}


              {getgender == 2 ? (
                <>
                  <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                    <label
                      htmlFor=""
                      className=""
                      style={{ minWidth: "148px" }}
                    >
                      Retailer/Brand Name<span className="star_require">*</span>
                    </label>

                    <Select
                      value={mallsOption}
                      style={{
                        width: "100%",
                        padding: "0px",
                        maxHeight: "35px !important",
                      }}
                      className="leaderboard-card-inp brand_reg_multi"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      placeholder=""
                      isMulti
                      options={get_brand_data_multiple}
                      onChange={(selectedOptions) => {
                        if (
                          getaddretailernamemain ||
                          getaddretailermainbrand ||
                          getaddretailernamemaingroup ||
                          getaddretailermainbrandGroup
                        ) {
                          return; // Prevents changes if any of these values are truthy
                        } else {
                          setMallsOption(selectedOptions);
                        }
                      }}
                    />

                    <div
                      style={{
                        // paddingTop: "0.5rem",
                        color: "gray",
                        fontSize: "12px",
                      }}
                    >
                      If you don’t see your brand listed above,
                      <span
                        onClick={() => {
                          setDropDown(!getDropDown);
                          if(getDropDown2 === true){
                            setDropDown2(false);
                          }
                        }}
                        style={{ fontWeight: "700", cursor: "pointer" }}
                      >
                        click here
                      </span>{" "}
                      to add new.
                      {/* Dont see your mall listed? Add your mall below.  */}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                    <label htmlFor="first-name">
                      Brand Name
                      <span className="star_require">*</span>
                    </label>
                    <div className="select-wrapper" style={{ width: "100%" }}>
                      <select
                        disabled={getaddretailername != "" || getaddretailernamemain != "" || getaddretailermainbrand != "" ? true : false}
                        className="leaderboard-card-inp cons_select_nav"
                        onChange={(e) => {
                          setMallname(e.target.value);
                          setBrandId(e.target.value);
                        }}
                      >
                        {get_brand_data &&
                          get_brand_data.map((item, index) => {
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
                    <div
                      style={{
                        // paddingTop: "0.5rem",
                        color: "gray",
                        fontSize: "12px",
                      }}
                    >
                      If you don’t see your brand listed above,
                      <span
                        onClick={() => {
                          setDropDown(!getDropDown);
                          if(getDropDown2 === true){
                            setDropDown2(false);
                          }
                        }}
                        style={{ fontWeight: "700", cursor: "pointer" }}
                      >
                        click here
                      </span>{" "}
                      to add new.
                      {/* Dont see your mall listed? Add your mall below.  */}
                    </div>
                  </div>
                </>
              )}

              {getDropDown === true && getgender == 1 ? (
                <>
                  <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                    <label htmlFor="last-name">
                      Add New Retailer/Brand Name
                      {/* <span className="star_require">*</span> */}
                    </label>
                    {/* <input
                    type="text"
                    value={getaddretailername}
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/[ ,]/g, ''); // Remove commas and spaces
                      setAddRetailerName(newValue);
                    }}
                    name=""
                    id=""
                  /> */}

                    <input
                      type="text"
                      value={getaddretailername}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/,/g, ""); // Remove only commas
                        setAddRetailerName(newValue);
                      }}
                      name=""
                      id=""
                    />
                  </div>
                </>
              ) : (
                <>
                  {getDropDown === true && getgender == 2 ? (
                    <>
                      <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                        <label htmlFor="last-name">
                          Add New Retailer/Brand Name
                          {/* <span className="star_require">*</span> */}
                        </label>
                        <input
                          type="text"
                          value={getaddretailername}
                          onChange={(e) => setAddRetailerName(e.target.value)}
                          name=""
                          id=""
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
              {/* Select Your Region* start */}
              {/* <div className="sign_input_wrapp">
                <label htmlFor="email">Select Your Region<span className="star_require">*</span></label>
                <div className="select-wrapper" style={{width:"100%"}}>

                <select
                               
                  className="leaderboard-card-inp"
                  onChange={(e) => {
                    setRegion(e.target.value);
                    regionMallApi(e.target.value);
                    (e.target.value);
                    
                  }}
                  disabled={getmallmasterid ? true : false}

                >
                  <option value="" >
                    Select Region
                  </option>

                  {region_data &&
                    region_data.map((itm, ind) => {
                      return (
                        <option key={itm.id} value={itm.id}>
                          {itm.name}
                        </option>
                      );
                    })}
                </select>
                <div
                    style={{
                      paddingTop: "0.5rem",
                      color: "gray",
                      fontSize: "14px",
                    }}>
Select all the regions where your stores are located
                  </div>
                </div>
              </div> */}
              {/* Select Your Region* end */}

              {/* Select Your Malls* start */}

              {/* 
              <div className="sign_input_wrapp">
                <label htmlFor="mall">Select Your Malls<span className="star_require">*</span></label>
                <div className="select-wrapper" style={{ width: "100%" }}>

                  <select
                    className="leaderboard-card-inp"
                    onChange={(e) => {
                      SetMall2(e.target.value);
                      setAddMallName("");
                      (e.target.value);
                    }} disabled={getmallmasterid ? true : false}>
                    <option selected value="">
                      select Mall{" "}
                    </option>
                    {getmallarrayregion &&
                      getmallarrayregion.map((item, index) => {
                        return (
                          <>

                            <option value={item.id} key={index}>
                              {item.name} &nbsp;&nbsp;&nbsp; {item.from_date}{" "}
                              &nbsp;&nbsp;&nbsp; {item.to_date}
                            </option>
                          </>
                        );
                      })}
                  </select>
                  <div
                    style={{
                      paddingTop: "0.5rem",
                      color: "gray",
                      fontSize: "14px",
                    }}>
                    Select all your malls in all your regions.
                  </div>

                </div>
              </div> */}

              {/* Select Your Malls* end */}

              {/* <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="last-name">Add Retailer Name<span className="star_require">*</span> </label>
                <input
                  type="text"
                  value={getaddretailername}
                  onChange={(e) => setAddRetailerName(e.target.value)}
                  name=""
                  id=""
                />
              </div> */}

              {/* <div className="sign_input_wrapp">
                <label htmlFor="email">Select Your Region<span className="star_require">*</span></label>
                <select
                  className="leaderboard-card-inp"
                  onChange={(e) => {
                    setRegion(e.target.value);
                    (e.target.value);
                  }}
                >
                  <option value="" selected disabled>
                    Select Region
                  </option>

                  {region_data &&
                    region_data.map((itm, ind) => {
                      return (
                        <option key={itm.id} value={itm.id}>
                          {itm.name}
                        </option>
                      );
                    })}
                </select>
              </div> */}

              <div className="sign_input_wrapp">
                <label htmlFor="mall">
                  Company Registration Number
                  <span className="star_require">*</span>
                </label>
                <input
                  type="text"
                  value={getcompanyregnumber}
                  onChange={(e) => setCompanyRegNumber(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="mall">
                  VAT Number<span className="star_require">*</span>
                </label>
                <input
                  type="text"
                  value={getvat_no}
                  onChange={(e) => setvat_no(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="last-name">
                  Account Manager First Name (Brand)
                  <span className="star_require">*</span>
                </label>
                <input
                  type="text"
                  value={getfirstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label>
                  Account Manager Last Name (Brand)
                  <span className="star_require">*</span>
                </label>
                <input
                  type="text"
                  value={getlastname}
                  onChange={(e) => setLastname(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="email">
                  Account Manager Email Address(Brand)
                  <span className="star_require">*</span>
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  name=""
                  id=""
                  value={getemail}
                />
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="password">
                  Set a Password<span className="star_require">*</span>
                </label>
                <input
                  type="password"
                  value={getpassword}
                  onChange={(e) => setPassword(e.target.value)}
                  name=""
                  id=""
                />
              </div>

              <div className="sign_input_wrapp">
                <label htmlFor="password">
                  Company Registration Document
                  <span className="star_require">*</span>
                </label>
                <button className="btn btn-gray" {...getRootlogoProps()}>
                  Upload
                  <input
                    {...getInputlogoProps()}
                    accept="image/jpeg, image/jpg, image/png, image/eps"
                  />
                </button>
              </div>

              <div className="sign_input_wrapp">
                <label htmlFor="password">
                  VAT Registration Document
                  <span className="star_require">*</span>
                </label>
                <button className="btn btn-gray" {...getRootMapProps()}>
                  Upload
                  <input
                    {...getInputMapProps()}
                    accept="image/jpeg, image/jpg, image/png, image/eps"
                  />
                </button>
              </div>

              <span
                style={{
                  fontSize: "14px",
                  color: "#bbb",
                  alignSelf: "flex-start",
                  marginBottom: "0.7rem",
                }}
              >
                *Required Fields including all document uploads.
              </span>

              <div className="signup_terms_wrapp">
                <input
                  type="checkbox"
                  value={isAcceptTerm}
                  onChange={handleTermChange}
                  checked={isAcceptTerm}
                />
                <p className="fs-des">
                  I have read and agree to the{" "}
                  {/* <a className="signup_terms_link">Terms and Conditions</a> &{" "} */}
                  <a className="signup_terms_link">Privacy Policy</a>
                </p>
              </div>
              <div className="signup_terms_wrapp mb_16">
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
              <button
                // className="btn btn-orange mb_16"
                className="btn btn-orange"
                disabled={
                  isAcceptTerm == 1 && isAcceptTerm2 == 1 ? false : true
                }
                onClick={() => SigninBrand()}
              >
                Register Your Brand
              </button>
              {/* <p
                style={{
                  color: "black",
                  fontWeight: "600",
                  marginBottom: "5px",
                }}>
                OR
              </p> */}
              {/* <p className="fs-des" style={{ paddingBottom: "20px" }}>
                If you are already registered, then{" "}
                <span
                  // onClick={() => brandLoginModalOpen()}
                  onClick={() => {
                    setIsOpen3(true);
                    setIsOpen(false);
                    SetsignButn(2);
                    // brandLoginModalOpen(true);
                    // setRegisterModalIsOpenBrand(false);
                    // SetsignButn(2);

                    // setbrandModalIsOpen3(true);
                  }}
                  className="signup_terms_link">
                  login here
                </span>
              </p>
         */}

              <p
                style={{
                  fontSize: "14px",
                  color: "#bbb",
                  alignSelf: "flex-start",
                  height: "30px",
                  paddingBottom: "25px",
                  paddingTop: "10px",
                }}
              >
                *Already registered?{" "}
                <span
                  // onClick={() => brandLoginModalOpen()}
                  onClick={() => {
                    setIsOpen3(true);
                    setIsOpen(false);
                    SetsignButn(2);
                    // brandLoginModalOpen(true);
                    // setRegisterModalIsOpenBrand(false);
                    // SetsignButn(2);

                    // setbrandModalIsOpen3(true);
                  }}
                  style={{
                    fontSize: "14px",
                    color: "#aaa",
                    alignSelf: "flex-start",
                    paddingBottom: "25px",
                    fontWeight: "600",
                  }}
                >
                  Click here
                </span>
              </p>
            </div>
          ) : regButn == 3 ? (
            <div className="home_model_4wrapp">
              <button
                className="signup_modal_close"
                onClick={closeModalRegisterNavbar}
              >
                {/* <GrClose /> */}
              </button>
              <button className="f-b900 fs-22 mb_16 signup_headign">
                Hi, nice to meet you!
              </button>
              <div className="sign_input_wrapp">
                <label htmlFor="first-name">First Name</label>
                <input
                  type="text"
                  value={getfirstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  name=""
                  id=""
                  autoFocus="true"
                />
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="last-name">Last Name</label>
                <input
                  type="text"
                  value={getlastname}
                  onChange={(e) => setLastname(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  onChange={(e) => onHandleEmailChange(e)}
                  name=""
                  id=""
                />
              </div>

              {/* <div className="sign_input_wrapp">
                        <label htmlFor="email">Region</label>
                        <select
                            className="leaderboard-card-inp"
                            onChange={(e) => {
                                setRegion(e.target.value);
                                (e.target.value);
                            }}
                        >
                            <option value="" selected disabled>
                                Select Region
                            </option>

                            {region_data &&
                                region_data.map((itm, ind) => {
                                    return (
                                        <option key={itm.id} value={itm.id}>
                                            {itm.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div> */}

              <div className="sign_input_wrapp">
                <label htmlFor="password">Set a password</label>
                <input
                  type="password"
                  value={getpassword}
                  onChange={(e) => setPassword(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="signup_terms_wrapp mb_16">
                <input
                  type="checkbox"
                  value={isAcceptTerm}
                  onChange={handleTermChange}
                  checked={isAcceptTerm}
                />
                <p className="fs-des">
                  I have read and agree to the{" "}
                  <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                  <a className="signup_terms_link">Privacy Policy</a>
                </p>
              </div>
              <button
                className="btn btn-orange mb_16"
                disabled={isAcceptTerm ? false : true}
                onClick={() => SigninCustomer()}
              >
                Register
              </button>
              {/* <button
            className="btn btn-orange mb_16"
            disabled={isAcceptTerm === 1 ? false : true}
            onClick={() => {
              ("bsdjhfgsjfhjksdfg");
              SigninCustomer();
            }}
          >
            Register
          </button> */}

              <p
                style={{
                  alignSelf: "center",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                or
              </p>

              <div style={{ width: "100%" }}>
                {/* facebook button */}

                <LoginSocialFacebook
                  appId="1377758369684897"
                  fieldsProfile={
                    "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                  }
                  // version={3}
                  onLoginStart={(e) => e}
                  onLogoutSuccess={(e) => e}
                  redirect_uri={Urls.base_url}
                  onResolve={({ data }: IResolveParams) => {
                    // setProfile(data);
                    // (data);
                    // SigninCustomerFacebook(data, "4");
                  }}
                  onReject={(err) => {
                  }}
                >
                  <button
                    className="mb_8 modal-social-btn "
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    <FaFacebookF
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Facebook
                  </button>
                </LoginSocialFacebook>

                {/* google button */}

                <LoginSocialGoogle
                  // client_id="775372553139-o2l7tmtgohlmu3q31o0ufsfne62g47tk.apps.googleusercontent.com"
                  client_id="826718979042-bhij4jt5s6p85n55hbuhh0v40i4b3ng4.apps.googleusercontent.com"
                  onLoginStart={onLoginStart}
                  redirect_uri={Urls.base_url}
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  onResolve={({ data }: IResolveParams) => {
                    setProfile(data);
                    // registerWithGoogle(data);
                    // registerWithGoogle(data);
                    // SigninCustomerGoogle(data.email, "4", data);
                  }}
                  onReject={(err) => {
                  }}
                >
                  <button
                    className="mb_8 modal-social-btn "
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    <ImGoogle
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Google
                  </button>
                  {/* <button onClick={() => {}} className="twitter-btn w-100">
              <i className="fab fa-google"></i> Google
            </button> */}
                </LoginSocialGoogle>

                <p
                  style={{
                    marginTop: "10px",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  Already have an account?
                </p>

                <button
                  onClick={() => {
                    // setRegisterCustomerOpen(false);
                    setIsOpen3(true);
                    setIsOpen(false);
                    SetsignButn(3);
                  }}
                  className="btn btn-blue"
                  style={{ marginBottom: "20px" }}
                >
                  Sign in
                </button>
              </div>
            </div>
          ) : regButn == 4 ? (
            <div className="home_model_4wrapp">
              <button className="f-b900 fs-22 mb_16 signup_headign">
                Cinema Registration to In-store{" "}
              </button>
              <div className="radio-btn-flex radiobtnflex_homenav sign_input_wrapp_padding_less">
                <div className="radio-btn-inner-flex">
                  <input
                    type="radio"
                    id="Online"
                    name="gender"
                    defaultValue={retailer_data.type}
                    onChange={(e) => {
                      setGender(1);
                    }}
                  />
                  <label className="brand-lable-radio-btn-txt" for="male">
                    Independent Retailer
                  </label>
                </div>

                <div className="radio-btn-inner-flex">
                  <input
                    type="radio"
                    id="In-Person"
                    name="gender"
                    // value={2}
                    // onChange={(e) => setMode(e.target.value)}
                    value={getgender}
                    onChange={(e) => setGender(2)}
                  />
                  <label
                    className="brand-lable-radio-btn-txt"
                    for="specifyColor"
                  >
                    Group Retailer
                  </label>
                </div>
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="mall">Mall Name</label>
                <select
                  className="leaderboard-card-inp"
                  onChange={(e) => {
                    setmallmasterid(e.target.value);
                    getCinemaNameApi(e.target.value);
                  }}
                >
                  {getmallarray2 &&
                    getmallarray2.map((item, index) => {
                      return (
                        <>
                          <option value={item.id} key={index}>
                            {item.name} {item.id} &nbsp;&nbsp;&nbsp;{" "}
                            {item.from_date} &nbsp;&nbsp;&nbsp; {item.to_date}
                          </option>
                        </>
                      );
                    })}
                </select>
              </div>

              {/* <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="mall">Cinema Name</label>
                <select
                  className="leaderboard-card-inp"
                  onChange={(e) => {
                    setmallmasterid(e.target.value);
                    getCinemaNameApi(e.target.value);
                    (e.target.value);
                  }}
                >
                  {getmallarray &&
                    getmallarray.map((item, index) => {
                      return (
                        <>
                          <option selected disabled value=""></option>
                          <option value={item.id} key={index}>
                            {item.name} {item.id} &nbsp;&nbsp;&nbsp;{" "}
                            {item.from_date} &nbsp;&nbsp;&nbsp; {item.to_date}
                          </option>
                        </>
                      );
                    })}
                </select>


              </div> */}
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="mall">Cinema Name</label>
                <select
                  className="leaderboard-card-inp"
                  onChange={(e) => {
                    setRetailertype(e.target.value);
                    getBrand(e.target.value);
                  }}
                >
                  <option defaultValue value=""></option>
                  {cinema_mall_data &&
                    cinema_mall_data.map((item, index) => {
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

              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="first-name">Brands (if applicable)</label>
                <select
                  className="leaderboard-card-inp"
                  onChange={(e) => {
                    setMallname(e.target.value);
                  }}
                >
                  {get_brand_data &&
                    get_brand_data.map((item, index) => {
                      return (
                        <>
                          {/* <option selected disabled value="">
                      Auto-fill from database
                    </option> */}
                          <option value={item.id} key={index}>
                            {item.name}
                          </option>
                        </>
                      );
                    })}
                </select>
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="last-name">Account Manager First Name</label>
                <input
                  type="text"
                  value={getfirstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label>Account Manager Last Name</label>
                <input
                  type="text"
                  value={getlastname}
                  onChange={(e) => setLastname(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="email">Account Manager Email Address</label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  name=""
                  id=""
                  value={getemail}
                />
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="password">Set a Password</label>
                <input
                  type="password"
                  value={getpassword}
                  onChange={(e) => setPassword(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="signup_terms_wrapp">
                <input
                  type="checkbox"
                  value={isAcceptTerm}
                  onChange={handleTermChange2}
                  checked={isAcceptTerm}
                />
                <p className="fs-des">
                  I have read and agree to the
                  <a className="signup_terms_link">Privacy Policy</a>
                </p>
              </div>
              <div className="signup_terms_wrapp mb_16">
                <input
                  type="checkbox"
                  value={isAcceptTerm2}
                  onChange={handleTermChange3}
                  checked={isAcceptTerm2}
                />
                <p className="fs-des">
                  I have read and agree to the
                  <a className="signup_terms_link">Terms and Conditions</a>
                </p>
              </div>
              <button
                className="btn btn-orange mb_16"
                disabled={isAcceptTerm ? false : true}
                onClick={() => SigninCinema()}
              >
                Register Your Cinema
              </button>
              <p
                style={{
                  color: "black",
                  fontWeight: "600",
                  marginBottom: "5px",
                }}
              >
                OR
              </p>
              <p className="fs-des" style={{ paddingBottom: "20px" }}>
                If you are already registered, then{" "}
                <span
                  onClick={() => {
                    // brandLoginModalOpen();
                    setIsOpen3(true);
                    setIsOpen(false);
                    SetsignButn(4);
                  }}
                  className="signup_terms_link"
                >
                  login here
                </span>
              </p>
            </div>
          ) : null}
        </div>
      </ReactModal>
      {/* Register modal end */}

      {/* Login modal start*/}
      <ReactModal
        isOpen={modalIsOpen3}
        onRequestClose={closeModal3}
        style={customStyles}
      >
        <div className="model_sizing">
          <div style={{ backgroundColor: "var(--color-bg)" }}>
            <div style={{ height: "25px" }}>
              <button
                className="signup_modal_close"
                style={{ right: "7px", top: "9px" }}
                onClick={closeModal3}
              >
                <span style={{ fontSize: "16px" }}></span>
                <IoClose />
              </button>
            </div>
            <div className="tab_btn_main" style={{ height: "0px" }}>
              {signButn == 2 ? null : (
                <button
                  onClick={() => {
                    SetsignButn(1);
                    SetboldButn(1);
                  }}
                  style={{
                    backgroundColor: signButn == 1 ? "white" : "#dad9d8",
                    fontWeight: boldButn == 1 ? "600" : "200",
                  }}
                  className="tab_btn_styling"
                >
                  Mall Login / Sign Up
                </button>
              )}

              {signButn == 2 ? (
                <button
                  onClick={() => {
                    SetsignButn(2);
                    SetboldButn(2);
                  }}
                  style={{
                    backgroundColor: signButn == 2 ? "white" : "#dad9d8",
                    fontWeight: boldButn == 2 ? "600" : "200",
                  }}
                  className="tab_btn_styling"
                >
                  Brand Login / Sign Up
                </button>
              ) : null}

              {signButn == 2 ? null : (
                <button
                  onClick={() => {
                    SetsignButn(3);
                    SetboldButn(3);
                  }}
                  style={{
                    backgroundColor: signButn == 3 ? "white" : "#dad9d8",
                    fontWeight: boldButn == 3 ? "600" : "200",
                  }}
                  className="tab_btn_styling"
                >
                  Consumer Login / Sign Up
                </button>
              )}

              {signButn == 2 ? null : (
                <button
                  onClick={() => {
                    SetsignButn(4);
                    SetboldButn(4);
                  }}
                  style={{
                    backgroundColor: signButn == 4 ? "white" : "#dad9d8",
                    fontWeight: boldButn == 4 ? "600" : "200",
                  }}
                  className="tab_btn_styling"
                >
                  Cinema Login / Sign Up
                </button>
              )}
            </div>
          </div>
          {signButn == 1 ? (
            <div
              className="home_login_model_1sec_inner"
              style={{ maxWidth: "none" }}
            >
              <div className="f-b900 fs-22 mb_16 signup_headign">
                Welcome Back!
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  onChange={(e) => onHandleEmailChange(e)}
                  name=""
                  id=""
                  className="signup_input"
                  autoFocus="true"
                />
                <label htmlFor="password">Password</label>
                <div
                  style={{
                    background: "#DAD9D8",
                    paddingTop: "0.4rem",
                    paddingBottom: "0.4rem",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="input_box-cus-pass"
                >
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={getpassword}
                    onChange={(e) => setPassword(e.target.value)}
                    name=""
                    id=""
                    className="signup_input"
                    style={{
                      background: "#DAD9D8",
                      border: "none",
                      width: "100%",
                    }}
                  />
                  {passwordVisible === true ? (
                    <AiOutlineEye size={22} onClick={togglePasswordVisibility}>
                      {passwordVisible ? "Hide" : "Show"}
                    </AiOutlineEye>
                  ) : (
                    <AiOutlineEyeInvisible
                      size={22}
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? "Hide" : "Show"}
                    </AiOutlineEyeInvisible>
                  )}
                </div>
                <div className="signup_terms_wrapp">
                  <input
                    type="checkbox"
                    value={isAcceptTerm}
                    onChange={handleTermChange}
                    checked={isAcceptTerm}
                  />
                  <p className="fs-des">
                    I have read and agree to the{" "}
                    <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                    <a className="signup_terms_link">Privacy Policy</a>
                  </p>
                </div>
                <button className="signup_model_forgate">
                  Forgot your password?
                </button>
              </div>
              <button
                className="btn btn-black mb_16"
                onClick={() => LoginMall()}
                disabled={isAcceptTerm ? false : true}
              >
                Login
              </button>
              <p
                style={{
                  alignSelf: "center",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                or
              </p>

              <div style={{ width: "100%" }}>
                <LoginSocialFacebook
                  appId="1377758369684897"
                  fieldsProfile={
                    "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                  }
                  onLoginStart={(e) => e}
                  onLogoutSuccess={(e) => e}
                  redirect_uri={Urls.base_url}
                  onResolve={({ data }: IResolveParams) => {
                    // (data);
                  }}
                  onReject={(err) => {
                  }}
                >
                  <button
                    className="mb_8 modal-social-btn "
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    <FaFacebookF
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Facebook
                  </button>
                </LoginSocialFacebook>

                <LoginSocialGoogle
                  client_id="826718979042-bhij4jt5s6p85n55hbuhh0v40i4b3ng4.apps.googleusercontent.com"
                  redirect_uri={Urls.base_url}
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  onResolve={({ data }: IResolveParams) => {
                    setProfile(data);
                  }}
                  onReject={(err) => {
                  }}
                >
                  <button
                    className="mb_8 modal-social-btn "
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    <ImGoogle
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Google
                  </button>
                </LoginSocialGoogle>

                <button
                  className="mb_8 modal-social-btn "
                  style={{
                    justifyContent: "center",
                    width: "100%",
                    color: "var(--color-gray)",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  <FaApple
                    color="var(--color-gray)"
                    style={{
                      marginRight: "8px",
                      fontSize: "18px",
                      marginBottom: "-2px",
                    }}
                  />
                  Continue with Apple
                </button>
              </div>
              <button
                className="h6 mb_10 mt_10"
                style={{ alignSelf: "center" }}
              >
                Not Registered Yet?
              </button>
              <h3
                onClick={() => {
                  setIsOpen3(false);
                  setIsOpen(true);
                  SetregButn(1);
                }}
                className="btn btn-orange"
              >
                Register Your Mall
              </h3>
            </div>
          ) : signButn == 2 ? (
            <div
              className="home_login_model_1sec_inner"
              style={{ maxWidth: "none" }}
            >
              <div className="f-b900 fs-22 mb_16 signup_headign">
                Welcome Back!
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  name=""
                  id=""
                  value={getemail}
                  className="signup_input"
                  autoFocus="true"
                />
                <label htmlFor="password">Password</label>
                <div
                  style={{
                    background: "#DAD9D8",
                    paddingTop: "0.4rem",
                    paddingBottom: "0.4rem",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="input_box-cus-pass"
                >
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={getpassword}
                    onChange={(e) => setPassword(e.target.value)}
                    name=""
                    id=""
                    className="signup_input"
                    style={{
                      background: "#DAD9D8",
                      border: "none",
                      width: "100%",
                    }}
                  />
                  {passwordVisible === true ? (
                    <AiOutlineEye size={22} onClick={togglePasswordVisibility}>
                      {passwordVisible ? "Hide" : "Show"}
                    </AiOutlineEye>
                  ) : (
                    <AiOutlineEyeInvisible
                      size={22}
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? "Hide" : "Show"}
                    </AiOutlineEyeInvisible>
                  )}
                </div>
                <div className="signup_terms_wrapp">
                  <input
                    type="checkbox"
                    value={isAcceptTerm}
                    onChange={handleTermChange}
                    checked={isAcceptTerm}
                  />
                  <p className="fs-des">
                    I have read and agree to the{" "}
                    <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                    <a className="signup_terms_link">Privacy Policy</a>
                  </p>
                </div>
                <button
                  className="signup_model_forgate"
                  onClick={() => {
                    setIsOpenForgot(true);
                  }}
                >
                  Forgot your password?
                </button>
              </div>
              <button
                className="btn btn-black mb_16"
                onClick={() => LoginBrand()}
                disabled={isAcceptTerm ? false : true}
              >
                Login
              </button>
              <p
                style={{
                  alignSelf: "center",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                or
              </p>

              <div style={{ width: "100%" }}>
                <LoginSocialFacebook
                  appId="1377758369684897"
                  fieldsProfile={
                    "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                  }
                  onLoginStart={(e) => e}
                  onLogoutSuccess={(e) => e}
                  redirect_uri={Urls.base_url}
                  onResolve={({ data }: IResolveParams) => {
                    // (data);
                  }}
                  onReject={(err) => {
                  }}
                >
                  <button
                    className="mb_8 modal-social-btn "
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    <FaFacebookF
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Facebook
                  </button>
                </LoginSocialFacebook>

                <LoginSocialGoogle
                  client_id="826718979042-bhij4jt5s6p85n55hbuhh0v40i4b3ng4.apps.googleusercontent.com"
                  redirect_uri={Urls.base_url}
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  onResolve={({ data }: IResolveParams) => {
                    setProfile(data);
                  }}
                  onReject={(err) => {
                  }}
                >
                  <button
                    className="mb_8 modal-social-btn "
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    <ImGoogle
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Google
                  </button>
                </LoginSocialGoogle>

                <button
                  className="mb_8 modal-social-btn "
                  style={{
                    justifyContent: "center",
                    width: "100%",
                    color: "var(--color-gray)",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  <FaApple
                    color="var(--color-gray)"
                    style={{
                      marginRight: "8px",
                      fontSize: "18px",
                      marginBottom: "-2px",
                    }}
                  />
                  Continue with Apple
                </button>
              </div>
              <button
                className="h6 mb_10 mt_10"
                style={{ alignSelf: "center" }}
              >
                Not Registered Yet?
              </button>
              <button
                onClick={() => {
                  setIsOpen3(false);
                  setIsOpen(true);
                  SetregButn(2);
                }}
                className="btn btn-orange"
              >
                Register Your Brand
              </button>
            </div>
          ) : signButn == 3 ? (
            <div
              className="home_login_model_1sec_inner"
              style={{ maxWidth: "none" }}
            >
              <div className="f-b900 fs-22 mb_16 signup_headign">
                Welcome Back!
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  onChange={(e) => onHandleEmailChange(e)}
                  name=""
                  id=""
                  className="signup_input"
                  autoFocus="true"
                />
                <label htmlFor="password">Password</label>
                <div
                  style={{
                    background: "#DAD9D8",
                    paddingTop: "0.4rem",
                    paddingBottom: "0.4rem",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="input_box-cus-pass"
                >
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={getpassword}
                    onChange={(e) => setPassword(e.target.value)}
                    name=""
                    id=""
                    className="signup_input"
                    style={{
                      background: "#DAD9D8",
                      border: "none",
                      width: "100%",
                    }}
                  />
                  {passwordVisible === true ? (
                    <AiOutlineEye size={22} onClick={togglePasswordVisibility}>
                      {passwordVisible ? "Hide" : "Show"}
                    </AiOutlineEye>
                  ) : (
                    <AiOutlineEyeInvisible
                      size={22}
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? "Hide" : "Show"}
                    </AiOutlineEyeInvisible>
                  )}
                </div>
                <div className="signup_terms_wrapp">
                  <input
                    type="checkbox"
                    value={isAcceptTerm}
                    onChange={handleTermChange}
                    checked={isAcceptTerm}
                  />
                  <p className="fs-des">
                    I have read and agree to the{" "}
                    <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                    <a className="signup_terms_link">Privacy Policy</a>
                  </p>
                </div>
                <button className="signup_model_forgate">
                  Forgot your password?
                </button>
              </div>
              <button
                className="btn btn-black mb_16"
                onClick={() => LoginCustomer()}
                disabled={isAcceptTerm ? false : true}
              >
                Login
              </button>
              <p
                style={{
                  alignSelf: "center",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                or
              </p>

              <div style={{ width: "100%" }}>
                <LoginSocialFacebook
                  appId="1377758369684897"
                  fieldsProfile={
                    "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                  }
                  onLoginStart={(e) => e}
                  onLogoutSuccess={(e) => e}
                  redirect_uri={Urls.base_url}
                  onResolve={({ data }: IResolveParams) => {
                    // (data);
                  }}
                  onReject={(err) => {
                  }}
                >
                  <button
                    className="mb_8 modal-social-btn "
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    <FaFacebookF
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Facebook
                  </button>
                </LoginSocialFacebook>

                <LoginSocialGoogle
                  client_id="826718979042-bhij4jt5s6p85n55hbuhh0v40i4b3ng4.apps.googleusercontent.com"
                  onLoginStart={onLoginStart}
                  redirect_uri={Urls.base_url}
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  onResolve={({ data }: IResolveParams) => {
                    setProfile(data);
                  }}
                  onReject={(err) => {
                  }}
                >
                  <button
                    className="mb_8 modal-social-btn "
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    <ImGoogle
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Google
                  </button>
                </LoginSocialGoogle>

                <button
                  className="mb_8 modal-social-btn "
                  style={{
                    justifyContent: "center",
                    width: "100%",
                    color: "var(--color-gray)",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  <FaApple
                    color="var(--color-gray)"
                    style={{
                      marginRight: "8px",
                      fontSize: "18px",
                      marginBottom: "-2px",
                    }}
                  />
                  Continue with Apple
                </button>
              </div>
              <button
                className="h6 mb_10 mt_10"
                style={{ alignSelf: "center" }}
              >
                Not Registered Yet?
              </button>
              <button
                onClick={() => {
                  setIsOpen3(false);
                  setIsOpen(true);
                  SetregButn(3);
                }}
                className="btn btn-orange"
              >
                Sign up
              </button>
            </div>
          ) : signButn == 4 ? (
            <div
              className="home_login_model_1sec_inner"
              style={{ maxWidth: "none" }}
            >
              <div className="f-b900 fs-22 mb_16 signup_headign">
                Welcome Back!
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  onChange={(e) => onHandleEmailChange(e)}
                  name=""
                  id=""
                  className="signup_input"
                  autoFocus="true"
                />
                <label htmlFor="password">Password</label>
                <div
                  style={{
                    background: "#DAD9D8",
                    paddingTop: "0.4rem",
                    paddingBottom: "0.4rem",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="input_box-cus-pass"
                >
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={getpassword}
                    onChange={(e) => setPassword(e.target.value)}
                    name=""
                    id=""
                    className="signup_input"
                    style={{
                      background: "#DAD9D8",
                      border: "none",
                      width: "100%",
                    }}
                  />
                  {passwordVisible === true ? (
                    <AiOutlineEye size={22} onClick={togglePasswordVisibility}>
                      {passwordVisible ? "Hide" : "Show"}
                    </AiOutlineEye>
                  ) : (
                    <AiOutlineEyeInvisible
                      size={22}
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? "Hide" : "Show"}
                    </AiOutlineEyeInvisible>
                  )}
                </div>
                <div className="signup_terms_wrapp">
                  <input
                    type="checkbox"
                    value={isAcceptTerm}
                    onChange={handleTermChange}
                    checked={isAcceptTerm}
                  />
                  <p className="fs-des">
                    I have read and agree to the{" "}
                    <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                    <a className="signup_terms_link">Privacy Policy</a>
                  </p>
                </div>
                <button className="signup_model_forgate">
                  Forgot your password?
                </button>
              </div>
              <button
                className="btn btn-black mb_16"
                onClick={() => LoginCinema()}
                disabled={isAcceptTerm ? false : true}
              >
                Login
              </button>
              <p
                style={{
                  alignSelf: "center",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                or
              </p>

              <div style={{ width: "100%" }}>
                <LoginSocialFacebook
                  appId="1377758369684897"
                  fieldsProfile={
                    "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                  }
                  onLoginStart={(e) => e}
                  onLogoutSuccess={(e) => e}
                  redirect_uri={Urls.base_url}
                  onResolve={({ data }: IResolveParams) => {
                    // (data);
                  }}
                  onReject={(err) => {
                  }}
                >
                  <button
                    className="mb_8 modal-social-btn "
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    <FaFacebookF
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Facebook
                  </button>
                </LoginSocialFacebook>

                <LoginSocialGoogle
                  client_id="826718979042-bhij4jt5s6p85n55hbuhh0v40i4b3ng4.apps.googleusercontent.com"
                  onLoginStart={onLoginStart}
                  redirect_uri={Urls.base_url}
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  onResolve={({ data }: IResolveParams) => {
                    setProfile(data);
                  }}
                  onReject={(err) => {
                  }}
                >
                  <button
                    className="mb_8 modal-social-btn "
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    <ImGoogle
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Google
                  </button>
                </LoginSocialGoogle>

                <button
                  className="mb_8 modal-social-btn "
                  style={{
                    justifyContent: "center",
                    width: "100%",
                    color: "var(--color-gray)",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  <FaApple
                    color="var(--color-gray)"
                    style={{
                      marginRight: "8px",
                      fontSize: "18px",
                      marginBottom: "-2px",
                    }}
                  />
                  Continue with Apple
                </button>
              </div>
              <button
                className="h6 mb_10 mt_10"
                style={{ alignSelf: "center" }}
              >
                Not Registered Yet?
              </button>
              <button
                onClick={() => {
                  setIsOpen3(false);
                  setIsOpen(true);
                  SetregButn(4);
                }}
                className="btn btn-orange"
              >
                Register your Cinema{" "}
              </button>
            </div>
          ) : null}
        </div>
      </ReactModal>
      {/* Login modal end */}

      <ReactModal
        isOpen={getModal}
        onRequestClose={closeModal22}
        style={customStyles1}
      >
        <div className="modal_thankyou">
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "1rem",
            }}
          >
            <RxCross2
              onClick={() => {
                closeModal22();
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              padding: "1rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: "700",
                maxWidth: "400px",
                textAlign: "center",
              }}
            >
              {/* <h2>Thank you for registering your Brand with In-store.</h2> */}
              <h2>{getMallModalData?.register_title}</h2>
            </div>
            <div style={{ maxWidth: "250px", textAlign: "center" }}>
              {/* <h2>Please allow up to 48 hours for registration approval...</h2> */}
              <h2>{getMallModalData?.register_description}</h2>
            </div>
            <div style={{ width: "100%" }}>
              <button
                className="btn btn-orange"
                onClick={() => {
                  closeModal22();
                }}
              >
                {/* Back to Home */}
                {getMallModalData?.register_button}
              </button>
            </div>
          </div>
        </div>
      </ReactModal>

      {/* Forgot password modal start */}

      <ReactModal
        isOpen={modalIsOpenForgot}
        onRequestClose={closeModalFogot}
        style={customStyles}
      >
        <div className="model_sizing">
          <div
            style={{
              // backgroundColor: "#dad9d8"
              backgroundColor: "var(--color-bg)",
            }}
          >
            <div style={{ height: "25px" }}>
              <button
                className="signup_modal_close"
                style={{ right: "7px", top: "9px" }}
                onClick={closeModalFogot}
              >
                <span style={{ fontSize: "16px" }}></span>
                <IoClose />
              </button>
            </div>
          </div>

          <div
            className="home_login_model_1sec_inner"
            style={{ maxWidth: "none" }}
          >
            <div className="f-b900 fs-22 mb_16 signup_headign">
              Forgot your password!
            </div>
            <div className="sign_input_wrapp" style={{ marginBottom: "2rem" }}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                onChange={(e) => onHandleForgotEmailChange(e)}
                name=""
                id=""
                className="signup_input"
                autoFocus="true"
              />

              {/* <div className="signup_terms_wrapp">
                  <input
                    type="checkbox"
                    value={isAcceptTerm}
                    onChange={handleTermChange}
                    checked={isAcceptTerm}
                  />
                  <p className="fs-des">
                    I have read and agree to the{" "}
                    <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                    <a className="signup_terms_link">Privacy Policy</a>
                  </p>
                </div> */}
            </div>
            <button
              className="btn btn-black mb_16"
              onClick={() => ForgotPassApi()}
            // disabled={isAcceptTerm ? false : true}
            >
              Submit
            </button>
          </div>
        </div>
      </ReactModal>
      {/* Forgot password modal end */}
    </>
  );
};

export default AfterLoginPage;
