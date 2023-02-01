import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ILinkList } from "../types/types";




function LinkComponent(){
  const {id} = useParams()
  const i = Number(id)
    
    
  const[link,setlinkArr]=useState<ILinkList>()
  const [seconds, setSeconds] = useState(60)
  async function load()
  {
    try {
      const tmp =  await axios.get<ILinkList>('http://localhost:4000/linkone/'+i)
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
   <Container className="article-block">
        <h2>{ link?.Title}</h2>
        { link?.Chect ?<h3 className="green-cheak">Інформація підтверджена адміністрацією</h3>:
        <h3 className="red-cheak">Інформація НЕ підтверджена адміністрацією та може бути неправдивою!</h3>}
        <p className="article-primary-text">{link?.Text}</p>
        <a className="article-primary-link" href="#"><span className="article-primary-link-span">Посилання:</span> {link?.Link}</a>
        <div className="article-footer">
            <p className="article-autor">Автор(-ка) : {link?.Author}</p>
            <p className="article-date">{link?.ADate.toString()}</p>
        </div>
    </Container>
     );
}
 
export default LinkComponent;