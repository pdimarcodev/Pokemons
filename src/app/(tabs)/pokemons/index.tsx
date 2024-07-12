import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useGetPokemons } from "@/hooks/useGetPokemons";
import { PokemonCard } from "@/components/PokemonCard";

export default function Pokemons() {
  const { data, error, isLoading } = useGetPokemons();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={data?.results}
      keyExtractor={(item) => item?.name}
      contentContainerStyle={{
        paddingTop: 50,
        paddingBottom: 128,
        paddingHorizontal: 20,
      }}
      // ItemSeparatorComponent={ItemDivider}
      // ListFooterComponent={ItemDivider}
      // ListEmptyComponent={
      // 	<View>
      // 		<Text style={utilsStyles.emptyContentText}>No playlist found</Text>

      // 		<FastImage
      // 			source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
      // 			style={utilsStyles.emptyContentImage}
      // 		/>
      // 	</View>
      // }
      initialNumToRender={10}
      windowSize={10}
      removeClippedSubviews
      maxToRenderPerBatch={5}
      showsVerticalScrollIndicator={false}
      renderItem={({ item: { url }, index }) => (
        <PokemonCard url={url} index={index} />
      )}
      // ListFooterComponent={
      //   <ActivityIndicator size="large" style={styles.spinner} />
      // }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  flatListContentContainer: {
    paddingHorizontal: 5,
    marginTop: Platform.OS === "android" ? 50 : 20,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 80,
  },
  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === "android" ? 120 : 80,
  },
});
