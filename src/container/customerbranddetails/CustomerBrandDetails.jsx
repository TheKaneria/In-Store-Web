import React, { useEffect, useState } from "react";
import "./CustomerBrandDetails.css";
import {
  BrandItmCard,
  CustomerBrandDetailsComponent,
  CustomerEateriesDetailsComponent,
  CustomerHero,
} from "../../components";
import { FaPhone } from "react-icons/fa";
import images from "../../constants/images";
import { IoChevronBack } from "react-icons/io5";
import { HiOutlineSearch } from "react-icons/hi";
import { useMallContext } from "../../context/mall_context";
// import { FaPhone } from "react-icons/fa";
import { ACCEPT_HEADER, get_category, get_mall_customer_Brand } from "../../utils/Constant";
import { BsChevronDown } from "react-icons/bs";
import axios from "axios";



const CustomerBrandDetails = ({ getsingalmalldata, getbdetalis, setTab, setBDetalis, setBDetalis2, getRetailerBrandData, sidebaropen, setRetailerBrandData, getRetailerBrandLoading, setRetailerBrandLoading, setcheckID, setRetailerBrandShopNo,SetNavBarData,
  SetNavBarDataName,
  SetNavBarData1,
  respSearch,
  setResponSearch, }) => {

  const { get_mall_auth_data, get_mall_store_data } = useMallContext();
  const [brandModalOpen, setBrandModalClose] = useState(false);
  const [getbranddata, SetBrandData] = useState("");

  const [getValue, setValue] = useState(false);
  const perPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [totalPages2, setTotalPages2] = useState(1);
  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(1);


  const [proList, setProList] = useState([]);
  const [proList2, setProList2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);


  const [getIdTrue, setIdTrue] = useState(1);

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
    BrandApi();
  }, [page]);

// console.log("getRetailerBrandData",getbdetalis);

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



  const BrandApi = async () => {
    setValue(false);

    const token = await JSON.parse(localStorage.getItem("is_token"));
    const formdata = new FormData();
    // await formdata.append("search", "");
    await formdata.append("mall_id", getsingalmalldata.id);
    setLoading(true);
    fetch(get_mall_customer_Brand + `per_page=${perPage}&page=${page}`, {
      method: "POST",
      body: formdata,
      headers: {
        Accept: ACCEPT_HEADER,
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTotalPages(res.data.last_page);
        setProList([...proList, ...res.data.data]);
        setLoading(false);
      })
      .catch((err) => { });
  };

  const BrandApiserch = async (value) => {
    setValue(false);

    const token = await JSON.parse(localStorage.getItem("is_token"));
    const formdata = new FormData();
    await formdata.append("search", value);
    await formdata.append("mall_id", getsingalmalldata.id);
    // setLoading(true);
    fetch(get_mall_customer_Brand + `per_page=3&page=${page}`, {
      method: "POST",
      body: formdata,
      headers: {
        Accept: ACCEPT_HEADER,
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // setTotalPages(res.data.last_page);
        console.log("ressss", res.data.data);
        setProList([...proList, ...res.data.data]);
        // setLoading(false);
      })
      .catch((err) => { });
  };

  const FilterApiserch = async (value) => {
    setValue(true);

    const token = await JSON.parse(localStorage.getItem("is_token"));
    const formdata = new FormData();
    await formdata.append("orderBy", value);
    await formdata.append("mall_id", getsingalmalldata.id);
    // setLoading(true);
    fetch(get_mall_customer_Brand + `per_page2=3&page2=1`, {
      method: "POST",
      body: formdata,
      headers: {
        Accept: ACCEPT_HEADER,
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTotalPages2(res.data.last_page);
        setProList2([...proList2, ...res.data.data]);
        // setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // console.log("getbdetalis?.store_type",getbdetalis?.retailer_register_status);
  

  return (
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
      {/* <div style={{ margin: "2rem" }}> */}



      <CustomerHero getsingalmalldata={getsingalmalldata} getbdetalis={getbdetalis} sidebaropen = {sidebaropen} />
      <div className="mm_main_wrapp " style={{ marginBottom: "40px" }}>
        <div className='edit-brand-back-iconbox' onClick={() => setTab(3)}><IoChevronBack className='edit-brand-back-icon' />
          <p className='edit-brand-back-txt'>Back</p></div>

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
            {getbdetalis.name} - {getsingalmalldata.name}
          </h4>
          {/* &nbsp;&nbsp; <span className="h3">Brand</span> */}
        </div>
        <CustomerBrandDetailsComponent getbdetalis={getbdetalis} setTab={setTab} getIdTrue={1} setcheckID={setcheckID}  />


          {getbdetalis?.store_type == 2 ? <>
            {getbdetalis?.retailer_register_status == 1 ? <>
              <div className="profile_head_center cus-brand-headd" style={{ marginTop: "4rem" }}>
          <h4
            className="h3"
            style={{ textTransform: "capitalize", fontWeight: "600", }}
          >
            {getbdetalis.name}
          </h4>{" "}
          <span className="h3" style={{ fontWeight: "600" }}>
            Brands
          </span>
        </div>
        {/* filter */}
        <div
          className="mall_near_brand_filter_sec_wrap"
          style={{ marginTop: "40px" }}
        >
          <div className="mall_near_brand_searchbar">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => {
                e.target.value.length > 0
                  ? (setProList([]),
                    setPage(1),
                    BrandApiserch(e.target.value))
                  : (setProList([]), setPage(1), BrandApi());
              }}
            />
            <HiOutlineSearch color="var(--color-orange)" size={18} />
          </div>
          <div className="mall_near_brand_select_wrapp mallnearme-brand-filter-width">
            <p
              className="mallnearme-brands-filter"
              style={{ width: "initial" }}
            >
              Filer by :
            </p>

            <select
              className="mall_near_brand_selectbox"
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "80%",
              }}
              defaultValue="" // Use defaultValue instead of selected
              onChange={(e) => {
                if (e.target.value === "1") {
                  setProList2([]);
                  setPage2(1);
                  setProList([]);
                  setPage(1);
                  FilterApiserch("1");
                } else if (e.target.value === "") {
                  setProList2([]);
                  setPage2(1);
                  setProList([]);
                  setPage(1);
                  BrandApi();
                }
              }}
            >
              {/* <option value="" disabled>
                    A-Z
                  </option> */}
              <option value="" disabled={getValue === true ? false : true}>
                A-Z
              </option>
              <option
                value="1"
                disabled={getValue === false ? false : true}
              >
                Z-A
              </option>{" "}
              {/* No need for onChange here */}
            </select>
          </div>
        </div>
        {/* brands */}

        {loading === true ?
          (
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
              {getValue === true ? (
                <>
                  <div className="mall_near_brand_list_wrapp">
                    {getRetailerBrandData && getRetailerBrandData.length > 0 
                      ? getRetailerBrandData.map((brndItm) => {
                        return (
                          <button
                            onClick={() => {
                              // setBrandModalClose(true);
                              SetBrandData(brndItm);
                              setBDetalis2(brndItm);
                              setTab(31);
                            }}
                          >
                            <BrandItmCard
                              img={brndItm.store_logo_path}
                              key={brndItm.id}
                            />
                          </button>
                        );
                      })
                      : null}
                  </div>
                </>
              ) : (
                <>
                  <div className="mall_near_brand_list_wrapp">
                    {getRetailerBrandData && getRetailerBrandData.length > 0
                      ? getRetailerBrandData.map((brndItm) => {
                        return (
                          <button
                            onClick={() => {
                              // setBrandModalClose(true);
                              SetBrandData(brndItm);
                              setBDetalis2(brndItm);
                              // setRetailerBrandShopNo(brndItm.store_no)
                              setTab(31);
                            }}
                          >
                            <BrandItmCard
                              img={brndItm.store_logo_path}
                              key={brndItm.id}
                            />
                          </button>
                        );
                      })
                      : null}
                  </div>
                </>
              )}

              {/* loadmore btn */}
              {getValue === true ? (
                <>
                  {totalPages !== page2 && (
                    <button
                      className="view_more_btn"
                      onClick={() => setPage(page + 1)}
                    >
                      {loading ? "Loading..." : " Load More Brands"}
                      <BsChevronDown />
                    </button>
                  )}
                </>
              ) : (
                <>
                  {totalPages !== page && (
                    <button
                      className="view_more_btn"
                      onClick={() => setPage(page + 1)}
                    >
                      {loading ? "Loading..." : " Load More Brands"}
                      <BsChevronDown />
                    </button>
                  )}
                </>
              )}
            </>
          )}
            </> : <></>}
          </>: <></>}
          
          {isVisible ? <>
            <div className='edit-brand-back-iconbox' onClick={() => setTab(3)} style={{marginTop:"2rem",width:"80px"}}><IoChevronBack className='edit-brand-back-icon' />
          <p className='edit-brand-back-txt'>Back</p></div>
          </> : <></>}
          
       

      </div>
      {/* </div> */}
    </div>
    </>
  );
};

export default CustomerBrandDetails;