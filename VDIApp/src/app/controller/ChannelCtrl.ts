import { IChannelMgmt, IChannel, ConnectIngChannel } from '../interface/IChannelMgmt';
import { IPostMgmt, IPost, ConnectIngPost} from '../interface/IPostMgmt';
import { IUser } from '../interface/IUserMgmt';
import { ICommentMgmt } from '../interface/ICommentMgmt';
import { PostCtrl } from './PostCtrl';
import { ConnectIngCtrl } from './ConnectIngCtrl';


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

    private readonly parent: ConnectIngCtrl;

    public currentUser: IUser;
    public current: IChannel;
    public posts: Array<PostCtrl>;

    /**
     * Constructor - Channel Controller
     * @param chnMgmt Channel Management
     * @param postMgmt Post Management
     * @param commentMgmt Comment Management
     * @param parent ConnectIng Controller
     * @param channel Current Channel
     */
    constructor(
        chnMgmt: IChannelMgmt,
        postMgmt: IPostMgmt,
        commentMgmt: ICommentMgmt,
        parent: ConnectIngCtrl,
        channel: IChannel
        )
    {
        this.chnMgmt = chnMgmt;
        this.postMgmt = postMgmt;
        this.commentMgmt = commentMgmt;

        this.parent = parent;

        this.currentUser = this.parent.currentUser;
        this.current = channel;
        this.posts = [];

        this.loadPosts();
    }


    /**
     * Method - UpdateChannel
     * change the title and message of a channel object
     * @param channel Channel Object
     */
    public updateChannel(channel: IChannel)
    {
        this.chnMgmt.updateChannelAsync(this.currentUser, channel, (newChannel: IChannel) => {
            if (newChannel === ConnectIngChannel.GetDefault())
            {
                // failed
                // nop
            }
            else
            {
                this.current = newChannel;
                this.loadPosts();
            }
        });
    }

    /**
     * Method - RemoveChannel
     * removes the current channel object
     * @param channel Channel Object
     */
    public removeChannel()
    {
        this.chnMgmt.removeChannelAsync(this.currentUser, this.current, (removed: boolean) => {
            if (removed)
            {
                // remove successful
                // update channel List
                this.parent.loadChannels();
            }
            else
            {
                // remove failed
                // nop
            }
        });
    }

    /**
     * Method - Load the List of the Posts
     */
    public loadPosts(): void {
        this.postMgmt.getPostsAsync(this.currentUser, this.current, (posts: IPost[]) =>{
            if (posts === undefined)
            {
                // failed
                // nop
            }
            else
            {
                // successfull
                this.posts = posts.map((value: IPost, index: number, array: IPost[]) => {
                    return new PostCtrl(this.postMgmt, this.commentMgmt, value, this);
                });
            }
        });
    }

    /**
     * Method - Create a new Post
     * @param title Title of a Post
     * @param message Message of a Post
     */
    public createPost(title: string, message: string)
    {
        this.postMgmt.createPostAsync(this.currentUser, this.current, title, message, (post: IPost) => {
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
}
