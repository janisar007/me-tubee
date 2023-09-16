import React, { useEffect } from "react";
import "./_watchScreen.scss";
import { Col, Row } from "react-bootstrap";
import VideoMetaData from "../../components/videoMetaData/VideoMetaData";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import Comments from "../../components/comments/Comments";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  // getRelatedVideos,
  getVideoById,
} from "../../redux/actions/videos.action";

const WatchScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoById(id));

    // dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  const { video, loading } = useSelector((state) => state.selectedVideo);

  return (
    <Row>
      <Col lg={8}>
        {" "}
        {/*8 grid is for large screen for left section*/}
        <div className="watchScreen__player">
          <iframe
            // src="https://www.youtube.com/embed/tgbNymZ7vqY" /*this url is a yt iframe url that is cppied from a website named w3school.*/
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={video?.snippet?.title}
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>{" "}
        </div>
        {/*ab is iframe me video ka meta data aega. jiske liye components me ek videoMetaData name ka ek folder banaya hai. ->*/}
        {/* ye metaData tabhi render karana hai jab hamara video load ho chuka ho yani jab  loading false ho gaya hai */}
        {/* <VideoMetaData /> */}
        {!loading ? (
          <VideoMetaData video={video} videoId={id} />
        ) : (
          <h6>Loading...</h6>
        )}
        <Comments
          videoId={id}
          totalComments={video?.statistics?.commentCount}
        />
      </Col>

      {/* <Col lg={4}> */}
      {/*this col is for right section*/}
      {/* {[...Array(10)].map(() => ( */}
      {/* // <VideoHorizontal /> */}
      {/* // ))} */}
      {/* </Col> */}

      {/*this colomn is for left related videos*/}
    </Row>
  );
};

export default WatchScreen;
