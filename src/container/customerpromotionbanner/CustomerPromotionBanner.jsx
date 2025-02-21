import React, { useEffect, useState } from "react";
import "./CustomerPromotionBanner.css";
import { CustomerPromotionalSingCarg, PromotionHero } from "../../components";
import { BsChevronDown } from "react-icons/bs";
import ReactModal from "react-modal";
import axios from "axios";
import Notification from "../../utils/Notification";
import { useAuthContext } from "../../context/auth_context";
import {
  ACCEPT_HEADER,
  get_category,
  get_mall_customer_leaderboard,
  get_mall_customer_promotional,
  get_notification_url,
  update_notification,
} from "../../utils/Constant";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineSearch } from "react-icons/hi";

const CustomerPromotionBanner = ({
  getsingalmalldata,
  setTab,
  SetProId,
  SetBrandId,
  setStoreName,
  gettab,
  sidebaropen,
  SetNavBarData,
  SetNavBarDataName,
  SetNavBarData1,
  respSearch,
  setResponSearch,
}) => {
  useEffect(() => {
    LederboadnApi();
  }, []);

  const perPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [proList, setProList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAcceptTerm, setIsAcceptTerm] = useState(true);
  const { logindata } = useAuthContext();
  const [getdprodata, SetProdata] = useState([]);
  const [modalIsOpen3, setIsOpen3] = useState(false);

  useEffect(() => {
    PromationApi();
    // console.log("getsingalmalldata", getsingalmalldata);
  }, [page]);

  const LederboadnApi = async () => {
    const token = await JSON.parse(localStorage.getItem("is_token"));
    const formdata = new FormData();
    formdata.append("mall_id", getsingalmalldata.id);

    fetch(get_mall_customer_leaderboard, {
      method: "POST",
      body: formdata,
      headers: {
        Accept: ACCEPT_HEADER,
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("123445", res.data);
        SetProdata(res.data);
      })
      .catch((err) => {
        console.error("err", err);
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

  const handleTermChange = () => {
    setIsAcceptTerm((current) => !current);
  };

  const PromationApi = async () => {
    const token = await JSON.parse(localStorage.getItem("is_token"));
    const formdata = new FormData();
    formdata.append("mall_id", getsingalmalldata.id);
    setLoading(true);
    fetch(get_mall_customer_promotional + `per_page=${perPage}&page=${page}`, {
      method: "POST",
      body: formdata,
      headers: {
        Accept: ACCEPT_HEADER,
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("ffff", res.data.last_page);
        setTotalPages(res.data.last_page);
        const newData = res.data.data;
        if (page === 1) {
          setProList(shuffleArray(newData)); // Initialize proList for the first page
        } else {
          setProList((prevProList) =>
            shuffleArray([...prevProList, ...newData])
          );
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  useEffect(() => {
    getNotificationcheck();
    getcat();
  }, []);

  const getNotificationcheck = async () => {
    const token = await JSON.parse(localStorage.getItem("is_token"));
    const formdata = new FormData();
    formdata.append("mall_id", getsingalmalldata.id);
    axios
      .post(get_notification_url, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success === 1) {
          setIsOpen3(res.data.data.notification === 0);
        }
      })
      .catch((err) => {
        console.log("errr", err);
      });
  };

  const Notificationapi = async (mallId, notification) => {
    const token = await JSON.parse(localStorage.getItem("is_token"));
    const formdata = new FormData();
    formdata.append("mall_id", mallId);
    formdata.append("customer_notification", notification);
    axios
      .post(update_notification, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("ressss", JSON.stringify(res.data, null, 2));
        if (res.data.success === 1) {
          Notification("success", "Success!", "Update Successfully!");
          closeModal3();
        }
      })
      .catch((err) => {
        console.log("err", err);
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
  const [getserach, setSerach] = useState("");

  const closeModal3 = () => {
    setIsOpen3(false);
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
    if (respSearch) {
      setIsTransitionActive(!isTransitionActive);
    }
  }, [respSearch]);


  return (
    <>
      <div style={{ marginLeft: sidebaropen === true ? "-28px" : "-31px" }}>
        {loading ? (
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
            {/* {respSearch === true ? <>
            <div className="resp_cust_search_filter_main">
          <div className="cus-nav-filter-flex">
              <div className="mm_form_single_input mm_form_single_input2" style={{ gap: "7px" }}>
                <label
                  className="leaderboard-card-lbl"
                  style={{ minWidth: "68px", fontWeight: "300" }}
                >
                  Filter by:
                </label>
                <div className="select-wrapper" style={{width:"100%",marginRight:"1.1rem"}}>
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
            <div className="mm_form_single_input mm_form_single_input2" style={{ gap: "7px",width:"100%" }}>
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
                width:"100%"
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
          </> : <></>} */}

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

            <div style={{ width: "100%", transition: "bottom 5s linear" }}>
              <PromotionHero getdprodata={getdprodata} />
            </div>
            <div style={{ marginTop: gettab === 2 ? "1rem" : "", transition: "bottom 5s linear" }}
              className={`${proList.length <= 0 ? "mm_main_wrapp_noprom" : "mm_main_wrapp"
                }`}
            >
              {proList.length <= 0 ? (
                <>
                  <p
                    className="no_prom_title"
                    style={{
                      color: "var(--color-black)",
                      fontWeight: "600",
                      fontSize: "22px",
                    }}
                  >
                    There are currently no promotions available.
                  </p>
                </>
              ) : (
                <>
                  <div className="cust-promotional-main-wrapp">
                    {proList.map((x, i) => (
                      <CustomerPromotionalSingCarg
                        key={i}
                        x={x}
                        setTab={setTab}
                        SetProId={SetProId}
                        SetBrandId={SetBrandId}
                        setStoreName={setStoreName}
                      />
                    ))}
                  </div>
                </>
              )}
              {totalPages !== page && (
                <button
                  className="view_more_btn"
                  onClick={() => setPage(page + 1)}
                >
                  {loading ? "Loading..." : "Load More"}
                  <BsChevronDown />
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <ReactModal
        isOpen={modalIsOpen3}
        onRequestClose={closeModal3}
        style={customStyles}
      >
        <div className="home_login_model_1sec_inner">
          <button className="signup_modal_close" onClick={closeModal3}>
            <AiOutlineClose color="black" />
          </button>
          <div
            className="f-b900 fs-22 mb_16 signup_headign"
            style={{
              marginTop: "40px",
              textAlign: "center",
              fontWeight: "700 !important",
            }}
          >
            In-store would like to send you notifications
          </div>
          <p style={{ textAlign: "center", width: "100%" }}>
            Notifications on the latest promotions from this mall may include
            alerts, sounds and icon badges. These can be configured in Settings.
          </p>
          <div className="rating-star-box"></div>
          <div className="sign_input_wrapp"></div>
          <button
            onClick={() => Notificationapi(getsingalmalldata.id, 1)}
            className="btn btn-orange mb_16"
            disabled={!isAcceptTerm}
          >
            Allow
          </button>
          <button
            className="btn mb_16"
            style={{ fontWeight: "400" }}
            onClick={() => Notificationapi(getsingalmalldata.id, 0)}
            disabled={!isAcceptTerm}
          >
            No, thanks
          </button>
        </div>
      </ReactModal>
    </>
  );
};

export default CustomerPromotionBanner;
