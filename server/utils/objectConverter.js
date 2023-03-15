exports.userResponse = (users)=>{

    userResult = [];

    users.forEach(user =>{
        userResult.push({
            name : user.name,
            userid : user.userId,
            email : user.email,
            image: user.image,
            userTypes : user.userType,
            userStatu : user.userStatus
        });
    });
    return userResult;
}

exports.singleUser = (user)=>{
    const userResult = {
        name: user.name,
        userId : user.userId,
        email: user.email,
        image: user.image,
        userType : user.userType,
        userStatus : user.userStatus
    }
    return userResult;
}