import React, { useEffect, useState } from "react";
import "./MallAddMovie.css";
import { useMallContext } from "../../context/mall_context";
import { useMeventContext } from "../../context/mevent_context";
import { useDropzone } from "react-dropzone";
import { MallHero } from "../../components";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";
import Notification from "../../utils/Notification"

import {
    ACCEPT_HEADER,
    create_movie,
    get_age_restriction,
    get_genre,
} from "../../utils/Constant";
import { IoChevronBack } from "react-icons/io5";

const MallAddMvie = ({ get_mall_auth_data, setTab }) => {
    const { UpdateMallEvent, getMallEvent } = useMeventContext();
    const { UpdateEventMall } = useMallContext();

    const [files, setFiles] = useState([]);
    const regEx =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    const [terms_condition, setterms_condition] = useState("");
    const [agearray, SetAgeArray] = useState([]);
    const [genrearray, SetGenreArray] = useState([]);

    const [title, SetTitile] = useState("");
    const [selctage, SetSelctAge] = useState("");
    const [selctgenre, SetSelctGenre] = useState("");
    const [bookurl, SetBookUrl] = useState("");
    const [isAcceptTerm, setIsAcceptTerm] = useState(false);

    const handleTermChange = (event) => {
        setIsAcceptTerm((current) => !current);
    };
    const UpdateMallEventData = async () => { };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            ("acceptedFiles", acceptedFiles);
            {
                setFiles(
                    acceptedFiles.map((file) =>
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        })
                    )
                );
            }
            if (acceptedFiles.length === 0) {
                window.location.reload(true);
            }
        },
    });

    const thumbs = files.map((file) => (
        <img
            src={file.preview}
            style={{ width: "100%", height: "100%", maxHeight: "175px" }}
            className="img-fluid"
            alt="file"
        />
    ));

    useEffect(() => {
        getAge();
        getgenre();
    }, []);

    const createmovie = async () => {
        const token = JSON.parse(localStorage.getItem("is_token"));

        if (title == "" || title == undefined) {
            Notification("error", "Error", "Please Enter Movie Title");
            return;
        } else if (selctage == "" || selctage == undefined) {
            Notification("error", "Error", "Please Select Age");
            return;
        } else if (selctgenre == "" || selctgenre == undefined) {
            Notification("error", "Error", "Please Select Movie Genre");
            return;
        } else if (bookurl == "" || bookurl == undefined) {
            Notification("error", "Error", "Please Enter Booking URL");
            return;
        }
        else {
            const formdata = new FormData();
            await formdata.append("title", title);
            await formdata.append("age_restrict_id", selctage);
            await formdata.append("genre_id", selctgenre);
            await formdata.append("booking_url", bookurl);
            if (files[0] !== undefined) {
                await formdata.append("movie_image", files[0]);
            }
            await formdata.append("terms_condition", isAcceptTerm === true ? 1 : 0);

            axios
                .post(create_movie, formdata, {
                    headers: {
                        Accept: ACCEPT_HEADER,
                        Authorization: "Bearer " + token,
                    },
                })
                .then((res) => {
                    // ("create_movie", JSON.stringify(res.data, null, 2));
                    if (res.data.success == 1) {
                        Notification("success", "Success!", "Movie Added Successfully!");
                        setTab(17);
                    } else {
                        null;
                    }
                })
                .catch((err) => {
                    console.log("err11", err);
                });
        }

    };

    const getAge = async () => {
        const token = JSON.parse(localStorage.getItem("is_token"));

        axios
            .get(get_age_restriction, {
                headers: {
                    Accept: ACCEPT_HEADER,
                    Authorization: "Bearer " + token,
                },
            })
            .then((res) => {
                // ("ggg", JSON.stringify(res.data, null, 2));
                if (res.data.success == 1) {
                    SetAgeArray(res.data.data);
                } else {
                    null;
                }
            })
            .catch((err) => {
                console.log("err11", err);
            });
    };

    const getgenre = async () => {
        const token = JSON.parse(localStorage.getItem("is_token"));

        axios
            .get(get_genre, {
                headers: {
                    Accept: ACCEPT_HEADER,
                    Authorization: "Bearer " + token,
                },
            })
            .then((res) => {
                // ("ggg", JSON.stringify(res.data, null, 2));
                if (res.data.success == 1) {
                    SetGenreArray(res.data.data);
                } else {
                    null;
                }
            })
            .catch((err) => {
                console.log("err11", err);
            });
    };

    return (
        <>
            <MallHero get_mall_auth_data={get_mall_auth_data} />
            <div className="mm_main_wrapp">
                <div className='edit-brand-back-iconbox' onClick={() => setTab(17)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>
                {/* mall management name start */}
                <div className="mall_name_wrapp">
                    <p className="mall_name_heading">
                        {get_mall_auth_data.name && get_mall_auth_data.name}:
                    </p>
                    <span>Add Movie</span>
                </div>
                <div className="mm_horizontal_line"></div>
                {/* mall management name end */}

                {/* mall management form start */}
                <div className="mm_form_wrapp mm_form_wrapp_add_brand_mall">
                    {/* text-input wrapp start */}
                    <div className="mm_form_input_wrapp">
                        {/* single text-input */}
                        <div className="mm_form_single_input">
                            <label htmlFor="ename" style={{ minWidth: "135px" }}>
                                Movie Tttle
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => SetTitile(e.target.value)}
                                name="ename"
                                id=""
                                className="input_box"
                            />
                        </div>
                        {/* single text-input */}
                        <div className="mm_form_single_input">
                            <label
                                className="leaderboard-card-lbl"
                                style={{ minWidth: "135px" }}
                            >
                                Age restriction
                            </label>
                            <select
                                className="leaderboard-card-inp"
                                onChange={(e) => {
                                    SetSelctAge(e.target.value);
                                    (e.target.value);
                                }}
                            // onChange={(e) => SetRegionId(e.target.value)}
                            >
                                <option selected disabled value=""></option>
                                {agearray &&
                                    agearray.map((item, index) => {
                                        return (
                                            <>
                                                {/* <option selected disabled value=""></option> */}
                                                <option value={item.id} key={index}>
                                                    {item.name} &nbsp;&nbsp;&nbsp; {item.from_date}{" "}
                                                    &nbsp;&nbsp;&nbsp; {item.to_date}
                                                </option>
                                            </>
                                        );
                                    })}
                            </select>
                        </div>

                        <div className="mm_form_single_input">
                            <label
                                className="leaderboard-card-lbl"
                                style={{ minWidth: "135px" }}
                            >
                                Movie genre
                            </label>
                            <select
                                className="leaderboard-card-inp"
                                onChange={(e) => SetSelctGenre(e.target.value)}
                            >
                                <option selected disabled value=""></option>
                                {genrearray &&
                                    genrearray.map((item, index) => {
                                        return (
                                            <>
                                                {/* <option selected disabled value="">
                      Auto-fill from database
                    </option> */}
                                                <option value={item.id} key={index}>
                                                    {item.name} &nbsp;&nbsp;&nbsp; {item.from_date}{" "}
                                                    &nbsp;&nbsp;&nbsp; {item.to_date}
                                                </option>
                                            </>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="mm_form_single_input">
                            <label htmlFor="ename" style={{ minWidth: "135px" }}>
                                Booking URL
                            </label>
                            <input
                                type="text"
                                value={bookurl}
                                onChange={(e) => SetBookUrl(e.target.value)}
                                name="ename"
                                id=""
                                className="input_box"
                            />
                        </div>

                        {/*  terms condition start */}
                        <div className="mm_form_single_input mb_8">
                            <label htmlFor="" style={{ minWidth: "135px" }}></label>
                            <div className="signup_terms_wrapp indep-side">
                                <input
                                    type="checkbox"
                                    value={isAcceptTerm}
                                    onChange={handleTermChange}
                                    checked={isAcceptTerm}
                                />

                                <p className="fs-des">
                                    I have read and agree to the{" "}
                                    <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                                    <a className="signup_terms_link">Privacy Policy</a>
                                </p>
                            </div>
                        </div>
                        {/*  terms condition end */}

                        {/* upload btn start */}
                        {/* single text-input */}
                        <div className="mm_form_single_input brand-resp-btn">
                            <label htmlFor="" style={{ minWidth: "135px" }}></label>
                            <button
                                className="btn btn-orange btn-mall-movie "

                                onClick={() => createmovie()}
                            >
                                Upload
                            </button>
                        </div>
                        {/* upload btn end */}
                    </div>
                    {/* text-input wrapp end */}

                    {/* upload images wrapp start */}
                    <div className="mm_img_upload_wrapp">
                        {/* single upload image */}
                        <div className="myprofile_inner_sec2">
                            <h4 style={{ marginBottom: "10px" }} className="myprofile_upload_img_card_name">
                                Upload the movie poster <br />
                                (200 x 550 pixels)
                            </h4>
                            {files && files.length > 0 ? (
                                <div className="myprofile_inner_sec2_img_upload">{thumbs}</div>
                            ) : (
                                <div
                                    style={{ width: "100%" }}
                                    {...getRootProps({ className: "dropzone" })}
                                >
                                    <div className="myprofile_inner_sec2_img_upload">
                                        <AiOutlineCloudUpload
                                            style={{
                                                width: "60px",
                                                height: "60px",
                                                color: "var(--color-orange)",
                                                marginBottom: "10px",
                                            }}
                                        />
                                        <h4>.JPG .PNG</h4>
                                        <p>You can also upload file by</p>
                                        <input
                                            {...getInputProps()}
                                            accept="image/jpeg, image/jpg, image/png, image/eps"
                                            type="file"
                                            name="photos"
                                        />
                                        <button type="button" className="click_upload_btn" style={{ marginBottom: "10px" }}>
                                            click here
                                        </button>
                                        {/* <a href="">clicking here</a> */}
                                    </div>
                                    <div className="btnn-main">
                                        <button
                                            className="btn btn-orange mb_8"
                                            type="button"
                                            onClick={() => {
                                                // setFiles([]);
                                            }}
                                        >
                                            Upload File
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* <div className="myprofile_upload_img_btn_wrapp"> */}
                            <button className="btn btn-blue" onClick={() => setFiles([])}>
                                Cancel
                            </button>
                            {/* </div> */}
                        </div>
                    </div>
                    {/* upload images wrapp end */}
                </div>
                {/* mall management form end */}
                <div className="signup_terms_wrapp indep-side-show">
                    <input
                        type="checkbox"
                        value={isAcceptTerm}
                        onChange={handleTermChange}
                        checked={isAcceptTerm}
                    />

                    <p className="fs-des">
                        I have read and agree to the{" "}
                        <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                        <a className="signup_terms_link">Privacy Policy</a>
                    </p>
                </div>
                {/* text-area sec end */}
                <div className="mm_form_single_input brand-resp-show-btn">
                    <button
                        className="btn btn-orange"
                        onClick={() => createmovie()}
                        style={{ width: "25%" }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
};

export default MallAddMvie;