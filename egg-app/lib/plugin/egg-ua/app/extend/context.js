'use strict';

module.exports = {
    get ua() {
        return this.get('User-Agent') || 'unknown';
    },
};