import { Col, Container, Row } from "react-bootstrap";

function Home(){
    return ( 
        <Container className="home-main-block" >
            <Row>
                <Col  md={12} lg={6}>
                    <h1>Ласкаво просимо на Інформаційну Схованку</h1>
                    <p>
                    Ласкаво просимо на Інформаційну схованку. Це величезний портал для централізації інформації з усього інтернету силами звичайних користувачів, 
                    головна ідея що кожен може зробити свій внесок і розширити енциклопею своєю статтею, яка буде корисна іншим громадянам.
                    </p>    
                </Col>
                <Col className="home-logo" md={12} lg={6}> 
                
                </Col>
            </Row>
        </Container>
     );
}
 
export default Home;