export class Comment{
    public _id:String;
    public author:String;
    public content:String;

    constructor(id:string,author:string,content:string)
    {
        this._id=id;
        this.author=author;
        this.content=content;
    }
}