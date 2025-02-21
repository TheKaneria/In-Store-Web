import React, { useEffect, useState } from "react";
import "./CustomerFacility.css";
import images from "../../constants/images";
import { CustomerFacilityCard, CustomerHeroSecond } from "../../components";
import { ACCEPT_HEADER, get_category, get_facility_customer, get_mall_facelity_customer } from "../../utils/Constant";
import { IoChevronBack } from "react-icons/io5";
import axios from "axios";
import { HiOutlineSearch } from "react-icons/hi";
const CustomerFacility = ({ getsingalmalldata, setTab, sidebaropen,SetNavBarData,
  SetNavBarDataName,
  SetNavBarData1,
  respSearch,
  setResponSearch, }) => {

    const [filterClass, setFilterClass] = useState("hidden");
    const [isTransitionActive, setIsTransitionActive] = useState(false);
  
    useEffect(() => {
      if (respSearch) {
        setFilterClass("visible");
      } else {
        setFilterClass("hidden");
      }
    }, [respSearch]);

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

  const FacilitiesData = [
    {
      id: 1,
      img: images.wcard_1,
      logo: images.facilities_logo6,
      des: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortist lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetuer. ",
      bgcolor: "#4397ff",
      heading: "Free WIFI",
    },
    {
      id: 2,
      img: images.wcard_2,
      logo: images.facilities_logo4,
      des: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortist lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetuer. ",
      bgcolor: "#ff8b00",
      heading: "Tag & Go Parking",
    },
    {
      id: 3,
      img: images.wcard_3,
      logo: images.facilities_logo1,
      des: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortist lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetuer. ",
      bgcolor: "#d813a5",
      heading: "Baby Change Rooms",
    },
    {
      id: 4,
      img: images.wcard_1,
      logo: images.facilities_logo3,
      des: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortist lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetuer. ",
      bgcolor: "#4397ff",
      heading: "Family Rooms",
    },
    {
      id: 5,
      img: images.wcard_2,
      logo: images.facilities_logo2,
      des: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortist lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetuer. ",
      bgcolor: "#ff8b00",
      heading: "Wheel Chairs Available",
    },
    {
      id: 6,
      img: images.wcard_3,
      logo: images.facilities_logo5,
      des: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortist lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetuer. ",
      bgcolor: "#d813a5",
      heading: "Prayer Room",
    },
  ];

  const [getfacilitydata, Setfacilitydata] = useState("");

  const perPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [proList, setProList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    CustomerFacilityApi();
  }, [page]);


  const CustomerFacilityApi = async () => {
    const token = await JSON.parse(localStorage.getItem("is_token"));
    const formdata = new FormData();
    // await formdata.append("search", "");
    await formdata.append("mall_id", getsingalmalldata.id);
    setLoading(true);
    // fetch(get_mall_facelity_customer + `per_page=${perPage}&page=${page}`, {
    fetch(get_facility_customer, {
      method: "POST",
      body: formdata,
      headers: {
        Accept: ACCEPT_HEADER,
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // ("Brand_list", res.data.last_page);
        // setTotalPages(res.data.last_page);
        // setProList([...proList, ...res.data.data]);
        setProList(res.data);
        console.log("prolist", proList);

        setLoading(false);
      })
      .catch((err) => {
        // ("err", err);
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

  return (
    <>
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

      </> :

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
          <CustomerHeroSecond getsingalmalldata={getsingalmalldata} sidebaropen={sidebaropen} />

          <div className="mm_main_wrapp mm_main_wrapp_22">
            <div className='edit-brand-back-iconbox' style={{ width: "80px" }} onClick={() => setTab(2)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

            {/* <div className="mall_name_wrapp"> */}
            <div className="mall-near-me-sub-flex">
              <p className="mall_name_heading">{getsingalmalldata.name} facilities</p>
            </div>
            <span></span>
            {/* </div> */}
            {/* <div className="mm_horizontal_line"></div> */}
            <div className="facilities_cards_wrapp">
              {proList && proList.length > 0
                ? proList.map((brndItm) => {
                  return (
                    <CustomerFacilityCard item={brndItm} />
                  );
                })
                : null}
            </div>
            {isVisible ? <>
              <div className='edit-brand-back-iconbox' style={{ width: "80px", marginTop: "2rem" }} onClick={() => setTab(2)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

            </> : <></>}

          </div>
        </div>
      }
    </>

  );
};

export default CustomerFacility;
