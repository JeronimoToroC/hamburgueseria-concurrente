
# Backend - Hamburguesería 🍔

Este es el backend del sistema de hamburguesería, desarrollado con **FastAPI** y **RabbitMQ**. Gestiona pedidos concurrentes de hamburguesas y bebidas mediante colas, procesando automáticamente los mensajes enviados a RabbitMQ.

---

## **Estructura del Proyecto**
```plaintext
hamburgueseria/
├── backend/
    ├── app/
        ├── __init__.py         # Inicializador del módulo
        ├── main.py             # Punto de entrada de la API (FastAPI)
        ├── services.py         # Lógica para interacción con RabbitMQ
        ├── models.py           # Definición de modelos de datos
        ├── config.py           # Configuración global
    ├── requirements.txt        # Dependencias del proyecto
```

---

## **Instalación**

### **Requisitos previos**
- **Python 3.10 o superior**
- **RabbitMQ** instalado y corriendo en `localhost:5672`.

### **Pasos para configurar**
1. Clona el repositorio:
   ```bash
   git clone https://github.com/JeronimoToroC/hamburgueseria-concurrente.git
   cd hamburgueseria/backend
   ```

2. Crea un entorno virtual:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

4. Inicia RabbitMQ en tu máquina local.

5. Inicia el backend:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

---

## **Uso de la API**

### **Endpoints**
#### **POST /pedidos/**
Recibe un pedido y lo publica en la cola correspondiente.

- **Cuerpo de la solicitud (JSON)**:
  ```json
  {
      "id": 1,
      "type": "hamburguesa"
  }
  ```

- **Respuesta exitosa (200)**:
  ```json
  {
      "status": "Pedido recibido",
      "pedido": {
          "id": 1,
          "type": "hamburguesa"
      }
  }
  ```

---

## **Detalles Técnicos**

### **Conexión con RabbitMQ**
- **Colas declaradas**:
  - `hamburguesas`: Procesa pedidos de hamburguesas.
  - `bebidas`: Procesa pedidos de bebidas.
  
- Cada consumidor utiliza una conexión y canal independiente para evitar conflictos.

### **Logs**
El backend registra eventos clave como:
- Publicación de mensajes en RabbitMQ.
- Procesamiento de mensajes por los consumidores.
- Errores (con detalles).

Los logs se muestran en la consola por defecto.

---

## **Extender el backend**

### **Agregar una nueva cola**
1. Declara la nueva cola en `services.py` dentro del método `__init__`:
   ```python
   self.channel.queue_declare(queue="nueva_cola")
   ```

2. Agrega un consumidor para la nueva cola en `main.py`:
   ```python
   def process_nueva_cola(message):
       logging.info(f"Procesando mensaje de nueva_cola: {message}")

   start_consumer("nueva_cola", process_nueva_cola)
   ```

---

## **Pruebas**
### **Verificar colas en RabbitMQ**
1. Accede al panel de RabbitMQ:
   ```
   http://localhost:15672
   ```
2. Verifica las colas `hamburguesas` y `bebidas` en la pestaña **Queues**.

### **Probar el endpoint**
Usa herramientas como Postman, curl o la interfaz Swagger en:
```
http://0.0.0.0:8000/docs
```

---

## **Futuras Mejoras**
- **Manejo avanzado de errores**: Implementar un sistema de reintento para mensajes fallidos.
- **Métricas**: Agregar monitoreo para mensajes procesados y pendientes.

---

## **Créditos**
- **Desarrollado por**: Jerónimo Toro C
- **Contacto**: jeronimo.toro.c@gmail.com
