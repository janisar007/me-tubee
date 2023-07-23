import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import CatagoriesBar from '../../components/catagoriesbar/CatagoriesBar';
import Video from '../../components/video/Video';

function HomeScreen() {
  return (
    <Container>
        <CatagoriesBar/>
        <Row>
            {
                [...new Array(20)].map(()=>(
                 <Col lg={3} md={4}>{/*largeScreen k liye 3 Col and midium screen k liye 4 column*/}
                    <Video/>
                 </Col>
                ))
            }
        </Row>
    </Container>
  )
}

export default HomeScreen
