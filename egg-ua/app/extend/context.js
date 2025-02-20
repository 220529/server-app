'use strict';

module.exports = {
    get isChrome() {
        const chromeReg = /chrome/i;
        return chromeReg.test(this.get('user-agent'));
    },
};
