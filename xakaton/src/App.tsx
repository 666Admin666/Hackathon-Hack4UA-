import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Route, Routes } from 'react-router-dom';
import ArticleAdd from './ArticleAdd';
import Article from './components/Article';
import LinkComponent from './components/LinkComponent';
import './css/App.css';
import Departure from './Departure';
import Help from './Help';
import Home from './Home';
import Links from './Links';



function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Інфо Схованка</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto header-a">
              <Link to="/">Головна</Link>
              <Link to="/help">Допомога</Link>
              <Link to="/departure">Виїзд</Link>
              <Link to="/links">Посилання</Link>
              <Link to="/articleadd">Додати Статтю</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
       
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/help' element={<Help/>}/>
        <Route path='/departure' element={<Departure/>}/>
        <Route path='/links' element={<Links/>}/>
        <Route path='/links/:id' element={<LinkComponent/>}/>
        <Route path='/articleadd' element={<ArticleAdd/>}/>
        <Route path='/article/:id' element={<Article  />}/>
      </Routes>
    </div>
  );
}

export default App;
