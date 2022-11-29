import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Siderbar from '../Siderbar/Siderbar';
import Header from '../Header/Header';
import Searchedvideo from './Searchedvideo';


const Search = () => {

    // alert(localStorage.getItem('searchvideo'))

    const [searchedVideo, setSearchedvideo] = useState([]);
    const [loading, setLoading] = useState(false)
    const [videoFilter, setVideoFilter] = useState("");
    // const [searchVid, setsearchvid] = useState("")

    let search = localStorage.getItem('searchvideo');
    // console.log(search);

    useEffect(() => {

        setLoading(true)
        const fetchData = async () => {
            const results = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&type=video&q=${search}&safeSearch=none&key=AIzaSyDUeGQ6vAoOrjY6Q1HGVfnZ9CpZcvvxgt0`)

            setSearchedvideo(results.data.items)

            // console.log(results.data.items);
            setLoading(false)
        }

        fetchData();

    }, [])

    useEffect(()=>{

    }, [])

    return (
        <React.Fragment>
            <Header setVideoFilter={setVideoFilter} />
            <div className="container-fluid">
                <div className="row">
                    <Siderbar/>
                    <Searchedvideo videoFilter={videoFilter} videos={searchedVideo} loading={loading} />
                </div>
            </div>   
        </React.Fragment>
    )
}

export default Search