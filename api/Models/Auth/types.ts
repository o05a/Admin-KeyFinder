export interface LoginProps {
	userNameOrEmailAddress: string
	password: string
}

export interface LoginResponse {
	accessToken: string
	encryptedAccessToken: string
	expireInSeconds: number
	userId: string
}
