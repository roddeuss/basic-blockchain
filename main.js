const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calcauteHash;
    }

    calcauteHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}


class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];

    }

    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis block", "0")
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calcauteHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousHash = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calcauteHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousHash.hash){
                return false;
            }
        } 

        return true;
    }
}

let savjeeCoin = new BlockChain()
savjeeCoin.addBlock(new Block(1, "10/07/2017", {amount: 4}));
savjeeCoin.addBlock(new Block(1, "10/07/2017", {amount: 10}));

console.log("is blockchain valid ?" + savjeeCoin.isChainValid())

savjeeCoin.chain[1].data = {amount : 100};
savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calcauteHash();

console.log("is blockchain valid ?" + savjeeCoin.isChainValid())
// console.log(JSON.stringify(savjeeCoin, null, 4 ))