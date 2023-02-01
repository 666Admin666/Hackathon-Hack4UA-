import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { IArticleList } from "../types/types";


interface ArticleListProps {
    ArticleListArr:IArticleList[]
}
 
const ArticleList: FunctionComponent<ArticleListProps> = ({ArticleListArr}) => {

    return (  
        <div className="article-list-block">
             {ArticleListArr.map(Article => (
                <Link key={Article.ArticleId} className="article-list-link" to={"/article/"+(Article.ArticleId)}>
                    <div  className="arctile-list-element">
                        <h3 className="article-list-title">{Article.Title}</h3>
                        { Article.Chect === 1 ?<h5 className="green-cheak">Інформація підтверджена адміністрацією</h5>:
                        <h5 className="red-cheak">Інформація НЕ підтверджена адміністрацією та може бути неправдивою!</h5>}
                        <div className="article-list-footer">
                        <p className="article-list-autor">Автор(-ка) : {Article.Author}</p>
                        <p className="article-list-date">{Article.ADate.toString()}</p>
                        </div>
                    </div>
               </Link>
            ))}   
          
        </div>
        
    );
}
 
export default ArticleList;