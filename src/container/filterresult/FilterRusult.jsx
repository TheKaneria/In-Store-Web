import React, { useEffect, useState } from "react";
import "../../container/customerbranditems/CustomerBrandItems.css";
import "./FilterResult.css";
import {
  CustomerBrandCard,
  CustomerHeroSecond,
  CustomerProductTilesHero,
  FilterProducts,
  MallHero,
} from "../../components";
import { useMallContext } from "../../context/mall_context";
import { HiOutlineSearch } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";
import {
  ACCEPT_HEADER,
  get_product_customer,
  product_banner_tiles_customer,
  product_cus_tile,
} from "../../utils/Constant";
import axios from "axios";
import { IoChevronBack } from "react-icons/io5";

const FilterRusult = ({
  setTab,
  SetNavBarData1,
  getsingalmalldata,
  navbardata,
  navbardataName,
  navbardata1,
  brandid,
}) => {
  const { get_mall_auth_data, get_mall_store_data } = useMallContext();

  const [getid, setid] = useState("");
  const [getcondation, SetConadtion] = useState(true);
  useEffect(() => {
    // console.log("navbardata1", navbardata1);
    if (navbardata1 === "") {
      Set_List([]);
      SetConadtion(false);
    } else {
      SetConadtion(true);
    }
    SearchApi();
  }, [navbardata1]);

  useEffect(() => {
    FilterApi();
  }, [navbardata]);

  const FilterApi = async (id) => {
    SetLoading(true);

    const token = await JSON.parse(localStorage.getItem("is_token"));
    const formdata = new FormData();
    // await formdata.append("search", "");
    await formdata.append("mall_id", getsingalmalldata.id);
          // await formdata.append("category_id", navbardata);

    if(navbardata1 !== ""){
     
      await formdata.append("search", navbardata1 ? navbardata1 : 1 );
    }else{
      await formdata.append("category_id", navbardata ? navbardata : 1 );

    }
   

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
        // "123445", res.data;
        Set_List(res.data);
        SetLoading(false);

        // setTab(35);
      })
      .catch((err) => {
        console.log("err", err);
        SetLoading(false);

      });
  };

  const [get_list, Set_List] = useState([]);

  const SearchApi = async () => {
    const token = await JSON.parse(localStorage.getItem("is_token"));
    const formdata = new FormData();
    // await formdata.append("search", "");
    formdata.append("mall_id", getsingalmalldata.id);

    formdata.append("search", navbardata1 ? navbardata1 : 1);

    SetLoading(true);
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
        console.log("resss", res.data);
        Set_List(res.data);
        SetLoading(false);
      })
      .catch((err) => {
        SetLoading(false);
      });
  };

  const [getlist, SetList] = useState([]);
  const [loading, SetLoading] = useState(false);

  const [getlist1, SetList1] = useState([]);
  const [loading1, SetLoading1] = useState(false);
  const [navbardata2, SetNavBarData2] = useState("");
  const [isVisible, setIsVisible] = useState(false);


  // const getproductbanner = async (id) => {
  //     SetLoading1(true);
  //     const token = JSON.parse(localStorage.getItem("is_token"));

  //     const formdata = new FormData();
  //     formdata.append("mall_id", id);
  //     formdata.append("brand_id", brandid);

  //     ("formdata", id, brandid);

  //     axios
  //         .post(get_product_customer, formdata, {
  //             headers: {
  //                 Accept: ACCEPT_HEADER,
  //                 Authorization: "Bearer " + token,
  //             },
  //         })
  //         .then((res) => {
  //             ("getproductbanner---->>L>", JSON.stringify(res.data, null, 2));
  //             if (res.data.success == 1) {
  //                 SetList1(res.data.data);
  //                 SetLoading1(false);
  //             } else {
  //                 null;
  //                 SetLoading1(false);
  //             }
  //         })
  //         .catch((err) => {
  //            console.log("err11", err);
  //             SetLoading(false);
  //         });
  // };

  // const getmovielist = async (id) => {
  //     setid(id)
  //     SetLoading(true);
  //     const token = JSON.parse(localStorage.getItem("is_token"));

  //     const formdata = new FormData();
  //     formdata.append("mall_id", id);
  //     formdata.append("brand_id", brandid);

  //     ("formdata", id, brandid);

  //     axios
  //         .post(product_cus_tile, formdata, {
  //             headers: {
  //                 Accept: ACCEPT_HEADER,
  //                 Authorization: "Bearer " + token,
  //             },
  //         })
  //         .then((res) => {
  //             ("ggg", JSON.stringify(res.data, null, 2));
  //             if (res.data.success == 1) {
  //                 SetList(res.data.data);
  //                 SetLoading(false);
  //             } else {
  //                 null;
  //                 SetLoading(false);
  //             }
  //         })
  //         .catch((err) => {
  //            console.log("err11", err);
  //             SetLoading(false);
  //         });
  // };

  // // Search & Filter Api

  // const FilterApi = async (id) => {
  //     const token = await JSON.parse(localStorage.getItem("is_token"));
  //     const formdata = new FormData();
  //     // await formdata.append("search", "");
  //     await formdata.append("mall_id", getsingalmalldata.id);
  //     // await formdata.append("category_id", navbardata);

  //     fetch(product_banner_tiles_customer, {
  //         method: "POST",
  //         body: formdata,
  //         headers: {
  //             Accept: ACCEPT_HEADER,
  //             Authorization: "Bearer " + token,
  //         },
  //     })
  //         .then((res) => res.json())
  //         .then((res) => {
  //             ("123445", res.data);
  //             // SetProdata(res.data);
  //             SetNavBarData2(res.data.data)
  //             setTab(35);
  //         })
  //         .catch((err) => {
  //             ("err", err);
  //         });
  // };

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

  return (
    <div>
      {/* <MallHero get_mall_auth_data={get_mall_auth_data} /> */}
      {/* <CustomerHeroSecond /> */}

      {/* old design setup product banner show this design */}

      {/* New design setup brand banner show this design */}
      {/* <CustomerProductTilesHero /> */}

      <div className="mm_main_wrapp mm_main_wrapp_22">
        <div className="edit-brand-back-iconbox" onClick={() => {
                setTab(2);
                SetNavBarData1("");
              }}>
          <IoChevronBack className="edit-brand-back-icon" />{" "}
          <p className="edit-brand-back-txt">Back</p>
        </div>
        <div className="single-brand-product-head">
          <div className="single-brand-product-head-search-flex">
            {/* <p className="single-brand-product-head-search-txt">
                            Search GUESS:
                        </p> */}
            {/* <div className="mall_near_brand_searchbar single-brand-product-searchbar">
                            <input
                                type="text"
                                className="mall-near-me-searchbox"
                                placeholder="Search"
                                onChange={(e) => {
                                    // e.target.value.length > 0
                                    //   ? (getSearchMallList(e.target.value),
                                    //     setMallList([]),
                                    //     setPage(1))
                                    //   : (setMallList([]), setPage(1), getMallList());
                                }}
                            />
                            <HiOutlineSearch color="var(--color-orange)" size={18} />
                        </div> */}

            {get_list ? (
              <p className="search-prodct-head">
                Search Results for :{" "}
                <span className="search-result-name">
                  {navbardata1 === "" ? navbardataName : navbardata1}
                </span>
              </p>
            ) : null}
          </div>
          {/* <div className="find-my-way-btn-flex">
                        <button className="find-my-way-btn">Find my way</button>
                        <BsArrowRight className="find-my-way-btn-arrow" />
                    </div> */}
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
          <>
            <div className="customer_brands_wrapp">
              {get_list && get_list.length > 0
                ? get_list.map((item, index) => {
                    return (
                      <FilterProducts
                        data={item}
                        // getmovieapi={getmovielist}
                        replce={1}
                        mainitem={""}
                        getid={getid}
                        FilterApi={FilterApi}
                        getsingalmalldata={getsingalmalldata}
                      />
                    );
                  })
                : null}
            </div>
          </>
        )}
        {isVisible ? <>
          <div className="edit-brand-back-iconbox" style={{marginTop:"2rem"}} onClick={() => {
                setTab(2);
                SetNavBarData1("");
              }}>
          <IoChevronBack className="edit-brand-back-icon" />{" "}
          <p className="edit-brand-back-txt">Back</p>
        </div>
        </> : <></>}
      
        
      </div>
    </div>
  );
};

export default FilterRusult;