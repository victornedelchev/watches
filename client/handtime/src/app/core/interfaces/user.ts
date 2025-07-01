export interface IUser {
  username: string;
  email: string;
  password: string;
  _createdOn: number;
  _updatedOn?: number;
  _id: string;
  accessToken: string
}
