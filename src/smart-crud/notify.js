import { config } from "./config"

export function notify(type, message, meta = {}) {
  if (typeof config.notify === "function") {
    config.notify(type, message, meta)
  }
}
