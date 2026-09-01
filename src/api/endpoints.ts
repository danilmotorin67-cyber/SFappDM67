import { apiRequest, setToken } from "./client";
import type { HistoryEntry } from "../data";
import type { Studio } from "../StudiosScreen";

/**
 * Тонкий слой над реальными эндпоинтами backend.
 * Пути и формы ответов — предположение по данным из data.ts,
 * поправить под реальный контракт API, когда он будет известен.
 */

// --- Auth ---

export type AuthResponse = { token: string; userId: string };

export async function login(phone: string, code: string): Promise<AuthResponse> {
  const res = await apiRequest<AuthResponse>("/auth/login", {
    method: "POST",
    body: { phone, code },
    auth: false,
  });
  setToken(res.token);
  return res;
}

export function logout(): void {
  setToken(null);
}

// --- Studios ---

export function getStudios(): Promise<Studio[]> {
  return apiRequest<Studio[]>("/studios");
}

// --- Bookings ---

export type BookingRequest = {
  studioId: string;
  date: string;
  time: string;
  trainingType: string;
  withTrainer: boolean;
};

export function createBooking(payload: BookingRequest): Promise<{ id: string }> {
  return apiRequest("/bookings", { method: "POST", body: payload });
}

export function cancelBooking(id: string): Promise<void> {
  return apiRequest(`/bookings/${id}`, { method: "DELETE" });
}

// --- Workout history ---

export function getHistory(): Promise<HistoryEntry[]> {
  return apiRequest<HistoryEntry[]>("/workouts/history");
}

export function getWorkout(id: string): Promise<HistoryEntry> {
  return apiRequest<HistoryEntry>(`/workouts/${id}`);
}

// --- Profile ---

export type Profile = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

export function getProfile(): Promise<Profile> {
  return apiRequest<Profile>("/profile");
}

export function updateProfile(payload: Partial<Profile>): Promise<Profile> {
  return apiRequest<Profile>("/profile", { method: "PATCH", body: payload });
}

export function deleteProfile(): Promise<void> {
  return apiRequest("/profile", { method: "DELETE" });
}
