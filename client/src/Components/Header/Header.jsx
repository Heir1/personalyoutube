import React, { useEffect, useState } from 'react'
import axios from 'axios';
import youtube from '../../images/youtube.png'
import profile0 from '../../images/profile.png'
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Header = ({setVideoFilter, setsearchvid, searchVid, photo}) => {

    const [profile, setProfile] = useState("");
    const [searchChannel, setSearchannel] = useState("");
    const navigate = useNavigate();
    let account;

    const [searchedVideo, setSearchedvideo] = useState([]);
    const [loading1, setLoading1] = useState(false);

    const searchVideoHandler = async (e) => {
        setLoading1(true)
        e.preventDefault();

        const search = document.getElementById('search').value

        if(search.trim().length===0) return alert("Veuillez saisir le nom de la vidéo que vous recherchez")

        const results = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&type=video&q=${search}&safeSearch=none&key=AIzaSyDUeGQ6vAoOrjY6Q1HGVfnZ9CpZcvvxgt0`)

        setSearchedvideo(results.data.items)
        // console.log(results.data.items);
        localStorage.setItem('searchvideo', search)
        setLoading1(false);
        navigate('/searchedvideo')
    }

    const notification = () => {
        navigate('/notifications')
    }
  
    // console.log(JSON.parse(localStorage.getItem("account"))[0]);
    account = JSON.parse(localStorage.getItem("account"))[0];
  
    // console.log(localStorage.getItem("profile"));

    useEffect(()=>{
        if (!localStorage.getItem('profile')){
        // } else {      
            const fetchData = () => {
                fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails&id=${account}&key=AIzaSyAxpjZGN2NGfGfa3djYxcOt7Mx6GOq4quU`)
                .then(res => res.json())
                .then(data => {

                    let channelId = data.items[0].id;
                    localStorage.setItem('channelId',channelId)
                    
                    // Get Single Student
                    axios.get(`http://localhost:3001/find-user?channelid=${channelId}`)
                    .then(res => {
                        
                        if(res.data[0]){
                            setProfile(res.data[0].image)
                            localStorage.setItem("userid", res.data[0]._id)
                        }
                        else{
                            // si non on lui crée un compte par défaut

                            localStorage.setItem("profile", JSON.stringify(data.items[0].snippet.thumbnails.high.url));


                            const userObject = {
                                name : data.items[0].snippet.title, 
                                channelid: channelId,
                                image: JSON.parse(localStorage.getItem('profile')) 
                            };

                            axios.post('http://localhost:3001/saveUser', userObject).then(res => {
                                // console.log(res.data);
                                // localStorage.setItem("userProfile", res.data);
                                localStorage.setItem("userid", res.data._id)
                            });

                            setProfile(JSON.stringify(data.items[0].snippet.thumbnails.high.url))



                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                })
            }
            fetchData();
        }
    
      }, [])

    useEffect(()=>{})

  return (
    <React.Fragment>
        
        <div className="container-fluid headerStyle">
            <div className="row headerStyle1">
                <div className="col-md-3 col-sm-3 col-xs-3">
                    <div className="row">
                        <div className="col-md-1 col-sm-1 col-xs-1 deskTop">
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-4">
                            <img src={youtube} alt="" className="logo"/>
                        </div>
                    </div>   
                </div>
                <div className="col-md-6 col-sm-6 col-xs-6">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <form class="example">
                                <input type="text" id='search' placeholder="Search.." /> 
                                <button class="btn btn-danger" onClick={searchVideoHandler}><i class="fa fa-search"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-3">
                    <div className="row">
                        <div className="col-md-4 col-sm-4 col-xs-4 deskTop">
                            
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-4 deskTop">
                            <button className='notificationsign' onClick={notification} >2</button>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-4">
                            <img src={ photo ? photo : profile ? profile : localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : profile0} className="profile" />
                        </div>
                    </div>   
                </div>
            </div>
        </div>

    </React.Fragment>
  )
}

export default Header