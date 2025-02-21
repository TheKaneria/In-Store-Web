import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useMallContext } from "../../context/mall_context";
import {
  ACCEPT_HEADER,
  get_brand_multiple,
  get_category,
  update_store_brand,
} from "../../utils/Constant";
import Notification from "../../utils/Notification";
import { IoChevronBack } from "react-icons/io5";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useStoreContext } from "../../context/store_context";

const animatedComponents = makeAnimated();

const EditRetailerBrand = ({
  getstore_is,
  getsingleStoreData2,
  setTab,
  getStoreList,
  get_mall_auth_data,
}) => {
  // ("bbb", getstore_is);
  const { UpdateMallStore } = useMallContext();
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const regEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  // update store states
  const [storeName, setStoreName] = useState(
    getsingleStoreData2
      ? getsingleStoreData2.name !== null
        ? getsingleStoreData2.name
        : ""
      : ""
  );
  const [storeNumber, setStoreNumber] = useState(
    getsingleStoreData2.store_no && getsingleStoreData2.store_no
  );
  
  const [getnumber, setNumber] = useState(
    getsingleStoreData2.number && getsingleStoreData2.number
  );

  const [getContactPerson, setContactPerson] = useState(
    getsingleStoreData2.contact_person && getsingleStoreData2.contact_person
  );
  const [getemail, setEmail] = useState(
    getsingleStoreData2.email ? getsingleStoreData2.email : ""
  );
  const [getBrandList, setBrandList] = useState(
    getsingleStoreData2.brands ? getsingleStoreData2.brands : ""
  );
  const [storeDes, setStoreDes] = useState(
    getsingleStoreData2.description ? getsingleStoreData2.description : ""
  );
  const [storeLogo, setStoreLogo] = useState(
    getsingleStoreData2.store_logo && getsingleStoreData2.store_logo
  );

  const [storeBnner, setStoreBanner] = useState(
    getsingleStoreData2.banner_store && getsingleStoreData2.banner_store
  );


  const [monFromTime, setMonFromTime] = useState(
    getsingleStoreData2.mon_fri_from_time && getsingleStoreData2.mon_fri_from_time
  );
  const [monToTime, setMonToTime] = useState(
    getsingleStoreData2.mon_fri_to_time && getsingleStoreData2.mon_fri_to_time
  );
  const [satFromTime, setSatFromTime] = useState(
    getsingleStoreData2.sat_from_time && getsingleStoreData2.sat_from_time
  );
  const [satToTime, setSatToTime] = useState(
    getsingleStoreData2.sat_to_time && getsingleStoreData2.sat_to_time
  );
  const [sunFromTime, setSunFromTime] = useState(
    getsingleStoreData2.sun_from_time && getsingleStoreData2.sun_from_time
  );
  const [sunToTime, setSunToTime] = useState(
    getsingleStoreData2.sun_to_time && getsingleStoreData2.sun_to_time
  );
  const [holidayFromTime, setHolidayFromTime] = useState(
    getsingleStoreData2.holiday_from_time && getsingleStoreData2.holiday_from_time
  );
  const [holidayToTime, setHolidayToTime] = useState(
    getsingleStoreData2.holiday_to_time && getsingleStoreData2.holiday_to_time
  );
  const [retailerType, setRetailerType] = useState(
    getsingleStoreData2.store_type && getsingleStoreData2.store_type
  );
  const [getcondition, setcondition] = useState(false);
  const [getcondition2, setcondition2] = useState(false);
  const [mallsOption, setMallsOption] = useState(
    getsingleStoreData2.mall_arr ? getsingleStoreData2.mall_arr : ""
  );

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [brandadd, SetBrandAdd] = useState(getsingleStoreData2.address ? getsingleStoreData2.address : "");
  const [brandadd2, SetBrandAdd2] = useState(getsingleStoreData2.address_2 ? getsingleStoreData2.address_2 : "");
  const [brandadd3, SetBrandAdd3] = useState(getsingleStoreData2.address_3 ? getsingleStoreData2.address_3 : "");
  const [getPassword, setPassword] = useState(getsingleStoreData2.showpassword ? getsingleStoreData2.showpassword : "");
  const [getPassword2, setPassword2] = useState(getsingleStoreData2.showpassword ? getsingleStoreData2.showpassword : "");

  const [mallWebsite, setMallWebsite] = useState(getsingleStoreData2.website ? getsingleStoreData2.website : "");
  const [getbrandemail, SetBrandEmail] = useState(getsingleStoreData2.brand_email ? getsingleStoreData2.brand_email : "");
  const [secondryemail, SetSecondryEmail] = useState(getsingleStoreData2.secondary_email ? getsingleStoreData2.secondary_email : "");
  const [scondrycontect, SetScondryContect] = useState(getsingleStoreData2.secondary_contact ? getsingleStoreData2.secondary_contact : "");
  const [mallInsta, setMallInsta] = useState(getsingleStoreData2.insta ? getsingleStoreData2.insta : "");
  const [mallfb, setMallfb] = useState(getsingleStoreData2.fb ? getsingleStoreData2.fb : "");
  const [mallTwitter, setMallTwitter] = useState(getsingleStoreData2.tweet ? getsingleStoreData2.tweet : "");
  const [mallsOption2, setMallsOption2] = useState(getsingleStoreData2?.name);
  const [storeContactPersoon, setStoreContactPerson] = useState(getsingleStoreData2.contact_person ? getsingleStoreData2.contact_person : "");

  
  // const [selected, setSelected] = useState(1)

  

  
  const onHandleNumberChange = (e) => {
    let number = e.target.value;
    if (number === "" || re.test(number)) {
        setNumber(number);
    } else {
        return;
    }
};

  useEffect(() => {
    files.length > 0 &&
      files.map((item) => {
        setStoreLogo(item);
        // ("files", item);
      });
  }, [files]);

  useEffect(() => {
    files2.length > 0 &&
      files2.map((item) => {
        setStoreBanner(item);
        // ("files", item);
      });
  }, [files2]);

 
const handleTermChange3 = (e) => {
    setIsAcceptTerm2(1);
    // ("e.targate.value");
};

  const onHandleEmailChange = (e) => {
    
    let email = e.target.value;
    console.log("e",email);
    setEmail(email);
    // if (email === "" || regEx.test(email)) {
    //   setEmail(email);
    // } else {
    //   return;
    // }
  };


  const [isAcceptTerm, setIsAcceptTerm] = useState(0);
  const [isAcceptTerm2, setIsAcceptTerm2] = useState(0);
  const [imagecheck, setImageCheck] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
};

const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
};

  const handleTermChange = (e) => {
    setIsAcceptTerm(1);
    // ("e.targate.value");
  };
  const handleTermChange2 = (e) => {
    console.log("log");
    
    setIsAcceptTerm(1);
    // ("e.targate.value");
  };

  const {
    getMultipleMall,
    multiple_week_data,
} = useStoreContext();

 
// console.log("multiple_week_data",multiple_week_data);

useEffect(() => {
  getMultipleMall();
}, []);



  // update mall store api

  const AddStoreNallData = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    if (mallsOption2 == "" || undefined) {
        Notification("error", "Error!", "Please Enter Brand Name!");
        return;
    } else if (mallsOption.length <= 0) {
        Notification(
            "error",
            "Error!",
            "Please Select any Brand"
        );
        return;
    } else if (brandadd == "" || undefined) {
        Notification("error", "Error", "Please Enter Brand Address");
        return;
    } else if (mallWebsite == "" || undefined) {
        Notification("error", "Error", "Please Enter Website URL");
        return;
    } else if (getbrandemail == "" || undefined) {
        Notification("error", "Error", "Please Enter Brand");
        return;
    }
    // else if (storeLevel == "" || undefined) {
    //     Notification("error", "Error!", "Please Select Store Level!");
    //     return;
    // }
    // else if (storeContactPersoon == "" || undefined) {
    //     Notification("error", "Error!", "Please Enter Contact Person Name!");
    //     return;
    // }
    else if (getnumber == "" || undefined) {
        Notification("error", "Error!", "Please Enter Number!");
        return;
    } else if (getemail == "" || undefined) {
        Notification("error", "Error!", "Please Enter Email!");
        return;
    } else if (regEx.test(getemail) == false) {
        Notification("error", "Error!", "Please enter valid email id!");
        return;
    } else if (getPassword == "" || undefined) {
        Notification("error", "Error!", "Please Enter Password !");
        return;
    }   else if (getPassword !== getPassword2) {
      Notification("error", "Error!", "Password & Confirm Password are not Confirm !");
      return;
  }
    else if (storeDes == "" || undefined) {
        Notification("error", "Error!", "Please Enter some Description!");
        return;
    } else {
        const formdata = await new FormData();
        await formdata.append("id",getsingleStoreData2.id);
        await formdata.append("address", brandadd);
        await formdata.append("address_2", brandadd2);
        await formdata.append("address_3", brandadd3);
        await formdata.append("website",mallWebsite);
        await formdata.append("brand_email", getbrandemail);
        await formdata.append("number", getnumber);
        await formdata.append("contact_person", storeContactPersoon);

        await formdata.append("email", getemail);
        await formdata.append("password", getPassword);
        await formdata.append("secondary_contact", scondrycontect);
        await formdata.append("secondary_email", secondryemail);

        
        await formdata.append("description", storeDes);
        await formdata.append("insta", mallInsta);
        await formdata.append("fb", mallfb);
        await formdata.append("tweet", mallTwitter);


        await formdata.append("terms_condition", isAcceptTerm);
        await formdata.append("privacy_policy", isAcceptTerm2);

        for (var i = 0; i < mallsOption.length; i++) {
            await formdata.append("mall_id[" + i + "]", mallsOption[i].value);
        }

        if (files && files.length > 0) {
            await formdata.append("store_logo", files[0]);
        }

        if (files2 && files2.length > 0) {
            await formdata.append("banner_store", files2[0]);
        }





        axios
            .post(update_store_brand, formdata, {
                headers: {
                    Accept: ACCEPT_HEADER,
                    Authorization: "Bearer " + token,
                },
            })
            .then((res) => {
                // ("create_movie", JSON.stringify(res.data, null, 2));
                if (res.data.success == 1) {
                    Notification("success", "Success!", "Brand Updated Successfully!");
                    setTab(28);
                    getStoreList();
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

  const { getRootProps: getRootLogoProps, getInputProps: getInputLogoProps } =
    useDropzone({
      onDrop: async (acceptedFiles) => {
        // ("acceptedFiles", acceptedFiles);
        {
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
              if (isDimensionsValid) {
                setImageCheck(true);
              } else {
                setImageCheck(false);
              }
              return isDimensionsValid ? file : null; // Return file if dimensions are valid, otherwise skip it
            })
          );
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
              if (validFiles.length !== acceptedFiles.length) {
                setImageCheck(false);
              } else {
                setImageCheck(true);
              }
              Notification(
                "error",
                "Error!",
                "Some files exceed the maximum size limit of 40KB or do not meet the dimension requirements of 200x200 pixels and will not be uploaded."
              );
            }
          }
        }
        setcondition(true);
        if (acceptedFiles.length === 0) {
          window.location.reload(true);
        }
      },
    });

  const {
    getRootProps: getRootBannerProps,
    getInputProps: getInputBannerProps,
  } = useDropzone({
    onDrop: async (acceptedFiles) => {
      // ("acceptedFiles", acceptedFiles);
      {
        const maxSizeKB = 200; // Maximum size limit in KB
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
            const isDimensionsValid = img.width == 1050 && img.height == 284;
            if (isDimensionsValid) {
              setImageCheck(true);
            } else {
              setImageCheck(false);
            }
            return isDimensionsValid ? file : null; // Return file if dimensions are valid, otherwise skip it
          })
        );

        const validFiles = filteredFiles.filter((file) => file !== null);
        {
          setFiles2(
            validFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          );
          if (validFiles.length !== acceptedFiles.length) {
            if (validFiles.length !== acceptedFiles.length) {
              setImageCheck(false);
            } else {
              setImageCheck(true);
            }
            Notification(
              "error",
              "Error!",
              "Some files exceed the maximum size limit of 200KB or do not meet the dimension requirements of 1050x284 pixels and will not be uploaded."
            );
          }
        }
      }
      setcondition2(true);
      if (acceptedFiles.length === 0) {
        window.location.reload(true);
      }
    },
  });

  const thumbs = files.map((file) => (
    <img
      src={file.preview}
      style={{
        width: "100%",
        height: "100%",
        maxHeight: "175px",
        filter: "grayscale(100%)",
      }}
      className="img-fluid"
      alt="file"
    />
  ));

  const thumbs2 = files2.map((file) => (
    <img
      src={file.preview}
      style={{ width: "100%", height: "100%", maxHeight: "175px" }}
      className="img-fluid"
      alt="file"
    />
  ));

  useEffect(() => {
    getcat();
    getMutipleBrand();
  }, []);

  const [catarray, SetArray] = useState([]);
  const [getMultipleBrand, setMultipleBrand] = useState([]);

  const [storeCategory, setStoreCategory] = useState(
    getsingleStoreData2.categorys == null ||
      getsingleStoreData2.categorys == "" ||
      getsingleStoreData2.categorys.id == null ||
      getsingleStoreData2.categorys.id == ""
      ? ""
      : getsingleStoreData2.categorys.id
  );
  const [categoryName, setCategoryName] = useState(
    getsingleStoreData2.categorys == null ||
      getsingleStoreData2.categorys == "" ||
      getsingleStoreData2.categorys.name == null ||
      getsingleStoreData2.categorys.name == ""
      ? ""
      : getsingleStoreData2.categorys.name
  );

  // console.log("getsingleStoreData2.brands", getsingleStoreData2.brands);
  // console.log("getsingleStoreData2.brands", getsingleStoreData2);

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
          null;
        }
      })
      .catch((err) => {
        console.log("err11", err);
      });
  };

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
          null;
        }
      })
      .catch((err) => {
        console.log("err11", err);
      });
  };

  return (
    <>

    <div className="mm_main_wrapp">
        <div className="edit-brand-back-iconbox" onClick={() => setTab(28)}>
            <IoChevronBack className="edit-brand-back-icon" />{" "}
            <p className="edit-brand-back-txt">Back</p>
        </div>
        {/* mall management name start */}
        <div className="mall_name_wrapp mm_form_wrapp_name_padding">
            <p className="mall_name_heading">
                {getsingleStoreData2.name ? getsingleStoreData2.name : ""}:
            </p>
            <span style={{ fontWeight: 600 }}>Edit Brand</span>
        </div>
        {/* <div className="mm_horizontal_line"></div> */}
        <div className="" style={{ marginTop: "2rem" }}></div>
        {/* mall management name end */}

        {/* mall management form start */}
        <div className="mm_form_wrapp mm_form_wrapp_add_brand_mall mm_form_wrapp_padding_retailer_brand">
            {/* text-input wrapp start */}
            <div className="mm_form_input_wrapp">
                {/* single text-input */}

                {/* <div className="signup_terms_wrapp">
    <div className="mm_form_single_input">
      <label htmlFor="" style={{ minWidth: "157px" }}>
        Retailer type
      </label>

      <div className="radio-btn-flex-brand radio-btn-flex-brand-mall">
        <div className="radio-btn-inner-flex">
          <input
            type="radio"
            id="Online"
            name="gender"
            value="1"
            onChange={(e) => {
              setRetailerType(e.target.value);
              // ("-->", retailerType);
            }}
            // onChange={(e) => { setRetailerType(1); ("-->", retailerType); }}
          />
          <label className="course-form-txt" for="male">
            Independent Retailer
          </label>
        </div>

        <div className="radio-btn-inner-flex">
          <input
            type="radio"
            id="In-Person"
            name="gender"
            value="2"
            onChange={(e) => {
              setRetailerType(e.target.value);
              // ("-->", retailerType);
            }}
          />
          <label className="course-form-txt" for="specifyColor">
            Group Retailer
          </label>
        </div>
      </div>
    </div>
  </div> */}

                <div className="mm_form_single_input">
                    {retailerType == 2 ? (
                        <>
                            <label htmlFor="" style={{ minWidth: "157px" }}>
                                Holding Company<span className="star_require">*</span>
                            </label>
                        </>
                    ) : (
                        <>
                            <label htmlFor="" style={{ minWidth: "157px" }}>
                                Brand Name<span className="star_require">*</span>
                            </label>
                        </>
                    )}

                    {/* <Select
                        value={mallsOption2}
                        styles={{ width: "100%", padding: "0px" }}
                        className="leaderboard-card-inp"
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        // defaultValue={[colourOptions[4], colourOptions[5]]}
                        // options={get_brand_data_multiple}
                        options={getMultipleBrand}
                        
                        onChange={setMallsOption2}
                    /> */}
                    <input
                        type="text"
                        value={mallsOption2}
                        // onChange={(e) => SetBrandAdd(e.target.value)}
                        disabled={true}
                        name=""
                        id=""
                        className="input_box"
                    />
                    {/* <input
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        name=""
                        id=""
                        className="input_box"
                    /> */}

                    {/* <select className="leaderboard-card-inp" onChange={(e) => {
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

              </select> */}
                </div>

                {/* {retailerType == 2 ? (
    <>
      <div className="mm_form_single_input">
        <label htmlFor="" className="" style={{ minWidth: "157px" }}>
          Select Brands
        </label>

        <Select
          value={mallsOption}
          styles={{ width: "100%", padding: "0px" }}
          className="leaderboard-card-inp"
          closeMenuOnSelect={false}
          components={animatedComponents}
          // defaultValue={[colourOptions[4], colourOptions[5]]}

          isMulti
          options={getMultipleBrand}
          onChange={setMallsOption}
        />
      </div>
    </>
  ) : (
    <></>
  )} */}
                {/* single text-input */}
                {/* <div className="mm_form_single_input">
                    <label htmlFor="" style={{ minWidth: "157px" }}>
                        Category<span className="star_require">*</span>
                    </label>
                    <div className="sselect-wrapper" style={{ width: "100%" }}>
                        <select
                            className="input_box cons_select_nav"
                            onChange={(e) => {
                                setStoreCategory(e.target.value);
                               
                            }}
                        >
                            <option defaultValue value=""></option>
                            {catarray &&
                                catarray.map((item, index) => {
                                    return (
                                        <>
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        </>
                                    );
                                })}
                        </select>
                    </div>
                   
                </div> */}
                {/* single text-input */}

                <div className="mm_form_single_input">
                    <label htmlFor="" style={{ minWidth: "157px" }}>Brand Address<span className="star_require">*</span></label>
                    <input
                        type="text"
                        value={brandadd}
                        onChange={(e) => SetBrandAdd(e.target.value)}
                        name=""
                        id=""
                        className="input_box"
                    />
                </div>
                {/* single text-input */}

                {/* single text-input */}
                <div className="mm_form_single_input">
                    <label htmlFor="" className="mm_form_single_input_cinema_Acc_setting"></label>
                    <input
                        type="text"
                        value={brandadd2}
                        onChange={(e) => SetBrandAdd2(e.target.value)}
                        name=""
                        id=""
                        className="input_box"
                    />
                </div>
                {/* single text-input */}

                {/* single text-input */}
                <div className="mm_form_single_input">
                    <label htmlFor="" className="mm_form_single_input_cinema_Acc_setting"></label>
                    <input
                        type="text"
                        value={brandadd3}
                        onChange={(e) => SetBrandAdd3(e.target.value)}
                        name=""
                        id=""
                        className="input_box"
                    />
                </div>
                {/* single text-input */}

                {/* single text-input */}
                <div className="mm_form_single_input">
                    <label htmlFor="" className="mm_form_single_input_cinema_Acc_setting">Website URL<span className="star_require">*</span></label>
                    <input
                        type="text"
                        value={mallWebsite}
                        onChange={(e) => setMallWebsite(e.target.value)}
                        name=""
                        id=""
                        className="input_box"
                    />
                </div>

                {/* single text-input */}
                <div className="mm_form_single_input">
                    <label htmlFor="" className="mm_form_single_input_cinema_Acc_setting">Brand Email<span className="star_require">*</span></label>
                    <input
                        type="text"
                        value={getbrandemail}
                        onChange={(e) => SetBrandEmail(e.target.value)}
                        name=""
                        id=""
                        className="input_box"
                    />
                </div>

                {/* single text-input */}
                <div className="mm_form_single_input">
                    <label htmlFor="" className="mm_form_single_input_cinema_Acc_setting">Secondary Contact</label>
                    <input
                        type="number"
                        value={scondrycontect}
                        onChange={(e) => SetScondryContect(e.target.value)}
                        name=""
                        id=""
                        className="input_box"
                    />
                </div>

                {/* single text-input */}
                <div className="mm_form_single_input">
                    <label htmlFor="" className="mm_form_single_input_cinema_Acc_setting">Secondary Email</label>
                    <input
                        type="email"
                        value={secondryemail}
                        onChange={(e) => SetSecondryEmail(e.target.value)}
                        name=""
                        id=""
                        className="input_box"
                    />
                </div>

                {/* single text-input */}
                <div className="mm_form_single_input">
                    <label htmlFor="" className="mm_form_single_input_cinema_Acc_setting">Instagram</label>
                    <input
                        type="text"
                        value={mallInsta}
                        onChange={(e) => setMallInsta(e.target.value)}
                        name=""
                        id=""
                        className="input_box"
                    />
                </div>
                {/* single text-input */}
                <div className="mm_form_single_input">
                    <label htmlFor="" className="mm_form_single_input_cinema_Acc_setting">Facebook</label>
                    <input
                        type="text"
                        value={mallfb}
                        onChange={(e) => setMallfb(e.target.value)}
                        name=""
                        id=""
                        className="input_box"
                    />
                </div>
                {/* single text-input */}
                <div className="mm_form_single_input">
                    <label htmlFor="" className="mm_form_single_input_cinema_Acc_setting">Twitter</label>
                    <input
                        type="text"
                        value={mallTwitter}
                        onChange={(e) => setMallTwitter(e.target.value)}
                        name=""
                        id=""
                        className="input_box"
                    />
                </div>
                {/* single text-input */}

                {/* single text-input */}
                {/* <div className="mm_form_single_input">
                    <label htmlFor="" style={{ minWidth: "157px" }}>
                        Store Level
                    </label>
                    <input
                        type="text"
                        value={storeLevel}
                        onChange={(e) => setStoreLevel(e.target.value)}
                        name=""
                        id=""
                        className="input_box"
                    />
                </div> */}

                <div className="mm_form_single_input">
                    <label htmlFor="" style={{ minWidth: "157px" }}>Select My Malls<span className="star_require">*</span></label>

                    <Select
                        value={mallsOption}
                        styles={{ width: "100%", padding: "0px" }}
                        className="leaderboard-card-inp"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        // defaultValue={[colourOptions[4], colourOptions[5]]}
                        // isDisabled={true}
                        isMulti
                        options={multiple_week_data}
                        onChange={setMallsOption}
                    />
                </div>
                {/* single text-input */}

                {/* single text-input */}
                <div className="mm_form_single_input">
                    <label htmlFor="" style={{ minWidth: "157px" }}>
                        Contact Number<span className="star_require">*</span>
                    </label>
                    <input
                        type="text"
                        value={getnumber}
                        onChange={(e) => onHandleNumberChange(e)}
                        name=""
                        id=""
                        className="input_box"
                    />
                </div>
                {/* single text-input */}

                <div className="mm_form_single_input">
                    <label htmlFor="" style={{ minWidth: "157px" }}>
                        Contact Person
                    </label>
                    <input
                        type="text"
                        value={storeContactPersoon}
                        onChange={(e) => setStoreContactPerson(e.target.value)}
                        name=""
                        id=""
                        className="input_box"
                    />
                </div>

                <div className="mm_form_single_input">
                    <label htmlFor="" style={{ minWidth: "157px" }}>
                        Email Addressss<span className="star_require">*</span>
                    </label>
                    <input style={{color:"#000"}}
                        type="email"
                        onChange={(e) => onHandleEmailChange(e)}
                        value={getemail}
                        name=""
                        id=""
                        className="input_box"
                    />
                </div>
                <div className="mm_form_single_input">
                    <label htmlFor="" style={{ minWidth: "157px" }}>
                        Password<span className="star_require">*</span>
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
                            value={getPassword}
                            // placeholder="Enter Your Password"
                            onChange={(e) => setPassword(e.target.value)}
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
                <div className="mm_form_single_input">
                    <label htmlFor="" style={{ minWidth: "157px" }}>
                        Confirm Password<span className="star_require">*</span>
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
                            value={getPassword2}
                            // placeholder="Enter Your Password"
                            onChange={(e) => setPassword2(e.target.value)}
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

                {/* <div className="mm_tranding_wrapp">
                    <label
                        style={{
                            fontSize: "16px",
                            fontWeight: "400",
                            minWidth: "157px",
                        }}
                        htmlFor=""
                    >
                        Trading Hours<span className="star_require">*</span>
                    </label>
                    <div className="tranding_times_wrapp">
                        <div className="tranding_times_wrapp_sec">
                            <label
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    minWidth: "157px",
                                }}
                                htmlFor=""
                            >
                                Monday - Friday
                            </label>
                            <div
                                className="tranding_sigle_time_wrapp"
                                style={{ gap: "0px", width: "138px" }}
                            >
                               
                                <input
                                    type="time"
                                    name=""
                                    value={monFromTime}
                                    onChange={(e) => setMonFromTime(e.target.value)}
                                    id=""
                                    className="input_box"
                                />
                                <p
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "400",
                                    }}
                                >
                                </p>
                            </div>
                            <div
                                className="tranding_sigle_time_wrapp"
                                style={{ gap: "0px", width: "138px" }}
                            >
                                
                                <input
                                    type="time"
                                    name=""
                                    value={monToTime}
                                    onChange={(e) => setMonToTime(e.target.value)}
                                    id=""
                                    className="input_box"
                                />
                                <p
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "400",
                                    }}
                                ></p>
                            </div>
                        </div>
                        <div className="tranding_times_wrapp_sec">
                            <label
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    minWidth: "157px",
                                }}
                                htmlFor=""
                            >
                                Saturday
                            </label>
                            <div
                                className="tranding_sigle_time_wrapp"
                                style={{ gap: "0px", width: "138px" }}
                            >
                                
                                <input
                                    type="time"
                                    name=""
                                    value={satFromTime}
                                    onChange={(e) => setSatFromTime(e.target.value)}
                                    id=""
                                    className="input_box"
                                />
                                <p
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "400",
                                    }}
                                ></p>
                            </div>
                            <div
                                className="tranding_sigle_time_wrapp"
                                style={{ gap: "0px", width: "138px" }}
                            >
                               
                                <input
                                    type="time"
                                    name=""
                                    value={satToTime}
                                    onChange={(e) => setSatToTime(e.target.value)}
                                    id=""
                                    className="input_box"
                                />
                                <p
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "400",
                                    }}
                                ></p>
                            </div>
                        </div>
                        <div className="tranding_times_wrapp_sec">
                            <label
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    minWidth: "157px",
                                }}
                                htmlFor=""
                            >
                                Sunday
                            </label>
                            <div
                                className="tranding_sigle_time_wrapp"
                                style={{ gap: "0px", width: "138px" }}
                            >
                              
                                <input
                                    type="time"
                                    name=""
                                    value={sunFromTime}
                                    onChange={(e) => setSunFromTime(e.target.value)}
                                    id=""
                                    className="input_box"
                                />
                                <p
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "400",
                                    }}
                                ></p>
                            </div>
                            <div
                                className="tranding_sigle_time_wrapp"
                                style={{ gap: "0px", width: "138px" }}
                            >
                                
                                <input
                                    type="time"
                                    name=""
                                    value={sunToTime}
                                    onChange={(e) => setSunToTime(e.target.value)}
                                    id=""
                                    className="input_box"
                                />
                                <p
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "400",
                                    }}
                                ></p>
                            </div>
                        </div>
                        <div className="tranding_times_wrapp_sec">
                            <label
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    minWidth: "157px",
                                }}
                                htmlFor=""
                            >
                                Public Holidays
                            </label>
                            <div
                                className="tranding_sigle_time_wrapp"
                                style={{ gap: "0px", width: "138px" }}
                            >
                               
                                <input
                                    type="time"
                                    name=""
                                    value={holidayFromTime}
                                    onChange={(e) => setHolidayFromTime(e.target.value)}
                                    id=""
                                    className="input_box"
                                />
                                <p
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "400",
                                    }}
                                ></p>
                            </div>
                            <div
                                className="tranding_sigle_time_wrapp"
                                style={{ gap: "0px", width: "138px" }}
                            >
                              
                                <input
                                    type="time"
                                    name=""
                                    value={holidayToTime}
                                    onChange={(e) => setHolidayToTime(e.target.value)}
                                    id=""
                                    className="input_box"
                                />
                                <p
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "400",
                                    }}
                                ></p>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* tranding sec end */}

                {/* text-area sec start */}
                <div
                    className="mm_form_single_input"
                    style={{ alignItems: "flex-start" }}
                >
                    <label htmlFor="" style={{ minWidth: "157px" }}>
                        Brand Description<span className="star_require">*</span>
                    </label>
                    <textarea
                        type="text"
                        value={storeDes}
                        onChange={(e) => setStoreDes(e.target.value)}
                        name=""
                        id=""
                        className="input_box"
                        rows={8}
                    />
                </div>
                <div
                    className="mm_form_single_input"
                    style={{ alignItems: "flex-start" }}
                >
                    <label htmlFor="" style={{ minWidth: "157px" }}></label>
                    <span style={{ fontSize: "14px", color: "#bbb" }}>
                        *Required Fields including all image uploads.
                    </span>
                </div>

                {/* <div className="signup_terms_wrapp indep-side">
                  <div className="mm_form_single_input">
                      <label htmlFor="">Retailer type</label>

                      <div className="radio-btn-flex-brand radio-btn-flex-brand-mall">
                          <div className="radio-btn-inner-flex">
                              <input
                                  type="radio"
                                  id="Online"
                                  name="gender"
                                  value="1"
                                  onChange={(e) => { setRetailerType(e.target.value); ("-->", retailerType); }}
                              // onChange={(e) => { setRetailerType(1); ("-->", retailerType); }}

                              />
                              <label className="course-form-txt" for="male">
                                  Independent Retailer
                              </label>
                          </div>

                          <div className="radio-btn-inner-flex">
                              <input
                                  type="radio"
                                  id="In-Person"
                                  name="gender"
                                  value="2"
                                  onChange={(e) => { setRetailerType(e.target.value); ("-->", retailerType); }}
                              />
                              <label className="course-form-txt" for="specifyColor">
                                  Group Retailer
                              </label>
                          </div>
                      </div>
                  </div>

              </div> */}

                {/* <div className="signup_terms_wrapp indep-side">
                  <div className="mm_form_single_input mb_8">
                      <label htmlFor="" style={{ minWidth: "157px" }}></label>
                      <input
                          type="checkbox"
                          value={retailerType}
                          onChange={handleTermChange}
                      // checked={retailerType}
                      />
                      {retailerType == 1 ? <p className="fs-des ">
                          Independed Retailer
    
                      </p> : <p>Group Retailer</p>}
                  </div>
              </div> */}

                {/* <div className="signup_terms_wrapp indep-side-show">
                  <div className="mm_form_single_input" style={{ flexDirection: "column", alignItems: "start" }}>
                      <label htmlFor="">Retailer type</label>

                      <div className="radio-btn-flex-brand radio-btn-flex-brand-mall">
                          <div className="radio-btn-inner-flex">
                              <input
                                  type="radio"
                                  id="Online"
                                  name="gender"
                                  value="1"
                                  onChange={(e) => { setRetailerType(e.target.value); ("-->", retailerType); }}
                              // onChange={(e) => { setRetailerType(1); ("-->", retailerType); }}

                              />
                              <label className="course-form-txt" for="male">
                                  Independent Retailer
                              </label>
                          </div>

                          <div className="radio-btn-inner-flex">
                              <input
                                  type="radio"
                                  id="In-Person"
                                  name="gender"
                                  value="2"
                                  onChange={(e) => { setRetailerType(e.target.value); ("-->", retailerType); }}
                              />
                              <label className="course-form-txt" for="specifyColor">
                                  Group Retailer
                              </label>
                          </div>
                      </div>
                  </div>

              </div> */}

                <div className="mm_form_single_input mb_8">
                    <label htmlFor="" style={{ minWidth: "157px" }}></label>
                    <div className="signup_terms_wrapp indep-side">
                        <input
                            type="checkbox"
                            value={isAcceptTerm}
                            onChange={handleTermChange2}
                            checked={isAcceptTerm}
                        />

                        <p
                            className="fs-des"
                            style={{ fontWeight: "400", fontSize: "14px" }}
                        >
                            I have read and agree to the{" "}
                            <a className="signup_terms_link">Privacy Policy</a>
                        </p>
                    </div>
                </div>
                <div className="mm_form_single_input mb_8">
                    <label htmlFor="" style={{ minWidth: "157px" }}></label>
                    <div
                        className="signup_terms_wrapp indep-side"
                        style={{ marginTop: "-12px" }}
                    >
                        <input
                            type="checkbox"
                            value={isAcceptTerm2}
                            onChange={handleTermChange3}
                            checked={isAcceptTerm2}
                        />

                        <p
                            className="fs-des"
                            style={{ fontWeight: "400", fontSize: "14px" }}
                        >
                            I have read and agree to the{" "}
                            <a className="signup_terms_link">Terms and Conditions</a>
                        </p>
                    </div>
                </div>
                {/* text-area sec end */}
                <div className="mm_form_single_input mb_8">
                    <label htmlFor="" style={{ minWidth: "157px" }}></label>
                    <div className="mm_form_single_input brand-resp-btn">
                        <button
                            className="btn btn-black"
                            onClick={() => AddStoreNallData()}
                            style={{ width: "200px" }}
                            disabled={
                                isAcceptTerm == 1 && isAcceptTerm2 == 1 ? false : true
                            }
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            {/* text-input wrapp end */}
            <div className="brand-add-img-flex">
            {/* upload images wrapp start */}
            <div className="mm_img_upload_wrapp" style={{ width: "100%" }}>
              {/* single upload image */}
              <div className="img-upl-border">
                <div
                  className="myprofile_inner_sec2"
                  {...getRootLogoProps()}
                  style={{
                    border: "none",
                    paddingBottom: "0px",
                    maxWidth: "250px",
                  }}
                >
                  <input
                {...getInputLogoProps()}
                accept="image/jpeg, image/jpg, image/png, image/eps" style={{display:"none"}}
              />
                  <h4
                    style={{
                      marginBottom: "10px",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                    className="myprofile_upload_img_card_name"
                  >
                    Upload black and white <br />
                    Brand logo <br />
                    (200 x 200 pixels)
                    <br />
                    (max 40kb)<span className="star_require">*</span>
                    <br />{" "}
                  </h4>
                  {getcondition === true ? (
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
                            <input
                              {...getRootLogoProps()}
                              accept="image/jpeg, image/jpg, image/png, image/eps" style={{display:"none"}}
                            />
                            <button
                              type="button"
                              className="click_upload_btn"
                              style={{ marginBottom: "10px" }}
                            >
                              click here
                            </button>
                            {/* <a href="">clicking here</a> */}
                          </div>
                          <div className="btnn-main">
                            <button
                              className="btn btn-black mb_8"
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
                      {getsingleStoreData2.store_logo_path === null ? (
                        <>
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
                              <input
                                {...getRootLogoProps()}
                                accept="image/jpeg, image/jpg, image/png, image/eps" style={{display:"none"}}
                              />
                              <button
                                type="button"
                                className="click_upload_btn"
                                style={{ marginBottom: "10px" }}
                              >
                                click here
                              </button>
                              {/* <a href="">clicking here</a> */}
                            </div>
                            <div className="btnn-main">
                              <button
                                className="btn btn-black mb_8"
                                type="button"
                                onClick={() => {
                                  // setFiles([]);
                                }}
                              >
                                Upload File
                              </button>
                            </div>
                          </div>
                          {/* <button className="btn btn-blue" onClick={() => setFiles([])}>
                            Cancel
                          </button> */}
                        </>
                      ) : (
                        <>
                          <div className="myprofile_inner_sec2_img_upload">
                            <img
                              src={getsingleStoreData2.store_logo_path}
                              style={{
                                width: "100%",
                                height: "100%",
                                filter: "grayscale(100%)",
                              }}
                              className="img-fluidb"
                            />
                          </div>
                          <div className="btnn-main" style={{ width: "100%" }}>
                            <button
                              className="btn btn-black mb_8"
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
                    alingitem: "center",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                  }}
                >
                  <button
                    className="btn"
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
            <p className="upload_img_instr">
              All Brand logo’s to be uploaded <br />
              in black and white format <br />
              (no colour logo’s)
            </p>
            {/* upload images wrapp start */}
            <div className="mm_img_upload_wrapp" style={{ width: "100%" }}>
              {/* single upload image */}
              <div className="img-upl-border">
                <div
                  className="myprofile_inner_sec2"
                  {...getRootBannerProps()}
                  style={{
                    border: "none",
                    paddingBottom: "0px",
                    maxWidth: "250px",
                  }}
                >
                  <input
                {...getInputBannerProps()}
                accept="image/jpeg, image/jpg, image/png, image/eps" style={{display:"none"}}
              />
                  <h5
                    style={{
                      marginBottom: "10px",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Upload black and white <br />
                    Brand banner <br /> (1050 x 284 pixels) <br /> (max 200kb)
                    <span className="star_require">*</span>
                  </h5>
                  {getcondition2 === true ? (
                    <>
                      {files2 && files2.length > 0 ? (
                        <div className="myprofile_inner_sec2_img_upload">
                          {thumbs2}
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
                            <input
                              {...getRootBannerProps()}
                              accept="image/jpeg, image/jpg, image/png, image/eps" style={{display:"none"}}
                            />
                            <button
                              type="button"
                              className="click_upload_btn"
                              style={{ marginBottom: "10px" }}
                            >
                              click here
                            </button>
                            {/* <a href="">clicking here</a> */}
                          </div>
                          <div className="btnn-main">
                            <button
                              className="btn btn-black mb_8"
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
                      {getsingleStoreData2.store_banner_path === null ? (
                        <>
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
                              <input
                                {...getRootBannerProps()}
                                accept="image/jpeg, image/jpg, image/png, image/eps" style={{display:"none"}}
                              />
                              <button
                                type="button"
                                className="click_upload_btn"
                                style={{ marginBottom: "10px" }}
                              >
                                click here
                              </button>
                              {/* <a href="">clicking here</a> */}
                            </div>
                            <div className="btnn-main">
                              <button
                                className="btn btn-black mb_8"
                                type="button"
                                onClick={() => {
                                  // setFiles([]);
                                }}
                              >
                                Upload File
                              </button>
                            </div>
                          </div>
                          {/* <button className="btn btn-blue" onClick={() => setFiles([])}>
                            Cancel
                          </button> */}
                        </>
                      ) : (
                        <>
                          <div className="myprofile_inner_sec2_img_upload">
                            <img
                              src={getsingleStoreData2.store_banner_path}
                              style={{ width: "100%", height: "100%" }}
                              alt=""
                              className="img-fluidb"
                            />
                          </div>
                          <div className="btnn-main" style={{ width: "100%" }}>
                            <button
                              className="btn btn-black mb_8"
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
                    alingitem: "center",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                  }}
                >
                  <button
                    className="btn"
                    onClick={() => setFiles2([])}
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
          </div>
        </div>
        {/* <div className="signup_terms_wrapp indep-side-show">
          <input
              type="checkbox"
              value={retailerType}
              onChange={handleTermChange}
          // checked={retailerType}
          />
          {retailerType == 1 ? <p className="fs-des ">
              Independed Retailer
             
          </p> : <p>Group Retailer</p>}

      </div> */}

        <div className="signup_terms_wrapp indep-side-show">
            <input
                type="checkbox"
                value={isAcceptTerm}
                onChange={handleTermChange2}
                checked={isAcceptTerm}
            />

            <p className="fs-des" style={{ fontWeight: "400", fontSize: "14px" }}>
                I have read and agree to the{" "}
                <a className="signup_terms_link">Privacy Policy</a>
            </p>
        </div>
        <div
            className="signup_terms_wrapp indep-side-show"
            style={{ marginTop: "-12px" }}
        >
            <input
                type="checkbox"
                value={isAcceptTerm2}
                onChange={handleTermChange3}
                checked={isAcceptTerm2}
            />

            <p className="fs-des" style={{ fontWeight: "400", fontSize: "14px" }}>
                I have read and agree to the{" "}
                <a className="signup_terms_link">Terms and Conditions</a>{" "}
            </p>
        </div>
        {/* text-area sec end */}
        <div className="mm_form_single_input brand-resp-show-btn">
            <button
                className="btn btn-black"
                onClick={() => AddStoreNallData()}
                disabled={isAcceptTerm == 1 && isAcceptTerm2 == 1 ? false : true}
                style={{ width: "200px" }}
            >
                Submit
            </button>
        </div>
        {/* mall management form end */}
    </div>
</>
  );
};

export default EditRetailerBrand;
