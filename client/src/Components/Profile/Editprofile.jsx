import React from "react";
import {useState, useEffect } from "react";
import profile0 from "../../images/profile.png"
import axios from "axios";
import { css, keyframes } from '@emotion/react'
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid"

const Editprofile = ({userid, renderprofileHandler}) => {

    const [loading, setLoading] = useState(false);

    const [username, setuserName] = useState("");
    const [userlinkedin, setUserlinkedin] = useState("");
    const [usertwitter, setUsertwitter] = useState("");
    const [userfacebook, setUserfacebook] = useState("");
    const [userinstagram, setUserinstagram] = useState("");
    const [image, setImage] = useState("");
    const [image1, setImage1] = useState("");

    let userObject;

    const [imageUpload, setImageUpload] = useState(null);

    const navigate = useNavigate();

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

    const updateuserprofile = (e) => {

        e.preventDefault();    
        
        if(imageUpload){
            const imageRef = ref(storage, `images/${imageUpload.name + v4() }`);
            uploadBytes(imageRef, imageUpload).then(response => {
                getDownloadURL(response.ref).then((url) => {
                    userObject = {
                        name: username,
                        linkedIn: userlinkedin,
                        twitter: usertwitter,
                        facebook: userfacebook,
                        instagram: userinstagram,
                        image: url
                    }

                    axios.put('http://localhost:3001/update-user/' + userid, userObject)
                    .then((res) => {
                    }).catch((error) => {
                    console.log(error)
                    })

                    renderprofileHandler(url)

                    navigate('/profile')

                })
            })
        }
        else{

            userObject = {
                name: username,
                linkedIn: userlinkedin,
                twitter: usertwitter,
                facebook: userfacebook,
                instagram: userinstagram
            }

            axios.put('http://localhost:3001/update-user/' + userid, userObject)
            .then((res) => {
            }).catch((error) => {
            console.log(error)
            })

            navigate('/profile')
        }

  
    }

    return(
        <>

            <div className="col-md-10" style={{width:"75%", height:"400px", border:"solid black 2px", marginTop:"30px", marginLeft:"50px", borderRadius:"20px", paddingTop:"50px"}} >

            {
                loading ? 
                (
                    <div className="row">
                        <div className="col-md-4 offset-4">
                            <Spinner/>
                        </div>
                    </div>
                )
                :
                (
                    <div className="row">

                        <div className="col-md-3" style={{marginTop:"60px"}}>
                            <div className="thumbnail">
                                <img src={ image } class="img-responsive rounded-circle center-block d-block mx-auto"  style={{width:"70%", border:"solid black 3px"}} />
                            </div>
                            
                            <div className="caption">
                                <input type="file" id="files" style={{display:"none"}} onChange={(e) => setImageUpload(e.target.files[0]) } />
                                <label htmlFor="files" className="camera"><i class="fa-solid fa-camera"></i></label> 
                            </div>
                        </div>
                        <div className="col-md-8 formprofile">
                            <form onSubmit={updateuserprofile}>

                                <input className="form-control" name="username" defaultValue={username} type="text" onChange={(e) => setuserName(e.target.value)} required style={{marginBottom:"20px"}} />

                                <input className="form-control" name="userlinkedin" defaultValue={userlinkedin} onChange={(e) => setUserlinkedin(e.target.value)} required style={{marginBottom:"20px"}} />

                                <input className="form-control" name="usertwitter" defaultValue={usertwitter} onChange={(e) => setUsertwitter(e.target.value)} required style={{marginBottom:"20px"}}/>

                                <input className="form-control" name="userfacebook" defaultValue={userfacebook} onChange={(e) => setUserfacebook(e.target.value)} required style={{marginBottom:"20px"}}/>

                                <input className="form-control" name="userinstagram" defaultValue={userinstagram} onChange={(e) => setUserinstagram(e.target.value)} required style={{marginBottom:"20px"}}/>

                                <button className="btn btn-dark w-100" type="submit">Update</button>

                            </form>
                        </div>

                    </div>
                )
            }

            </div>

        </>
    )
}

export default Editprofile;