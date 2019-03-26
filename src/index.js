import React from 'react'
import ReactDOM from 'react-dom'
import Web3Js from 'web3'
import './index.css'

class Main extends React.Component {
    constructor() {
        super()

        this.state = {
            content: [{
                author: '0x211824098yf7320417812j1002341342342341234',
                message: 'This is a test',
                hashtags: ['test', 'dapp', 'blockchain'],
                time: new Date().toLocaleDateString(),
            }, {
                author: '0x211824098yf7320417812j1002341342342341234',
                message: 'This is another test',
                hashtags: ['sample', 'dapp', 'Ethereum'],
                time: new Date().toLocaleDateString(),
            }],
            topHashtags: ['dapp', 'Ethereum', 'blockchain', 'technology', 'design'],
            followedHashtags: ['electronics', 'design', 'robots', 'futurology', 'manufacturing'],
            displaySubscribe: false,
            displaySubscribeId: '',
        }

        setup()
    }

    async setup() {
        window.web3js = new Web3Js(ethereum)
        try {
            await ethereum.enable();
        } catch (error) {
            alert('You must approve this dApp to interact with it, reload it to approve it')
        }
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

    render() {
        let contentBlock = this.state.content.map((element, index) => (
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
        let hashtagBlock = this.state.topHashtags.map((hashtag, index) => (
            <div key={index}>
                {this.generateHashtags(hashtag, index)}
            </div>
        ))
        let followedHashtags = this.state.followedHashtags.map((hashtag, index) => (
            <div key={index}>
                {this.generateHashtags(hashtag, index)}
            </div>
        ))
        return (
            <div className="main-container">
                <div className="hashtag-block">
                    <h3>Top hashtags</h3>
                    <div className="hashtag-container">{hashtagBlock}</div>
                    <h3>Followed hashtags</h3>
                    <div className="hashtag-container">{followedHashtags}</div>
                </div>
                <div className="content-block">
                    <div className="input-container">
                        <textarea placeholder="Publish content..."></textarea>
                        <input type="text" placeholder="Hashtags separated by commas..."/>
                        <button type="button">Publish</button>
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
