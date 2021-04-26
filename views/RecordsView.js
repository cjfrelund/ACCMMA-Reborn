import React, { useState, useEffect } from "react";

import { View, Button, Text, ScrollView, VirtualizedList } from "react-native";
import styles from "../stylesheet";

import { Overlay, Card } from "react-native-elements";
import { ManageTeam } from "../components/ManageTeam";

import { useRecords } from "../providers/RecordsProvider";
import { RecordItem } from "../components/RecordItem";
import { AddRecord } from "../components/AddRecord";

export function RecordsView({ navigation, route }) {
  const { name } = route.params;

  const [overlayVisible, setOverlayVisible] = useState(false);
  Card
  const { records, createRecord } = useRecords();
  useEffect(() => {
    navigation.setOptions({
      headerRight: function Header() {
        return <AddRecord createRecord={createRecord} />;
      },
      title: `${name}'s Records`,
    });
  }, []);

  return (
    <ScrollView>

      {records.map((record) =>
        record ?
          <Card style={styles.recordCard}>
            <RecordItem key={`${record._id}`} record={record} />
          </Card> : null
      )}

      {name === "My Organization" ? (
        <>

          <View style={styles.manageTeamButtonContainer}>
            <Button
              title="Manage Caretakers"
              onPress={() => setOverlayVisible(true)}
            />
          </View>
          <Overlay
            isVisible={overlayVisible}
            onBackdropPress={() => setOverlayVisible(false)}
          >
            <ManageTeam />
          </Overlay>
        </>
      ) : null}
    </ScrollView>
  );
}
