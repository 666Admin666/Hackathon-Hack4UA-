import { FunctionComponent } from "react";
import { IParagraphs } from "../types/types";

 
const Paragraphs: FunctionComponent<IParagraphs> = ({ParagraphId,Header,Text,ArticleId}) => {
    return ( 
        <div>
            <h4>{Header}</h4>
            <p>{Text}</p>
        </div>
     );
}
 
export default Paragraphs;