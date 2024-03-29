<?php

namespace App\Http\Middleware;

use Closure;

class IpBlockMiddleware
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
        if(\App\IpBlock::check($request->ip())){
            return $next($request);
        }
        abort(404);
    }
}
