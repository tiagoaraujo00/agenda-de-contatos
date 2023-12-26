import { FastifyInstance } from "fastify";
import { ContactUseCase } from "../usecases/contact.usecases";
import { Contact, ContactCreate } from "../interfaces/contacts.interface";
import { authMiddleware } from "../middleware/auth.middleware";

export async function contactsRoutes(fastify: FastifyInstance) {
  const contactUseCase = new ContactUseCase();
  fastify.addHook("preHandler", authMiddleware);
  fastify.post<{ Body: ContactCreate }>("/", async (req, reply) => {
    const { name, email, phone } = req.body;
    const emailUser = req.headers["email"];
    try {
      const data = await contactUseCase.create({
        email,
        name,
        phone,
        userEmail: emailUser,
      });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
  fastify.get('/', async (req, reply) => {
    const emailUser = req.headers['email'];
    try {
      const data = await contactUseCase.listAllContacts(emailUser);
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
  fastify.put<{Body: Contact, Params: {id: string}}>('/:id', async (req, reply) => {
    const {id} = req.params;
    const { name, email, phone } = req.body
    try {
      const data = await contactUseCase.updateContatc({
        id,
        name,
        email,
        phone,
      })
      return reply.send(data)
    } catch (error) {
      reply.send(error)
    }
  })
}
