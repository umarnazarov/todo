export interface ITodo {
    id?: string;
    title: string;
    description: string;
    createdBy?: CreatedBy.ADMIN | CreatedBy.USER;
}
enum CreatedBy { USER = "user", ADMIN = "admin" }
console.log(CreatedBy.ADMIN)