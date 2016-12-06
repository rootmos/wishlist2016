import { getSub } from './utils/JwtHelpers.js';

class Follow {
    constructor(id, token) {
        this.id = id;
        this.token = token;
        this.uid = getSub(token);
    }
}

export default Follow;
