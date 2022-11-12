export function isValid(json, request) {
    for (let i = 0; i < json.length; i++) {
        if (request[json[i]] === "") {
            return false
        }
    }
    return true
}