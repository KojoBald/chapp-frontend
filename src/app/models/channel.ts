import { User } from './User'

export class Channel {
    id?: number;
    name?: string;
    users?: User[];
    admin?: number;
}