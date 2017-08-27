import express from 'express';
import app from './app';

describe('App spec', () => {
	it('Exports a default ES6 module', () => {
		app.should.equal(require('./app').default);
	});
	it('Exports an express app', () => {
		app.constructor.should.equal(express().constructor);
	});
});
