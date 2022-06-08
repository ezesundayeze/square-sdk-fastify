const { fastify } = require('fastify');
const uuidv4 = require('uuid4');
const { paymentsApi } = require("./connect.square.js");


const PORT = 3001;
const app = fastify();
async function startApp() {
    try {
        app.register(require('@fastify/cors'), {
            origin: '*',
        });

        app.post("/pay", async (request, reply) => {
            let body = request.body;
            body.idempotencyKey = uuidv4();
            body.amountMoney = {
                amount: 1,
                currency: 'GBP',
            };

            let paymentResponse = paymentsApi.createPayment(body);
            paymentResponse.then((response) => {
                console.log(response)
                reply.send(response)
            })
        });
        await app.listen(PORT);
        console.log('listening on port', PORT);
    } catch (e) {
        console.error(e);
    }
}

startApp();