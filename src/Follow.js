import { getSub } from './utils/JwtHelpers.js';

class Follow {
    constructor(id, name, token) {
        this.id = id;
        this.name = name;
        this.token = token;
        this.uid = getSub(token);
    }
}

export default Follow;
