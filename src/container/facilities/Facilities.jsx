import React, { useEffect, useState } from 'react'
import "./Facilities.css"
import { FacilityCard, MallHero } from '../../components';
import images from '../../constants/images';
import { useMallContext } from '../../context/mall_context';
import { Link } from 'react-router-dom';

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

const Facilities = ({ get_mall_auth_data, setTab, setfacility_id, getsinglefacilitydata, setsinglefacilitydata }) => {
  const { get_facility_data, getFacilityApi, facility_data_loading } = useMallContext();



  const [get_main_name, Set_Main_Name] = useState('')
  const [load, setLoad] = useState(false);


  useEffect(() => {
    getFacilityApi();
    const name = localStorage.getItem("mallmainname")

    Set_Main_Name(name)
  }, [])
  return (
    <>
      {facility_data_loading === true || load === true ? <>
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
      </> : <>
        <div className="">
          <MallHero get_mall_auth_data={get_mall_auth_data} />
        </div>

        <div className="mm_main_wrapp">
          <div className="mall_name_wrapp mall_name_wrapp_fac mall_mall_name_wrapp">
            <p className="mall_name_heading mall_mall_name_heading">{get_main_name}:</p>
            <span className='mall_mall_name_heading' style={{ fontWeight: "600" }}>Facilities</span>
          </div>
          {/* <div className="mm_horizontal_line"></div> */}
          <div className="" style={{ marginBottom: "2rem" }}></div>
          <div className="facilities_cards_wrapp">
            {get_facility_data && get_facility_data.map((item, index) => {
              return (
                <FacilityCard
                  key={item.id}
                  item={item}
                  setTab={setTab}
                  setfacility_id={setfacility_id}
                  getsinglefacilitydata={getsinglefacilitydata}
                  setsinglefacilitydata={setsinglefacilitydata}
                  load={load}
                  setLoad={setLoad}
                />
              );
            })}
          </div>
          {/* <Link
              to=""
              className="leaderboard-btn"
              style={{ justifyContent: "flex-end", fontWeight: "700" }}
              onClick={() => setTab(26)}
            >
              Add new facility{" "}
              <img src={images.add_new} className="leaderboard-btn-icon" />
            </Link> */}
        </div>
      </>}

    </>
  );
};

export default Facilities