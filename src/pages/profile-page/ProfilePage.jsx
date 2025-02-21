import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { Footer, Navbar } from "../../common";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MallHero, MallNavbar } from "../../components";
import { CSSTransition } from "react-transition-group";

import {
  AddEateries,
  AddFacilities,
  AddMallCinema,
  AddMallFacility,
  Archives,
  BuyAnalytics,
  ContactDetail,
  Eateries,
  EditEateriesDetails,
  EditFacilities,
  EditMallCinema,
  EditMallEvent,
  EditStoreDetail,
  Facilities,
  FaqMall,
  MallAddEvents,
  MallAddMvie,
  MallCart,
  MallCart2,
  MallCheckout,
  MallCinema,
  MallEditMovie,
  MallEvents,
  MallManagement,
  MallMovieCards,
  MallProRateCard,
  MallProfilePart,
  NotificationMall,
  RetailerTypeSheet,
  StoreDirectory,
  UploadCinemaDirectory,
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
  get_eatery_mall_wise,
  get_mall_event,
  get_store_mall_wise,
} from "../../utils/Constant";
import MallAddStore from "../../container/MallAddStore";
import MallCart3 from "../../container/mallCart3/MallCart3";
import axios from "axios";

const ProfilePage = () => {
  const {
    get_mall_auth_data,
    get_mall_store_data,
    get_mall_auth_loading,
    getMallAuthWise,
    getMallCartApi,
  } = useMallContext();
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
  const [getMallModalData, setMallModalData] = useState("");


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

        setTotalPages(res.data.last_page);
        setEventList([...eventList, ...res.data.data]);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error11", err);
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

  // eatery api end

  const navigate = useNavigate();

  var islogin = localStorage.getItem("is_login");

  // ("get_mall_auth_data", get_mall_auth_data);

  useEffect(() => {
    setMallheadname(get_mall_auth_data?.name);
  }, []);

  useEffect(() => {
    if (
      get_mall_auth_data === "" ||
      get_mall_auth_data == null ||
      get_mall_auth_data.length === 0 ||
      get_mall_auth_data == undefined
    ) {
      window.location.reload(false);
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getMallAuthWise();
    getMallCartApi();
    getMallModalApi();
    // ("geteventData", geteventData);
    // ("getsingleStoreData", getsingleStoreData);
    // window.location.reload(true);
  }, []);

  // ("edit store is is", getstore_is);

  // Mall Event Api Start

  // const [eventList, setEventList] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const perPage = 3;
  // const [totalPages, setTotalPages] = useState(1);
  // const [page, setPage] = useState(1);

  const [getbranddata, SetBrandData] = useState("");

  // const EventApi = async () => {
  //   ("event checked");
  //   const token = await JSON.parse(localStorage.getItem("is_token"));
  //   setLoading(true);
  //   fetch(get_mall_event + `?per_page=${perPage}&page=${page}`, {
  //     method: "GET",
  //     headers: {
  //       Accept: ACCEPT_HEADER,
  //       Authorization: "Bearer " + token,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       ("event_list", res.data.last_page);
  //       setTotalPages(res.data.last_page);
  //       setEventList([...eventList, ...res.data.data]);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       ("err", err);
  //     });
  // };

  // useEffect(() => {
  //   EventApi();
  // }, [page]);

  // Block Navigation Old

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

  // Block Navigation New

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }, []);

  const getMallModalApi = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    setLoading(true);
    const formdata = await new FormData();
    await formdata.append("id", 1);
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
  // Facility data map

  // const = { get_facility_data } = useMa

  // const history = useNavigate();

  // useEffect(() => {
  //   const preventNavigation = (e) => {
  //     e.preventDefault();
  //     e.returnValue = ''; // For Chrome
  //   };

  //   const confirmNavigation = () => {
  //     return 'Are you sure you want to leave this page?';
  //   };

  //   history.block(confirmNavigation);

  //   window.addEventListener('beforeunload', preventNavigation);

  //   return () => {
  //     history.block(null);
  //     window.removeEventListener('beforeunload', preventNavigation);
  //   };
  // }, [history]);

  // const [isPromptActive, setPromptActive] = useState(false);

  // useEffect(() => {
  //   const confirmNavigation = (e) => {
  //     e.preventDefault();
  //     e.returnValue = ""; // For Chrome
  //   };

  //   const handleBeforeUnload = (e) => {
  //     if (isPromptActive) {
  //       confirmNavigation(e);
  //     }
  //   };

  //   const handleNavigation = (location) => {
  //     if (location.pathname === "/your-specific-url") {
  //       setPromptActive(true);
  //     } else {
  //       setPromptActive(false);
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [isPromptActive]);

  // const handlePromptCancel = () => {
  //   setPromptActive(false);
  // };


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

  return (
    <>
      {/* {isPromptActive && (
        <div>
          Are you sure you want to leave?
          <button onClick={handlePromptCancel}>Stay</button>
        </div>
      )} */}
      <Helmet>
        <title>Mall Dashboard | In-Store</title>
      </Helmet>

      <div>
        {/* <Navbar
        // setCustomerDropdown={setCustomerDropdown}
        // getcustomerDropdown={getcustomerDropdown}
        /> */}
        <MallNavbar setTab={setTab} get_mall_auth_data={get_mall_auth_data} />
        {get_mall_auth_loading ? (
          <div
            style={{
              width: "100%",
              height: "80vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <div className="loader"></div>
          </div>
        ) : (
          <div className="profilepage_main_wrapp profilepage_slider_transition">
            {/* side-bar start  */}

            <div className="resp_sidebar_position" style={{ backgroundColor: "#E5E4E2" }}>
              {/* <CSSTransition
                in={showElement}
                timeout={300}
                classNames="fade"
              // unmountOnExit
              > */}

              <div
                className="pro-side-none-resp"
                style={{
                  display: "flex",
                  gap: "5px",
                  width: sidebaropen ? "275px" : "0px",
                  transition: "width 1s ease",

                  // position: sidebaropen === true ? null : "absolute",

                  // left: sidebaropen === true ? null : "-400px",
                  // transition: 'left 2s ease'
                }}
              // className="profilepage_sidebarr profilepage_slider_transition"
              >
                <div className="profile_sidebar_wrapp">
                  <div
                    style={{
                      position: "relative",
                      width: sidebaropen ? "275px" : "0px",
                      transition: "width 1s ease",
                    }}
                    className="resp_sidebar_remove_relarive_position">
                    <button
                      style={{
                        // background: gettab === 1 ? "#ff8b00" : "#ffb103",
                        background: gettab === 1 ? "#ff8b00" : "#fff",
                        color: gettab === 1 ? "#fff" : "#000",
                        fontWeight: gettab === 1 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #000",
                        borderRight: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(1); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn">
                      My Profile
                      {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
                    </button>
                    <button
                      style={{
                        // background: gettab === 2 ? "#ff8b00" : "#ffb103",
                        background: gettab === 2 ? "#ff8b00" : "#fff",
                        color: gettab === 2 ? "#fff" : "#000",
                        fontWeight: gettab === 2 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #000",
                        borderRight: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(2); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn">
                      Account Settings
                      {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
                    </button>
                    <button
                      style={{
                        background: gettab === 37 ? "#ff8b00" : "#fff",
                        color: gettab === 37 ? "#fff" : "#000",
                        fontWeight: gettab === 37 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid",
                        borderBottom: "1px solid"
                        // borderLeft: "1px solid",
                      }}
                      onClick={() => {
                        setTab(37); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn">
                      Product Rate card
                    </button>
                    <button
                      style={{
                        // background:
                        //   gettab === 3 || gettab === 9 || gettab === 10
                        //     ? "#ff8b00"
                        //     : "#ffb103",
                        background:
                          gettab === 3 || gettab === 9 || gettab === 10 || gettab === 16
                            ? "#ff8b00"
                            : "#fff",
                        color:
                          gettab === 3 || gettab === 9 || gettab === 10 || gettab === 16
                            ? "#fff"
                            : "#000",
                        fontWeight:
                          gettab === 3 || gettab === 9 || gettab === 10 || gettab === 16
                            ? "700"
                            : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #000",
                        borderRight: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(3); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn">
                      &nbsp;&nbsp;&nbsp; - Brands
                      {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
                    </button>
                    <button
                      style={{
                        background:
                          gettab === 4 || gettab === 8 || gettab === 15 ? "#ff8b00" : "#fff",
                        color: gettab === 4 || gettab === 8 || gettab === 15 ? "#fff" : "#000",
                        fontWeight:
                          gettab === 4 || gettab === 8 || gettab === 15 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #000",
                        borderRight: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(4); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn">
                      &nbsp;&nbsp;&nbsp; - Eateries
                      {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
                    </button>

                    <button
                      style={{
                        background: gettab === 28 || gettab === 29 || gettab === 30 ? "#ff8b00" : "#fff",
                        color: gettab === 28 || gettab === 29 || gettab === 30 ? "#fff" : "#000",
                        fontWeight: gettab === 28 || gettab === 29 || gettab === 30 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #000",
                        borderRight: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(28); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn">
                      &nbsp;&nbsp;&nbsp; - Cinema
                    </button>
                    {/* <button
                      style={{
                        background: gettab === 17 ? "#ff8b00" : "#ffb103",
                        background: gettab === 17 ? "#ff8b00" : "#fff",
                        color: gettab === 17 ? "#fff" : "#000",
                        fontWeight: gettab === 17 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom:"1px solid #000",
                        borderRight:"1px solid #000"


                      }}
                      onClick={() => setTab(17)}
                      className="profile_sidebar_sig_btn"
                    >
                      &nbsp;&nbsp;&nbsp; - Movies
                      <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div>
                    </button> */}
                    <button
                      style={{
                        background: gettab === 5 || gettab === 11 || gettab === 13 ? "#ff8b00" : "#fff",
                        color: gettab === 5 || gettab === 11 || gettab === 13 ? "#fff" : "#000",
                        fontWeight: gettab === 5 || gettab === 11 || gettab === 13 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #000",
                        borderRight: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(5); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn">
                      &nbsp;&nbsp;&nbsp; - Events
                      {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
                    </button>
                    <button
                      style={{
                        background:
                          gettab === 6 || gettab === 12 || gettab === 26
                            ? "#ff8b00"
                            : "#fff",
                        color:
                          gettab === 6 || gettab === 12 || gettab === 26
                            ? "#fff"
                            : "#000",
                        fontWeight:
                          gettab === 6 || gettab === 12 || gettab === 26
                            ? "700"
                            : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #000",
                        borderRight: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(6); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn">
                      &nbsp;&nbsp;&nbsp; - Facilities
                      {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
                    </button>
                    <button
                      style={{
                        background: gettab === 7 ? "#ff8b00" : "#fff",
                        color: gettab === 7 ? "#fff" : "#000",
                        fontWeight: gettab === 7 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #000",
                        borderRight: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(7); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn">
                      Contact Details
                      {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
                    </button>

                    <button
                      style={{
                        background: "#fff",
                        color: "#000",
                        background: gettab === 22 || gettab === 35 ? "#ff8b00" : "#fff",
                        color: gettab === 22 || gettab === 35 ? "#fff" : "#000",
                        fontWeight: gettab === 22 || gettab === 35 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #000",
                        borderRight: "1px solid #000",
                      }}
                      // onClick={() => setTab(7)}
                      onClick={() => {
                        setTab(22); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn">
                      Track My Analytics
                      {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
                    </button>

                    <button
                      style={{
                        background: "#fff",
                        color: "#000",
                        // background: gettab === 60 ? "#ff8b00" : "#fff",
                        // color: gettab === 60 ? "#fff" : "#000",
                        // fontWeight: gettab === 60 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #000",
                        borderRight: "1px solid #000",
                      }}
                      // onClick={() => setTab(7)}
                      className="profile_sidebar_sig_btn">
                      - My Analytics
                      {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
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
                        setTab(25); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn">
                      - My Archives
                    </button>
                    {/* <button
                      style={{
                        background: gettab === 21 ? "#ff8b00" : "#fff",
                        color: gettab === 21 ? "#fff" : "#000",
                        fontWeight: gettab === 21 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom:"1px solid #000",
                        borderRight:"1px solid #000"

                      }}
                      onClick={() => setTab(21)}
                      className="profile_sidebar_sig_btn"
                    >
                      Cart2
                     
                    </button> */}

                    <button
                      style={{
                        background: gettab === 21 ? "#ff8b00" : "#fff",
                        color: gettab === 21 ? "#fff" : "#000",
                        fontWeight: gettab === 21 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #000",
                        borderRight: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(22); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn">
                      My Cart
                      {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
                    </button>

                    {/* <button
                      style={{
                        background: gettab === 23 ? "#ff8b00" : "#fff",
                        color: gettab === 23 ? "#fff" : "#000",
                        fontWeight: gettab === 23 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom:"1px solid #000",
                        borderRight:"1px solid #000"

                      }}
                      onClick={() => setTab(23)}
                      className="profile_sidebar_sig_btn"
                    >
                      Cart3
                      
                    </button> */}

                    {/* <button
                      style={{
                        background: gettab === 24 ? "#ff8b00" : "#fff",
                        color: gettab === 24 ? "#fff" : "#000",
                        fontWeight: gettab === 24 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom:"1px solid #000",
                        borderRight:"1px solid #000"

                      }}
                      onClick={() => setTab(24)}
                      className="profile_sidebar_sig_btn"
                    >
                      Checkout
                     
                    </button> */}

                    <button
                      style={{
                        background: gettab === 27 ? "#ff8b00" : "#fff",
                        color: gettab === 27 ? "#fff" : "#000",
                        fontWeight: gettab === 27 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #000",
                        borderRight: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(27); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn">
                      FAQ
                      {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
                    </button>

                    <button
                      style={{
                        background: gettab === 32 ? "#ff8b00" : "#fff",
                        color: gettab === 32 ? "#fff" : "#000",
                        fontWeight: gettab === 32 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #000",
                        borderRight: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(32); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn">
                      Notification
                    </button>

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
                        top: "79px", // Adjust as needed
                        left:
                          window.innerWidth <= 900
                            ? "0px" // For screens <= 900px
                            : sidebaropen
                              ? "275px" // For larger screens when sidebar is open
                              : "0px", // For larger screens when sidebar is closed

                        transition: "left 1s ease", // Smooth transition for the arrow position
                        zIndex: "1000", // Make sure the arrow is on top of other elements
                      }}
                      onClick={() => {
                        setSidebarOpen(!sidebaropen);
                        //         if (window.innerWidth <= 900) {
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
              {/* <div className="">
                <MallHero get_mall_auth_data={get_mall_auth_data} />
              </div> */}
              {gettab === 1 && (
                <MallProfilePart
                  setTab={setTab}
                  get_mall_auth_data={get_mall_auth_data}
                  sidebaropen={sidebaropen}
                />
              )}
              {gettab === 2 && (
                <MallManagement
                  get_mall_auth_data={get_mall_auth_data}
                  sidebaropen={sidebaropen}
                  setTab={setTab}
                  getMallModalData={getMallModalData}
                />
              )}
              {gettab === 3 && (
                <StoreDirectory
                  setTab={setTab}
                  storepage={storepage}
                  setStorePage={setStorePage}
                  storetotalPages={storetotalPages}
                  // storeloading={storeloading}
                  setStore_id={setStore_id}
                  // get_mall_store_data={storeList}
                  setSingleStoreData={setSingleStoreData}
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_mall_auth_data}
                />
              )}
              {gettab === 4 && (
                <Eateries
                  eaterypage={eaterypage}
                  setEateryPage={setEateryPage}
                  eaterytotalPages={eaterytotalPages}
                  setTab={setTab}
                  setSingleStoreData={setSingleStoreData}
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_mall_auth_data}
                  setStore_id={setStore_id}
                />
              )}
              {gettab === 5 && (
                <MallEvents
                  setTab={setTab}
                  setEventId={setEventId}
                  eventList={eventList}
                  get_mall_auth_data={get_mall_auth_data}
                  setEventList={setEventList}
                  totalPages={totalPages}
                  setTotalPages={setTotalPages}
                  page={page}
                  loading={loading}
                  SetEventData={SetEventData}
                  EventApi={EventApi}
                />
              )}
              {gettab === 6 && (
                <Facilities
                  setTab={setTab}
                  get_mall_auth_data={get_mall_auth_data}
                  setfacility_id={setfacility_id}
                  getsinglefacilitydata={getsinglefacilitydata}
                  setsinglefacilitydata={setsinglefacilitydata}
                  mallheadname={mallheadname}
                />
              )}
              {gettab === 7 && (
                <ContactDetail get_mall_auth_data={get_mall_auth_data} />
              )}
              {gettab === 8 && (
                <EditEateriesDetails
                  getsingleStoreData={getsingleStoreData}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  get_mall_auth_data={get_mall_auth_data}
                />
              )}
              {gettab === 9 && (
                <EditStoreDetail
                  getsingleStoreData={getsingleStoreData}
                  getstore_is={getstore_is}
                  get_mall_auth_data={get_mall_auth_data}
                  setTab={setTab}
                // getStoreList={getStoreList}
                />
              )}
              {gettab === 10 && (
                <UploadStoreDirectory
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_mall_auth_data}
                  setTab={setTab}
                />
              )}
              {gettab === 11 && (
                <EditMallEvent
                  setTab={setTab}
                  eventList={eventList}
                  geteventId={geteventId}
                  get_mall_auth_data={get_mall_auth_data}
                  EventApi={EventApi}
                  geteventdata1={geteventdata1}
                />
              )}
              {gettab === 12 && (
                <EditFacilities
                  get_mall_auth_data={get_mall_auth_data}
                  getfacility_id={getfacility_id}
                  getsinglefacilitydata={getsinglefacilitydata}
                  setTab={setTab}
                  mallheadname={mallheadname}
                />
              )}
              {gettab === 13 && (
                <MallAddEvents
                  get_mall_auth_data={get_mall_auth_data}
                  setTab={setTab}
                // EventApi={EventApi}
                />
              )}
              {gettab === 14 && (
                <AddMallFacility
                  get_mall_auth_data={get_mall_auth_data}
                  setTab={setTab}
                />
              )}
              {gettab === 15 && (
                <AddEateries
                  get_mall_auth_data={get_mall_auth_data}
                  setTab={setTab}
                />
              )}
              {gettab === 16 && (
                <MallAddStore
                  getsingleStoreData={getsingleStoreData}
                  getstore_is={getstore_is}
                  get_mall_auth_data={get_mall_auth_data}
                  setTab={setTab}
                // getStoreList={getStoreList}
                />
              )}

              {gettab === 17 && (
                <MallMovieCards
                  getsingleStoreData={getsingleStoreData}
                  getstore_is={getstore_is}
                  get_mall_auth_data={get_mall_auth_data}
                  setTab={setTab}
                  gettab={gettab}
                  SetMovieData={SetMovieData}
                />
              )}

              {gettab === 18 && (
                <UploadMovieDirectory
                  getsingleStoreData={getsingleStoreData}
                  getstore_is={getstore_is}
                  get_mall_auth_data={get_mall_auth_data}
                  setTab={setTab}
                />
              )}

              {gettab === 19 && (
                <MallEditMovie
                  getsingleStoreData={getsingleStoreData}
                  getstore_is={getstore_is}
                  get_mall_auth_data={get_mall_auth_data}
                  setTab={setTab}
                  moviedata={moviedata}
                />
              )}
              {gettab === 20 && (
                <MallAddMvie
                  getsingleStoreData={getsingleStoreData}
                  getstore_is={getstore_is}
                  get_mall_auth_data={get_mall_auth_data}
                  setTab={setTab}
                  gettab={gettab}
                />
              )}

              {gettab === 33 && (
                <RetailerTypeSheet
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_mall_auth_data}
                  getstore_is={getstore_is}
                />
              )}

              {gettab === 34 && (
                <UploadEateryDirectory
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_mall_auth_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}

              {gettab === 21 && (
                <MallCart
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_mall_auth_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}

              {gettab === 22 && (
                <MallCart2
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_mall_auth_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}

              {gettab === 23 && (
                <MallCart3
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_mall_auth_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}

              {gettab === 24 && (
                <MallCheckout
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_mall_auth_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  getMallModalData={getMallModalData}
                />
              )}

              {gettab === 26 && (
                <AddFacilities
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_mall_auth_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}

              {gettab === 27 && (
                <FaqMall
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_mall_auth_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}
              {gettab === 28 && (
                <MallCinema
                  setTab={setTab}
                  storepage={storepage}
                  setStorePage={setStorePage}
                  storetotalPages={storetotalPages}
                  setStore_id={setStore_id}
                  // getstore_is={getstore_is}
                  setSingleStoreData={setSingleStoreData}
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_mall_auth_data}
                />
              )}
              {gettab === 29 && (
                <EditMallCinema
                  getsingleStoreData={getsingleStoreData}
                  getstore_is={getstore_is}
                  get_mall_auth_data={get_mall_auth_data}
                  setTab={setTab}
                />
              )}
              {gettab === 30 && (
                <AddMallCinema
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_mall_auth_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}
              {gettab === 31 && (
                <UploadCinemaDirectory
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_mall_auth_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}

              {gettab === 32 && (
                <NotificationMall
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_mall_auth_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}

              {gettab === 25 && (
                <Archives
                  getsingleStoreData={getsingleStoreData}
                  getstore_is={getstore_is}
                  get_mall_auth_data={get_mall_auth_data}
                  setTab={setTab}
                  gettab={gettab}
                />
              )}


              {gettab === 35 && <BuyAnalytics setTab={setTab} get_mall_auth_data={get_mall_auth_data}
              />}

              {gettab === 37 && (
                <MallProRateCard
                  get_mall_auth_data={get_mall_auth_data}
                  sidebaropen={sidebaropen}
                  setTab={setTab}
                  gettab={gettab}
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

export default ProfilePage;
