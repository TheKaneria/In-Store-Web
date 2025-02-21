import React, { useEffect, useState } from 'react'
import "./ForgotPassword.css"
import { HomeNavbar } from '../../common'
import { ACCEPT_HEADER, get_privacy_policy, password_reset } from '../../utils/Constant';
import axios from 'axios';
import images from '../../constants/images';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Notification from "../../utils/Notification";


const ForgotPassword = () => {

    const [getPrivacyPolicyData, setPrivacyPolicyData] = useState();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);

    let navigate = useNavigate();


    const regEx =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



    const forgotPasswordApi = async () => {
        if (email === "") {
            alert("Enter the Email......!");
            return;
        } else if (regEx.test(email) === false) {
            alert("Enter the valid Email....!");
            return;
        } else if (password === "") {
            alert("Enter the Password....!");
            return;
        } else if (confirmPassword === "") {
            alert("Enter the Confirm Password....!");
            return;
        } else if (password !== confirmPassword) {
            alert("Password & Conform Password are not same....!");
            return;
        } else {
            const formdata = await new FormData();
            await formdata.append("email", email);
            await formdata.append("password", password);
            await formdata.append("confirm_password", confirmPassword);
            setLoading(true);
            axios
                .post(password_reset, formdata, {
                    headers: {
                        Accept: "application/x.inapp.v1+json",
                    },
                })
                .then((res) => {
                    
                    if (res.data.success == 1) {
                        setPrivacyPolicyData(res.data.data);
                        Notification("success", "Success!", res.data.message);
                        setLoading(false);
                        navigate("/");
                    } else {
                        Notification("error", "Error!", res.data.message);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    console.log("error11",err);

                });
        }

    };

    //   useEffect(()=>{
    //     getPrivacyPolicyApi();
    //   },[])

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const togglePasswordVisibility2 = () => {
        setPasswordVisible2(!passwordVisible2);
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
                    <HomeNavbar />
                    <div className='forgot_pass_flex'>
                        {/* <Link to={"/"}>
              <img src={images.brandlogo} alt="logo" className="nav_logo" />
            </Link> */}
                        <h1 className='forgot_pass_head'>Reset your password here</h1>

                        <div className="mm_form_single_input mm_form_single_input_forgot_pass">
                            <label htmlFor="" style={{ minWidth: "130px" }}>
                                Email<span className="star_require">*</span>
                            </label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name=""
                                id=""
                                className="input_box"
                            />
                        </div>

                        <div className="mm_form_single_input mm_form_single_input_forgot_pass">
                            <label htmlFor="" style={{ minWidth: "130px" }}>
                                Password<span className="star_require">*</span>
                            </label>
                            <div
                                style={{
                                    background: "#DAD9D8",
                                    paddingTop: "0rem",
                                    paddingBottom: "0rem",
                                    paddingLeft: "0rem",
                                    paddingRight: "1rem",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                className="input_box-cus-pass"
                            >
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    name=""
                                    id=""
                                    className="input_box"
                                />

                                {passwordVisible === true ? (
                                    <AiOutlineEye size={22} onClick={togglePasswordVisibility}>
                                        {passwordVisible ? "Hide" : "Show"}
                                    </AiOutlineEye>
                                ) : (
                                    <AiOutlineEyeInvisible
                                        size={22}
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ? "Hide" : "Show"}
                                    </AiOutlineEyeInvisible>
                                )}
                            </div>
                        </div>

                        <div className="mm_form_single_input mm_form_single_input_forgot_pass">
                            <label htmlFor="" style={{ minWidth: "130px" }}>
                                Confirm  Password<span className="star_require">*</span>
                            </label>
                            <div
                                style={{
                                    background: "#DAD9D8",
                                    paddingTop: "0rem",
                                    paddingBottom: "0rem",
                                    paddingLeft: "0rem",
                                    paddingRight: "1rem",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                className="input_box-cus-pass"
                            >
                                <input
                                    type={passwordVisible2 ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    name=""
                                    id=""
                                    className="input_box"
                                />
                                {passwordVisible2 === true ? (
                                    <AiOutlineEye size={22} onClick={togglePasswordVisibility2}>
                                        {passwordVisible ? "Hide" : "Show"}
                                    </AiOutlineEye>
                                ) : (
                                    <AiOutlineEyeInvisible
                                        size={22}
                                        onClick={togglePasswordVisibility2}
                                    >
                                        {passwordVisible2 ? "Hide" : "Show"}
                                    </AiOutlineEyeInvisible>
                                )}
                            </div>
                        </div>
                        <div className="mm_form_single_input mm_form_single_input_forgot_pass mm_form_single_input_forgot_pass_btn">
                            <label htmlFor="" style={{ minWidth: "130px" }}>
                            </label>
                            <button className="btn btn-black forgot_pass_btn" style={{ marginTop: "2rem", maxWidth: "225px" }} onClick={() => { forgotPasswordApi() }}>Publish</button>

                        </div>
                    </div>
                </>)}
        </div>
    )
}

export default ForgotPassword