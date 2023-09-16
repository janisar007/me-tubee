import React from "react";
import "./_subscriptions.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSubscriptionChannel } from "../../redux/actions/videos.action";
import { Container } from "react-bootstrap";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SubscriptionsScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubscriptionChannel());
  }, [dispatch]);

  const { loading, videos } = useSelector(
    (state) => state.subscriptionsChannel
  );

  return (
    <Container fluid>
      {!loading ? (
        videos?.map((video) => (
          <VideoHorizontal video={video} key={video.id} subScreen />
        ))
      ) : (
        // subScreen ek boolean hai jiske ander true ja raha hai.
        // <SkeletonTheme color="#343a40" highlightColor="#3c4147">
        //   <Skeleton width="100%" height="160px" count={20} />
        // </SkeletonTheme>
        <h6>loading...</h6>
      )}
    </Container>
  );
};

export default SubscriptionsScreen;
