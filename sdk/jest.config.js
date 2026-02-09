/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  // 1. Usamos un preset especial para ESM
  preset: 'ts-jest/presets/default-esm', 
  testEnvironment: 'node',
  
  // 2. Le decimos a Jest que los archivos .ts son módulos modernos
  extensionsToTreatAsEsm: ['.ts'], 
  
  // 3. EL TRUCO DE MAGIA 🎩
  // TypeScript te obliga a poner ".js" en los imports, pero el archivo real es ".ts".
  // Esta línea le dice a Jest: "Si ves un import que termina en .js, búscalo como si no tuviera extensión (o sea, busca el .ts)"
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  
  // 4. Configuración interna del compilador
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};