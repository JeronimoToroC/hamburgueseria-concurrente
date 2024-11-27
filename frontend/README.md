# Frontend - Hamburguesería 🍔

---

## **Estructura del Proyecto**

```plaintext
frontend/
├── .env                      # Variables de entorno
├── .gitignore                # Archivos ignorados por Git
├── components.json           # Configuración de componentes (ShadCN)
├── eslint.config.js          # Configuración de ESLint
├── index.html                # HTML principal del proyecto
├── package-lock.json         # Archivo de bloqueo de dependencias
├── package.json              # Dependencias y scripts
├── postcss.config.js         # Configuración de PostCSS
├── README.md                 # Documentación del frontend
├── tailwind.config.js        # Configuración de Tailwind CSS
├── tsconfig.app.json         # Configuración de TypeScript para la aplicación
├── tsconfig.json             # Configuración base de TypeScript
├── tsconfig.node.json        # Configuración de TypeScript para Node
├── vite.config.ts            # Configuración de Vite
│
├── public/                   # Archivos estáticos
│   ├── Bebidas.png           # Avatar de bebidas
│   ├── Cliente.png           # Avatar de cliente
│   ├── Empleado.png          # Avatar de empleado
│   └── hamburguesa.png       # Avatar de hamburguesa
│
├── src/                      # Código fuente del proyecto
    ├── App.tsx               # Punto de entrada principal de React
    ├── main.tsx              # Renderización de la aplicación
    ├── vite-env.d.ts         # Tipos de entorno para Vite
    │
    ├── api/                  # Lógica para llamadas HTTP
    │   ├── axiosConfig.ts    # Configuración global de Axios
    │   └── ordersApi.ts      # Funciones para interactuar con el backend
    │
    ├── assets/               # Recursos adicionales
    │
    ├── components/           # Componentes reutilizables
    │   ├── chat/             # Componentes del chat
    │   │   ├── ChatBox.tsx   # Componente principal del chat
    │   │   ├── MessageBubble.tsx # Burbujas de mensaje
    │   │   ├── OrderForm.tsx # Formulario para crear pedidos
    │   │   └── ProductBubble.tsx # Burbujas de productos en el pedido
    │   │
    │   └── ui/               # Componentes estilizados con ShadCN/UI
    │       ├── button.tsx    # Botón reutilizable
    │       ├── card.tsx      # Tarjetas para visualización
    │       ├── input.tsx     # Inputs estilizados
    │       ├── label.tsx     # Etiquetas para formularios
    │       └── select.tsx    # Selectores estilizados
    │
    ├── lib/                  # Utilidades globales
    │   └── utils.ts          # Funciones auxiliares
    │
    ├── store/                # Configuración de Redux
    │   ├── index.ts          # Configuración del store global
    │   └── slices/           # Slices de Redux
    │       └── ordersSlice.ts # Lógica para gestionar pedidos
    │
    ├── styles/               # Estilos globales
    │   └── globals.css       # Configuración de Tailwind CSS
    │
    └── utils/                # Utilidades para la aplicación
        └── api.ts            # Configuración adicional de Axios
```

---

## **Instalación**

### **Requisitos previos**

- **Node.js 18 o superior**
- **NPM** o **Yarn** instalado.

### **Pasos para configurar**

1. Clona el repositorio:

   ```bash
   git clone https://github.com/JeronimoToroC/hamburgueseria-concurrente.git
   cd hamburgueseria/frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno en el archivo `.env`:

   ```plaintext
   VITE_API_URL=http://127.0.0.1:8000
   ```

4. Inicia la aplicación:
   ```bash
   npm run dev
   ```

---

## **Características**

1. **Chat interactivo:**

   - Simula una conversación entre el cliente y el empleado.
   - Permite al cliente enviar pedidos de hamburguesas y bebidas.

2. **Formulario dinámico:**

   - Los productos pueden ser seleccionados directamente en el chat.
   - Las cantidades se gestionan mediante incrementos y decrementos.

3. **Conexión con el backend:**

   - El formulario envía pedidos al backend y consulta el estado en tiempo real.
   - Se utiliza **Axios** para manejar las solicitudes HTTP.

4. **Estilizado moderno:**

   - Estilos gestionados con **Tailwind CSS**.
   - Componentes estilizados creados con **ShadCN/UI**.

5. **Gestión de estado global:**
   - Implementación de Redux para manejar los estados relacionados con los pedidos.

---

## **Uso de la aplicación**

### **Pedidos**

1. Abre el chat.
2. Selecciona la cantidad de hamburguesas y bebidas que deseas pedir.
3. Presiona "Ordenar" para enviar tu pedido.
4. El empleado responderá con mensajes dinámicos basados en el estado del backend.

---

## **Extender el frontend**

### **Agregar un nuevo componente**

1. Crea el archivo del componente en la carpeta `components/`.
2. Importa y usa el componente donde sea necesario.

### **Agregar lógica para nuevas funciones**

1. Crea un slice en `store/slices/` para manejar el nuevo estado.
2. Conecta el slice al store global en `store/index.ts`.

---

## **Pruebas**

1. Verifica que la aplicación se renderice correctamente:
   ```bash
   npm run dev
   ```
2. Usa las herramientas de desarrollador del navegador para monitorear las solicitudes a `/pedidos/` y `/pedidos/{id}/estado`.

---

## **Futuras Mejoras**

- Implementar notificaciones más avanzadas para errores y confirmaciones.
- Agregar soporte para múltiples chats simultáneos.
- Mejorar la visualización del estado del pedido en tiempo real.

---

## **Créditos**

- **Desarrollado por**: Jerónimo Toro C
- **Contacto**: jeronimo.toro.c@gmail.com
