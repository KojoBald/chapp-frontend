import { User } from './user'

export class Channel
{
    name: string;
    users: User[];
    admin_id: number;
}