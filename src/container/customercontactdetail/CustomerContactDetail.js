import React, { useEffect, useState } from "react";
// import "./ContactDetail.css";
import images from "../../constants/images";
import { FaInstagramSquare, FaPhone } from "react-icons/fa";
import { CustomerHeroSecond, MallHero } from "../../components";
import { AiFillFacebook } from "react-icons/ai";
import { IoChevronBack } from "react-icons/io5";
import { ACCEPT_HEADER, get_category } from "../../utils/Constant";
import axios from "axios";
import { HiOutlineSearch } from "react-icons/hi";

const CustomerContactDetail = ({ getsingalmalldata,setTab,sidebaropen,SetNavBarData,
  SetNavBarDataName,
  SetNavBarData1,
  respSearch,
  setResponSearch,  }) => {


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
      <div className="">
        {/* <MallHero getsingalmalldata={getsingalmalldata} /> */}
        <CustomerHeroSecond getsingalmalldata={getsingalmalldata} sidebaropen={sidebaropen} />
      </div>

      <div className="mm_main_wrapp">
      <div className='edit-brand-back-iconbox' style={{width:"80px",marginBottom:"1.2rem"}} onClick={() => setTab(2)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

        {/* mall management name start */}
        <div
          className="mall_name_wrapp mall_con_wrapp"
          style={{ paddingLeft: "0rem" }}
        >
          <p className="mall_name_heading">{getsingalmalldata.name}:</p>
          <span style={{ fontWeight: 600 }}>Contact Details</span>
        </div>
        {/* <div className="mm_horizontal_line"></div> */}
        <div className="" style={{ marginTop: "2rem" }}></div>

        <div className="cd_main_wrapp" style={{ marginLeft: "0rem" }}>
          <h5 className="cd_heading" style={{ fontWeight: 600 }}>
            We would love to hear from you!
          </h5>
          <p className="cd_des"></p>

          {/* <h5 className="cd_heading"> Contact The {getsingalmalldata.name}</h5> */}
          <p className="cd_des">{getsingalmalldata.description}</p>

          <div className="cd_address_wrapp">
            {/* about address 2 */}
            <div
              style={{
                display: "flex",
                gap: "5rem",
                width: "100%",
                marginTop: "2rem",
              }}
              className="mall_con_detailss_main"
            >
              <div className="cd_address_wrapp_inner_part">
                <h5 style={{ fontWeight: "700" }}>
                  {getsingalmalldata.name} Head Office
                </h5>
                <div className="cd_add_time_wrapp">
                  <img src={images.clock} alt="" />
                  <p
                    style={{
                      color: "var(--color-black)",
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                  >
                    Trading hours:{" "}
                    {getsingalmalldata.mon_fri_from_time &&
                      getsingalmalldata.mon_fri_from_time}
                    am -{" "}
                    {getsingalmalldata.mon_fri_to_time &&
                      getsingalmalldata.mon_fri_to_time}
                    pm (Mon-Sun)
                  </p>
                </div>

                <div className="cd_add_time_wrapp">
                  <img src={images.clock} alt="" />
                  <p
                    style={{
                      color: "var(--color-black)",
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                  >
                    Trading hours: {getsingalmalldata.sat_from_time
                    && getsingalmalldata.sat_from_time}am - {getsingalmalldata.sat_to_time && getsingalmalldata.sat_to_time
                  }pm (Saturday)
                  </p>
                </div>

                 <div className="cd_add_time_wrapp">
                  <img src={images.clock} alt="" />
                  <p
                    style={{
                      color: "var(--color-black)",
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                  >
                    Trading hours: {getsingalmalldata.holiday_from_time && getsingalmalldata.holiday_from_time}am - {getsingalmalldata.holiday_to_time
                    && getsingalmalldata.holiday_to_time
                  }pm (Public Holiday) 
                  </p>
                </div>
                <div className="cd_add_time_wrapp">
                  <FaPhone color="var(--color-orange)" size={16} />
                  <a href={
                      "tel:" + `${getsingalmalldata.ho_number && getsingalmalldata.ho_number}`
                    }
                    style={{
                      color: "var(--color-black)",
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                  >
                    {getsingalmalldata.ho_number && getsingalmalldata.ho_number}
                  </a>
                </div>
                <div className="cd_add_time_wrapp">
                  <img src={images.send} alt="" />
                  <a href={"mailto:" + `${getsingalmalldata.email && getsingalmalldata.email}`}
                    style={{
                      color: "var(--color-black)",
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                  >
                    {getsingalmalldata.email && getsingalmalldata.email}
                  </a>
                </div>
                <div className="cd_add_time_wrapp">
                  <img src={images.location} alt="" />
                  <p
                    style={{
                      color: "var(--color-black)",
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                  >
                    {/* {getsingalmalldata.name},{getsingalmalldata.address},
                    {getsingalmalldata.address_2},{getsingalmalldata.address_3}. */}
                    {getsingalmalldata.name},{getsingalmalldata.address}
                  </p>
                </div>
              </div>
              <div>
                <h5 className="mall_con_lease" style={{ fontWeight: 700 }}>
                  Let's Connect
                </h5>
                {/* <div className="cd_add_time_wrapp">
                  <FaPhone color="var(--color-orange)" size={16} />
                  <a
                    style={{
                      color: "var(--color-black)",
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                  >
                    {getsingalmalldata.fb && getsingalmalldata.fb}
                  </a>
                </div>
                <div className="cd_add_time_wrapp">
                  <img src={images.send} alt="" />
                  <a
                    style={{
                      color: "var(--color-black)",
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                  >
                    {getsingalmalldata.insta && getsingalmalldata.insta}
                  </a>
                </div> */}

                <div className="custwelmall-social-icon-flex">
                <AiFillFacebook className="custwelmall-social-icon" />
                <a href={getsingalmalldata.fb && getsingalmalldata.fb} target="_blank" className="custwelmall-social-name" style={{fontSize:"16px"}}>Facebook</a>
                
              </div>
              <div className="custwelmall-social-icon-flex">
                <FaInstagramSquare className="custwelmall-social-icon" />
                <a href={getsingalmalldata.insta && getsingalmalldata.insta} target="_blank" className="custwelmall-social-name" style={{fontSize:"16px"}}>Instagram</a>
              </div>
              </div>
            </div>
          </div>
        </div>

        <div className='edit-brand-back-iconbox' style={{width:"80px",marginBottom:"1.2rem", marginTop:"1.2rem"}} onClick={() => setTab(2)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

      </div>
    </>
  );
};

export default CustomerContactDetail;