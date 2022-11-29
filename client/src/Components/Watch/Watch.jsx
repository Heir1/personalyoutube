import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import Siderbar from '../Siderbar/Siderbar'
import Spinner from '../Spinner/Spinner';
import moment from 'moment';
import 'moment/locale/fr'
import numeral from 'numeral';


const Watch = () => {

    const {id} = useParams();
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState([])
    const navigate = useNavigate();
    moment.locale('fr')

    useEffect(() => {

        setLoading(true)

        const fetchData = async () => {
            const results = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=AIzaSyDUeGQ6vAoOrjY6Q1HGVfnZ9CpZcvvxgt0`)

            setDetails(results.data.items)
            setLoading(false)
        }

        fetchData();

    }, [])

    if(!localStorage.getItem('access_token')){
        navigate('/')
    }
    else{
        return (
            <React.Fragment>
                <Header/>
                <div className="container-fluid">
                    <div className="row">
                        <Siderbar/>
                        {
                            loading ? 
                            (
                                <div className="col-md-10 col-sm-10 col-xs-10" style={{marginTop:"50px"}}>
                                    <Spinner/>
                                </div>
                            )
                            :
                            (
                                <div className="col-md-10 col-sm-10 col-xs-10" style={{marginTop:"50px"}}>
                                    <div className="row">
                                        <div className="col-md-8 col-sm-8 col-xs-8 deskTop">
                                            <iframe className="embed-responsive-item videoLive" width="100%" height="450" src={`https://www.youtube.com/embed/${id}`} allowfullscreen></iframe>
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4">
                                            <div className='row'>
                                                <br/>
                                                {
                                                    details.map((detail, index) => (
                                                        <div key={index}>
                                                            <em>
                                                                <h6>Titre de la vidéo </h6>
                                                                <hr/>
                                                                <p> {detail.snippet.title} </p>
                                                                <h6>Durée de la vidéo</h6>
                                                                <hr/>
                                                                <p> {moment.utc((moment.duration(`${detail.contentDetails.duration}`).asSeconds())*1000).format("mm:ss")} </p>
                                                                <h6>Nom de la chaine</h6>
                                                                <hr/>
                                                                <p> {detail.snippet.channelTitle} </p>
                                                                <h6>Date de publication</h6>
                                                                <hr/>

                                                                <p> { moment(detail.snippet.publishedAt).fromNow()} </p>
                                                                <h6>Nombre de vues</h6>
                                                                <hr/>
                                                                <p> {numeral(detail.statistics.viewCount).format("0.a")} </p>
                                                            </em>
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                        </div>
                                        <div className="col-md-8 col-sm-8 col-xs-8 mobile videoLive">
                                            <iframe className="embed-responsive-item"   width="100%"  src={`https://www.youtube.com/embed/${id}`} allowfullscreen></iframe>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-8 col-sm-8 col-xs-8" style={{marginTop:"10px"}}>
                                            <div className='row'>
                                                {
                                                    // details.map((detail, index) => (
                                                    //     <div className='col-md-12 col-sm-12 col-xs-12' key={index}>
                                                    //         <img src={detail.snippet.thumbnails.high.url}  />
                                                    //     </div>
                                                    // ))
                                                }
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-12 col-sm-12 col-xs-12'>
                                                    <h5>Descriptions</h5>                                               
                                                    {
                                                        details.map((detail, index) => (
                                                            <p key={index} > <em>{ detail.snippet.description }</em>  </p>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }


                        
                    </div>
                </div>   
            </React.Fragment>
        )
    }
}

export default Watch