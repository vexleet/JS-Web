export interface ICommentInfo {
    id: string;
    _acl: {
        creator: string;
    };
    content: string;
    postId: string;
    author: string;
}