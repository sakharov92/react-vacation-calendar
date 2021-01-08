import { ITeam } from './team';
import { IUser } from './user';
import { Vacation } from './vacation';

export interface Data {
    teams: ITeam[];
    users: IUser[];
    vacations: Vacation[];
}
