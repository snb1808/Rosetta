class API {

    static init () {
        this.baseURL = "http://localhost:3001/api/v1"
        this.usersURL = this.baseURL + '/users'
        this.languagesURL = this.baseURL + '/languages'
        this.chatsURL = this.baseURL + '/chats'
        this.messagesURL = this.baseURL + '/messages'
        this.loginURL = this.baseURL + '/login'
        this.profileURL = this.baseURL + '/profile'
    }

    static login (user) {
        return this.post(this.loginURL, { user })
    }

    static createUser (user) {
        return this.post(this.usersURL, { user })
    }

    static getCurrentUser () {
        return this.get(this.profileURL)
    }

    static getUser (id) {
        return this.get(this.usersURL + `/${id}`)
    }

    static getLanguages () {
        return this.get(this.languagesURL)
    }

    static getChats () {
        return this.get(this.chatsURL)
    }

    static getChat (id) {
        return this.get(this.chatsURL + `/${id}`)
    }

    static getMessages () {
        return this.get(this.messagesURL)
    }

    static postMessage (message) {
        return this.post(this.messagesURL, message)
    }

    static async get (url) {
        return await fetch(url, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(resp => resp.json())
    }

    static post (url, data) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(data)
        }).then(data => data.json())
    }

}

API.init()

export default API

