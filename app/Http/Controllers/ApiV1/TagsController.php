<?php

namespace App\Http\Controllers\ApiV1;

use Illuminate\Http\Request;
use App\PostTag;
use Validator;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use App\Http\Resources\TagShort;

class TagsController extends Controller
{
    /**
     * Проверка прав доступа.
     */    
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if(\App\UserRules::checkAccess($request, new PostTag)){
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
        return TagShort::collection(PostTag::all());
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
            'title' => 'required|min:3|max:25'
        ]);

        if($validator->fails()) {
            return [
                "status" => "error",
                "message" => "ValidateError",
                "errors" => $validator->messages()->all()
            ];
        }        

        if(PostTag::findDuble($request->get('title'))){
            return [
                "status" => "error",
                "message" => "ValidateError",
                "errors" => ['Найден дубликат заданного названия тега']
            ];
        }

        $tag = PostTag::add($request->all());

        if($tag) return ["status" => "ok"];
        return [
            "status" => "error",
            "message" => "SaveError",
            "errors" => $tag->errors()
        ];
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
        $tag = PostTag::find($id);
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:3|max:25'
        ]);

        if($validator->fails()) {
            return [
                "status" => "error",
                "message" => "ValidateError",
                "errors" => $validator->messages()->all()
            ];
        }           

        if(PostTag::findDuble($request->get('title'))){
            return [
                "status" => "error",
                "message" => "ValidateError",
                "errors" => ['Найден дубликат заданного названия тега']
            ];
        }

        if($tag->edit($request->all())){
            return ["status" => "ok"];
        }

        return [
            "status" => "error",
            "message" => "SaveError",
            "errors" => $tag->errors()
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
        if(PostTag::find($id)->delete()){
            return ["status" => "ok"];
        }

        return ["status" => "error"];
    }
}
