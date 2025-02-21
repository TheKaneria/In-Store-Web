import React, { useEffect, useState } from "react";
import "./ProductTilesCard.css";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import images from "../../constants/images";
import "react-datepicker/dist/react-datepicker.css";
import { useMallContext } from "../../context/mall_context";
import { useStoreContext } from "../../context/store_context";
import Notification from "../../utils/Notification";
import { HiPencilSquare } from "react-icons/hi2";
import axios from "axios";
import {
  ACCEPT_HEADER,
  add_store_cart,
  get_region_mall,
} from "../../utils/Constant";
import { BiSearch } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ReactModal from "react-modal";
import moment from "moment";
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

const EmptyProductTilesCard = ({
  item,
  setTab,
  getweek,
  getregion_array,
  getProductTiles,
}) => {
  const eateryvalue = JSON.parse(localStorage.getItem("iseatery"));

  const {
    DeleteProductTileApi,
    category_data,
    UpdateProductTilesApi,
    category_eatery_data,
    getStoreCartApi,
    CreateProductTileApi,
  } = useStoreContext();

  const [files, setFiles] = useState([]);
  const [filesqr, setFilesQr] = useState([]);
  const [title, setTitle] = useState("");
  const [BrandName, setBrandName] = useState("");
  const [MallName, setMallName] = useState("");
  const [Category, setCategory] = useState("");
  const [Price, setPrice] = useState("");
  const [Description, setDiscription] = useState("");
  const [CategoryId, setCategoryId] = useState("");
  const [BrandId, setBrandId] = useState("");
  const [mallid, SetMaillId] = useState("");
  const [weekname, SetWeekName] = useState("");
  const [weekname1, SetWeekName1] = useState("");
  const [weekname2, SetWeekName2] = useState("");
  const [getTag, setTag] = useState("");
  const [size, setSize] = useState("");
  const [qrDiscount, setQrDiscount] = useState("");

  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  const { allowedMaxDays, beforeToday, combine } = DateRangePicker;

  const { get_brand_data, get_mall_data } = useMallContext();

  const [getcondition, setCondition] = useState(false);
  const [getcondition2, setCondition2] = useState(false);

  const { getRootProps: getRootlogoProps, getInputProps: getInputlogoProps } =
    useDropzone({
      onDrop: async (acceptedFiles) => {
        setCondition(true);

        const maxSizeKB = 50;
        const maxSizeBytes = maxSizeKB * 1024;

        const filteredFiles = await Promise.all(
          acceptedFiles.map(async (file) => {
            const isSizeValid = file.size <= maxSizeBytes; // Limit size to 50KB (in bytes)
            const isImage = file.type.startsWith("image/"); // Check if it's an image file

            if (!isImage || !isSizeValid) {
              return null;
            }

            const img = new Image();
            img.src = URL.createObjectURL(file);
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
            });

            const isDimensionsValid = img.width == 354 && img.height == 350;

            return isDimensionsValid ? file : null; // Return file if dimensions are valid, otherwise skip it
          })
        );

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
            "Some files exceed the maximum size limit of 50KB or do not meet the dimension requirements of 354x350 pixels and will not be uploaded."
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

  const {
    getRootProps: getRootlogoPropsQr,
    getInputProps: getInputlogoPropsQr,
  } = useDropzone({
    onDrop: async (acceptedFiles) => {
      setCondition2(true);

      const maxSizeKB = 50; // Maximum size limit in KB
      const maxSizeBytes = maxSizeKB * 1024; // Convert KB to bytes

      const filteredFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          const isSizeValid = file.size <= maxSizeBytes; // Limit size to 50KB (in bytes)
          const isImage = file.type.startsWith("image/"); // Check if it's an image file

          if (!isImage || !isSizeValid) {
            return null; // Skip files that are not images or exceed size limit
          }

          const img = new Image();
          img.src = URL.createObjectURL(file);
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });

          // Check image dimensions
          const isDimensionsValid = img.width == 150 && img.height == 150;

          return isDimensionsValid ? file : null; // Return file if dimensions are valid, otherwise skip it
        })
      );

      // Filter out null values (files that were skipped)
      const validFiles = filteredFiles.filter((file) => file !== null);

      setFilesQr(
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
          "Some files exceed the maximum size limit of 50KB or do not meet the dimension requirements of 150x150 pixels and will not be uploaded."
        );
      }

      if (acceptedFiles.length === 0) {
        window.location.reload(true);
      }
    },
  });

  const thumbsqr = filesqr.map((file) => (
    <img
      src={file.preview}
      style={{ width: "100%", height: "100%" }}
      className="img-fluidb"
      alt="file"
    />
  ));

  const handleDateChange = (startDate, endDate) => {
    if ((startDate && endDate !== "") || (startDate && endDate !== null)) {
      SetWeekCondation(true);
    } else {
      SetWeekCondation(false);
    }
    setSelectedDates({ startDate, endDate });
  };

  const [getweekcondation, SetWeekCondation] = useState(false);

  const AddProductTilesBanner = async () => {
    const { startDate, endDate } = selectedDates;

    if (title == "" || undefined) {
      Notification("error", "Error!", "Please Enter Title!");
      return;
    } else if (mallidarray == "" || undefined) {
      Notification("error", "Error!", "Please Select Mall!");
      return;
    } else if (Category == "" || undefined) {
      Notification("error", "Error!", "Please Select Category!");
    } else if (Price == "" || undefined) {
      Notification("error", "Error!", "Please Enter Price!");
      return;
    } else if (Description == "" || undefined) {
      Notification("error", "Error!", "Please Enter Description!");
      return;
    } else if (getTag == "" || undefined) {
      Notification("error", "Error!", "Please  Enter Tag!");
    } else if (startDate == "" || startDate == undefined) {
      Notification("error", "Error", "Please Enter Start Date");
      return;
    } else if (endDate == "" || endDate == undefined) {
      Notification("error", "Error", "Please Enter End Date");
      return;
    } else if (regionidarray == "" || undefined) {
      Notification("error", "Error!", "Please Select Region!");
    } else if (files == "" || undefined) {
      Notification("error", "Error!", "Please Upload image!");
    }  else if (filesqr.length > 0 && qrDiscount === "") {
      Notification("error", "Error!", "Please Enter Discount QR Code!");
    }
    
    else if (filesqr.length <=0 && qrDiscount !== "") {
      Notification("error", "Error!", "Please Upload QR Code Image !");
    } else {
      const formdata = await new FormData();

      await formdata.append("title", title);
      await formdata.append("qr_discount", qrDiscount);

      for (var i = 0; i < mallidarray.length; i++) {
        await formdata.append("mall_id[" + i + "]", mallidarray[i].id);
        await formdata.append("region_id[" + i + "]", mallidarray[i].reid);
      }

      await formdata.append("category_id", Category);
      await formdata.append("price", Price);
      await formdata.append("description", Description);
      await formdata.append("tag", getTag);
      await formdata.append("size", size);
      await formdata.append(
        "from_date",
        moment(startDate[0]).format("YYYY-MM-DD")
      );
      await formdata.append(
        "to_date",
        moment(startDate[1]).format("YYYY-MM-DD")
      );
      await formdata.append("region_child_id[0]", "");
      if (files[0] !== undefined) {
        await formdata.append("image", files[0]);
      }
      if (filesqr[0] !== undefined) {
        await formdata.append("qr_code_image", filesqr[0]);
      }

      const data = await CreateProductTileApi(formdata);
      if (data) {
        if (data.success === 1) {
          // ("category-data", data);
          Notification(
            "success",
            "Success!",
            "Product Tiles Added Successfully!"
          );

          setTab(6);
          getProductTiles();
          getStoreCartApi();
        } else if (data.success === 0) {
          Notification("error", "Error!", data.message);
        }
      }
    }
  };

  const [mallMolalOpen, setMallModalIsOpen] = useState(false);
  function closeMallModal() {
    setMallModalIsOpen(false);
  }
  function openMallModal() {
    setMallModalIsOpen(true);
  }

  const [getmallarray, SetMallArray] = useState([]);

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

  const [toggle, setToggle] = useState(null);

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

  return (
    <>
      <div className="leaderboard-card-main-wrapp product-tiles-card-main-wrapp product-tiles-card-main-wrapp_edit">
        <div className="leaderboard-card-flex-wrapp leaderboard-card-flex-wrapp_edit leaderboard-card-flex-wrapp_edit_position">
          <div className="leaderboard-card-first-resp-main-wrapp leaderboard-card-first-resp-main-wrapp_edit">
            <p className="leaderboard-last-part-txt"></p>
          </div>

          <div className="leaderboard-card-part-first leaderboard_card_part_first_Pro_tile_edit">
            <div className="leaderboard-card-inpbox-wrapp">
              <label
                className="leaderboard-card-lbl"
                style={{ minWidth: "125px" }}
              >
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
              <label
                className="leaderboard-card-lbl"
                style={{ minWidth: "125px" }}
              >
                Mall(s)<span className="star_require">*</span>:
              </label>
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
              <label
                className="leaderboard-card-lbl"
                style={{ minWidth: "125px" }}
              >
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
                    select category
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

            <div className="leaderboard-card-inpbox-wrapp">
              <label
                className="leaderboard-card-lbl"
                style={{ minWidth: "125px" }}
              >
                Price:<span className="star_require">*</span>
              </label>
              <div style={{ width: "100%" }}>
                <input
                  type="text"
                  className="leaderboard-card-inp"
                  placeholder="Rxxx"
                  value={Price}
                  onChange={(e) => {
                    const value = e.target.value;
                    const regex = /^\d*\.?\d{0,2}$/; // Updated regex to allow up to two decimal places
                    if (regex.test(value)) {
                      setPrice(value);
                    }
                  }}
                />
                <span style={{ fontSize: "14px", color: "#ccc" }}>
                  Don't add an 'R' before the value
                </span>
              </div>
            </div>

            <div className="leaderboard-card-inpbox-wrapp">
              <label
                className="leaderboard-card-lbl"
                style={{ minWidth: "125px" }}
              >
                Description:<span className="star_require">*</span>
              </label>
              <div style={{ width: "100%" }}>
                <textarea
                  style={{ height: "30px" }}
                  className="leaderboard-card-inp"
                  placeholder="Add Description"
                  value={Description}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 50) {
                      setDiscription(value);
                    } else {
                      alert("You cannot enter more than 50 characters.");
                    }
                  }}
                />
                <span style={{ fontSize: "14px", color: "#ccc" }}>
                  Limited To 50 Characters
                </span>
              </div>
            </div>

            <div className="leaderboard-card-inpbox-wrapp">
              <label
                className="leaderboard-card-lbl"
                style={{ minWidth: "125px" }}
              >
                Tags:<span className="star_require">*</span>
                <br />
                <span style={{ fontSize: "9px" }}>[seperated by commas]</span>
              </label>
              <textarea
                style={{ height: "60px" }}
                className="leaderboard-card-inp"
                placeholder="Add Tags"
                value={getTag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>

            <div className="leaderboard-card-inpbox-wrapp">
              <label
                className="leaderboard-card-lbl"
                style={{ minWidth: "125px" }}
              >
                Sizes:
              </label>
              <input
                style={{ height: "30px" }}
                className="leaderboard-card-inp"
                placeholder="XS, S, M, L, XL, XXL"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
                  
            <div className="leaderboard-card-inpbox-wrapp">
              <label
                className="leaderboard-card-lbl"
                htmlFor=""
                style={{ minWidth: "125px" }}
              >
                Duration:<span className="star_require">*</span>
              </label>

              <DateRangePicker
                oneTap
                hoverRange="week"
                isoWeek
                placeholder="Select your Week"
                className="leaderboard-card-inp DateRangePicker_LeaderboardCard"
                onChange={handleDateChange}
                disabledDate={combine(allowedMaxDays(7), beforeToday())}
              />
            </div>

            <div className="leaderboard-card-inpbox-wrapp">
              <label
                className="leaderboard-card-lbl"
                htmlFor=""
                style={{ minWidth: "125px" }}
              >
                Discount QR Code:
              </label>
              <input
                type="text"
                className="leaderboard-card-inp"
                placeholder="10% Discount"
                value={qrDiscount}
                onChange={(e) => setQrDiscount(e.target.value)}
              />
            </div>
            <div className="leaderboard-card-inpbox-wrapp">
              <label
                className="leaderboard-card-lbl"
                htmlFor=""
                style={{ minWidth: "125px" }}
              ></label>
              <div {...getRootlogoPropsQr()}>
                <button
                  className="btn btn_qr"
                  style={{
                    background: "var(--color-orange)",
                    color: "var(--color-white)",
                    position: "relative",
                  }}
                >
                  <input
                    {...getInputlogoPropsQr()}
                    accept="image/jpeg, image/jpg, image/png, image/eps"
                  />
                  Upload QR Code
                </button>

                <span
                  style={{
                    fontSize: "14px",
                    color: "#bbb",
                    alignSelf: "flex-start",
                    marginBottom: "0.7rem",
                  }}
                >
                  Supported Formats: jpeg, png.
                  <br /> (150 x 150 pixels (max 50kb))
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <div
              className="leaderboard-card-part-sec product-tiles-card-sec-part product_tile_card_img_sec"
              style={{ width: "200px", height: "200px" }}
              {...getRootlogoProps()}
            >
              <input
                {...getInputlogoProps()}
                accept="image/jpeg, image/jpg, image/png, image/eps"
              />
              {getcondition === true ? (
                <>
                  {files && files.length > 0 ? (
                    <div className="myprofile_inner_sec2_img_upload leaderboard-card-part-img-upl myprofile_inner_sec2_img_upload_border">
                      {thumbs}
                    </div>
                  ) : (
                    <div style={{ width: "100%" }}>
                      <div
                        className="leaderboard-card-part-sec2 product_tile_card_part_sec2"
                        style={{
                          textAlign: "center",
                          paddingLeft: "1.1rem",
                          paddingRight: "1.1rem",
                        }}
                      >
                        <AiOutlineCloudUpload
                          style={{
                            width: "60px",
                            height: "60px",
                            color: "var(--color-orange)",
                            marginBottom: "10px",
                          }}
                        />
                        <h4 style={{ fontSize: "14px" }}>
                          .JPG .PNG .GIF (354 x 350 pixels)
                        </h4>
                        <p style={{ fontSize: "14px" }}>(max 50kb)</p>
                        <p style={{ fontSize: "14px" }}>
                          You can also upload file by
                        </p>

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
                    <div
                      className="leaderboard-card-part-sec2"
                      style={{
                        paddingLeft: "1.1rem",
                        paddingRight: "1.1rem",
                        textAlign: "center",
                      }}
                    >
                      <AiOutlineCloudUpload
                        style={{
                          width: "60px",
                          height: "60px",
                          color: "var(--color-orange)",
                          marginBottom: "10px",
                        }}
                      />
                      <h4 style={{ fontSize: "14px" }}>
                        .JPG .PNG .GIF (354 x 350 pixels)
                      </h4>
                      <p style={{ fontSize: "14px" }}>(max 50kb)</p>
                      <p style={{ fontSize: "14px" }}>
                        You can also upload file by
                      </p>

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
            </div>
            <div
              className="leaderboard-card-part-sec product-tiles-card-sec-part product_tile_card_img_sec"
              style={{
                width: "200px",
                height: "200px",
              }}
            >
              <div
                className="product-tiles-card-sec-part product_tile_card_img_sec"
                style={{ width: "200px", height: "200px" }}
              >
                {getcondition2 === true ? (
                  <>
                    {filesqr && filesqr.length > 0 ? (
                      <div
                        className="myprofile_inner_sec2_img_upload leaderboard-card-part-img-upl myprofile_inner_sec2_img_upload_border"
                        style={{ border: "none" }}
                      >
                        {thumbsqr}
                      </div>
                    ) : (
                      <div style={{ width: "100%" }}>
                        <div
                          className="leaderboard-card-part-sec2"
                          style={{
                            paddingLeft: "0.3rem",
                            paddingRight: "0.3rem",
                            textAlign: "center",
                          }}
                        >
                          <AiOutlineCloudUpload
                            style={{
                              width: "60px",
                              height: "60px",
                              color: "var(--color-orange)",
                              marginBottom: "10px",
                            }}
                          />
                          <h4 style={{ fontSize: "14px" }}>
                            .JPG .PNG(150 x 150 pixels)
                          </h4>
                          <p style={{ fontSize: "14px" }}>(max 50kb)</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div style={{ width: "100%" }}>
                      <div
                        className="leaderboard-card-part-sec2"
                        style={{
                          paddingLeft: "0.3rem",
                          paddingRight: "0.3rem",
                          textAlign: "center",
                        }}
                      >
                        <AiOutlineCloudUpload
                          style={{
                            width: "60px",
                            height: "60px",
                            color: "var(--color-orange)",
                            marginBottom: "10px",
                          }}
                        />
                        <h4 style={{ fontSize: "14px" }}>
                          .JPG .PNG(150 x 150 pixels)
                        </h4>
                        <p style={{ fontSize: "14px" }}>(max 50kb)</p>
                        {/* <p style={{ fontSize: "14px" }}>
                      You can also upload file by
                    </p> */}

                        {/* <button
                      type="button"
                      className="click_upload_btn"
                      style={{ marginBottom: "10px",color:"var(--color-orange)",fontWeight:"600" }}
                    >
                      click here
                    </button> */}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div
            className="leaderboard-card-part-third leaderboard-card-part-third-half_tile"
            style={{ marginTop: item.cart_status == 1 ? "3rem" : "0rem" }}
          >
            <button className="leaderboard-delete-icon-btn"></button>
            <p className="leaderboard-last-part-txt"></p>

            <div className="leaderboard-btn-box">
              <button
                className="btn btn-orange"
                onClick={() => {
                  AddProductTilesBanner();
                }}
              >
                Update
              </button>
            </div>
          </div>

          <div className="leaderboard-card-sec-resp-main-wrapp  leaderboard-card-sec-resp-main-wrapp_pro_tilee_btn_main_edit">
            <div className="leaderboard-btn-box">
              <button
                style={{ width: "165px" }}
                className="btn btn-orange"
                onClick={() => {
                  AddProductTilesBanner();
                }}
              >
                Update
              </button>
            </div>
          </div>

          {item.cart_status == 1 ? (
            <>
              <div className="pro_tile_added_main">Added</div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <ReactModal
        isOpen={mallMolalOpen}
        onRequestClose={closeMallModal}
        style={customStyles}
      >
        <div className="select_mall_main_wrapp">
          <div className="select_mall_base_wrapp">
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

              {getSearchQuery ? (
                <>
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
                </>
              ) : (
                <>
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
                </>
              )}
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

export default EmptyProductTilesCard;
