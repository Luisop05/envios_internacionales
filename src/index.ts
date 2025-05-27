import { FastifyServer } from './servers/FastifyServer';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Función principal para iniciar la aplicación
async function main(): Promise<void> {
  const server = new FastifyServer();
  
  // Manejo de señales para cierre graceful
  process.on('SIGINT', async () => {
    console.log('\nRecibida señal SIGINT, cerrando servidor...');
    await server.stop();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('\nRecibida señal SIGTERM, cerrando servidor...');
    await server.stop();
    process.exit(0);
  });

  // Iniciar el servidor
  await server.start();
}

// Ejecutar la aplicación
main().catch((error) => {
  console.error('Error fatal al iniciar la aplicación:', error);
  process.exit(1);
}); 