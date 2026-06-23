<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log; // <--- AJOUTE CETTE LIGNE

class ProfileController extends Controller
{
    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required', 
        ]);

        // Maintenant cette ligne ne sera plus soulignée en rouge
        Log::info('Fichier reçu :', ['hasFile' => $request->hasFile('avatar')]);

        $user = $request->user();

        if (!Storage::disk('public')->exists('avatars')) {
            Storage::disk('public')->makeDirectory('avatars');
        }

        if ($request->hasFile('avatar')) {
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }

            $path = $request->file('avatar')->store('avatars', 'public');
            
            $user->avatar = $path;
            $user->save();

            return response()->json(['user' => $user]);
        }
    }

    public function updateProfile(Request $request)
{
    $user = $request->user();

    // On valide que les données sont du texte
    $request->validate([
        'alias' => 'nullable|string|max:255',
        'bio' => 'nullable|string',
    ]);

    // On met à jour l'utilisateur avec l'alias et la bio
    $user->update([
        'alias' => $request->alias,
        'bio' => $request->bio,
    ]);

    return response()->json([
        'message' => 'Profil synchronisé',
        'user' => $user
    ]);
}
}