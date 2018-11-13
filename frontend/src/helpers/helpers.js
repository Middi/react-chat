const fetchUsers = () => { 
    const arr = [];
    fetch("/users")
        .then(res => res.json())
        .then(users => {
            arr.push(users.forEach(user => user.username));
        })
        .catch(err => {
            console.log(err)
        });
    return arr;
}

module.exports = fetchUsers;