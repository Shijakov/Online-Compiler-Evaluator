<?php

namespace App\Http\Controllers;

use App\Models\Exceptions\ProblemDoesntExistException;
use App\Models\Problem;
use App\Models\Solution;
use App\Models\TestCase;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ProblemController extends Controller
{
    public function listProblems(Request $request): Collection
    {
        $problemSolutions = Solution::where('status', 'success')
            ->select(['problem_id', 'status'])
            ->distinct();

        return Problem::leftJoinSub($problemSolutions, 'solutions', function (JoinClause $join) {
            $join->on('problems.id', '=', 'solutions.problem_id');
        })
            ->select(['problems.id as id', 'problems.title as title'])
            ->selectRaw('case when solutions.status = \'success\' then true else false end as is_solved')
            ->get();
    }

    public function getProblem(int $id): Problem
    {
        return Problem::find($id);
    }

    public function createProblem(Request $request): Problem
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'time_limit_ms' => 'required|numeric',
            'mem_limit_mb' => 'required|numeric',
            'test_cases' => 'required|array',
            'test_cases.*.input' => 'required',
            'test_cases.*.expected_output' => 'required',
        ]);

        $userId = $request->user()->getId();

        return DB::transaction(function () use ($data, $userId) {

            $problem = Problem::create([
                'title' => $data['title'],
                'description' => $data['description'],
                'time_limit_ms' => $data['time_limit_ms'],
                'mem_limit_mb' => $data['mem_limit_mb'],
                'user_id' => $userId,
                'created_at' => now(),
            ]);

            foreach ($data['test_cases'] as $test_case_data) {
                TestCase::create(array_merge($test_case_data, ['problem_id' => $problem->getId()]));
            }

            return $problem;
        });

    }

    public function updateProblem(Request $request, int $id): Problem
    {
        $data = $request->validate([
            'title' => 'string',
            'description' => 'string',
            'time_limit_ms' => 'numeric',
            'mem_limit_mb' => 'numeric',
            'test_cases' => 'array',
            'test_cases.*.input' => 'required',
            'test_cases.*.expected_output' => 'required',
        ]);

        $problemData = [];
        if (isset($data['title'])) {
            $problemData['title'] = $data['title'];
        }
        if (isset($data['description'])) {
            $problemData['description'] = $data['description'];
        }
        if (isset($data['time_limit_ms'])) {
            $problemData['time_limit_ms'] = $data['time_limit_ms'];
        }
        if (isset($data['mem_limit_mb'])) {
            $problemData['mem_limit_mb'] = $data['mem_limit_mb'];
        }

        $testCasesData = isset($data['test_cases']) ? $data['test_cases'] : null;

        return DB::transaction(function () use ($problemData, $id, $testCasesData) {
            $problem = Problem::find($id);
            $problem->update($problemData);

            if ($testCasesData) {
                TestCase::where('problem_id', $id)->delete();
                foreach ($testCasesData as $testCaseData) {
                    TestCase::create(array_merge($testCaseData, ['problem_id' => $problem->getId()]));
                }
            }

            return $problem;
        });
    }

    public function deleteProblem(string $id)
    {
        $problem = Problem::find($id);

        if (!$problem) {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        }

        $problem->delete();
        return new JsonResponse(null, Response::HTTP_OK);
    }

    public function solutionHistory(string $id)
    {
        return Solution::where('problem_id', $id)->orderBy('created_at', 'desc')->get();
    }
}
