import { FunctionComponent } from "react";
import {  ILinkList } from "../types/types";
import { Link } from "react-router-dom";

interface ILinkListProps {
    LinkListArr:ILinkList[]
}
 
const LinkList: FunctionComponent<ILinkListProps> = ({LinkListArr}) => {

    return (  
        <div className="article-list-block">
             {LinkListArr.map(Links => (
                <Link key={Links.LinkId} className="article-list-link" to={"/links/"+Links.LinkId}>
                    <div  className="arctile-list-element">
                        <h3 className="article-list-title">{Links.Title}</h3>
                        { Links.Chect === 1 ?<h5 className="green-cheak">Інформація підтверджена адміністрацією</h5>:
                        <h5 className="red-cheak">Інформація НЕ підтверджена адміністрацією та може бути неправдивою!</h5>}
                        <div className="article-list-footer">
                        <p className="article-list-autor">Автор(-ка) : {Links.Author}</p>
                        <p className="article-list-date">{Links.ADate.toString()}</p>
                        </div>
                    </div>
               </Link>
            ))}   
        </div>
        
    );
}
 
export default LinkList;