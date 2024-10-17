const request = require('supertest');
const app = require('../../app.js');
const sequelize = require('../database/index.js');
const Task = require('../model/tasks.js');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

describe('Testes das rotas de tarefas', () => {
    it('Deve criar uma nova tarefa', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({
                title: 'Nova Tarefa',
                description: 'Descrição da nova tarefa.'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Nova Tarefa');
    });

    it('Deve listar todas as tarefas', async () => {
        const response = await request(app)
            .get('/tasks');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('Deve atualizar uma tarefa existente', async () => {
        const createdTask = await Task.create({
            title: 'Tarefa para Atualizar',
            description: 'Descrição da tarefa.'
        });

        const response = await request(app)
            .put(`/tasks/${createdTask.id}`)
            .send({
                title: 'Tarefa Atualizada',
                description: 'Nova descrição da tarefa.'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('Tarefa Atualizada');
    });

    it('Deve remover uma tarefa', async () => {
        const createdTask = await Task.create({
            title: 'Tarefa para Remover',
            description: 'Descrição da tarefa.'
        });

        const response = await request(app)
            .delete(`/tasks/${createdTask.id}`);

        expect(response.statusCode).toBe(204);

        const getResponse = await request(app)
            .get(`/tasks/${createdTask.id}`);
        expect(getResponse.statusCode).toBe(404);
    });

    it('Deve marcar uma tarefa como concluída', async () => {
        const createdTask = await Task.create({
            title: 'Tarefa para Completar',
            description: 'Descrição da tarefa.'
        });

        const response = await request(app)
            .patch(`/tasks/${createdTask.id}/complete`);

        expect(response.statusCode).toBe(200);
        expect(response.body.completed).toBe(true);
    });
});
