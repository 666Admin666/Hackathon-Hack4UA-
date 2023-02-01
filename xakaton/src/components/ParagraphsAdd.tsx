import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

interface IParagraphsAdd {
    addParagraph:(paragraphsTitle: string,paragraphsText:string) => void;
    delParagraph:()=>void
}

const ParagraphsAdd: FunctionComponent<IParagraphsAdd> = ({addParagraph,delParagraph}) => {
    const[paragraphsTitle,setParagraphsTitle] = useState('')
    const[paragraphsText,setParagraphsText] = useState('')
    
    const paragraphsTitleHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setParagraphsTitle(e.target.value)
    }
    const setParagraphsTextHandler = (e :ChangeEvent<HTMLInputElement>) =>{
        setParagraphsText(e.target.value)
    }
    
    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(paragraphsText.length>1 && paragraphsTitle.length>1)
        {
            addParagraph(paragraphsTitle,paragraphsText);
        }
        else{
            alert('Абзац не може бути порожнім')
        }
        setParagraphsTitle('');
        setParagraphsText('');
    }
    
    return (  
        <>   
        <Form.Group className="mb-3" >
            <Form.Label>Заголовок абзацу</Form.Label>
            <Form.Control value={paragraphsTitle} type="text" onChange={paragraphsTitleHandler}/>
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Label>Текст абзацу</Form.Label>
            <Form.Control  value={paragraphsText} type="text" onChange={setParagraphsTextHandler} as="textarea" rows={3} />
        </Form.Group>
        <Button onClick={handleSubmit}>Додати абзац</Button>
        <Button variant="danger" onClick={delParagraph}>Видалити абзац</Button>
        </>
    );
}
 
export default ParagraphsAdd;