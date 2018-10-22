<?php

namespace App\Http\Controllers\Admin;

use App\Images;
use App\Category;
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
        $categories = Category::pluck('title', 'id');
        if(\Auth::user()->is_admin == 1){
            $images = Images::paginate(20);
        }else{
            $images = Images::where('user_id', \Auth::user()->id)->paginate(20);
        }
        return view('admin.images.index', ['images' => $images, 'categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = Category::pluck('title', 'id');
        return view('admin.images.create', ['categories' => $categories]);
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
        
        return redirect()->route('images.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $image = Images::find($id);
        $categories = Category::pluck('title', 'id');
        $selectedCategory = (is_null($image->category)) ? null : $image->category->id;

        return view('admin.images.edit', [
            'categories' => $categories, 
            'image' => $image, 
            'selectedCategory' => $selectedCategory,
        ]); 
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
        $this->validate($request, [
            'title' => 'required'
        ]);

        $image = Images::find($id);
        $image->edit($request->all());
        $image->setCategory($request->get('category_id'));
        $image->toggleVisibility($request->get('status'));
        
        return redirect()->route('images.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Images::find($id)->remove();

        return redirect()->back();
    }
}
