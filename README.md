 ## Basic MERN JWT Authentication 

 **Frontend**
  - Rough user pages that requests user registration and credential authentication.

 **Backend**
  - backend script that routes login and register request to appropriate handlers.
    - registeration
      - name and password are obtained via `POST request`.
      - checked and notified if user already exists
      - else password is hashed and user is created in `mongoDB via mongoose (ODM)`.
    - login
      - validation
        - checked and notified if user doesn't exist.
        - verified if password match else respond with error message.
        - if match then a `JWT token` is created with name as payload and a secret_access_token.
        - respond with success message along with token.
        - allows frontend to add token into local storage for further access in pages.
          
 #### How to use:

- Download the backend [folder](https://github.com/Syed-Ibrahim/JWTAuth/backend) and extract the zip file.
- Run `npm i `
- rename example.env file to .env and fill it.
- Run `npm run dev`
