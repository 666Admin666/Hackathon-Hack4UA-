import axios from "axios";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ArticleList from "./components/ArticleList";
import { IArticleList } from "./types/types";



function Departure(){

    const[departureArr,setDepartureArr]=useState<IArticleList[]>([])
    const [seconds, setSeconds] = useState(60)
    async function load()
    {
      try {
        const tmp =  await axios.get<IArticleList[]>('http://localhost:4000/article/2')
        setDepartureArr(tmp.data)
      } catch (e) {
        alert(e)
      }
    }
  
    useEffect(() => {
      load()
      const timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }, 1000)
      return () => clearInterval(timer)
    }, [seconds]);
  
    return ( 
        <Container>
            <ArticleList ArticleListArr={departureArr}/>
        </Container>
     );
}
 
export default Departure;