const users = [
    {'userId' : "sample@12.12",
    'userPw' : "1234"
    },
    {'userId' : "sample2@12.12",
    'userPw' : "1111"
    },  
]

export default function checkUser (userId, userPw) {
    for (const user of users){
        if (user.userId==userId && user.userPw==userPw){
            return true;
        }
        return false;
    }
}