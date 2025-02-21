import React, { useEffect, useState } from "react";
import "./LeaderBoardCard.css";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Link } from "react-router-dom";
import images from "../../constants/images";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { BsChevronDown } from "react-icons/bs";
import { useStoreContext } from "../../context/store_context";
import ReactModal from "react-modal";
import { useMallContext } from "../../context/mall_context";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";

import {
  ACCEPT_HEADER,
  add_store_cart,
  get_region_mall,
  get_region_mall_leaderboard_count,
} from "../../utils/Constant";
import { BiSearch } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Notification from "../../utils/Notification";
import { DateRangePicker } from "rsuite";

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

const EmptyLeaderBoardCard = ({
  item,
  mindx,
  getLeaderboard,
  setTab,
  peopleInfo,
  setPeopleInfo,

  getweek,
}) => {
  const eateryvalue = JSON.parse(localStorage.getItem("iseatery"));

  const { get_brand_data, get_mall_data } = useMallContext();
  const {
    retailer_data,
    getRetailerApi,
    week_data,
    getStoreCartApi,
    CreateLeaderBoardApi,
  } = useStoreContext();

  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [BrandName, setBrandName] = useState("");
  const [BrandId, setBrandId] = useState("");
  const [MallName, setMallName] = useState("");
  const [MallId, SetMaillId] = useState("");
  const [Category, setCategory] = useState("");
  const [CategoryId, setCategoryId] = useState("");
  const [Week, setWeek] = useState("");
  const [weekname, SetWeekName] = useState("");
  const [weekname1, SetWeekName1] = useState("");
  const [weekname2, SetWeekName2] = useState("");
  const [Region, setRegion] = useState([]);
  const [mallsOption, setMallsOption] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  const { allowedMaxDays, beforeToday, combine } = DateRangePicker;

  const [getSearchQuery, setSearchQuery] = useState("");
  const [getFilterData, setFilterData] = useState("");

  const SearchFilter = (text) => {
    setSearchQuery(text);

    const searchText = text.toLowerCase();
    const newData = getregion_array.filter((item) => {
      const regionName = item.region_name.toLowerCase();
      const mallMatch = item.malls.some((mall) =>
        mall.name.toLowerCase().includes(searchText)
      );

      return regionName.includes(searchText) || mallMatch;
    });

    setFilterData(newData);
  };

  useEffect(() => {
    // getBrand(item.stores.retailer_id);
    // GetRegion();
  }, []);

  const {
    deleteLeaderBoardApi,
    UpdateLeaderBoardApi,
    category_data,
    category_eatery_data,
    multiple_week_data,
    getCategoryEateryApi,
    getCategoryApi,
  } = useStoreContext();

  const { getBrand } = useMallContext();

  const [getcondation, SetCondation] = useState(false);

  const handleDateChange = (startDate, endDate) => {
    if ((startDate && endDate !== "") || (startDate && endDate !== null)) {
      SetWeekCondation(true);
    } else {
      SetWeekCondation(false);
    }
    setSelectedDates({ startDate, endDate });
  };

  const { getRootProps: getRootlogoProps, getInputProps: getInputlogoProps } =
    useDropzone({
      onDrop: async (acceptedFiles) => {
        SetCondation(true);

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

            return isDimensionsValid ? file : null; // Return file if dimensions are valid, otherwise skip it
          })
        );

        // Filter out null values (files that were skipped)
        const validFiles = filteredFiles.filter((file) => file !== null);

        setFiles(
          validFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );

        if (validFiles.length !== acceptedFiles.length) {
          Notification(
            "error",
            "Error!",
            "Some files exceed the maximum size limit of 200KB or do not meet the dimension requirements of 1050x284 pixels and will not be uploaded."
          );
        }

        if (acceptedFiles.length === 0) {
          window.location.reload(true);
        }
      },
    });

  const thumbs = files.map((file) => (
    <img
      src={file.preview}
      style={{ width: "100%", height: "100%" }}
      className="img-fluidb"
      alt="file"
    />
  ));

  const [getweekcondation, SetWeekCondation] = useState(false);

  useEffect(()=>{
    if(eateryvalue == 1){
      getCategoryEateryApi();
    }else{
      getCategoryApi();
  
    }
  },[])

  useEffect(() => {
    if (selectedDates.startDate && selectedDates.endDate) {
      DateWisreMall();
    }
  }, [selectedDates]);

  const DateWisreMall = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    const { startDate, endDate } = selectedDates;

    console.log("function called");

    if (startDate == "" || startDate == undefined) {
      Notification("error", "Error", "Please Enter Start Date");
      return;
    } else if (endDate == "" || endDate == undefined) {
      Notification("error", "Error", "Please Enter End Date");
    } else {
      console.log("check else part");

      const formdata = await new FormData();
      await formdata.append(
        "from_date",
        moment(startDate[0]).format("YYYY-MM-DD")
      );
      await formdata.append(
        "to_date",
        moment(startDate[1]).format("YYYY-MM-DD")
      );

      console.log("formdata", formdata);

      try {
        const response = await axios.post(get_region_mall_leaderboard_count, formdata, {
          headers: {
            Accept: ACCEPT_HEADER,
            Authorization: "Bearer " + token,
          },
        });

        if (response.data.success == 1) {
          console.log("api called successfully");
          SetRigion_Array(response.data.data);
        }
        return response.data;
      } catch (error) {
        console.log("error11", error);


      }
    };
  }

  const CreateLeaderBoardBanner = async () => {
    const { startDate, endDate } = selectedDates;

    if (title == "" || undefined) {
      Notification("error", "Error!", "Please Enter Title!");
      return;
    } else if (mallidarray == "" || undefined) {
      Notification("error", "Error!", "Please Select Mall!");
    } else if (regionidarray == "" || undefined) {
      Notification("error", "Error!", "Please Select Region!");
    } else if (startDate == "" || startDate == undefined) {
      Notification("error", "Error", "Please Enter Start Date");
      return;
    } else if (endDate == "" || endDate == undefined) {
      Notification("error", "Error", "Please Enter End Date");
      return;
    } else if (Category == "" || undefined) {
      Notification("error", "Error!", "Please Select Category!");
    } else if (files == "" || undefined) {
      Notification("error", "Error", "Please Upload Image");
      return;
    } else {
      const formdata = await new FormData();

      await formdata.append("title", title);

      for (var i = 0; i < mallidarray.length; i++) {
        await formdata.append("mall_id[" + i + "]", mallidarray[i].id);
        await formdata.append("region_id[" + i + "]", mallidarray[i].reid);
      }

      await formdata.append("category_id", Category);

      await formdata.append(
        "from_date",
        moment(startDate[0]).format("YYYY-MM-DD")
      );
      await formdata.append(
        "to_date",
        moment(startDate[1]).format("YYYY-MM-DD")
      );

      if (files[0] !== undefined) {
        await formdata.append("image", files[0]);
      }

      const data = await CreateLeaderBoardApi(formdata);
      if (data) {
        if (data.success === 1) {
          Notification(
            "success",
            "Success!",
            "Leaderboard Added Successfully!"
          );
          setTab(3);
          getLeaderboard();
          getStoreCartApi();
        } else if (data.success === 0) {
          Notification("error", "Error!", data.message);
        }
      }
    }
  };

  const Addtocart = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    const formdata = await new FormData();
    await formdata.append("qty", 1);
    await formdata.append("leaderboard_banner_id", item.id);

    axios
      .post(add_store_cart, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success == 1) {
          getLeaderboard();
          getStoreCartApi();
          Notification("success", "Success!", "Add to cart Successfully!");
        } else if (res.data.success == 0) {
          Notification("error", "Error!", res.data.message);
        }
      })
      .catch((err) => {
        console.log("err11", err);
      });
  };

  const [mallMolalOpen, setMallModalIsOpen] = useState(false);
  function closeMallModal() {
    setMallModalIsOpen(false);
  }
  function openMallModal() {
    setMallModalIsOpen(true);
  }

  const [gettrue, SetTrue] = useState(false);

  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedMalls, setSelectedMalls] = useState([]);

  const [mallidarray, SetMallidarray] = useState([]);
  const [regionidarray, SetRegionidarray] = useState([]);

  const handleMallChange = (
    checked,
    mallName,
    mallId,
    regionId,
    regionName
  ) => {
    const updatedSelectedMalls = checked
      ? [...selectedMalls, mallName]
      : selectedMalls.filter((name) => name !== mallName);
    const updatedMallIdArray = checked
      ? [...mallidarray, { id: mallId, reid: regionId }]
      : mallidarray.filter((mall) => mall.id !== mallId);

    setSelectedMalls(updatedSelectedMalls);
    SetMallidarray(updatedMallIdArray);

    updateSelectedRegions(regionId, regionName, updatedSelectedMalls);
  };

  const updateSelectedRegions = (
    regionId,
    regionName,
    updatedSelectedMalls
  ) => {
    const mallsInRegion = getregion_array
      .find((region) => region.region_id === regionId)
      .malls.map((mall) => mall.name);

    const isAnyMallSelected = mallsInRegion.some((mall) =>
      updatedSelectedMalls.includes(mall)
    );

    const updatedSelectedRegions = isAnyMallSelected
      ? [...selectedRegions, regionName]
      : selectedRegions.filter((name) => name !== regionName);
    const updatedRegionIdArray = isAnyMallSelected
      ? [...regionidarray, { id: regionId }]
      : regionidarray.filter((region) => region.id !== regionId);

    setSelectedRegions([...new Set(updatedSelectedRegions)]);
    SetRegionidarray(
      [...new Set(updatedRegionIdArray.map((region) => region.id))].map(
        (id) => ({ id })
      )
    );
  };

  const [getregion_array, SetRigion_Array] = useState([]);

  // const GetRegion = async () => {
  //   const token = JSON.parse(localStorage.getItem("is_token"));

  //   axios
  //     .get(get_region_mall, {
  //       headers: {
  //         Accept: ACCEPT_HEADER,
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.success == 1) {
  //         SetRigion_Array(res.data.data);
  //       } else {
  //         null;
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("err11", err);
  //     });
  // };

  const [toggle, setToggle] = useState(null);

  return (
    <>
      <div className="leaderboard-card-main-wrapp">
        <div className="leaderboard-card-flex-wrapp leaderboard-card-flex-wrapp-half">
          <div className="leaderboard-card-first-resp-main-wrapp">
            <p className="leaderboard-last-part-txt"></p>
            <button className="leaderboard-delete-icon-btn">
              cancel{" "}
              <img
                alt=""
                src={images.delete_icon}
                className="leaderboard-delete-icon"
              />
            </button>
          </div>

          <div className="leaderboard-card-part-first ">
            <div className="leaderboard-card-inpbox-wrapp">
              <label className="leaderboard-card-lbl">
                Title:<span className="star_require">*</span>
              </label>
              <input
                type="text"
                className="leaderboard-card-inp"
                placeholder="Add Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="leaderboard-card-inpbox-wrapp">
            <label className="leaderboard-card-lbl" htmlFor="">
              Week
            </label>
            {/* <input
              type="date"
              value={eventEndDate}
              onChange={(e) => setEventEndDate(e.target.value)}
              name=""
              id=""
              className="input_box"
            /> */}
            <DateRangePicker
              style={{ color: "#111" }}
              oneTap
              hoverRange="week"
              isoWeek
              placeholder="Select your Week"
              className="leaderboard-card-inp DateRangePicker_LeaderboardCard"
              onChange={handleDateChange}
              disabledDate={combine(allowedMaxDays(7), beforeToday())}
            />
            {/* <DatePicker
                            selected={startDate}
                            onChange={onDateChage}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            monthsShown={2}
                            minDate={startDate} 
                            maxDate={maxDate}   
                            calendarStartDay={1}
                            className="leaderboard-card-inp"
                            placeholderText="Select your week"
                        /> */}
            {/* <DatePicker
                            selected={startDate}
                            onChange={handleDateChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            minDate={today}
                            maxDate={oneWeekLater}
                            monthsShown={2}
                            calendarStartDay={1}
                            className="leaderboard-card-inp"
                            placeholderText="Select your week"
                        /> */}

            {/* <DatePicker
                            placeholder='Week picker'
                            isoWeek
                            // showWeekNumbers
                            value={objWeek.date}
                            onChange={onChange}
                            renderValue={renderValue}
                        /> */}
          </div>

          {/* Leaderboard inputbox start */}
          <div className="leaderboard-card-inpbox-wrapp">
            <label className="leaderboard-card-lbl">Mall(s):</label>
            <div
              onClick={() => openMallModal()}
              className="leaderboard-card-inp"
              style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}
            >
              {/* {selectedMalls && selectedMalls.length > 0
                ? selectedMalls.map((mall, mindx) => {
                    return <p className="mall-lib-font">{mall}</p>;
                  })
                : null} */}
                {selectedMalls && selectedMalls.length > 0
                      ? selectedMalls.map((mall, mindx) => {
                        return (
                          <p className="mall-lib-font" key={mindx}>
                            {mall}
                            {mindx !== selectedMalls.length - 1 ? "," : ""}
                          </p>
                        );
                      })
                      : null}
            </div>
           
          </div>

            <div className="leaderboard-card-inpbox-wrapp">
              <label className="leaderboard-card-lbl">
                Categories:<span className="star_require">*</span>
              </label>
              <div className="select-wrapper" style={{ width: "100%" }}>
                <select
                  className="leaderboard-card-inp cons_select_nav"
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setCategoryId(e.target.value);
                  }}
                >
                  <option selected disabled value="">
                    Select Category
                  </option>
                  {eateryvalue == 1 ? (
                    <>
                      {category_eatery_data &&
                        category_eatery_data.map((item, index) => {
                          return (
                            <>
                              <option value={item.id} key={index}>
                                {item.name}
                              </option>
                            </>
                          );
                        })}
                    </>
                  ) : (
                    <>
                      {category_data &&
                        category_data.map((item, index) => {
                          return (
                            <>
                              <option value={item.id} key={index}>
                                {item.name}
                              </option>
                            </>
                          );
                        })}
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className="leaderboard-card-part-sec" {...getRootlogoProps()}>
            <input
              {...getInputlogoProps()}
              accept="image/jpeg, image/jpg, image/png, image/eps"
            />
            {/* <div className="myprofile_inner_sec2"> */}
            {getcondation === true ? (
              <>
                {files && files.length > 0 ? (
                  <div className="myprofile_inner_sec2_img_upload leaderboard-card-part-img-upl myprofile_inner_sec2_img_upload_border">
                    {thumbs}
                  </div>
                ) : (
                  <div style={{ width: "100%" }}>
                    <div className="leaderboard-card-part-sec2">
                      <AiOutlineCloudUpload
                        style={{
                          width: "60px",
                          height: "60px",
                          color: "var(--color-orange)",
                          marginBottom: "10px",
                        }}
                      />
                      <h4>.JPG .PNG (1050x284 pixels)</h4>
                      <p>(max 200kb)</p>
                      <p>You can also upload file by</p>

                      <button
                        type="button"
                        className="click_upload_btn"
                        style={{
                          marginBottom: "10px",
                          color: "var(--color-orange)",
                          fontWeight: "600",
                        }}
                      >
                        click here
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div style={{ width: "100%" }}>
                  <div className="leaderboard-card-part-sec2">
                  <AiOutlineCloudUpload
                        style={{
                          width: "60px",
                          height: "60px",
                          color: "var(--color-orange)",
                          marginBottom: "10px",
                        }}
                      />
                      <h4>.JPG .PNG  (1050x284 pixels)</h4>
                      <p>(max 200kb)</p>
                      <p>You can also upload file by</p>

                      <button
                        type="button"
                        className="click_upload_btn"
                        style={{
                          marginBottom: "10px",
                          color: "var(--color-orange)",
                          fontWeight: "600",
                        }}
                      >
                        click here
                      </button>
                    {/* <a href="">clicking here</a> */}
                  </div>
                </div>
              </>
            )}

            {/* </div> */}
          </div>

          <div className="leaderboard-card-part-third leaderboard-card-part-third-half">
            <button className="leaderboard-delete-icon-btn"></button>
            <p className="leaderboard-last-part-txt">
              {/* Service fee will apply if canceled */}
            </p>
            <div className="leaderboard-btn-box">
              <button
                style={{ padding: "0.4rem", fontSize: "16px" }}
                className="btn btn-black"
                onClick={() => {
                  alert("First Update After Add to Cart");
                }}
              >
                Add To Cart
              </button>
            </div>

            <div className="leaderboard-btn-box">
              <button
                className="btn btn-orange"
                onClick={() => {
                  CreateLeaderBoardBanner();
                }}
              >
                Update
              </button>
            </div>
          </div>

          <div
            className="leaderboard-card-sec-resp-main-wrapp"
            style={{ alignItems: "flex-end", gap: "1rem" }}
          >
            <div className="leaderboard-btn-box">
              <button
                className="btn btn-black"
                style={{ width: "165px" }}
                onClick={() => {
                  alert("First Update After Add to Cart");
                }}
              >
                Add To Cart
              </button>
            </div>
            <div className="leaderboard-btn-box">
              <button
                className="btn btn-orange"
                style={{ width: "165px" }}
                onClick={() => {
                  CreateLeaderBoardBanner();
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <ReactModal
        isOpen={mallMolalOpen}
        onRequestClose={closeMallModal}
        style={customStyles}
      >
        <div className="select_mall_main_wrapp">
          <div className="select_mall_base_wrapp">
            {/* mall heading */}
            <p className="select_mall_heading">
              Select the malls that your brand features in:
            </p>

            <div className="select_mall_serch_wrapp">
              <input
                type="text"
                placeholder="Search"
                className="input_box"
                value={getSearchQuery}
                onChange={(e) => SearchFilter(e.target.value)}
              />
              <BiSearch
                className="select_mall_search_icon"
                size={25}
                color="var(--color-orange)"
              />
            </div>

            <div className="select_mall_tag_btns_wrapp">
              {selectedMalls && selectedMalls.length > 0
                ? selectedMalls.map((mall, mindx) => {
                  return (
                    <button
                      className="select_mall_tag_single_btn"
                      style={{ backgroundColor: "#4FBB10" }}
                      key={mindx}
                    >
                      {mall}
                    </button>
                  );
                })
                : null}
            </div>

            <div className="mall_Select_wrapp">
              <p
                style={{
                  fontSize: "18px",
                  alignSelf: "start",
                  marginBottom: "1rem",
                }}
              >
                Region
              </p>

              {getSearchQuery ? <>

                {getFilterData && getFilterData.length > 0
                  ? getFilterData.map((item) => {
                    const isRegionSelected = selectedRegions.includes(
                      item.region_name
                    );

                    return (
                      <div
                        className="bim_accordian_wrapp"
                        style={{ marginBottom: "6px" }}
                        key={item.region_id}
                      >
                        <button
                          className="bim_accordian_btn"
                          onClick={() => setToggle(item.region_id)}
                        >
                          <p
                            style={{
                              color: isRegionSelected ? "#ff8b00" : "#000",
                              fontWeight: isRegionSelected ? "500" : "300",
                            }}
                          >
                            {item.region_name}
                          </p>

                          {item.region_id === toggle ? (
                            <IoIosArrowUp size={20} color="#ff8b00" />
                          ) : (
                            <IoIosArrowDown size={20} />
                          )}
                        </button>
                        {item.region_id === toggle && (
                          <div className="bim_accordian_mall_wrapp">
                            {item.malls.map((itm) => (
                              <div
                                key={itm.id}
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  marginLeft: "10px",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedMalls.includes(itm.name)}
                                  onChange={(e) =>
                                    handleMallChange(
                                      e.target.checked,
                                      itm.name,
                                      itm.id,
                                      item.region_id,
                                      item.region_name
                                    )
                                  }
                                />
                                <label htmlFor={itm.id}>{itm.name}</label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                  : null}
              </> : <>
                {getregion_array && getregion_array.length > 0
                  ? getregion_array.map((item) => {
                    const isRegionSelected = selectedRegions.includes(
                      item.region_name
                    );

                    return (
                      <div
                        className="bim_accordian_wrapp"
                        style={{ marginBottom: "6px" }}
                        key={item.region_id}
                      >
                        <button
                          className="bim_accordian_btn"
                          onClick={() => setToggle(item.region_id)}
                        >
                          <p
                            style={{
                              color: isRegionSelected ? "#ff8b00" : "#000",
                              fontWeight: isRegionSelected ? "500" : "300",
                            }}
                          >
                            {item.region_name}
                          </p>

                          {item.region_id === toggle ? (
                            <IoIosArrowUp size={20} color="#ff8b00" />
                          ) : (
                            <IoIosArrowDown size={20} />
                          )}
                        </button>
                        {item.region_id === toggle && (
                          <div className="bim_accordian_mall_wrapp">
                            {item.malls.map((itm) => (
                              <div
                                key={itm.id}
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  marginLeft: "10px",
                                  position: "relative", // Positioning context for the overlay
                                }}
                              >
                                <input
                                  type="checkbox"
                                  id={itm.id}
                                  disabled={itm.booked_count === "0 Available."}
                                  checked={selectedMalls.includes(itm.name)}
                                  onChange={(e) =>
                                    handleMallChange(
                                      e.target.checked,
                                      itm.name,
                                      itm.id,
                                      item.region_id,
                                      item.region_name
                                    )
                                  }
                                />
                                <label htmlFor={itm.id}>{itm.name} <span style={{color:"var(--color-orange)",fontWeight:"600"}}>{itm.booked_count}</span></label>

                                {/* Overlay div */}
                                {itm.booked_count === "0 Available." && (
                                  <div
                                    onClick={() => {
                                      alert("This week's limit of this mall has been completed, select another date.");
                                    }}
                                    style={{
                                      position: "absolute",
                                      top: 0,
                                      left: 0,
                                      right: 0,
                                      bottom: 0,
                                      backgroundColor: "transparent",
                                      cursor: "pointer", // Show pointer cursor
                                      zIndex: 1, // Ensure it is above the checkbox
                                    }}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        )}




                      </div>
                    );
                  })
                  : <p style={{color:"var(--color-orange)",fontWeight:"600"}}>Please select first date.</p>}
              </>}

            </div>

            <div className="leaderboard-btn-box">
              <button
                className="btn btn-orange"
                onClick={() => {
                  closeMallModal();
                  SetTrue(true);
                  setSearchQuery("");
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default EmptyLeaderBoardCard;
