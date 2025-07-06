<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use App\Models\{Role, User};
use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleResource;

/**
 * ▸ Chaque test s’exécute sur une base SQLite in-memory (RefreshDatabase)
 * ▸ On ne pré-seed **que** ce qui est requis (ici : un user rattaché au rôle testé)
 */
class RoleTest extends TestCase
{
    use RefreshDatabase;

    /** Met en place un utilisateur « existant » (facultatif mais pratique) */
    protected function setUp(): void
    {
        parent::setUp();

        // Un rôle est requis pour pouvoir créer un User ; on en profite
        $role = Role::factory()->create();

        User::factory()->create([
            'role_id' => $role->id,
        ]);
    }

    /* --------------------------------------------------------------------- */
    /* 1. FACTORY                                                            */
    /* --------------------------------------------------------------------- */

    /** @test  ✅ la factory persiste un enregistrement */
    public function factory_persists_record(): void
    {
        $role = Role::factory()->create();

        $this->assertDatabaseHas('roles', ['id' => $role->id]);
    }

    /* --------------------------------------------------------------------- */
    /* 2. RELATIONS                                                          */
    /* --------------------------------------------------------------------- */

    /** @test  ✅ les relations sont configurées */
    public function relationships_are_configured(): void
    {
        $role = Role::factory()->create();

        // Un rôle doit « posséder » des utilisateurs (hasMany)
        $this->assertNotNull($role->users, 'La relation users() doit être définie');
    }

    /* --------------------------------------------------------------------- */
    /* 3. VALIDATION (RoleRequest)                                           */
    /* --------------------------------------------------------------------- */

    /** @test  ✅ le payload valide passe la validation */
    public function request_validation_passes_with_valid_payload(): void
    {
        $payload   = Role::factory()->make()->toArray();
        $rules     = (new RoleRequest())->rules();
        $validator = Validator::make($payload, $rules);

        $this->assertTrue($validator->passes());
    }

    /** @test  ✅ la validation échoue si « name » est vide  */
    public function request_validation_fails_with_missing_name(): void
    {
        $payload   = Role::factory()->make(['name' => ''])->toArray();
        $rules     = (new RoleRequest())->rules();
        $validator = Validator::make($payload, $rules);

        $this->assertFalse($validator->passes());
        $this->assertArrayHasKey('name', $validator->errors()->messages());
    }

    /* --------------------------------------------------------------------- */
    /* 4. RESOURCE                                                           */
    /* --------------------------------------------------------------------- */

    /** @test  ✅ le JSON retourné par RoleResource a la bonne « shape » */
    public function resource_shape_is_correct(): void
{
    $role     = Role::factory()->create();
    $resource = (new RoleResource($role))->resolve();

    // On compare les clés **exactement** à celles exposées par le Resource
    $this->assertEqualsCanonicalizing(
        ['id', 'name', 'description'],
        array_keys($resource),
        'Les clés du JSON retourné par RoleResource ne correspondent pas au contrat attendu.'
    );
}
}
