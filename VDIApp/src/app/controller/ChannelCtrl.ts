import { IChannelMgmt, IChannel, ConnectIngChannel } from '../interface/IChannelMgmt';
import { IPostMgmt, IPost, ConnectIngPost} from '../interface/IPostMgmt';
import { IUser } from '../interface/IUserMgmt';
import { ICommentMgmt } from '../interface/ICommentMgmt';
import { PostCtrl } from './PostCtrl';


/**
 * Controller - ChannelCtrl
 * Application Controller to handle a channel
 * and create/remove handling of posts
 */
export class ChannelCtrl{

    // Management Interfaces
    private readonly chnMgmt: IChannelMgmt;
    private readonly postMgmt: IPostMgmt;
    private readonly commentMgmt: ICommentMgmt;

    public CurrentUser: IUser;
    public Current: IChannel;
    public Posts: Array<PostCtrl>;


    constructor(chnMgmt: IChannelMgmt, postMgmt: IPostMgmt, commentMgmt: ICommentMgmt, user: IUser, channel: IChannel)
    {
        this.chnMgmt = chnMgmt;
        this.postMgmt = postMgmt;
        this.commentMgmt = commentMgmt;

        this.CurrentUser = user;
        this.Current = channel;
        this.Posts = [];

        this.loadPosts();
    }



    public loadPosts(): void {
        this.postMgmt.getPostsAsync(this.CurrentUser, this.Current, (posts: IPost[]) =>{
            if (posts === undefined)
            {
                // failed
                // nop
            }
            else
            {
                // successfull
                this.Posts = posts.map((value: IPost, index: number, array: IPost[]) => {
                    return new PostCtrl(this.postMgmt, this.commentMgmt, this.CurrentUser, value);
                });
            }
        });
    }

    public createPost(title: string, message: string)
    {
        this.postMgmt.createPostAsync(this.CurrentUser, this.Current, title, message, (post: IPost) => {
            if (post === ConnectIngPost.GetDefault())
            {
                // failed
                // nop
            }
            else
            {
                // successful
                this.loadPosts();
            }
        });
    }

    public removePost(post: IPost)
    {
        this.postMgmt.removePostAsync(this.CurrentUser, post, (removed: boolean) => {
            if (removed)
            {
                // successfull
                this.loadPosts();
            }
            else
            {
                // failed
                // nop
            }
        });
    }

    public updateChannel(channel: IChannel)
    {
        this.chnMgmt.updateChannelAsync(this.CurrentUser, channel, (newChannel: IChannel)=>{
            if (newChannel === ConnectIngChannel.GetDefault())
            {
                // failed
                // nop
            }
            else
            {
                this.Current = newChannel;
                this.loadPosts();
            }
        });
    }


}