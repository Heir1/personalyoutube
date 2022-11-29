import React, { useState, useEffect }from "react";
import profile0 from '../../images/profile.png';
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner/Spinner";


const Cardprofile = () => {

    const userid = localStorage.getItem('userid');

    const [loading, setLoading] = useState(false);

    const [username, setuserName] = useState("");
    const [userlinkedin, setUserlinkedin] = useState("");
    const [usertwitter, setUsertwitter] = useState("");
    const [userfacebook, setUserfacebook] = useState("");
    const [userinstagram, setUserinstagram] = useState("");
    const [image, setImage] = useState("");
    
    useEffect(() => {

        setLoading(true)

        const getUser = async() => {

            await axios.get('http://localhost:3001/user-edit/' + userid)
            .then(res => {
                setuserName(res.data.name);
                setUserlinkedin(res.data.linkedIn);
                setUsertwitter(res.data.twitter);
                setUserfacebook(res.data.facebook);
                setUserinstagram(res.data.instagram);
                setImage(res.data.image)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
            })

        }

        getUser()

    }, [])

    return(
        <>
            <div className="col-md-10 col-sm-10 col-xs-10" style={{marginTop: "60px"}}>
                {
                    loading ? (

                        <div className="row">
                            <div className="col-md-4 offset-4">
                                <Spinner/>
                            </div>
                        </div>

                    )
                    :
                    (
                        <>
                            <div className="row">
                                <div className="col-md-4 offset-4">
                                    <div className="thumbnail">
                                        <img src={image} alt="Lights" class="img-responsive center-block d-block mx-auto profile1"  style={{width:"50%"}}/>
                                    </div>
                                    <div className="caption" style={{marginTop:"20px"}}>
                                        <h4>{username}</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="row" style={{marginTop:"20px"}}>
                                <div className="col-md-4 offset-4">
                                    <NavLink to={"/profile/edit-user/"+userid} className="btn btn-default editbutton w-100" style={{border:"solid black 1px"}}>
                                        Edit profile
                                    </NavLink>
                                </div>
                            </div>

                            <div className="row" style={{marginTop:"30px"}}>

                                <div className="col-md-2 offset-2">
                                    <NavLink to={userlinkedin} target="_blank" className="btn btn-dark w-100" style={{border:"solid black 1px"}}><i class="bi bi-linkedin"></i>Linked In
                                    </NavLink>
                                </div>

                                <div className="col-md-2">

                                    <NavLink to={usertwitter} className="btn btn-dark w-100" style={{border:"solid black 1px"}}> <i class="bi bi-twitter"></i>Twitter
                                    </NavLink>
                                </div>

                                <div className="col-md-2">
                                    <NavLink to={userfacebook} className="btn btn-dark w-100" style={{border:"solid black 1px"}}> <i class="bi bi-facebook"></i>Facebook
                                    </NavLink>
                                </div>

                                <div className="col-md-2">
                                    <NavLink to={userinstagram} className="btn btn-dark w-100" style={{border:"solid black 1px"}}> <i class="bi bi-instagram"></i>Instagram
                                    </NavLink>

                                </div>

                            </div>
                        </>
                    )
                }

            </div>
        </>
    )
}

export default Cardprofile;