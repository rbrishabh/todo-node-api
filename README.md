# todo-node-api
# Creating todo app using node.
Use api usong postman.


# Make requests at https://secure-citadel-23147.herokuapp.com/todos,

# Creating new user (POST request)
To make new user, send JSON data email and password to 
https://secure-citadel-23147.herokuapp.com/users. You will recieve an x-auth token.



# Login (POST request)
To login, send JSON data email and password that already exists to https://secure-citadel-23147.herokuapp.com/users/login and you will recieve an x-auth token.

# Know who you are (GET request)
To know which user you are logged in as, send your x-auth token in the header file.
You will recieve the login and password of current user.

# POST todos

Create a new Todo by posting text and completedAt boolean JSON data to https://secure-citadel-23147.herokuapp.com/todos, with your x-auth token in header.

# GET todos

To read your current todos, send a GET request from postman to https://secure-citadel-23147.herokuapp.com/todos with your x-auth token in header. 

# Update Todos

To update a todo, send the data of text or completedAt with x-auth token as a PATCH request in postman to https://secure-citadel-23147.herokuapp.com/todos/`${id}`

#Remove Todo

To remove a todo, send a DELETE request form postman to https://secure-citadel-23147.herokuapp.com/todos/`${id}` with your x-auth token as header. Todo will be removed.

