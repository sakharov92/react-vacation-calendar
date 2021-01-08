import { ITeam } from './team';
import { User } from './user';
import { Vacation } from './vacation';

export interface Data {
    teams: ITeam[];
    users: User[];
    vacations: Vacation[];
}
