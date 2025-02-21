import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CustomerMallEateries, MallNearMeBrands } from '../container';

const SidebarWithTabs = ({ getsingalmalldata, setBDetalis, setEDetalis }) => {

  // useEffect(()=>{
  //   history.pushState(null, null, location.href);
  // window.onpopstate = function () {
  //   history.go(1);
  // };
  // },[])

  const navigate = useNavigate();
  const location = useLocation();

  const [gettab, setTab] = useState(3); // Default tab is 'Brands'
  const [sidebaropen, setSidebarOpen] = useState(true); // Assume this state controls sidebar visibility

  // Handle tab click and update history state
  const handleTabClick = (tab) => {
    setTab(tab);
    navigate('.', { state: { activeTab: tab } }); // Push tab state into the history
  };

  // Restore the active tab from the history when the component mounts
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setTab(location.state.activeTab); // Restore from history state
    }
  }, [location]);

  return (
    <div>
      <button
        style={{
          background: gettab === 2 || gettab === 12 ? "#ff8b00" : "#fff",
          fontWeight: gettab === 2 || gettab === 12 ? "700" : "500",
          width: sidebaropen ? "100%" : "0px",
          color: gettab === 2 || gettab === 12 ? "#fff" : "#000",
          overflow: "hidden",
          transition: "width 1s ease",
          whiteSpace: "nowrap",
        }}
        onClick={() => handleTabClick(2)}
        className="profile_sidebar_sig_btn customer_sidebar_sing_btn"
      >
        &nbsp;&nbsp;&nbsp; Promotions
      </button>

      <button
        style={{
          background: gettab === 3 || gettab === 26 || gettab === 36 ? "#ff8b00" : "#fff",
          fontWeight: gettab === 3 || gettab === 26 || gettab === 36 ? "700" : "500",
          width: sidebaropen ? "100%" : "0px",
          color: gettab === 3 || gettab === 26 || gettab === 36 ? "#fff" : "#000",
          overflow: "hidden",
          transition: "width 1s ease",
          whiteSpace: "nowrap",
        }}
        onClick={() => handleTabClick(3)}
        className="profile_sidebar_sig_btn customer_sidebar_sing_btn"
      >
        &nbsp;&nbsp;&nbsp; Brands
      </button>

      <button
        style={{
          background: gettab === 4 || gettab === 27 || gettab === 39 ? "#ff8b00" : "#fff",
          fontWeight: gettab === 4 || gettab === 27 || gettab === 39 ? "700" : "500",
          width: sidebaropen ? "100%" : "0px",
          overflow: "hidden",
          color: gettab === 4 || gettab === 27 || gettab === 39 ? "#fff" : "#000",
          transition: "width 1s ease",
          whiteSpace: "nowrap",
        }}
        onClick={() => handleTabClick(4)}
        className="profile_sidebar_sig_btn customer_sidebar_sing_btn"
      >
        &nbsp;&nbsp;&nbsp; Eateries
      </button>

      <button
        style={{
          background: gettab === 28 ? "#ff8b00" : "#fff",
          fontWeight: gettab === 28 ? "700" : "500",
          width: sidebaropen ? "100%" : "0px",
          color: gettab === 28 ? "#fff" : "#000",
          overflow: "hidden",
          transition: "width 1s ease",
          whiteSpace: "nowrap",
        }}
        onClick={() => handleTabClick(28)}
        className="profile_sidebar_sig_btn customer_sidebar_sing_btn"
      >
        &nbsp;&nbsp;&nbsp; Cinema
      </button>

      {/* Conditional Tab Content */}
      {gettab === 3 && (
       
        <h1>tab 3</h1>
      )}
      {gettab === 4 && (
        <h1>tab 4</h1>
      )}
      {/* Add additional tab content here */}
    </div>
  );
};

export default SidebarWithTabs;
