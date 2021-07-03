<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        if ($request->query('show') == 'All') {
            $pageSize = User::count();
            $pageNumber = 1;
        } else {
            $pageSize = $request->query('show', 10);
            $pageNumber = $request->query('page', 1);
        }

        $search = $request->query('search', '');
        $sort = $request->query('sort', 'asc');
        $field = $request->query('field', 'name');
        $skip = $request->query('show') == 'All' ? 0 : ($pageNumber - 1) * $pageSize;
        $totalPages = User::count() / $pageSize;

        // $users = $search ? "SELECT $page FROM users WHERE MATCH (name, email, website) AGAINST ('%'.$search.'%') Order By $field $sort" :
        //     DB::table('users')->orderBy($field, $sort)->get($page);

        $users = $search ? DB::table('users')->where('name', 'like', '%' . $search . '%')->orWhere('email', 'like', '%' . $search . '%')->orWhere('website', 'like', '%' . $search . '%')->orderBy($field, $sort)->skip($skip)->limit($pageSize)->get()
            : DB::table('users')->orderBy($field, $sort)->skip($skip)->limit($pageSize)->get();

        $totalPages = $search ? DB::table('users')->where('name', 'like', '%' . $search . '%')->orWhere('email', 'like', '%' . $search . '%')->orWhere('website', 'like', '%' . $search . '%')->count()
            : User::count();

        return ['users' => $users, 'totalPages' => $totalPages / $pageSize];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
