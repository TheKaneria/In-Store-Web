import React, { useEffect, useState } from "react";
import "./BrandDashboard.css";
import { RetailerNavbar } from "../../common";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BrandHeroEdit, LocationComponent, MyArchiveRetailerProductTileCard } from "../../components";
import {
  AddProductBanner,
  AddProductTilesBanner,
  AddPromotionBanner,
  AddRetailLandingPageBanner,
  AddRetailerBrand,
  AddRetailerLandingpageLeaderboard,
  ArchivesBrand,
  BrandAccountSetting,
  BrandAnalytics,
  BrandCart,
  BrandEdit,
  BrandInMall,
  BuyBrandAnalytics,
  ChooseProduct,
  EditRetailerBrand,
  FaqCinema,
  LeaderBoard,
  MyArchiveRetailerLandingpageTile,
  MyArchiveRetailerLeaderboard,
  MyArchiveRetailerProductBanner,
  MyArchiveRetailerPromotion,
  PromotionalBanner,
  RetailLandingPageSquareTile,
  RetailLandingpageTile,
  RetailerAddLandingPageSquareTile,
  RetailerBrands,
  RetailerFaqPage,
  RetailerLandingPageLeaderboard,
  RetailerLandingPageLeaderboardExtend,
  RetailerLandingPageSquareTileExtend,
  RetailerMyArchiveExtend,
  RetailerProRateCard,
  RetailerProfile,
  RetailerTQCard,
  RetailerThankYou,
  RetailerTrackAnalytics,
  StoreCheckout,
  StoreThankyou,
  // Table,
  UploadMultipleBrand,
} from "../../container";
import { useMeventContext } from "../../context/mevent_context";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useMallContext } from "../../context/mall_context";
import ProductBanner from "../../container/ProductBanner.jsx/ProductBanner";
import ProductTiles from "../../container/producttiles/ProductTiles";
import { useStoreContext } from "../../context/store_context";
import { useAuthContext } from "../../context/auth_context";
import AddLeaderboardBanner from "../../container/addleaderboard/AddLeaderboardBanner";
import { ACCEPT_HEADER, dynamic_model_popup } from "../../utils/Constant";
import axios from "axios";
import MyArchiveRetailerProductTile from "../../container/myarchiveretailerproducttile/MyArchiveRetailerProductTile";

const BrandDashboard = () => {
  const { get_cinema_data, getCategoryApi } = useStoreContext();
  const { get_mall_auth_data, getBrand } = useMallContext();
  const { get_store_data, get_store_loading, getStore, getStoreCartApi } =
    useStoreContext();

  const [gettab, setTab] = useState(1);
  const [getstore_is, setStore_id] = useState();
  const [getstore_is2, setStore_id2] = useState();
  const [getsingleStoreData, setSingleStoreData] = useState({});
  // const [sidebaropen, setSidebarOpen] = useState(true);
  const [sidebaropen, setSidebarOpen] = useState(window.innerWidth > 500); // Set to false if <= 500
  const [getMallModalData, setMallModalData] = useState("");
  const [loading, setLoading] = useState(false);
  const [storepage2, setStorePage2] = useState(1);
  const [getsingleStoreData2, setSingleStoreData2] = useState({});
  const [storetotalPages2, setStoreTotalPages2] = useState(1);
  const [getExtendId, setExtendId] = useState();




  const navigate = useNavigate();

  useEffect(() => {
    getStore();
    getCategoryApi();
    getStoreCartApi();
    getMallModalApi();
  }, []);

  useEffect(() => {

    getBrand(get_store_data?.id);
  }, []);

  // console.log("get_mall_auth_data",get_store_data);


  useEffect(() => {
    if (get_store_data == undefined) {
      window.location.reload(false);
      navigate("/");
    }
  }, []);

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
  // }, [])

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


  // get_store_data == null && set_store_data == "" ? setLoading(true):setLoadng(false);

  return (
    <>
      <Helmet>
        <title>Brand Dashboard | In-store</title>
      </Helmet>

      {/* {get_store_data == "" || get_store_data == null || get_store_data == undefined ? setLoadng(true) : setLoadng(false)} */}
      {get_store_loading === true ? (
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
        <div>
          <RetailerNavbar setTab={setTab} />

          <div className="profilepage_main_wrapp">
            {/* side-bar start  */}
            <div className="resp_sidebar_position" style={{ backgroundColor: "#E5E4E2" }}>
              <div
                className="pro-side-none-resp"
                style={{
                  display: "flex",
                  gap: "5px",

                  // position: sidebaropen === true ? null : "absolute",
                  // left: sidebaropen === true ? null : "-400px",
                  width: sidebaropen ? "275px" : "0px",
                  transition: "width 1s ease",
                }}
              // className="profilepage_sidebarr"
              >
                <div className="profile_sidebar_wrapp">
                  <div className="resp_sidebar_remove_relarive_position"
                    style={{
                      position: "relative",
                      // width: sidebaropen ? "275px" : "0px",
                      width: sidebaropen ? "275px" : "0px",
                      transition: "width 1s ease",
                    }}
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
                        borderRight: "1px solid #000",
                        // borderLeft: "1px solid",
                      }}
                      onClick={() => {
                        setTab(1); if (window.innerWidth <= 900) {
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
                        borderRight: "1px solid #000",
                        // borderLeft: "1px solid",
                      }}
                      onClick={() => {
                        setTab(2); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn"
                    >
                      Account Settings
                      {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
                    </button>
                    {get_store_data?.store_type == 2 ? <>
                      <button
                        style={{
                          background: gettab === 28 || gettab === 29 || gettab === 30 ? "#ff8b00" : "#fff",
                          color: gettab === 28 || gettab === 29 || gettab === 30 ? "#fff" : "#000",
                          fontWeight: gettab === 28 || gettab === 29 || gettab === 30 ? "700" : "500",
                          width: sidebaropen ? "275px" : "0px",
                          overflow: "hidden",
                          transition: "width 1s ease",
                          whiteSpace: "nowrap",
                          borderRight: "1px solid #000",
                          // borderLeft: "1px solid",
                        }}
                        onClick={() => {
                          setTab(28); if (window.innerWidth <= 900) {
                            setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                          }
                        }}
                        className="profile_sidebar_sig_btn cinema_sidebar_sig_btn"
                      >
                        Retailer's Brands
                        {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
                      </button>
                    </> : <></>}

                    <button
                      style={{
                        background: gettab === 13 ? "#ff8b00" : "#fff",
                        color: gettab === 13 ? "#fff" : "#000",
                        fontWeight: gettab === 13 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid #000",
                        // borderLeft: "1px solid",
                      }}
                      onClick={() => {
                        setTab(13); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn"
                    >
                      Product Rate card
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
                        setTab(40); if (window.innerWidth <= 900) {
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
                        setTab(46); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn profile_sidebar_sig_btn_padding"
                    >
                      - Landing Page <br />
                      Square Tiles
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
                        setTab(42); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn profile_sidebar_sig_btn_padding"
                    >
                      - Landing Page <br />
                      Leaderboard Banners
                    </button>
                    <button
                      style={{
                        background:
                          gettab === 3 || gettab === 20 ? "#ff8b00" : "#fff",
                        color: gettab === 3 || gettab === 20 ? "#fff" : "#000",
                        fontWeight:
                          gettab === 3 || gettab === 20 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid #000",
                        // borderLeft: "1px solid",
                      }}
                      onClick={() => {
                        setTab(3); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn profile_sidebar_sig_btn_padding"
                    >
                      - In Mall Leaderboard <br /> Banners
                    </button>
                    <button
                      style={{
                        background:
                          gettab === 4 || gettab === 21 ? "#ff8b00" : "#fff",
                        color: gettab === 4 || gettab === 21 ? "#fff" : "#000",
                        fontWeight:
                          gettab === 4 || gettab === 21 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid #000",
                        // borderLeft: "1px solid",
                      }}
                      onClick={() => {
                        setTab(4); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn profile_sidebar_sig_btn_padding"
                    >
                      - In Mall Promotional <br /> Banners
                    </button>
                    <button
                      style={{
                        background:
                          gettab === 5 || gettab === 22 ? "#ff8b00" : "#fff",
                        color: gettab === 5 || gettab === 22 ? "#fff" : "#000",
                        fontWeight:
                          gettab === 5 || gettab === 22 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid #000",
                        // borderLeft: "1px solid",
                      }}
                      onClick={() => {
                        setTab(5); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn profile_sidebar_sig_btn_padding"
                    >
                      - In Mall Brand
                      <br /> Banner Slider
                      {/* <div className="profile_sidebar_sig_btn_right_arrow">
                  <FiChevronLeft color="#fff" size={20} />
                </div> */}
                    </button>
                    <button
                      style={{
                        background:
                          gettab === 6 || gettab === 23 ? "#ff8b00" : "#fff",
                        color: gettab === 6 || gettab === 23 ? "#fff" : "#000",
                        fontWeight:
                          gettab === 6 || gettab === 23 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid #000",
                        // borderLeft: "1px solid",
                      }}
                      onClick={() => {
                        setTab(6); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn profile_sidebar_sig_btn_padding"
                    >
                      - In Mall Product Tiles
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
                        borderRight: "1px solid #000",
                        // borderLeft: "1px solid",
                      }}
                      // onClick={() => setTab(7)}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn"
                    >
                      Track My Analytics
                    </button>

                    <button
                      style={{
                        background: gettab === 26 ? "#ff8b00" : "#fff",
                        color: gettab === 26 ? "#fff" : "#000",
                        fontWeight: gettab === 26 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #000",
                        borderRight: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(26); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn"
                    >
                      - My Analytics
                    </button>

                    {/* <button
                      style={{
                        background: gettab === 8 ? "#ff8b00" : "#fff",
                        color: gettab === 8 ? "#fff" : "#000",
                        fontWeight: gettab === 8 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #000",
                        borderRight: "1px solid #000",
                      }}
                      onClick={() => setTab(8)}
                      className="profile_sidebar_sig_btn"
                    >
                     My Brand in Malls
                    </button> */}

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
                      className="profile_sidebar_sig_btn"
                    >
                      - My Archives
                    </button>
                    <button
                      style={{
                        background: gettab === 9 ? "#ff8b00" : "#fff",
                        color: gettab === 9 ? "#fff" : "#000",
                        fontWeight: gettab === 9 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid #000",
                        // borderLeft: "1px solid",
                      }}
                      onClick={() => {
                        setTab(9); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn"
                    >
                      My Cart
                    </button>

                    <button
                      style={{
                        background: gettab === 14 ? "#ff8b00" : "#fff",
                        color: gettab === 14 ? "#fff" : "#000",
                        fontWeight: gettab === 14 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid #000",
                        // borderLeft: "1px solid",
                      }}
                      onClick={() => {
                        setTab(14); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn"
                    >
                      FAQ
                    </button>

                    {get_store_data?.store_type == 2 ? <>
                      <button
                        style={{
                          background: gettab === 8 ? "#ff8b00" : "#fff",
                          color: gettab === 8 ? "#fff" : "#000",
                          fontWeight: gettab === 8 ? "700" : "500",
                          width: sidebaropen ? "275px" : "0px",
                          overflow: "hidden",
                          transition: "width 1s ease",
                          whiteSpace: "nowrap",
                          borderBottom: "1px solid #000",
                          borderRight: "1px solid #000",
                        }}
                        onClick={() => {
                          setTab(8); if (window.innerWidth <= 900) {
                            setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                          }
                        }}
                        className="profile_sidebar_sig_btn"
                      >
                        My Brand in Malls
                      </button>
                    </> : <></>}

                    <button
                      style={{
                        background: gettab === 31 || gettab === 32 || gettab === 33 || gettab === 34 || gettab === 35 || gettab === 36 ? "#ff8b00" : "#fff",
                        color: gettab === 31 || gettab === 32 || gettab === 33 || gettab === 34 || gettab === 35 || gettab === 36 ? "#fff" : "#000",
                        fontWeight: gettab === 31 || gettab === 32 || gettab === 33 || gettab === 34 || gettab === 35 || gettab === 36 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #000",
                        borderRight: "1px solid #000",
                      }}
                      onClick={() => {
                        setTab(31); if (window.innerWidth <= 900) {
                          setSidebarOpen(false); // Close sidebar when button is clicked on small screens
                        }
                      }}
                      className="profile_sidebar_sig_btn"
                    >
                      My Archive (Extend)
                    </button>

                    {/* <button
                      style={{
                        background: gettab === 15 ? "#ff8b00" : "#fff",
                        color: gettab === 15 ? "#fff" : "#000",
                        fontWeight: gettab === 15 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid",
                        borderLeft: "1px solid",
                      }}
                      onClick={() => setTab(15)}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn">
                      Table
                    </button> */}
                    {/* <button
                      style={{
                        background: gettab === 16 ? "#ff8b00" : "#fff",
                        color: gettab === 16 ? "#fff" : "#000",
                        fontWeight: gettab === 16 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid",
                        borderLeft: "1px solid",
                      }}
                      onClick={() => setTab(16)}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn">
                      Thank You
                    </button> */}
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
                        borderLeft: "1px solid",
                      }}
                      onClick={() => setTab(17)}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn">
                      Thank You Card
                    </button> */}
                    {/* <button
                      style={{
                        background: gettab === 111 ? "#ff8b00" : "#fff",
                        color: gettab === 111 ? "#fff" : "#000",
                        fontWeight: gettab === 111 ? "700" : "500",
                        width: sidebaropen ? "275px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid",
                        borderLeft: "1px solid",
                      }}
                      onClick={() => setTab(111)}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn">
                      Location{" "}
                    </button> */}

                    {/* <button
                      style={{
                        background: gettab === 12 ? "#ff8b00" : "#fff",
                        color: gettab === 12 ? "#fff" : "#000",
                        fontWeight: gettab === 12 ? "700" : "500",
                        width: sidebaropen ? "350px" : "0px",
                        overflow: "hidden",
                        transition: "width 1s ease",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid",
                        borderLeft: "1px solid",
                      }}
                      onClick={() => setTab(12)}
                      className="profile_sidebar_sig_btn cinema_sidebar_sig_btn">
                      Checkout
                    </button> */}
                  </div>

                  <div>
                    {/* <div
                      className="profile_sidebar_sig_btn_right_arrow"
                      onClick={() => {
                        setSidebarOpen(!sidebaropen);
                      }}
                    >
                       {sidebaropen === true ? <>
                          <FiChevronLeft color="#fff" size={20} />

                        </> : <>
                        <FiChevronRight color="#fff" size={20} />

                        </>}
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
            </div>

            {/* side-bar end  */}

            {/* main-cotainer start */}
            <div className="profile_main_sec_wrapp" onClick={() => { if (window.innerWidth <= 900) { setSidebarOpen(false) } }}>
              <div className="">
                {gettab !== 2 &&
                  gettab !== 14 &&
                  gettab !== 12 &&
                  gettab !== 9 && gettab !== 25 ? (
                  <BrandHeroEdit
                    get_mall_auth_data={get_store_data}
                    sidebaropen={sidebaropen}
                    setTab={setTab}
                  />
                ) : null}
              </div>

              {gettab === 111 && (
                <LocationComponent
                  setTab={setTab}
                  get_mall_auth_data={get_store_data}
                  sidebaropen={sidebaropen}
                />
              )}
              {gettab === 1 && (
                <RetailerProfile
                  setTab={setTab}
                  get_mall_auth_data={get_store_data}
                  sidebaropen={sidebaropen}
                />
              )}
              {gettab === 2 && (
                <BrandAccountSetting
                  get_mall_auth_data={get_store_data}
                  setTab={setTab}
                  getTab={gettab}
                  sidebaropen={sidebaropen}
                  getMallModalData={getMallModalData}
                />
              )}
              {gettab === 3 && (
                <LeaderBoard
                  get_mall_auth_data={get_store_data}
                  setTab={setTab}
                  getTab={gettab}
                />
              )}
              {gettab === 4 && (
                <PromotionalBanner
                  get_mall_auth_data={get_store_data}
                  setTab={setTab}
                  getTab={gettab}
                />
              )}
              {gettab === 5 && (
                <ProductBanner
                  get_mall_auth_data={get_store_data}
                  setTab={setTab}
                  getTab={gettab}
                />
              )}
              {gettab === 6 && (
                <ProductTiles
                  get_mall_auth_data={get_store_data}
                  setTab={setTab}
                  getTab={gettab}
                />
              )}
              {/* {gettab === 7 && (
                <RetailerTrackAnalytics
                  get_mall_auth_data={get_store_data}
                  setTab={setTab}
                />
              )} */}
              {/* {gettab === 7 && (
                <ChooseProduct
                  get_mall_auth_data={get_store_data}
                  setTab={setTab}
                />
              )} */}
              {gettab === 8 && (
                <BrandInMall
                  get_mall_auth_data={get_store_data}
                  setTab={setTab}
                  getTab={gettab}
                />
              )}
              {gettab === 9 && (
                <BrandCart
                  get_mall_auth_data={get_store_data}
                  setTab={setTab}
                  getTab={gettab}
                />
              )}
              {gettab === 10 && (
                <BrandEdit
                  get_mall_auth_data={get_store_data}
                  setTab={setTab}
                  getTab={gettab}
                />
              )}
              {gettab === 11 && (
                <StoreThankyou
                  setTab={setTab}
                  get_mall_auth_data={get_store_data}
                  getTab={gettab}
                />
              )}
              {gettab === 12 && (
                <StoreCheckout
                  setTab={setTab}
                  get_mall_auth_data={get_store_data}
                  getTab={gettab}
                  getMallModalData={getMallModalData}
                />
              )}
              {gettab === 13 && (
                <RetailerProRateCard
                  get_mall_auth_data={get_cinema_data}
                  sidebaropen={sidebaropen}
                  setTab={setTab}
                  gettab={gettab}
                />
              )}
              {gettab === 14 && <RetailerFaqPage />}
              {/* {gettab === 14 && <FaqCinema />} */}

              {/* {gettab === 15 && <Table />} */}

              {gettab === 16 && <RetailerThankYou />}
              {gettab === 17 && <RetailerTQCard />}

              {gettab === 20 && (
                <AddLeaderboardBanner
                  setTab={setTab}
                  get_mall_auth_data={get_store_data}
                  getTab={gettab}
                />
              )}
              {gettab === 21 && (
                <AddPromotionBanner
                  setTab={setTab}
                  get_mall_auth_data={get_store_data}
                  getTab={gettab}
                />
              )}
              {gettab === 22 && (
                <AddProductBanner
                  setTab={setTab}
                  get_mall_auth_data={get_store_data}
                  getTab={gettab}
                />
              )}
              {gettab === 23 && (
                <AddProductTilesBanner
                  setTab={setTab}
                  get_mall_auth_data={get_store_data}
                  getTab={gettab}
                />
              )}
              {gettab === 24 && (
                <UploadMultipleBrand
                  setTab={setTab}
                  get_mall_auth_data={get_store_data}
                  getTab={gettab}
                />
              )}
              {gettab === 40 && (
                <RetailLandingpageTile
                  setTab={setTab}
                  get_mall_auth_data={get_store_data}
                  getTab={gettab}
                />
              )}
              {gettab === 41 && (
                <AddRetailLandingPageBanner
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_store_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}
              {gettab === 42 && (
                <RetailerLandingPageLeaderboard
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_store_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  getTab={gettab}
                />
              )}
              {/* RetailerAddCinemaLandingpageLeaderboard */}
              {gettab === 43 && (
                <AddRetailerLandingpageLeaderboard
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_store_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}
              {gettab === 46 && (
                <RetailLandingPageSquareTile
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_store_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  getTab={gettab}
                />
              )}
              {gettab === 47 && (
                <RetailerAddLandingPageSquareTile
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_store_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                />
              )}
              {gettab === 25 && (
                <ArchivesBrand
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_store_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                />
              )}

              {gettab === 26 && (
                <BrandAnalytics
                  setTab={setTab}
                  gettab={gettab}
                  get_mall_auth_data={get_store_data}
                />
              )}
              {gettab === 27 && (
                <BuyBrandAnalytics
                  setTab={setTab}
                  gettab={gettab}
                  get_mall_auth_data={get_store_data}
                />
              )}
              {gettab === 28 && (
                <RetailerBrands
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
                  get_mall_auth_data={get_store_data}
                />
              )}
              {gettab === 30 && (
                <EditRetailerBrand
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
                  get_mall_auth_data={get_store_data}
                />
              )}
              {gettab === 29 && (
                <AddRetailerBrand
                  setTab={setTab}
                  gettab={gettab}
                  get_mall_auth_data={get_store_data}
                  getsingleStoreData={getsingleStoreData}
                />
              )}

              {gettab === 31 && (
                <RetailerMyArchiveExtend
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_store_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getExtendId={getExtendId}
                  setExtendId={setExtendId}
                />
              )}
              {gettab === 32 && (
                <MyArchiveRetailerLandingpageTile
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_store_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getExtendId={getExtendId}
                  setExtendId={setExtendId}
                />
              )}
              {gettab === 33 && (
                <MyArchiveRetailerLeaderboard
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_store_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getExtendId={getExtendId}
                  setExtendId={setExtendId}
                />
              )}
              {gettab === 34 && (
                <MyArchiveRetailerPromotion
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_store_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getExtendId={getExtendId}
                  setExtendId={setExtendId}
                />
              )}
              {gettab === 35 && (
                <MyArchiveRetailerProductBanner
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_store_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getExtendId={getExtendId}
                  setExtendId={setExtendId}
                />
              )}
              {gettab === 36 && (
                <MyArchiveRetailerProductTile
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_store_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getExtendId={getExtendId}
                  setExtendId={setExtendId}
                />
              )}
              {gettab === 37 && (
                <RetailerLandingPageSquareTileExtend
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_store_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getExtendId={getExtendId}
                  setExtendId={setExtendId}
                />
              )}
              {gettab === 38 && (
                <RetailerLandingPageLeaderboardExtend
                  getsingleStoreData={getsingleStoreData}
                  get_mall_auth_data={get_store_data}
                  getstore_is={getstore_is}
                  setTab={setTab}
                  gettab={gettab}
                  getExtendId={getExtendId}
                  setExtendId={setExtendId}
                />
              )}
            </div>
            {/* main-container end */}
          </div>
        </div>
      )}
    </>
  );
};

export default BrandDashboard;