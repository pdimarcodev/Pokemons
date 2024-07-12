import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { useGetPokemons } from "@/hooks/useGetPokemons";
import { PokemonCard } from "@/components/PokemonCard";
import { useCallback, useRef, useState } from "react";

export default function Pokemons() {
  const [nextUrl, setNextUrl] = useState<string>();
  const { data, error, isValidating } = useGetPokemons({ nextUrl });

  const ref = useRef<FlatList>(null);
  const onEndReachedCalledDuringMomentum = useRef<boolean>(true);

  const loadMore = useCallback(() => {
    if (!onEndReachedCalledDuringMomentum.current && data?.next) {
      setNextUrl(data?.next);
      onEndReachedCalledDuringMomentum.current = true;
      ref?.current?.scrollToIndex({
        index: 0,
        animated: true,
      });
    }
  }, [data?.next]);

  const onMomentumScrollBegin = (): void => {
    onEndReachedCalledDuringMomentum.current = false;
  };

  if (isValidating) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      ref={ref}
      data={data?.results}
      numColumns={2}
      keyExtractor={({ name }) => name}
      contentContainerStyle={{
        paddingTop: 50,
        paddingBottom: 150,
        paddingHorizontal: 20,
        gap: 10,
      }}
      columnWrapperStyle={{ gap: 10 }}
      decelerationRate={0.5}
      onScrollBeginDrag={onMomentumScrollBegin}
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
      // initialNumToRender={10}
      // windowSize={10}
      // removeClippedSubviews
      // maxToRenderPerBatch={5}
      showsVerticalScrollIndicator={false}
      renderItem={({ item: { url }, index }) => (
        <PokemonCard url={url} index={index} />
      )}
      // ListFooterComponent={
      //   <ActivityIndicator size="large" style={styles.spinner} />
      // }
      refreshControl={
        <RefreshControl
          refreshing={isValidating}
          onRefresh={() => setNextUrl(data?.previous || "")}
        />
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.1}
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
