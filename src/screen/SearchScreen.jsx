import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideosBySearch } from "../redux/actions/videos.action";
import { Container } from "react-bootstrap";
import VideoHorizontal from "../components/videoHorizontal/VideoHorizontal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SearchScreen = () => {
  const { query } = useParams(); //ye url me jitne bhi pararmeters hai unhe le lega (yaha header me jo search button hai wo click hone per search/query route extra jud jaega url me see header.jsx aur bhi hum us query ko waha se yaha per le lenege)
  //   console.log(query);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [query, dispatch]);

  const { videos, loading } = useSelector((state) => state.searchedVideos);

  return (
    <Container>
      {!loading ? (
        // kabhi kabhi ye hota hai ki videos k ander jitni bhi videos hai unme sniipet nahi hota hai to hum yaha un video ko hi le rahe hai jinme snippet ho ->

        // videos?.map((video) => <VideoHorizontal video={video} key={video.id.videoId} />)
        videos
          ?.filter((video) => video.snippet)
          .map((video) => (
            <VideoHorizontal
              video={video}
              key={video.id.videoId}
              searchScreen
            /> //here serachScreen is a boolean value.
          ))
      ) : (
        // <SkeletonTheme color="#343a40" highlightColor="#3c4147">
        //   <Skeleton width="100%" height={160} count={20} />
        // </SkeletonTheme>
        <h6>loading...</h6>
      )}
    </Container>
  );
};

export default SearchScreen;
