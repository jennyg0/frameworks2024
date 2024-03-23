// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address, uint) external returns (bool);

    function transferFrom(address, address, uint) external returns (bool);
}

contract CrowdFund {
    event Launch(
        uint indexed id,
        address indexed creator,
        string title,
        string description,
        uint goal,
        uint32 startAt,
        uint32 endAt
    );

    event Cancel(uint id);
    event Pledge(uint indexed id, address indexed caller, uint amount);
    event Unpledge(uint indexed id, address indexed caller, uint amount);
    event Claim(uint id);
    event Refund(uint id, address indexed caller, uint amount);
    event Subscribe(uint indexed id, address indexed caller, uint amount);
    event Unsubscribe(uint indexed id, address indexed caller);
    event MonthlyProgressUpdated(uint indexed id, uint monthlyProgress);


    struct Campaign {
        string title;
        string description;
        address creator;
        uint goal;
        uint pledged;
        uint32 startAt;
        uint32 endAt;
        bool claimed;
        uint monthlyGoal;
        uint monthlyProgress;
        mapping(address => uint) subscriptions;
    }

    IERC20 public immutable token;
    // Total count of campaigns created.
    // It is also used to generate id for new campaigns.
    uint public count;
    // Mapping from id to Campaign
    mapping(uint => Campaign) public campaigns;
    // Mapping from campaign id => pledger => amount pledged
    mapping(uint => mapping(address => uint)) public pledgedAmount;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function launch(
        string calldata _title,
        string calldata _description,
        uint _goal,
        uint32 _startAt,
        uint32 _endAt,
        uint _monthlyGoal
        ) external returns (uint){
        require(_startAt >= block.timestamp, "start at < now");
        require(_endAt >= _startAt, "end at < start at");

        count += 1;
        Campaign storage campaign = campaigns[count];
        campaign.title = _title;
        campaign.description = _description;
        campaign.creator = msg.sender;
        campaign.goal = _goal;
        campaign.pledged = 0;
        campaign.startAt = _startAt;
        campaign.endAt = _endAt;
        campaign.claimed = false;
        campaign.monthlyGoal = _monthlyGoal;
        campaign.monthlyProgress = 0;

        emit Launch(count, msg.sender, _title, _description, _goal, _startAt, _endAt);
        return count;
    }

    function getCampaign(uint _id) external view returns (string memory title, string memory description, uint goal, uint pledged, uint32 startAt, uint32 endAt, bool claimed) {
        require(_id <= count && _id > 0, "Campaign does not exist");
        Campaign storage campaign = campaigns[_id];
        return (
            campaign.title,
            campaign.description,
            campaign.goal,
            campaign.pledged,
            campaign.startAt,
            campaign.endAt,
            campaign.claimed
        );
    }

    function getAllCampaigns() external view returns (uint[] memory ids, string[] memory titles, string[] memory descriptions) {
        ids = new uint[](count);
        titles = new string[](count);
        descriptions = new string[](count);

        for (uint i = 1; i <= count; i++) {
            Campaign storage campaign = campaigns[i];
            ids[i - 1] = i;
            titles[i - 1] = campaign.title;
            descriptions[i - 1] = campaign.description;
        }

        return (ids, titles, descriptions);
    }

    function cancel(uint _id) external {
        Campaign storage campaign = campaigns[_id];
        require(campaign.creator == msg.sender, "not creator");
        require(block.timestamp < campaign.startAt, "started");

        delete campaigns[_id];
        emit Cancel(_id);
    }

    function pledge(uint _id, uint _amount) external {
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp >= campaign.startAt, "not started");
        require(block.timestamp <= campaign.endAt, "ended");

        campaign.pledged += _amount;
        pledgedAmount[_id][msg.sender] += _amount;
        token.transferFrom(msg.sender, address(this), _amount);

        emit Pledge(_id, msg.sender, _amount);
    }

    function unpledge(uint _id, uint _amount) external {
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp <= campaign.endAt, "ended");

        campaign.pledged -= _amount;
        pledgedAmount[_id][msg.sender] -= _amount;
        token.transfer(msg.sender, _amount);

        emit Unpledge(_id, msg.sender, _amount);
    }

    function claim(uint _id) external {
        Campaign storage campaign = campaigns[_id];
        require(campaign.creator == msg.sender, "not creator");
        require(block.timestamp > campaign.endAt, "not ended");
        require(campaign.pledged >= campaign.goal, "pledged < goal");
        require(!campaign.claimed, "claimed");

        campaign.claimed = true;
        token.transfer(campaign.creator, campaign.pledged);

        emit Claim(_id);
    }

    function refund(uint _id) external {
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp > campaign.endAt, "not ended");
        require(campaign.pledged < campaign.goal, "pledged >= goal");

        uint bal = pledgedAmount[_id][msg.sender];
        pledgedAmount[_id][msg.sender] = 0;
        token.transfer(msg.sender, bal);

        emit Refund(_id, msg.sender, bal);
    }
}