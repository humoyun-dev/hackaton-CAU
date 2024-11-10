import React from 'react';
import { FlatList, View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { useWish } from '../store/wish';
import FoodItem from '../components/card';
;

const WishScreen: React.FC = () => {
  const { wishList } = useWish();

  return (
    <SafeAreaView style={styles.container}>
      {wishList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your wish list is empty.</Text>
        </View>
      ) : (
        <FlatList
          data={wishList}
          renderItem={({ item, index }) => <FoodItem index={index} item={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatListContent: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
  },
});

export default WishScreen;
