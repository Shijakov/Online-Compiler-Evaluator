<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'username' => 'required|unique:users',
            'email' => 'required|unique:users',
            'password' => 'required|confirmed',
        ]);

        // Mass assign the validated request data to a new instance of the User model
        $user = User::create($data);
        $user->assignRole(Role::ROLE_USER);
        $token = $user->createToken('my-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'Type' => 'Bearer'
        ]);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('username', $fields['username'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Wrong credentials'
            ], 401);
        }

        $token = $user->createToken('my-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'Type' => 'Bearer',
            'roles' => $user->getRoles()->pluck('name')->toArray() // include user role in response
        ]);
    }

    public function assignRole(Request $request, string $id): Response
    {
        $data = $request->validate([
            'role' => implode(',', ['required|in:', Role::ROLE_ADMIN, Role::ROLE_AUTHOR, Role::ROLE_USER]),
        ]);

        $user = User::find($id);

        if (!$user) {
            return new JsonResponse([
                'message' => 'User not found',
            ], Response::HTTP_NOT_FOUND);
        }

        $role = Role::where('name', '=', $data['role'])->first();

        if (!$role) {
            return new JsonResponse([
                'message' => 'Role not found',
            ], Response::HTTP_NOT_FOUND);
        }

        $user->assignRole($role);
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    public function removeRole(Request $request, string $id): Response
    {
        $data = $request->validate([
            'role' => implode(',', ['required|in:', Role::ROLE_ADMIN, Role::ROLE_AUTHOR, Role::ROLE_USER]),
        ]);

        $user = User::find($id);

        if (!$user) {
            return new JsonResponse([
                'message' => 'User not found',
            ], Response::HTTP_NOT_FOUND);
        }

        $role = Role::where('name', '=', $data['role'])->first();

        if (!$role) {
            return new JsonResponse([
                'message' => 'Role not found',
            ], Response::HTTP_NOT_FOUND);
        }

        $user->removeRole($role);
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
