const Post = require('../models/postModel')
const responseBody = require('../helper/response')
const mongoose = require('mongoose');


exports.createPost = async (req, res, next) => {
    debugger
    try {
        const ownerId = req.user.id
        const {text, imageArr} = req.body
        const date = new Date();
        const newPost = new Post({ownerId, text, imageArr, date})
        newPost.save()
        debugger
        res.status(200).json(responseBody(0, newPost, "Post has been created"))
    } catch (error) {
        next(error)
    }
}

exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({})
        res.status(200).json(responseBody(0, posts, 'Success'))
    } catch (error) {
        next(error)
    }
}

exports.getPost = async (req, res, next) => {
    try {
        const postId = req.params.postId
        const post = await Post.findById(postId);
        res.status(200).json(responseBody(0, post, "Success"))
    } catch (error) {
        next(error)
    }
}


exports.updatePost = async (req, res, next) => {
    try {
        const postId = req.params.postId
        await Post.findByIdAndUpdate(postId, req.body)
        const updatedPost = await Post.findById(postId)
        res.status(200).json(responseBody(0, updatedPost, "Post has been updated"))
    } catch (error) {
        next(error)
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const postId = req.params.postId
        await Post.findByIdAndDelete(postId)
        res.status(200).json(responseBody(0, {}, "Post has been deleted"))
    } catch (error) {
        next(error)
    }
}

exports.likePost = async (req, res, next) => {
    try {
        const myId = req.user.id
        const postId = req.params.postId
        post = await Post.findById(postId)
        likedArr = post.likes
        await Post.findByIdAndUpdate(postId, {$push: {likes: myId}, isLiked: true})
        const updatedPost = await Post.findById(postId)
        res.status(200).json(responseBody(0, updatedPost, "Post has been liked"))
    } catch (error) {
        next(error)
    }
}

exports.unLikePost = async (req, res, next) => {
    try {
        const myId = req.user.id
        const postId = req.params.postId
        post = await Post.findById(postId)
        await Post.findByIdAndUpdate(postId, {$pull: {likes: myId}, isLiked: false})
        const updatedPost = await Post.findById(postId)
        res.status(200).json(responseBody(0, updatedPost, "Post has been unLiked"))
    } catch (error) {
        next(error)
    }
}
