import React, { useEffect, useState } from "react";
import "../../container/mallnearmebrands/MallNearMeBrands.css";
import { HiOutlineSearch } from "react-icons/hi";
import images from "../../constants/images";
import {
    BrandItmCard,
    CustomerHero,
    CustomerHeroSecond,
    MallHero,
} from "../../components";
import { BsChevronDown } from "react-icons/bs";
import { useMallContext } from "../../context/mall_context";
import ReactModal from "react-modal";
import { FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ACCEPT_HEADER, get_category, get_mall_customer_Brand, product_banner_tiles_customer, product_cus_tile } from "../../utils/Constant";
import CustomerSingleBrandProductCard from "../../components/customersinglebrandproductcard/CustomerSingleBrandProductCard";
import axios from "axios";
import { IoChevronBack } from "react-icons/io5";

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

const CustomerSingleEateriesProducts = ({ getsingalmalldata, setTab, setEDetalis, brandid, getedetalis,getedetalis2,setIsRetailer,isRetailer, getcheckid, sidebaropen,SetNavBarData,
    SetNavBarDataName,
    SetNavBarData1,
    respSearch,
    setResponSearch, }) => {
    const { get_mall_auth_data, get_mall_store_data } = useMallContext();
    const [brandModalOpen, setBrandModalClose] = useState(false);
    const [getbranddata, SetBrandData] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    // const [loading, SetLoading] = useState(false);




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

    const [proList, setProList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [getid, setid] = useState("");
    const [getlist, SetList] = useState([]);
    const [get_list, Set_List] = useState([]);



    useEffect(() => {
      
        SingleBrandProductApi();
    }, []);

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
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('malldata'))
        // ("======>123", data);

        getmovielist(data.id);
        // getproductbanner(data.id);
    }, [])

    const SingleBrandProductApi = async (id) => {
        const token = await JSON.parse(localStorage.getItem("is_token"));
        const formdata = new FormData();
        // await formdata.append("search", "");
        await formdata.append("mall_id", getsingalmalldata.id);
        await formdata.append("store_id", getcheckid == 1 ? getedetalis.id: getedetalis2.id);

        fetch(product_banner_tiles_customer, {
            method: "POST",
            body: formdata,
            headers: {
                Accept: ACCEPT_HEADER,
                Authorization: "Bearer " + token,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                // ("123445", res.data);
                Set_List(res.data)

                // setTab(35);
            })
            .catch((err) => {
                console.log("err11", err);
            });
    };


    // const BrandApi = async () => {
    //     const token = await JSON.parse(localStorage.getItem("is_token"));
    //     const formdata = new FormData();
    //     // await formdata.append("search", "");
    //     await formdata.append("mall_id", getsingalmalldata.id);
    //     setLoading(true);
    //     fetch(get_mall_customer_Brand + `per_page=${perPage}&page=${page}`, {
    //         method: "POST",
    //         body: formdata,
    //         headers: {
    //             Accept: ACCEPT_HEADER,
    //             Authorization: "Bearer " + token,
    //         },
    //     })
    //         .then((res) => res.json())
    //         .then((res) => {
    //             ("Brand_list", res.data.last_page);
    //             setTotalPages(res.data.last_page);
    //             setProList([...proList, ...res.data.data]);
    //             setLoading(false);
    //         })
    //         .catch((err) => {
    //             ("err", err);
    //         });
    // };

    // const BrandApiserch = async (value) => {
    //     ("value", value);
    //     const token = await JSON.parse(localStorage.getItem("is_token"));
    //     const formdata = new FormData();
    //     await formdata.append("search", value);
    //     await formdata.append("mall_id", getsingalmalldata.id);
    //     // setLoading(true);
    //     fetch(get_mall_customer_Brand + `per_page=3&page=1`, {
    //         method: "POST",
    //         body: formdata,
    //         headers: {
    //             Accept: ACCEPT_HEADER,
    //             Authorization: "Bearer " + token,
    //         },
    //     })
    //         .then((res) => res.json())
    //         .then((res) => {
    //             ("Brand_list", res.data);
    //             // setTotalPages(res.data.last_page);
    //             setProList([...proList, ...res.data.data]);
    //             // setLoading(false);
    //         })
    //         .catch((err) => {
    //             ("err", err);
    //         });
    // };

    const getmovielist = async (id) => {
        setid(id)
        setLoading(true);
        const token = JSON.parse(localStorage.getItem("is_token"));

        const formdata = new FormData();
        formdata.append("mall_id", id);
        formdata.append("store_id", getedetalis.id);
        // formdata.append("brand_id", getedetalis.brand_id);

        // ("formdata", id, brandid);

        axios
            .post(product_banner_tiles_customer, formdata, {
                headers: {
                    Accept: ACCEPT_HEADER,
                    Authorization: "Bearer " + token,
                },
            })
            .then((res) => {
                // ("ggg", JSON.stringify(res.data, null, 2));
                if (res.data.success == 1) {
                    SetList(res.data.data);
                    setLoading(false);
                } else {
                    // null;
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log("err11", err);
                setLoading(false);
            });
    };


    useEffect(() => {
        // ("ccc", getsingalmalldata);
    });

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
                <div className="mall_nearme_brand_main_wrapp">
                    {/* <CustomerHero getsingalmalldata={getsingalmalldata} /> */}
                    {/* <CustomerHeroSecond getsingalmalldata={getsingalmalldata} /> */}
                    <CustomerHero getsingalmalldata={getsingalmalldata} sidebaropen={sidebaropen}
                    getbdetalis={getcheckid == 1 ? getedetalis : getedetalis2} />

                    {/* <CustomerHeroSecond getsingalmalldata={getedetalis} /> */}
                    <div className="mm_main_wrapp mm_main_wrapp_22">
                    <div className='edit-brand-back-iconbox' onClick={() => { getcheckid == 1 ? setTab(27) : setTab(32) }}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

                        <div className="customer_brands_wrapp" style={{marginTop:"1.5rem"}}>
                            {getlist && getlist.length > 0
                                ? getlist.map((item, index) => {
                                    return (
                                        <CustomerSingleBrandProductCard
                                            data={item}
                                            getmovieapi={getmovielist}
                                            replce={1}
                                            mainitem={''}
                                            getid={getid}
                                            getsingalmalldata={getsingalmalldata}
                                        />
                                    );
                                })
                                : <p style={{fontSize:"17px",fontWeight:"600"}}>No Products Found.</p>}
                            {/* <CustomerSingleBrandProductCard
                            // data={item}
                            getmovieapi={getmovielist}
                            replce={1}
                            mainitem={''}
                            getid={getid} /> */}

                        </div>
                        {isVisible ? <>
                            <div className='edit-brand-back-iconbox' style={{marginTop:"2rem"}} onClick={() => { getcheckid == 1 ? setTab(27) : setTab(32) }}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

                        </> : <></>}

                    </div>
                </div>
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
                                {getbranddata.category}
                            </h3>
                            <p>
                                Shop no:{" "}
                                <span>
                                    {getbranddata.store_no ? getbranddata.store_no : ""}{" "}
                                </span>
                            </p>
                            <p>
                                Level:
                                <span>{getbranddata.store_level}</span>
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
                            <p> {getbranddata.number} </p>
                        </div>
                        <div className="sd_model_sec2_sigle">
                            <img src={images.send} alt="" />
                            <p>{getbranddata.email} </p>
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

export default CustomerSingleEateriesProducts;