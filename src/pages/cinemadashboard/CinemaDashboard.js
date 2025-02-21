import React, { useEffect, useState } from "react";
import "./CinemaDashboard.css";
import { CinemaNavbar, Footer, Navbar } from "../../common";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  CinemaAccountSetting,
  CinemaHero,
  CinemaProfilePage,
  MallHero,
  MallNavbar,
} from "../../components";
import { CSSTransition } from "react-transition-group";

import {
  AddCinemaAnalyticBundle,
  AddCinemaLandingpageLeaderboard,
  AddCinemaTiles,
  AddEateries,
  AddLandingPageSquareTile,
  AddMallFacility,
  AddRetailerCinema,
  ArchivesCinema,
  BrandInMall,
  BuyCinemaAnalytics,
  CinemaAddLeaderboardBanner,
  CinemaAnalytics,
  CinemaAnalyticsBundles,
  CinemaBrandInMall,
  CinemaCart,
  CinemaCheckout,
  CinemaLandingPageLeaderboard,
  CinemaLandingpageTile,
  CinemaLeaderboard,
  CinemaPromotionalBanner,
  CinemaThankYou,
  ContactDetail,
  Eateries,
  EditEateriesDetails,
  EditFacilities,
  EditMallEvent,
  EditRetailerCinema,
  EditStoreDetail,
  Facilities,
  LandingPageSquareTile,
  MallAddEvents,
  MallAddMvie,
  MallEditMovie,
  MallEvents,
  MallManagement,
  MallMovieCards,
  MallProfilePart,
  MyArchiveCinemaLandingPageLeaderboard,
  MyArchiveCinemaLandingPageSquareTile,
  RetailerCinema,
  RetailerTypeSheet,
  StoreDirectory,
  UploadEateryDirectory,
  UploadMovieDirectory,
  UploadSd,
  UploadStoreDirectory,
} from "../../container";
import { useMallContext } from "../../context/mall_context";
import { useMeventContext } from "../../context/mevent_context";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  ACCEPT_HEADER,
  dynamic_model_popup,
  dynamid_description,
  get_eatery_mall_wise,
  get_mall_event,
  get_store_mall_wise,
} from "../../utils/Constant";
import MallAddStore from "../../container/MallAddStore";
import CinemaTiles from "../../container/cinematiles/CinemaTiles";
import CinemaTahankYou from "../../container/cinemathankyou/CinemaThankYou";
import CinemaProRateCard from "../../container/cinemaproratecard/CinemaProRateCard";
import FaqPage from "../faqpage/FaqPage";
import { useStoreContext } from "../../context/store_context";
import AddCinemaPromotionalBanner from "../../container/addcinemapromotionalbanner/AddCinemaPromotionalBanner";
import AddCinemaLandingPageBanner from "../../container/addcinemalandingpagetilebanner/AddCinemaLandingPageBanner";
import axios from "axios";
import CinemaMyArchiveExtend from "../../container/cinemamyarchiveextend/CinemaMyArchiveExtend";
import MyArchiveCineamaLandingpageTile from "../../container/myarchivecinemalandingpagetile/MyArchiveCineamaLandingpageTile";
import MyArchiveCinemaLeaderboard from "../../container/myarchivecinemaleaderboard/myarchiveCinemaleaderboard";
import MyArchiveCinemaPromotion from "../../container/myarchivecinemapromotion/MyArchiveCinemaPromotion";
import MyArchiveCinemaProductTile from "../../container/myarchivecinemaproducttile/MyArchiveCinemaProductTile";

const CinemaDashboard = () => {
  const {
    get_cinema_data,
    // get_mall_store_data,
    get_cinema_loading,
    getCinema,
    getCinemaCategoryApi,
    getStoreCartApi,
  } = useStoreContext();
  const { get_mevent_data } = useMeventContext();
  const [gettab, setTab] = useState(1);
  const [geteventId, setEventId] = useState();
  const [geteventData, setEventData] = useState();
  const [getstore_is, setStore_id] = useState();
  const [getfacility_id, setfacility_id] = useState();
  const [getsingleStoreData, setSingleStoreData] = useState({});
  const [getsinglefacilitydata, setsinglefacilitydata] = useState({});
  // const [sidebaropen, setSidebarOpen] = useState(true);
  const [sidebaropen, setSidebarOpen] = useState(window.innerWidth > 500); // Set to false if <= 500
  const [mallheadname, setMallheadname] = useState("");
  const [getsingleEventData, setSingleEventData] = useState({});
  const [geteventdata1, SetEventData] = useState("");
  const [showElement, setShowElement] = useState(true);
  const [storepage2, setStorePage2] = useState(1);
  const [getsingleStoreData2, setSingleStoreData2] = useState({});
  const [storetotalPages2, setStoreTotalPages2] = useState(1);
  const [getstore_is2, setStore_id2] = useState();
  const [scrolled, setScrolled] = useState(false);

  // store api start
  const storePerPage = 3;
  const [storetotalPages, setStoreTotalPages] = useState(1);
  const [storepage, setStorePage] = useState(1);

  // store api end

  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(false);
  const perPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const EventApi = async () => {
    const token = await JSON.parse(localStorage.getItem("is_token"));
    setLoading(true);
    fetch(get_mall_event + `?per_page=${perPage}&page=${page}`, {
      method: "GET",
      headers: {
        Accept: ACCEPT_HEADER,
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // ("re754775775675", res.data);
        // setTotalPages(res.data.last_page);
        setEventList([...eventList, ...res.data.data]);
        setLoading(false);
      })
      .catch((err) => {
        // ("err", err);
      });
  };

  useEffect(() => {
    EventApi();
  }, [page]);

  // eatery api start

  const eateryPerPage = 3;
  const [eaterytotalPages, setEateryTotalPages] = useState(1);
  const [eaterypage, setEateryPage] = useState(1);

  const [moviedata, SetMovieData] = useState("");

  const [geteatery, SetEatery] = useState(false);
  const [getMallDisclaimerData, setMallDisclaimerData] = useState("");
  const [getMallModalData, setMallModalData] = useState("");

  // eatery api end

  const navigate = useNavigate();

  var islogin = localStorage.getItem("is_login");

  // ("get_mall_auth_data", get_cinema_data);

  useEffect(() => {
    setMallheadname(get_cinema_data.name);
  }, []);

  useEffect(() => {
    if (
      get_cinema_data === "" ||
      get_cinema_data == null ||
      get_cinema_data.length === 0 ||
      get_cinema_data == undefined
    ) {
      window.location.reload(false);
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 79) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getMallDescliemerApi = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    setLoading(true);
    const formdata = await new FormData();
    await formdata.append("id", 3);
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

  const getMallModalApi = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    setLoading(true);
    const formdata = await new FormData();
    await formdata.append("id", 3);
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

  useEffect(() => {
    getCinema();
    getCinemaCategoryApi();
    getStoreCartApi();
    getMallDescliemerApi();
    getMallModalApi();

    // ("geteventData", geteventData);
    // ("getsingleStoreData", getsingleStoreData);
    // window.location.reload(true);
  }, []);

  const [getbranddata, SetBrandData] = useState("");

  // Navigation Block Old

  // useEffect(() => {
  //   window.history.pushState(null, document.title, window.location.href);
  //   window.addEventListener("popstate", handlePopstate);

  //   return () => {
  //     window.removeEventListener("popstate", handlePopstate);
  //   };
  // }, []);

  // const handlePopstate = () => {
  //   window.history.pushState(null, document.title, window.location.href);
  // };

  // Navigation Block New

  // useEffect(() => {
  //   history.pushState(null, null, location.href);
  //   window.onpopstate = function () {
  //     history.go(1);
  //   };
  // }, []);

  const [isPromptActive, setPromptActive] = useState(false);

  useEffect(() => {
    const confirmNavigation = (e) => {
      e.preventDefault();
      e.returnValue = ""; // For Chrome
    };

    const handleBeforeUnload = (e) => {
      if (isPromptActive) {
        confirmNavigation(e);
      }
    };

    const handleNavigation = (location) => {
      if (location.pathname === "/your-specific-url") {
        setPromptActive(true);
      } else {
        setPromptActive(false);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isPromptActive]);

  const handlePromptCancel = () => {
    setPromptActive(false);
  };

  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 900;
      setIsMobileView(isMobile);
      if (isMobile) {
        setSidebarOpen(false); // Automatically close the sidebar in mobile view
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [getExtendId, setExtendId] = useState();

  return (
    <>
      {isPromptActive && (
        <div>
          Are you sure you want to leave?
          <button onClick={handlePromptCancel}>Stay</button>
        </div>
      )}
      <Helmet>
        <title>Cinema Dashboard | In-Store</title>
      </Helmet>

      <div>
        {/* <Navbar
        // setCustomerDropdown={setCustomerDropdown}
        // getcustomerDropdown={getcustomerDropdown}
        /> */}
        {/* <MallNavbar setTab={setTab} get_mall_auth_data={get_mall_auth_data} /> */}
        <CinemaNavbar setTab={setTab} />
        {get_cinema_loading ? (
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
          <div className="profilepage_main_wrapp profilepage_slider_transition">
            {/* side-bar start  */}

            <div
              className="resp_sidebar_position"
              style={{ backgroundColor: "#E5E4E2" }}
            >
              <div
                className="pro-side-none-resp"
                style={{
                  display: "flex",
                  gap: "5px",
                  width: sidebaropen ? "275px" : "0px",
                  transition: "width 1s ease",
                }}
              >
                <div className="profile_sidebar_wrapp">
                  <div
                    style={{
                      position: "relative",
                      width: sidebaropen ? "275px" : "0px",
                      transition: "width 1s ease",
                    }}
                    className="resp_sidebar_remove_relarive_position"
                  >
                    <button
                      style={{
                        background: gettab === 1 ? "#ff8b00" : "#fff",
                        color: gettab === 1 ? "#fff" : "#000",
                        fontWeight: gettab === 1 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid",
                        borderleft: "1px solid",
                      }}
                      onClick={() => {
                        setTab(1);
                        if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn"
                    >
                      My Profile
                      {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
                    </button>
                    <button
                      style={{
                        background: gettab === 2 ? "#ff8b00" : "#fff",
                        color: gettab === 2 ? "#fff" : "#000",
                        fontWeight: gettab === 2 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid",
                        borderleft: "1px solid",
                      }}
                      onClick={() => {
                        setTab(2);
                        if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn"
                    >
                      Account Setting
                      {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
                    </button>

                    {get_cinema_data?.store_type == 2 ? (
                      <>
                        <button
                          style={{
                            background:
                              gettab === 28 || gettab === 29 || gettab === 30
                                ? "#ff8b00"
                                : "#fff",
                            color:
                              gettab === 28 || gettab === 29 || gettab === 30
                                ? "#fff"
                                : "#000",
                            fontWeight:
                              gettab === 28 || gettab === 29 || gettab === 30
                                ? "700"
                                : "500",
                            width: sidebaropen ? "275px" : "0px",
                            overflow: "hidden",
                            transition: "width 1s ease",
                            whiteSpace: "nowrap",
                            borderRight: "1px solid #000",
                            // borderLeft: "1px solid",
                          }}
                          onClick={() => {
                            setTab(28);
                            if (window.innerWidth <= 900) {
                              setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                            }
                          }}
                          className="profile_sidebar_sig_btn cinema_sidebar_sig_btn"
                        >
                          Retailer's Cinemas
                          {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                    <button
                      style={{
                        background: gettab === 21 ? "#ff8b00" : "#fff",
                        color: gettab === 21 ? "#fff" : "#000",
                        fontWeight: gettab === 21 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid",
                        borderleft: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(21);
                        if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn"
                    >
                      Product Rate Card
                    </button>
                    <button
                      style={{
                        background:
                          gettab === 40 || gettab === 41 ? "#ff8b00" : "#fff",
                        color: gettab === 40 || gettab === 41 ? "#fff" : "#000",
                        fontWeight:
                          gettab === 40 || gettab === 41 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid #000",
                        // borderLeft: "1px solid",
                      }}
                      onClick={() => {
                        setTab(40);
                        if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn profile_sidebar_sig_btn_padding"
                    >
                      - Landing Page <br />
                      1/2 Page Tile
                    </button>
                    <button
                      style={{
                        background:
                          gettab === 46 || gettab === 47 ? "#ff8b00" : "#fff",
                        color: gettab === 46 || gettab === 47 ? "#fff" : "#000",
                        fontWeight:
                          gettab === 46 || gettab === 47 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid #000",
                        // borderLeft: "1px solid",
                      }}
                      onClick={() => {
                        setTab(46);
                        if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn profile_sidebar_sig_btn_padding"
                    >
                      - Landing Page <br />
                      Square Tiles{" "}
                    </button>
                    <button
                      style={{
                        background:
                          gettab === 42 || gettab === 43 ? "#ff8b00" : "#fff",
                        color: gettab === 42 || gettab === 43 ? "#fff" : "#000",
                        fontWeight:
                          gettab === 42 || gettab === 43 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid #000",
                        // borderLeft: "1px solid",
                      }}
                      onClick={() => {
                        setTab(42);
                        if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn profile_sidebar_sig_btn_padding"
                    >
                      - Landing Page <br />
                      Leaderboard Banner{" "}
                    </button>
                    <button
                      style={{
                        background:
                          gettab === 35 || gettab === 36 ? "#ff8b00" : "#fff",
                        color: gettab === 35 || gettab === 36 ? "#fff" : "#000",
                        fontWeight:
                          gettab === 35 || gettab === 36 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid #000",
                        // borderLeft: "1px solid",
                      }}
                      onClick={() => {
                        setTab(35);
                        if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn profile_sidebar_sig_btn_padding"
                    >
                      - In Mall Leaderboard
                      <br /> Banner
                    </button>
                    <button
                      style={{
                        background:
                          gettab === 37 || gettab === 38 ? "#ff8b00" : "#fff",
                        color: gettab === 37 || gettab === 38 ? "#fff" : "#000",
                        fontWeight:
                          gettab === 37 || gettab === 38 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap #000",
                        borderRight: "1px solid #000",
                        // borderLeft: "1px solid",
                      }}
                      onClick={() => {
                        setTab(37);
                        if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn profile_sidebar_sig_btn_padding"
                    >
                      - Promotional
                      <br /> Banner
                    </button>
                    <button
                      style={{
                        background:
                          gettab === 3 || gettab === 39 ? "#ff8b00" : "#fff",
                        color: gettab === 3 || gettab === 39 ? "#fff" : "#000",
                        fontWeight:
                          gettab === 3 ||
                            gettab === 9 ||
                            gettab === 10 ||
                            gettab === 39
                            ? "700"
                            : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid #000",
                        borderleft: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(3);
                        if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn profile_sidebar_sig_btn_padding"
                    >
                      {/* &nbsp;&nbsp;&nbsp; - Brands */}- Cinema Product Tiles
                      {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
                    </button>
                    {/* <button
                      style={{
                        background: gettab === 44 ? "#ff8b00" : "#fff",
                        color: gettab === 44 ? "#fff" : "#000",
                        fontWeight:
                          gettab === 44 || gettab === 8 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid",
                        borderleft: "1px solid",
                      }}
                      onClick={() => setTab(44)}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn profile_sidebar_sig_btn_padding">
                      - Cinema <br />
                      Analytics Bundles
                     
                    </button> */}
                    <button
                      style={{
                        background: gettab === 4 ? "#ff8b00" : "#fff",
                        color: gettab === 4 ? "#fff" : "#000",
                        fontWeight:
                          gettab === 4 || gettab === 8 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid",
                        borderleft: "1px solid",
                      }}
                      // onClick={() => setTab(4)}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn"
                    >
                      {/* &nbsp;&nbsp;&nbsp; - Eateries */}Track My Analytics
                      {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
                    </button>
                    {/* <button
                      style={{
                        background: gettab === 17 ? "#ff8b00" : "#fff",
                        color: gettab === 17 ? "#fff" : "#000",
                        fontWeight: gettab === 17 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid",
                        borderleft: "1px solid",
                      }}
                      onClick={() => setTab(17)}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn">
                     
                    </button> */}

                    <button
                      style={{
                        background: gettab === 24 ? "#ff8b00" : "#fff",
                        color: gettab === 24 ? "#fff" : "#000",
                        fontWeight: gettab === 24 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #000",
                        borderRight: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(24);
                        if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn"
                    >
                      - My Analytics
                    </button>

                    <button
                      style={{
                        background: gettab === 25 ? "#ff8b00" : "#fff",
                        color: gettab === 25 ? "#fff" : "#000",
                        fontWeight: gettab === 25 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #000",
                        borderRight: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(25);
                        if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn"
                    >
                      - My Archives
                    </button>

                    <button
                      style={{
                        background: gettab === 5 ? "#ff8b00" : "#fff",
                        color: gettab === 5 ? "#fff" : "#000",
                        fontWeight: gettab === 5 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid #000",
                        borderleft: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(5);
                        if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn"
                    >
                      {/* &nbsp;&nbsp;&nbsp; - Events */}
                      My Cart
                      {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
                    </button>

                    {/* <button
                      style={{
                        background: gettab === 6 ? "#ff8b00" : "#fff",
                        color: gettab === 6 ? "#fff" : "#000",
                        fontWeight: gettab === 6 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid",
                        borderleft: "1px solid",
                      }}
                      onClick={() => setTab(6)}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn profile_sidebar_sig_btn_padding">
                      - Cinema Checkout
                     
                    </button> */}

                    {/* <button
                      style={{
                        background: gettab === 7 ? "#ff8b00" : "#fff",
                        color: gettab === 7 ? "#fff" : "#000",
                        fontWeight: gettab === 7 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid",
                        borderleft: "1px solid",
                      }}
                      onClick={() => setTab(7)}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn">
                      &nbsp;&nbsp; - Thank You
                  
                    </button> */}
                    {/* <button
                      style={{
                        background: gettab === 6 ? "#ff8b00" : "#fff",
                        color: gettab === 6 ? "#fff" :"#000",
                        fontWeight: gettab === 6 ? "700" : "500",
                        width: sidebaropen ? "400px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",

                      }}
                      onClick={() => setTab(6)}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn"
                    >
                      &nbsp;&nbsp;&nbsp; - Facilities
                     
                    </button> */}
                    {/* <button
                      style={{
                        background: gettab === 7 ? "#ff8b00" : "#fff",
                        color: gettab === 7 ? "#fff" :"#000",
                        fontWeight: gettab === 7 ? "700" : "500",
                        width: sidebaropen ? "400px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                      }}
                      onClick={() => setTab(7)}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn"
                    >
                      Contact Details
                      
                    </button> */}

                    <button
                      style={{
                        background: gettab === 22 ? "#ff8b00" : "#fff",
                        color: gettab === 22 ? "#fff" : "#000",
                        fontWeight: gettab === 22 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid #000",
                        borderleft: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(22);
                        if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn"
                    >
                      FAQ
                    </button>

                    <button
                      style={{
                        background: gettab === 50 || gettab === 51 || gettab === 52 || gettab === 53 || gettab === 55 || gettab === 56 || gettab === 57 ? "#ff8b00" : "#fff",
                        color: gettab === 50 || gettab === 51 || gettab === 52 || gettab === 53 || gettab === 55 || gettab === 56 || gettab === 57 ? "#fff" : "#000",
                        fontWeight: gettab === 50 || gettab === 51 || gettab === 52 || gettab === 53 || gettab === 55 || gettab === 56 || gettab === 57 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #000",
                        borderRight: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(50);
                        if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn"
                    >
                      My Archive (Extend)
                    </button>

                    {get_cinema_data?.store_type == 2 ? (
                      <>
                        <button
                          style={{
                            background: gettab === 31 ? "#ff8b00" : "#fff",
                            color: gettab === 31 ? "#fff" : "#000",
                            fontWeight: gettab === 31 ? "700" : "500",
                            width: sidebaropen ? "275px" : "0px",
                            overflow: "hidden",
                            transition: "width 1s ease",
                            whiteSpace: "nowrap",
                            borderBottom: "1px solid #000",
                            borderRight: "1px solid #000",
                          }}
                          onClick={() => {
                            setTab(31);
                            if (window.innerWidth <= 900) {
                              setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                            }
                          }}
                          className="profile_sidebar_sig_btn"
                        >
                          My Brand in Malls
                        </button>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* <div className="profilepage_slider_transition">
                      <div
                        className="profile_sidebar_sig_btn_right_arrow"
                        onClick={() => {
                          setSidebarOpen(!sidebaropen);
                          setShowElement(!showElement);
                        }}>
                        {sidebaropen === true ? <>
                          <FiChevronLeft color="#fff" size={20} />

                        </> : <>
                          <FiChevronRight color="#fff" size={20} />

                        </>}
                      </div>
                    </div> */}

                    <div
                      className="profile_sidebar_sig_btn_right_arrow"
                      style={{
                        position: "fixed", // Fix the arrow at the top
                        // top: scrolled ? "0px" : "79px", // When scrolled 100px, set top to 0
                        top: "79px", // Adjust as needed
                        left:
                          window.innerWidth <= 900
                            ? "0px" // For screens <= 900px
                            : sidebaropen
                              ? "275px" // For larger screens when sidebar is open
                              : "0px", // For larger screens when sidebar is closed

                        // transition: "top 0.3s ease, left 1s ease", // Smooth transition for the arrow position
                        transition: "left 1s ease", // Smooth transition for the arrow position
                        zIndex: "1000", // Make sure the arrow is on top of other elements
                      }}
                      onClick={() => {
                        setSidebarOpen(!sidebaropen);
                        // if (window.innerWidth <= 900) {
                        //   window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly if screen width is <= 900px
                        // }
                      }}
                    >
                      {sidebaropen ? (
                        <FiChevronLeft color="#fff" size={20} />
                      ) : (
                        <FiChevronRight color="#fff" size={20} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* </CSSTransition> */}
            </div>

            {/* side-bar end  */}

            {/* main-cotainer start */}
            <div className="profile_main_sec_wrapp" onClick={() => { if (window.innerWidth <= 900) { setSidebarOpen(false) } }}>
              <div className="">
                {/* <CinemaHero get_mall_auth_data={get_cinema_data} /> */}
              </div>
              {gettab === 1 && (
                <CinemaProfilePage
                  setTab={setTab}
                  get_mall_auth_data={get_cinema_data}
                  sidebaropen={sidebaropen}
                />
              )}
              {gettab === 2 && (
                <CinemaAccountSetting
                  get_mall_auth_data={get_cinema_data}
                  sidebaropen={sidebaropen}
                  setTab={setTab}
                  getMallModalData={getMallModalData}
                />
              )}
              {gettab === 21 && (
                <CinemaProRateCard
                  get_mall_auth_data={get_cinema_data}
                  sidebaropen={sidebaropen}
                  setTab={setTab}
                  gettab={gettab}
                  getMallDisclaimerData={getMallDisclaimerData}
                />
              )}
              {gettab === 22 && (
                <FaqPage
                  get_mall_auth_data={get_cinema_data}
                  sidebaropen={sidebaropen}
                  setTab={setTab}
                  getMallDisclaimerData={getMallDisclaimerData}
                />
              )}
              {gettab === 3 && (
                <CinemaTiles
                  setTab={setTab}
                  gettab={gettab}
                  get_mall_auth_data={get_cinema_data}
                  getMallDisclaimerData={getMallDisclaimerData}
                />
              )}
              {gettab === 4 && (
                <CinemaThankYou
                  // eaterypage={eaterypage}
                  // setEateryPage={setEateryPage}
                  // eaterytotalPages={eaterytotalPages}
                  // setTab={setTab}
                  // setSingleStoreData={setSingleStoreData}
                  // getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                // setStore_id={setStore_id}
                />
              )}
              {gettab === 5 && (
                <CinemaCart
                  get_mall_auth_data={get_cinema_data}
                  setTab={setTab}
                  getTab={gettab}
                />
              )}
              {gettab === 6 && (
                <CinemaCheckout
                  setTab={setTab}
                  get_mall_auth_data={get_cinema_data}
                  getMallModalData={getMallModalData}
                />
              )}
              {gettab === 7 && (
                <CinemaThankYou get_mall_auth_data={get_cinema_data} />
              )}
              {gettab === 8 && (
                <EditEateriesDetails
                  getsingleStoreData={getsingleStoreData}
                  getstore_is={getstore_is}
                  setTab={setTab}
                // get_mall_auth_data={get_cinema_dataget_cinema_data}
                />
              )}
              {gettab === 9 && (
                <EditStoreDetail
                  getsingleStoreData={getsingleStoreData}
                  getstore_is={getstore_is}
                  get_mall_auth_data={get_cinema_data}
                  setTab={setTab}
                // getStoreList={getStoreList}
                />
              )}
              {gettab === 10 && (
                <UploadStoreDirectory
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  setTab={setTab}
                />
              )}
              {gettab === 11 && (
                <EditMallEvent
                  setTab={setTab}
                  eventList={eventList}
                  geteventId={geteventId}
                  get_mall_auth_data={get_cinema_data}
                  EventApi={EventApi}
                  geteventdata1={geteventdata1}
                />
              )}
              {gettab === 12 && (
                <EditFacilities
                  get_mall_auth_data={get_cinema_data}
                  getfacility_id={getfacility_id}
                  getsinglefacilitydata={getsinglefacilitydata}
                  setTab={setTab}
                  mallheadname={mallheadname}
                />
              )}
              {gettab === 13 && (
                <MallAddEvents
                  get_mall_auth_data={get_cinema_data}
                  setTab={setTab}
                // EventApi={EventApi}
                />
              )}
              {gettab === 14 && (
                <AddMallFacility
                  get_mall_auth_data={get_cinema_data}
                  setTab={setTab}
                />
              )}
              {gettab === 15 && (
                <AddEateries
                  get_mall_auth_data={get_cinema_data}
                  setTab={setTab}
                />
              )}
              {gettab === 16 && (
                <MallAddStore
                  getsingleStoreData={getsingleStoreData}
                  getstore_is={getstore_is}
                  get_mall_auth_data={get_cinema_data}
                  setTab={setTab}
                // getStoreList={getStoreList}
                />
              )}
              {gettab === 17 && (
                <CinemaProfilePage
                  setTab={setTab}
                  get_mall_auth_data={get_cinema_data}
                  sidebaropen={sidebaropen}
                />
              )}
              {gettab === 18 && (
                <UploadMovieDirectory
                  getsingleStoreData={getsingleStoreData}
                  getstore_is={getstore_is}
                  get_mall_auth_data={get_cinema_data}
                  setTab={setTab}
                />
              )}
              {gettab === 19 && (
                <MallEditMovie
                  getsingleStoreData={getsingleStoreData}
                  getstore_is={getstore_is}
                  get_mall_auth_data={get_cinema_data}
                  setTab={setTab}
                  moviedata={moviedata}
                />
              )}
              {gettab === 20 && (
                <MallAddMvie
                  getsingleStoreData={getsingleStoreData}
                  getstore_is={getstore_is}
                  get_mall_auth_data={get_cinema_data}
                  setTab={setTab}
                  gettab={gettab}
                />
              )}
              {gettab === 33 && (
                <RetailerTypeSheet
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                />
              )}
              {gettab === 34 && (
                <UploadEateryDirectory
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}
              {gettab === 35 && (
                <CinemaLeaderboard
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getMallDisclaimerData={getMallDisclaimerData}
                />
              )}
              {gettab === 36 && (
                <CinemaAddLeaderboardBanner
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}
              {gettab === 37 && (
                <CinemaPromotionalBanner
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getMallDisclaimerData={getMallDisclaimerData}
                />
              )}
              {gettab === 38 && (
                <AddCinemaPromotionalBanner
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}
              {gettab === 39 && (
                <AddCinemaTiles
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}
              {gettab === 40 && (
                <CinemaLandingpageTile
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getMallDisclaimerData={getMallDisclaimerData}
                />
              )}
              {gettab === 41 && (
                <AddCinemaLandingPageBanner
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}
              {gettab === 42 && (
                <CinemaLandingPageLeaderboard
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getMallDisclaimerData={getMallDisclaimerData}
                />
              )}
              {gettab === 43 && (
                <AddCinemaLandingpageLeaderboard
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}
              {gettab === 44 && (
                <CinemaAnalyticsBundles
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                />
              )}
              {gettab === 45 && (
                <AddCinemaAnalyticBundle
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}
              {gettab === 46 && (
                <LandingPageSquareTile
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getMallDisclaimerData={getMallDisclaimerData}
                />
              )}
              {gettab === 47 && (
                <AddLandingPageSquareTile
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}
              {gettab === 25 && (
                <ArchivesCinema
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                />
              )}
              {gettab === 24 && (
                <CinemaAnalytics
                  // getsingleStoreData={getsingleStoreData}
                  // getstore_is={getstore_is}
                  // get_mall_auth_data={get_mall_auth_data}
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  setTab={setTab}
                  gettab={gettab}
                  getMallDisclaimerData={getMallDisclaimerData}
                />
              )}
              {gettab === 26 && (
                <BuyCinemaAnalytics
                  setTab={setTab}
                  get_mall_auth_data={get_cinema_data}
                  gettab={gettab}
                />
              )}
              {gettab === 28 && (
                <RetailerCinema
                  setTab={setTab}
                  gettab={gettab}
                  storepage2={storepage2}
                  setStorePage2={setStorePage2}
                  storetotalPages2={storetotalPages2}
                  // storeloading={storeloading}
                  setStore_id2={setStore_id2}
                  // get_mall_store_data={storeList}
                  setSingleStoreData2={setSingleStoreData2}
                  getsingleStoreData2={getsingleStoreData2}
                  get_mall_auth_data={get_cinema_data}
                />
              )}
              {gettab === 29 && (
                <AddRetailerCinema
                  setTab={setTab}
                  gettab={gettab}
                  get_mall_auth_data={get_cinema_data}
                  getsingleStoreData={getsingleStoreData}
                />
              )}
              {gettab === 30 && (
                <EditRetailerCinema
                  setTab={setTab}
                  gettab={gettab}
                  storepage2={storepage2}
                  setStorePage2={setStorePage2}
                  storetotalPages2={storetotalPages2}
                  // storeloading={storeloading}
                  setStore_id2={setStore_id2}
                  // get_mall_store_data={storeList}
                  setSingleStoreData2={setSingleStoreData2}
                  getsingleStoreData2={getsingleStoreData2}
                  get_mall_auth_data={get_cinema_data}
                />
              )}
              {gettab === 31 && (
                <CinemaBrandInMall
                  get_mall_auth_data={get_cinema_data}
                  setTab={setTab}
                  getTab={gettab}
                />
              )}
              {gettab === 50 && (
                <CinemaMyArchiveExtend
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getExtendId={getExtendId}
                  setExtendId={setExtendId}
                />
              )}
              {gettab === 51 && (
                <MyArchiveCineamaLandingpageTile
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getExtendId={getExtendId}
                  setExtendId={setExtendId}
                />
              )}
              {gettab === 52 && (
                <MyArchiveCinemaLeaderboard
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getExtendId={getExtendId}
                  setExtendId={setExtendId}
                />
              )}
              {gettab === 53 && (
                <MyArchiveCinemaPromotion
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getExtendId={getExtendId}
                  setExtendId={setExtendId}
                />
              )}
              {gettab === 55 && (
                <MyArchiveCinemaProductTile
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getExtendId={getExtendId}
                  setExtendId={setExtendId}
                />
              )}
              {gettab === 56 && (
                <MyArchiveCinemaLandingPageSquareTile
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getExtendId={getExtendId}
                  setExtendId={setExtendId}
                />
              )}
              {gettab === 57 && (
                <MyArchiveCinemaLandingPageLeaderboard
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_cinema_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getExtendId={getExtendId}
                  setExtendId={setExtendId}
                />
              )}
            </div>
            {/* main-cotainer end */}
          </div>
        )}
      </div>
    </>
  );
};

export default CinemaDashboard;