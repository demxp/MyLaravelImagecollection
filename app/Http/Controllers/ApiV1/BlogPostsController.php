<?php

namespace App\Http\Controllers\ApiV1;

use App\BlogPost;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostShortCollection;
use Validator;

class BlogPostsController extends Controller
{
    /**
     * Проверка прав доступа.
     */    
    public function __construct()
    {
        $this->middleware(function($request, $next) {
            if(\App\UserRules::checkAccess($request, new BlogPost, true)){
                return $next($request);
            }

            return response([
                "status" => "error",
                "message" => "NotEnoughRights"
            ], 403)->header('Content-Type', 'application/json');
        });
    }  

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new PostShortCollection(
                BlogPost::orderByRaw('(CASE WHEN publication = 0 THEN id END) DESC')
                ->orderBy('publication_date', 'desc')
                ->paginate(20)
            );
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
            'title' => 'sometimes|required|min:3|max:150',
            'content' => 'sometimes|required|min:3'
        ]);

        if($validator->fails()) {
            return [
                "status" => "error",
                "message" => "ValidateError",
                "errors" => $validator->messages()->all()
            ];
        }           

        $post = BlogPost::add($request->all());

        if($post) return ["status" => "ok"];
        return [
            "status" => "error",
            "message" => "SaveError",
            "errors" => $post->errors()
        ];        
    }

    /**
     * Get BlogPost data.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return BlogPost::find($id)->toArray();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $BlogPost = BlogPost::find($id);
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|min:3|max:150',
            'content' => 'sometimes|required|min:3',
            'publication' => 'sometimes|required|numeric',
            'commenting' => 'sometimes|required|numeric'
        ]);

        if($validator->fails()) {
            return [
                "status" => "error",
                "message" => "ValidateError",
                "errors" => $validator->messages()->all()
            ];
        }           

        $BlogPost->edit($request->all());

        return [
            "status" => "ok"
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        BlogPost::find($id)->remove();
        return [
            "status" => "ok"
        ];
    }
}