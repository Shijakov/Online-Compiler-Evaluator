<?php

namespace App\Services;

use App\Models\Problem;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;

class CodeService
{
    public function __construct(private readonly RabbitMQService $rabbitMQService)
    {
    }

    public function publishSolution($problemId, $userId, $code, $language): string
    {
        $problem = Problem::find($problemId);
        $testCases = $problem->testCases;

        $executionId = Str::uuid();

        $problemToSend = [
            'id' => $executionId,
            'problem_id' => $problemId,
            'user_id' => $userId,
            'code' => $code,
            'language' => $language,
            'test_cases' => $testCases->map(fn($case) => [
                'input' => $case->input,
                'expected_output' => $case->expected_output
            ])
        ];

        Redis::set($executionId, json_encode(["status" => "waiting"]));

        $this->rabbitMQService->publish(json_encode($problemToSend));

        return $executionId;
    }

    public function getExecutionStatus(string $executionId)
    {
        return json_decode(Redis::get($executionId));
    }


}
