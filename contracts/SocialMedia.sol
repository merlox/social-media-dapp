// This is a social media smart contract that allows people to publish strings of text in short formats with a focus on hashtags so that they can follow, read and be in touch with the latest content regarding those hashtags. There will be a mapping os top hashtags. A struct for each piece of content with the date, author, content and array of hashtags. We want to avoid focusing on specific users that's why user accounts will be anonymous where addresses will the be the only identifiers.

pragma solidity ^0.5.5;

contract SocialMedia {
    struct Content {
        uint256 id;
        address author;
        uint256 date;
        string content;
        bytes32[] hashtags;
    }

    event ContentAdded(uint256 indexed id, address indexed author, uint256 indexed date, string content, bytes32[] hashtags);

    mapping(bytes32 => uint256) public hashtagRanking; // It returns the position in the ranking of a particular hashtag
    mapping(uint256 => bytes32) public topHashtags; // This is defined by the hashtag score and it's updated everytime a user uses a hashtag or subscribes to one
    mapping(address => bytes32) public subscribedHashtags;
    mapping(bytes32 => uint256) public hashtagScore; // The number of times this hashtag has been used, used to sort the top hashtags
    mapping(bytes32 => Content[]) public contentByHashtag;
    mapping(uint256 => Content) public contentById;
    address[] public users;
    Content[] public contents;
    uint256 public latestContentId;

    /// @notice To add new content to the social media dApp. If no hashtags are sent, the content is added to the #general hashtag list.
    /// @param _content The string of content
    /// @param _hashtags The hashtags used for that piece of content
    function addContent(string memory _content, bytes32[] memory _hashtags) public {
        require(bytes(_content).length > 0, 'The content cannot be empty');

        Content memory newContent = Content(latestContentId, msg.sender, now, _content, _hashtags);
        // If the user didn't specify any hashtags add the content to the #general hashtag
        if(_hashtags.length == 0) {
            contentByHashtag['general'].push(newContent);
            hashtagScore['general']++;
        } else {
            for(uint256 i = 0; i < _hashtags.length; i++) {
                contentByHashtag[_hashtags[i]].push(newContent);
                hashtagScore[_hashtags[i]]++;
            }
        }
        updateHashtagRankings();
        contentById[latestContentId] = newContent;
        contents.push(newContent);
        users.push(msg.sender);
        emit ContentAdded(latestContentId, msg.sender, now, _content, _hashtags);
        latestContentId++;
    }

    /// @notice To subscribe to a hashtag
    /// @param _hashtag The hashtag name
    function subscribeToHashtag(bytes32 _hashtag) public {}

    /// @notice To unsubscribe to a hashtag
    /// @param _hashtag The hashtag name
    function unsubscribeToHashtag(bytes32 _hashtag) public {}

    /// @notice To update the top hashtag rankings
    function updateHashtagRankings() public {


        mapping(bytes32 => uint256) public hashtagRanking; // It returns the position in the ranking of a particular hashtag
        mapping(uint256 => bytes32) public topHashtags; // This is defined by the hashtag score and it's updated everytime a user uses a hashtag or subscribes to one
        mapping(bytes32 => uint256) public hashtagScore; // The number of times this hashtag has been used, used to sort the top hashtags
    }

    /// @notice To get the top hashtags
    /// @param _amount How many top hashtags to get in order, for instance the top 20 hashtags
    /// @return bytes32[] Returns the names of the hashtags
    function getTopHashtags(uint256 _amount) public view returns(bytes32[] memory) {}

    /// @notice To get the followed hashtag names for this msg.sender
    /// @return bytes32[] The hashtags followed by this user
    function getFollowedHashtags() public view returns(bytes32[] memory) {}

    /// @notice To get the top hashtags
    /// @param _hashtag The hashtag from which get content
    /// @param _amount The quantity of contents to get for instance, 50 pieces of content for that hashtag
    /// @return uint256[] Returns the ids of the contents so that you can get each piece independently with a new request since you can't return arrays of strings
    function getContentIdsByHashtag(uint256 _hashtag, uint256 _amount) public view returns(uint256[] memory) {}

    /// @notice Returns the data for a particular content id
    /// @param _id The id of the content
    /// @return Returns the id, author, date, content and hashtags for that piece of content
    function getContentById(uint256 _id) public view returns(uint256, address, uint256, string memory, bytes32) {}
}
