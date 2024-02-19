

export default class userModal{
    static users = [
        {
            id: 1,
            name: "Vishal MA",
            email: "mavishal1648@gmail.com",
            password: "vishal1648",
        },
    ];

    constructor(id,name,email,password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        userModal.users.push(id,name,email,password);
    }

    static addUser = (user)=>{
        userModal.users.push(user);
    }

    static get = ()=>{
        return userModal.users;
    }

    static confirmLogin = (user)=>{
        return userModal.users.find((u)=>u.email===user.email);
    }

}
