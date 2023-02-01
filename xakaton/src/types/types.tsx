export interface IParagraphs{
    ParagraphId?:number;
    Header:string;
    Text:string;
    ArticleId?:Number;
}
export interface IParagraphsList{
    paragraphs:IParagraphs[];
}
export interface IArticle {
    ArticleId:number;
    Tag:string;
    Title:string;
    Text:string;
    Author:string;
    ADate:Date;
    Chect:Number;
    Paragraphs:IParagraphs[]
}
export interface IArticleList {
    ArticleId:number;
    Tag:string;
    Title:string;
    Text:string;
    Author:string;
    ADate:Date;
    Chect:Number;
}
export interface ILinkList {
    LinkId:number;
    Link:string;
    Title:string;
    Text:string;
    Author:string;
    ADate:Date;
    Chect:Number;
}
export enum ETag { 
    Help = "Допомога", 
    Departure = "Виїзд",
    Link = "Посилання"
}