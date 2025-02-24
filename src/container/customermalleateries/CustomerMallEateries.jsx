import React, { useEffect, useState } from "react";
import "./CustomerMallEateries.css";
import { BrandItmCard, CustomerHeroSecond, MallHero } from "../../components";
import { HiOutlineSearch } from "react-icons/hi";
import { useMallContext } from "../../context/mall_context";
import { BsChevronDown } from "react-icons/bs";
import images from "../../constants/images";
import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import ReactModal from "react-modal";
import {
  ACCEPT_HEADER,
  get_category,
  get_customer_retailer_brand,
  get_mall_customer_eateries,
} from "../../utils/Constant";
import { IoChevronBack } from "react-icons/io5";
import axios from "axios";

const BrandData = [
  {
    id: 1,
    img: images.sl1,
  },
  {
    id: 2,
    img: images.sl2,
  },
  {
    id: 3,
    img: images.sl3,
  },
  {
    id: 4,
    img: images.sl4,
  },
  ,
  {
    id: 5,
    img: images.sl5,
  },
  {
    id: 6,
    img: images.sl6,
  },
];

const CustomerMallEateries = ({ getsingalmalldata, setTab, setEDetalis, getRetailerEateryData,setRetailerEateryData, getRetailerEateryLoading, setRetailerEateryLoading, sidebaropen,SetNavBarData,
  SetNavBarDataName,
  SetNavBarData1,
  respSearch,
  setResponSearch, }) => {
  const { get_mall_auth_data, get_mall_store_data } = useMallContext();
  const [brandModalOpen, setBrandModalClose] = useState(false);

  function closeModal() {
    setBrandModalClose(false);
  }

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

  const perPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [eatList, setEatList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [getbranddata, SetBrandData] = useState("");
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
        // ("eateries_list", res.data.last_page);
        setTotalPages(res.data.last_page);
        setEatList([...eatList, ...res.data.data]);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const customerRetailerBrands = async (id) => {
    const token = await JSON.parse(localStorage.getItem("is_token"));
    setRetailerEateryLoading(true);
    const formdata = new FormData();
    await formdata.append("mall_id", getsingalmalldata.id);
    await formdata.append("store_id", id);
    axios
      .post(get_customer_retailer_brand, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success == 1) {
          // Notification("success", "Success!", "Update Successfully!");
          console.log("data are",res.data);
          setRetailerEateryData(res.data.data);
          setRetailerEateryLoading(false);
        }
      })
      .catch((err) => {
        console.log("error11", err);
        setRetailerEateryLoading(false);

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

  const BrandApiserch = async (value) => {
    const token = await JSON.parse(localStorage.getItem("is_token"));
    const formdata = new FormData();
    await formdata.append("search", value);
    await formdata.append("mall_id", getsingalmalldata.id);
    // setLoading(true);

    fetch(get_mall_customer_eateries + `per_page=3&page=1`, {
      method: "POST",
      body: formdata,
      headers: {
        Accept: ACCEPT_HEADER,
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // ("Brand_list", res.data);
        // setTotalPages(res.data.last_page);
        setEatList([...eatList, ...res.data.data]);
        // setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
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
        <div className="mall_nearme_brand_main_wrapp">
          {/* <MallHero getsingalmalldata={getsingalmalldata} /> */}
          <CustomerHeroSecond getsingalmalldata={getsingalmalldata} sidebaropen={sidebaropen} />
          <div className="mm_main_wrapp mm_main_wrapp_22" style={{ marginTop: "2.2rem" }}>
          <div className='edit-brand-back-iconbox' style={{width:"80px"}} onClick={() => setTab(2)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

            {/* heading */}
            <div className="profile_head_center">
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
            <div className="mall_near_brand_list_wrapp">
              {eatList && eatList.length > 0
                ? eatList.map((brndItm) => {
                    return (
                      <button
                        onClick={() => {
                          // setBrandModalClose(true);
                          SetBrandData(brndItm);
                          setEDetalis(brndItm);
                          customerRetailerBrands(brndItm.id)
                          setTab(27);
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

            {isVisible ? <>
              <div className='edit-brand-back-iconbox' style={{width:"80px",marginTop:"2rem"}} onClick={() => setTab(2)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

            </> : <></>}

          </div>
        </div>
        </>
        
      )}
      {/* store detail model */}

      <ReactModal
        isOpen={brandModalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="sd_model_wrapp">
          {/* edit btn */}
          <div className="sd_model_edit_wrap">
            <button onClick={closeModal}>
              <img src={images.close} alt="" />
            </button>
          </div>

          {/* pert - 1 */}
          <div className="sd_model_sec1">
            <div className="sd_model_sec1_img_wrapp">
              <img
                src={
                  getbranddata.store_logo_path === null
                    ? images.et_logo2
                    : getbranddata.store_logo_path
                }
                alt=""
              />
            </div>
            <div className="sd_model_sec1_name_part">
              <h3
                className="h3 mb_8"
                style={{ letterSpacing: "1px", fontWeight: "800" }}
              >
                {getbranddata.name}
              </h3>
              <p>
                Shop no: <span> {getbranddata.store_no} </span>
              </p>
              <p>
                Level:
                <span>{getbranddata.store_level} </span>
              </p>
              <p>
                Trading Hours:
                <span>
                  {getbranddata.mon_fri_from_time} -
                  {getbranddata.mon_fri_to_time}
                </span>
              </p>
            </div>
          </div>
          {/* pert - 2 */}
          <div className="sd_model_sec2">
            <div className="sd_model_sec2_sigle">
              <FaPhone color="var(--color-orange)" size={16} />
              <p>{getbranddata.number}</p>
            </div>
            <div className="sd_model_sec2_sigle">
              <img src={images.send} alt="" />
              <p>{getbranddata.email}</p>
            </div>
          </div>
          {/* pert - 3 */}
          <div className="sd_model_sec3">
            <p>
              Situated in the Clock Tower on the Fish Quay is Vida e Caffè.
              Inspired by the street cafés of Portugal, and infused with the
              vivacious energy of the people of Africa, Vida e Caffè is
              passionate about their coffee. Based on the fare typical of a
              street in Lisbon, Vida e Caffè allows you to enjoy a cup of Europe
              in Africa. A passion for perfection means this cafè always strives
              to serve the best espresso and espresso-based caffè beverages
              possible. The signature coffee bean has been meticulously selected
              and sourced from afar, taking up to three months to reach the
              stores. Here they’ve mastered the art of blending, discovered the
              ideal roasting time, and found the exact temperature to ensure
              your cup of Vida is the best quality it can possibly be. Also try
              some of the delectable desserts and light meals.
            </p>
          </div>
        </div>
        {/* </div> */}
      </ReactModal>
    </div>
  );
};

export default CustomerMallEateries;