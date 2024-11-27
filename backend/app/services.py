import pika
import json
import logging

class RabbitMQService:
    def __init__(self, host="localhost"):
        try:
            logging.info("Conectando a RabbitMQ...")
            self.connection = pika.BlockingConnection(pika.ConnectionParameters(host))
            self.channel = self.connection.channel()
            self.channel.queue_declare(queue="hamburguesas")
            self.channel.queue_declare(queue="bebidas")
            logging.info("Conexión con RabbitMQ establecida.")
        except pika.exceptions.AMQPConnectionError as e:
            logging.error(f"Error al conectar con RabbitMQ: {e}")
            raise

    def publish_message(self, queue, message):
        try:
            if not isinstance(message, str):
                message = json.dumps(message)
            self.channel.basic_publish(
                exchange="",
                routing_key=queue,
                body=message
            )
            logging.info(f"Mensaje publicado en la cola {queue}: {message}")
        except Exception as e:
            logging.error(f"Error al publicar mensaje en {queue}: {e}")
            raise

    def consume_messages(self, queue, callback):
        try:
            # Crear una nueva conexión para este consumidor
            connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
            channel = connection.channel()

            # Declarar la cola en la nueva conexión
            channel.queue_declare(queue=queue)

            # Callback interno para procesar mensajes
            def internal_callback(ch, method, properties, body):
                try:
                    message = json.loads(body.decode())
                    callback(message)  # Procesar el mensaje
                    ch.basic_ack(delivery_tag=method.delivery_tag)
                    logging.info(f"Mensaje procesado en la cola {queue}: {message}")
                except json.JSONDecodeError:
                    logging.error(f"Mensaje mal formado en la cola {queue}: {body.decode()}")
                    ch.basic_nack(delivery_tag=method.delivery_tag)
                except Exception as e:
                    logging.error(f"Error al procesar mensaje en {queue}: {e}")
                    ch.basic_nack(delivery_tag=method.delivery_tag)

            # Configurar el consumidor
            channel.basic_consume(queue=queue, on_message_callback=internal_callback)
            logging.info(f"Iniciando consumidor en la cola {queue}...")

            # Procesar los mensajes
            channel.start_consuming()
        except Exception as e:
            logging.error(f"Error al consumir mensajes de la cola {queue}: {e}")
            raise
