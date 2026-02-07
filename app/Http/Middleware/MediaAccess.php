<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MediaAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check()) {
            return redirect('login');
        }

        $user = auth()->user();
        
        // Allow if role is 'admin' OR 'media'
        if (in_array($user->role, ['admin', 'media'])) {
            return $next($request);
        }

        abort(403, 'Unauthorized. Media or Admin access required.');
    }
}
