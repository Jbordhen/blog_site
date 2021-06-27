<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'min:3'],
            'username' => ['required', 'string', 'alpha_num', 'unique:users'],
            'email' => ['required', 'email:rfc', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed']
        ]);

        if ($validator->fails()) {
            $error = [
                'error' => $validator->errors(),
            ];
            return response($error, 400);
        }

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('blogsitetoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_info' => ['required', 'string'],
            'password' => ['required', 'string']
        ]);

        if ($validator->fails()) {
            $error = [
                'error' => $validator->errors(),
            ];
            return response($error, 400);
        }

        $user = strpos($request->user_info, '@') ?
            User::where('email', $request->user_info)->first()
            : User::where('username', $request->user_info)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'error' => 'Wrong Credentials',
                'request' => $request->all(),
            ], 401);
        }

        $token = $user->createToken('blogsitetoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return ([
            'message' => 'Logged out',
        ]);
    }
}
