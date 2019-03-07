class API {

    static init () {
        this.baseURL = "http://10.218.5.114:3001/api/v1"
        this.usersURL = this.baseURL + '/users'
        this.languagesURL = this.baseURL + '/languages'
        this.chatsURL = this.baseURL + '/chats'
        this.userChatsURL = this.baseURL + '/userchats'
        this.messagesURL = this.baseURL + '/messages'
        this.loginURL = this.baseURL + '/login'
        this.profileURL = this.baseURL + '/profile'
        this.contactURL = this.baseURL + '/contact_list'
        this.translationsURL = this.baseURL + '/translations'
        this.lastMessageURL = this.baseURL + '/last_message'
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

    static getContactList () {
        return this.get(this.contactURL)
    }

    static getUser (id) {
        return this.get(this.usersURL + `/${id}`)
    }

    static getUsers () {
        return this.get(this.usersURL)
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

    static createChat (idArray) {
        return this.post(this.chatsURL, { ids: idArray })
    }

    static getMessages () {
        return this.get(this.messagesURL)
    }

    static getLastMessage (chat_id) {
        return this.post(this.lastMessageURL, chat_id)
    }

    static getTranslations () {
        return this.get(this.translationsURL)
    }

    static getUserChat (data) {
        return this.post(this.userChatsURL, data)
    }

    static postMessage (message) {
        return this.post(this.messagesURL, message)
    }

    static patchUser (id, data) {
        return this.patch(this.usersURL + `/${id}`, data)
    }

    static patchRead (data) {
        return this.patch(this.userChatsURL, data)
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

    static patch (url, data) {
        return fetch(url, {
            method: 'PATCH',
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

