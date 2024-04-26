class ResponseAPI {
    list(data) {
        return {
            'totals': data.length,
            'results': data
        };
    }

    data(item) {
        return item;
    }

    success(message) {
        return { 'message': [message] };
    }

    inputError(input, message) {
        return { 'message': { [input]: [message] } };
    }

    error(message) {
        return { 'message': { 'non_field_error': [message] } };
    }
}

module.exports = new ResponseAPI();
