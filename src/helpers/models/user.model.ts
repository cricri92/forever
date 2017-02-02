export class UserModel {
    constructor(
        public name: string,
        public email: string,
        public auth_id: string,
        public created_at: number,
        public updated_at: number
    ) {}
}