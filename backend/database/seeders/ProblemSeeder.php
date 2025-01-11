<?php

namespace Database\Seeders;

use App\Models\Problem;
use App\Models\TestCase;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProblemSeeder extends Seeder
{
    private readonly User $admin;

    public function __construct()
    {
        $this->admin = User::all()->where('username', 'admin')->first();
    }

    private function createProblem($testCases, $problemDefinition)
    {
        $problem = new Problem(array_merge($problemDefinition, ['user_id' => $this->admin->id]));
        $problem->save();
        foreach ($testCases as $testCase) {
            $problemTestCase = new TestCase(array_merge($testCase, ['problem_id' => $problem->id]));
            $problemTestCase->save();
        }
    }


    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->createProblem(
            [
                ['input' => "4\n2 3\n4 2\n5 5\n1 1", 'expected_output' => "40"],
                ['input' => "3\n1 1\n1 1\n1 1", 'expected_output' => "3"],
                ['input' => "5\n12 2\n123 12\n13 13\n16 5\n1231 1", 'expected_output' => "2980"]
            ],
            [
                'title' => 'Sum of multiplies',
                'description' => 'On input on the first line a number n is given, on the next n lines a pair of numbers are given, a[i] b[i] for row i. Write a program that calculates the result of a[1]*b[1] + a[2]*b[2] + ... + a[n]*b[n]',
                'created_at' => now(),
                'time_limit_ms' => 1000,
                'mem_limit_mb' => 512,
            ]
        );

        $this->createProblem(
            [
                ['input' => "4\n5 1 123 5", 'expected_output' => "33.5"],
                ['input' => "10\n12 13 14 15 11 10 213 90 9 10", 'expected_output' => "397"],
                ['input' => "8\n1 2 3 4 5 6 7 8", 'expected_output' => "36"]
            ],
            [
                'title' => 'Average of all',
                'description' => 'On input a number n is given, on the next line n numbers are given - a[0] a[1] ... a[n-1] Write a program that calculates the average of a[0] to a[n-1]',
                'created_at' => now(),
                'time_limit_ms' => 1000,
                'mem_limit_mb' => 512,
            ]
        );

        $this->createProblem(
            [
                ['input' => "10\n1 2 3 4 5 6 7 8 9 10", 'expected_output' => "55"],
                ['input' => "5\n123123 142 54235 123 1414141", 'expected_output' => "1591764"],
                ['input' => "7\n12 12 12 12 12 12 12", 'expected_output' => "7"]
            ],
            [
                'title' => 'Sum of numbers',
                'description' => 'On input in the first line, n is given. The next row contains n numbers, calculate the sum of the n numbers',
                'created_at' => now(),
                'time_limit_ms' => 1000,
                'mem_limit_mb' => 512,
            ]
        );
    }
}
