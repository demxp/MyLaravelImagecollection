<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\{
	Comment,
	BlogPost
};
use Validator;
use App\Http\Resources\CommentShort;

class CommentController extends Controller
{
    public function savePostComment(Request $request, $postSlug)
    {
        $validator = Validator::make($request->all(), [
            'postId' 		=> 'required|numeric',
            'topCommentId'	=> 'required|numeric',
            'email'			=> 'required|email:rfc',
            'name'			=> 'required|min:3|max:100',
            'content'		=> 'required|min:10|max:1024'
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

        if($post->commenting != 1) return [
            "status" => "error",
            "message" => "Post not commentable"
        ];

        if($newComment = Comment::add($commentData)){
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
        	'data' => Comment::getByPost($post->id)
        ];
    }

    public function deletePostComments(Request $req, $slug)
    {
    	$post = BlogPost::where('slug', $slug)->first();

    	if(!$post) return [
            "status" => "error",
            "message" => "Post not found"
        ];

        if(Comment::deleteComment($req->all())) return [
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
            'allowEdit'		=> 'required|string',
            'content'		=> 'required|min:10|max:1024'
        ]);

        if($validator->fails()) {
            return [
                "status" => "error",
                "message" => "ValidateError",
                "errors" => $validator->messages()->all()
            ];
        }

        if($comm = Comment::editComment($req->all())) return [
        	'status' => 'ok',
        	'data'	=> new CommentShort($comm)
        ];

        return [
        	'status' => 'error'
        ];
    }    
}
