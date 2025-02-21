import React, { useEffect, useState } from "react";
import "./AddLeaderBoardBanner.css";
import { Link } from "react-router-dom";
import images from "../../constants/images";
import { IoIosArrowDown, IoIosArrowUp, IoIosClose } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import ReactModal from "react-modal";
import { AddLeaderBoardCard, AddPromotionBannerCard } from "../../components";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useStoreContext } from "../../context/store_context";
import { ACCEPT_HEADER, get_region_mall } from "../../utils/Constant";
import axios from "axios";
import { IoChevronBack } from "react-icons/io5";
import CalenderTesting from "../../components/calender_testing/CalenderTesting";

const animatedComponents = makeAnimated();

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

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

const AccordionData = [
  {
    id: 1,
    city: "Western Cape",
    mall: [
      {
        id: 1,
        name: "Bayside Mall",
      },
      {
        id: 2,
        name: "Blue Route Mall",
      },
      {
        id: 3,
        name: "Boulevard Square",
      },
    ],
  },
  {
    id: 2,
    city: "KZN",
    mall: [
      {
        id: 1,
        name: "Brackenfell Centre",
      },
      {
        id: 2,
        name: "Brackenfell Corner",
      },
      {
        id: 3,
        name: "Brackenfell Shopping Centre",
      },
    ],
  },
  {
    id: 3,
    city: "Eastern Cape",
    mall: [
      {
        id: 1,
        name: "Canal Walk",
      },
      {
        id: 2,
        name: "Cape Quarter",
      },
      {
        id: 3,
        name: "Cape Gate",
      },
    ],
  },
  {
    id: 4,
    city: "Free State",
    mall: [
      {
        id: 1,
        name: "Delft Mall",
      },
      {
        id: 2,
        name: "De Ville Centre",
      },
      {
        id: 3,
        name: "Durbanville Town Centre",
      },
    ],
  },
];

const AddLeaderboardBanner = ({ get_mall_auth_data, setTab }) => {
  const [mallMolalOpen, setMallModalIsOpen] = useState(false);
  const [gatweek, setWeek] = useState("");
  const { getCategoryApi, getWeekApi,getCinemaCategoryApi } = useStoreContext();


  const { week_data } = useStoreContext();

  function closeMallModal() {
    setMallModalIsOpen(false);
  }

  function openMallModal() {
    setMallModalIsOpen(true);
  }

  const [toggle, setToggle] = useState(null);

  // let handleToggle = (id) => {
  //   if (toggle === id) {
  //     setToggle(null);
  //     return false;
  //   }
  //   setToggle(id);
  // };

  // select chackbox functionality
  const [peopleInfo, setPeopleInfo] = useState([]);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const handleCheckboxChange = (event, itm, ind) => {
    if (
      event.target.checked === true &&
      itm.region_id === toggle &&
      !peopleInfo.includes(itm.region_id)
    ) {
      // ("checked_true");

      setPeopleInfo([
        ...peopleInfo,
        {
          id: itm.id,
          name: itm.name,
          checked: event.target.checked,
          region_id: itm.region_id,
        },
      ]);
    } else {
      // ("checked_false");
      let result = peopleInfo.filter((item, key) => item.id != itm.id);
      setPeopleInfo(result);
    }
  };

  useEffect(() => {
    // GetRegion();
    getCinemaCategoryApi();
    getCategoryApi();
  }, []);

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
  //      console.log("err11", err);
  //     });
  // };

  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedMalls, setSelectedMalls] = useState([]);

  const [mallidarray, SetMallidarray] = useState([]);
  const [regionidarray, SetRegionidarray] = useState([]);

  // const handleRegionChange = (regionName, id) => {
  //   const updatedSelectedRegions = [...selectedRegions];
  //   const index = updatedSelectedRegions.indexOf(regionName);

  //   if (index > -1) {
  //     updatedSelectedRegions.splice(index, 1);
  //   } else {
  //     updatedSelectedRegions.push(regionName);
  //     regionidarray.push({ id: id });
  //   }

  //   setSelectedRegions(updatedSelectedRegions);
  // };

  // const handleMallChange = (mallName, id) => {
  //   const updatedSelectedMalls = [...selectedMalls];
  //   const index = updatedSelectedMalls.indexOf(mallName);

  //   if (index > -1) {
  //     updatedSelectedMalls.splice(index, 1);
  //   } else {
  //     updatedSelectedMalls.push(mallName);
  //     mallidarray.push({ id: id });
  //   }

  //   setSelectedMalls(updatedSelectedMalls);
  // };

  

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

  const [mainName, setMainName] = useState(
    get_mall_auth_data &&
      get_mall_auth_data &&
      get_mall_auth_data.name !== null
      ? get_mall_auth_data.name
      : ""
  );

  const [getSearchQuery, setSearchQuery] = useState("");
  const [getFilterData, setFilterData] = useState("");

  // const SearchFilter = (text) => {
  //   setSearchQuery(text);

  //   const searchText = text.toLowerCase();
  //   const newData = getregion_array.filter(item => {
  //     const itemName = item.region_name.toLowerCase();
  //     return itemName.includes(searchText);
  //   });

  //   setFilterData(newData);
  // };

  const SearchFilter = (text) => {
    setSearchQuery(text);
  
    const searchText = text.toLowerCase();
    const newData = getregion_array.filter(item => {
      const regionName = item.region_name.toLowerCase();
      const mallMatch = item.malls.some(mall => mall.name.toLowerCase().includes(searchText));
  
      // Return true if either the region name or any mall name matches the search text
      return regionName.includes(searchText) || mallMatch;
    });
  
    setFilterData(newData);
  };


  return (
    <div className="mm_main_wrapp">
      <div className="leaderboard-sub-wrapp" style={{ margin: "0px" }}>
        {/* LeaderBoard name start */}
        <div className="edit-brand-back-iconbox" onClick={() => setTab(3)}>
          <IoChevronBack className="edit-brand-back-icon" />{" "}
          <p className="edit-brand-back-txt">Back</p>
        </div>

        <div className="mall_name_wrapp mall_name_wrapp-spacebetween"  style={{paddingLeft:"0px"}}>
          <div className="leaderboard-inner-namebox">
            <p className="mall_name_heading">{mainName}:</p>
            <span className="leaderboard-span" style={{fontWeight:"600"}}>Add In Mall Leaderboard Banner</span>
          </div>
          {/* <button onClick={() => setTab(20)} className="leaderboard-btn">
                        Add new{" "}
                        <img src={images.add_new} className="leaderboard-btn-icon" />
                    </button> */}
        </div>
        <div className="mm_horizontal_line"></div>
        {/* LeaderBoard  name end */}

        {/* LeaderBoard subheading start */}

        <p className="leaderboard-sub-heading">
          Purchase marketing space through our Leaderboard Banner below
        </p>
      </div>
      {/* LeaderBoard subheading end */}

      {/* Add Leaderboard card start */}
      <AddLeaderBoardCard
        openMallModal={openMallModal}
        setTab={setTab}
        gatweek={gatweek}
        setWeek={setWeek}
        peopleInfo={peopleInfo}
        regionidarray={regionidarray}
        mallidarray={mallidarray}
        selectedMalls={selectedMalls}
        getregion_array={getregion_array}
        SetRigion_Array={SetRigion_Array}
      />
        <span style={{fontSize:"14px",color:"#bbb",alignSelf:"flex-start",marginBottom:"0.7rem"}}>*Required Fields including all image uploads.</span>

      {/* <CalenderTesting /> */}
      {/* Add Leaderboard card end */}
      {/* select mall modal start */}
      <ReactModal
        isOpen={mallMolalOpen}
        // onAfterOpen={afterOpenModal}
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
              {/* <input type="search" placeholder="Search" className="input_box" /> */}
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

            {/* <div
              className="leaderboard-card-inpbox-wrapp"
              style={{ alignItems: "center" }}
            >
              <label className="leaderboard-card-lbl">Slect Weeks:</label>
              <select
                className="leaderboard-card-inp"
                // value={MallName}
                onChange={(e) => {
                  setWeek(e.target.value);
                }}
              >
                <option selected disabled value="">
                  {weekname} {weekname1} {weekname2}
                </option>

                {week_data &&
                  week_data.map((item, index) => {
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
            </div> */}

            {/* mall selected tag */}
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
                                  disabled={itm.booked_count == "0 Available."}
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
                  : null}
              </>}


            </div>

            <div className="leaderboard-btn-box">
              <button
                className="btn btn-orange"
                onClick={() => {
                  closeMallModal();
                  // SetTrue(true);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </ReactModal>
      {/* select mall modal end */}
    </div>
  );
};

export default AddLeaderboardBanner;