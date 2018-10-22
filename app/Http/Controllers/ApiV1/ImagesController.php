<?php

namespace App\Http\Controllers\ApiV1;

use App\Images;
use App\Category;
use App\Tag;
use Validator;
use Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ImagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(\Auth::user()->is_admin == 1){
            $images = Images::paginate(20)->toArray();
        }else{
            $images = Images::where('user_id', \Auth::user()->id)->paginate(20)->toArray();
        }

        $categories = Category::all();
        $images_array = $images['data'];
        unset($images['data']);
        return ['images' => $images_array, 'categories' => $categories, 'pagesinfo' => $images];
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
            'title' => 'required',
            'image' => 'required'
        ]);

        $newimage = Images::add($request->all());
        $newimage->setCategory($request->get('category_id'));
        $newimage->toggleVisibility($request->get('status'));
        
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
