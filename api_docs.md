# Todoin 

# RESTfull endpoints

# USERS

## POST /users/regis

_Request Params_
```
not needed
```

_Request Header_
```
not needed
```

_Request Body_
```
{
    "name": <STRING>,
    "email": <STRING>,
    "password": <STRING>
}
```

_Response (201 - Created)_
```
{
    "id": <id user>,
    "name": <name user>,
    "email": <email user>
}
```

_Response (400 - Bad Request)_
```
{
    "messages": [
        "email must be unique"
    ]
}
OR
{
    "messages": [
        "Name can't be empty",
        "Email can't be empty",
        "Validation isEmail on email failed",
        "Password can't be empty",
        "The password must contain minimal 5 characters."
    ]
}
```

_Response (500 - Internal Server)_
```
{
    "messages": [ "500 Internal Error" ]
}
```

## POST /users/login

_Request Params_
```
not needed
```

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": <STRING>,
    "password": <STRING>
}
```

_Response (201 - Created)_
```
{
    "accessToken": <access token user>
}
```

_Response (401 - Unauthenticated)_
```
{
    "messages": [
        "401 Unauthenticated access"
    ]
}
```
_Response (500 - Internal Server)_
```
{
    "messages": [ "500 Internal Error" ]
}
```


## POST /users/login-google

_Request Params_
```
not needed
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (201 - Created)_
```
{
    "accessToken": <access token user>
}
```

_Response (401 - Unauthenticated)_
```
{
    "messages": [
        "401 Unauthenticated access"
    ]
}
```
_Response (500 - Internal Server)_
```
{
    "messages": [ "500 Internal Error" ]
}
```

# TODOS

## GET /todos

_Request Params_
```
not needed
```

_Request Header_
```
{
    access_token : <access_token user login>
}
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
[
    {
        "id": 12,
        "title": "Socket io broadcast data",
        "content": "cannot remove data user when the user leaves the chat room",
        "tag": "Bug",
        "status": "To do",
        "UserId": 2,
        "User": {
            "id": 2,
            "name": "Vina Eka Laylani",
            "email": "vinaekalaylani@gmail.com"
        }
    },
    {
        "id": 8,
        "title": "trial socket",
        "content": "trial error socket io client and server",
        "tag": "Other",
        "status": "Done",
        "UserId": 3,
        "User": {
            "id": 3,
            "name": "Trial",
            "email": "winaekalaylani@gmail.com"
        }
    }
]
```

_Response (401 - Unauthenticated)_
```
{
    "messages": [
        "401 Unauthenticated access"
    ]
}
```

_Response (500 - Internal Server)_
```
{
    "messages": [ "500 Internal Error" ]
}
```

## GET /todos/user

_Request Params_
```
not needed
```

_Request Header_
```
{
    access_token : <access_token user login>
}
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
{
    "id": <id user>,
    "name": <name user>,
    "email": <email user>,
    "password": <password user>,
    "createdAt": "2021-10-21T22:28:33.153Z",
    "updatedAt": "2021-10-21T22:28:33.153Z"
}
```

_Response (401 - Unauthenticated)_
```
{
    "messages": [
        "401 Unauthenticated access"
    ]
}
```

_Response (500 - Internal Server)_
```
{
    "messages": [ "500 Internal Error" ]
}
```

## GET /todos/notes

_Request Params_
```
not needed
```

_Request Header_
```
{
    access_token : <access_token user login>
}
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
[
    {
        "id": 3,
        "content": "LINK DOCUMENTATION FOOTER\n- https://www.npmjs.com/package/vue-hacktiv8-footer",
        "UserId": 1,
        "User": {
            "id": 1,
            "name": "Vina Eka",
            "email": "winaeka237@gmail.com"
        }
    },
    {
        "id": 2,
        "content": "https://www.google.com/settings/security/lesssecureapps\nlink setting access for nodemailer",
        "UserId": 1,
        "User": {
            "id": 1,
            "name": "Vina Eka",
            "email": "winaeka237@gmail.com"
        }
    }
]
```

_Response (401 - Unauthenticated)_
```
{
    "messages": [
        "401 Unauthenticated access"
    ]
}
```

_Response (500 - Internal Server)_
```
{
    "messages": [ "500 Internal Error" ]
}
```

## POST /todos/add

_Request Params_
```
not needed
```

_Request Header_
```
{
    access_token : <access_token user login>
}
```

_Request Body_
```
{
    "title": <STRING>,
    "content": <TEXT>,
    "tag": <STRING>
}
```

_Response (201 - Created)_
```
{
    "status": "To do",
    "id": 13,
    "title": "Trial Error",
    "tag": "Other",
    "content": "trial error for api doc",
    "UserId": 7,
    "updatedAt": "2021-10-21T22:51:38.752Z",
    "createdAt": "2021-10-21T22:51:38.752Z"
}
```

_Response (400 - Bad Request)_
```
{
    "messages": [
        "Title can't be empty",
        "Content can't be empty",
        "Tag can't be empty"
    ]
}
```

_Response (401 - Unauthenticated)_
```
{
    "messages": [
        "401 Unauthenticated access"
    ]
}
```

_Response (500 - Internal Server)_
```
{
    "messages": [ "500 Internal Error" ]
}
```

## POST /todos/notes/add

_Request Params_
```
not needed
```

_Request Header_
```
{
    access_token : <access_token user login>
}
```

_Request Body_
```
{
    "content": <TEXT>
}
```

_Response (201 - Created)_
```
{
    "id": 4,
    "content": "Explore sendiri",
    "UserId": 7,
    "updatedAt": "2021-10-21T22:53:53.314Z",
    "createdAt": "2021-10-21T22:53:53.314Z"
}
```

_Response (400 - Bad Request)_
```
{
    "messages": [
        "Content can't be empty"
    ]
}
```

_Response (401 - Unauthenticated)_
```
{
    "messages": [
        "401 Unauthenticated access"
    ]
}
```

_Response (500 - Internal Server)_
```
{
    "messages": [ "500 Internal Error" ]
}
```

## PATCH /todos/status/:id

_Request Params_
```
Required:

id : [INTEGER]
```

_Request Header_
```
{
    access_token : <access_token user login>
}
```

_Request Body_
```
{
    "status": <STRING>
}
```

_Response (200 - Success)_
```
{
    "message": "Success edit status"
}
```

_Response (400 - Bad Request)_
```
{
    "messages": [
        "Status can't be empty"
    ]
}
```

_Response (401 - Unauthenticated)_
```
{
    "messages": [
        "401 Unauthenticated access"
    ]
}
```

_Response (404 - Bad Request)_
```
{
    "messages": [
        "404 Todo Not Found"
    ]
}
```

_Response (500 - Internal Server)_
```
{
    "messages": [ "500 Internal Error" ]
}
```

## PUT /todos/:id

_Request Params_
```
Required:

id : [INTEGER]
```

_Request Header_
```
{
    access_token : <access_token user login>
}
```

_Request Body_
```
{
    "title": <STRING>,
    "content": <TEXT>,
    "tag": <STRING>
}
```

_Response (200 - Success)_
```
[
    {
        "id": 8,
        "title": "trial edit ",
        "content": "trial edit for api doc",
        "tag": "Other",
        "status": "In Progress",
        "UserId": 3,
        "createdAt": "2021-10-21T13:56:12.884Z",
        "updatedAt": "2021-10-21T23:03:21.271Z"
    }
]
```

_Response (400 - Bad Request)_
```
{
    "messages": [
        "Title can't be empty",
        "Content can't be empty",
        "Tag can't be empty"
    ]
}
```

_Response (401 - Unauthenticated)_
```
{
    "messages": [
        "401 Unauthenticated access"
    ]
}
```

_Response (404 - Bad Request)_
```
{
    "messages": [
        "404 Todo Not Found"
    ]
}
```

_Response (500 - Internal Server)_
```
{
    "messages": [ "500 Internal Error" ]
}
```

## DELETE /todos/:id

_Request Params_
```
Required:

id : [INTEGER]
```

_Request Header_
```
{
    access_token : <access_token user login>
}
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
{
    "message": "Todo success to delete"
}
```

_Response (401 - Unauthenticated)_
```
{
    "messages": [
        "401 Unauthenticated access"
    ]
}
```

_Response (404 - Bad Request)_
```
{
    "messages": [
        "404 Todo Not Found"
    ]
}
```

_Response (500 - Internal Server)_
```
{
    "messages": [ "500 Internal Error" ]
}
```
