# crmapp
## Customer Realation Management APP
This project is node.js back-end for a crmapp
application that can create various entities like users and tickets.

<br/>

## Features

> **Account Creation**
- You can create accounts for Customer, Engineer and Admin.
- If the user is a customer the accout will automatically be approved on verification.
- user will be Engineer for accounts status we will wait for the approve by the admin.
- we are using the JSON Web Token JWT are used for authentication and authorization.

> **Ticket**
- User can create the tickets.
- tickets will be assignee to engineer.
- ticket as a status "OPEN" , "CLOSED" or "BLOCKED".
- the engineer will access only those tickets that are assignee themselves.
- Admin can access All of the tickets.
- Customer can access only those of  tickets they are create itself.
 
 > **Email**
 -- Email notification  when the ticket are created. they send a email to Customer who's created ticket and engineer is assignee there ticket and admin also.
<br/>

# Dependencies
|npm modules|
|-|
|express|
|mongoose|
|jsonwebtoken|
|node-rest-client|
|dotenv|
|body-parser|
|bcrypt|
|jest|
|mongodb-memory-server|
|supertest|

<br/>
---

## Installation
This app requires [Node.js](https://nodejs.org/) v14+ to run.
[Mongodb](https://www.mongodb.com/try/download/community)
before installing the application we required to one more application to Start
[NotificationsService](https://github.com/sayyedaaman2/notificationService)


Install the dependencies and devDependencies and 
start the server
```sh
cd crmapp
npm install
npm start
```
<br/>

### REST API endpoints

### 1.1 SignUp request Customer

```sh
POST /crm/api/v1/auth/signup

sample request body : 
{
    "name": "test2",
    "userId" : "test2",
    "password": "test1234",
    "email" : "test2@gmail.com",
    "userType" : "CUSTOMER"
}

sample response body : 
{
    "name": "test2",
    "userid": "test2",
    "email": "test2@gmail.com",
    "userType": "CUSTOMER",
    "userStatus": "APPROVED",
    "createdAt": "2022-09-27T08:42:14.151Z",
    "updatedAt": "2022-09-27T08:42:14.152Z"
}
```

---

### 1.2 SignUp request Engineer

```sh
POST /crm/api/v1/auth/signup

sample request body : 
{
    "name": "test3",
    "userId" : "test3",
    "password": "test1234",
    "email" : "test3@gmail.com",
    "userType" : "ENGINEER"
}

sample response body : 
{
    "name": "test3",
    "userid": "test3",
    "email": "test3@gmail.com",
    "userType": "ENGINEER",
    "userStatus": "PENDING",
    "createdAt": "2022-09-27T08:43:36.341Z",
    "updatedAt": "2022-09-27T08:43:36.341Z"
}
```

---

### 2. Sign In

```sh
POST /crm/api/v1/auth/signin

sample request body : 
{
   "userId" : "admin",
   "password" : "test1234"
}

sample response body : 
{
    "name": "admin",
    "userId": "admin",
    "email": "admin123@gmail.com",
    "userType": "ADMIN",
    "userStatus": "APPROVED",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjY0MjY4MzM3LCJleHAiOjE2NjQyNjg5Mzd9.XtC6VfYSA-RJ70-ijbw3J09uLwxAkj3Ii2-HJ_0oDMQ"
}
```

---

### 3. Update the engineer status

```sh
PUT /crm/api/v1/users/:id

parameters : id : test3
sample request body : 
{    
    "userType" : "ENGINEER",
    "userStatus" : "APPROVED"
}

sample response body : 
{
    "name": "test3",
    "userId": "test3",
    "email": "test3@gmail.com",
    "userType": "ENGINEER",
    "userStatus": "APPROVED"
}
```

---

### 4. Get User By Id (Admin or User itself)

```sh
GET /crm/api/v1/users/:id

parameters : id : test3
sample request body : {}

sample response body : 
{
    "name": "test3",
    "userId": "test3",
    "email": "test3@gmail.com",
    "userType": "ENGINEER",
    "userStatus": "APPROVED"
}
```

---

### 5. Get User All (only Admin)

```sh
GET /crm/api/v1/users

sample request body : {}

sample response body : 
[
    {
        "name": "admin",
        "userid": "admin",
        "email": "admin123@gmail.com",
        "userTypes": "ADMIN",
        "userStatus": "APPROVED"
    },
    {
        "name": "test3",
        "userid": "test3",
        "email": "test3@gmail.com",
        "userTypes": "ENGINEER",
        "userStatus": "APPROVED"
    }
]
```

---

### 6. Create Tickets

```sh
POST /crm/api/v1/tickets/

sample request body : 
{
    "title" : " website problem",
    "description": "Some error happen in the website "
}

sample response body : 
{
    "title": " website problem",
    "ticketPriority": 4,
    "description": "Some error happen in the website ",
    "status": "OPEN",
    "reporter": "admin",
    "assignee": "test3",
    "_id": "6332ba6bfc1a81c4dfca1df9",
    "createdAt": "2022-09-27T08:55:07.594Z",
    "updatedAt": "2022-09-27T08:55:07.595Z"
}
```

---

### 7. Update Tickets

```sh
PUT /crm/api/v1/tickets/:id

parameters : id : 62f898e3b516f1852110e976
sample request body : 
{
    "title" : " test2 updated",
    "description": "updated by test2  updated"
   
}
sample response body : 
{
    "_id": "6332ba6bfc1a81c4dfca1df9",
    "title": " test2 updated",
    "ticketPriority": 4,
    "description": "updated by test2  updated",
    "status": "OPEN",
    "reporter": "admin",
    "assignee": "test3",
    "createdAt": "2022-09-27T08:55:07.594Z",
    "updatedAt": "2022-09-27T08:55:07.595Z"
}
```

---

### 7. Get Tickets All tickets 
--- when the Customer call this api they return the tickets which Customer created
-- or Engineer call the api they return the Assignee or created tickets
-- for Admin the fetch all the tickets.

```sh
GET /crm/api/v1/tickets/

sample request body : {}
sample response body : 
{
    "userType": "ADMIN",
    "tickets": [
        {
            "_id": "6332ba6bfc1a81c4dfca1df9",
            "title": " test2 updated",
            "ticketPriority": 4,
            "description": "updated by test2  updated",
            "status": "OPEN",
            "reporter": "admin",
            "assignee": "test3",
            "createdAt": "2022-09-27T08:55:07.594Z",
            "updatedAt": "2022-09-27T08:55:07.595Z"
        }
    ]
}
```

---
### POSTMAN Collection [link](https://www.getpostman.com/collections/01cbed79c01003205223)
