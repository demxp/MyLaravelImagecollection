<?php

namespace App\Http\Controllers\ApiV1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Category;
use Auth;
use Validator;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Category::all()->toArray();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.categories.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required'
        ]);
        Category::create($request->all());
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
        if(is_null($request->get('titleimage'))){
            $validator = Validator::make($request->all(), [
                'title' => 'required|min:3',
                'hidden' => 'required'
            ]);
            $editparams = ['title', 'hidden'];
        }else{
            $validator = Validator::make($request->all(), [
                'titleimage' => 'required|integer',
            ]);
            $editparams = ['titleimage'];
        }

        if($validator->fails()) {
            return [
                "status" => "error",
                "message" => "IncorrectInputData"
            ];
        }

        $category = Category::find($id);
        foreach($editparams as $param){
            $category->$param = $request->get($param);    
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
