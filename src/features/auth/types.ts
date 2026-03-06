export type LoginDto = {
  email: string
  password: string
}

export type RegisterDto = {
  name: string
  email: string
  phone: string
  adress: string
  password: string
}

export type AuthResponse = {
  access_token: string
}
