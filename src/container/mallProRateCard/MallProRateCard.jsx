import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import {
  ACCEPT_HEADER,
  dynamid_description,
  get_ratecard,
  rate_card_pdf_url,
} from "../../utils/Constant";
import axios from "axios";
import { MallHero } from "../../components";

const MallProRateCard = ({
  get_mall_auth_data,
  sidebaropen,
  setTab,
  gettab,
}) => {
  const [getProCard, SetProCard] = useState({});
  const [loading, setLoading] = useState(false);
  const [getrole, SetRole] = useState("");
  const [getMallDisclaimerData, setMallDisclaimerData] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    SetRole(role);

    getProductRatecardData();
    getMallDescliemerApi();
  }, []);

  const getProductRatecardData = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    setLoading(true);
    axios
      .get(get_ratecard, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success === 1) {
          setLoading(false);
          SetProCard(res.data.data);
          // Notification("success", "Success!", "Mall Registerated Successfully!");
        } else {
        }
      })
      .catch((err) => {
        console.log("err11", err);
        setLoading(false);
      });
  };


 const getMallDescliemerApi = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    setLoading(true);
    const formdata = await new FormData();
    await formdata.append("id",1);
    axios
      .post(dynamid_description,formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success === 1) {
          setLoading(false);
          setMallDisclaimerData(res.data.data);
          // Notification("success", "Success!", "Mall Registerated Successfully!");
        } else {
        }
      })
      .catch((err) => {
        console.log("err11", err);
        setLoading(false);
      });
  };

  const PdfDownload = async (id) => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    axios
      .get(rate_card_pdf_url + id, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success === 1) {
          window.open(res.data.data, "_blank");
        } else {
          null;
        }
      })
      .catch((err) => {
        console.log("errr", err);
      });
  };

  return (
    <div>
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
          <div className="">
            <MallHero get_mall_auth_data={get_mall_auth_data} />
          </div>
          {/* <CinemaHeroEdit
            get_mall_auth_data={get_mall_auth_data}
            sidebaropen={sidebaropen}
          /> */}
          <div
            className="CinemaProRateCard_content_main RetailerProRateCard_content_main"
          // style={{ marginLeft: "3rem" }}
          >
            {/* <CinemaNavigationBar
              title="Account Setting"
              setTabType={gettab === 21 ? "Product Rate Card" : ""}
            /> */}
            <div>
              <h3 className="h3" style={{ fontWeight: "600" }}>
                Rate Card: Choose your Product
              </h3>
            </div>
            <div>
              <p style={{ marginBottom: "1rem" }}>
               {getMallDisclaimerData?.rate_card}
              </p>
            </div>
            <div className="CinemaProRateCard_card_block_line_main">
              <div className="CinemaProRateCard_card_block_line_inner">
                <div>
                  <h5 className="h5">
                    <b className="">Analytics:</b>
                  </h5>
                </div>
                <div>
                  <div className="CinemaProRateCard_card_block_main RetailerProRateCard_card_block_main">
                    <div className="RetailerProRateCard_card_black_main">
                      {/* <div>
                        <b className="pro_card_head">Mall Analytics</b>
                        <br />
                        <b className="pro_card_head">Bundles</b>
                      </div> */}
                      <b>{getProCard && getProCard.title_analytics_bundles}</b>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <p
                          style={{ cursor: "pointer" }}
                          // onClick={() => setTab(44)}
                          className="pro_card_text">
                          R{getProCard && getProCard.analytics_bundles} per
                          month
                        </p>
                        <MdKeyboardArrowRight style={{ fontSize: "20px" }} />
                      </div>
                    </div>
                    <div
                      className="RetailerProRateCard_card_black_main RetailerProRateCard_card_black_main_display_none"
                      style={{ background: "#fff" }}>
                      <div>
                        <b className="pro_card_head"></b>
                        <br />
                        <b className="pro_card_head"></b>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {/* <p
                          style={{ cursor: "pointer" }}
                          // onClick={() => setTab(44)}
                          className="pro_card_text">
                          R{getProCard && getProCard.analytics_bundles} per
                          month
                        </p> */}
                        <MdKeyboardArrowRight style={{ fontSize: "20px" }} />
                      </div>
                    </div>

                    <div
                      className="RetailerProRateCard_card_black_main RetailerProRateCard_card_black_main_display_none cinema-pro-display-none"
                      style={{ background: "white" }}>
                      <div>
                        <b className="pro_card_head"></b>
                        <br />
                        <b className="pro_card_head"></b>
                      </div>
                      <div>
                        {/* <p>Movie Tiles</p> */}
                        {/* <p
                      className="pro_card_text"
                      style={{ display: "flex", alignItems: "center" }}>
                      R50 per unit, per week
                      <MdKeyboardArrowRight style={{ fontSize: "20px" }} />
                    </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* {getrole == 3 || getrole === "3" ? ( */}
            <div style={{ paddingTop: "2rem" }}>
              <div style={{ display: "flex", paddingBottom: "1rem" }}>
                <h6
                  className=""
                  style={{ color: "var(--color-orange)", fontWeight: "600" }}>
                  Terms and Conditions
                </h6>
                &nbsp; apply.
              </div>
              <button
                onClick={() => {
                  PdfDownload(3);
                }}
                className="btn btn-orange"
                style={{ width: "210px", fontSize: "16px" }}>
                Download Rate Card
              </button>
            </div>
            {/* ) : null} */}
          </div>
        </>
      )}
    </div>
  );
};

export default MallProRateCard;
