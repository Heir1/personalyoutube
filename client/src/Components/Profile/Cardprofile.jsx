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
            <div className="col-md-10" style={{width:"75%", height:"500px", border:"solid black 2px", marginTop:"30px", marginLeft:"50px", borderRadius:"20px", paddingTop:"50px"}}>
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
                        <div className="row">

                            <div className="col-md-4 offset-5">

                                <img src={ image } className="profile1" />

                                <br />
                                <br />
                                
                            </div>

                            <div className="col-md-4 offset-4">
                            <h3>{username}</h3>
                            <NavLink to={"/profile/edit-user/"+userid} className="btn btn-default default" style={{border:"solid black 1px"}}>
                                Edit profile
                            </NavLink>
                            </div>

                            <br />

                            <div className="social-media">

                            <NavLink to={userlinkedin} target="_blank" className="btn btn-dark" style={{border:"solid black 1px"}}><i class="bi bi-linkedin" style={{marginRight:"20px"}}></i>Linked In account
                            </NavLink>

                            <NavLink to={usertwitter} className="btn btn-dark" style={{border:"solid black 1px"}}> <i class="bi bi-twitter" style={{marginRight:"20px"}}></i>Twitter account
                            </NavLink>

                            <NavLink to={userfacebook} className="btn btn-dark" style={{border:"solid black 1px"}}> <i class="bi bi-facebook" style={{marginRight:"20px"}}></i>Facebook account
                            </NavLink>

                            <NavLink to={userinstagram} className="btn btn-dark" style={{border:"solid black 1px"}}> <i class="bi bi-instagram" style={{marginRight:"20px"}}></i>Instagram account
                            </NavLink>

                            </div>

                        </div>
                    )
                }

            </div>
        </>
    )
}

export default Cardprofile;