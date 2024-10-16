// src/routes/taskRoutes.js
import { Router } from 'express';
import Task from '../model/tasks.js';

const router = Router();

// Criar uma nova tarefa
router.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTask = await Task.create({ title, description, completed: false });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar a tarefa' });
    }
});

// Listar todas as tarefas
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar as tarefas' });
    }
});

// Atualizar uma tarefa existente
router.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        task.title = title;
        task.description = description;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a tarefa' });
    }
});

// Remover uma tarefa
router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        await task.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover a tarefa' });
    }
});

// Marcar uma tarefa como concluída
router.patch('/tasks/:id/complete', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        task.completed = true;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao marcar a tarefa como concluída' });
    }
});

export default router;
