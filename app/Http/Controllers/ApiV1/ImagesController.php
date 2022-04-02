<?php

namespace App\Http\Controllers\ApiV1;

use App\Images;
use App\Category;
use Validator;
use Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ImageShort;

class ImagesController extends Controller
{
    /**
     * Проверка прав доступа.
     */    
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if(\App\UserRules::checkAccess($request, new Images)){
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
        if(\Auth::user()->is_admin == 1){
            return ImageShort::collection(Images::paginate(20));
        }else{
            return ImageShort::collection(Images::where('user_id', \Auth::user()->id)->paginate(20));
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(count($request->get('images')) < 1){
            return [
                "status" => "error",
                "message" => "IncorrectInputData"
            ];
        }

        $cat = $request->get('category_id') ?? null;

        foreach($request->get('images') as $image){
            $newimage = Images::add($image, $cat);
            if(!$newimage){
                dump($newimage);
                return response([
                    "status" => "error",
                    "message" => "ErrorSaveFile"
                ], 500)->header('Content-Type', 'application/json');
            }
        }
        
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
			'title' => 'required|min:5',
		]);

    	if($validator->fails()) {
    		return [
    			"status" => "error",
    			"message" => "IncorrectInputData"
    		];
 		}
        $image = Images::find($id);
        if(($image->user_id != Auth::user()->id) && (Auth::user()->is_admin == 0)){
            return [
                "status" => "error",
                "message" => "NotEnoughRights"
            ];            
        }

        $image->edit($request->all());
        $image->setCategory($request->get('category_id'));
        $image->toggleVisibility($request->get('status'));
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
        $image = Images::find($id);
        if(($image->user_id != Auth::user()->id) && (Auth::user()->is_admin == 0)){
            return [
                "status" => "error",
                "message" => "NotEnoughRights"
            ];            
        }
        $image->remove();
        return [
        	"status" => "ok"
        ];
    }
}
