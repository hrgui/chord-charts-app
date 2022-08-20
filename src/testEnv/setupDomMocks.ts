import { vi } from "vitest";

window.matchMedia = vi.fn().mockReturnValue({ matches: false });

export {};
