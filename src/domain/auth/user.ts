import { err, ok, Result } from 'neverthrow';
import { validateUserSchema } from './user.validation';

export interface IUserProps {
	id?: string;
	username: string;
	password: string;
	email?: string;
	status: string;
	token?: string;
	roles?: string[];
}

export class User {
	id: string;

	username: string;

	password: string;

	token?: string;

	email?: string;

	status: string;

	roles?: string[];

	constructor(props: IUserProps) {
		Object.assign(this, props);
	}

	static create(props: IUserProps): Result<User, string> {
		const { error } = validateUserSchema(props);
		if (error) {
			const userError = error.details.map((error) => error.message).join('. ');
			return err(userError);
		}
		return ok(new User(props));
	}
}
