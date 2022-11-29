import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import googlelogo from '../../images/googlologo.gif';
import youtubeani from '../../images/youtubeani.gif';
import './login.css';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {

    let client;
    const [access_token, setToken] = useState("");
    const [access_token1, setToken1] = useState("");
    const mounted = useRef();
  
    const navigate = useNavigate();
    const account = Array();
    const channels = Array();
  
    useEffect(()=>{
        client = google.accounts.oauth2.initTokenClient({
          client_id: '91619622787-8jf9i8aihflrj02etvssublqg6lb88go.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/youtube.readonly',
          callback: (tokenResponse) => {
            setToken(tokenResponse.access_token)
          },
        });
    }, [])

    function getToken(){
        setToken1(access_token)
        client.requestAccessToken();
    }

    useEffect(()=>{
        if(!mounted.current){
            mounted.current = true
        } 
        else{
            const fetchData = async () => {
              const results = await axios.get('https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=50&mine=true&key=AIzaSyDUeGQ6vAoOrjY6Q1HGVfnZ9CpZcvvxgt0',
                    {
                      headers : {authorization : `Bearer ${access_token}`}
                    }
              )
            
              // console.log(results);
    
              account.push(results.data.items[0].snippet.channelId)
              channels.push(results.data.items)
    
              localStorage.setItem('channels', JSON.stringify(channels));
              localStorage.setItem('account', JSON.stringify(account));
    
              // console.log(account);
              localStorage.setItem('access_token', JSON.stringify(access_token));
    
              navigate('/popularvideos');
            }
          fetchData();
        }   
      })

    return (
        <div className="container formCon" >
            <div className="youtuDiv" >
                <img src={youtubeani} className="youtuaniDim" />
            </div>
            <div className="signin">
                <div>
                    <img src={googlelogo} className="googleDim"/>
                </div>
                <div onClick={()=> getToken()}>
                Sign In
                </div>
        </div>
        <p className="paragraph" >
            Sign In with your google account to view a new youtube experience with this app 
        </p>
        </div>
    )
}

export default Login