import React, { useEffect, useState } from "react";
import "./CustomerBrandItems.css";
import {
  CustomerBrandCard,
  CustomerHeroSecond,
  CustomerProductTilesHero,
  MallHero,
} from "../../components";
import { useMallContext } from "../../context/mall_context";
import { HiOutlineSearch } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";
import {
  ACCEPT_HEADER,
  get_category,
  get_product_customer,
  product_banner_tiles_customer,
  product_cus_tile,
} from "../../utils/Constant";
import axios from "axios";
import { IoChevronBack } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import images from "../../constants/images";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const CustomerBrandItems = ({
  setTab,
  proid,
  brandid,
  sidebaropen,
  getStoreName,
  getsingalmalldata,
  SetNavBarData,
  SetNavBarDataName,
  SetNavBarData1,
  respSearch,
  setResponSearch,
}) => {
  var settings = {
    // dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,

  };

  const { get_mall_auth_data, get_mall_store_data } = useMallContext();

  const [getid, setid] = useState("");
  const [getserach, setSerach] = useState("");


  // useEffect(() => {
  //   getmovielist();
  //   getproductbanner()
  // }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("malldata"));
    // ("======>123", data);

    getmovielist(data.id);
    getproductbanner(data.id);
    getcat();
  }, []);

  const [getlist, SetList] = useState([]);
  const [loading, SetLoading] = useState(false);

  const [getlist1, SetList1] = useState([]);
  const [loading1, SetLoading1] = useState(false);
  const [isVisible, setIsVisible] = useState(false);


  const getproductbanner = async (id) => {
    SetLoading1(true);
    const token = JSON.parse(localStorage.getItem("is_token"));

    const formdata = new FormData();
    formdata.append("mall_id", id);
    formdata.append("store_id", brandid);

    // "formdata", id, brandid;



    axios
      .post(get_product_customer, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // "getproductbanner---->>L>", JSON.stringify(res.data.data, null, 2);
        if (res.data.success == 1) {
          SetList1(res.data.data);

          SetLoading1(false);
        } else {
          SetLoading1(false);
        }
      })
      .catch((err) => {
        console.log("err11", err);
        SetLoading(false);
      });
  };

  const [catarray, SetArray] = useState([]);

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

  // console.log("getlist1", getlist1);


  // const getmovielist = async (id) => {
  //   setid(id);
  //   SetLoading(true);
  //   const token = JSON.parse(localStorage.getItem("is_token"));

  //   const formdata = new FormData();
  //   formdata.append("mall_id", id);
  //   formdata.append("brand_id", brandid);

  //   ("formdata", id, brandid);

  //   axios
  //     .post(product_cus_tile, formdata, {
  //       headers: {
  //         Accept: ACCEPT_HEADER,
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((res) => {
  //       ("ggg", JSON.stringify(res.data, null, 2));
  //       if (res.data.success == 1) {
  //         SetList(res.data.data);
  //         setBranchArray(res.data.data);
  //         SetLoading(false);
  //       } else {
  //         null;
  //         SetLoading(false);
  //       }
  //     })
  //     .catch((err) => {
  //      console.log("err11", err);
  //       SetLoading(false);
  //     });
  // };
  const getmovielist = async (id) => {
    setid(id);
    SetLoading(true);
    const token = JSON.parse(localStorage.getItem("is_token"));

    const formdata = new FormData();
    formdata.append("mall_id", id);
    formdata.append("store_id", brandid);

    axios
      .post(product_banner_tiles_customer, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // "ggg", JSON.stringify(res.data, null, 2);
        if (res.data.success == 1) {
          SetList(res.data.data);
          setBranchArray(res.data.data);
          SetLoading(false);
        } else {
          SetLoading(false);
        }
      })
      .catch((err) => {
        console.log("err11", err);
        SetLoading(false);
      });
  };

  const [task_arrayholder, setBranchArray] = useState([]);
  const searchFilter_branch = (text) => {
    const newData = task_arrayholder.filter(function (item) {
      const employee = item.title ? item.title.toUpperCase() : "".toUpperCase();

      const employee2 = item.stores?.name
        ? item.stores?.name.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return (
        employee.indexOf(textData) > -1 || employee2.indexOf(textData) > -1
      );
    });
    SetList(newData);
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
    // <>
    // {loading1 === true ? <>
    //   <div
    //         style={{
    //           width: "100%",
    //           height: "80vh",
    //           display: "flex",
    //           alignItems: "center",
    //           justifyContent: "center",
    //         }}
    //       >
    //         <div className="loader"></div>
    //       </div>
    // </> : <>
    // <div>
    //   <Slider {...settings}>
    //     {getlist1 && getlist1.length > 0
    //       ? getlist1.map((item, index) => {
    //           return (
    //             <CustomerProductTilesHero
    //               item={item}
    //               sidebaropen={sidebaropen}
    //             />
    //           );
    //         })
    //       : <img
    //             src={images.brand_banner2}
    //             alt=""
    //             className="mall_hero_banner_img product-tiles-hero-img img_fluid_position" 
    //             // style={{height:"30vh"}}
    //         />}
    //   </Slider>
    //   <div className="mm_main_wrapp">
    //     <div
    //       className="edit-brand-back-iconbox"
    //       onClick={() => setTab(2)}
    //       style={{ paddingLeft: "0.5rem" }}
    //     >
    //       <IoChevronBack className="edit-brand-back-icon" />{" "}
    //       <p className="edit-brand-back-txt">Back</p>
    //     </div>
    //     <div
    //       className="single-brand-product-head"
    //       style={{ paddingLeft: "0.5rem" }}
    //     >
    //       <div
    //         className="single-brand-product-head-search-flex"
    //         style={{ gap: "0.5rem" }}
    //       >
    //         <p className="single-brand-product-head-search-txt">
    //           {/* Search GUESS: */}
    //           Search {getStoreName}: 
    //         </p>
    //         <div className="mall_near_brand_searchbar single-brand-product-searchbar">
    //           <input
    //             type="text"
    //             className="mall-near-me-searchbox"
    //             placeholder="Search"
    //             onChange={(e) => {
    //               searchFilter_branch(e.target.value);
    //               // e.target.value.length > 0
    //               //   ? (getmovielistserch(e.target.value), SetList([]))
    //               //   : (SetList([]), getmovielist());
    //             }}
    //           />
    //           <HiOutlineSearch color="var(--color-orange)" size={18} />
    //         </div>
    //       </div>
    //       <div className="find-my-way-btn-flex">
    //         <button
    //           className="find-my-way-btn"
    //           onClick={() => {
    //             setTab(29);
    //           }}
    //         >
    //           Find my way
    //         </button>
    //         <BsArrowRight className="find-my-way-btn-arrow" />
    //       </div>
    //     </div>

    //     {loading === true ? (
    //       <div
    //         style={{
    //           width: "100%",
    //           height: "80vh",
    //           display: "flex",
    //           alignItems: "center",
    //           justifyContent: "center",
    //         }}
    //       >
    //         <div className="loader"></div>
    //       </div>
    //     ) : (
    //       <>
    //         <div className="customer_brands_wrapp">
    //           {getlist && getlist.length > 0
    //             ? getlist.map((item, index) => {
    //                 return (
    //                   <CustomerBrandCard
    //                     data={item}
    //                     getmovieapi={getmovielist}
    //                     replce={1}
    //                     mainitem={""}
    //                     getid={getid}
    //                   />
    //                 );
    //               })
    //             : null}
    //         </div>
    //       </>
    //     )}
    //   </div>
    // </div>
    // </>}

    // </>

    <>
      {loading1 === true ? <>
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
        <div style={{marginLeft: sidebaropen === true ? "-28px" : "-31px"}}>
          {/* <Slider {...settings}> */}
          <Carousel autoPlay={true}       // Enable autoplay
            interval={3000}       // Set autoplay interval to 1 second (1000 ms)
            infiniteLoop={true}   // Loop carousel infinitely
            showThumbs={false}    // Optional: Hide thumbnail navigation
            showStatus={false}    // Optional: Hide the status (e.g., 1/3)
            showArrows={true}     // Optional: Show left/right arrows
            stopOnHover={true}
            showIndicators={false} // Hide the dots (indicators)

          >
            {getlist1 && getlist1.length > 0
              ? getlist1
                .filter(item => item.banner_image_path) // Filter items with non-null banner_image_path
                .map((item, index) => (
                  <CustomerProductTilesHero
                    key={index}
                    item={item}
                    sidebaropen={sidebaropen}
                  />
                ))
              : <img
                src={images.brand_banner2}
                alt=""
                className="mall_hero_banner_img product-tiles-hero-img img_fluid_position"
              />}
          </Carousel>

          {/* </Slider> */}

          <div className="mm_main_wrapp promotion_thro_prod_main">
            <div
              className="edit-brand-back-iconbox"
              onClick={() => setTab(2)}
              style={{ paddingLeft: "0.5rem", marginBottom: "1.2rem" }}
            >
              <IoChevronBack className="edit-brand-back-icon" />{" "}
              <p className="edit-brand-back-txt">Back</p>
            </div>
            <div
              className="single-brand-product-head"
              style={{ paddingLeft: "0.5rem" }}
            >
              <div
                className="single-brand-product-head-search-flex"
                style={{ gap: "0.5rem" }}
              >
                <p className="single-brand-product-head-search-txt">
                  {/* Search GUESS: */}
                  Search {getStoreName}:
                </p>
                <div className="mall_near_brand_searchbar single-brand-product-searchbar">
                  <input
                    type="text"
                    className="mall-near-me-searchbox"
                    placeholder="Search"
                    onChange={(e) => {
                      searchFilter_branch(e.target.value);
                      // e.target.value.length > 0
                      //   ? (getmovielistserch(e.target.value), SetList([]))
                      //   : (SetList([]), getmovielist());
                    }}
                  />
                  <HiOutlineSearch color="var(--color-orange)" size={18} />
                </div>
              </div>
              <div className="find-my-way-btn-flex">
                <button
                  className="find-my-way-btn"
                  onClick={() => {
                    setTab(29);
                  }}
                >
                  Find my way
                </button>
                <BsArrowRight className="find-my-way-btn-arrow" />
              </div>
            </div>

            {loading === true && getlist1 ? (
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
                <div className="customer_brands_wrapp">
                  {getlist && getlist.length > 0
                    ? getlist.map((item, index) => {
                      return (
                        <CustomerBrandCard
                          data={item}
                          getmovieapi={getmovielist}
                          replce={1}
                          mainitem={""}
                          getid={getid}
                          getsingalmalldata={getsingalmalldata}
                        />
                      );
                    })
                    :  <p style={{ fontSize: "17px", fontWeight: "600",textWrap:"nowrap" }}>
                  No Products Found.
                </p>}
                </div>
              </>
            )}

            {isVisible ? <>
              <div
              className="edit-brand-back-iconbox"
              onClick={() => setTab(2)}
              style={{ paddingLeft: "0.5rem", marginBottom: "1.2rem",marginTop:"2rem" }}
            >
              <IoChevronBack className="edit-brand-back-icon" />{" "}
              <p className="edit-brand-back-txt">Back</p>
            </div>
            </> : <></>}
           
          </div>
        </div>
      </>}

    </>
  );
};

export default CustomerBrandItems;
