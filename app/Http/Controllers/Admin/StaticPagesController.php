<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\StaticPages;
use App\Http\Controllers\Controller;

class StaticPagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $stpages = StaticPages::all();
        return view('admin.staticpages.index', ['stpages' => $stpages]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.staticpages.create');
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
            'slug' => 'required|alpha_num',
            'title' => 'required',
            'content' => 'required'
        ]);

        StaticPages::add($request->all());

        return redirect()->route('staticpages.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $page = StaticPages::find($id);
        return view('admin.staticpages.edit', ['stpage' => $page]);
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
            'slug' => 'required|alpha_num',
            'title' => 'required',
            'content' => 'required'
        ]);

        StaticPages::find($id)->edit($request->all());

        return redirect()->route('staticpages.index');
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
        return redirect()->route('staticpages.index');
    }
}
