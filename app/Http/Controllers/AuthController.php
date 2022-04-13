<?php

namespace App\Http\Controllers;

use App\{User, IpBlock};
use Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function registerForm()
    {
    	return view('front.register');
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|min:5',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:5'
        ]);
    	
    	User::add($request->all());
    	return redirect('/login');
    }

    public function loginForm()
    {
        if(\Auth::check()) return redirect('/admin');
    	return view('front.login');
    }    

    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);
    	
    	if(Auth::attempt([
    		'email' => $request->get('email'),
    		'password' => $request->get('password')
    	]))
    	{
    		return redirect("/admin");
    	}else{
            IpBlock::add($request->ip());
        }

    	return redirect()->back()->with('status', 'Неправильный Email или пароль');
    }

    public function logout()
    {
    	Auth::logout();
    	return redirect('/login');
    }
}
