import React, { useEffect, useState } from "react";
import "./CinemaBrandInMall.css";
import { GrFormDown, GrFormSearch, GrFormUp } from "react-icons/gr";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BrandInMallCard, BrandItmCard, CinemaHero, RetailerNavigationBar } from "../../components";
import images from "../../constants/images";
import { BsArrowRight, BsChevronDown } from "react-icons/bs";
import { ACCEPT_HEADER, get_customer_retailer_brand, get_mall_customer_Brand, get_region_mall } from "../../utils/Constant";
import axios from "axios";

const AccordionData = [
  {
    id: 1,
    city: "Western Cape",
    mall: [
      {
        id: 1,
        name: "Bayside Mall",
      },
      {
        id: 2,
        name: "Blue Route Mall",
      },
      {
        id: 3,
        name: "Boulevard Square",
      },
    ],
  },
  {
    id: 2,
    city: "KZN",
    mall: [
      {
        id: 1,
        name: "Brackenfell Centre",
      },
      {
        id: 2,
        name: "Brackenfell Corner",
      },
      {
        id: 3,
        name: "Brackenfell Shopping Centre",
      },
    ],
  },
  {
    id: 3,
    city: "Eastern Cape",
    mall: [
      {
        id: 1,
        name: "Canal Walk",
      },
      {
        id: 2,
        name: "Cape Quarter",
      },
      {
        id: 3,
        name: "Cape Gate",
      },
    ],
  },
  {
    id: 4,
    city: "Free State",
    mall: [
      {
        id: 1,
        name: "Delft Mall",
      },
      {
        id: 2,
        name: "De Ville Centre",
      },
      {
        id: 3,
        name: "Durbanville Town Centre",
      },
    ],
  },
];

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

const CinemaBrandInMall = ({ setTab, get_mall_auth_data,getTab }) => {
  const perPage = 3;

  const [toggle, setToggle] = useState(null);
  const [getRigion_Array, SetRigion_Array] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [proList, setProList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [getIndex, setIndex] = useState();
  const [getIndex2, setIndex2] = useState();
  const [getSubId, setSubId] = useState();
  const [getFiestId, setFirstId] = useState();
  const [getSearchQuery, setSearchQuery] = useState("");
  const [getFilterData, setFilterData] = useState("");



  let handleToggle = (id) => {
    if (toggle === id) {
      setToggle(null);
      return false;
    }
    setToggle(id);
  };

  const SearchFilter = (text) => {
    setSearchQuery(text);
  
    const searchText = text.toLowerCase();
    const newData = getRigion_Array.filter(item => {
      const regionName = item.region_name.toLowerCase();
      const mallMatch = item.malls.some(mall => mall.name.toLowerCase().includes(searchText));
  
      // Return true if either the region name or any mall name matches the search text
      return regionName.includes(searchText) || mallMatch;
    });
  
    setFilterData(newData);
  };


  const [currentMallId, setCurrentMallId] = useState(null); // Define state for the current mall ID

  useEffect(() => {
    if (currentMallId) {
      BrandApi(currentMallId, false); // Load more data when page changes
    }
  }, [page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleMallSelection = (id) => {
  setProList([]); // Clear the product list
  setCurrentMallId(id); // Set the current mall ID
  setPage(1); // Reset to the first page
  BrandApi(id, true); // Load the first page of data for the selected mall
  setSubId(id);
  // setIndex2(ind);
};
  useEffect(() => {
    GetRegion();
  }, [])

  // console.log("getsubid",getSubId);
  

  const GetRegion = async () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("is_token"));

    axios
      .get(get_region_mall, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success == 1) {
          SetRigion_Array(res.data.data);

          const firstMallId = res.data.data[0]?.malls[0]?.id;
          if (firstMallId) {
            BrandApi(firstMallId);  // Pass the first mall ID to BrandApi
          }

          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("err11", err);
        setLoading(false);
      });
  };

  // const BrandApi = async (id) => {
  //   const token = JSON.parse(localStorage.getItem("is_token"));
  //   const formdata = new FormData();
  //   formdata.append("mall_id", id);  // Use the 'id' parameter directly

  //   setLoading2(true);
  //   fetch(get_mall_customer_Brand + `per_page=${perPage}&page=${page}`, {
  //     method: "POST",
  //     body: formdata,
  //     headers: {
  //       Accept: ACCEPT_HEADER,
  //       Authorization: "Bearer " + token,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setTotalPages(res.data.last_page);
  //       setProList([...proList, ...res.data.data]);
  //       // setProList(res.data.data);
  //       console.log("res", res.data.data);

  //       setLoading2(false);
  //     })
  //     .catch((err) => {
  //       console.error("Error in BrandApi:", err);
  //       setLoading2(false);
  //     });
  // };

  // const BrandApi = async (id, clearList = true) => {
  //   const token = JSON.parse(localStorage.getItem("is_token"));
  //   const formdata = new FormData();
  //   formdata.append("mall_id", id); // Use the 'id' parameter directly

  //   setLoading2(true);
  //   try {
  //     const response = await axios.post(
  //       get_mall_customer_Brand + `per_page=${perPage}&page=${page}`,
  //       formdata,
  //       {
  //         headers: {
  //           Accept: ACCEPT_HEADER,
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );

  //     const res = response.data;

  //     setTotalPages(res.data.last_page);

  //     if (clearList) {
  //       setProList(res.data.data); // Replace old data with new data
  //     } else {
  //       setProList(prevList => [...prevList, ...res.data.data]); // Append data for pagination
  //     }

  //     console.log("res", res.data.data);
  //   } catch (err) {
  //     console.error("Error in BrandApi:", err);
  //   } finally {
  //     setLoading2(false);
  //   }
  // };
  const BrandApi = async (id, clearList = true) => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    const formdata = new FormData();
    formdata.append("mall_id", id); // Use the 'id' parameter directly
    formdata.append("store_id", get_mall_auth_data?.id); // Use the 'id' parameter directly

    setLoading2(true);
    try {
      const response = await axios.post(
        get_customer_retailer_brand,
        formdata,
        {
          headers: {
            Accept: ACCEPT_HEADER,
            Authorization: "Bearer " + token,
          },
        }
      );

      const res = response.data;

              setProList(res.data); // Replace old data with new data


      // setTotalPages(res.data.last_page);

      // if (clearList) {
      //   setProList(res.data.data); // Replace old data with new data
      // } else {
      //   setProList(prevList => [...prevList, ...res.data.data]); // Append data for pagination
      // }

      // console.log("res", res.data);
    } catch (err) {
      console.error("Error in BrandApi:", err);
    } finally {
      setLoading2(false);
    }
  };




  return (
    <>
      {loading === true ? (
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

        <div>
        <CinemaHero get_mall_auth_data={get_mall_auth_data} />
        <div className="mm_main_wrapp">
          <div className="mall_name_wrapp">
          <RetailerNavigationBar
              title="Product Rate Card"
              setTabType={getTab == 31 ? "My Brand in Mall" : ""}
            />
            <p className="mall_name_heading">{get_mall_auth_data?.name}: </p>
            <span className="mall_name_heading" style={{ fontWeight: "600" }}>My Brands in Malls</span>
          </div>
          {/* <button className="upload_retail_btn" onClick={() => setTab(24)}>
        Upload Retailer Directory{" "}
        <BsArrowRight size={20} style={{ marginLeft: "10px" }} />
      </button> */}
          <div className="brandinmall_sec_wrapp_line_up_div">
            <div className="mm_horizontal_line"></div>
            <div className="brandinmall_sec_wrapp">
              <div className="brandinmall_part_1">
                <div className="search_box_wrapp">
                  <input
                    type="text"
                    onChange={(e) => SearchFilter(e.target.value)}
                    value={getSearchQuery}
                    placeholder="Search"
                    className="input_box"
                  />
                  <GrFormSearch className="search_box_icon" size={20} style={{ top: "12px" }} />
                </div>
                <p className="barnd_mall_title_name">My Brands in Malls:</p>

                {getSearchQuery ? <>
                  {getFilterData && getFilterData.length > 0
                  ? getFilterData.map((item, index) => {
                    return (
                      <div className="bim_accordian_wrapp" key={item.id}>
                        <button
                          className="bim_accordian_btn"
                          onClick={() => { handleToggle(item.id); setIndex(index) }}
                        >
                          <p
                            style={{
                              color: item.id === toggle && getIndex === index ? "#ff8b00" : "#000",
                              fontWeight: item.id === toggle && getIndex === index ? "500" : "300",
                            }}
                          >
                            {item.region_name}
                          </p>
                          {item.id === toggle && getIndex === index ? (
                            <IoIosArrowUp size={20} color="#ff8b00" />
                          ) : (
                            <IoIosArrowDown size={20} />
                          )}
                        </button>
                        {item.id === toggle && getIndex === index ? (
                          <div className="bim_accordian_mall_wrapp">
                            {item.malls.map((itm, ind) => {
                              return <button onClick={() =>{ handleMallSelection(itm.id),setIndex2(ind)}} // Call handleMallSelection on click
                                key={itm.id} style={{
                                  color: itm.id === getSubId && getIndex2 === ind ? "#ff8b00" : "#000",
                                  fontWeight: itm.id === getSubId && getIndex2 === ind ? "500" : "300",
                                }}>{itm.name}</button>;
                            })}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })
                  : null}
                </> : <>
                {getRigion_Array && getRigion_Array.length > 0
                  ? getRigion_Array.map((item, index) => {
                    return (
                      <div className="bim_accordian_wrapp" key={item.id}>
                        <button
                          className="bim_accordian_btn"
                          onClick={() => { handleToggle(item.id); setIndex(index) }}
                        >
                          <p
                            style={{
                              color: item.id === toggle && getIndex === index ? "#ff8b00" : "#000",
                              fontWeight: item.id === toggle && getIndex === index ? "500" : "300",
                            }}
                          >
                            {item.region_name}
                          </p>
                          {item.id === toggle && getIndex === index ? (
                            <IoIosArrowUp size={20} color="#ff8b00" />
                          ) : (
                            <IoIosArrowDown size={20} />
                          )}
                        </button>
                        {item.id === toggle && getIndex === index ? (
                          <div className="bim_accordian_mall_wrapp">
                            {item.malls.map((itm, ind) => {
                              return <button onClick={() =>{ handleMallSelection(itm.id),setIndex2(ind)}} // Call handleMallSelection on click
                                key={itm.id} style={{
                                  color: itm.id === getSubId && getIndex2 === ind ? "#ff8b00" : "#000",
                                  fontWeight: itm.id === getSubId && getIndex2 === ind ? "500" : "300", 
                                }}>{itm.name}</button>;
                            })}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })
                  : null}
                </>}

                
              </div>
              {loading2 === true ? (
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
              ) : <div style={{width:"100%"}}>

                <div className="brandinmall_part_2">
                  {proList && proList.length > 0
                    ? proList.map((brndItm) => {
                      return(
                        
                         <BrandInMallCard img={brndItm.store_logo_path} key={brndItm.id} setTab={setTab} brndItm={brndItm} />
                         
                        
                    )})
                    : <p style={{color:"var(--color-orange)",fontWeight:"600",textAlign:"center",width:"100%"}}>No Brands are available.</p>}

                </div>
                {/* {totalPages !== page && (
                <button
                  className="view_more_btn"
                  onClick={() => setPage(page + 1)}
                >
                  {loading2 ? "Loading..." : "Load More"}
                  <BsChevronDown />
                </button>
              )} */}

                {totalPages !== page && currentMallId && (
                  <button
                    className="view_more_btn"
                    onClick={handleLoadMore}
                  >
                    {loading2 ? "Loading..." : "Load More"}
                    <BsChevronDown />
                  </button>
                )}

              </div>
              }

            </div>

          </div>

        </div>
        </div>
        )}
    </>
  );
};

export default CinemaBrandInMall;
