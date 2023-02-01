import { FunctionComponent } from "react";
import Article from "./components/Article";
import { IArticle } from "./types/types";

interface NewsProps {
    Article:IArticle
}
 
const News: FunctionComponent<NewsProps> = ({Article}) => {
    return ( 
        <></>
     );
}
 
export default News;