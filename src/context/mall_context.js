import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import mall_reducer from "../reducer/mall_reducer";

import {
  MALL_SIGNUP_BEGIN,
  MALL_SIGNUP_SUCCESS,
  MALL_SIGNUP_FAIL,
  SET_TOKEN,
  LOGOUT_USER,
  GET_MALL_BEGIN,
  GET_MALL_SUCCESS,
  GET_MALL_FAIL,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_MALL_WISE_STORE_BEGIN,
  GET_MALL_WISE_STORE_SUCCESS,
  GET_MALL_WISE_STORE_FAIL,
  UPDATE_MALL_BEGIN,
  UPDATE_MALL_SUCCESS,
  UPDATE_MALL_FAIL,
  GET_MALL_AUTH_BEGIN,
  GET_MALL_AUTH_SUCCESS,
  GET_MALL_AUTH_FAIL,
  UPDATE_MALL_STORE_BEGIN,
  UPDATE_MALL_STORE_SUCCESS,
  UPDATE_MALL_STORE_FAIL,
  UPDATE_EVENT_MALL_BEGIN,
  UPDATE_EVENT_MALL_SUCCESS,
  UPDATE_EVENT_MALL_FAIL,
  ADD_EVENT_MALL_SUCCESS,
  ADD_EVENT_MALL_FAIL,
  ADD_EVENT_MALL_BEGIN,
  GET_BRAND_BEGIN,
  GET_BRAND_SUCCESS,
  GET_BRAND_FAIL,
  ADD_MALL_STORE_BEGIN,
  ADD_MALL_STORE_SUCCESS,
  ADD_MALL_STORE_FAIL,
  UPDATE_EATERIES_MALL_BEGIN,
  UPDATE_EATERIES_MALL_SUCCESS,
  UPDATE_EATERIES_MALL_FAIL,
  DELETE_MALL_STORE_BEGIN,
  DELETE_MALL_STORE_SUCCESS,
  DELETE_MALL_STORE_FAIL,
  DELETE_MALL_EATERIES_BEGIN,
  DELETE_MALL_EATERIES_SUCCESS,
  DELETE_MALL_EATERIES_FAIL,
  DELETE_MALL_EVENT_BEGIN,
  DELETE_MALL_EVENT_SUCCESS,
  DELETE_MALL_EVENT_FAIL,
  GET_MALL_FACILITY_BEGIN,
  GET_MALL_FACILITY_SUCCESS,
  GET_MALL_FACILITY_ERROR,
  UPDATE_FACILITY_BEGIN,
  UPDATE_FACILITY_SUCCESS,
  UPDATE_FACILITY_FAIL,
  DELETE_FACILITY_BEGIN,
  DELETE_FACILITY_SUCCESS,
  DELETE_FACILITY_FAIL,
  UPDATE_MALL_CINEMA_FAIL,
  UPDATE_MALL_CINEMA_SUCCESS,
  UPDATE_MALL_CINEMA_BEGIN,
  GET_Mall_CART_ERROR,
  GET_MALL_CART_SUCCESS,
  GET_Mall_CART_BEGIN,
  GET_BRAND_MULTIPLE_BEGIN,
  GET_BRAND_MULTIPLE_SUCCESS,
  GET_BRAND_MULTIPLE_FAIL,
  STORE_VALUE,
} from "../Action";
import {
  ACCEPT_HEADER,
  delete_facility,
  get_brand,
  get_facility,
  get_facility_master,
  get_mall,
  get_mall_auth_wise,
  get_mall_cart,
  get_retailer_brand,
  get_store_mall_wise,
  login,
  mall_create_event,
  mall_create_store,
  mall_delete_eatery,
  mall_delete_event,
  mall_delete_store,
  mall_update_eatery,
  mall_update_event,
  mall_update_store,
  register,
  register_mall,
  retailer_brand_multiple,
  update_cinema_manual,
  update_facility,
  update_mall,
} from "../utils/Constant";
import { redirect } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";

const getisLogin = () => {
  let is_login = localStorage.getItem("is_login");
  if (is_login) {
    return JSON.parse(localStorage.getItem("is_login"));
  } else {
    return {};
  }
};

const getRole = () => {
  let role = localStorage.getItem("role");
  if (role) {
    return JSON.parse(localStorage.getItem("role"));
  } else {
    return {};
  }
};

const initialState = {
  is_login: getisLogin(),
  mall_signup_loading: false,
  get_mall_store_loading: false,
  login_loading: false,
  mall_signup_data: {},
  login_data: {},
  is_token: "",
  get_mall_loading: false,
  get_brand_loading: false,
  get_mall_auth_loading: false,
  get_mall_data: [],
  get_brand_data: [],
  get_brand_data_multiple: [],
  get_mall_store_data: [],
  get_mall_auth_data: {},
  add_event_loading: false,
  add_mall_loading: false,
  delete_mall_store_loading: false,
  update_eateries_loading: false,
  update_event_mall_loading: false,
  delete_event_mall_loading: false,
  facility_data_loading: false,
  get_facility_data: [],
  update_facility_loading: false,
  delete_facility_loading: false,
  get_mall_cart_data: [],
  get_mall_cart_data_count: '',
  get_mall_cart_loading: false,

  role: getRole(),
  first: '',
  last: ''


};

const MallContext = React.createContext();
export const MallProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mall_reducer, initialState);

  // register

  const setMallRegister = async (params, url) => {
    dispatch({ type: MALL_SIGNUP_BEGIN });
    try {
      const response = await axios.post(register_mall, params, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });
      const logindata = response.data;
      // ("====", response.data);
      if (logindata.success == 1) {
        dispatch({ type: MALL_SIGNUP_SUCCESS, payload: logindata });
        // localStorage.setItem("is_login", JSON.stringify(true));
      } else {
        alert(logindata.message);
      }
      return response.data;
    } catch (error) {
      dispatch({ type: MALL_SIGNUP_FAIL });
      ("mall-register error", error);
      console.log("login error", error);

      // localStorage.setItem("is_login", JSON.stringify(false));
    }
  };

  // login

  const setLogin = async (params, url) => {
    dispatch({ type: LOGIN_BEGIN });
    try {
      const response = await axios.post(login, params, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });
      const logindata = response.data;
      if (logindata.success == 1) {
        dispatch({ type: LOGIN_SUCCESS, payload: logindata });
        localStorage.setItem("is_login", JSON.stringify(true));
        localStorage.setItem("is_token", JSON.stringify(logindata.token));
        localStorage.setItem("role", JSON.stringify(logindata.user.role));
      } else {
        alert(logindata.message);
      }
      return response.data;
    } catch (error) {
      dispatch({ type: LOGIN_FAIL });
      localStorage.setItem("is_login", JSON.stringify(false));
      console.log("login error", error);
    }
  };

  // get mall

  const getMall = async () => {
    dispatch({ type: GET_MALL_BEGIN });
    try {
      const response = await axios.get(get_mall, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });
      const malldata = response.data;
      if (malldata.success == 1) {
        dispatch({ type: GET_MALL_SUCCESS, payload: malldata });
      }
      return response.data;
    } catch (error) {
      dispatch({ type: GET_MALL_FAIL });
      console.log("error11", error);
    }
  };
  // get mall cart

  const getMallCartApi = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    dispatch({ type: GET_Mall_CART_BEGIN });
    try {
      const response = await axios.get(get_mall_cart, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer" + token,
        },
      });
      const mallcartdata = response.data;
      if (mallcartdata.success == 1) {
        localStorage.setItem("mallcartcount", response.data.total_count);

        dispatch({ type: GET_MALL_CART_SUCCESS, payload: mallcartdata });
      }
      return response.data;
    } catch (error) {
      dispatch({ type: GET_Mall_CART_ERROR });
      console.log("error11", error);

    }
  };

  // get-brand api start

  const getBrand = async (id) => {
    var formdata = new FormData();
    formdata.append("retailer_id", id);
    dispatch({ type: GET_BRAND_BEGIN });
    try {
      const response = await axios.post(get_retailer_brand, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });
      const getbrand = response.data;
      if (getbrand.success == 1) {
        dispatch({ type: GET_BRAND_SUCCESS, payload: getbrand });
      }
      return response.data;
    } catch (error) {
      dispatch({ type: GET_BRAND_FAIL });
      console.log("error11", error);

    }
  };

  const getBrandMultiple = async (id) => {
    var formdata = new FormData();
    formdata.append("retailer_id", id);
    dispatch({ type: GET_BRAND_MULTIPLE_BEGIN });
    try {
      const response = await axios.post(retailer_brand_multiple, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });
      const getbrand = response.data;
      if (getbrand.success == 1) {
        dispatch({ type: GET_BRAND_MULTIPLE_SUCCESS, payload: getbrand });
      }
      return response.data;
    } catch (error) {
      dispatch({ type: GET_BRAND_MULTIPLE_FAIL });
      console.log("error11", error);

    }
  };

  // get-brand api end

  // get mall wise store

  const getMallWiseStore = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    dispatch({ type: GET_MALL_WISE_STORE_BEGIN });
    try {
      const response = await axios.get(get_store_mall_wise, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer" + token,
        },
      });
      const mallstoredata = response.data;
      if (mallstoredata.success == 1) {
        dispatch({ type: GET_MALL_WISE_STORE_SUCCESS, payload: mallstoredata });
      }
      if (
        mallstoredata.status === "Token is Expired" ||
        mallstoredata.status === "Token is Invalid" ||
        mallstoredata.status === "Authorization Token not found"
      ) {
        dispatch({ type: LOGOUT_USER });
        // window.location.reload();
        localStorage.setItem("is_login", false);
        localStorage.setItem("is_token", "");
        localStorage.clear();
        redirect("/");
      }
      return response.data;
    } catch (error) {
      dispatch({ type: GET_MALL_WISE_STORE_FAIL });
      console.log("error11", error);

    }
  };
  // get mall wise eateries

  const getMallWiseEateries = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    dispatch({ type: GET_MALL_WISE_STORE_BEGIN });
    try {
      const response = await axios.get(get_store_mall_wise, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer" + token,
        },
      });
      const mallstoredata = response.data;
      if (mallstoredata.success == 1) {
        dispatch({ type: GET_MALL_WISE_STORE_SUCCESS, payload: mallstoredata });
      }
      if (
        mallstoredata.status === "Token is Expired" ||
        mallstoredata.status === "Token is Invalid" ||
        mallstoredata.status === "Authorization Token not found"
      ) {
        dispatch({ type: LOGOUT_USER });
        // window.location.reload();
        localStorage.setItem("is_login", false);
        localStorage.setItem("is_token", "");
        localStorage.clear();
        redirect("/");
      }
      return response.data;
    } catch (error) {
      dispatch({ type: GET_MALL_WISE_STORE_FAIL });
      console.log("error11", error);

    }
  };

  // get mall auth wise

  const getMallAuthWise = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    dispatch({ type: GET_MALL_AUTH_BEGIN });
    try {
      const response = await axios.get(get_mall_auth_wise, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer" + token,
        },
      });
      const mallauthdata = response.data;
      if (mallauthdata.success == 1) {
        localStorage.setItem("mallmainname", response.data.data.name);
        localStorage.setItem("mallauthdatas", JSON.stringify(mallauthdata.data));
        dispatch({ type: GET_MALL_AUTH_SUCCESS, payload: mallauthdata });
      }
      if (
        mallauthdata.status === "Token is Expired" ||
        mallauthdata.status === "Token is Invalid" ||
        mallauthdata.status === "Authorization Token not found" ||
        token === null ||
        token === ""
      ) {
        dispatch({ type: LOGOUT_USER });
        localStorage.setItem("is_login", false);
        localStorage.setItem("is_token", JSON.stringify(""));
        localStorage.clear();
        redirect("/");
        // window.location.reload();
      }
      if (mallauthdata.data === undefined) {
      }

      return response.data;
    } catch (error) {
      console.log("error11", error);

      dispatch({ type: GET_MALL_AUTH_FAIL });
    }
  };

  // update mall

  const UpdateMall = async (formdata) => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    dispatch({ type: UPDATE_MALL_BEGIN });
    try {
      const response = await axios.post(update_mall, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer" + token,
        },
      });
      const updatemalldata = response.data;
      if (updatemalldata.success == 1) {
        dispatch({ type: UPDATE_MALL_SUCCESS, payload: updatemalldata });
        getMallAuthWise();
      }
      return response.data;
    } catch (error) {
      dispatch({ type: UPDATE_MALL_FAIL });
      console.log("error11", error);

    }
  };

  // Add mall store

  const AddMallStore = async (formdata) => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    dispatch({ type: ADD_MALL_STORE_BEGIN });
    try {
      const response = await axios.post(mall_create_store, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer" + token,
        },
      });
      const addmallstoredata = response.data;
      if (addmallstoredata.success == 1) {
        dispatch({
          type: ADD_MALL_STORE_SUCCESS,
          payload: addmallstoredata,
        });
      }
      return response.data;
    } catch (error) {
      dispatch({ type: ADD_MALL_STORE_FAIL });
      console.log("error11", error);

    }
  };

  // update mall store

  const UpdateMallStore = async (params) => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    dispatch({ type: UPDATE_MALL_STORE_BEGIN });
    try {
      const response = await axios.post(mall_update_store, params, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer" + token,
        },
      });
      const updatemallstoredata = response.data;
      if (updatemallstoredata.success == 1) {
        dispatch({
          type: UPDATE_MALL_STORE_SUCCESS,
          payload: updatemallstoredata,
        });
      }
      return response.data;
    } catch (error) {
      console.log("error11", error);

      dispatch({ type: UPDATE_MALL_STORE_FAIL });
    }
  };

  const UpdateCinemaStore = async (params) => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    dispatch({ type: UPDATE_MALL_CINEMA_BEGIN });
    try {
      const response = await axios.post(update_cinema_manual, params, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer" + token,
        },
      });
      const updatemallstoredata = response.data;
      if (updatemallstoredata.success == 1) {
        dispatch({
          type: UPDATE_MALL_CINEMA_SUCCESS,
          payload: updatemallstoredata,
        });
      }
      return response.data;
    } catch (error) {
      dispatch({ type: UPDATE_MALL_CINEMA_FAIL });
      console.log("error11", error);

    }
  };

  // Delete mall store

  const DeleteStoreApi = async (formdata) => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    dispatch({ type: DELETE_MALL_STORE_BEGIN });
    try {
      const response = await axios.post(mall_delete_store, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer" + token,
        },
      });
      const deletemallstoredata = response.data;
      if (deletemallstoredata.success == 1) {
        dispatch({
          type: DELETE_MALL_STORE_SUCCESS,
          payload: deletemallstoredata,
        });
      }
      return response.data;
    } catch (error) {
      dispatch({ type: DELETE_MALL_STORE_FAIL });
      console.log("error11", error);

    }
  };

  // Create event mall

  const AddEventMall = async (formdata) => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    dispatch({ type: ADD_EVENT_MALL_BEGIN });
    try {
      const response = await axios.post(mall_create_event, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer" + token,
        },
      });
      const mallcreateevent = response.data;
      if (mallcreateevent.success == 1) {
        dispatch({
          type: ADD_EVENT_MALL_SUCCESS,
          payload: mallcreateevent,
        });
      }
      return response.data;
    } catch (error) {
      dispatch({ type: ADD_EVENT_MALL_FAIL });
      console.log("error11", error);

    }
  };

  // Update event mall

  const UpdateEventMall = async (params) => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    dispatch({ type: UPDATE_EVENT_MALL_BEGIN });
    try {
      const response = await axios.post(mall_update_event, params, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer" + token,
        },
      });
      const updateeventmall = response.data;
      if (updateeventmall.success == 1) {
        dispatch({
          type: UPDATE_EVENT_MALL_SUCCESS,
          payload: updateeventmall,
        });
      }
      return response.data;
    } catch (error) {
      dispatch({ type: UPDATE_EVENT_MALL_FAIL });
      console.log("error11", error);

    }
  };

  // Update eateries mall

  const UpdateEateriesMall = async (formdata) => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    dispatch({ type: UPDATE_EATERIES_MALL_BEGIN });
    try {
      const response = await axios.post(mall_update_eatery, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer" + token,
        },
      });
      const updateeateriesmall = response.data;
      if (updateeateriesmall.success == 1) {
        dispatch({
          type: UPDATE_EATERIES_MALL_SUCCESS,
          payload: updateeateriesmall,
        });
      }
      return response.data;
    } catch (error) {
      dispatch({ type: UPDATE_EATERIES_MALL_FAIL });
      console.log("error11", error);
    }
  };

  // Delete Eateries Mall
  const DeleteEateriesApi = async (formdata) => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    dispatch({ type: DELETE_MALL_EATERIES_BEGIN });
    try {
      const response = await axios.post(mall_delete_eatery, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer" + token,
        },
      });
      const deletemalleateriesdata = response.data;
      if (deletemalleateriesdata.success == 1) {
        dispatch({
          type: DELETE_MALL_EATERIES_SUCCESS,
          payload: deletemalleateriesdata,
        });
      }
      return response.data;
    } catch (error) {
      dispatch({ type: DELETE_MALL_EATERIES_FAIL });
      console.log("error11", error);

    }
  };

  // Delete Event Mall
  const DeleteEventApi = async (formdata) => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    dispatch({ type: DELETE_MALL_EVENT_BEGIN });
    try {
      const response = await axios.post(mall_delete_event, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer" + token,
        },
      });
      const deletemalleventdata = response.data;
      // ("====", response.data);
      if (deletemalleventdata.success == 1) {
        dispatch({
          type: DELETE_MALL_EVENT_SUCCESS,
          payload: deletemalleventdata,
        });
      }
      return response.data;
    } catch (error) {
      dispatch({ type: DELETE_MALL_EVENT_FAIL });
      console.log("error11", error);

    }
  };

  // Facility Api

  const getFacilityApi = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    dispatch({ type: GET_MALL_FACILITY_BEGIN });
    try {
      const response = await axios.get(get_facility_master, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      });
      const getfacilitydata = response.data;
      if (getfacilitydata.success == 1) {
        dispatch({ type: GET_MALL_FACILITY_SUCCESS, payload: getfacilitydata });
      }
      return response.data;
    } catch (error) {
      dispatch({ type: GET_MALL_FACILITY_ERROR });
      console.log("error11", error);

    }
  };

  // Update Facility Api

  const UpdataFacilityApi = async (formdata) => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    dispatch({ type: UPDATE_FACILITY_BEGIN });
    try {
      const response = await axios.post(update_facility, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer" + token,
        },
      });
      const updatefacilitymall = response.data;
      // ("====", response.data);
      if (updatefacilitymall.success == 1) {
        dispatch({
          type: UPDATE_FACILITY_SUCCESS,
          payload: updatefacilitymall,
        });
      }
      return response.data;
    } catch (error) {
      dispatch({ type: UPDATE_FACILITY_FAIL });
      ("mall-facility error", error);
      console.log("error11", error);

    }
  };

  // Delete mall facility

  // Update Facility Api

  const DeleteFacilityApi = async (formdata) => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    dispatch({ type: DELETE_FACILITY_BEGIN });
    try {
      const response = await axios.post(delete_facility, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer" + token,
        },
      });
      const deletefacilitymall = response.data;
      // ("====", response.data);
      if (deletefacilitymall.success == 1) {
        dispatch({
          type: DELETE_FACILITY_SUCCESS,
          payload: deletefacilitymall,
        });
      }
      return response.data;
    } catch (error) {
      dispatch({ type: DELETE_FACILITY_FAIL });
      ("mall-facility error", error);
    }
  };

  const StoreValue = (fristmall, lastmall) => {

    dispatch({ type: STORE_VALUE, payload: { fristmall, lastmall } })
  }

  const logoutUser = (history) => {
    dispatch({ type: LOGOUT_USER });
    localStorage.setItem("is_login", false);
    localStorage.setItem("is_token", "");
    localStorage.clear();
    history("/");
    return "logout";
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    if (token) {
      dispatch({ type: SET_TOKEN, payload: token });
    }

    getMall();
    // getBrand();
    getMallWiseStore();
    getMallAuthWise();
    getFacilityApi();
    // getMallCartApi();
  }, []);

  return (
    <MallContext.Provider
      value={{
        ...state,
        setMallRegister,
        // setLogin,
        getBrandMultiple,
        logoutUser,
        getMall,
        getBrand,
        getMallWiseStore,
        getMallAuthWise,
        UpdateMall,
        UpdateMallStore,
        UpdateCinemaStore,
        AddEventMall,
        UpdateEventMall,
        AddMallStore,
        UpdateEateriesMall,
        DeleteStoreApi,
        DeleteEateriesApi,
        DeleteEventApi,
        getFacilityApi,
        UpdataFacilityApi,
        DeleteFacilityApi,
        getFacilityApi,
        getMallCartApi,
        StoreValue
      }}
    >
      {children}
    </MallContext.Provider>
  );
};

export const useMallContext = () => {
  return useContext(MallContext);
};
