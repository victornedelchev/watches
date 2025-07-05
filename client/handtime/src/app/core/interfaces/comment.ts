export interface IComment {
    _createdOn: number;
    _updatedOn?: number;
    _id: string;
    _ownerId: string;
    comment: string;
    watchId: string;
    author: {
        _id: string;
        username: string
    }
}