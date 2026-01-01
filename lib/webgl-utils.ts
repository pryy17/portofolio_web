export function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    return !!gl
  } catch (e) {
    return false
  }
}

export function getWebGLErrorMessage(): string {
  const names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"]
  let context

  for (let i = 0; i < names.length; i++) {
    try {
      const canvas = document.createElement("canvas")
      context = canvas.getContext(names[i])
      if (context) break
    } catch (e) {
      // Continue to next context name
    }
  }

  if (!context) {
    return "Your browser does not support WebGL. Some 3D features will be displayed in 2D mode."
  }

  return ""
}
