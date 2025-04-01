import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'fast-text-encoding';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;