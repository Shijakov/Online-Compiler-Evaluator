<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Problem extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'start_code', 'time_limit_ms', 'mem_limit_mb', 'user_id', 'created_at'];

    public $timestamps = false;

    public function testCases(): HasMany
    {
        return $this->hasMany(TestCase::class);
    }

    public function solutionsHistory(): HasMany
    {
        return $this->hasMany(Solution::class);
    }

    public function getId()
    {
        return $this->id;
    }
}

