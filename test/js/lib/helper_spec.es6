import {expect} from 'chai';

import {getName} from '../../../app/js/lib/helper';

describe('helper.jsx', () => {
    describe('func getName', () => {
        it('Get hard-coded name', () => {
            expect(getName()).to.equal('Boilerplate');
        });
    });
});

