// const { resolve } = require('path')
const { init } = require('../dbConfig.js')
const { ObjectId } = require('mongodb')


class Post {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.name = data.name
        this.story = data.story
        this.date = data.date
    }

    static get all() {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init()
                const postData = await db.collection('post').find().toArray()
                // console.log("*******************")
                // console.log(postData)
                // console.log("*******************")
                const posts = postData.map(p => new Post({ ...p, id: p._id }))
                // if (!posts.length) {throw new Error("No posts here")}
                console.log(posts)
                resolve(posts)
            } catch (err) {
                reject(`Error retrieving posts`)
            }
        })
    };

    static findById(id) {
        console.log("*******************", id)
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                console.log(" fhwjkfhkjfhdjkfh ********************************")
                let postData = await db.collection('post').find({ _id: ObjectId(id) }).toArray()
                console.log("*******************")
                console.log(postData)
                console.log("*******************")
                let post = new Post({ ...postData[0], id: postData[0]._id });
                resolve(post);
            } catch (err) {
                reject('Post not found');
            }
        });
    }


    static create(title, name, story, date) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                let postData = await db.collection('post').insertOne({title, name, story, date})
             //   console.log('&&&&&&&&   &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
             //   console.log('hiiiiiiii',postData)
                // let newPost = new Post(postData)
              //  console.log('hiiiiiiii',newPost)
                resolve(postData);
            } catch (err) {
                reject(`Error creating posts`)
            }
        })
    }
}

module.exports = Post

