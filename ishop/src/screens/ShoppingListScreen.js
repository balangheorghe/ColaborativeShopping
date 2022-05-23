import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight, SafeAreaView} from 'react-native';
import {ListItem, Text, Icon, SearchBar, Image, Badge} from 'react-native-elements'
import {connectMe, AUTH, SHOP} from "../store/connectConfig";
import {sleep} from "../utils/utils";
import Spacer from "../components/Spacer";
import {useSafeArea} from "react-native-safe-area-context";
import {max, min} from "react-native-reanimated";

const ShoppingListScreen = (props) => {
    const insets = useSafeArea();
    return (
        <SafeAreaView style={{paddingTop: insets.top}}>
            <View style={styles.container}>
                <SearchBar
                    placeholder=""
                    platform="android"
                    containerStyle={{marginHorizontal: 20, borderRadius: 20, marginBottom: 5}}
                />
                <FlatList data={props.shoppingList}
                          keyExtractor={item => item.name}
                          renderItem={({index, item}) => {
                              let countSize = 15 ? item.count <= 999 : 10;
                              return (
                                  <TouchableOpacity
                                      onPress={() => {
                                          props.actions.toggleItemSelect(item.name);
                                      }}
                                      onLongPress={() => {
                                          props.navigation.navigate("ProductItem", {
                                              item: item
                                          });
                                      }}
                                  >
                                      <View style={styles.listItem}>
                                          <TouchableOpacity
                                              style={styles.decreaseRemoveHighlight}
                                              onPress={() => {
                                                  if (item.s) {
                                                      if (item.count <= 1)
                                                          props.actions.removeItem(item.name);
                                                      else props.actions.editItem(item.name, item.count - 1);
                                                  }
                                              }}
                                          >
                                              <View>
                                                  {
                                                      item.s ? (
                                                          item.count <= 1 ? (
                                                              <Icon
                                                                  name="delete-circle-outline"
                                                                  type="material-community"
                                                                  style={styles.decreaseRemoveIcon}
                                                              />
                                                          ) : (
                                                              <Icon
                                                                  name="minus-circle"
                                                                  type="foundation"
                                                                  style={styles.decreaseRemoveIcon}
                                                              />
                                                          )
                                                      ) : null
                                                  }
                                              </View>
                                          </TouchableOpacity>

                                          <View style={{flex: 8, flexDirection: 'row', justifyContent: 'center'}}>
                                              <Text style={styles.productName}>{item.name}</Text>
                                              {item.quantity ? (
                                                  <View style={styles.productQuantity}>
                                                      <Text
                                                          style={styles.productQuantityValue}>{item.quantity.value}</Text>
                                                      <Text
                                                          style={styles.productQuantityType}>{item.quantity.type}</Text>
                                                  </View>
                                              ) : null}
                                          </View>

                                          <View style={{flex: 2, justifyContent: 'center'}}>
                                              {item.photoUrl ? (
                                                  <Image source={{uri: item.photoUrl}}
                                                         style={styles.productImage}/>
                                              ) : null}
                                          </View>
                                          <TouchableOpacity
                                              style={{flex: 1, justifyContent: 'center'}}
                                              onPress={() => {
                                                  props.actions.editItem(item.name, item.count + 1);
                                                  if (!item.s) {
                                                      props.actions.toggleItemSelect(item.name);
                                                  }
                                              }}>
                                              <View style={styles.productCount}>
                                                  <Text style={{
                                                      fontSize: 10,
                                                      alignSelf: 'center'
                                                  }}>x</Text><Text>{item.count}</Text>
                                              </View>
                                          </TouchableOpacity>
                                      </View>
                                  </TouchableOpacity>
                              )
                          }}/>
            </View>
        </SafeAreaView>
    )
        ;
};

const styles = StyleSheet.create({
    listItem: {
        margin: 2,
        // borderColor: 'red',
        // borderWidth: 2,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        height: 60,
    },
    decreaseRemoveHighlight: {
        flex: 0.8,
        // borderColor: 'blue',
        // borderWidth: 2,
        justifyContent: 'center'
    },
    decreaseRemoveIcon: {},
    productName: {
        flex: 8,
        fontSize: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        // borderColor: 'red',
        // borderWidth: 2,
        maxHeight: '100%'
    },
    productQuantity: {
        flexDirection: 'column',
        flex: 2,
        justifyContent: 'center'
    },
    productQuantityValue: {
        alignSelf: 'center',
        fontSize: 12
    },
    productQuantityType: {
        alignSelf: 'center',
        fontSize: 10
    },
    productImage: {
        // flex: 2,
        width: 50,
        height: 50
    },
    productCount: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default connectMe(ShoppingListScreen, SHOP, true, true);
