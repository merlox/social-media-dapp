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
                hashtags: ['test', 'dapp', 'blockchain']
            }, {
                author: '0x211824098yf7320417812j1002341342342341234',
                message: 'This is another test',
                hashtags: ['sample', 'dapp', 'Ethereum']
            }],
            hashtags: ['dapp', 'Ethereum', 'blockchain', 'technology', 'design']
        }
    }

    render() {
        let contentBlock = this.state.content.map((element, index) => (
            <div key={index} className="content">
                <div className="content-address">{element.author}</div>
                <div className="content-message">{element.message}</div>
                <div>{element.hashtags.map((hashtag, i) => (<span key={i}>#{hashtag} </span>))}</div>
            </div>
        ))
        let hashtagBlock = this.state.hashtags.map((element, index) => (
            <div key={index}>
                <a className="hashtag" href="#">#{element}</a>
            </div>
        ))
        return (
            <div className="main-container">
                <div className="hashtag-block">
                    <h2>Most popular hashtags</h2>
                    <div className="hashtag-container">{hashtagBlock}</div>
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
