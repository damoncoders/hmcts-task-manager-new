<?php

namespace Tests\Unit;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Validation\ValidationException;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_task_can_be_created(): void
    {
        $testData = [
            'title' => 'Test Task',
            'description' => 'This is a test task',
            'status' => 'pending',
            'due_date' => now()->addDays(1)->toDateTimeString(),
        ];

        $task = Task::create($testData);

        $this->assertInstanceOf(Task::class, $task);
        $this->assertEquals($testData['title'], $task->title);
        $this->assertEquals($testData['description'], $task->description);
        $this->assertEquals($testData['status'], $task->status);
        $this->assertEquals($testData['due_date'], $task->due_date);
    }

    public function test_task_has_default_status(): void
    {
        $task = Task::create([
            'title' => 'Test Task',
            'due_date' => now()->addDays(1)->toDateTimeString(),
        ])->fresh();

        $this->assertEquals('pending', $task->status);
    }

    public function test_task_description_is_nullable(): void
    {
        $task = Task::create([
            'title' => 'Test Task',
            'status' => 'pending',
            'due_date' => now()->addDays(1)->toDateTimeString(),
        ])->fresh();

        $this->assertNull($task->description);
        $this->assertInstanceOf(Task::class, $task);
    }

    public function test_task_due_date_is_required(): void
    {
        $this->expectException(ValidationException::class);
        Task::create([
            'title' => 'Test Task',
            'status' => 'pending',
        ]);
    }

    public function test_task_title_is_required(): void
    {
        $this->expectException(ValidationException::class);
        Task::create([
            'status' => 'pending',
            'due_date' => now()->addDays(1)->toDateTimeString(),
        ]);
    }

    public function test_task_status_is_required(): void
    {
        $this->expectException(ValidationException::class);
        Task::create([
            'title' => 'Test Task',
            'due_date' => now()->addDays(1)->toDateTimeString(),
        ]);
    }

    public function test_task_status_must_be_valid(): void
    {
        $this->expectException(ValidationException::class);
        Task::create([
            'title' => 'Test Task',
            'status' => 'invalid_status',
            'due_date' => now()->addDays(1)->toDateTimeString(),
        ]);
    }
}
