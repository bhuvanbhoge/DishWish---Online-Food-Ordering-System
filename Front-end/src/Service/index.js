
export const isLoggedIn = ()=>{
    let data = localStorage.getItem("data");

    if(data==null){
        return false;
    }else{
        return true;
    }
}

export const doLogin = (data, next = () => {}) => {
    if (!data) {
        console.error("Invalid data provided for login.");
        return;
    }
    localStorage.setItem("data", JSON.stringify(data));
    next();
};

export const doLogout = (next = () => {}) => {
    localStorage.removeItem("data");
    localStorage.removeItem("cart");
        
};

export const getCurrentUserDetail = ()=>{
    if(isLoggedIn()){
        console.log(JSON.parse(localStorage.getItem("data")));

        return JSON.parse(localStorage.getItem("data"));
        
    }else{
        return undefined;
    }
}