export type AuthResponse = {
  id: string,
  password: string,
  name: string,
  avatarURL?: string,
  answers: {
    [key: string]: string,
  },
  questions: Array<string>,
}

export interface ILogin {
  username: string,
  password: string
}