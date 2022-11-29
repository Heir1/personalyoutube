import React, { useState } from 'react'
import Spinner from '../Spinner/Spinner'
import { NavLink, useNavigate } from 'react-router-dom'
import Filter from '../Filtervideo/Filter'
import moment from 'moment';
import 'moment/locale/fr'
import numeral from 'numeral';


const Popularvideo = ({videos, loading, setVideos1}) => {

    moment.locale('fr')
    const [videoFilter, setvideoFilter] = useState("")
    const navigate = useNavigate();



    if(!localStorage.getItem('access_token')){
        navigate('/')
    }
    else{

        return (
            <div className="col-md-10 col-sm-10 col-xs-10" style={{marginTop: "70px"}}>
                <div className='row' style={{marginBottom: "20px"}}>
                    <div className={`col-md-6 col-sm-6 col-xs-6 offset-3 deskTop`}>
                        <Filter setvideoFilter={setvideoFilter} />
                    </div>
                    <div className={`col-md-6 col-sm-6 col-xs-6 mobile`}>
                        <Filter setvideoFilter={setvideoFilter} />
                    </div>
                </div>
    
                {
    
                    (
                    
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
                                            <NavLink to={video.id} style={{textDecoration : "none", color : "black"}}>
                                                <div className="thumbnail">
                                                    <img src={video.snippet.thumbnails.high.url} alt="Lights" style={{width:"100%"}} className="videoImage"/>
                                                    <div className="caption">
                                                        <p>Titre : <em>{video.snippet.title.length > 35 ? `${video.snippet.title.substring(0,35)}...` : video.snippet.title}</em> // Durée : <em> {moment.utc((moment.duration(`${video.contentDetails.duration}`).asSeconds())*1000).format("mm:ss")}  </em> // Chaine : <em> {video.snippet.channelTitle}  </em> // Vues : <em> {numeral(video.statistics.viewCount).format("0.a")}  </em> // Publiée : <em> { moment(video.snippet.publishedAt).fromNow()}  </em> </p>
                                                    </div>
                                                </div>
                                            </NavLink>
                                        </div>   
                                    ))
                                }
                            </div>
                        )
        
                    )
                    
                }
                
    
            </div>
        )
    }
} 

export default Popularvideo;