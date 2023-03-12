export interface ValidationError {
	message: string
	members: string[]
}

export interface ResponseError {
	code: number
	message: string
	details: string
	validationErrors?: ValidationError[]
}
