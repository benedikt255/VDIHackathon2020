import { IConnectIngPost } from "./IPostMgmt";

interface IConnectIngChannel{

    id : String
    name : String
    description : String
    picture : String
    persons  : String[]
    posts : IConnectIngPost[]

    createChannel() : boolean
    updateChannel() : boolean
    getChannel() : IConnectIngChannel
    removePost(postId : String) : boolean
}

class mockChannel implements IConnectIngChannel{
    id: String;
    name: String;
    description: String;
    picture: String;
    persons: String[];
    posts: any[];

    createChannel(): boolean {
        return false;
    }

    private constructor(){
        this.id = "007"
        this.name = "GoldenEye"
        this.description = "you know this!"
        this.picture = ""
        this.persons = [""]
        this.posts = [""]
    }

    updateChannel(): boolean {
        this.description = "updated"
        return true;
    }

    getChannel(): IConnectIngChannel {
        return this
    }

    removePost(postId: String): boolean {
        throw new Error("Method not implemented.");
    }

}
