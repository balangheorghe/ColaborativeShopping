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
                <View style={{margin: 1}}></View>
                <FlatList data={props.shoppingList}
                          keyExtractor={item => item.name}
                          renderItem={({index, item}) => {
                              // containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                              let titleSize = max(20, min(21, 21));
                              return (
                                  <ListItem
                                      title={item.name}
                                      titleStyle={{fontSize: 20}}
                                      // badge={{
                                      //     value: `x${item.count}`, containerStyle: {transform: [{scale: 1.3}]}, onPress() {
                                      //         props.actions.editItem(item.name, item.count + 1);
                                      //         if (!item.s) {
                                      //             props.actions.toggleItemSelect(item.name);
                                      //         }
                                      //     }
                                      // }}
                                      leftElement={
                                          item.s ? (
                                              item.count <= 1 ? (
                                                  <Icon
                                                      type="antdesign"
                                                      name="closecircleo"
                                                      style={styles.count}
                                                      onPress={() => {
                                                          props.actions.removeItem(item.name)
                                                      }}
                                                  />
                                              ) : (
                                                  <Icon
                                                      type="antdesign"
                                                      name="minuscircleo"
                                                      style={styles.count}
                                                      onPress={() => {
                                                          props.actions.editItem(item.name, item.count - 1)
                                                      }}
                                                  />
                                              )
                                          ) : null
                                      }
                                      rightElement={
                                          <View style={{flexDirection: 'row', transform: [{scale: 1.3}]}}>
                                              {item.quantity ? (
                                                  <View style={{
                                                      flexDirection: 'row',
                                                      marginHorizontal: 5,
                                                      alignSelf: "center"
                                                  }}>
                                                      <Text>{item.quantity.value}</Text>
                                                      <Text>{item.quantity.type}</Text>
                                                  </View>
                                              ) : null}
                                              {/*<Badge*/}
                                              {/*    value={item.count}*/}
                                              {/*    onPress={() => {*/}
                                              {/*        props.actions.editItem(item.name, item.count + 1);*/}
                                              {/*        if (!item.s) {*/}
                                              {/*            props.actions.toggleItemSelect(item.name);*/}
                                              {/*        }*/}
                                              {/*    }}*/}
                                              {/*    badgeStyle={{paddingVertical: 15, backgroundColor: '#7dbaed'}}*/}
                                              {/*    textStyle={{color: 'black'}}*/}
                                              {/*/>*/}
                                              <View>
                                                  <TouchableOpacity
                                                      style={styles.count}
                                                      onPress={() => {
                                                          props.actions.editItem(item.name, item.count + 1);
                                                          if (!item.s) {
                                                              props.actions.toggleItemSelect(item.name);
                                                          }
                                                      }}
                                                  >
                                                      <View style={{flexDirection: 'row'}}>
                                                          <Text style={styles.times}>x</Text><Text>{item.count}</Text>
                                                      </View>
                                                  </TouchableOpacity>
                                              </View>
                                          </View>
                                      }
                                      rightSubtitle={
                                          <View style={{flexDirection: 'column'}}>
                                              {
                                                  item.photoUrl ? (
                                                      <Image source={{uri: item.photoUrl}}
                                                             style={{width: 50, height: 50}}/>
                                                  ) : null
                                              }
                                          </View>
                                      }
                                      onPress={() => {
                                          props.actions.toggleItemSelect(item.name)
                                      }}
                                      onLongPress={() => {

                                      }}
                                      underlayColor="white"
                                      containerStyle={styles.listItem}
                                      bottomDivider
                                  />
                              )
                          }}/>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        color: "white"
    },
    container: {
        // borderColor: 'red',
        // borderWidth: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 30,
        borderTopWidth: 0.4,
        paddingHorizontal: 10,
        // borderBottomWidth: 1,
        borderColor: 'gray'
    },
    listItem: {
        marginHorizontal: 10,
        borderRadius: 7,
        marginVertical: 1,
        backgroundColor: 'white'
    },
    count: {
        flexDirection: 'column',
        flex: 4,
        borderWidth: 5,
        borderTopWidth: 7,
        borderBottomWidth: 7,
        // borderRightWidth: 5,
        // borderLeftWidth: 5,
        borderColor: 'white'
    },
    times: {
        alignSelf: 'center',
        fontSize: 9,
        color: 'gray'
    }
});

export default connectMe(ShoppingListScreen, SHOP, true, true);
