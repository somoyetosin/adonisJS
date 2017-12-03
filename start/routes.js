'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.on('/').render('home')
//Route pinpointing to the index method inside the PostController Class
//route to show all posts
Route.get('/posts', 'PostController.index')
//route to add new post page
Route.get('/posts/add', 'PostController.add')
//route to update post page
Route.get('/posts/edit/:id', 'PostController.edit')
//route to show specific post
Route.get('/posts/:id', 'PostController.details')
//route to save post
Route.post('/posts', 'PostController.store')
//route to process update
Route.put('/posts/:id', 'PostController.update')
//route to process delete
Route.delete('/posts/:id', 'PostController.destroy')

