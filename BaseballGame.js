class BaseballGame {
    constructor() {
       
        this.secretKey = this.generateSecretKey();
    }
    generateSecretKey() {
        let secretKey = '';
        let n1, n2, n3;

        n1 = Math.floor(Math.random() * 10);
        secretKey += n1;

        do {
            n2 = Math.floor(Math.random() * 10);
        } while (n2 === n1);
        secretKey += ',' + n2;

        do {
            n3 = Math.floor(Math.random() * 10);
        } while (n3 === n1 || n3 === n2);
        secretKey += ',' + n3;

        return secretKey;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BaseballGame();
});