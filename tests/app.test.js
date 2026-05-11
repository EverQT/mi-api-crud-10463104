const request = require('supertest');
const app = require('../src/app');

describe('API de Tareas - Pruebas CRUD', () => {
  
  test('GET /tasks - debe retornar lista de tareas', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  test('GET /tasks/:id - debe retornar tarea especifica', async () => {
    const res = await request(app).get('/tasks/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title', 'Aprender GitHub Actions');
  });

  test('GET /tasks/:id - 404 para tarea que no existe', async () => {
    const res = await request(app).get('/tasks/999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /tasks - debe crear nueva tarea', async () => {
    const newTask = { title: 'Tarea de prueba' };
    const res = await request(app).post('/tasks').send(newTask);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id', 3);
    expect(res.body.title).toBe('Tarea de prueba');
  });

  test('PUT /tasks/:id - debe actualizar tarea', async () => {
    const updates = { title: 'Tarea actualizada', completed: true };
    const res = await request(app).put('/tasks/1').send(updates);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Tarea actualizada');
    expect(res.body.completed).toBe(true);
  });

  test('DELETE /tasks/:id - debe eliminar tarea', async () => {
    const res = await request(app).delete('/tasks/3');
    expect(res.statusCode).toBe(204);
    
    const getRes = await request(app).get('/tasks/3');
    expect(getRes.statusCode).toBe(404);
  });
});