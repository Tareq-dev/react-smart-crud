export const config = {
  baseUrl: "",
  getToken: null,
  notify: null // ✅ toast handler
}

export function setupCrud(options = {}) {
  config.baseUrl = options.baseUrl || ""
  config.getToken = options.getToken || null
  config.notify = options.notify || null
}
