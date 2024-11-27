# Hamburguesería Concurrente 🍔

Este proyecto es un sistema distribuido y concurrente para la gestión de pedidos en una hamburguesería, diseñado para manejar múltiples solicitudes simultáneamente con procesamiento eficiente. Combina un **frontend interactivo** desarrollado en **React** con un **backend robusto** basado en **FastAPI** y **RabbitMQ**.

---

## **Tecnologías Utilizadas**

### **Backend**

- **FastAPI**: Framework para desarrollar la API REST.
- **RabbitMQ**: Sistema de mensajería para manejar colas de pedidos concurrentes.
- **Pydantic**: Validación de datos y manejo de modelos.
- **Python 3.10+**: Lenguaje de programación principal.

### **Frontend**

- **React**: Biblioteca para construir interfaces de usuario.
- **Vite**: Herramienta para desarrollo rápido de frontend.
- **TypeScript**: Tipado estricto para mejorar la calidad del código.
- **Redux**: Gestión del estado global.
- **Axios**: Manejo de solicitudes HTTP.
- **Tailwind CSS**: Estilización moderna.
- **ShadCN/UI**: Componentes estilizados reutilizables.

---

## **Características del Proyecto**

### **1. Gestión de Pedidos**

- **Pedidos Concurrentes**: Procesamiento de hamburguesas y bebidas de forma simultánea utilizando colas de RabbitMQ.
- **Notificación de Estado**: El backend actualiza el estado de los pedidos y el frontend lo consulta en tiempo real.

### **2. Interfaz de Usuario**

- **Chat Simulado**: Conversación dinámica entre el cliente y el empleado, incluyendo:
  - Selección de productos (hamburguesas y bebidas).
  - Confirmación de pedidos.
  - Notificaciones sobre el estado del pedido.

### **3. Procesamiento en Tiempo Real**

- RabbitMQ maneja las colas de pedidos, asignando tareas a consumidores para procesarlas.
- Los consumidores notifican al backend cuando el pedido está listo, permitiendo al frontend actualizar al cliente.

---

## **Configuración del Proyecto**

### **Requisitos**

1. **Backend**:

   - Python 3.10+
   - RabbitMQ configurado y corriendo en `localhost:5672`.

2. **Frontend**:
   - Node.js 18+
   - NPM o Yarn.

---

### **Pasos Generales de Configuración**

1. Clona el repositorio:

   ```bash
   git clone https://github.com/JeronimoToroC/hamburgueseria-concurrente.git
   cd hamburgueseria
   ```

2. Configura y ejecuta el backend:

   - Sigue las instrucciones en el archivo `README.md` del directorio `backend`.

3. Configura y ejecuta el frontend:

   - Sigue las instrucciones en el archivo `README.md` del directorio `frontend`.

4. Asegúrate de que RabbitMQ esté corriendo:
   ```bash
   sudo systemctl start rabbitmq-server
   ```

---

## **Uso**

1. Inicia el backend y el frontend.
2. Accede a la aplicación en tu navegador:
   ```
   http://localhost:5173
   ```
3. Usa la interfaz de chat para interactuar con el sistema:
   - Selecciona productos y cantidades en el formulario.
   - Observa cómo el sistema notifica el estado de tu pedido en tiempo real.

---

## **Pruebas y Depuración**

- Verifica las colas y mensajes en RabbitMQ:
  ```
  http://localhost:15672
  ```
- Usa herramientas como Postman o cURL para probar manualmente los endpoints del backend.

---

## **Futuras Mejoras**

- **Notificaciones en tiempo real**: Implementar WebSockets para actualizar el estado sin necesidad de polling.
- **Soporte para múltiples usuarios**: Ampliar el sistema para manejar pedidos de varios clientes simultáneamente.
- **Dashboard de administración**: Crear una vista para que los empleados gestionen los pedidos en tiempo real.

---

## **Créditos**

- **Desarrollado por**: Jerónimo Toro C
- **Contacto**: jeronimo.toro.c@gmail.com

---

¡Gracias por usar Hamburguesería Concurrente! 😊
