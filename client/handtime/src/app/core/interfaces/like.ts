export interface ILike {
    _createdOn: number;
    _updatedOn?: number;
    _id: string;
    _ownerId: string;
    watchId: string;
    author: {
        _id: string;
        username: string
    }
}