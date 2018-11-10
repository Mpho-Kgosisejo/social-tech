
// #region Auth
export const FIELD_CANT_BE_EMPTY = "field can not be empty"
export const INVALID_EMAIL = "invalid email"
export const PASSWORD_MISMATCH = "password mismatch"
export const UNEXPECTED_ERROR = "unexpected error occurred"
export const TRY_AGAIN_LATER = "please try again later"
export const INCORRECT_CREDENTIALS = "incorrect credentials"
export const INCORRECT_LOGIN_OR_PASSWORD = "user login or password might is incorrect"
export const SIGNIN_SUCCESS = "signin success"
export const SUCCESSFULLY_LOGGED_IN = "you have successfully logged in"
export const SIGNUP_SUCCESS = "signup success"
export const SUCCESSFULLY_SIGNUP = "you have successfully signed up, check email to confirm your signup"
export const CONFIRMATION_EMAIL_ERROR = `invalid confirmation token, ${TRY_AGAIN_LATER}`
export const CONFIRMATION_EMAIL_SUCCESS = "Email was successfully confirmed"
export const CONFIRMATION_EMAIL_UNEXPECTED_ERROR = `${UNEXPECTED_ERROR} confirming email`

export const valueMustBeInLength = length => (`value must be ${length} in length`)
// #endregion