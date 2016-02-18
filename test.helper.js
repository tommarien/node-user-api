import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {describe, it} from 'mocha/mocha';

chai.use(chaiAsPromised);

global.describe = describe;
global.it = it;
global.expect = expect;