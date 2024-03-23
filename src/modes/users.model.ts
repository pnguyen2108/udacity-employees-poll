export interface IUser {
  id: string,
  name?: string,
  password?:string,
  avatarURL?: string | null,
  answers: {
    [key: string]: string,
  },
  questions: Array<string>,
  questionLength? : number,
  answeredLength?: number
}

export interface IUsers {
  [key : string] : IUser
}
