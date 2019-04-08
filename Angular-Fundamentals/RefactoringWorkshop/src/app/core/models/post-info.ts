export interface IPostInfo {
    id: string;
    url: string;
    imageUrl: string;
    title: string;
    description: string;
    author: string;
    _acl: {
        creator: string;
    };
}
