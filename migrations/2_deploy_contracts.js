const SocialMedia = artifacts.require("./SocialMedia.sol")

let contentsJson = [{
    content: "Even though you can't see the physical impact of software to the environment, you have to remember that software is a set of technologies consuming natural resources to generate energy, which by itself, degrades the environment.",
    hashtags: [bytes32('nature'), bytes32('business'), bytes32('technology'), bytes32('software')],
}, {
    content: "The largest companies can be taken down with a strong team working towards a vision because they can do what large budgets can't: create unique products.",
    hashtags: [bytes32('business'), bytes32('blockchain'), bytes32('technology'), bytes32('ethereum')],
}, {
    content: "Our beliefs determine our behaviours, mental attitude and potential. When a fixed mindset is adopted talent is static and success restricted to genetic predisposition. A growth mindset believes that talent can be developed through hard work and perseverance. Growth mindset can lead to disruptive innovation and can be a game changer.",
    hashtags: [bytes32('hardword'), bytes32('attitude'), bytes32('perseverance'), bytes32('ethereum'), bytes32('potential'), bytes32('talent')],
}]

module.exports = function(deployer) {
    deployer.deploy(
        SocialMedia,
        { gas: 8e6 }
    )//.then(async contractInstance => {
    //     for(let i = 0; i < contentsJson.length; i++) {
    //         console.log('Adding content:', i)
    //         await contractInstance.contract.methods.addContent(contentsJson[i].content, contentsJson[i].hashtags).send({
    //             gas: 8e6,
    //             gasPrice: 20e9,
    //         })
    //     }
    // })
}

function bytes32(name) {
    let nameHex = web3.utils.toHex(name)
    for(let i = nameHex.length; i < 66; i++) {
        nameHex = nameHex + '0'
    }
    return nameHex
}
