<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use App\Enums\RoleEnum;
use App\Models\{Role, User, Category, Offer, Committee, CommitteeOffer};
use App\Http\Requests\CommitteeOfferRequest;
use App\Http\Resources\CommitteeOfferResource;

/**
 * 🔎  Comité-Offre : tests unitaires
 *
 * ─ Chaque test s’exécute sur une base SQLite “in-memory” (trait RefreshDatabase)
 * ─ Les dépendances minimales (Role, User, Category, Offer, Committee) sont
 *   semées au démarrage du test-case.
 */
class CommitteeOfferTest extends TestCase
{
    use RefreshDatabase; // ➜ reset BDD entre chaque test

    /** Pré-seeding des ressources indispensables à la factory CommitteeOffer */
    protected function setUp(): void
    {
        parent::setUp();

        // 1) Rôle super-admin (obligatoire car users.role_id est NOT-NULL)
        $role = Role::factory()->create([
            'name'        => RoleEnum::SUPER_ADMIN->value,
            'description' => 'super-admin',
        ]);

        // 2) Utilisateur rattaché à ce rôle
        User::factory()->create(['role_id' => $role->id]);

        // 3) Catégorie générique (requis par OfferFactory)
        Category::factory()->create();
    }

    /* ------------------------------------------------------------------------
     | 1. FACTORY — vérifie la persistance d’un enregistrement
     * --------------------------------------------------------------------- */
    public function test_factory_persists_record(): void
    {
        $pivot = CommitteeOffer::factory()->create();

        $this->assertDatabaseHas('committee_offers', [
            'committee_id' => $pivot->committee_id,
            'offer_id'     => $pivot->offer_id,
        ]);
    }

    /* ------------------------------------------------------------------------
     | 2. RELATIONS — vérifie les belongsTo()
     * --------------------------------------------------------------------- */
    public function test_relationships_are_configured(): void
    {
        $pivot = CommitteeOffer::factory()->create();

        $this->assertNotNull($pivot->committee, 'La relation committee() doit renvoyer un Committee');
        $this->assertNotNull($pivot->offer,     'La relation offer() doit renvoyer un Offer');
    }

    /* ------------------------------------------------------------------------
     | 3. VALIDATION (Request)
     * --------------------------------------------------------------------- */
    public function test_request_validation_passes_with_valid_payload(): void
    {
        $payload   = CommitteeOffer::factory()->make()->toArray();   // objet non-persisté
        $rules     = (new CommitteeOfferRequest())->rules();
        $validator = Validator::make($payload, $rules);

        $this->assertTrue($validator->passes(), 'La validation devrait réussir avec un payload valide');
    }

    public function test_request_validation_fails_with_missing_committee_id(): void
    {
        $payload   = CommitteeOffer::factory()->make(['committee_id' => null])->toArray();
        $rules     = (new CommitteeOfferRequest())->rules();
        $validator = Validator::make($payload, $rules);

        $this->assertFalse($validator->passes(), 'La validation doit échouer si committee_id est absent');
        $this->assertArrayHasKey('committee_id', $validator->errors()->messages());
    }

    /* ------------------------------------------------------------------------
     | 4. RESOURCE — vérifie la “forme” du JSON retourné par CommitteeOfferResource
     * --------------------------------------------------------------------- */
    public function test_resource_shape_is_correct(): void
    {
        // On charge explicitement les relations utilisées dans le Resource
        $pivot    = CommitteeOffer::factory()->create()->load(['committee', 'offer']);
        $resource = (new CommitteeOfferResource($pivot))->resolve();   // -> array()

        $this->assertEqualsCanonicalizing(
            ['committee_id', 'offer_id', 'assigned_at'],
            array_keys($resource),
            'Les clés retournées par CommitteeOfferResource ne correspondent pas au contrat attendu'
        );
    }
}
