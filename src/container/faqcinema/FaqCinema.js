import React, { useEffect } from "react";
import "./FaqCinema.css";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "antd";
import { useState } from "react";
import { ACCEPT_HEADER, get_category, get_faq } from "../../utils/Constant";
import axios from "axios";
import { MallHero } from "../../components";
import images from "../../constants/images";
import { IoChevronBack } from "react-icons/io5";
import { HiOutlineSearch } from "react-icons/hi";

const Data = [
  {
    id: 1,
    title: "Who can beneﬁt from In-store?",
    desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate.",
    color: "1",
  },

  {
    id: 2,
    title: "How do I promote my brand on In-store?",
    desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate.",
    color: "1",
  },
  {
    id: 3,
    title: "How do I load products onto In-store?",
    desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate.",
    color: "1",
  },
  {
    id: 4,
    title: "How do I load products onto In-store?",
    desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate.",
    color: "1",
  },
  {
    id: 5,
    title: "How do I join In-Store?",
    desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate.",
    color: "2",
  },
  {
    id: 6,
    title: "Who has accesss to my analytics?",
    desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate.",
    color: "2",
  },
  {
    id: 7,
    title: "Can customers purchase products on In-Store?",
    desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate.",
    color: "2",
  },
  {
    id: 8,
    title: "How do I book my campaigns ahead of time?",
    desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate.",
    color: "2",
  },
  {
    id: 9,
    title: "How do I book my campaigns ahead of time?",
    desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate.",
    color: "1",
  },
];

const FaqCinema = ({get_mall_auth_data,setTab, sidebaropen,SetNavBarData,
  SetNavBarDataName,
  SetNavBarData1,
  respSearch,
  setResponSearch,}) => {
  const [getfaq1, setFaq1] = useState();
  const [getcon, SetCon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getFaqArray, SetFaqArray] = useState([]);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(()=>{
    getFaqData();
  },[])

  const getFaqData = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    setLoading(true);
    axios
      .get(get_faq, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.data.success == 1) {
          SetFaqArray(res.data.data);
          // Notification("success", "Success!", "Mall Registerated Successfully!");
        } else {
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
    {/* <MallHero get_mall_auth_data={get_mall_auth_data} /> */}
    <div
              className="about_hero_wrapp about_hero_wrapp2"
              style={{
                // backgroundImage: url(${images.about_hero}),
                backgroundImage: `url(${
                  images.faq_banner
                })`,
                backgroundPosition: "top",
                backgroundSize: "cover",
              }}>
              {/* <img src={images.hero_banner} alt="" /> */}
              <div className="homehero_text_main">
                <div className="homehero_text_base homehero_text_base_retailer">
                  <img src={images.instore_app_header_logo} alt="" />
                  {/* <img
                    src={getStoreData ? getStoreData.logo_img_path : ""}
                    alt=""
                  /> */}
                  {/* social media account button start */}
                  <div className="apps_logos_wrapp">
                    {/* <img src={images.play_store_logo} alt="play store logo" /> */}
                    <img
                      style={{ width: "155px", height: "46px" }}
                      src={images.play_store_logo}
                      alt="play store logo"
                    />
                    <img
                      style={{ width: "155px", height: "46px" }}
                      src={images.app_store_logo}
                      alt="app store logo"
                    />
                  </div>
                </div>
              </div>
            </div>
    <div className="faq-main">
    <div className='edit-brand-back-iconbox' style={{width:"80px",marginLeft:"2rem"}} onClick={() => setTab(2)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

      <div className="faq-heading-part faq-cinema-heading-part">
        <h2 className="faq-head">FAQs</h2>
        <p className="faq-head-txt" style={{textAlign:"center"}}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh.
        </p>
      </div>
      <div className="faq-con">
        {/* <div className="faq-part-orange-main">
          <div className="faq-orange-sub-part"> */}
            {getFaqArray &&
              getFaqArray.map((item, index) => {
                {/* ("--->", item); */}
                return (
                  <>
                  
                      <>
                        <div className="faq-orange-main faq-black-main">
                          <div className="faq-orange-que-flex" onClick={() => {
                                setFaq1(item.id), SetCon(!getcon);
                              }}>
                            <p className="faq-orange-que">{item.name}</p>
                            <Button
                              className="faq-btn"
                              >
                              <IoIosArrowDown className="faq-icon-up" />
                            </Button>
                          </div>
                          {item.id == getfaq1 && getcon === true ? (
                            <p>
                              <p className="faq-desc">{item.description}</p>
                            </p>
                          ) : null}
                        </div>
                      </>
                   
                  </>
                );
              })}
          {/* </div>
        </div> */}
       
      </div>

            {isVisible ? <>
              <div className='edit-brand-back-iconbox' style={{width:"80px",marginLeft:"2rem", marginTop:"2rem"}} onClick={() => setTab(2)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

            </> : <></>}

    </div>
    </>)}
    </>
  );
};

export default FaqCinema;