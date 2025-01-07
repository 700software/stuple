"use strict";
/* eslint-disable react-hooks/rules-of-hooks */
//------------------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var alternate1 = { a: 1, b: 2 };
var alternate2 = { a: 1, c: 3 };
var newLocal = Math.random() ? alternate1 : alternate2;
var parentStuple = (0, _1.useStuple)(newLocal);
(0, _1.subStuple)(parentStuple, 'a');
// @ts-expect-error
(0, _1.subStuple)(parentStuple, 'b');
//------------------------------------------------------------------------------
