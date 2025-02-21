import React from 'react'
import "./CustomerProfile.css"
import images from '../../constants/images'
import { IoChevronBack } from 'react-icons/io5'
import { ACCEPT_HEADER, get_category } from '../../utils/Constant'
import axios from 'axios'
import { HiOutlineSearch } from 'react-icons/hi'

const CustomerProfile = ({ setTab,sidebaropen }) => {

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
            <div className="mallpp_main_wrapp">
            <div className='edit-brand-back-iconbox' style={{width:"80px"}} onClick={() => setTab(2)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

                <div className="mallpp_part1">
                    <h4 className="h4 cust-profile-heading">Welcome Jane!</h4>
                    <h5 className="h5 mb_10">
                        Let’s start by setting up your account profile:
                    </h5>

                    <ul>
                        <li className="mallpp_sigle_list">
                            Populate your profile with your details under
                            <button onClick={() => setTab(4)}>Account Settings</button>
                        </li>
                        <li className="mallpp_sigle_list">
                            <button onClick={() => setTab(3)}>Explore shopping malls</button>
                            across the whole of South Africa and nearest to you
                        </li>
                        <li className="mallpp_sigle_list">
                            Keep track of your favorite products under
                            <button onClick={() => setTab(3)}>my wishlist</button>
                        </li>
                    </ul>
                </div>

                {/* profile cards wrapp start */}
                <div className="mallpp_part2">
                    {/* single cards start */}
                    <div
                        className="mallpp_part2_card"
                        style={{
                            backgroundImage: `url(${images.home_card_bg_1})`,
                            backgroundPosition: "center",
                        }}
                    >
                        <h5 className="mallpp_part2_card_heading">100% Native</h5>
                        <p className="mallpp_part2_card_description">
                            In-store’s unique marketing adds respembles the experience of stores
                            in a mall
                        </p>
                    </div>
                    <div
                        className="mallpp_part2_card"
                        style={{
                            backgroundImage: `url(${images.home_card_bg_2})`,
                            backgroundPosition: "center",
                        }}
                    >
                        <h5 className="mallpp_part2_card_heading">Fulfillment</h5>
                        <p className="mallpp_part2_card_description">
                            One buying journey, multiple fulfillment options with preference for
                            In-store.
                        </p>
                    </div>
                    <div
                        className="mallpp_part2_card"
                        style={{
                            backgroundImage: `url(${images.home_card_bg_3})`,
                            backgroundPosition: "center",
                        }}
                    >
                        <h5 className="mallpp_part2_card_heading">Unified</h5>
                        <p className="mallpp_part2_card_description">
                            Unified channel for retail brands to bring together consumers,
                            marketing & products
                        </p>
                    </div>
                    <div
                        className="mallpp_part2_card"
                        style={{
                            backgroundImage: `url(${images.home_card_bg_2})`,
                            backgroundPosition: "center",
                        }}
                    >
                        <h5 className="mallpp_part2_card_heading">Personalised</h5>
                        <p className="mallpp_part2_card_description">
                            The In-store platform takes personalised content advertising to a
                            whole new level
                        </p>
                    </div>
                    <div
                        className="mallpp_part2_card"
                        style={{
                            backgroundImage: `url(${images.home_card_bg_3})`,
                            backgroundPosition: "center",
                        }}
                    >
                        <h5 className="mallpp_part2_card_heading">Intergrated Publishing</h5>
                        <p className="mallpp_part2_card_description">
                            Digital brand marketing/ advertising
                        </p>
                    </div>
                    <div
                        className="mallpp_part2_card"
                        style={{
                            backgroundImage: `url(${images.home_card_bg_1})`,
                            backgroundPosition: "center",
                        }}
                    >
                        <h5 className="mallpp_part2_card_heading">Simplified</h5>
                        <p className="mallpp_part2_card_description">
                            The In-store platform offers small business and enterprise solutions
                        </p>
                    </div>
                    {/* single cards end */}
                </div>
                {/* profile cards wrapp end */}
            </div>
        </>
    )
}

export default CustomerProfile