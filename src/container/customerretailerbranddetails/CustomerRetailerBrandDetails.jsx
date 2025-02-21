import React, { useEffect, useState } from 'react'
import "./CustomerRetailerBrandDetails.css"
import { CustomerBrandDetailsComponent, CustomerHero } from '../../components'
import { IoChevronBack } from 'react-icons/io5'
import { HiOutlineSearch } from 'react-icons/hi'
import { ACCEPT_HEADER, get_category } from '../../utils/Constant'
import axios from 'axios'

const CustomerRetailerBrandDetails = ({getsingalmalldata, getbdetalis, getbdetalis2, setTab, setBDetalis ,setcheckID,SetNavBarData,
    SetNavBarDataName,
    SetNavBarData1,
    respSearch,
    setResponSearch,  }) => {

    // console.log("getbdetalis2",getbdetalis2);
    
  const [getIdTrue, setIdTrue] = useState(2);

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
        <div className="mall_nearme_brand_main_wrapp">
            {/* <div style={{ margin: "2rem" }}> */}


            <CustomerHero getsingalmalldata={getsingalmalldata} getbdetalis={getbdetalis2} />
            <div className="mm_main_wrapp mm_main_wrapp_22" style={{ marginBottom: "40px" }}>
                <div className='edit-brand-back-iconbox' onClick={() => setTab(26)}><IoChevronBack className='edit-brand-back-icon' /> 
                <p className='edit-brand-back-txt'>Back</p></div>

                {/* heading */}
                <div
                    className="profile_head_center customer-brand-details-head"
                    style={{
                        marginTop: "20px",
                        alignItems: "start",
                        justifyContent: "start",
                    }}
                >
                    {/* <h4 className="h3" style={{ textTransform: "capitalize" }}>{getsingalmalldata.name}</h4> &nbsp;&nbsp; <span className="h3">Eateries</span> */}
                    <h4
                        className="h3"
                        style={{ textTransform: "capitalize", textAlign: "initial",fontWeight:"700" }}
                    >
                        {getbdetalis2.name} - {getsingalmalldata.name}
                    </h4>
                    {/* &nbsp;&nbsp; <span className="h3">Brand</span> */}
                </div>
                <CustomerBrandDetailsComponent getbdetalis={getbdetalis2} setTab={setTab} getIdTrue={2} setcheckID={setcheckID} />
                <div className='edit-brand-back-iconbox' onClick={() => setTab(26)} style={{marginTop:"2rem"}}><IoChevronBack className='edit-brand-back-icon' /> 
                <p className='edit-brand-back-txt'>Back</p></div>
                </div>
                </div>  
    </div>
  )
}

export default CustomerRetailerBrandDetails