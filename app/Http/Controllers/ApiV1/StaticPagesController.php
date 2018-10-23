<?php

namespace App\Http\Controllers\ApiV1;

use Illuminate\Http\Request;
use App\StaticPages;
use Validator;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;

class StaticPagesController extends Controller
{
    /**
     * Проверка прав доступа.
     */    
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if(\App\UserRules::checkAccess($request, new StaticPages)){
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
        return StaticPages::all()->toArray();
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
            'slug' => 'required|alpha_num|unique:static_pages',
            'title' => 'required',
            'content' => 'required'
        ]);

        if($validator->fails()) {
            return [
                "status" => "error",
                "message" => "ValidateError",
                "errors" => $validator->messages()->all()
            ];
        }        

        StaticPages::add($request->all());

        return [
            "status" => "ok"
        ];
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return StaticPages::find($id);
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
        $page = StaticPages::find($id);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required',
            'slug' => [
                'required',
                'alpha_num',
                Rule::unique('static_pages')->ignore($page->id)
            ]
        ]);

        if($validator->fails()) {
            return [
                "status" => "error",
                "message" => "ValidateError",
                "errors" => $validator->messages()->all()
            ];
        }           

        $page->edit($request->all());
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
        StaticPages::find($id)->delete();
        return [
            "status" => "ok"
        ];
    }
}
