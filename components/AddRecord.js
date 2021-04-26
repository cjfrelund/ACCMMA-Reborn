import React, { useState } from "react";
import { Overlay, Button } from "react-native-elements";
import { TextInput, Text } from "react-native";
import styles from "../stylesheet";

// The AddRecord is a button for adding a record attched to a specific child. 
// When the button is pressed, an overlay is revealed, requesting user input. The user
// selects a child from the drop down menu, and then charts in the text area input. When
// the "Add Record" button on the oevelay is pressed, the data is saved and the overlay closes.

export function AddRecord({ createRecord }) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [newRecordName, setNewRecordName] = useState("");

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={{ width: "90%" }}
        onBackdropPress={() => setOverlayVisible(false)}
      >
        <>
          <Text>Select Child</Text>
          <Text type="label" >Chart</Text>
          <TextInput
            placeholder="New Record Name"
            onChangeText={(text) => setNewRecordName(text)}
            autoFocus={true}
            multiline={true}
          />
          <Button
            title="Add Record"
            onPress={() => {
              setOverlayVisible(false);
              createRecord(newRecordName);
            }}
          />
        </>
      </Overlay>
      <Button
        type="clear"
        titleStyle={styles.plusButton}
        title="&#x2b;"
        onPress={() => {
          setOverlayVisible(true);
        }}
      />
    </>
  );
}
