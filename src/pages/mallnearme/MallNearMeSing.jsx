import React, { useEffect, useState } from "react";
import "./MallNearMeSing.css";
import { MallNearMeSingNavbar, MallsNearMeCard } from "../../components";
import { BsChevronDown } from "react-icons/bs";
import {
  ACCEPT_HEADER,
  add_rating,
  get_location_popup,
  get_mall_customer,
  get_notification_url,
  location_customer,
} from "../../utils/Constant";
import { HiOutlineSearch } from "react-icons/hi";
import { useCustomerContext } from "../../context/customer_context";
import { AiOutlineClose } from "react-icons/ai";
import Notification from "../../utils/Notification";

import ReactModal from "react-modal";
import axios from "axios";
import Rating from "react-rating";
import images from "../../constants/images";
import { Helmet } from "react-helmet";

const MallNearMeSing = ({ setTab }) => {
  const [mallList, setMallList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getsingalmalldata, SetSingalMallData] = useState({});
  const [getsingalmalldata2, SetSingalMallData2] = useState({});
  // const [gettab, setTab] = useState();
  const { getCustomer, get_customer_data } = useCustomerContext();
  const perPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [modalIsOpen3, setIsOpen3] = useState(false);
  const [isAcceptTerm, setIsAcceptTerm] = useState(true);
  const [getrating, setRating] = useState("");
  const [modalIsOpen5, setIsOpen5] = useState(false);

  const [getPopupData, setPopupData] = useState();
  const [getCusLocationValue, setCusLocationValue] = useState();
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  const handleTermChange = (event) => {
    setIsAcceptTerm((current) => !current);
  };
  useEffect(() => {
    showModal();
    getCustomer();
    const data = JSON.parse(localStorage.getItem("cuslocation"));
    setCusLocationValue(data);
  }, []);
  // console.log("getCusLocationValue",getCusLocationValue);

  const showModal = async () => {
    const data = JSON.parse(localStorage.getItem("malldata"));
    if (data) {
      setIsOpen5(true);
      SetSingalMallData2(data);
    } else {
      setIsOpen5(false);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        function (error) {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              break;
            case error.POSITION_UNAVAILABLE:
              break;
            case error.TIMEOUT:
              break;
            case error.UNKNOWN_ERROR:
              break;
            default:
          }
        }
      );
    } else {
    }
  }, []);

  useEffect(() => {
    if (getCusLocationValue !== undefined) {
      getMallList();
    }
  }, [page, getCusLocationValue]);

  // Add Rating Api

  const addRating = async () => {
    const token = await JSON.parse(localStorage.getItem("is_token"));

    if (getrating == "" || undefined) {
      Notification("error", "Error!", "Please give rating");
    } else {
      const formdata = await new FormData();
      formdata.append("mall_id", getsingalmalldata2.id);
      formdata.append("rating", getrating);

      try {
        const response = await axios.post(add_rating, formdata, {
          headers: {
            Accept: ACCEPT_HEADER,
            Authorization: "Bearer " + token,
          },
        });

        if (response.data.success == 1) {
          // setTab(4);
          setIsOpen5(false);
          localStorage.removeItem("malldata");
          // logout();
          // getMallList();
          // window.location.reload(true);
        }
        return response.data;
      } catch (error) {
        console.log("error11", error);
      }
    }
  };

  // Location Popup Api

  const getLocationPopupApi = async () => {
    const token = await JSON.parse(localStorage.getItem("is_token"));
    axios
      .get(get_location_popup, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success == 1) {
          setPopupData(res.data.data);
        }
      })
      .catch((err) => {
        console.log("error11", err);
      });
  };
  useEffect(() => {
    // getLocationcheck();
    getLocationPopupApi();
    if (getCusLocationValue == 0) {
      setIsOpen3(true);
    } else {
      setIsOpen3(false);
    }
  }, [get_customer_data]);

  const getLocationcheck = async () => {
    const token = await JSON.parse(localStorage.getItem("is_token"));
    axios
      .get(get_notification_url, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success == 1) {
          if (res.data.data.location == 0) {
            setIsOpen3(true);
          } else {
            setIsOpen3(false);
          }
        }
      })
      .catch((err) => {
        console.log("error11", err);
      });
  };

  const Locationapi = async (id) => {
    const token = await JSON.parse(localStorage.getItem("is_token"));
    // ("lat,log",position.latitude, position.longitude);

    const formdata = new FormData();
    await formdata.append("lat", position.latitude);
    await formdata.append("log", position.longitude);
    await formdata.append("location", 1);
    axios
      .post(location_customer, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success == 1) {
          Notification("success", "Success!", "Update Successfully!");
          if (getCusLocationValue == 0) {
            setCusLocationValue(1);
          }
          getMallList();
          closeModal3();
        }
      })
      .catch((err) => {
        console.log("error11", err);
      });
  };

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
  //   const perPage = 3;
  //   const [totalPages, setTotalPages] = useState(1);
  //   const [page, setPage] = useState(1);

  //   const [mallList, setMallList] = useState([]);
  //   const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     getMallList();
  //   }, [page]);

  //   const getMallList = async () => {
  //     const token = await JSON.parse(localStorage.getItem("is_token"));

  //     const formdata = new FormData();
  //     await formdata.append("search", "");

  //     setLoading(true);
  //     fetch(get_mall_customer + per_page=${perPage}&page=${page}, {
  //       method: "POST",
  //       body: formdata,
  //       headers: {
  //         Accept: ACCEPT_HEADER,
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((res) => {
  //         ("ffff", res.data.last_page);
  //         setTotalPages(res.data.last_page);
  //         setMallList([...mallList, ...res.data.data]);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         ("err", err);
  //       });
  //   };

  function closeModal3() {
    setIsOpen3(false);
    // getMallList();
  }
  function closeModal5() {
    setIsOpen5(false);
  }

  const [displayedMalls, setDisplayedMalls] = useState([]); // Malls currently displayed
  const [mallsPerPage] = useState(6); // Number of malls per page

  const getMallList = async () => {
    const token = await JSON.parse(localStorage.getItem("is_token"));

    const formdata = new FormData();
    // await formdata.append("search", "");
    if (getCusLocationValue == 1) {
      await formdata.append("location", 1);
    }

    setLoading(true);
    // fetch(get_mall_customer + `per_page=${perPage}&page=${page}`, {
    fetch(get_mall_customer, {
      method: "POST",
      body: formdata,
      headers: {
        Accept: ACCEPT_HEADER,
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Mall list data:", res.data);
        setMallList(res.data); // Set the full mall list
        // setDisplayedMalls(res.data.slice(0, mallsPerPage));
        setLoading(false);
      })
      .catch((err) => {
        console.log("error11", err);
      });
  };

  const [showloadmorebtn, setShowLoadMoreBtn] = useState(true);

  useEffect(() => {
    setDisplayedMalls(mallList.slice(0, mallsPerPage));
  }, [mallList]);

  const searchFilter = (text, id) => {
    const newData = mallList.filter(function (item) {
      const employee = item.name ? item.name.toUpperCase() : "".toUpperCase();

      const textData = text.toUpperCase();
      return employee.indexOf(textData) > -1;
    });
    if (text.length > 0) {
      setDisplayedMalls(newData);
      newData.length > 0 ? setShowLoadMoreBtn(true) : setShowLoadMoreBtn(false);
    } else {
      setDisplayedMalls(mallList.slice(0, mallsPerPage));
    }
  };

  // const getMallList1 = async () => {
  //   const token = await JSON.parse(localStorage.getItem("is_token"));

  //   const formdata = new FormData();
  //   await formdata.append("location", 1);

  //   setLoading(true);
  //   fetch(get_mall_customer + `per_page=${perPage}&page=${page}`, {
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
  //       setMallList([...mallList, ...res.data.data]);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log("error11", err);

  //     });
  // };

  // search mall list api

  const getSearchMallList = async (value) => {
    const token = await JSON.parse(localStorage.getItem("is_token"));

    const formdata = new FormData();
    await formdata.append("search", value);
    if (getCusLocationValue == 1) {
      await formdata.append("location", getCusLocationValue);
    }

    // setLoading(true);
    fetch(get_mall_customer + `per_page=${perPage}&page=${page}`, {
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
        setMallList([...mallList, ...res.data.data]);

        setLoading(false);
      })
      .catch((err) => {
        console.log("error11", err);
      });
  };

  // const loadMore = () => {
  //   const nextPage = page + 1;
  //   const startIndex = page * mallsPerPage;
  //   const endIndex = startIndex + mallsPerPage;

  //   const newMalls = mallList.slice(startIndex, endIndex);

  //   console.log(
  //     `Loading page ${nextPage}, displaying ${newMalls.length} new malls`
  //   );

  //   if (newMalls.length > 0) {
  //     setDisplayedMalls((prevMalls) => [...prevMalls, ...newMalls]);
  //     setPage(nextPage);
  //   } else {
  //     console.log("No more malls to load");
  //   }
  // };

  const [loadmoreloading, setLoadMoreLoading] = useState(false);

  const loadMore = () => {
    if (mallList.length === displayedMalls.length) console.log("---done");
    else {
      setTimeout(async () => {
        await setLoadMoreLoading(true);
        console.log("----------------ar", displayedMalls.length);
        const data = await mallList.slice(
          displayedMalls.length,
          displayedMalls.length + mallsPerPage
        );

        await setDisplayedMalls([...displayedMalls, ...data]);
        await setLoadMoreLoading(false);
      }, 1000);
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
          }}
        >
          <div className="loader"></div>
        </div>
      ) : null}
      {loading === true ? null : (
        <>
          <Helmet>
            <title>Malls Near Me</title>
          </Helmet>
          <MallNearMeSingNavbar setTab={setTab} />

          <div className="mall-near-me-main-wraapp">
            <div className="mall-near-me-sub-flex">
              <h3
                className="h4 mallnearmesing-main-heading"
                style={{ fontSize: "40px", fontWeight: "700" }}
              >
                Explore malls near you
              </h3>
              <div className="mall_near_brand_searchbar">
                {/* <input
                type="text"
                className="mall-near-me-searchbox"
                placeholder="Search"
                onChange={(e) => {
                  e.target.value.length > 0
                    ? (getSearchMallList(e.target.value),
                      setMallList([]),
                      setPage(1))
                    : (setMallList([]), setPage(1), getMallList());
                }}
               
              /> */}
                <input
                  type="text"
                  className="mall-near-me-searchbox"
                  placeholder="Search"
                  // onChange={(e) => {
                  //   e.target.value.length > 0
                  //     ? (setMallList([]),
                  //       setPage(1),
                  //       getSearchMallList(e.target.value))
                  //     : (setMallList([]), setPage(1), getMallList());
                  // }}
                  onChange={(e) => searchFilter(e.target.value)}
                />
                <HiOutlineSearch color="var(--color-orange)" size={18} />
              </div>
            </div>
            <>
              <div className="mallnearme-card-main-wrapp mallnearme-card-main-wrapp-mx-width mallnearme-card-main-wrapp-resp-gap">
                {/* <p>{mallList.length}</p> */}
                {displayedMalls.map((x, i) => {
                  return (
                    <MallsNearMeCard
                      setTab={setTab}
                      SetSingalMallData={SetSingalMallData}
                      item={x}
                      key={i}
                      getMallList={getMallList}
                    />
                  );
                })}
                {/* <MallsNearMeCard />
                    <MallsNearMeCard />
                    <MallsNearMeCard />
                    <MallsNearMeCard /> */}
              </div>
              {/* {totalPages !== page && (
                <button
                  className="view_more_btn"
                  onClick={() => setPage(page + 1)}
                >
                  {loading ? "Loading..." : "Load More"}
                  <BsChevronDown />
                </button>
              )} */}
              {showloadmorebtn === true ? (
                <>
                  {!loadmoreloading &&
                    displayedMalls.length < mallList.length && (
                      <button className="view_more_btn" onClick={loadMore}>
                        {loadmoreloading ? "Loading..." : "Load More"}
                        <BsChevronDown />
                      </button>
                    )}
                </>
              ) : null}
            </>
          </div>

          <ReactModal
            isOpen={modalIsOpen3}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal3}
            style={customStyles}
          >
            <div className="home_login_model_1sec_inner">
              <button className="signup_modal_close" onClick={closeModal3}>
                {/* <span
              style={{ fontSize: "16px" }}
              className="brand-lable-radio-btn-txt"
            >
              Cancel
            </span>{" "} */}
                <AiOutlineClose color="black" />
              </button>
              <div
                className="f-b900 fs-22 mb_16 signup_headign"
                style={{ marginTop: "40px" }}
              >
                {getPopupData ? getPopupData.title : ""}
              </div>
              <p style={{ textAlign: "center", width: "100%" }}>
                {getPopupData ? getPopupData.details : ""}
              </p>

              {/* <div style={{ height: "1px", background: "#ddd", width: '100%', marginTop: "20px", marginBottom: "20px" }}></div> */}

              {/* <div className="rating-star-box">
            <AiFillStar className="rating-star-icon" key={index}
              onClick={() => handleRatingClick(index + 1)}
              color={index + 1 <= rating ? '#ffc107' : '#e4e5e9'} />
            <AiFillStar className="rating-star-icon" />
            <AiFillStar className="rating-star-icon" />
            <AiFillStar className="rating-star-icon" />
            <AiFillStar className="rating-star-iconn" />
          </div> */}

              <button
                className="btn btn-orange mb_16"
                style={{ marginTop: "2rem" }}
                onClick={() => {
                  setMallList([]); setPage(1); Locationapi();
                }}
                disabled={isAcceptTerm ? false : true}
              >
                {getPopupData ? getPopupData.confirm_button : ""}
              </button>
              <button
                className="btn  mb_16"
                style={{ marginTop: "0rem", fontWeight: "400" }}
                onClick={() => closeModal3()}
                disabled={isAcceptTerm ? false : true}
              >
                {getPopupData ? getPopupData.cancel_button : ""}
              </button>
            </div>
          </ReactModal>

          {/* Rating Modal */}

          <ReactModal
            isOpen={modalIsOpen5}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal5}
            style={customStyles}
          >
            <div
              className="home_login_model_1sec_inner home_login_model_1sec_inner_cus_rating mall_rating_pading_resp"
              style={{ padding: "2rem" }}
            >
              <button className="signup_modal_close" onClick={closeModal5}>
                {/* <span
              style={{ fontSize: "16px" }}
              className="brand-lable-radio-btn-txt"
            >
              Cancel
            </span>{" "} */}
                <AiOutlineClose color="black" />
              </button>
              <div
                className="f-b900 fs-22 mb_16 signup_headign"
                style={{
                  marginTop: "40px",
                  fontSize: "23px",
                  textAlign: "center",
                }}
              >
                How was the {getsingalmalldata2?.name}?
              </div>
              <p
                style={{ textAlign: "center", width: "100%", fontSize: "17px" }}
              >
                We would really appreciate your feedback!
              </p>

              <div className="rating-star-box">
                {/* <AiFillStar className="rating-star-icon" key={index}
              onClick={() => handleRatingClick(index + 1)}
              color={index + 1 <= rating ? '#ffc107' : '#e4e5e9'} /> */}
                {/* <AiFillStar className="rating-star-icon" />
            <AiFillStar className="rating-star-icon" />
            <AiFillStar className="rating-star-icon" />
            <AiFillStar className="rating-star-iconn" /> */}
                {/* <Rating
              emptySymbol={<img src={images.graystar} className="icon" style={{marginRight:"20px"}} />}
              fullSymbol={<img src={images.orangestar} className="icon" style={{marginRight:"20px"}}/>}
              onClick={(e) => { 
                setRating(e)
              }}
            /> */}
                <Rating
                  emptySymbol={
                    <img
                      src={images.graystar}
                      className="icon"
                      style={{ marginRight: "20px" }}
                    />
                  }
                  fullSymbol={
                    <img
                      src={images.orangestar}
                      className="icon"
                      style={{ marginRight: "20px" }}
                    />
                  }
                  initialRating={getrating}
                  onClick={(e) => {
                    // console.log("e", e);
                    setRating(e);
                  }}
                />
              </div>
              <div className="sign_input_wrapp">
                {/* <div className="signup_terms_wrapp">
              <input
                type="checkbox"
                value={isAcceptTerm}
                onChange={handleTermChange}
                checked={isAcceptTerm}
              />
              <p className="fs-des">
                I have read and agree to the{" "}
                <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                <a className="signup_terms_link">Privacy Policy</a>
              </p>
            </div> */}
                <div
                  style={{
                    height: "1px",
                    background: "#aaa",
                    width: "100%",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                ></div>

                {/* <button className="signup_model_forgate">Forgot password?</button> */}
              </div>
              <button
                className="btn btn-orange mb_16"
                onClick={() => addRating()}
                // disabled={isAcceptTerm ? false : true}
              >
                Submit
              </button>
            </div>
          </ReactModal>
        </>
      )}
    </>
  );
};

export default MallNearMeSing;