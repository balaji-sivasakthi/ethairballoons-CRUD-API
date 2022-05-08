// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.2;
pragma experimental ABIEncoderV2;
contract patientContract {
	uint public dataId;
	uint public numberOfRecords = 0;
	uint[] public recordsList;

	event dataAdded(string dat);

	struct Patient {
		string payload;
		uint listPointer;
	}

	mapping(uint => Patient) public facts;

	function isRecord(uint recordAddress) public view returns (bool isRec) {
		if(recordsList.length == 0) return false;
		return (recordsList[facts[recordAddress].listPointer] == recordAddress);
	}

	function getRecordCount() public view returns (uint recCount){
		return recordsList.length;
	}

	function addRecord(string memory payload, uint ID) public returns (bool success) {
	if(isRecord(ID)) revert('record with this id already exists');
		facts[ID].payload = payload;
		recordsList.push(ID);
		facts[ID].listPointer = recordsList.length - 1;
		numberOfRecords++;
		return (true);
	}

	function getRecord(uint id) public view returns (string memory payload){
	if(!isRecord(id)) revert('record with this id does not exist');
		return (facts[id].payload);
	}

	function updateRecord(uint id, string memory payload) public returns (bool success){
		if(!isRecord(id)) revert('record with this id does not exist');
		facts[id].payload = payload;
		return (true);
	}

	function getAllRecords() public view returns (string[] memory payloads) {
		string[] memory payloadss = new string[](numberOfRecords);
		for (uint i = 0; i < numberOfRecords; i++) {
			Patient storage fact = facts[recordsList[i]];
			payloadss[i] = fact.payload;
		}
		return (payloadss);
	}

function deleteRecord(uint id) public returns (bool success) {
    if(!isRecord(id)) revert('record with this id does not exist');
    uint rowToDelete = facts[id].listPointer;
    uint keyToMove = recordsList[recordsList.length-1];
    recordsList[rowToDelete] = keyToMove;
    facts[keyToMove].listPointer = rowToDelete;
    recordsList.pop();
    numberOfRecords--;
    return (true);
  }

}