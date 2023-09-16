import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import CatagoriesBar from "../../components/catagoriesbar/CatagoriesBar";
import Video from "../../components/video/Video";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularVideos,
  getVideosByCatagory,
} from "../../redux/actions/videos.action";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";

function HomeScreen() {
  const dispatch = useDispatch();
  //i shuold fire this when ever component is mount->
  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  //first i have to read the pupular videos data ->
  const { videos, activeCatagory, loading } = useSelector(
    (state) => state.homeVideos
  );
  const fetchData = () => {
    if (activeCatagory === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCatagory(activeCatagory));
    }
    //now ab bas is new list of videos ko previous wali se concatinate kar dena hai.
  };

  return (
    <Container>
      <CatagoriesBar />
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData} //jaise dataLenth reach hoga ye fetchFunction new data load kar lega.
        hasMore={true}
        Loader={
          <div className="spinner-border text-danger d-block mx-auto"></div>
        }
      >
        <Row>
          {!loading
            ? videos.map((video) => (
                <Col lg={3} md={4} key={video.id}>
                  {/*largeScreen k liye 3 Col and midium screen k liye 4 column*/}
                  <Video video={video} />
                </Col>
              ))
            : [...Array(20)].map(() => (
                <Col lg={3} md={4}>
                  <Skeleton height={180} width="100%" />
                </Col>
              ))}
        </Row>
      </InfiniteScroll>
    </Container>
  );
}

export default HomeScreen;
