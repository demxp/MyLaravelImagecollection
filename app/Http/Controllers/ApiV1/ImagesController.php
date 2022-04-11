<?php

namespace App\Http\Controllers\ApiV1;

use App\Images;
use App\Category;
use Validator;
use Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\{
    ImageShort,
    ImageThumb
};

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
        return $this->getImagesList(ImageShort::class);
    }

    public function getListThumbnails()
    {
        return $this->getImagesList(ImageThumb::class, $paginate=false);
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
			'title' => 'sometimes|min:5',
            'status' => 'sometimes|numeric',
            'category' => 'sometimes|numeric|nullable'
		]);

    	if($validator->fails()) {
    		return [
                "status" => "error",
                "message" => "ValidateError",
                "errors" => $validator->messages()->all()
    		];
 		}
        $image = Images::find($id);

        $image->edit($request->all());
        if($image) return ["status" => "ok"];
        return [
            "status" => "error",
            "message" => "SaveError",
            "errors" => $image->errors()
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
        $image->remove();
        return [
        	"status" => "ok"
        ];
    }

    private function getImagesList($resource, $paginate=true)
    {
        if(\Auth::user()->is_admin == 1){
            $query = Images::orderBy('id');
        }else{
            $query = Images::where('user_id', \Auth::user()->id)->orderBy('id');
        }

        $query = ($paginate) ? $query->paginate(20) : $query->get();
        return $resource::collection($query);
    }
}
