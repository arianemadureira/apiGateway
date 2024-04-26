class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    
    isValidName() {
        return this.name != null && this.name != "";
    }

    isValidEmail() {
        return !String(this.email)
        .toLocaleLowerCase()
        .match('^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');
    }
}

module.exports = User;
