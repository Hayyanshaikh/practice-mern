# Authentication Flow

## Registration

User submits name, email, password, and age(optional).

Flow:

Register → Validate required fields → Normalize email → Check existing account → Create account → Authenticate user → Return token and user

### Rules

- Name, email, and password are required.
- Email is normalized before account lookup and storage.
- Duplicate email addresses are not allowed.
- A successful registration automatically authenticates the user.
- Password must not be returned to the client.

## Login

User submits email and password.

Flow:

Login → Validate credentials → Find account → Verify password → Authenticate user → Return token and user

### Rules

- Email and password are required.
- Email is normalized before lookup.
- Invalid credentials return an authentication error.
- Successful login returns an authentication token and user information.

## Profile

Authenticated user requests their profile.

Flow:

Request → Verify authentication → Identify user → Return profile

The authenticated user's identity comes from the authentication context rather than client-provided user IDs.
