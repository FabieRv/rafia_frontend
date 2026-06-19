import {
  Zap,
  UserPlus,
  LogIn,
  KeyRound,
  PackagePlus,
  Package,
  PackageX,
  FileText,
  Coins,
  XCircle,
} from "lucide-react"

interface ActivityLog {
  id_activity: number | string
  type: string
  message: string
  createdAt: string
}

interface RecentActivityProps {
  activities: ActivityLog[] | null | undefined
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const formatRelativeTime = (dateString: string) => {
    const now = new Date()
    const past = new Date(dateString)
    const diffInMs = now.getTime() - past.getTime()
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))

    if (diffInHours < 1) return "à l'instant"
    if (diffInHours === 1) return "Il y a 1 heure"
    if (diffInHours < 24) return `Il y a  ${diffInHours} heures`
    return past.toLocaleDateString("fr-FR")
  }

  const getGroupedActivities = () => {
    if (!activities) return []

    const grouped: any[] = []

    activities.forEach((log) => {
      const lastLog = grouped[grouped.length - 1]
      if (
        lastLog &&
        lastLog.type === log.type &&
        Math.abs(
          new Date(lastLog.createdAt).getTime() -
            new Date(log.createdAt).getTime()
        ) <
          60 * 1000
      ) {
        if (!lastLog.messages) {
          lastLog.messages = [lastLog.message]
        }
        lastLog.messages.push(log.message)
        lastLog.createdAt = log.createdAt
      } else {
        grouped.push({ ...log, messages: null })
      }
    })

    return grouped
  }

  const groupedActivities = getGroupedActivities()

  return (
    <div className="bg-white p-5 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100/80 h-80 flex flex-col overflow-hidden w-full">
      <h3 className="font-bold text-gray-800 text-[17px] mb-4 tracking-tight shrink-0">
        Recent Activity
      </h3>

      <div className="divide-y divide-gray-100/70 overflow-y-auto pr-2 flex-1 min-h-0 scrollbar-thin">
        {groupedActivities.length > 0 ? (
          groupedActivities.map((log: any, index: number) => {
            let title = "Activity Log"
            let icon = <Zap size={18} className="text-gray-500 stroke-[1.6]" />

            const isGrouped = log.messages && log.messages.length > 1
            const count = isGrouped ? log.messages.length : 1

            switch (log.type) {
              case "USER_REGISTER":
                title = isGrouped
                  ? `${count} Utilisateurs créés`
                  : "Nouvel utilisateur créé"
                icon = (
                  <UserPlus size={18} className="text-gray-500 stroke-[1.6]" />
                )
                break
              case "USER_LOGIN":
                title = isGrouped
                  ? `${count} Connexions simultanées`
                  : "Utilisateur connecté"
                icon = (
                  <LogIn size={18} className="text-gray-500 stroke-[1.6]" />
                )
                break
              case "PASSWORD_CHANGED":
                title = "Mot de passe changée"
                icon = (
                  <KeyRound size={18} className="text-gray-500 stroke-[1.6]" />
                )
                break
              case "PRODUCT_CREATED":
                title = isGrouped
                  ? `${count} Produits ajoutés`
                  : "Produit ajouté"
                icon = (
                  <PackagePlus
                    size={18}
                    className="text-gray-500 stroke-[1.6]"
                  />
                )
                break
              case "PRODUCT_UPDATED":
                title = isGrouped
                  ? `${count} Produits modifiés`
                  : "Produit modifié"
                icon = (
                  <Package size={18} className="text-gray-500 stroke-[1.6]" />
                )
                break
              case "PRODUCT_DELETE":
                title = isGrouped
                  ? `${count} Produits supprimés`
                  : "Produit supprimé"
                icon = (
                  <PackageX size={18} className="text-gray-400 stroke-[1.6]" />
                )
                break
              case "ORDER_CREATED":
              case "ORDER_CONFIRME":
              case "ORDER_LIVREE":
                title = isGrouped
                  ? `${count} Statuts de commande mis à jour`
                  : "Statut de commande mis à jour"
                icon = (
                  <FileText size={18} className="text-gray-500 stroke-[1.6]" />
                )
                break
              case "ORDER_NEGOCIEE":
                title = isGrouped
                  ? `${count} Offres négociées`
                  : "Offre négociée"
                icon = (
                  <Coins size={18} className="text-gray-500 stroke-[1.6]" />
                )
                break
              case "ORDER_ANNULEE":
                title = isGrouped
                  ? `${count} Commandes annulées`
                  : "Commande annulée"
                icon = (
                  <XCircle size={18} className="text-gray-400 stroke-[1.6]" />
                )
                break
            }

            return (
              <div
                key={log.id_activity || index}
                className="flex flex-wrap  justify-between py-4 first:pt-0 last:pb-0 gap-4 mr-10"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex items-center justify-center w-5 h-5 shrink-0">
                    {icon}
                  </div>

                  <div className="space-y-1">
                    <p className="text-[14px] font-bold text-gray-800 leading-tight-none">
                      {title}
                    </p>
                    {isGrouped ? (
                      <ul className="text-[13px] text-gray-500 list-disc list-inside space-y-0.5 pl-0.5 font-normal">
                        {log.messages.map((msg: string, i: number) => (
                          <li key={i} className="truncate max-w-45 sm:max-w-xs">
                            {msg
                              .replace(/^produit/i, "")
                              .replace(/produit/gi, "")
                              .replace(/supprimé|créé|modifié/gi, "")
                              .trim()}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[13px] text-gray-500 font-normal leading-normal line-clamp-1">
                        {log.message}
                      </p>
                    )}
                  </div>
                </div>

                <span className="text-[12px] text-gray-400 whitespace-nowrap mt-4 font-normal shrink-0">
                  {formatRelativeTime(log.createdAt)}
                </span>
              </div>
            )
          })
        ) : (
          <div className="text-gray-400 text-sm py-8 text-center">
            Aucune activité récente
          </div>
        )}
      </div>
    </div>
  )
}
