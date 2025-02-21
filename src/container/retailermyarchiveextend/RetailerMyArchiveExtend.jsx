import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./RetailerMyArchiveExtend.css";
import { RetailerNavigationBar } from "../../components";
import { ACCEPT_HEADER, get_archive } from "../../utils/Constant";
import axios from "axios";
import images from "../../constants/images";

const RetailerMyArchiveExtend = ({
    setTab,
    getsingleStoreData,
    get_mall_auth_data,
    gettab,
    getExtendId,
    setExtendId,
}) => {
    const AccordionData = [
        {
            id: 1,
            name: "Landing Page 1/2 Tile",
            value: "landingpagetile",
        },
        {
            id: 2,
            name: "Landing Page Square Tiles",
            value: "landingpage_squaretile",
        },
        {
            id: 3,
            name: "Landing Page Leaderboard Banner",
            value: "landingpage_leaderboard",
        },
        {
            id: 4,
            name: "Leaderboard Banner Mall",
            value: "leaderboard",
        },
        {
            id: 5,
            name: "Promotional Banner",
            value: "promotion",
        },
        {
            id: 6,
            name: "In Mall Brand Banner slider",
            value: "productbanner",
        },
        {
            id: 7,
            name: "In Mall Product Tiles",
            value: "productbanner_tiles",
        },
    ];

    const [getnearStore, SetnearStore] = useState();
    const [getnearStore2, SetnearStore2] = useState();
    const [sort_array, SetSort_Array] = useState([]);
    const [isload, SetLoad] = useState(false);

    useEffect(() => {
        Get_cart();
    }, []);

    const Get_cart = async () => {
        const token = JSON.parse(localStorage.getItem("is_token"));
        SetLoad(true);
        axios
            .get(get_archive, {
                headers: {
                    Accept: ACCEPT_HEADER,
                    Authorization: "Bearer " + token,
                },
            })
            .then((res) => {
                //   console.log("rrr",  JSON.stringify(res.data, null, 2));

                if (res.data.success == 1) {
                    SetnearStore(res.data.data);
                    SetnearStore2(res.data.data.leaderboard.data);
                    ValueArray(res.data.data);
                    SetLoad(false);
                } else {
                    SetLoad(false);
                }
            })
            .catch((err) => {
                console.log("err11", err);
                SetLoad(false);
            });
    };

    const array_sort = (id) => {
        if (id === "landingpagetile") {
            SetSort_Array(getnearStore.landingpagetile.data);
        } else if (id === "landingpage_squaretile") {
            SetSort_Array(getnearStore.landingpage_squaretile.data);
        } else if (id === "landingpage_leaderboard") {
            SetSort_Array(getnearStore.landingpage_leaderboard.data);
        } else if (id === "leaderboard") {
            SetSort_Array(getnearStore.leaderboard.data);
        } else if (id === "promotion") {
            SetSort_Array(getnearStore.promotion.data);
        } else if (id === "productbanner") {
            SetSort_Array(getnearStore.productbanner.data);
        } else if (id === "productbanner_tiles") {
            SetSort_Array(getnearStore.productbanner_tiles.data);
        }
    };

    const [getmainarray, setMainArray] = useState([]);
    const [getsecoendarray, setSecoendArray] = useState([]);

    //   console.log("getsecoendarray", getsecoendarray);

    const ValueArray = (data) => {
        const mergedData = AccordionData.map((item) => ({
            ...item,
            count: data[item.value]?.count || 0,
            data: data[item.value]?.data || [],
        }));

        // console.log("aaaa", JSON.stringify(mergedData, null, 2));

        setMainArray(mergedData);
    };

    const [getCartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [toggle, setToggle] = useState(null);
    let handleToggle = (id) => {
        if (toggle === id) {
            setToggle(null);
            return false;
        }
        setToggle(id);
    };

    return (
        <>
            {isload === true ? (
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
                    <div
                        className="MallCart_main Archive_main"
                        style={{ gap: "1rem", paddingTop: "1rem" }}
                    >
                        <RetailerNavigationBar
                            title="My Archive"
                            setTabType={gettab == 31 ? " Leaderboard Banners" : ""}
                        />
                        <div>
                            <h1 className="h3" style={{ fontWeight: "600" }}>
                                <p className="mall_name_heading">
                                    {get_mall_auth_data &&
                                        get_mall_auth_data.name &&
                                        get_mall_auth_data.name}{" "}
                                    :<span> My Archives </span>
                                </p>
                            </h1>
                        </div>

                        <div className="checkout-main-wrapp myarchive_main">
                            {/* <p className="brand-checkout-subheading">Summary</p> */}
                            <div className="checkout-dropdown-main-wrapp">
                                {getmainarray && getmainarray.length > 0
                                    ? getmainarray.map((item, index) => {
                                        return (
                                            <>
                                                <button
                                                    className="checkout-head-sub-part"
                                                    onClick={() => {
                                                        handleToggle(item.id);
                                                        setSecoendArray(item.data);
                                                    }}
                                                >
                                                    <div className="checkout-heading-txt-part">
                                                        <p className="checkout-heading-txt myarchive_heading_text">
                                                            {item.name} ({item.count})
                                                        </p>
                                                    </div>
                                                    {item.id === toggle ? (
                                                        <IoIosArrowUp size={20} color="#ff8b00" />
                                                    ) : (
                                                        <IoIosArrowDown size={20} />
                                                    )}
                                                </button>
                                                {item.id === toggle ? (
                                                    <div className="bim_accordian_mall_wrapp">
                                                        {getsecoendarray.map((itm, ind) => {
                                                            return (
                                                                <>
                                                                    <div className="archive_sub_txt_flex">
                                                                        <div className="archive_list_name_flex">
                                                                            {toggle == 2 ? <>
                                                                                <div
                                                                                    className={`${toggle == 7 || toggle == 2
                                                                                        ? "brandcc_sec1_protile_brand"
                                                                                        : "brandcc_sec1"
                                                                                        }`}
                                                                                >
                                                                                    <img
                                                                                        src={itm.multiple_images[0].image_path}
                                                                                        style={{
                                                                                            width: "100%",
                                                                                            height: "100%",
                                                                                            objectFit: "cover",
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </> : <>
                                                                                <div
                                                                                    className={`${toggle == 7 || toggle == 2
                                                                                        ? "brandcc_sec1_protile_brand"
                                                                                        : "brandcc_sec1"
                                                                                        }`}
                                                                                >
                                                                                    <img
                                                                                        src={itm.image_path}
                                                                                        style={{
                                                                                            width: "100%",
                                                                                            height: "100%",
                                                                                            objectFit: "cover",
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </>}

                                                                            <button
                                                                                key={itm.id}
                                                                                className="my_archive_sub_text"
                                                                            >
                                                                                {itm.title
                                                                                    ? itm.title
                                                                                    : itm.description}
                                                                            </button>
                                                                        </div>

                                                                        <button
                                                                            onClick={() => {
                                                                                if (item.id === 4) {
                                                                                    setExtendId(itm);
                                                                                    setTab(33);
                                                                                }
                                                                                if (item.id === 5) {
                                                                                    setExtendId(itm);
                                                                                    setTab(34);
                                                                                }
                                                                                if (item.id === 6) {
                                                                                    setExtendId(itm);
                                                                                    setTab(35);
                                                                                }
                                                                                if (item.id === 7) {
                                                                                    setExtendId(itm);
                                                                                    setTab(36);
                                                                                }
                                                                                if (item.id === 2) {
                                                                                    setExtendId(itm);
                                                                                    setTab(37);
                                                                                }
                                                                                if (item.id === 3) {
                                                                                    setExtendId(itm);
                                                                                    setTab(38);
                                                                                }
                                                                                if (item.id === 1) {
                                                                                    setExtendId(itm);
                                                                                    setTab(32);
                                                                                }
                                                                            }}
                                                                            className="leaderboard-delete-icon-btn extend_archive_btnn"
                                                                            style={{ alignSelf: "center" }}
                                                                        >
                                                                            <span className="leaderboard-extend-txt">
                                                                                Extend
                                                                            </span>{" "}
                                                                            <img
                                                                                src={images.extend_icon}
                                                                                className="leaderboard-delete-icon leaderboard-extedd-icon"
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            );
                                                        })}
                                                    </div>
                                                ) : null}
                                            </>
                                        );
                                    })
                                    : null}
                                {/* {AccordionData && AccordionData.length > 0
                                    ? AccordionData.map((item, index) => {
                                        return (
                                            <>
                                                <button
                                                    className="checkout-head-sub-part"
                                                    onClick={() => {
                                                        handleToggle(item.id);
                                                        array_sort(item.value);
                                                    }}
                                                >
                                                    <div className="checkout-heading-txt-part">
                                                        <p className="checkout-heading-txt myarchive_heading_text">
                                                            {item.name}


                                                        </p>
                                                    </div>
                                                    {item.id === toggle ? (
                                                        <IoIosArrowUp size={20} color="#ff8b00" />
                                                    ) : (
                                                        <IoIosArrowDown size={20} />
                                                    )}

                                                </button>

                                                {item.id === toggle ? (
                                                    <div className="bim_accordian_mall_wrapp">
                                                        {sort_array.map((itm, ind) => {
                                                            
                                                            return (
                                                                <>
                                                                    {item.id == 1 ? (
                                                                        <div className='archive_sub_txt_flex'>
                                                                            <button key={itm.id}
                                                                                className='my_archive_sub_text'
                                                                            >

                                                                                {itm.title}

                                                                            </button>

                                                                        </div>
                                                                    ) : item.id == 2 ? (
                                                                        <div className='archive_sub_txt_flex'>
                                                                            <button key={itm.id}
                                                                                className='my_archive_sub_text'
                                                                            >
                                                                                
                                                                                {itm.title}

                                                                            </button>
                                                                        </div>
                                                                    ) : item.id == 3 ? (
                                                                        <div className='archive_sub_txt_flex'>
                                                                            <button key={itm.id}
                                                                                className='my_archive_sub_text'>
                                                                               
                                                                                {itm.title}

                                                                            </button>
                                                                        </div>
                                                                    ) : item.id == 4 ? (
                                                                        <div className='archive_sub_txt_flex'>
                                                                            <button key={itm.id}
                                                                                className='my_archive_sub_text'

                                                                            >
                                                                                {itm.title} 
                                                                              

                                                                            </button>



                                                                            <button
                                                                                onClick={() => {
                                                                                    if (item.id === 4) {
                                                                                        setExtendId(itm);
                                                                                        setTab(33);
                                                                                    }
                                                                                }}

                                                                                className="leaderboard-delete-icon-btn"
                                                                            >
                                                                                <span className="leaderboard-extend-txt">Extend</span>{" "}
                                                                                <img
                                                                                    src={images.extend_icon}
                                                                                    className="leaderboard-delete-icon leaderboard-extedd-icon"
                                                                                />
                                                                            </button>
                                                                        </div>
                                                                    ) : item.id == 5 ? (
                                                                        <div className='archive_sub_txt_flex'>
                                                                            <button key={itm.id}
                                                                                className='my_archive_sub_text'
                                                                            >
                                                                               
                                                                                {itm.description}

                                                                            </button>
                                                                            <button
                                                                                onClick={() => {
                                                                                    if (item.id === 5) {
                                                                                        setExtendId(itm);
                                                                                        setTab(34);
                                                                                    }
                                                                                }}
                                                                                className="leaderboard-delete-icon-btn"
                                                                            >
                                                                                <span className="leaderboard-extend-txt">Extend</span>{" "}
                                                                                <img
                                                                                    src={images.extend_icon}
                                                                                    className="leaderboard-delete-icon leaderboard-extedd-icon"
                                                                                />
                                                                            </button>
                                                                        </div>
                                                                    ) : item.id == 6 ? (
                                                                        <div className='archive_sub_txt_flex'>
                                                                            <button key={itm.id}
                                                                                className='my_archive_sub_text'
                                                                            >
                                                                              
                                                                                {itm.description}
                                                                            </button>
                                                                            <button
                                                                                onClick={() => {
                                                                                    if (item.id === 6) {
                                                                                        setExtendId(itm);
                                                                                        setTab(35);
                                                                                    }
                                                                                }}
                                                                                //   onClick={() => openMallModal()}
                                                                                className="leaderboard-delete-icon-btn"
                                                                            >
                                                                                <span className="leaderboard-extend-txt">Extend</span>{" "}
                                                                                <img
                                                                                    src={images.extend_icon}
                                                                                    className="leaderboard-delete-icon leaderboard-extedd-icon"
                                                                                />
                                                                            </button>
                                                                        </div>
                                                                    ) : item.id == 7 ? (
                                                                        <div className='archive_sub_txt_flex'>
                                                                            <button key={itm.id}
                                                                                className='my_archive_sub_text'
                                                                            >
                                                                                
                                                                                {itm.title}

                                                                            </button>
                                                                            <button onClick={() => {
                                                                                    if (item.id === 7) {
                                                                                        setExtendId(itm);
                                                                                        setTab(36);
                                                                                    }
                                                                                }}
                                                                                className="leaderboard-delete-icon-btn"
                                                                            >
                                                                                <span className="leaderboard-extend-txt">Extend</span>{" "}
                                                                                <img
                                                                                    src={images.extend_icon}
                                                                                    className="leaderboard-delete-icon leaderboard-extedd-icon"
                                                                                />
                                                                            </button>
                                                                        </div>
                                                                    ) : null}
                                                                </>
                                                            );
                                                        })}
                                                    </div>
                                                ) : null}
                                            </>
                                        );
                                    })
                                    : null} */}
                                {/* <div className="checkout-totalbox">
                  <p className="checkout-total-txt">Total</p>
                  <p className="checkout-total-txt">
                    R{" "}
                    {totalomebytwo +
                      totalsquare +
                      totallandingleaderboard +
                      totallead +
                      totalpro +
                      totalpduct +
                      totalpducttil}{" "}
                  </p>
                </div> */}
                            </div>
                        </div>
                        {/* <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}>
           

          </div> */}
                    </div>
                </>
            )}
        </>
    );
};

export default RetailerMyArchiveExtend;