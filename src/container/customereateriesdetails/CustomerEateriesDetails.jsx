import React, { useEffect, useState } from "react";
// import "./CustomerBrandDetails.css"
import {
    BrandItmCard,
    CustomerEateriesDetailsComponent,
    CustomerEateryHero,
    CustomerHero,
} from "../../components";
import { FaPhone } from "react-icons/fa";
import images from "../../constants/images";
import { IoChevronBack } from "react-icons/io5";
import { HiOutlineSearch } from "react-icons/hi";
import { BsChevronDown } from "react-icons/bs";
import { ACCEPT_HEADER, get_category, get_mall_customer_eateries } from "../../utils/Constant";
import axios from "axios";

const CustomerEateriesDetails = ({ getsingalmalldata, getedetalis, setTab, setEDetalis,setEDetalis2,getRetailerEateryData,setcheckID, sidebaropen, SetNavBarData,
    SetNavBarDataName,
    SetNavBarData1,
    respSearch,
    setResponSearch, }) => {

    const perPage = 3;
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    const [eatList, setEatList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [getbranddata, SetBrandData] = useState("");
    const [getIdTrue, setIdTrue] = useState(1)
    const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
        BrandApi();
    }, [page]);

    const BrandApi = async () => {
        const token = await JSON.parse(localStorage.getItem("is_token"));
        const formdata = new FormData();
        // await formdata.append("search", "");
        await formdata.append("mall_id", getsingalmalldata.id);
        setLoading(true);
        fetch(get_mall_customer_eateries + `per_page=${perPage}&page=${page}`, {
            method: "POST",
            body: formdata,
            headers: {
                Accept: ACCEPT_HEADER,
                Authorization: "Bearer " + token,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                // console.log("eateries_list", res.data.last_page);
                setTotalPages(res.data.last_page);
                setEatList([...eatList, ...res.data.data]);
                setLoading(false);
            })
            .catch((err) => {
                console.log("err", err);
            });
    };

    const BrandApiserch = async (value) => {
        const token = await JSON.parse(localStorage.getItem("is_token"));
        const formdata = new FormData();
        await formdata.append("search", value);
        await formdata.append("mall_id", getsingalmalldata.id);
        // setLoading(true);

        fetch(get_mall_customer_eateries + `per_page=3&page =1`, {
            method: "POST",
            body: formdata,
            headers: {
                Accept: ACCEPT_HEADER,
                Authorization: "Bearer " + token,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                // console.log("Brand_list", res.data);
                // setTotalPages(res.data.last_page);
                setEatList([...eatList, ...res.data.data]);
                // setLoading(false);
            })
            .catch((err) => {
                console.log("err", err);
            });
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

    return (
        <div>
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
            <CustomerEateryHero getsingalmalldata={getsingalmalldata} getedetalis={getedetalis} sidebaropen={sidebaropen} />
            <div className="mall_nearme_brand_main_wrapp">
                <div>
                    <div className="mm_main_wrapp mm_main_wrapp_22" style={{ marginBottom: "40px" }}>
                        <div className='edit-brand-back-iconbox' onClick={() => setTab(4)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>
                        {/* heading */}
                        <div
                            className="profile_head_center customer-brand-details-head"
                            style={{
                                marginTop: "20px",
                                alignItems: "start",
                                justifyContent: "start",
                            }}
                        >
                            {/* <h4 className="h3" style={{ textTransform: "capitalize" }}>{getsingalmalldata.name}</h4> &nbsp;&nbsp; <span className="h3">Eateries</span> */}
                            <h4
                                className="h3"
                                style={{ textTransform: "capitalize", textAlign: "initial", fontWeight: "700" }}
                            >
                                {getedetalis.name} - {getsingalmalldata.name}
                            </h4>
                            {/* &nbsp;&nbsp; <span className="h3">Eateries</span> */}
                        </div>
                        <CustomerEateriesDetailsComponent getedetalis={getedetalis} setTab={setTab} getsingalmalldata={getsingalmalldata} getIdTrue={1} setcheckID={setcheckID} />

                            {getedetalis?.store_type == 2 ? <>
                                {getedetalis?.retailer_register_status == 1 ? <>
                                       {/* heading */}
                        <div className="profile_head_center" style={{ marginTop: "4rem" }}>
                            <h4
                                className="h3"
                                style={{ textTransform: "capitalize", fontWeight: "700" }}
                            >
                                {getsingalmalldata.name}
                            </h4>{" "}
                            <span className="h3" style={{ fontWeight: "700" }}>
                                eateries
                            </span>
                        </div>
                        {/* filter */}
                        <div
                            className="mall_near_brand_filter_sec_wrap"
                            style={{ justifyContent: "center" }}
                        >
                            <div className="mall_near_brand_searchbar mall_near_eatery_searchbar">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    onChange={(e) => {
                                        e.target.value.length > 0
                                            ? (BrandApiserch(e.target.value),
                                                setEatList([]),
                                                setPage(1))
                                            : (setEatList([]), setPage(1), BrandApi());
                                    }}
                                />
                                <HiOutlineSearch color="var(--color-orange)" size={18} />
                            </div>
                        </div>
                        {/* brands */}
                        {loading === true ? <>
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
                        </> : <>
                            <div className="mall_near_brand_list_wrapp">
                                {getRetailerEateryData && getRetailerEateryData.length > 0
                                    ? getRetailerEateryData.map((brndItm) => {
                                        return (
                                            <button
                                                onClick={() => {
                                                    // setBrandModalClose(true);
                                                    SetBrandData(brndItm);
                                                    // setEDetalis(brndItm);
                                                    setEDetalis2(brndItm)
                                                    setTab(32);
                                                }}
                                            >
                                                <BrandItmCard
                                                    img={
                                                        brndItm.store_logo_path === null
                                                            ? null
                                                            : brndItm.store_logo_path
                                                    }
                                                    key={brndItm.id}
                                                />
                                            </button>
                                        );
                                    })
                                    : null}
                            </div>
                            {/* loadmore btn */}
                            {totalPages !== page && (
                                <button
                                    className="view_more_btn"
                                    onClick={() => setPage(page + 1)}
                                >
                                    {loading ? "Loading..." : " Load More "}
                                    <BsChevronDown />
                                </button>
                            )}
                        </>}

                                </> : <></>}
                            </> : <></>}

                            {isVisible ? <>
                                <div className='edit-brand-back-iconbox' onClick={() => setTab(4)} style={{marginTop:"2rem",width:"80px"}}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

                            </> : <></>}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerEateriesDetails;