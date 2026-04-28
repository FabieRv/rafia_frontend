interface SuccessPopupProps {
  message?: string
}

export default function SuccessPopup({ message }: SuccessPopupProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-3xl z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center animate-scaleIn">
        <div className="text-5xl mb-3">✅</div>

        <h3 className="text-xl font-bold text-(--color-secondary-text]">
          Succès
        </h3>

        <p className="text-slate-600 mt-2 text-sm">
          {message || "Opération réussie !"}
        </p>
      </div>
    </div>
  )
}
