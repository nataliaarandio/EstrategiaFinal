# Estrategia final

## Prerrequisitos

Antes de comenzar, asegúrate de tener lo siguiente instalado en tu sistema:

- **Node.js**: Se recomienda utilizar la versión **18.20.4**

  ```bash
  nvm install 18.20.4
  nvm use 18.20.4
  ```
- **Ghost Admin**
- **npm install -D cypress-iframe**

## Pasos para ejecutar las pruebas

Sigue estos pasos para ejecutar las pruebas de Cypress:

1. **Clona este repositorio** en tu máquina local.

   ```bash
   cd EstrategiaFinal
   ```

2. **Ajusta el LocalHost** de Ghost en el archivo CypressConfig, Ejemplo:

   ```bash
   LOCAL_HOST: "http://localhost:2368/ghost/"
   ```

3. **Instala las dependencias** necesarias ejecutando:

   ```bash
   npm install
   ```

4. **Inicia Cypress** con el siguiente comando:

   ```bash
   npx cypress open
   ```

5. **Ejecuta las pruebas** de la carpeta `e2e`. Una vez que se abra la interfaz de Cypress, selecciona las pruebas que deseas ejecutar.
