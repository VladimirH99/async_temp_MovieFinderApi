function TimeoutPromise(time){
    return new Promise(function(resolve){
        window.setTimeout(resolve, time);
    });
}

/* global Promise */
async function userReg(){
    return TimeoutPromise(500).then(() => {
        if(Math.random() > 0.2){
            return {
                msg: "+ registration",
                id: 1
            };
        }
        else{
            throw new Error("error in registration");
        }
    })
    
}

async function userAuth(id){
    return TimeoutPromise(500).then(() => {
        if(Math.random() > 0.2){
            return {
                msg: "+ auth " + id,
                token: "ghegkjhjewhrklwejo"
            };
        }
        else{
            throw new Error("error in auth");
        }
    });
}

async function userData(token){
    return TimeoutPromise(500).then(() => {
        if(Math.random() > 0.2){
            return {
                msg: "+ data by token " + token,
                data: {
                    id: 1,
                    name: 'Some'
                }
            };
        }
        else{
            throw new Error("error in data");
        }
    });
}

export {userReg, userAuth, userData};