import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import CatagoriesBar from '../../components/catagoriesbar/CatagoriesBar';
import Video from '../../components/video/Video';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularVideos } from '../../redux/actions/videos.action';

function HomeScreen() {
  const dispatch = useDispatch();
  //i shuold fire this when ever component is mount->
  useEffect(()=> {
    dispatch(getPopularVideos());

  }, [dispatch]);

  //first i have to read the pupular videos data ->
  const {videos} = useSelector(state=>state.homeVideos);
  return (
    <Container>
        <CatagoriesBar/>
        <Row>
            {
                videos.map((video)=>(
                 <Col lg={3} md={4} key={video.id}>{/*largeScreen k liye 3 Col and midium screen k liye 4 column*/}
                    <Video video={video} />
                 </Col>
                ))
            }
        </Row>
    </Container>
  )
}

export default HomeScreen
