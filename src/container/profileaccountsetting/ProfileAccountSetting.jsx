import React, { useEffect, useState } from "react";
import "./ProfileAccountSetting.css";
import { useDropzone } from "react-dropzone";
import {
  AiOutlineCloudUpload,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { async } from "@firebase/util";
import { useCustomerContext } from "../../context/customer_context";
import { useAuthContext } from "../../context/auth_context";
import Notification from "../../utils/Notification";
import { IoChevronBack } from "react-icons/io5";
import { HiOutlineSearch } from "react-icons/hi";
import axios from "axios";
import { ACCEPT_HEADER, get_category } from "../../utils/Constant";

const ProfileAccountSetting = ({ setTab,SetNavBarData,
  SetNavBarDataName,
  SetNavBarData1,
  respSearch,
  setResponSearch, }) => {
  const { setCustomerUpdate, get_customer_loading, get_customer_data, getCustomer } =
    useCustomerContext();

  // console.log("get_customer_data", get_customer_data);



  const { region_data } = useAuthContext();
  const [files, setFiles] = useState([]);
  const [fristname, SetFristName] = useState(
    get_customer_data.first_name ? get_customer_data.first_name : ""
  );
  const [lastname, SetLastName] = useState(
    get_customer_data.last_name ? get_customer_data.last_name : ""
  );
  const [regionid, SetRegionId] = useState(
    get_customer_data.region_id ? get_customer_data.region_id : ""
  );
  const [email, SetEmail] = useState(
    get_customer_data.email ? get_customer_data.email : ""
  );
  const [regionName, SetRegionName] = useState(
    get_customer_data?.regions?.name ? get_customer_data?.regions?.name : ""
  );
  const [number, SetNumber] = useState(
    get_customer_data.number ? get_customer_data.number : ""
  );
  const [password, SetPassword] = useState(
    get_customer_data.showpassword ? get_customer_data.showpassword : ""
  );
  const [password1, SetPassword1] = useState(
    get_customer_data.showpassword ? get_customer_data.showpassword : ""
  );
  // const [tram, SetTram] = useState(
  //   get_customer_data.terms_condition ? get_customer_data.terms_condition : ""
  // );
  // const [tram1, SetTram1] = useState(
  //   get_customer_data.privacy_policy ? get_customer_data.privacy_policy : ""
  // );
  const [tram, SetTram] = useState(0);
  const [tram1, SetTram1] = useState(0);
  const [image, SetImage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [getcondation, setcondation] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [getserach, setSerach] = useState("");

  const [catarray, SetArray] = useState([]);

  useEffect(()=>{
    getcat();

  },[])

  const getcat = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    axios
      .get(get_category, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // ("ggg", JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          SetArray(res.data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log("error11", err);
      });
  };


  const [filterClass, setFilterClass] = useState("hidden");
  const [isTransitionActive, setIsTransitionActive] = useState(false);

  useEffect(() => {
    if (respSearch) {
      setFilterClass("visible");
    } else {
      setFilterClass("hidden");
    }
  }, [respSearch]);


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };

  // logo dropzon

  const handleImage = (e) => {
    const file = e.target.files[0];

    SetImage(file);
  };

  const handleTermChange = (event) => {
    SetTram((current) => !current);
  };

  const handleTermChange2 = (event) => {
    SetTram1((current) => !current);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: async (acceptedFiles) => {

      const maxSizeKB = 40; // Maximum size limit in KB
      const maxSizeBytes = maxSizeKB * 1024; // Convert KB to bytes

      const filteredFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          const isSizeValid = file.size <= maxSizeBytes; // Limit size to 50KB (in bytes)
          const isImage = file.type.startsWith("image/"); // Check if it's an image file

          if (!isImage || !isSizeValid) {
            return null; // Skip files that are not images or exceed size limit
          }

          // Load image and wait for it to load
          const img = new Image();
          img.src = URL.createObjectURL(file);
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });

          // Check image dimensions
          const isDimensionsValid = img.width == 200 && img.height == 200;
          // if (isDimensionsValid) {
          //   setImageCheck(true);
          // } else {
          //   setImageCheck(false);
          // }
          return isDimensionsValid ? file : null; // Return file if dimensions are valid, otherwise skip it
        })
      );

      // Filter out null values (files that were skipped)
      const validFiles = filteredFiles.filter((file) => file !== null);
      {
        setFiles(
          validFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        if (validFiles.length !== acceptedFiles.length) {
          // if (validFiles.length !== acceptedFiles.length) {
          //   setImageCheck(false);
          // } else {
          //   setImageCheck(true);
          // }
          Notification(
            "error",
            "Error!",
            "Some files exceed the maximum size limit of 40KB or do not meet the dimension requirements of 200x200 pixels and will not be uploaded."
          );
        }
      }
      setcondation(true);
      if (acceptedFiles.length === 0) {
        window.location.reload(true);
      }
    },
  });

  const thumbs = files.map((file) => (
    <>
      <img
        src={file.preview}
        style={{ width: "100%", height: "100%", maxHeight: "175px" }}
        className="img-fluid"
        alt="file"
      />
    </>
  ));

  const UpdateProfile = async () => {
    const formdata = await new FormData();

    await formdata.append("first_name", fristname);
    await formdata.append("last_name", lastname);
    await formdata.append("region_id", Number(regionid));
    await formdata.append("email", email);
    await formdata.append("password", password);


    await formdata.append("terms_condition", tram === true ? 1 : 0);
    await formdata.append("privacy_policy", tram1 === true ? 1 : 0);
    if (files.length > 0) {
      await formdata.append("cus_profile", files[0]);
    } else {
      null;
    }
    // ("formdata", formdata);

    const data = await setCustomerUpdate(formdata);
    if (data) {
      if (data.success === 1) {
        // ("mall-data", data);
        Notification("success", "Success!", "Update Successfully!");
        getCustomer();
      } else {
        // ("velidation");
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;

      // Show the button when the user scrolls down (e.g., more than 100px)
      if (scrollTop > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>

<div
              className={`resp_cust_search_filter_main ${respSearch ? "open" : ""
                } ${isTransitionActive ? "transition-active" : ""} `}
            >
              <div className="cus-nav-filter-flex">
                <div
                  className="mm_form_single_input mm_form_single_input2"
                  style={{ gap: "7px" }}
                >
                  <label
                    className="leaderboard-card-lbl"
                    style={{ minWidth: "68px", fontWeight: "300" }}
                  >
                    Filter by:
                  </label>
                  <div
                    className="select-wrapper"
                    style={{ width: "100%", marginRight: "1.1rem" }}
                  >
                    <select
                      className="leaderboard-card-inp cons_select_nav"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        SetNavBarData(e.target.value.slice(0, 2));
                        SetNavBarDataName(e.target.value.slice(2));

                        setTab(35);
                      }}
                    >
                      <option selected disabled value="">
                        Select category
                      </option>
                      {catarray &&
                        catarray.map((item, index) => {
                          return (
                            <>
                              <option
                                value={`${item.id} ${item.name}`}
                                key={index}
                              >
                                {item.name}
                              </option>
                            </>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <div
                className="mm_form_single_input mm_form_single_input2"
                style={{ gap: "7px", width: "100%" }}
              >
                <label
                  className="leaderboard-card-lbl"
                  style={{ minWidth: "68px", fontWeight: "300" }}
                >
                  Search
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "center",
                    position: "relative",
                    width: "100%",
                    // paddingLeft: "4.4rem"
                  }}
                >
                  <input
                    type="text"
                    className="cus-nav-search cus-nav-search2 leaderboard-card-inp"
                    style={{ paddingRight: "30px" }}
                    placeholder="Search Name & Tag"
                    onChange={(e) => {
                      setSerach(e.target.value);
                    }}
                  />
                  <HiOutlineSearch
                    onClick={() => {
                      SetNavBarData1(getserach);
                      setTab(35);
                    }}
                    color="var(--color-black)"
                    size={15}
                    style={{ position: "absolute", right: "30px" }}
                  />
                </div>
              </div>
            </div>
    <div className="mm_main_wrapp cus-acc-setting mm_main_wrapp_22">

      {get_customer_loading === true ? (
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
      ) : null}

   
      {/* mall management name start */}
      <div className='edit-brand-back-iconbox' style={{ width: "80px" }} onClick={() => setTab(2)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

      <div className="mall_name_wrapp cus_acc_mall_name_wrapp">
        <h4
          className="h3 cust-profile-heading"
          style={{ fontWeight: "700", marginBottom: "20px" }}
        >
          Account Settings
        </h4>
        {/* <span>Account Settings</span> */}
      </div>
      {/* <div className="mm_horizontal_line"></div> */}
      {/* mall management name end */}

      <div className="cus-profile-acc-setting-form-flex">
        {/* mall management form start */}
        <div className="mm_form_wrapp-customer-acc-setting">
          {/* text-input wrapp start */}
          <div className="mm_form_input_wrapp-customer-acc-setting">
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="" style={{ minWidth: "150px" }}>
                First name
              </label>
              <input
                type="text"
                value={fristname}
                placeholder="Enter Your First Name"
                onChange={(e) => SetFristName(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>
            {/* single text-input */}

            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="" style={{ minWidth: "150px" }}>
                Last name
              </label>
              <input
                type="text"
                value={lastname}
                placeholder="Enter Your Last Name"
                onChange={(e) => SetLastName(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label
                className="leaderboard-card-lbl"
                style={{ minWidth: "150px" }}
              >
                Region
              </label>
              <div className="select-wrapper" style={{ width: "100%" }}>
                <select style={{ width: "100%" }}
                  className="leaderboard-card-inp"
                  onChange={(e) => SetRegionId(e.target.value)}
                >
                  <option selected disabled value="">
                    {regionName}
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

            <div className="mm_form_single_input">
              <label htmlFor="" style={{ minWidth: "150px" }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                placeholder="Enter Your Email address"
                onChange={(e) => SetEmail(e.target.value)}
                name=""
                id=""
                style={{ minWidth: "150px" }}
                className="input_box"
              />
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="" style={{ minWidth: "150px" }}>
                Contact number
              </label>
              <input
                type="number"
                placeholder="Enter Mobile Number"
                value={number}
                onChange={(e) => SetNumber(e.target.value)}
                name=""
                id=""
                className="input_box"
                style={{ minWidth: "150px" }}
              />
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="" style={{ minWidth: "150px" }}>
                Password
              </label>
              <div
                style={{
                  background: "#dadada",
                  display: "flex",
                  alignItems: "center",
                }}
                className="input_box-cus-pass"
              >
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  placeholder="Enter Your Password"
                  onChange={(e) => SetPassword(e.target.value)}
                  name=""
                  id=""
                  className="input_box"
                ></input>
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
            </div>

            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="" style={{ minWidth: "150px" }}>
                Confirm Password
              </label>
              <div
                style={{
                  background: "#dadada",
                  display: "flex",
                  alignItems: "center",
                }}
                className="input_box-cus-pass"
              >
                <input
                  type={passwordVisible2 ? "text" : "password"}
                  value={password}
                  placeholder="Enter Your Password"
                  onChange={(e) => SetPassword(e.target.value)}
                  name=""
                  id=""
                  className="input_box"
                  style={{
                    minWidth: "150px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                ></input>
                {passwordVisible2 === true ? (
                  <AiOutlineEye size={22} onClick={togglePasswordVisibility2}>
                    {passwordVisible2 ? "Hide" : "Show"}
                  </AiOutlineEye>
                ) : (
                  <AiOutlineEyeInvisible
                    size={22}
                    onClick={togglePasswordVisibility2}
                  >
                    {passwordVisible2 ? "Hide" : "Show"}
                  </AiOutlineEyeInvisible>
                )}
              </div>
            </div>

            <div className="cust-profile-acc-setting-last-part-flex">
              {/* mm terms condition wrapp */}
              <div className="mm_form_single_input">
                <label htmlFor="" style={{ minWidth: "150px" }}></label>
                <div>
                  <div className="signup_terms_wrapp" style={{ marginTop: "0rem" }}>
                    {/* <input
                  type="checkbox"
                  value={tram}
                  onChange={(e) => SetTram(e.target.value)}
                /> */}
                    <input type="checkbox"
                      value={tram}
                      onChange={handleTermChange}
                      checked={tram == 1}
                    />
                    <p className="fs-des">
                      I have read and agree to the{" "}
                      <a className="signup_terms_link">Terms and Conditions</a>{" "}
                    </p>
                  </div>

                  <div className="signup_terms_wrapp">
                    {/* <input
                  type="checkbox"
                  value={tram1}
                  onChange={(e) => SetTram1(e.target.value)}
                /> */}
                    <input type="checkbox"
                      value={tram1}
                      onChange={handleTermChange2}
                      checked={tram1 == 1}
                    />
                    <p className="fs-des">
                      I have read and agree to the{" "}
                      <a className="signup_terms_link">Privacy Policy</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* upload button */}
              <div className="mm_form_single_input">
                <label htmlFor="" style={{ minWidth: "150px" }}></label>
                <div className="mall_upload_btn_wrapp mall_upload_btn_wrapp-customer-acc-setting mall_upload_btn_wrapp_res">
                  <button
                    disabled={tram == 1 && tram1 == 1 ? false : true}

                    className="btn btn-orange btn-pro-acc-cus"
                    onClick={() => UpdateProfile()}
                  >
                    Update
                  </button>
                  <button className="btn btn-black btn-pro-acc-cus">Reset</button>
                </div>
              </div>
            </div>
          </div>
          {/* text-input wrapp end */}

          {/* upload images wrapp start */}
          {/* <div className="profile-setting_img_upload_wrapp">
            <div className="img-upl-border">
              <div
                className="myprofile_inner_sec2"
                {...getRootProps()}
                style={{ border: "none", paddingBottom: "0px" }}
              >
               
                <h4 style={{ marginBottom: "10px",fontWeight:"600" }}>
                  Upload profile picture <br/>(200 x 200 pixels)
                </h4>
                {getcondation === true ? (
                  <>
                    {files && files.length > 0 ? (
                      <div className="myprofile_inner_sec2_img_upload">
                        {thumbs}
                      </div>
                    ) : (
                      <div style={{ width: "100%" }}>
                        <div className="myprofile_inner_sec2_img_upload">
                          <AiOutlineCloudUpload
                            style={{
                              width: "60px",
                              height: "60px",
                              color: "var(--color-orange)",
                              marginBottom: "10px",
                            }}
                          />
                          <h4>.JPG .PNG</h4>
                          <p>You can also upload file by</p>
                          
                          <button
                            type="button"
                            className="click_upload_btn"
                            style={{ marginBottom: "10px" }}
                          >
                            click here
                          </button>
                        </div>
                        <div className="btnn-main">
                          <button
                            className="btn btn-orange mb_8"
                            type="button"
                            onClick={() => {
                              // setFiles([]);
                            }}
                          >
                            Upload File
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {get_customer_data.cus_profile_path === null ? (
                      <>
                        <div style={{ width: "100%" }} {...getRootProps()}>
                          <div className="myprofile_inner_sec2_img_upload">
                            <AiOutlineCloudUpload
                              style={{
                                width: "60px",
                                height: "60px",
                                color: "var(--color-orange)",
                                marginBottom: "10px",
                              }}
                            />
                            <h4>.JPG .PNG</h4>
                            <p>You can also upload file by</p>
                           
                            <button
                              type="button"
                              className="click_upload_btn"
                              style={{ marginBottom: "10px" }}
                            >
                              click here
                            </button>
                          </div>
                          <div className="btnn-main">
                            <button
                              className="btn btn-orange mb_8"
                              type="button"
                              onClick={() => {
                              }}
                            >
                              Upload File
                            </button>
                          </div>
                        </div>
                        {files.length > 0 ? <>
                        <button style={{marginBottom:"10px"}}
                          className="btn btn-black"
                          onClick={() => setFiles([])}
                        >
                          Cancel
                        </button>
                        </>: <></>}
                      </>
                    ) : (
                      <>
                        <div className="myprofile_inner_sec2_img_upload">
                          <img
                            src={get_customer_data.cus_profile_path}
                            style={{ width: "100%", height: "100%" }}
                            className="img-fluidb"
                          />
                        </div>
                        <div className="btnn-main" style={{ width: "100%" }}>
                          <button 
                            className="btn btn-orange mb_8"
                            type="button"
                            onClick={() => {
                            }}
                          >
                            Upload File
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
             
                <div
                style={{
                  display: "flex",
                  alingitem: "center",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                }}
              >
                <button
                  className="btn btn-black"
                  onClick={() => setFiles([])}
                  style={{
                    marginBottom: "10px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  Cancel
                </button>
              </div>
             
              
            </div>
          </div> */}

          <div className="profile-setting_img_upload_wrapp">
            {/* single upload image */}
            <div className="img-upl-border">
              <div
                className="myprofile_inner_sec2"
                {...getRootProps()}
                style={{ border: "none", paddingBottom: "0px" }}
              >
                {/* Hidden input for file selection */}
                <input {...getInputProps()} accept="image/*" style={{ display: 'none' }} />

                <h4 style={{ marginBottom: "10px", fontWeight: "600" }}>
                  Upload profile picture <br />(200 x 200 pixels)
                </h4>

                {getcondation === true ? (
                  <>
                    {files && files.length > 0 ? (
                      <div className="myprofile_inner_sec2_img_upload">
                        {thumbs}
                      </div>
                    ) : (
                      <div style={{ width: "100%" }}>
                        <div className="myprofile_inner_sec2_img_upload">
                          <AiOutlineCloudUpload
                            style={{
                              width: "60px",
                              height: "60px",
                              color: "var(--color-orange)",
                              marginBottom: "10px",
                            }}
                          />
                          <h4>.JPG .PNG</h4>
                          <p>You can also upload file by</p>
                          <button
                            type="button"
                            className="click_upload_btn"
                            style={{ marginBottom: "10px" }}
                          // onClick={() => document.querySelector('input[type="file"]').click()} // Trigger input click
                          >
                            Click here
                          </button>
                        </div>
                        <div className="btnn-main">
                          <button
                            className="btn btn-orange mb_8"
                            type="button"
                            onClick={() => {
                              // setFiles([]); 
                            }}
                          >
                            Upload File
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {get_customer_data.cus_profile_path === null ? (
                      <>
                        <div style={{ width: "100%" }} {...getRootProps()}>
                          <div className="myprofile_inner_sec2_img_upload">
                            <AiOutlineCloudUpload
                              style={{
                                width: "60px",
                                height: "60px",
                                color: "var(--color-orange)",
                                marginBottom: "10px",
                              }}
                            />
                            <h4>.JPG .PNG</h4>
                            <p>You can also upload file by</p>
                            <button
                              type="button"
                              className="click_upload_btn"
                              style={{ marginBottom: "10px" }}
                            // onClick={() => document.querySelector('input[type="file"]').click()} // Trigger input click
                            >
                              Click here
                            </button>
                          </div>
                          <div className="btnn-main">
                            <button
                              className="btn btn-orange mb_8"
                              type="button"
                              onClick={() => {
                                // setFiles([]);
                              }}
                            >
                              Upload File
                            </button>
                          </div>
                        </div>
                        {files.length > 0 ? (
                          <>
                            <button
                              style={{ marginBottom: "10px" }}
                              className="btn btn-black"
                              onClick={() => setFiles([])}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="myprofile_inner_sec2_img_upload">
                          <img
                            src={get_customer_data.cus_profile_path}
                            style={{ width: "100%", height: "100%" }}
                            className="img-fluidb"
                          />
                        </div>
                        <div className="btnn-main" style={{ width: "100%" }}>
                          <button
                            className="btn btn-orange mb_8"
                            type="button"
                            onClick={() => {
                              // setFiles([]);
                            }}
                          >
                            Upload File
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                }}
              >
                <button
                  className="btn btn-black"
                  onClick={() => setFiles([])}
                  style={{
                    marginBottom: "10px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* upload images wrapp end */}

          <div className="cust-profile-acc-setting-last-part-flex cust-profile-acc-setting-last-part-flex-resp">
            {/* mm terms condition wrapp */}
            <div className="mm_form_single_input mm_form_single_input_cus_accresp">
              <label htmlFor="" style={{ minWidth: "150px" }}></label>
              <div>
                <div className="signup_terms_wrapp" style={{ marginTop: "0rem" }}>
                  <input type="checkbox"
                    value={tram}
                    onChange={handleTermChange}
                    checked={tram == 1}
                  />
                  <p className="fs-des">
                    I have read and agree to the{" "}
                    <a className="signup_terms_link">Terms and Conditions</a>{" "}
                  </p>
                </div>

                <div className="signup_terms_wrapp">
                  <input type="checkbox"
                    value={tram1}
                    onChange={handleTermChange2}
                    checked={tram1 == 1}
                  />
                  <p className="fs-des">
                    I have read and agree to the{" "}
                    <a className="signup_terms_link">Privacy Policy</a>
                  </p>
                </div>
              </div>
            </div>

            {/* upload button */}
            <div className="mm_form_single_input">
              {/* <label htmlFor="" style={{ minWidth: "150px" }}></label> */}
              <div className="mall_upload_btn_wrapp mall_upload_btn_wrapp-customer-acc-setting mall_upload_btn_wrapp_res">
                <button
                  disabled={tram == 1 && tram1 == 1 ? false : true}

                  className="btn btn-orange btn-pro-acc-cus"
                  onClick={() => UpdateProfile()}
                >
                  Update
                </button>
                <button className="btn btn-black btn-pro-acc-cus">Reset</button>
              </div>
            </div>
          </div>
        </div>

        {/* customer profile account form last part start */}
        {/* <div className="cust-profile-acc-setting-last-part-flex">
          <div className="mm_form_single_input">
            <label htmlFor="" style={{ minWidth: "150px" }}></label>
            <div>
              <div className="signup_terms_wrapp">
                <input
                  type="checkbox"
                  value={tram}
                  onChange={(e) => SetTram(e.target.value)}
                />
                <p className="fs-des">
                  I have read and agree to the{" "}
                  <a className="signup_terms_link">Terms and Conditions</a>{" "}
                </p>
              </div>

              <div className="signup_terms_wrapp">
                <input
                  type="checkbox"
                  value={tram1}
                  onChange={(e) => SetTram1(e.target.value)}
                />
                <p className="fs-des">
                  I have read and agree to the{" "}
                  <a className="signup_terms_link">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>

          <div className="mm_form_single_input">
            <label htmlFor="" style={{ minWidth: "150px" }}></label>
            <div className="mall_upload_btn_wrapp mall_upload_btn_wrapp-customer-acc-setting mall_upload_btn_wrapp_res">
              <button
                className="btn btn-orange btn-pro-acc-cus"
                onClick={() => UpdateProfile()}
              >
                Update
              </button>
              <button className="btn btn-black btn-pro-acc-cus">Reset</button>
            </div>
          </div>
        </div> */}

      </div>
      {/* mall management form end */}
      {isVisible ? <>
        <div className='edit-brand-back-iconbox' style={{ width: "80px", marginTop: "2rem" }} onClick={() => setTab(2)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

      </> : <></>}

    </div>
    </>
  );
};

export default ProfileAccountSetting;