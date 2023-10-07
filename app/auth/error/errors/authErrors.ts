


const authErrorCodes = {
    CLIENT_SESSION_ERROR: {
        message: 'Your session has expired. Please sign in again.',
        description: 'Your session has expired because you have been inactive for too long. To sign in again, please click the "Sign In" button.',
    },
    CLIENT_FETCH_ERROR: {
        message: 'There was a problem fetching your data.',
        description: 'There was a problem fetching your data from the server.',
    },
    OAUTH_GET_ACCESS_TOKEN_ERROR: {
        message: 'There was a problem signing in.',
        description: 'There was a problem signing in.',
    },
    OAUTH_V1_GET_ACCESS_TOKEN_ERROR: {
        message: 'There was a problem signing in.',
        description: 'There was a problem signing in.',
    },
    EMAIL_EXISTS: {
        message: 'This email is already in use. Please sign in or use a different email.',
        description: 'This email is already associated with an account. Please sign in or use a different email to create a new account.',
    },
    EMAIL_NOT_FOUND: {
        message: 'This email is not registered. Please sign up or use a different email.',
        description: 'This email is not associated with any account. Please sign up or use a different email to create a new account.',
    },
    INVALID_ARGUMENTS: {
        message: 'Invalid arguments. Please try again with valid arguments.',
        description: 'The arguments provided are invalid. Please try again with valid arguments.',
    },
    INVALID_CREDENTIALS: {
        message: 'Invalid credentials. Please try again with valid credentials.',
        description: 'The credentials provided are invalid. Please try again with valid credentials.',
    },
    INVALID_GRANT: {
        message: 'Invalid grant. Please try again with valid credentials.',
        description: 'The grant provided is invalid. Please try again with valid credentials.',
    },
    INVALID_TOKEN: {
        message: 'Invalid token. Please sign in again.',
        description: 'The token provided is invalid. Please sign in again to get a new token.',
    },
    MISSING_PASSWORD: {
        message: 'Missing password. Please try again with a password.',
        description: 'The password is missing. Please try again with a password.',
    },
    MISSING_USERNAME: {
        message: 'Missing username. Please try again with a username.',
        description: 'The username is missing. Please try again with a username.',
    },
    NOT_FOUND: {
        message: 'Not found. Please try again with valid data.',
        description: 'The requested data was not found. Please try again with valid data.',
    },
    PASSWORD_MISMATCH: {
        message: 'Password mismatch. Please try again with matching passwords.',
        description: 'The passwords provided do not match. Please try again with matching passwords.',
    },
    RATE_LIMIT: {
        message: 'Rate limit exceeded.',
        description: 'The rate limit has been exceeded.',
    },
    SERVER_ERROR: {
        message: 'Server error.',
        description: 'There was a server error.',
    },
    SIGNIN_EMAIL_VERIFICATION_REQUIRED: {
        message: 'Email verification required. Please verify your email to sign in.',
        description: 'Email verification is required to sign in. Please verify your email to sign in.',
    },
    SIGNIN_ERROR: {
        message: 'Sign in error.',
        description: 'There was an error signing in.',
    },
    SIGNUP_ERROR: {
        message: 'Sign up error.',
        description: 'There was an error signing up.',
    },
    TOKEN_EXPIRED: {
        message: 'Token expired. Please sign in again.',
        description: 'The token has expired. Please sign in again to get a new token.',
    },
    UNAUTHORIZED: {
        message: 'Unauthorized. Please sign in or create an account.',
        description: 'You are not authorized to access this resource. Please sign in or create an account to access this resource.',
    },
    UNKNOWN_ERROR: {
        message: 'Unknown error.',
        description: 'An unknown error occurred.',
    },
    USER_DISABLED: {
        message: 'User disabled. Please contact support.',
        description: 'The user account has been disabled. Please contact support for assistance.',
    },
    USER_NOT_FOUND: {
        message: 'User not found. Please sign up or use a different email.',
        description: 'The user account was not found. Please sign up or use a different email to create a new account.',
    },
    USERNAME_EXISTS: {
        message: 'This username is already in use. Please try again with a different username.',
        description: 'This username is already associated with an account. Please try again with a different username to create a new account.',
    },
    USERNAME_NOT_FOUND: {
        message: 'This username is not registered. Please sign up or use a different username.',
        description: 'This username is not associated with any account. Please sign up or use a different username to create a new account.',
    },
    CALLBACK_CREDENTIALS_HANDLER_ERROR: {
        message: 'Callback credentials handler error.',
        description: 'There was an error handling the callback credentials.',
    },
    CALLBACK_CREDENTIALS_JWT_ERROR: {
        message: 'Callback credentials JWT error.',
        description: 'There was an error decoding the callback credentials.',
    },
    EMAIL_REQUIRES_ADAPTER_ERROR: {
        message: 'Email requires adapter error.',
        description: 'There was an error sending the email.',
    },
    EMAIL_SEND_ERROR: {
        message: 'Email send error.',
        description: 'There was an error sending the email.',
    },
    SIGNIN_EMAIL_ERROR: {
        message: 'Sign in email error.',
        description: 'There was an error sending the sign in email.',
    },
    CALLBACK_EMAIL_ERROR: {
        message: 'Callback email error.',
        description: 'There was an error sending the callback email.',
    },
    OAUTH_CALLBACK_ERROR: {
        message: 'OAuth callback error.',
        description: 'There was an error with the OAuth callback.',
    },
    SIGNIN_OAUTH_ERROR: {
        message: 'Sign in OAuth error.',
        description: 'There was an error with the OAuth sign in.',
    },
    OAUTH_CALLBACK_HANDLER_ERROR: {
        message: 'OAuth callback handler error.',
        description: 'There was an error handling the OAuth callback.',
    },
    OAUTH_GET_PROFILE_ERROR: {
        message: 'OAuth get profile error.',
        description: 'There was an error getting the OAuth profile.',
    },
};

export { authErrorCodes };