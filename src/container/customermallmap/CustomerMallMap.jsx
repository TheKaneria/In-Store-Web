import React, { useEffect, useState } from 'react'
import "./CustomerMallMap.css"
import { BiArrowToBottom } from 'react-icons/bi'
import { CustomerHeroSecond } from '../../components'
import { IoChevronBack } from 'react-icons/io5'
import { ACCEPT_HEADER, get_category } from '../../utils/Constant'
import { HiOutlineSearch } from 'react-icons/hi'
import axios from 'axios'

const CustomerMallMap = ({ getsingalmalldata, setTab, sidebaropen, getmainmapmall,
  getmapurl, SetNavBarData,
  SetNavBarDataName,
  SetNavBarData1,
  respSearch,
  setResponSearch, }) => {

  const [isVisible, setIsVisible] = useState(false);

  const [getserach, setSerach] = useState("");

  const [catarray, SetArray] = useState([]);

  useEffect(() => {
    getcat();

  }, [])

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
  // ("map getsingalmalldata",getsingalmalldata)
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
      {getmainmapmall ? (
        <div>
          <CustomerHeroSecond
            getsingalmalldata={getmapurl ? getmapurl : getsingalmalldata}
            sidebaropen={sidebaropen}
          />
          <div
            className="edit-brand-back-iconbox"
            style={{ width: "80px", marginLeft: "2rem", marginTop: "2rem" }}
            onClick={() => setTab(2)}
          >
            <IoChevronBack className="edit-brand-back-icon" />{" "}
            <p className="edit-brand-back-txt">Back</p>
          </div>

          <div
            className="mm_main_wrapp resp_mallmap_padding mm_main_wrapp_22"
            style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
          >
            <div
              className="profile_head_center"
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                fontWeight: "700",
              }}
            >
              <h4
                className="h3"
                style={{ textTransform: "capitalize", fontWeight: "700" }}
              >
                {getmapurl?.name}
              </h4>
            </div>
            <div className="cus-mall-map">
              {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.80351149256!2d70.82129635!3d22.27348695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cdf0f%3A0x76dd15cfbe93ad3b!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1688451528241!5m2!1sen!2sin" width="600" height="550" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='cus-mall-map'></iframe> */}

              {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d32454475.15508195!2d26.937709!3d-6.802916438889372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc6750cf9544a5%3A0x1dc3860578bb4780!2sV%26A%20Waterfront!5e0!3m2!1sen!2sin!4v1691996831492!5m2!1sen!2sin" width="600" height="550" loading="lazy" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade" className='cus-mall-map'></iframe> */}
              {/* <script
                        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqlnZl8BTF1WN4KJmpZQRoxlGbbS3GWcQ&libraries=places"
                        defer
                    ></script> */}

              <iframe
                src={getmapurl?.map_url}
                width="600"
                height="550"
                loading="lazy"
                allowfullscreen=""
                referrerpolicy="no-referrer-when-downgrade"
                className="cus-mall-map"
              ></iframe>

              <div className="download-map-btn-part">
                <button className="download-map-btn">Download Map PDF</button>
                <BiArrowToBottom className="download-map-icon" />
              </div>
            </div>
          </div>

          {isVisible ? (
            <>
              <div
                className="edit-brand-back-iconbox"
                style={{
                  width: "80px",
                  marginLeft: "2rem",
                  marginBottom: "2rem",
                  marginTop: "2rem",
                }}
                onClick={() => setTab(2)}
              >
                <IoChevronBack className="edit-brand-back-icon" />{" "}
                <p className="edit-brand-back-txt">Back</p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div>
          <CustomerHeroSecond
            getsingalmalldata={getsingalmalldata}
            sidebaropen={sidebaropen}
          />
          <div
            className="edit-brand-back-iconbox"
            style={{ width: "80px", marginLeft: "2rem", marginTop: "2rem" }}
            onClick={() => setTab(2)}
          >
            <IoChevronBack className="edit-brand-back-icon" />{" "}
            <p className="edit-brand-back-txt">Back</p>
          </div>

          <div
            className="mm_main_wrapp resp_mallmap_padding mm_main_wrapp_22"
            style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
          >
            <div
              className="profile_head_center"
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                fontWeight: "700",
              }}
            >
              <h4
                className="h3"
                style={{ textTransform: "capitalize", fontWeight: "700" }}
              >
                {getsingalmalldata?.name}
              </h4>
            </div>
            <div className="cus-mall-map">
              {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.80351149256!2d70.82129635!3d22.27348695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cdf0f%3A0x76dd15cfbe93ad3b!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1688451528241!5m2!1sen!2sin" width="600" height="550" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='cus-mall-map'></iframe> */}

              {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d32454475.15508195!2d26.937709!3d-6.802916438889372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc6750cf9544a5%3A0x1dc3860578bb4780!2sV%26A%20Waterfront!5e0!3m2!1sen!2sin!4v1691996831492!5m2!1sen!2sin" width="600" height="550" loading="lazy" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade" className='cus-mall-map'></iframe> */}
              {/* <script
                        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqlnZl8BTF1WN4KJmpZQRoxlGbbS3GWcQ&libraries=places"
                        defer
                    ></script> */}

              <iframe
                src={getsingalmalldata?.map_url}
                width="600"
                height="550"
                loading="lazy"
                allowfullscreen=""
                referrerpolicy="no-referrer-when-downgrade"
                className="cus-mall-map"
              ></iframe>

              <div className="download-map-btn-part">
                <button className="download-map-btn">Download Map PDF</button>
                <BiArrowToBottom className="download-map-icon" />
              </div>
            </div>
          </div>

          {isVisible ? (
            <>
              <div
                className="edit-brand-back-iconbox"
                style={{
                  width: "80px",
                  marginLeft: "2rem",
                  marginBottom: "2rem",
                  marginTop: "2rem",
                }}
                onClick={() => setTab(2)}
              >
                <IoChevronBack className="edit-brand-back-icon" />{" "}
                <p className="edit-brand-back-txt">Back</p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  )
}

export default CustomerMallMap