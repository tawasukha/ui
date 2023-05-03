const colors = require("tailwindcss/colors");

function toRgb(hex) {
  if (hex.length === 4) {
    hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
  }
  const red = parseInt(hex[1] + hex[2], 16)
  const green = parseInt(hex[3] + hex[4], 16)
  const blue = parseInt(hex[5] + hex[6], 16)
  return `${red} ${green} ${blue}`
}

function getColor(name) {
  const parts = name.split('.')
  let current = colors
  parts.forEach(part => {
    current = current[part]
  })
  if (current) {
    return toRgb(current)
  }
}

function getTheme(prop, type) {
  const { basic, mode, level } = prop
  return `
/* ${type.toUpperCase()} */
[data-theme="${type}"] {
${Object.keys(basic[type]).map(name => {
    return `  --color-${name} : ${getColor(basic[type][name])};`
  }).join("\r\n")}
  
${Object.keys(mode).map(name => {
    const color = mode[name]
    return level[type].map((lvl, i) => {
      return `  --color-${name}-${i + 1} : ${getColor(`${color}.${lvl}`)};`
    }).join("\r\n")
  }).join("\r\n\r\n")}
}`
}

function themeGenerator() {
  const basic = {
    light: {
      default: "white",
      offset: "gray.200",
      base: "white",
    },
    dark: {
      default: "gray.900",
      offset: "gray.700",
      base: "slate.800",
    },
  }
  const mode = {
    base: "slate",
    primary: "sky",
    secondary: "cyan",
    success: "emerald",
    warning: "amber",
    error: "rose",
  }
  const level = {
    light: [
      "50",
      "200",
      "500",
      "600",
      "700"]
    ,
    dark: [
      "800",
      "700",
      "600",
      "300",
      "200",
    ],
  }

  return `
/* Tawasukha UI Theme 
*  Author : Forte Zhuo
*/
${getTheme({ basic, mode, level }, 'light')}
${getTheme({ basic, mode, level }, 'dark')}
`
}

console.log(themeGenerator())
