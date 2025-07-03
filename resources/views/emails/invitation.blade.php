<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
</head>
<body>
    <h1>Invitation à rejoindre ClubAdvantage</h1>

    <p>Bonjour,</p>

    <p>
        <strong>{{ $invitation['sender_name'] }}</strong>
        vous invite à rejoindre le comité
        <strong>{{ $invitation['committee_name'] }}</strong>
        en tant que <strong>{{ $invitation['role_name'] }}</strong>.
    </p>

    <p>
        Pour accepter et créer votre compte, cliquez ici :
        <a href="{{ $invitation['register_url'] }}">S’inscrire</a>
    </p>

    <p>À bientôt,<br>{{ config('app.name') }}</p>
</body>
</html>
