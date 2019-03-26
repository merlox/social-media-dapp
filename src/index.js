import React from 'react'
import ReactDOM from 'react-dom'
import Web3Js from 'web3'
import ABI from '../build/contracts/SocialMedia.json'
import './index.css'

class Main extends React.Component {
    constructor() {
        super()

        this.state = {
            contents: [],
            topHashtags: ['dapp', 'Ethereum', 'blockchain', 'technology', 'design'],
            followedHashtags: ['electronics', 'design', 'robots', 'futurology', 'manufacturing'],
            displaySubscribe: false,
            displaySubscribeId: '',
            user: '',
            contract: '',
        }

        this.setup()
    }

    async setup() {
        window.web3js = new Web3Js(ethereum)
        try {
            await ethereum.enable();
        } catch (error) {
            alert('You must approve this dApp to interact with it, reload it to approve it')
        }
        const user = (await web3js.eth.getAccounts())[0]
        window.contract = new web3js.eth.Contract(ABI.abi, ABI.networks['3'].address, {
            from: user
        })
        await this.setState({contract, user})
        this.updateTopHashtags()
        this.getContent()
    }

    generateHashtags(hashtag, index) {
        let timeout
        return (
            <span onMouseEnter={() => {
                clearTimeout(timeout)
                this.setState({
                    displaySubscribe: true,
                    displaySubscribeId: `subscribe-${hashtag}-${index}`,
                })
            }} onMouseLeave={() => {
                timeout = setTimeout(() => {
                    this.setState({
                        displaySubscribe: false,
                        displaySubscribeId: '',
                    })
                }, 2e3)
            }}>
                <a className="hashtag" href="#">#{hashtag}</a>
                <span className="spacer"></span>
                <button ref={`subscribe-${hashtag}-${index}`} className={this.state.displaySubscribe && this.state.displaySubscribeId == `subscribe-${hashtag}-${index}` ? '' : 'hidden'} type="button">Subscribe</button>
                <span className="spacer"></span>
            </span>
        )
    }

    async updateTopHashtags() {
        const topHashtags = (await contract.methods.getTopHashtags(10).call()).map(element => web3js.utils.toUtf8(element))
        await this.setState({topHashtags})
    }

    bytes32(name) {
        let nameHex = web3js.utils.toHex(name)
        for(let i = nameHex.length; i < 66; i++) {
            nameHex = nameHex + '0'
        }
        return nameHex
    }

    async publishContent(message, hashtags) {
        if(message.length == 0) alert('You must write a message')
        hashtags = hashtags.trim().replace(/#*/g, '').replace(/,+/g, ',').split(',').map(element => this.bytes32(element.trim()))
        message = this.bytes32(message)
        try {
            await this.state.contract.methods.addContent(message, hashtags).send({
                from: this.state.user,
                gas: 8e6
            })
        } catch (e) {console.log('Error', e)}
        await this.updateTopHashtags()
    }

    async getContent() {
        const latestContentId = await this.state.contract.methods.latestContentId().call()
        const amount = 10
        let contents = []
        let counter = amount
        // If we don't have enough content yet, show whats in there
        if(latestContentId < amount) counter = latestContentId
        for(let i = 0; i < counter; i++) {
            let content = await this.state.contract.methods.getContentById(i).call()
            content = {
                id: content[0],
                author: content[1],
                time: new Date(parseInt(content[2] + '000')).toLocaleDateString(),
                message: content[3],
                hashtags: content[4],
            }
            content.message = web3js.utils.toUtf8(content.message)
            content.hashtags = content.hashtags.map(hashtag => web3js.utils.toUtf8(hashtag))
            contents.push(content)
        }
        this.setState({contents})
    }

    render() {
        let contentBlock = this.state.contents.map((element, index) => (
            <div key={index} className="content">
                <div className="content-address">{element.author}</div>
                <div className="content-message">{element.message}</div>
                <div className="content-hashtags">{element.hashtags.map((hashtag, i) => (
                    <span key={i}>
                        {this.generateHashtags(hashtag, index)}
                    </span>
                ))}
                </div>
                <div className="content-time">{element.time}</div>
            </div>
        ))
        let topHashtagBlock
        if(this.state.topHashtags.length == 0) {
            topHashtagBlock = 'There are no hashtags yet, come back later!'
        } else {
            topHashtagBlock = this.state.topHashtags.map((hashtag, index) => (
                <div key={index}>
                    {this.generateHashtags(hashtag, index)}
                </div>
            ))
        }
        let followedHashtags = this.state.followedHashtags.map((hashtag, index) => (
            <div key={index}>
                {this.generateHashtags(hashtag, index)}
            </div>
        ))
        return (
            <div className="main-container">
                <div className="hashtag-block">
                    <h3>Top hashtags</h3>
                    <div className="hashtag-container">{topHashtagBlock}</div>
                    <h3>Followed hashtags</h3>
                    <div className="hashtag-container">{followedHashtags}</div>
                </div>
                <div className="content-block">
                    <div className="input-container">
                        <textarea ref="content" placeholder="Publish content..."></textarea>
                        <input ref="hashtags" type="text" placeholder="Hashtags separated by commas without the # sign..."/>
                        <button onClick={() => {
                            this.publishContent(this.refs.content.value, this.refs.hashtags.value)
                        }} type="button">Publish</button>
                    </div>

                    <div className="content-container">
                        {contentBlock}
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.querySelector('#root'))
