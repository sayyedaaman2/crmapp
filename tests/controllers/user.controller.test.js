/**
 * This file will contain the unit testing for all the methods
 * of user controller
 */

/**
 * Let's try to test the method findAll()
 *
 *      - happy path test
 *      - test based on the query param
 *      - Negative scenarion
 */

const { findAll , findByUserId , update } = require("../../controllers/user.controller");
const User = require("../../models/user.model");
const { mockRequest, mockResponse } = require("../interceptor");

const userTestPayload = {
    name: "Test",
    userId: "Test01",
    email: "test@gmail.com",
    userType: "CUSTOMER",
    userStatus: "APPROVED",
    ticketsCreated: [],
    ticketsAssigned: [],
};
const updateUserTestPayload = {
    name: "test02",
    userId: "Test01",
    email: "test@gmail.com",
    userType: "ENGINEER",
    userStatus: "PENDING"
}
describe("test findAll method", () => {
    it("test the scenario when no query param is passed", async () => {
        /**
         *
         * First we are doing the setup for the project
         */

        /**
         * Mock User.find method
         */
        const userSpy = jest
            .spyOn(User, "find")
            .mockReturnValue(Promise.resolve([userTestPayload]));

        //Mock req and res objects as well
        const req = mockRequest();
        const res = mockResponse();

        req.query = {}; //We need to provide the mock implementation

        /**
         * Actual Execution
         */

        await findAll(req, res);

        /**
         * Assertions
         */

        // I need to verify that userSpy was called in the execution
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "Test",
                }),
            ])
        );
    });

    it("test the scenarion when user status is passed in query param", async () => {
        /**
         * Mock User.find method
         */
        const userSpy = jest
            .spyOn(User, "find")
            .mockReturnValue(Promise.resolve([userTestPayload]));

        //Mock req and res objects as well
        const req = mockRequest();
        const res = mockResponse();

        req.query = { userStatus: "APPROVED" };

        await findAll(req, res);

        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    userStatus: "APPROVED",
                }),
            ])
        );
    });

    /**
     * Test one negative or error case
     */

    it("error while calling the User.find method", async () => {
        /**
         * mock the error scenario
         */
        const userSpy = jest
            .spyOn(User, "find")
            .mockReturnValue(Promise.reject(new Error("error")));

        //Mock req and res objects as well
        const req = mockRequest();
        const res = mockResponse();
        req.query = { userStatus: "APPROVED" };

        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message: "Internal server error",
        });
    });
});

describe("test findByuserId method", () => {
    it("test the scenario when userId passed", async ()=>{

        const userSpy = jest.spyOn(User, "find").mockReturnValue(Promise.resolve([userTestPayload]));

        const req = mockRequest();
        const res = mockResponse();

        req.params = { userId : "Test01" };

        await findByUserId(req, res);

        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "Test",
                }),
            ])
        );

    });

    it("test  the scenario when userId is wrong ", async ()=>{

        const userSpy = jest.spyOn(User, "find").mockReturnValue(Promise.reject([userTestPayload]));

        const req = mockRequest();
        const res = mockResponse();

        req.params = { userId : "Test02" };

        await findByUserId(req, res);

        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message: "Internal Server Error"
        });

    });
});

describe("Test update method", ()=>{

    // it("test the update function ", async ()=>{

    //     const userSpy = jest.spyOn(User, "findOne").mockReturnValue(Promise.resolve([userTestPayload]));
        

    //     const req = mockRequest();
    //     const res = mockResponse();
    //     req.params = { userId : "Test01" };
    //     req.body = {
    //         name : "test02",
    //         userStatus : "ENGINEER",
    //         userType : "PENDING"
    //     }

    //     await update(req, res);
    //     expect(userSpy).toHaveBeenCalled();
        
    //     expect(res.status).toHaveBeenCalledWith(200);
    //     expect(res.send).toHaveBeenCalledWith({
    //         name: "test02",
    //         userId: "Test01",
    //         email: "test@gmail.com",
    //         userType: "ENGINEER",
    //         userStatus: "PENDING"
    //     })
    // })

    it("test the update function for error senario ", async ()=>{

        const userSpy = jest.spyOn(User, "findOne").mockReturnValue(Promise.reject(new Error("error")));
        

        const req = mockRequest();
        const res = mockResponse();
        req.params = { userId : "Test02" };
        req.body = {
            name : "test02",
            userStatus : "ENGINEER",
            userType : "PENDING"
        }

        await update(req, res);
        expect(userSpy).toHaveBeenCalled();
        
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message: "Internal Server Error"
        })
    })
})