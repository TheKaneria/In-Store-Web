import React, { useEffect, useState } from "react";
// import "./LeaderBoard.css";
import { Link } from "react-router-dom";
import images from "../../constants/images";
import {
  CinemaHero,
  CinemaLandingPageTileCard,
  CinemaLeaderBoardCrad,
  CinemaNavigationBar,
  LeaderBoardCard,
  RetailLandingPageTileCard,
  RetailerNavigationBar,
} from "../../components";
import ReactModal from "react-modal";
import { GrFormSearch } from "react-icons/gr";
import { BiSearch } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp, IoIosClose } from "react-icons/io";
import {
  ACCEPT_HEADER,
  dynamid_description,
  get_landingpagetile,
  get_region_mall,
} from "../../utils/Constant";
import { BsChevronDown } from "react-icons/bs";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useStoreContext } from "../../context/store_context";
import { useAuthContext } from "../../context/auth_context";
import axios from "axios";
import EmptyRetailLandingPageTileCard from "../../components/retailLandingPageTileCard/EmptyRetailLandingPageTileCard";
import ExtandCinemaLandingPageTileCard from "../../components/ExtandCinemaLandingPageTileCard/ExtandCinemaLandingPageTileCard";

// model style

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

const MyArchiveCineamaLandingpageTile = ({
  getsingleStoreData,
  get_mall_auth_data,
  getstore_is,
  setTab,
  gettab,
  getExtendId,
  setExtendId,
}) => {
  const [mallMolalOpen, setMallModalIsOpen] = useState(false);
  const [getweek, setWeek] = useState("");
  // const [mainName, setMainName] = useState(
  //   get_mall_auth_data &&
  //     get_mall_auth_data.retailers &&
  //     get_mall_auth_data.retailers.name !== null
  //     ? get_mall_auth_data.retailers.name
  //     : ""
  // );

  const { getCategoryApi, getWeekApi, getCinemaCategoryApi } =
    useStoreContext();

  function closeMallModal() {
    setMallModalIsOpen(false);
  }

  function openMallModal() {
    setMallModalIsOpen(true);
  }

  const [toggle, setToggle] = useState(null);
  let handleToggle = (id) => {
    if (toggle === id) {
      setToggle(null);
      return false;
    }
    setToggle(id);
  };

  // select chackbox functionality
  const [peopleInfo, setPeopleInfo] = useState([]);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  // const handleCheckboxChange = (event) => {
  //   setCheckboxChecked(event.target.checked);
  // };

  const handleCheckboxChange = (event, itm, ind) => {
    if (
      event.target.checked === true &&
      itm.region_id === toggle &&
      !peopleInfo.includes(itm.region_id)
    ) {
      //   ("checked_true");

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
      //   ("checked_false");
      let result = peopleInfo.filter((item, key) => item.id != itm.id);
      setPeopleInfo(result);
    }
  };

  useEffect(() => {
    GetRegion();
    getCategoryApi();
    getWeekApi();
    getCinemaCategoryApi();
    getMallDescliemerApi();
  }, []);

  const [getregion_array, SetRigion_Array] = useState([]);

  const GetRegion = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    axios
      .get(get_region_mall, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success == 1) {
          SetRigion_Array(res.data.data);
        } else {
        }
      })
      .catch((err) => {
        //console.log("err11", err);
      });
  };

  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedMalls, setSelectedMalls] = useState([]);

  const [mallidarray, SetMallidarray] = useState([]);
  const [regionidarray, SetRegionidarray] = useState([]);
  const [getMallDisclaimerData, setMallDisclaimerData] = useState("");

  const handleRegionChange = (regionName, id) => {
    const updatedSelectedRegions = [...selectedRegions];
    const index = updatedSelectedRegions.indexOf(regionName);

    if (index > -1) {
      updatedSelectedRegions.splice(index, 1);
    } else {
      updatedSelectedRegions.push(regionName);
      regionidarray.push({ id: id });
    }

    setSelectedRegions(updatedSelectedRegions);
  };

  const handleMallChange = (mallName, id) => {
    const updatedSelectedMalls = [...selectedMalls];
    const index = updatedSelectedMalls.indexOf(mallName);

    if (index > -1) {
      updatedSelectedMalls.splice(index, 1);
    } else {
      updatedSelectedMalls.push(mallName);
      mallidarray.push({ id: id });
    }

    setSelectedMalls(updatedSelectedMalls);
  };

  // const valueExistsInArray = array.includes(peopleInfo);

  // useEffect(() => {
  //   ("peopleInfo", peopleInfo);
  // }, []);

  const perPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [getliast, SetLiast] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [mainName, setMainName] = useState(
  //   get_mall_auth_data &&
  //     get_mall_auth_data.retailers &&
  //     get_mall_auth_data.retailers.name !== null
  //     ? get_mall_auth_data.retailers.name
  //     : ""
  // );
  const [mainName, setMainName] = useState(
    get_mall_auth_data && get_mall_auth_data && get_mall_auth_data.name !== null
      ? get_mall_auth_data.name
      : ""
  );
  useEffect(() => {
    getLandingpageTile();
  }, [page]);

  const getLandingpageTile = async () => {
    const token = await JSON.parse(localStorage.getItem("is_token"));

    setLoading(true);
    // Clear the list before fetching new data
    SetLiast([]);
    fetch(get_landingpagetile + `?per_page=${perPage}&page=${page}`, {
      method: "GET",
      headers: {
        Accept: ACCEPT_HEADER,
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTotalPages(res.data.last_page);
        SetLiast(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  const getMallDescliemerApi = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    setLoading(true);
    const formdata = await new FormData();
    await formdata.append("id", 2);
    axios
      .post(dynamid_description, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success === 1) {
          setLoading(false);
          setMallDisclaimerData(res.data.data);
          // Notification("success", "Success!", "Mall Registerated Successfully!");
        } else {
        }
      })
      .catch((err) => {
        console.log("err11", err);
        setLoading(false);
      });
  };

  return (
    <div>
      {loading === true ? (
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
      ) : (
        <>
          <CinemaHero get_mall_auth_data={get_mall_auth_data} />

          <div className="mm_main_wrapp">
            <div
              className="leaderboard-sub-wrapp leaderboard-sub-wrapp-cinema"
              style={{
                paddingRight: "3rem",
                paddingLeft: "3rem",
                display: "flex",
                gap: "1rem",
              }}
            >
              <CinemaNavigationBar
                title="Product Rate Card"
                setTabType={gettab === 51 ? "Landing page 1/2 Page Tile" : ""}
              />
              {/* LeaderBoard name start */}
              <div
                className="mall_name_wrapp mall_name_wrapp-spacebetween mall_name_wrapp_direction_reverse"
                style={{ marginTop: "0px", paddingLeft: "0rem" }}
              >
                <div className="leaderboard-inner-namebox">
                  <p className="mall_name_heading">{mainName}: </p>
                  &nbsp;
                  <span
                    className="leaderboard-span"
                    style={{ fontWeight: "600" }}
                  >
                    Landing page 1/2 Page Tile{" "}
                  </span>
                </div>
              </div>
              <p>
                {/* Purchase marketing space through our Landing page 1/2 Page Tile Banners below (max 1 Landing page 1/2 Page Tile Banner per Retailer per mall). There is a limited 
              amount of 5 banners per mall. First come, first serve. */}
                {getMallDisclaimerData?.landing_page_1_by_2_tile}
              </p>
              <div className="mm_horizontal_line"></div>
              {/* LeaderBoard  name end */}
              {/* Leaderboard Filter Start */}
              {/* <div className="leaderboard-filter-main-wrapp">
                <div className="leaderboard-filter-part-first">
                  <label
                    className="leaderboard-card-lbl"
                    style={{ minWidth: "125px" }}>
                    Filter by region:
                  </label>
                  <div className="select-wrapper" style={{ width: "100%" }}>
                    <select className="leaderboard-card-inp" style={{borderRadius:"10px"}}>
                      <option selected disabled value="">
                        Select region
                      </option>
                      <option value="1">ONE SIZE</option>
                      <option value="2">TWO SIZE</option>
                      <option value="3">THREE SIZE</option>
                    </select>
                  </div>
                </div>

                <div className="leaderboard-filter-part-sec">
                  <label
                    className="leaderboard-card-lbl"
                    style={{ minWidth: "125px" }}>
                    Filter by mall:
                  </label>
                  <div className="select-wrapper" style={{ width: "100%" ,top:"11px",right:"14px"}}>
                    <select className="leaderboard-card-inp">
                      <option selected disabled value="">
                        Select mall
                      </option>
                      <option value="1">ONE SIZE</option>
                      <option value="2">TWO SIZE</option>
                      <option value="3">THREE SIZE</option>
                    </select>
                  </div>
                </div>
              </div> */}
              {/* <div className="leaderboard-filter-main-wrapp">
                <div className="leaderboard-filter-part-first">
                  <label
                    className="leaderboard-card-lbl"
                    style={{ minWidth: "125px" }}>
                    Filter by region:
                  </label>
                  <div className="select-wrapper" style={{ width: "100%" }}>
                    <select
                      className="leaderboard-card-inp"
                      style={{ borderRadius: "8px" }}>
                      <option selected disabled value="">
                        Select region
                      </option>
                      <option value="1">ONE SIZE</option>
                      <option value="2">TWO SIZE</option>
                      <option value="3">THREE SIZE</option>
                    </select>
                  </div>
                </div>

                <div className="leaderboard-filter-part-sec">
                  <label
                    className="leaderboard-card-lbl"
                    style={{ minWidth: "125px" }}>
                    Filter by mall:
                  </label>
                  <div className="select-wrapper" style={{ width: "100%" }}>
                    <select
                      className="leaderboard-card-inp"
                      style={{ borderRadius: "8px" }}>
                      <option selected disabled value="">
                        Select mall
                      </option>
                      <option value="1">ONE SIZE</option>
                      <option value="2">TWO SIZE</option>
                      <option value="3">THREE SIZE</option>
                    </select>
                  </div>
                </div>
              </div> */}
              {/* Leaderboard Filter End */}

              <ExtandCinemaLandingPageTileCard
                openMallModal={openMallModal}
                item={getExtendId}
                // mindx={mindx}
                getLeaderboard={getLandingpageTile}
                setTab={setTab}
                peopleInfo={peopleInfo}
                setPeopleInfo={setPeopleInfo}
                getweek={getweek}
                seteweek={setWeek}
                regionidarray={regionidarray}
                mallidarray={mallidarray}
                selectedMalls={selectedMalls}
                getLandingpageTile={getLandingpageTile}
                SetLiast={SetLiast}
                page={page}
                setPage={setPage}
                setExtendId={setExtendId}
              />

              <span
                style={{
                  fontSize: "14px",
                  color: "#bbb",
                  alignSelf: "flex-start",
                  marginBottom: "0.7rem",
                }}
              >
                *Required Fields including all image uploads.
              </span>
              {totalPages !== page && (
                <button
                  className="view_more_btn"
                  onClick={() => setPage(page + 1)}
                >
                  {loading
                    ? "Loading..."
                    : " Load More Landing Page 1/2 Page Tile"}
                  <BsChevronDown />
                </button>
              )}
              {/* LeaderBoard Card Component end */}
              {/* LeaderBoard Add New Button start */}
              {/* <button onClick={() => setTab(41)} className="leaderboard-btn">
                Add new
                <img
                  src={images.add_new}
                  alt=""
                  className="leaderboard-btn-icon"
                />
              </button> */}
              {/* {getliast.length > 0 ? ( */}

              {/* ) : null} */}
              {/* LeaderBoard Add New Button end */}
            </div>

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

                  {/* mall search */}
                  <div className="select_mall_serch_wrapp">
                    <input
                      type="search"
                      placeholder="Search"
                      className="input_box"
                    />
                    <BiSearch
                      className="select_mall_search_icon"
                      size={25}
                      color="var(--color-orange)"
                    />
                  </div>

                  {/* <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  // defaultValue={[colourOptions[4], colourOptions[5]]}
                  isMulti
                  options={options}
                  styles={{ width: '100%' }}
                /> */}

                  {/* <div
                  className="leaderboard-card-inpbox-wrapp"
                  style={{ alignItems: "center" }}
                >
                  <label className="leaderboard-card-lbl">Slect Weeks:</label>
                  <select
                    className="leaderboard-card-inp"
                    onChange={(e) => {
                      setWeek(e.target.value);
                      (e.target.value);
                    }}
                  >
                    <option selected disabled value=""></option>

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
                          // ("gggg", mall);
                          return (
                            <button
                              className="select_mall_tag_single_btn"
                              style={{ backgroundColor: "#4FBB10" }}
                              key={mindx}
                              // onClick={() => {
                              //   handleMallChange(mall);
                              //   // setPeopleInfo(
                              //   //   peopleInfo.filter(
                              //   //     (people) => people.name !== mall.name
                              //   //   )
                              //   // );
                              // }}
                            >
                              {mall}
                              {/* <IoIosClose className="select_mall_tag_single_btn_close" /> */}
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

                    {getregion_array && getregion_array.length > 0
                      ? getregion_array.map((item, index) => {
                          return (
                            <div
                              className="bim_accordian_wrapp"
                              style={{ marginBottom: "6px" }}
                              key={item.region_id}
                            >
                              <button
                                className="bim_accordian_btn"
                                onClick={() => {
                                  setToggle(item.region_id);
                                  handleRegionChange(
                                    item.region_name,
                                    item.region_id
                                  );
                                }}
                              >
                                <p
                                  style={{
                                    color:
                                      item.region_id === toggle
                                        ? "#ff8b00"
                                        : "#000",
                                    fontWeight:
                                      item.region_id === toggle ? "500" : "300",
                                  }}
                                >
                                  {item.region_name}
                                </p>

                                {item.region_id == toggle ? (
                                  <IoIosArrowUp size={20} color="#ff8b00" />
                                ) : (
                                  <IoIosArrowDown size={20} />
                                )}
                              </button>
                              {item.region_id == toggle ? (
                                <div className="bim_accordian_mall_wrapp">
                                  {item.malls.map((itm, ind) => {
                                    return (
                                      <>
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
                                            checked={selectedMalls.includes(
                                              itm.name
                                            )}
                                            // value={peopleInfo}
                                            onChange={(e) => {
                                              // handleCheckboxChange(e, itm, ind);
                                              handleMallChange(
                                                itm.name,
                                                itm.id
                                              );
                                            }}

                                            // type="checkbox"
                                            // checked={
                                            //   getcheck[(itm, ind, "", item.region_id)]
                                            // }
                                            // onChange={(e) => {
                                            //   check(itm, ind, "", item.region_id);
                                            // }}
                                            // value={peopleInfo}
                                          />
                                          <label htmlFor={itm.id}>
                                            {itm.name}
                                          </label>
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          );
                        })
                      : null}
                  </div>

                  <div className="leaderboard-btn-box">
                    <button
                      className="btn btn-orange"
                      onClick={() => {
                        closeMallModal();
                        // ("mallidarray", mallidarray);
                        // ("regionidarray", regionidarray);
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
        </>
      )}
    </div>
  );
};

export default MyArchiveCineamaLandingpageTile;
