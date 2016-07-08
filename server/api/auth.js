const apiKeys = [
    '778b6b01-68ba-4156-970e-fd4fdb18c7dd',
    '807a5d97-3500-4ed9-b1cc-777cbdb8488a',
    'e9e405bd-06a0-467b-a31e-0af0d06dc5eb',
    '1541eea5-2841-483c-9057-925e05186d1c',
    '482d681b-d7e3-4f87-a667-58baa23dfe70',
    'fd4267da-692f-41c8-9b30-f0690b3ff3da',
    '43d08412-bdce-4de5-8f5d-13a9a4c4c317',
    '001bd42c-67a5-4608-8cdc-1f467262403c',
    '59c573a9-ef51-4a41-8a79-f4bc5b38eba4',
    '199b29d2-5d94-4ff4-952a-e9fb0d0de968'
];

/**
 * @function validateApiKey
 * @description Validate if correct api was provided
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 * @param {Function} next - Callback
 */
function validateApiKey (req, res, next) {
    if(!req.headers.apikey) return res.status(403).send('API key must be provided');

    if(apiKeys.indexOf(req.headers.apikey) >= 0) {
        return next();
    } else {
        return res.status(403).send('Forbidden');
    }
}

export default {
    validateApiKey
}