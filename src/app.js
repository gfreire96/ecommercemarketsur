import express from "express";
import autenticacionRoutes from  "./router/autenticacion_routes.js";
import productosRoutes from "./router/productos_routes.js";
import categoriasRoutes from "./router/categorias_router.js";
import ordenesRoutes from "./router/ordenes_routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from 'morgan';

// const FRONTEND_URL = process.env.FRONTEND_URL;

dotenv.config();

const app = express();//acá estoy creando el servidor; encargado de recibir las peticiones y devolver respuestas
const port = process.env.PORT || 3000; 
app.use(morgan("dev"));

const allowedOrigins = [
  'https://ecommercemarketsur-front.vercel.app',
  'https://ecommercemarketsur-front-git-main-gfreire96s-projects.vercel.app',
  'https://ecommercemarketsur-front-px9dmou4m-gfreire96s-projects.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // postman/curl
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json()); //middleware que permite que el servidor entienda JSON en las peticiones
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use('/api', autenticacionRoutes); //middleware para las rutas de autenticación
app.use('/api/productos', productosRoutes); //middleware para las rutas de productos
app.use('/api/categorias', categoriasRoutes)
app.use('/api', ordenesRoutes)

app.use((err, req, res, next) =>{
    res.status(500).json({
        status: 'error',
        message: err.message
    });
});

export default app;
