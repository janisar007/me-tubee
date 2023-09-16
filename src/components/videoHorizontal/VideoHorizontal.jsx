import React from "react";
import "./_videoHorizontal.scss";

import moment from "moment";
import numeral from "numeral";
import { AiFillEye } from "react-icons/ai";
// import request from "../../api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import request from "../../api";
import { useNavigate } from "react-router-dom";

const VideoHorizontal = ({ video, searchScreen, subScreen }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { medium },
      resourceId,
    },
  } = video;

  const isVideo = !(id.kind === "youtube#channel" || subScreen); //else it will be 'youtube#channel'. coz we are only getting video and channel from the action.

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  //these use states are extra calls for getting timeduration channel icon and view coz from redux store we are not getting these->
  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request.get("/videos", {
        params: {
          part: "contentDetails,statistics", //dont need the snippits because it is already available.
          // id: id
          id: id.videoId,
        },
      });
      // console.log(items);
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    if (isVideo) get_video_details();
  }, [id, isVideo]);

  //jo channel icon hai wo redux wale object me nahi aa raha hai to use alag se api call kar lana hoga.
  useEffect(() => {
    const get_channel_icon = async () => {
      //yaha url badal gaya hai.
      const {
        data: { items },
      } = await request.get("/channels", {
        params: {
          part: "snippet", //dont need the snippits because it is already available.
          id: channelId,
        },
      });
      // console.log(items);
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    get_channel_icon();
  }, [channelId]);

  const navigate = useNavigate();

  const _channelId = resourceId?.channelId || channelId;

  const handleClick = () => {
    isVideo
      ? navigate(`/watch/${id.videoId}`)
      : // : navigate(`/channel/${id.channelId}`);
        navigate(`/channel/${_channelId}`);
  };

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 100).format("mm:ss");

  const thumbnail = !isVideo && "videoHorizontal__thumbnail-channel"; //jab isVideo false hoga to thumbnail me 'videoHorizontal__thumbnail-channel' naam ki class chali jaegi is class ko thumbnail wale me add kar. q ki !isVideo ka true hona mtlab ki ek channel aya hai aur uska thumbnail to rounded hoga aur ye ko class thumbnail me gayi hai usme rounded hone ka css likha hua hai.

  return (
    <Row
      className="videoHorizontal m-1 py-2 align-item-center"
      onClick={handleClick}
    >
      <Col
        xs={6}
        md={searchScreen || subScreen ? 4 : 6}
        className="videoHorizontal__left"
      >
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className={`videoHorizontal__thumbnail ${thumbnail}`}
          wrapperClassName="videoHorizontal__thumbnail-wrapper"
        />
        {isVideo && (
          <span className="videoHorizontal__duration">{_duration}</span>
        )}
      </Col>
      <Col
        xs={6}
        md={searchScreen || subScreen ? 8 : 6}
        className="videoHorizontal__right p-0"
      >
        <p className="videoHorizontal__title mb-1">{title}</p>

        {isVideo && (
          <div className="videoHorizontal__details">
            <AiFillEye /> {numeral(views).format("0.a")} Views •
            {moment(publishedAt).fromNow()}
          </div>
        )}

        {/* ye wala code searchscreen me jab video k sath sath channel render karana tha tab likha tha. */}
        {(searchScreen || subScreen) && (
          <p className="mt-1 videoHorizontal__desc">{description}</p>
        )}
        <div className="videoHorizontal__channel d-flex align-item-center my-1">
          {isVideo && <LazyLoadImage src={channelIcon?.url} effect="blur" />}
          <p className="mb-0">{channelTitle}</p>
        </div>
        {subScreen && (
          <p className="mt-2">{video.contentDetails.totalItemCount} Videos</p>
        )}
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
