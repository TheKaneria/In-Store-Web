import React, { useEffect, useState } from "react";
import { CustomerHero, CustomerHeroSecond, MallEventCard, MallHero } from "../components";
import { useMallContext } from "../context/mall_context";
import images from "../constants/images";
import { Link } from "react-router-dom";
import { ACCEPT_HEADER, get_category, get_mall_customer_event } from "../utils/Constant";
import { BsChevronDown } from "react-icons/bs";
import { IoChevronBack } from "react-icons/io5";
import { HiOutlineSearch } from "react-icons/hi";
import axios from "axios";

const CutomerMallEvents = ({ getsingalmalldata,setTab,sidebaropen,SetNavBarData,
  SetNavBarDataName,
  SetNavBarData1,
  respSearch,
  setResponSearch, }) => {
  const { get_mall_auth_data, get_mall_store_data } = useMallContext();


  const perPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);


  const [getbranddata, SetBrandData] = useState("");
  useEffect(() => {
    EventApi();
  }, [page]);

  const EventApi = async () => {
    const token = await JSON.parse(localStorage.getItem("is_token"));
    const formdata = new FormData();
    // await formdata.append("search", "");
    await formdata.append("mall_id", getsingalmalldata.id);
    setLoading(true);
    fetch(get_mall_customer_event + `per_page=${perPage}&page=${page}`, {
      method: "POST",
      body: formdata,
      headers: {
        Accept: ACCEPT_HEADER,
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // ("event_list", res.data.last_page);
        setTotalPages(res.data.last_page);
        setEventList([...eventList, ...res.data.data]);
        setLoading(false);
      })
      .catch((err) => {
        ("err", err);
      });
  };

  useEffect(()=>{
    getcat();

  },[])

  const [getserach, setSerach] = useState("");

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

  useEffect(() => {
    // ("customer side event list", eventList);
  })

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
    {loading === true ? <>
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
    </>:<>
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
    <CustomerHeroSecond getsingalmalldata={getsingalmalldata} sidebaropen={sidebaropen} />
      <div className="mm_main_wrapp mm_main_wrapp_22" style={{margin:"2rem"}}>
      <div className='edit-brand-back-iconbox' style={{width:"80px",marginTop:"1.2rem"}} onClick={() => setTab(2)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

        {/* heading */}
        <div className="profile_head_center" style={{ marginBottom: "2rem" }}>
          <h4 className="h3" style={{ textTransform: "capitalize",fontWeight:"600" }}>{getsingalmalldata.name} events</h4>
        </div>

        <div style={{ margin: "1rem auto" }}>
          {/* Signle mall event */}
          <div onClick={() => { }}>
            {eventList && eventList.length > 0
              ? eventList.map((brndItm) => {
                return (
                  <>
                    <MallEventCard
                      img={
                        brndItm.image_path === null
                          ? images.about_hero
                          : brndItm.image_path
                      }
                      name={brndItm.name !== null ? brndItm.name : ""}
                      location={
                        brndItm.location !== null ? brndItm.location : ""
                      }
                      start_date={
                        brndItm.start_date !== null ? brndItm.start_date : ""
                      }
                      end_date={
                        brndItm.end_date !== null ? brndItm.end_date : ""
                      }
                      description={
                        brndItm.description !== null
                          ? brndItm.description
                          : ""
                      }
                    // get_mevent_data={get_mevent_data}
                    />

                    <div className="mm_horizontal_line"></div>
                  </>
                );
              })
              : null}
          </div>
          {/* Signle mall event */}
        </div>
        {totalPages !== page && (
          <button className="view_more_btn" onClick={() => setPage(page + 1)}>
            {loading ? "Loading..." : " Load More "}
            <BsChevronDown />
          </button>
        )}
        {isVisible ? <>
          <div className='edit-brand-back-iconbox' style={{width:"80px",marginTop:"2rem"}} onClick={() => setTab(2)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

        </> : <></>}

      </div>
    </>}
      {/* <CustomerHero getsingalmalldata={getsingalmalldata} /> */}
     
    </div>
  );
};

export default CutomerMallEvents;
