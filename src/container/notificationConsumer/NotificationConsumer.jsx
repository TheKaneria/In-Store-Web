import React, { useEffect, useState } from "react";
import "./NotificationConsumer.css";
import { CustomerHeroSecond } from "../../components";
import { ACCEPT_HEADER, get_category, get_received_notification, read_received_notification } from "../../utils/Constant";
import axios from "axios";
import { IoChevronBack } from "react-icons/io5";
import { HiOutlineSearch } from "react-icons/hi";

const NotificationConsumer = ({ getsingalmalldata, setTab, setBDetalis,sidebaropen,SetNavBarData,
  SetNavBarDataName,
  SetNavBarData1,
  respSearch,
  setResponSearch, }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);


  // const handleOnClick = (index) => {
  //   const newData = [...data];
  //   newData[index].status = 1;
  //   setData(newData);
  // };

  useEffect(()=>{
    getMallMaster();
  },[])

  const getMallMaster = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    setLoading(true);
    axios
      .get(get_received_notification, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        ("get notification resp", JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          setData(res.data.data);
          setLoading(false);
        } else {
          null;
        }
      })
      .catch((err) => {
       console.log("err11", err);
        setLoading(false);
      });
  };
  const readNotificationApi = async (id,id2) => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    const formdata = await new FormData();
    await formdata.append("id", id);
    await formdata.append("is_read", id2);
    setLoading(true);
    axios
      .post(read_received_notification,formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        ("get notification resp", JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          setData(res.data.data);
          getMallMaster();
          setLoading(false);

        } else {
          null;
        }
      })
      .catch((err) => {
       console.log("err11", err);
        setLoading(false);
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
    
    <div>

      <CustomerHeroSecond getsingalmalldata={getsingalmalldata} sidebaropen={sidebaropen}/>
      <div>
      <div className='edit-brand-back-iconbox' style={{width:"80px",marginLeft:"2rem",marginTop:"2rem"}} onClick={() => setTab(2)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

        <div className="profile_head_center"  style={{ padding: "1rem 0 2rem 0" }}>
          <h3
            style={{
              fontSize: "40px",
              textTransform: "capitalize",
              fontWeight: "600",
            }}>
            Notifications
          </h3>
        </div>
        {data && data.length > 0
          ? data.map((item, index) => {
              return (
                <div
                  style={{
                    margin: "2rem",
                    background: "whitesmoke",
                    padding: "2rem",
                    display: "flex",
                    gap:"0.5rem",
                    flexDirection: "column",
                    borderLeft:
                      item.is_read === 0
                        ? "5px solid var(--color-orange)"
                        : "5px solid gray",
                  }}>
                  <b>{item.malls?.name}</b>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}>
                    <span style={{marginBottom:"0.5rem"}}>
                    {item.particular}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}>
                      <p style={{ color: "gray",fontSize:"14px" }}>{item.created_at}</p>
                      {item.is_read === 0 ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            color: "var(--color-orange)",
                            fontWeight: "600",
                          }}>
                          <button
                            onClick={() => {
                              readNotificationApi(item.id,1);
                            }}>
                            Mark as Read
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })
          : null}

          {isVisible ? <>
            <div className='edit-brand-back-iconbox' style={{width:"80px",marginLeft:"2rem",marginTop:"2rem"}} onClick={() => setTab(2)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

          </> : <></>}

      </div>
    </div>
    </>)}
    </>
  );
};

export default NotificationConsumer;
