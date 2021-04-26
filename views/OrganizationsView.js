import React from "react";
import { View } from "react-native";
import { useAuth } from "../providers/AuthProvider";
import { ListItem, Card } from "react-native-elements";

export function OrganizationsView({ navigation }) {
  const { organizationData } = useAuth();

  // the onClickOrganization navigates to the Record List with the organization name
  // and organization partition value
  const onClickOrganization = async (organization) => {
    navigation.navigate("Record List", {
      name: organization.name,
      organizationPartition: organization.partition,
    });
  };

  return (
    <View>

      {organizationData.map((organization) => (
        <View key={organization.name}>
          <Card>
            <ListItem
              title={organization.name}
              onPress={() => onClickOrganization(organization)}
              bottomDivider
              key={organization.name}
            /></Card>
        </View>
      ))}
    </View>
  );
}
