import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header'
import Siderbar from '../Siderbar/Siderbar'
import Popularvideo from './Popularvideo';
import { Navigate, useNavigate } from 'react-router-dom';

const Popular = () => {
  
  const [loading, setLoading] = useState(false)
  const [videoFilter, setVideoFilter] = useState("");
  const [videos, setVideos] = useState([]);
  const [videos1, setVideos1] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    setLoading(true);

    const fetchData = async () => {
        
      const results = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=FR&maxResults=20&key=AIzaSyDUeGQ6vAoOrjY6Q1HGVfnZ9CpZcvvxgt0`)


      setVideos(results.data.items)

      setLoading(false);
      
    }

    fetchData()

  }, [])
  
  if(!localStorage.getItem('access_token')){
    navigate('/')
  }

  else{
    return (
      <React.Fragment>
          <Header setVideoFilter={setVideoFilter} />
          <div className="container-fluid">
              <div className="row">
                  <Siderbar/>
                  <Popularvideo videoFilter={videoFilter} videos={!videos1 ? videos1 : videos} loading={loading} setVideos1={setVideos1}/>
              </div>
          </div>   
      </React.Fragment>
    )
  }
}
  
  

export default Popular