import React, { useEffect } from "react";
import "./_videoMetaData.scss";
import numeral from "numeral";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import ShowMoreText from "react-show-more-text";

import { MdThumbUp, MdThumbDown } from "react-icons/md";
import {
  checkSubscriptionStatus,
  getChannelDetails,
} from "../../redux/actions/channel.action";

const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
  const { channelId, channelTitle, description, title, publishedAt } = snippet;
  const { viewCount, likeCount } = statistics;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChannelDetails(channelId));
    dispatch(checkSubscriptionStatus(channelId));
  }, [dispatch, channelId]);

  const { snippet: channelSnippet, statistics: channelStatistics } =
    useSelector((state) => state.channelDetails.channel);

  const subscriptionStatus = useSelector(
    (state) => state.channelDetails.subscriptionStatus
  );

  return (
    <div className="videoMetaData py-2">
      {" "}
      {/*py-2 is bootstrap class, puts paddig top and bottom by 2 px*/}
      <div className="videoMetaData__top">
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {numeral(viewCount).format("0.a")} Views •
            {moment(publishedAt).fromNow()}
          </span>

          <div className="videoMetaData__top__likes">
            <span className="mr-3">
              <MdThumbUp size={26} />
              {numeral(likeCount).format("0.a")}
            </span>
            <span className="mr-3">
              <MdThumbDown size={26} />
              {/* {numeral(100000).format("0.a")} */}
              Dislike
            </span>
          </div>
        </div>
      </div>
      <div className="videoMetaData__channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="videoMetaData__channel__image d-flex">
          <img //this is channel image.
            src={channelSnippet?.thumbnails?.default?.url}
            alt=""
            className="rounded-circle mr-3"
          />
          <div className="d-flex flex-column">
            {" "}
            {/*this is for name of channel and number of subs.*/}
            <span>{channelTitle}</span>
            <span>
              {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
              Subscribers
            </span>
          </div>
        </div>

        <button
          className={`btn border-0 p-2 m-2 ${subscriptionStatus && "btn-gray"}`}
        >
          {subscriptionStatus ? "Subscribed" : "Subscribe"}
        </button>
      </div>
      <div className="videoMetaData__description">
        <ShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="showMoreText"
          expanded={false} //by defautl it should not be expanded.
        >
          {description}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetaData;
