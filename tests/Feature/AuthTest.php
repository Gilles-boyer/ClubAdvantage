<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}


// <?php

// namespace Tests\Feature;

// use App\Models\User;
// use Illuminate\Foundation\Testing\RefreshDatabase;
// use Laravel\Sanctum\Sanctum;
// use Tests\TestCase;

// class AuthTest extends TestCase
// {
//     use RefreshDatabase;

//     public function test_authenticated_user_can_access_user_route()
//     {
//         $user = User::factory()->create();

//         Sanctum::actingAs($user);

//         $response = $this->getJson('/api/user');

//         $response->assertStatus(200)
//                  ->assertJson([
//                      'id' => $user->id,
//                      'email' => $user->email,
//                  ]);
//     }
// }