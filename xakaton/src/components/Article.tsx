import axios from "axios";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ETag, IArticle } from "../types/types";
import ParagraphsList from "./ParagraphsList";




function Article(){
    
    const {id} = useParams()
    const i = Number(id)
    const tmp:IArticle = {
        "ArticleId": 1,
    "Tag": "",
    "Title": "",
    "Text": "",
    "Author": "",
    "ADate": new Date(),
    "Chect": 1,
    "Paragraphs": [
        {
            "ParagraphId": 1,
            "Header": "",
            "Text": "",
            "ArticleId": 1
        }
    ]

    }
    const[article,setArticle]=useState<IArticle>(tmp)
    const [seconds, setSeconds] = useState(60)
    
    async function load()
    {
      try {
        const tmp =  await axios.get<IArticle>('http://localhost:4000/articleone/'+i)
        setArticle(tmp.data)
      } catch (e) {
        alert(e)
      }
    }
  
    useEffect(() => {
      load()
      console.log(typeof(article))
      const timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }, 1000)
      return () => clearInterval(timer)
    }, [seconds]);
  
    return (
   <Container className="article-block">
        <h2>{article?.Title}</h2>
        { article?.Chect === 1 ?<h3 className="green-cheak">Інформація підтверджена адміністрацією</h3>:
        <h3 className="red-cheak">Інформація НЕ підтверджена адміністрацією та може бути неправдивою!</h3>}
        <p className="article-primary-text">{article?.Text}</p>
         <ParagraphsList paragraphs={article.Paragraphs} />
        <div className="article-footer">
            <p className="article-autor">Автор(-ка) : {article?.Author}</p>
            <p className="article-date">{article?.ADate.toString()}</p>
        </div>
    </Container>
     );
}
 
export default Article;