import test from 'node:test'
import assert from 'node:assert/strict'

import { canCreateAdministrator } from './adminPermissions.js'

test('un Super Admin voit et peut ouvrir la création administrateur', () => {
  assert.equal(canCreateAdministrator({ user_type: 'admin', is_staff: true, is_superuser: true }), true)
})

test('un admin simple ne voit pas le bouton de création', () => {
  assert.equal(canCreateAdministrator({ user_type: 'admin', is_staff: true, is_superuser: false }), false)
})

test('un admin simple est refusé par la garde de /admin/users/new', () => {
  assert.equal(canCreateAdministrator({ user_type: 'admin', is_staff: true, is_superuser: false }), false)
})

test('is_staff ou user_type admin ne suffisent jamais sans is_superuser strictement vrai', () => {
  assert.equal(canCreateAdministrator({ user_type: 'admin', is_staff: true }), false)
  assert.equal(canCreateAdministrator({ user_type: 'admin', is_staff: true, is_superuser: 1 }), false)
})
