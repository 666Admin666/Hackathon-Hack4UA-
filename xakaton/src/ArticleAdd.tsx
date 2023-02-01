import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import ParagraphsAdd from "./components/ParagraphsAdd";
import ParagraphsList from "./components/ParagraphsList";
import { ETag, IParagraphs } from "./types/types";


function ArticleAdd(){


    
    const [validated, setValidated] = useState(false);
    const[tag,setTag] = useState<ETag>(ETag.Help)
    const[title,setTitle] = useState('')
    const[text,setText] = useState('')
    const[link,setLink] = useState('')
    const[paragraphs,setParagraphs] = useState <Array<IParagraphs>>([])
    const[autor,setAutor] = useState('')
    
    const[error,setEror] = useState("Eror")
  
   

    const addParagraph = (paragraphsTitle: string,paragraphsText:string) =>{
        setParagraphs([...paragraphs, { ParagraphId:paragraphs.length+1, Header: paragraphsTitle, Text:paragraphsText , ArticleId:-1}]);
    }
    const delParagraph = () =>{
        if (paragraphs.length>0) {
            let updatedWallets: Array<IParagraphs> = paragraphs.filter(paragraph => paragraph.ParagraphId !== paragraphs.length);
            setParagraphs(updatedWallets);
        }
        else{
            alert("Немае абзацiв")
        }
        console.log(paragraphs)
    }

    

    const titleHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.target.value)
    }
    const textHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setText(e.target.value)
    }
    const autorHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setAutor(e.target.value)
    }
    const linkHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setLink(e.target.value)
    }
    const tagHandler = (e:any) =>{
        setTag(e.target.value)
    }

    const confirmForm = (event:any) =>{
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        setValidated(true);
        if (tag === ETag.Link) {
            sendLink()
        }
        else{
            sendArticle()
        }
        
    }
    async function sendArticle (){
        await axios.post("http://localhost:4000/article",
        {
            Tag:tag,
            Title:title,
            Text:text,
            Author:autor,
            Paragraphs:paragraphs,
        })
        alert("sendArticle")
    }
    async function sendLink (){
        await axios.post("http://localhost:4000/link",
        {
            Title:title,
            Link:link,
            Text:text,
            Author:autor,    
        })
        alert("sendArticle")
    }
    return(
        <div className="article-add-block">
            <Form noValidate validated={validated} onSubmit={confirmForm}>
                <fieldset >
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="TextInput">Заголовок</Form.Label>
                        <Form.Control required onChange={titleHandler}  type="text" value={title} placeholder="Червона Калина" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="Select">Тег</Form.Label>
                        <Form.Select onChange={e => tagHandler(e)}  required value={tag}>
                            <option>{ETag.Help}</option>
                            <option>{ETag.Departure}</option>
                            <option>{ETag.Link}</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Текст головного абзац </Form.Label>
                        <Form.Control required onChange={textHandler} type="text" value={text} as="textarea" rows={3} />
                    </Form.Group>
                 
                    { tag !== ETag.Link ? <ParagraphsAdd addParagraph={addParagraph} delParagraph={delParagraph}/>   : 
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Посилання </Form.Label>
                        <Form.Control required onChange={linkHandler} type="text" value={link}/>
                    </Form.Group>
                    }
                    { tag !== ETag.Link ? <ParagraphsList paragraphs={paragraphs}/>   : null}
                     <Form.Group className="mb-3">
                        <Form.Label>Ваше ім'я </Form.Label>
                        <Form.Control required onChange={autorHandler} type="text" value={autor} placeholder="Автор" />
                    </Form.Group>
                    <Button variant="success" type="submit">Підтвердити</Button>
                </fieldset>
            </Form>
        </div>
    );
}
export default ArticleAdd;