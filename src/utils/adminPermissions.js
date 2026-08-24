export function canCreateAdministrator(user) {
  return user?.is_superuser === true
}
