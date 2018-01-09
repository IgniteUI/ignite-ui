// This will run before html files

const start =  function (params) {
	throw new Error("use assert.async()");
}
const stop = start;

const module = QUnit.module;
const test = QUnit.test;