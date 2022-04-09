<?php

namespace App\Http\Controllers\ApiV1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryShort;
use App\Category;
use Validator;
use Auth;

class CategoriesController extends Controller
{
    /**
     * Проверка прав доступа.
     */    
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if(\App\UserRules::checkAccess($request, new Category)){
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
        return CategoryShort::collection(Category::orderBy('id')->get());
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
            'title' => 'required|min:3',
        ]);

        if($validator->fails()) {
            return [
                "status" => "error",
                "message" => "ValidateError",
                "errors" => $validator->messages()->all()
            ];
        }

        Category::add($request->all());
        return [
            'status' => 'ok'
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
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|min:3',
            'hidden' => 'sometimes',
            'titleimage' => 'sometimes|integer',
        ]);

        if($validator->fails()) {
            return [
                "status" => "error",
                "message" => "ValidateError",
                "errors" => $validator->messages()->all()
            ];
        }

        $category = Category::find($id);
        foreach($request->all() as $key=>$param){
            $category->$key = $param;
        }
        $category->save();

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
        Category::find($id)->delete();
        return [
            "status" => "ok"
        ]; 
    }
}
