<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CodeController;
use App\Http\Controllers\ProblemController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::group(['middleware' => 'role:user'], function () {
//     Route::get('/problem', [ProblemController::class, 'listProblems']);
//     Route::get('/problem/{id}', [ProblemController::class, 'getProblem']);
//     Route::post('/code', [CodeController::class, 'submitCode']);
//     Route::get('/code', [CodeController::class, 'getStatus']);
// });



//public route
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


Route::group(['middleware' => ['auth:sanctum', 'restrictRoles:admin']], function () {
    Route::get('/user', function () {
        return User::all()->map(fn($user) => [
            'id' => $user->getId(),
            'username' => $user->username,
            'email' => $user->email,
            'roles' => $user->getRoles()->pluck('name')->toArray(),
        ]);
    });
    Route::put('/role/assign/{id}', [AuthController::class, 'assignRole']);
    Route::put('/role/remove/{id}', [AuthController::class, 'removeRole']);
});

Route::group(['middleware' => ['auth:sanctum', 'restrictRoles:admin,author']], function () {
    Route::post('/problem', [ProblemController::class, 'createProblem']);
    Route::put('/problem/{id}', [ProblemController::class, 'updateProblem']);
    Route::delete('/problem/{id}', [ProblemController::class, 'deleteProblem']);
});

//protected routes for submiting code solutiremove_roleons
Route::group(['middleware' => ['auth:sanctum', 'restrictRoles:user,author,admin']], function () {
    Route::get('/problem', [ProblemController::class, 'listProblems']);
    Route::get('/problem/{id}', [ProblemController::class, 'getProblem']);
    Route::get('/problem/{id}/solution_history', [ProblemController::class, 'solutionHistory']);
    Route::post('/code', [CodeController::class, 'submitCode']);
    Route::get('/code/{executionId}', [CodeController::class, 'getStatus']);
});