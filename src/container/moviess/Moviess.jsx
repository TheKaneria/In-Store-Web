import React, { useEffect, useState } from "react";
import { CustomerHero, CustomerHeroSecond, MoviesCard } from "../../components";
import { HiOutlineSearch } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";
import "./Moviess.css";
import {
  ACCEPT_HEADER,
  get_category,
  get_mall_cinema_customer,
  get_movie_list,
} from "../../utils/Constant";
import axios from "axios";
import CustomerHeroCinema from "../../components/CustomerHeroCinema";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoChevronBack } from "react-icons/io5";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Moviess = ({ setTab, getsingalmalldata, sidebaropen,SetNavBarData,
  SetNavBarDataName,
  SetNavBarData1,
  respSearch,
  setResponSearch, }) => {
  useEffect(() => {
    getmovielist();
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


  const [getlist, SetList] = useState([]);
  const [getlist2, SetList2] = useState();
  const [loading, SetLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);


  const getmovielist = async () => {
    SetLoading(true);
    const token = JSON.parse(localStorage.getItem("is_token"));

    const formdata = new FormData();
    // await formdata.append("search", "");
    await formdata.append("mall_id", getsingalmalldata.id);

    axios
      .post(get_mall_cinema_customer, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // ("parth-->>", JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          SetList(res.data.data.data);
          SetList2(res.data.data.cinema);
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

  var settings = {
    // dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,

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

  // console.log("getlist2",getlist2);


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
      <div style={{ marginLeft:sidebaropen === true ? "-28px" : "-31px"}}>
        {/* <Slider {...settings}> */}
        <Carousel autoPlay={true}       // Enable autoplay
          interval={2000}       // Set autoplay interval to 1 second (1000 ms)
          infiniteLoop={true}   // Loop carousel infinitely
          showThumbs={false}    // Optional: Hide thumbnail navigation
          showStatus={false}    // Optional: Hide the status (e.g., 1/3)
          showArrows={true}     // Optional: Show left/right arrows
          stopOnHover={true}
          showIndicators={false} // Hide the dots (indicators)

        >
          {getlist2 && getlist2.length > 0
            ? getlist2.map((item, index) => {
              return (
                <CustomerHeroCinema
                  item={item}
                  // sidebaropen={sidebaropen}
                  getlist2={getlist2}
                />
              );
            })
            : null}
        </Carousel>
        {/* </Slider> */}
        {/* <CustomerHero getsingalmalldata={getsingalmalldata} /> */}
        {/* <CustomerHeroSecond getsingalmalldata={getsingalmalldata} /> */}
        {/* <CustomerHeroCinema getlist2={getlist2} /> */}
        <div className="mm_main_wrapp" style={{ marginTop: "3.2rem" }}>
          <div className='edit-brand-back-iconbox' style={{ width: "80px" }} onClick={() => setTab(2)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

          <div className="profile_head_center movies-cus-head">
            <h4
              className="h3"
              style={{ textTransform: "capitalize", fontWeight: "600" }}
            >
              {getsingalmalldata.name}
            </h4>{" "}
            <span className="h3" style={{ fontWeight: "600" }}>
              Movies
            </span>
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
              <div className="movies_card_wrapp">
                {getlist && getlist.length > 0
                  ? getlist.map((item, index) => {
                    return <MoviesCard item={item} />;
                  })
                  : null}
              </div>
            </>
          )}
          {isVisible ? <>
            <div className='edit-brand-back-iconbox' style={{ width: "80px", marginTop: "2rem" }} onClick={() => setTab(2)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

          </> : <></>}

        </div>
      </div>
    </div>
  );
};

export default Moviess;