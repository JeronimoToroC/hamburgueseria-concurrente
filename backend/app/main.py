from typing import List  # Importar para manejar listas
from fastapi import FastAPI, HTTPException
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

# Instancia del servicio RabbitMQ
rabbit_service = RabbitMQService()

# Callback para procesar mensajes de hamburguesas
def process_hamburguesas(message):
    logging.info(f"Procesando pedido de hamburguesa: {message}")
    time.sleep(5)
    logging.info(f"Pedido de hamburguesa completado: {message}")

# Callback para procesar mensajes de bebidas
def process_bebidas(message):
    logging.info(f"Procesando pedido de bebida: {message}")
    time.sleep(5)
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
            logging.info(f"Pedido recibido y enviado a la cola {queue}: {order.model_dump()}")
        return {"status": "Pedidos recibidos", "pedidos": [order.model_dump() for order in orders]}
    except Exception as e:
        logging.error(f"Error al procesar pedidos: {e}")
        raise HTTPException(status_code=500, detail=f"Error al procesar pedidos: {str(e)}")
