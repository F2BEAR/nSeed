#!/usr/bin/env node

import { cli } from './cli';
export { Types } from './types';
export { Template } from './template';
export { dbconnect } from './connection';

cli();
