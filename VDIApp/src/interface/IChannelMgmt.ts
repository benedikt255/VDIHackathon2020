interface IConnectIngChannel{

    id : String
    name : String
    description : String
    picture : String
    persons  : String[]

    createChannel() : boolean
    updateChannel() : boolean
    getChannel() : IConnectIngChannel
    removePost(postId : String) : boolean
}

class mockChannel implements IConnectIngChannel{



}
