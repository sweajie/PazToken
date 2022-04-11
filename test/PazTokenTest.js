const PazTokenTest = artifacts.require("PazToken");

const token_setting = {
    totalSupply: 1000000,
    name: "Paz Token",
    symbol: "PAZ"
}

contract('PazToken', (accounts) => {
    let tokenInstance;

    it("initializes the contract with config", () => {
        return PazTokenTest.deployed().then((instance) => {
            tokenInstance = instance
            return tokenInstance.name()
        }).then((name) => {
            assert.equal(name, token_setting.name, 'The name is ' + token_setting.name)
            return tokenInstance.symbol()
        }).then((symbol) => {
            assert.equal(symbol, token_setting.symbol, 'The symbol is ' + token_setting.symbol)
            return tokenInstance.symbol()
        })
    });

    it('set the initial supply on deployment', () => {
        return PazTokenTest.deployed().then(() => {
            return tokenInstance.totalSupply()
        }).then((totalSupply) => {
            assert.equal(totalSupply.toNumber(), token_setting.totalSupply, 'set 1000000 total supply')

            return tokenInstance.balanceOf(accounts[0])
        }).then((adminBalance) => {
            assert.equal(adminBalance.toNumber(), token_setting.totalSupply, 'admin balance is 1000000')
        })
    })


    it('can trans token', () => {
        return PazTokenTest.deployed().then(() => {
            return tokenInstance.transfer.call(accounts[1] , token_setting.totalSupply +1)
        }).then(assert.fail).catch((error)=>{
            assert(error.message.indexOf('revert') >= 0 , 'error message must contain revert')
            return tokenInstance.transfer.call(accounts[1] , 200000 , {from : accounts[0]})
        }).then((res) => {
            assert.equal(res , true , "it can transfer")
            return tokenInstance.transfer(accounts[1] , 200000)
        }).then((transResult)=>{

            assert.equal(transResult.logs.length , 1 , "transfer event triggered once")
            let log = transResult.logs[0]
            assert.equal(log.event , "Transfer" , "Triggered event name must be Transfer")
            assert.equal(log.args._from , accounts[0] , "from account is ok")
            assert.equal(log.args._to , accounts[1] , "to account is ok")
            assert.equal(log.args._value , 200000 , "transfer amount is ok")

            return tokenInstance.balanceOf(accounts[1])
        }).then((receiptBalance)=>{
            assert.equal(receiptBalance.toNumber() , 200000, 'Receipt Balance ok after transfer')
            return tokenInstance.balanceOf(accounts[0])
        }).then((senderBalance)=>{
            assert.equal(senderBalance.toNumber() , 800000, 'Sender Balance ok after transfer')
        })
    })
})
