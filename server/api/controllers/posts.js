const express = require('express')

const router = express.Router()
const Post = require('../models/posts')

async function allPosts(req, res) {
    try {
        // console.log('al posts')
        const posts = await Post.all
        res.status(200).json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}

async function createPost(req, res) {
    try {
             // console.log("&&&&&&&&&&");
        // console.log(req.body.title, req.body.name, req.body.story, req.body.date);
        console.log("&&&&&&&&&&");
        const post = await Post.create(req.body.title, req.body.name, req.body.story, req.body.date)
        res.status(201).json(post)
         console.log("&&&&&&&&&&");
        // console.log(post);
        // console.log("&&&&&&&&&&");
    } catch (err) {
        res.status(404).json({ err })
    }
}

async function showPosts(req, res) {

    try {
        console.log('hereeeeeeeee', req.params.id)
        const post = await Post.findById(req.params.id)
        console.log('*****888888', post)
        res.status(200).json(post)
    } catch (err) {
        res.status(404).json({ err })
    }
}

module.exports = { allPosts, createPost, showPosts }

