'use strict';
var db_controller   = require('./database.js')
const db_promise    = db_controller("test")

// const store ={
//     0: {
//         "id": 0,
//         "name": "harrison",
//          "age": 25
//     },
//     1: {
//         "id": 1,
//         "name": "harrison1",
//         "age": 24
//     }

// };

let id = 0;
exports.newPost = function(obj){
    // prepare a new Post

    // const o = {id: id++};
    // o.name = obj.name;
    // o.age = obj.age;
    // store[o.id] = o;

    // return o;


    const my_post = {id:id++};
    my_post.title = obj.title;
    my_post.body = obj.body;
    my_post.genre = obj.genre;
    my_post.author = obj.author;

    return my_post;
};

exports.getUserPosts = function(userObj){
    // get all the posts for a user object (posts written by that user)
    const keys = Object.keys(store);
    const result = [];
    keys.forEach(function(key){
        result.push(store[key]);
    });
    return result;
}


exports.getGroupPosts = function(groupObj){
    // get all the posts for a group of users

}
//Good reference for the hw, delete when done