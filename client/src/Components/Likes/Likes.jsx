import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Header from '../Header/Header'
import Siderbar from '../Siderbar/Siderbar'
import Like from './Like'
import Spinner from '../Spinner/Spinner'
import { useNavigate } from 'react-router-dom'

const Likes = () => {

  const access_token = localStorage.getItem('access_token');
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false)
  const [videoFilter, setVideoFilter] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{

    setLoading(true)
    
    const fetchData = async () => {

      const results = await axios.get('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&myRating=like&key=AIzaSyDUeGQ6vAoOrjY6Q1HGVfnZ9CpZcvvxgt0',
          {
              headers : {authorization : `Bearer ${access_token}`}
          }
      )

      setLikes(results.data.items)
      // console.log(results.data.items);
      setLoading(false);

    }

    fetchData();

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
                  <Like videos={likes} videoFilter={videoFilter} loading={loading} />
              </div>
          </div>   
      </React.Fragment>
  )
  }


}

export default Likes