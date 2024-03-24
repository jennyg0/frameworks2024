// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

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

    struct Campaign {
        string title;
        string description;
        address payable creator;
        uint goal;
        uint pledged;
        uint32 startAt;
        uint32 endAt;
        bool claimed;
    }

    uint public count;
    mapping(uint => Campaign) public campaigns;
    mapping(uint => mapping(address => uint)) public pledgedAmount;

    function launch(
        string calldata _title,
        string calldata _description,
        uint _goal,
        uint32 _startAt,
        uint32 _endAt
    ) external returns (uint) {
        require(_endAt > _startAt, "end at <= start at");

        count++;
        campaigns[count] = Campaign({
            title: _title,
            description: _description,
            creator: payable(msg.sender),
            goal: _goal,
            pledged: 0,
            startAt: _startAt,
            endAt: _endAt,
            claimed: false
        });

        emit Launch(count, msg.sender, _title, _description, _goal, _startAt, _endAt);
        return count;
    }

    function pledge(uint _id) external payable {
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp >= campaign.startAt && block.timestamp <= campaign.endAt, "campaign not active");

        campaign.pledged += msg.value;
        pledgedAmount[_id][msg.sender] += msg.value;

        emit Pledge(_id, msg.sender, msg.value);
    }

    function cancel(uint _id) external {
        Campaign storage campaign = campaigns[_id];
        require(campaign.creator == msg.sender, "not creator");
        require(block.timestamp < campaign.startAt, "already started");

        delete campaigns[_id];
        emit Cancel(_id);
    }


    function claim(uint _id) external {
        Campaign storage campaign = campaigns[_id];
        require(campaign.creator == msg.sender, "not creator");
        require(block.timestamp > campaign.endAt, "not ended");
        require(campaign.pledged >= campaign.goal, "pledged < goal");
        require(!campaign.claimed, "claimed");

        campaign.claimed = true;

        emit Claim(_id);
    }

    function refund(uint _id) external {
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp > campaign.endAt, "not ended");
        require(campaign.pledged < campaign.goal, "pledged >= goal");

        uint bal = pledgedAmount[_id][msg.sender];
        pledgedAmount[_id][msg.sender] = 0;

        emit Refund(_id, msg.sender, bal);
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
        ids = new uint[](count);

        for (uint i = 1; i <= count; i++) {
            Campaign storage campaign = campaigns[i];
            ids[i - 1] = i;
            titles[i - 1] = campaign.title;
            descriptions[i - 1] = campaign.description;
        }

        return (ids, titles, descriptions);
    }
}
