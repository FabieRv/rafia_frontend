// src/app/(admin)/dashboard/page.tsx

"use client" // Optionnel, mais utile si tu ajoutes des boutons plus tard

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 font-montserrat">
        Tableau de Bord Artisanat
      </h1>
      <p className="text-slate-500 mt-2">
        Aperçu de vos activités à Madagascar.
      </p>

      {/* Grille de test pour vérifier que le CSS fonctionne */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-bold uppercase">
            Ventes du jour
          </p>
          <p className="text-2xl font-black text-emerald-600">150.000 Ar</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-bold uppercase">
            Produits actifs
          </p>
          <p className="text-2xl font-black text-slate-800">24</p>
        </div>
      </div>
    </div>
  )
}
