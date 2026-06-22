export const getTokenFromLocalStorage = (): string => {
  console.log("--------------token-------------")
  if (typeof window === "undefined") return ""
  return localStorage.getItem("token") || ""
}
