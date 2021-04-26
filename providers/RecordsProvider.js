import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Record } from "../schemas";
import { useAuth } from "./AuthProvider";

const RecordsContext = React.createContext(null);

const RecordsProvider = ({ children, organizationPartition }) => {
  const [records, setRecords] = useState([]);
  const { user } = useAuth();

  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);

  useEffect(() => {
    const config = {
      sync: {
        user: user,
        partitionValue: organizationPartition,
      },
    };
    // open a realm for this particular organization
    Realm.open(config).then((organizationRealm) => {
      realmRef.current = organizationRealm;

      const syncRecords = organizationRealm.objects("Record");
      let sortedRecords = syncRecords.sorted("name");
      setRecords([...sortedRecords]);
      sortedRecords.addListener(() => {
        setRecords([...sortedRecords]);
      });
    });

    return () => {
      // cleanup function
      const organizationRealm = realmRef.current;
      if (organizationRealm) {
        organizationRealm.close();
        realmRef.current = null;
        setRecords([]);
      }
    };
  }, [user, organizationPartition]);

  const createRecord = (newRecordName) => {
    const organizationRealm = realmRef.current;
    organizationRealm.write(() => {
      // Create a new reocrd in the same partition -- that is, in the same organization.
      organizationRealm.create(
        "Record",
        new Record({
          name: newRecordName || "New Record",
          partition: organizationPartition,
        })
      );
    });
  };

  const setRecordStatus = (record, status) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.
    if (
      ![
        Record.STATUS_OPEN,
        Record.STATUS_IN_PROGRESS,
        Record.STATUS_COMPLETE,
      ].includes(status)
    ) {
      throw new Error(`Invalid status: ${status}`);
    }
    const organizationRealm = realmRef.current;

    organizationRealm.write(() => {
      record.status = status;
    });
  };

  // Define the function for deleting a record.
  const deleteRecord = (record) => {
    const organizationRealm = realmRef.current;
    organizationRealm.write(() => {
      organizationRealm.delete(record);
      setRecords([...organizationRealm.objects("Record").sorted("name")]);
    });
  };

  // Render the children within the RecordContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useRecords hook.
  return (
    <RecordsContext.Provider
      value={{
        createRecord,
        deleteRecord,
        setRecordStatus,
        records,
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
};

// The useRecords hook can be used by any descendant of the RecordsProvider. It
// provides the records of the RecordsProvider's organization and various functions to
// create, update, and delete the records in that organization.
const useRecords = () => {
  const record = useContext(RecordsContext);
  if (record == null) {
    throw new Error("useRecords() called outside of a RecordsProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return record;
};

export { RecordsProvider, useRecords };
