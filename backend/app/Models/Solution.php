<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Solution extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function testCases(): HasMany {
        return $this->hasMany(SolutionTestCase::class);
    }
}
