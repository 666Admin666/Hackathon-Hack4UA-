import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LinkList from "./components/LinkList";
import { ILinkList } from "./types/types";

function Links(){

  const[linkArr,setlinkArr]=useState<ILinkList[]>([])
  const [seconds, setSeconds] = useState(60)
  async function load()
  {
    try {
      const tmp =  await axios.get<ILinkList[]>('http://localhost:4000/link')
      setlinkArr(tmp.data)
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
            <LinkList LinkListArr={linkArr} />
        </Container>
     );
}
 
export default Links;