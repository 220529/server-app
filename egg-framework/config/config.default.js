'use strict';

module.exports = () => {
    const config = {}
    config.framework = {
        id: 1,
        type: "bill",
        name: 'egg-framework',
    }
    return {
        ...config
    }
}