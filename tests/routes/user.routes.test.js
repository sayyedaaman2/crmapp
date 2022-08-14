/**
 * This file is going to contain the logic for the intergation
 * testing of user.routes.test.js
 */

const db = require('../db');
const jwt = require('jsonwebtoken');
const config = require('../../configs/auth.config');
const request = require('supertest');
const app = require('../../server');
const User = require('../../models/user.model');
/**
 * This will be used to do the intial setup of the project
 */

let token ;
beforeAll( async ()=>{
    //Generating the token to be used for sending the request for Auth
    token = jwt.sign({id : "testid"}, config.secret, {
        expiresIn :120
    });
    /**
     * Insert the data inside the test db
     */

    console.log("Before all test");
    await db.clearDatabase();

    await User.create({
        name : "Test01",
        userId : "testid",
        email : "test01@gmail.com",
        userType : "ADMIN",
        password : "TEST1234",
        userStatus : "APPROVED"
    });

})
/**
 * Cleaup of th project when everything is completed
 */
afterAll (async ()=>{
    console.log("After all the code has been executed");
    await db.clearDatabase();
})
/**
 * Integration testing for the all users endpoing /cr/api/v1/users
 */

describe("Find all users", ()=>{
    
    it("find all the users", async ()=>{

        /**
         * 1.We need to have some data in the test DB | Done in the beforeAll method
         * 2.Generate the token using the sma login and use for the test
         * 
         */
        

        //Need to invoke the API -- We need to make use of supertest
        const res = await request(app).get("/crm/api/v1/users").set("x-access-token", token);

        

        //Code for the validation
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    "name" : "Test01",
                    "userid" : "testid",
                    "email" : "test01@gmail.com",
                    "userTypes" : "ADMIN",
                    "userStatus" : "APPROVED"
                })
            ])
        )

    });
});

describe ("Find user based in userId", ()=>{
    it("test the endpoint /crm/api/v1/users/:id " , async()=>{
         //Complete the code inside this.

        //Execution of the code
        const res = await request(app).get("/crm/api/v1/users/testid").set("x-access-token", token);

        //Validation of the code
        expect(res.statusCode).toEqual(200); 
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    "name" : "Test01",
                    "userid" : "testid",
                    "email" : "test01@gmail.com",
                    "userTypes" : "ADMIN",
                    "userStatus" : "APPROVED"
                })
            ])
        )
    });
});

// describe ("Update user based in userId", ()=>{
//     it("test the endpoint /crm/api/v1/users/:id " , async()=>{

        
        
//         //Execution of the code
//         const res = await request(app).put("/crm/api/v1/users/testid").set("x-access-token", token).send({name : 'test1'})

//         //Validation of the code
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toEqual(
//             expect.arrayContaining([
//                 expect.objectContaining({
//                     "name" : "Test01",
//                     "userid" : "testid",
//                     "email" : "test01@gmail.com",
//                     "userTypes" : "ADMIN",
//                     "userStatus" : "APPROVED"
//                 })
//             ])
//         )
//     });
// });