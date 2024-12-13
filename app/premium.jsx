import PremiumFeatures from "@/components/PremiumFeatures";
import React from "react";
import { Button, Text, View } from "react-native";

const premium = () => {
  return (
    <View>
      <View>
        <Text>Forms Subscription</Text>
        <View>
          <Text>Image</Text>
        </View>
      </View>

      {/*  animated text sliding up */}
      <View>
        <PremiumFeatures iconLeft="" text="" />
      </View>

      {/*  plans sliders */}
      <View>
        <View>
          <Text>tag</Text>
        </View>
        <View>
          <Text>Plan Name</Text>
          <Text>Plan Money</Text>
          <Text>per duration</Text>
        </View>
      </View>

      <View>
        <Button title="Upgrade to premium" />
        <Button title="" />

        <Button title="Term of use and Privacy policy" />

        <Button title="Restore susbscription" />
      </View>
    </View>
  );
};

export default premium;
