import app from '../../app';
import supertest from 'supertest';
import { expect } from 'chai';
import shortid from 'shortid';
import mongoose from 'mongoose';

describe('Categories', () => {
  let request: supertest.SuperAgentTest;

  const category = {
    name: 'Test category',
    description: 'Test description'
  }

  let categoryId: string;

  before(() => {
    request = supertest.agent(app);
  });

  after((done) => {
    app.close(() => {
      mongoose.connection.close(done);
    });
  });

  describe('/categories', () => {
    it('(GET) should return a list of categories', async () => {
      let res = await request.get('/categories');
      expect(res.status).to.equal(200);
      expect(res.body).not.be.empty;
      expect(res.body).to.be.an('array');
    });

    it('(POST) should return required name field is missing', async () => {
      let res = await request.post('/categories');
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Required name field is missing');
    });

    it('(POST) should return a category and match with the test dto', async () => {
      let res = await request.post('/categories').send(category);
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('description');
      expect(res.body.name).to.equal(category.name);
      expect(res.body.description).to.equal(category.description);
      categoryId = res.body._id;
    });

    it('(POST) should return category with this name already exists', async () => {
      let res = await request.post('/categories').send(category);
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Category with this name already exists');
    });
  });

  describe('/categories/:categoryId', () => {
    it('(ALL) should return category with this id does not exist', async () => {
      let res = await request.get(`/categories/${shortid.generate()}`);
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Category with this id does not exist');
    });

    it('(GET) should return a category by id', async () => {
      let res = await request.get(`/categories/${categoryId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('description');
      expect(res.body.name).to.equal(category.name);
      expect(res.body.description).to.equal(category.description);
    });

    it('(PUT) should return required name and description fields are missing', async () => {
      let res = await request.put(`/categories/${categoryId}`);
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Name and description are required');
    });

    it('(PUT) should update a category', async () => {
      let res = await request.put(`/categories/${categoryId}`).send({
        name: 'Test category updated',
        description: 'Test description updated'
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('description');
      expect(res.body.name).to.equal('Test category updated');
      expect(res.body.description).to.equal('Test description updated');
    });

    it('(PATCH) should return required name and description fields are missing', async () => {
      let res = await request.patch(`/categories/${categoryId}`);
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Name and description are required');
    });

    it('(PATCH) should update a category', async () => {
      let res = await request.patch(`/categories/${categoryId}`).send({
        name: 'Test category updated again',
        description: 'Test description updated again'
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('description');
      expect(res.body.name).to.equal('Test category updated again');
      expect(res.body.description).to.equal('Test description updated again');
    });

    it('(DELETE) should return category with deleted set on true', async () => {
      let res = await request.delete(`/categories/${categoryId}`);
      expect(res.status).to.equal(200);
    });
  });
});