from typing import List, Dict
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.services import RabbitMQService
from app.models import Order
import logging
from threading import Thread
import time

app = FastAPI()

# Configuración de logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler()]
)

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia esto en producción para restringir dominios
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos HTTP
    allow_headers=["*"],  # Permite todos los encabezados
)

# Instancia del servicio RabbitMQ
rabbit_service = RabbitMQService()

# Diccionario para simular el estado de los pedidos
pedido_status: Dict[int, str] = {}

# Callback para procesar mensajes de hamburguesas
def process_hamburguesas(message):
    logging.info(f"Procesando pedido de hamburguesa: {message}")
    time.sleep(5)  # Simular tiempo de procesamiento
    pedido_status[message["id"]] = "listo"
    logging.info(f"Pedido de hamburguesa completado: {message}")

# Callback para procesar mensajes de bebidas
def process_bebidas(message):
    logging.info(f"Procesando pedido de bebida: {message}")
    time.sleep(5)  # Simular tiempo de procesamiento
    pedido_status[message["id"]] = "listo"
    logging.info(f"Pedido de bebida completado: {message}")

# Función para iniciar un consumidor en un hilo separado
def start_consumer(queue, callback):
    Thread(target=rabbit_service.consume_messages, args=(queue, callback), daemon=True).start()

# Inicia los consumidores en hilos separados
start_consumer("hamburguesas", process_hamburguesas)
start_consumer("bebidas", process_bebidas)

@app.post("/pedidos/")
def create_orders(orders: List[Order]):
    try:
        for order in orders:
            queue = "hamburguesas" if order.type == "hamburguesa" else "bebidas"
            rabbit_service.publish_message(queue, order.model_dump())
            pedido_status[order.id] = "preparando"  # Estado inicial
        return {"status": "Pedidos recibidos", "id": orders[0].id}
    except Exception as e:
        logging.error(f"Error al procesar pedidos: {e}")
        raise HTTPException(status_code=500, detail=f"Error al procesar pedidos: {str(e)}")

@app.get("/pedidos/{pedido_id}/estado/")
def get_order_status(pedido_id: int):
    status = pedido_status.get(pedido_id)
    if not status:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")
    return {"status": status}
