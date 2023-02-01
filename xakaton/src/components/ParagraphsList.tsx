import { FunctionComponent } from "react";
import { IParagraphsList } from "../types/types";
import Paragraphs from "./Paragraphs";


 
const ParagraphsList: FunctionComponent<IParagraphsList> = ({paragraphs}) => {
    return (  
        <div>
            {paragraphs.map(paragraph => (
                <Paragraphs
                key={paragraph.ParagraphId}
                ParagraphId={paragraph.ParagraphId}
                Header={paragraph.Header}
                Text={paragraph.Text}
                ArticleId={paragraph.ArticleId}
                />
            ))}   
        </div>
        
    );
}
 
export default ParagraphsList;