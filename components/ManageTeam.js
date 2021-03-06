import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Alert } from "react-native";
import styles from "../stylesheet";
import { Text, ListItem } from "react-native-elements";

import { useAuth } from "../providers/AuthProvider";

export function ManageTeam() {
  const { user } = useAuth();
  const [newTeamMember, setNewTeamMember] = useState(null);
  const [teamMemberList, setTeamMemberList] = useState([]);

  // getTeam calls the backend function getMyTeamMembers to retrieve the
  // team members of the logged in user's organization.
  const getTeam = async () => {
    try {
      const teamMembers = await user.functions.getMyTeamMembers([]);
      setTeamMemberList(teamMembers);
    } catch (err) {
      Alert.alert("An error occurred while getting team members", err);
    }
  };

  // addTeamMember calls the backend function addTeamMember to add a
  // team member to the logged in user's organization.
  const addTeamMember = async () => {
    try {
      await user.functions.addTeamMember(newTeamMember);
      getTeam();
    } catch (err) {
      Alert.alert("An error occurred while adding a team member", err.message);
    }
  };

  // removeTeamMember calls the backend function removeTeamMember to remove a
  // team member from the logged in user's organization.
  const removeTeamMember = async (email) => {
    try {
      await user.functions.removeTeamMember(email);
      getTeam();
    } catch (err) {
      Alert.alert("An error occurred while removing a team member", err);
    }
  };

  const openDeleteDialogue = (member) => {
    Alert.alert("Remove the following member from your team?", member.name, [
      {
        text: "Remove",
        onPress: () => {
          removeTeamMember(member.name);
        },
      },
      { text: "cancel", style: "cancel" },
    ]);
  };

  // Load the team when the component is first mounted or when the user changes.
  useEffect(() => {
    getTeam();
  }, [user]);

  return (

    <View style={styles.manageTeamWrapper}>
      <View style={styles.manageTeamTitle}>
        <Text h4>Add Caretaker</Text>
      </View>
      {teamMemberList.map((member) => (
        <ListItem
          title={member.name}
          onPress={() => openDeleteDialogue(member)}
          bottomDivider
          key={member.name}
        />
      ))}


      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setNewTeamMember(text)}
          value={newTeamMember}
          placeholder="new caretaker username"
          style={styles.addTeamMemberInput}
          autoCapitalize="none"
        />
        <Text style={styles.descriptionContainer}>Caretaker must have already created an ACCMMA account. Only then can caretaker gain access to the organization to begin charting.</Text>
      </View>
      <Button onPress={() => addTeamMember(newTeamMember)} title="Add Caretaker" />
    </View>
  );
}
