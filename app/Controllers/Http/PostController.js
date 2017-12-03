'use strict'

//bringing in model
const Post = use('App/Models/Post')
//bringing in Validator
const { validate } = use('Validator')

class PostController {
    // index method (async)
    async index({ view }) {
        //getting all posts
        const posts = await Post.all()

        //used redirecting to a page, posts.index is same as posts/index
        return view.render('posts.index', {
            title: "Index Page Params",
            posts: posts.toJSON()
        })   
    }
    //method used for showing post based on id
    async details({ params, view }) {
        const post = await Post.find(params.id)
        //redirecting to the details page
        return view.render('posts.details', {
            post: post
        })
    }

    //method used for adding post into database
    async add({ view }) {
        //redirect to the add page
        return view.render('posts.add')
    }

    async store({ request, response, session }) {
        //Validating inputs
        const validation = await validate(request.all(), {
            title: 'required|min:3|max:255',
            body: 'required|min:3'
        });

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        //creating post instance
        const post = new Post()
        //accepting inputs
        post.title = request.input('title')
        post.body = request.input('body')
        //saving inputs
        await post.save()
        //flash message after submission
        session.flash({ notification: 'Post Added'})
        //redirect to post page
        return response.redirect('/posts')
    }

    //showing post from database into input field
    async edit({ params, view }) {
        //fetching from the database
        const post = await Post.find(params.id)
        //redirect to the edit page
        return view.render('posts.edit', {
            post: post
        })
    }

    //updating post
    async update({ params, request, response, session }) {
        //Validating inputs
        const validation = await validate(request.all(), {
            title: 'required|min:3|max:255',
            body: 'required|min:3'
        });

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const post =  await Post.find(params.id)

        post.title = request.input('title')
        post.body = request.input('body')
        //saving inputs
        await post.save()
        //flash message after submission
        session.flash({ notification: 'Post Updated'})
        //redirect to post page
        return response.redirect('/posts')
    }

    async destroy({ params, session, response }) {
        const post = await Post.find(params.id)
        //saving inputs
        await post.delete()
        //flash message after submission
        session.flash({ notification: 'Post Delete'})
        //redirect to post page
        return response.redirect('/posts')
    }
}

module.exports = PostController
