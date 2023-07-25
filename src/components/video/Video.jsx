import React, { useEffect, useState } from "react";
import moment from 'moment';
import numeral from "numeral";
import "./_video.scss";

import { AiFillEye } from "react-icons/ai";
import request from "../../api";

function Video({ video }) {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);
  
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 100).format('mm:ss');

  //video duration jaise data k liye alag se extra call kar k render karenge. q ki response data is not consistance. so every time i have to take take it from fresh calls. this api call will give me more generic video detail->
  const _videoId = id?.videoId || id; //here if id is an object then grab its videoId property (which is valid for serach endpoint(specificly in CatagoryBar.jsx)) and if not an object then grab the id direct. (ye sahi na krte to ek uncaught error aa raha tha.)
  useEffect(() => {
    const get_video_details = async() => {
      const {data:{items}} = await request.get('/videos', {
        params: {        
          part: 'contentDetails,statistics', //dont need the snippits because it is already available.
          // id: id
          id: _videoId,
        },
      });
      // console.log(items);
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);


    }
    get_video_details();

  }, [_videoId]);

  //jo channel icon hai wo redux wale object me nahi aa raha hai to use alag se api call kar lana hoga.
  useEffect(() => {
    const get_channel_icon = async() => {
                                            //yaha url badal gaya hai.
      const {data:{items}} = await request.get('/channels', {
        params: {        
          part: 'snippet', //dont need the snippits because it is already available.
          id: channelId,
        },
      });
      // console.log(items);
      setChannelIcon(items[0].snippet.thumbnails.default)
    }
    get_channel_icon();

  }, [channelId]);
  return (
    <div className="video">
      <div className="video__top">
        <img src={medium.url} alt="" />
        <span>{_duration}</span>
      </div>

      <div className="video__title">
        {title}
      </div>

      <div className="video__details">
        <span>
          <AiFillEye /> {numeral(views).format('0.a')} Views •
        </span>
        <span>{moment(publishedAt).fromNow()}</span>
      </div>
      <div className="video__channel">
        <img
          src={channelIcon?.url}
          alt=""
        />
        <p>{channelTitle}</p>
      </div>
    </div>
  );
}

export default Video;
