import React from 'react'
import Spinner from '../Spinner/Spinner';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr'
import numeral from 'numeral';

const Searchedvideo = ({videos, loading, videoFilter}) => {
    // console.log(videos);
  return (
    <div className="col-md-10 col-sm-10 col-xs-10" style={{marginTop: "50px"}}>
    {
        loading ? (
            <Spinner/>
        )
        :
        (
            <div className="row">
                {
                    videos.filter(videoTitle => {
                    if((videoTitle.snippet.title.toLowerCase()).includes((videoFilter.toLowerCase()).trim())){
                    return videoTitle
                    }
                    }).map((video, index) => (
                        <div className="col-md-3 col-sm-4" key={index}>
                            <NavLink to={video.id.videoId} style={{textDecoration : "none", color : "black"}}>
                                <div className="thumbnail">
                                    <img src={video.snippet.thumbnails.high.url} alt="Lights" style={{width:"100%"}} className="videoImage"/>
                                    <div className="caption">
                                    <p>Titre : <em>{video.snippet.title.length > 35 ? `${video.snippet.title.substring(0,35)}...` : video.snippet.title}</em> // Chaine : <em> {video.snippet.channelTitle}  </em> // Publiée : <em> { moment(video.snippet.publishedAt).fromNow()}  </em> </p>
                                </div>
                                </div>
                            </NavLink>
                        </div>   
                    ))
                }
            </div>
        )
    }
    

</div>
  )
}

export default Searchedvideo