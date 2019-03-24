import React from 'react'
import ReactDOM from 'react-dom'
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
            hashtags: ['dapp', 'Ethereum', 'blockchain', 'technology', 'design'],
            followedHashtags: ['electronics', 'design', 'robots', 'futurology', 'manufacturing'],
        }
    }

    render() {
        let contentBlock = this.state.content.map((element, index) => (
            <div key={index} className="content">
                <div className="content-address">{element.author}</div>
                <div className="content-message">{element.message}</div>
                <div className="content-hashtags">{element.hashtags.map((hashtag, i) => (<span key={i}>#{hashtag} </span>))}</div>
                <div className="content-time">{element.time}</div>
            </div>
        ))
        let hashtagBlock = this.state.hashtags.map((element, index) => (
            <div key={index}>
                <a className="hashtag" href="#">#{element}</a>
            </div>
        ))
        let followedHashtags = this.state.followedHashtags.map((element, index) => (
            <div key={index}>
                <a className="hashtag" href="#">#{element}</a>
            </div>
        ))
        return (
            <div className="main-container">
                <div className="hashtag-block">
                    <h3>Most popular hashtags</h3>
                    <div className="hashtag-container">{hashtagBlock}</div>
                    <h3>Followed hashtags</h3>
                    <div className="hashtag-container">{followedHashtags}</div>
                </div>
                <div className="content-block">
                    <div className="input-container">
                        <textarea placeholder="Publish content..."></textarea>
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
