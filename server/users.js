class Users {
  constructor () {
    this.users = []  
  }
  add (user) {
    this.users.push(user)
  }

  get (id) {
    return this.users.find(user => user.id === id)
  }

  remove (id) {
    const user = this.get(id)
    if (user) { this.users = this.users.filter(u => u.id !== id) }
    return user
  }

  getByRoom (room) {
    return this.users.filter(u => u.room === room)
  }
}

module.exports = () => new Users()