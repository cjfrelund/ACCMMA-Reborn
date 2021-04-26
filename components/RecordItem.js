import React, { useState } from "react";
import { Text, ListItem } from "react-native-elements";
import { useRecords } from "../providers/RecordsProvider";
import { ActionSheet } from "./ActionSheet";
import { Record } from "../schemas";

export function RecordItem({ record }) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const { deleteRecord, setRecordStatus } = useRecords();
  const actions = [
    {
      title: "Delete",
      action: () => {
        deleteRecord(record);
      },
    },
  ];

  // For each possible status other than the current status, make an action to
  // move the record into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
  if (record.status !== "" && record.status !== Record.STATUS_OPEN) {
    actions.push({
      title: "Mark Open",
      action: () => {
        setRecordStatus(record, Record.STATUS_OPEN);
      },
    });
  }
  if (record.status !== Record.STATUS_IN_PROGRESS) {
    actions.push({
      title: "Mark In Progress",
      action: () => {
        setRecordStatus(record, Record.STATUS_IN_PROGRESS);
      },
    });
  }
  if (record.status !== Record.STATUS_COMPLETE) {
    actions.push({
      title: "Mark Complete",
      action: () => {
        setRecordStatus(record, Record.STATUS_COMPLETE);
      },
    });
  }

  return (
    <>
      <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          if (record.status) {
            setActionSheetVisible(false);
          }
        }}
        actions={actions}
      />
      <ListItem
        key={record.id}
        onPress={() => {
          setActionSheetVisible(true);
        }}
        title={record.name}
        bottomDivider
        checkmark={
          record.status === Record.STATUS_COMPLETE ? (
            <Text>&#10004; {/* checkmark */}</Text>
          ) : record.status === Record.STATUS_IN_PROGRESS ? (
            <Text>In Progress</Text>
          ) : null
        }
      />
    </>
  );
}
