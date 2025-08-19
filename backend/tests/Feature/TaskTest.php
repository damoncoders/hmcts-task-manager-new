<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Carbon\Carbon;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_all_tasks(): void
    {
        Task::factory()->count(3)->create();
        $response = $this->getJson('/api/tasks');
        $response->assertStatus(200)
            ->assertJsonCount(3, 'data')
            ->assertJsonStructure([
                'data' => [[
                    'id',
                    'title',
                    'description',
                    'status',
                    'due_date'
                ]]
            ]);
    }

    public function test_create_task(): void
    {
        $testData = [
            'title' => 'Test Task',
            'description' => 'This is a test task',
            'status' => 'pending',
            'due_date' => now()->addDays(1)->toDateTimeString(),
        ];

        $response = $this->postJson('/api/tasks', $testData);
        $response->assertStatus(201)->assertJson([
            'data' => [
                'title' => $testData['title'],
                'description' => $testData['description'],
                'status' => $testData['status'],
                'due_date' => $testData['due_date'],
            ],
        ]);
    }

    public function test_show_task(): void
    {
        $task = Task::factory()->create();
        $response = $this->getJson("/api/tasks/{$task->id}");
        $response->assertStatus(200)->assertJson([
            'data' => [
                'id' => $task->id,
                'title' => $task->title,
                'description' => $task->description,
                'status' => $task->status,
                'due_date' => Carbon::parse($task->due_date)->toDateTimeString(),
            ],
        ]);
    }

    public function test_update_task(): void
    {
        $task = Task::factory()->create();
        $updatedData = [
            'title' => 'Updated Task',
            'description' => 'This is an updated task',
            'status' => 'in_progress',
            'due_date' => now()->addDays(2)->toDateTimeString(),
        ];

        $response = $this->putJson("/api/tasks/{$task->id}", $updatedData);
        $response->assertStatus(200)->assertJson([
            'data' => $updatedData,
        ]);

        $this->assertDatabaseHas('tasks', $updatedData);
    }

    public function test_delete_task(): void
    {
        $task = Task::factory()->create();
        $response = $this->deleteJson("/api/tasks/{$task->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('tasks', $task->toArray());
    }

    public function test_task_validation(): void
    {
        $response = $this->postJson('/api/tasks', []);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['title', 'status', 'due_date']);
    }

    public function test_task_status_validation(): void
    {
        $testData = [
            'title' => 'Test Task',
            'description' => 'This is a test task',
            'status' => 'invalid_status',
            'due_date' => now()->addDays(1)->toDateTimeString(),
        ];

        $response = $this->postJson('/api/tasks', $testData);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['status']);
    }
}
