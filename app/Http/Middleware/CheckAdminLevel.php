<?php

namespace App\Http\Middleware;

use Closure;

class CheckAdminLevel
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->method() != 'GET' && $request->method() != 'POST' && \Auth::user()->is_admin == 0){
            return redirect($request->session()->get('_previous')['url'])->with('status', 'NotEnoughRights');
        }
        return $next($request);
    }
}
