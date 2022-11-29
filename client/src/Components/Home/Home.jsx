import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header'
import Siderbar from '../Siderbar/Siderbar'
import Homevideo from './Homevideo'
import {useParams} from 'react-router-dom'

const Home = () => {

  const {id} = useParams();  
  const [loading, setLoading] = useState(false)
  const [videoFilter, setVideoFilter] = useState("");
  const [videos, setVideos] = useState([]);
  

  useEffect(() => {

    setLoading(true);

    const fetchData = async () => {

      const results = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${id}&maxResults=20&order=date&type=video&key=AIzaSyDUeGQ6vAoOrjY6Q1HGVfnZ9CpZcvvxgt0`)


      setVideos(results.data.items)

      // console.log(results.data);
      setLoading(false);
      
    }

    fetchData()

  }, [])

  return (
    <React.Fragment>
        <Header setVideoFilter={setVideoFilter} />
        <div className="container-fluid">
            <div className="row">
                <Siderbar/>
                <Homevideo videoFilter={videoFilter} videos={videos} loading={loading} />
            </div>
        </div>   
    </React.Fragment>
  )
}

export default Home