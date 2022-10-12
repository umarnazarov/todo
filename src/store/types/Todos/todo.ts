export interface ITodo {
    id?: number;
    title: string;
    description: string;
    createdBy?: CreatedBy.ADMIN | CreatedBy.USER;
}
enum CreatedBy { USER = "user", ADMIN = "admin" }
console.log(CreatedBy.ADMIN)