import { apiFetch } from './client';

export function fetchQuickActions() {
  return apiFetch('/home/quick-actions');
}

export function fetchPromos() {
  return apiFetch('/home/promos');
}

export function fetchBalance() {
  return apiFetch('/wallet/balance');
}
