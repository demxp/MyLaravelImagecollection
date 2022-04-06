<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\{
	Comment,
	BlogPost
};
use Validator;
use App\Http\Resources\CommentShort;
use App\Http\Controllers\Controller;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if(\Auth::user()->is_admin == 1) return $next($request);
            return response([
                "status" => "error",
                "message" => "NotEnoughRights"
            ], 403)->header('Content-Type', 'application/json');
        });
    }      

    public function savePostComment(Request $request, $postSlug)
    {
        $validator = Validator::make($request->all(), [
            'postId' 		=> 'required|numeric',
            'topCommentId'	=> 'required|numeric',
            'content'		=> 'required|min:10|max:'.config('app.commentLimit')
        ]);

        if($validator->fails()) {
            return [
                "status" => "error",
                "message" => "ValidateError",
                "errors" => $validator->messages()->all()
            ];
        }

    	$commentData = $request->all();
    	$post = BlogPost::where('id', (integer)$commentData['postId'])->first();

    	if(!$post) return [
            "status" => "error",
            "message" => "Post not found"
        ];

        if($post->slug != $postSlug) return [
            "status" => "error",
            "message" => "Post not found"
        ];

        if($newComment = Comment::add($commentData, \Auth::user())){
        	return new CommentShort($newComment);
        }

        return [
            "status" => "error",
            "message" => "Comment not saved"
        ];
    }

    public function getPostComments($slug)
    {
    	$post = BlogPost::where('slug', $slug)->first();

    	if(!$post) return [
            "status" => "error",
            "message" => "Post not found"
        ];

        return [
        	'status' => 'ok',
        	'data' => Comment::getByPost($post->id, BlogPost::COMMENTING_ALLOW_ALL)
        ];
    }

    public function deletePostComments(Request $req, $slug)
    {
    	$post = BlogPost::where('slug', $slug)->first();

    	if(!$post) return [
            "status" => "error",
            "message" => "Post not found"
        ];

        if(Comment::deleteComment($req->all(), \Auth::user())) return [
        	'status' => 'ok'
        ];

        return [
        	'status' => 'error'
        ];
    }    

    public function editPostComments(Request $req, $slug)
    {
        $validator = Validator::make($req->all(), [
            'id'	 		=> 'required|numeric',
            'content'		=> 'sometimes|min:10|max:'.config('app.commentLimit'),
            'commentStatus' => 'sometimes|numeric'
        ]);

        if($validator->fails()) {
            return [
                "status" => "error",
                "message" => "ValidateError",
                "errors" => $validator->messages()->all()
            ];
        }

        if($comm = Comment::editComment($req->all(), \Auth::user()))return [
        	'status' => 'ok',
        	'data'	=> new CommentShort($comm)
        ];

        return [
        	'status' => 'error'
        ];
    }    
}
