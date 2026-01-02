export const v = {
  required:
    (msg = "Required field !") =>
    (val) =>
      val ? null : msg,

  minLen:
    (len, msg) =>
    (val) =>
      val && val.length < len
        ? msg || `Min ${len} chars !`
        : null,

  min:
    (n, msg) =>
    (val) =>
      val < n ? msg || `Min ${n} !` : null,

  exactLen:
    (len, msg) =>
    (val) =>
      val && val.length !== len
        ? msg || `Must be ${len} include +880 !`
        : null,

  startsWith:
    (s, msg) =>
    (val) =>
      val && !val.startsWith(s)
        ? msg || `Must start with ${s} !`
        : null,

  fileSize:
    (kb, msg) =>
    (file) =>
      file && file.size / 1024 > kb
        ? msg || `Max file size ${kb}kb !`
        : null,
};
