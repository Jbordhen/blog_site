<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $count = $request->query('count', 0);
        $post = Post::with(['user'])->latest()->skip($count * 10)->limit(10)->get();
        return $post;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'min:3', 'string'],
            'description' => ['required', 'min:3', 'string']
        ]);

        if ($validator->fails()) {
            return response([
                'error' => $validator->errors()
            ], 400);
        }

        $post = Post::create([
            'title' => $request->title,
            'description' => $request->description,
            'user_id' => auth()->user()->id,
        ]);

        return response($post, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        if ($post) {
            $post['comments'] = Comment::with('user:id,username')->where('post_id', $post->id)->latest()->get();
            return response($post, 200);
        }
        return response(['error' => 'No post found with this id.'], 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'min:3', 'string'],
            'description' => ['required', 'min:3', 'string']
        ]);

        if ($validator->fails()) {
            return response([
                'error' => $validator->errors()
            ], 400);
        }

        if ($post->user_id != auth()->user()->id) {
            return response([
                'error' => 'Not Allowed'
            ], 401);
        }

        if ($post) {
            $post->title = $request->title;
            $post->description = $request->description;
            $post->save();
        }

        return response($post, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return response([
            'message' => 'The post has been deleted successfully.'
        ], 200);
    }
}
