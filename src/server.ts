import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";

const app: FastifyInstance = fastify();

app.register(userRoutes, {
  prefix: '/users',
})

app.listen({
  port:3100,
}, 
() => {
  console.log('Server is running!');
  
})