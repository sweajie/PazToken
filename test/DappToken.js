const DappToken =  artifacts.require("DappToken");


contract('DappToken' , (accounts)=>{
    it('set the total supply' , ()=>{
        return DappToken.deployed().then((instance)=>{
            return instance.totalSupply()
        }).then((totalSupply)=>{
            assert.equal(totalSupply.toNumber() , 1000000 , 'set 1000000 total supply')
        })
    })
})
