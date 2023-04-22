import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import Swiper from 'react-native-swiper';
//import Swiper from 'swiper';
//import SwiperCore, { Pagination } from 'swiper';
//import { Swiper, SwiperSlide } from 'swiper/react';
import { Dimensions } from 'react-native';
import { ScrollView, Animated } from "react-native";
import PagerView from 'react-native-pager-view';
import { KeyboardAvoidingView } from 'react-native';
import * as FileSystem from 'expo-file-system';


//SwiperCore.use([Pagination]);

const Stack = createNativeStackNavigator();

/**
 * HOME SCREEN 
 */
function HomeScreen({ navigation }) {
  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.box}>
        <Text style={homeStyles.text}>Welcome to the Shelter</Text>
      </View>
      <View style={homeStyles.buttonContainer}>
        <TouchableOpacity style={homeStyles.button} onPress={() => navigation.navigate('Connect')}>
          <Text style={homeStyles.buttonText}>Connect to the game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={homeStyles.button} onPress={() => navigation.navigate('Create')}>
          <Text style={homeStyles.buttonText}>Create game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={homeStyles.button} onPress={() => navigation.navigate('Rules')}>
          <Text style={homeStyles.buttonText}>Rules</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

/**
 * HOME SCREEN STYLE
 */
const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#baaa9c',
    padding: 15,
  },

  box: {
    backgroundColor: '#baaa9c',
    height: 200,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#816b69',
    textShadowColor: '#2b3245',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    textAlign: 'center',
    fontFamily: 'Cochin',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2b3245',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 10,
  },
  buttonText: {
    color: '#816b69',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Impact',
  },
});

/**
 * CONNECT SCREEN
 */
function ConnectScreen() {
  const [shelterNumber, setShelterNumber] = useState('');

  const handleShelterNumberChange = (text) => {
    setShelterNumber(text);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <KeyboardAvoidingView style={connectStyles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={connectStyles.container}>
          <Text style={connectStyles.title}>Connect to the game</Text>
          <View style={connectStyles.box}>
            <Text style={connectStyles.boxTitle}>Enter the received Shelter number</Text>
            <TextInput
              style={connectStyles.input}
              placeholder="Shelter number"
              value={shelterNumber}
              onChangeText={handleShelterNumberChange}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

/**
 * CONNECT SCREEN STYLE
 */
const connectStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#baaa9c',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#566d8a',
    textShadowColor: '#303b50',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Impact',
  },
  box: {
    backgroundColor: '#ae9c95',
    height: 200,
    width: '100%',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxTitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Impact',
  },
  input: {
    height: 40,
    width: 150,
    color: '#ffffff',
    backgroundColor: '#566d8a',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Impact',
  },
});

/**
 * CREATE SCREEN
 */
function CreateScreen({ navigation }) {
  const [difficulty, setDifficulty] = useState("");
  const [numPlayers, setNumPlayers] = useState(4);

  const handleDifficulty = (level) => {
    setDifficulty(level);
  };

  // number of players
  const handleNumPlayers = (value) => {
    setNumPlayers(value);
  };

  const handleNext = () => {
    navigation.navigate('CreateNumber', { numPlayers });
  }

  return (
    <View style={createStyles.container}>
      <Text style={createStyles.title}>Create</Text>
      <View style={createStyles.box}>
        <Text style={createStyles.boxTitle}>Enter the number of players</Text>
        <View style={createStyles.numPlayersContainer}>
          <Text style={createStyles.numPlayers}>{numPlayers}</Text>
        </View>
        <Slider
          style={{ width: "100%", marginBottom: 20 }}
          minimumValue={4}
          maximumValue={22}
          step={1}
          value={numPlayers}
          onValueChange={handleNumPlayers}
        />
        <Text style={createStyles.boxTitle}>Choose difficulty level</Text>
        <View style={createStyles.buttonsContainer}>
          <TouchableOpacity
            style={difficulty === "Easy" ? createStyles.selectedButton : createStyles.button}
            onPress={() => handleDifficulty("Easy")}
          >
            <Text style={createStyles.buttonText}>Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={difficulty === "Moderate" ? createStyles.selectedButton : createStyles.button}
            onPress={() => handleDifficulty("Moderate")}
          >
            <Text style={createStyles.buttonText}>Moderate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={difficulty === "Hard" ? createStyles.selectedButton : createStyles.button}
            onPress={() => handleDifficulty("Hard")}
          >
            <Text style={createStyles.buttonText}>Hard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={difficulty === "Failure" ? createStyles.selectedButton : createStyles.button}
            onPress={() => handleDifficulty("Failure")}
          >
            <Text style={createStyles.buttonText}>Failure</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={createStyles.nextButton}
        onPress={() => {
          navigation.navigate('CreateNumber', { numPlayers: numPlayers });
        }}>
        <Text style={createStyles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * CREATE SCREEN STYLE
 */
const createStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#baaa9c',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#566d8a',
    textShadowColor: '#303b50',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Impact',
  },
  box: {
    backgroundColor: '#ae9c95',
    height: 450,
    width: '100%',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: '#303b50',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Impact',
  },
  buttonsContainer: {
    flexDirection: 'column',
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#566d8a',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    marginBottom: 10
  },
  selectedButton: {
    backgroundColor: '#756a86',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    marginBottom: 10
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#756a86',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    marginBottom: 10,
    marginTop: 40,
    width: 200, // add width property
    height: 50, // add height property
    alignSelf: 'center',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  numPlayersContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#566d8a",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  numPlayers: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


/**
 * CREATE NUMBER SCREEN
 */
function CreateNumberScreen({ route, navigation }) {

  // const numPlayers = route.params.numPlayers;
  // const [selectedNumber, setSelectedNumber] = useState(1); //Math.floor(numPlayers / 2)
  // const range = Math.floor(numPlayers / 2); // set range based on numPlayers
  // const [scrollX] = useState(new Animated.Value(0));

  // const handleNumberSelect = (number) => {
  //   setSelectedNumber(number);
  // };

  // const handleScroll = (event) => {
  //   const contentOffset = event.nativeEvent.contentOffset;
  //   const index = Math.round(contentOffset.x / 100);
  //   handleNumberSelect(index + selectedNumber - 1); //index+1
  // };

  // const numbers = [];
  // for (let i = selectedNumber - range; i <= selectedNumber + range; i++) { //let i = selectedNumber - 1; i <= selectedNumber + 1; i++
  //   numbers.push(i);
  // }

  // const interpolations = numbers.map((number, index) => {
  //   const inputRange = [(index - 1) * 100, index * 100, (index + 1) * 100];
  //   const outputRange = [0.8, 1, 0.8];
  //   return scrollX.interpolate({
  //     inputRange,
  //     outputRange,
  //     extrapolate: "clamp",
  //   });
  // });

  //   return (
  //     <View style={createNumbeStyles.container}>
  //       <Text style={createNumbeStyles.title}>Your Shelter Number: </Text>
  //         <View style={createNumbeStyles.box}>
  //           <Text style={createNumbeStyles.boxTitle}>Choose your character number</Text>
  //           <Text style={createNumbeStyles.boxText}>----------------------------------</Text>
  //           <Text style={createNumbeStyles.boxText}>Two players cannot have the same number</Text>
  //           <Animated.ScrollView
  //             horizontal
  //             showsHorizontalScrollIndicator={false}
  //             onScrollEndDrag={handleScroll}
  //             onMomentumScrollEnd={handleScroll}
  //             onScroll={Animated.event(
  //               [{ nativeEvent: { contentOffset: { x: scrollX } } }],
  //               { useNativeDriver: true }
  //             )}
  //             contentContainerStyle={createNumbeStyles.scrollViewContentContainer}
  //             style={createNumbeStyles.scrollView}
  //             scrollEventThrottle={16}
  //       >
  //         {numbers.map((number) => ( //index
  //           <Animated.View
  //             key={number} //index
  //             style={[
  //               createNumbeStyles.numberContainer,
  //               { transform: [{ scale: interpolations[number - selectedNumber + 1] }] }, //index
  //               number === selectedNumber && createNumbeStyles.selectedNumberContainer,
  //             ]}
  //           >
  //             <Text
  //               style={[
  //                 createNumbeStyles.number,
  //                 number === selectedNumber && createNumbeStyles.selectedNumber,
  //               ]}
  //             >
  //               {number}
  //             </Text>
  //           </Animated.View>
  //           ))}
  //         </Animated.ScrollView>     
  //         </View>
  //     </View>
  //   );
  // } 
  const { numPlayers } = route.params;
  const [playerIndex, setNumPlayers] = useState(1);
  // index of player
  const handlePlayerIndex = (value) => {
    setNumPlayers(value);
    //setPlayerChosenIndex(value);
  };

  return (
    <View style={createNumbeStyles.container}>
      <Text style={createNumbeStyles.title}>Your Shelter Number: </Text>
      <Text style={createNumbeStyles.title}>###</Text>
      <View style={createNumbeStyles.box}>
        <Text style={createNumbeStyles.boxTitle}>Choose your character number</Text>
        <Text style={createNumbeStyles.boxText}>----------------------------------</Text>
        <Text style={createNumbeStyles.boxText}>Two players cannot have the same number</Text>
        <Slider
          style={{ width: "100%", marginBottom: 20 }}
          minimumValue={1}
          maximumValue={numPlayers}
          step={1}
          value={playerIndex}
          onValueChange={handlePlayerIndex}
        />
        <Text style={createNumbeStyles.playerText}>Your player number:</Text>
        <View style={createNumbeStyles.numPlayersContainer}>
          <Text style={createNumbeStyles.numPlayers}>{playerIndex}</Text>
        </View>
        <TouchableOpacity style={createNumbeStyles.nextButton}
          onPress={() => {
            navigation.navigate('gameScreen', { playerIndex: playerIndex, numPlayers: numPlayers });
          }}>
          <Text style={createNumbeStyles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// onPress={() => {
//   navigation.navigate('MainStack', {
//     screen: 'gameScreen',
//     params: { playerIndex: playerIndex, numPlayers: numPlayers },
//   });
// }}>

/**
 * CREATE NUMBER SCREEN STYLE
 */
const createNumbeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#baaa9c',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#566d8a',
    textShadowColor: '#303b50',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Impact',
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollViewContentContainer: {
    alignItems: "center",
  },
  numberContainer: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: "#ECECEC",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  selectedNumberContainer: {
    backgroundColor: "#566d8a",
  },
  number: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000000",
  },
  selectedNumber: {
    color: "#FFFFFF",
  },
  nextButton: {
    backgroundColor: '#756a86',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    marginBottom: 10,
    marginTop: 40,
    width: 200,
    height: 50,
    alignSelf: 'center',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  box: {
    flex: 1,
    backgroundColor: '#baaa9c',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
  },
  boxTitle: {
    color: '#ffffff',
    fontSize: 30,
    marginTop: -20,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Impact',
  },
  boxText: {
    color: '#566d8a',
    fontSize: 20,
    textAlign: 'center',
  },
  playerText: {
    color: '#ffffff',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Impact',
  },
  numPlayersContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#566d8a",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  numPlayers: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


async function createFile() {
  const fileName = "EasyArchive.txt";
  const fileUri = `${FileSystem.documentDirectory}${fileName}`;
  const dataToWrite = 'Business Consultant/Male, Heterosexual, 18 years/COVID/Pessimistic/Necrophilia/Claustrophobia (closed spaces)/Location of a shelter with 4 fertile women/5 flashlights/Was a competitive swimmer for ten years/Your vote counts as two (can be used once)/In case of your elimination, there will be spiders at the shelter/-1/\n'+
  'Corporate Executive/Male, Homosexual, 71 years/Tuberculosis/Selfish/Painting/Arachnophobia (spiders)/Location of a working vehicle/First aid kit/Was a world-renowned chef/Make one player\'s personality "Calm"/In case of your elimination, you choose another player that will get your vote posthumously for all of the votings after that happens/0/\n'+
  'Musician/Male, Homosexual, 52 years/Asthma/Inflexible/Necrophilia/Acrophobia (heights)/Location of a shelter with 4 fertile women/Insect repellent/Severe anger management issues/Delete another player\'s inventory/In case of your elimination, the shelter will be cleared of all pests/-4/\n'+
  'Musician/Female, Pansexual, 52 years/Hepatitis C/Selfish/Painting/Acrophobia (heights)/Location of a shelter with 4 fertile women/Deck of playing cards/Former member of a violent gang/Skip one player\'s turn/In turn 2, everyone reveals one characteristic of your choice. If it is already revealed, the player can choose any other characteristic to reveal/-5/\n'
  
  try {
    await FileSystem.writeAsStringAsync(fileUri, dataToWrite);
    console.log(`File '${fileName}' created successfully at ${fileUri}`);
  } catch (error) {
    console.log(`Error creating file: ${error}`);
  }
}
createFile();

async function readFromFile() {
  const fileName = "EasyArchive.txt";
  const fileUri = `${FileSystem.documentDirectory}${fileName}`;

  try {

    const contents = await FileSystem.readAsStringAsync(fileUri);
    console.log(contents);
    const players = contents.split('\n').map((playerStr) => {
      const playerData = playerStr.split('/');
      return {
        profession: playerData[0],
        bio: playerData[1],
        health: playerData[2],
        temper: playerData[3],
        hobby: playerData[4],
        phobia: playerData[5],
        knowledge: playerData[6],
        bag: playerData[7],
        additionalInfo: playerData[8],
        actionCard: playerData[9],
        conditionCard: playerData[10],
        diffLevel: playerData[11]
      };
    });
    return players;

  } catch (error) {
    console.error(error);
  }
}
/**
 * ACTUAL GAME SCREEN
 */
function GameScreen({ route }) {

  const { playerIndex, numPlayers } = route.params;
  const [currentPage, setCurrentPage] = useState(playerIndex - 1);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function loadPlayers() {
      const players = await readFromFile();
      setPlayers(players.slice(0, numPlayers));
    }
    loadPlayers();
  }, [numPlayers]);


  const handlePageChange = (event) => {
    setCurrentPage(event.nativeEvent.position);
  };
  if (players.length === 0) {
    return null; // or render a loading indicator
  }

  const pages = players.map((player, i) => {
    if (i + 1 === playerIndex) {
      return <MyPlayerScreen key={i} playerIndex={i + 1} player={player} />;
    } else {
      return <PlayerScreen key={i} playerIndex={i + 1} player={player} />;
    }
  });

  return (
    <PagerView style={{ flex: 1 }} initialPage={currentPage} onPageSelected={handlePageChange}>
      {pages}
    </PagerView>
  );
  
}
//navigation.navigate('playerScreen', { currentPage: currentPage});
/**
 * PLAYER SCREEN 
 * HELPER FUNCTION FOR ACTUAL GAME SCREEN
 */
function PlayerScreen({ playerIndex, player, currentPage }) {

  //const { playerIndex } = route.params;
  // const [showOtherPlayerInfo, setShowOtherPlayerInfo] = useState(false);

  // const toggleShowOtherPlayerInfo = () => {
  //   setShowOtherPlayerInfo(!showOtherPlayerInfo);
  // };
  const [showBoxInfo, setShowBoxInfo] = useState({
    bio: false,
    health: false,
    hobby: false,
    phobia: false,
    temper: false,
    additionalInfo: false,
    knowledge:false,
    bag:false,
    actionCard: false,
    conditionCard: false,
  });
  // const [currentPage, setCurrentPage] = useState(playerIndex - 1);

  // {playerIndex === currentPage || showBoxInfo.bio ? (
  //   <Text style={gameScreenStyles.boxInfoText}>{player.bio}</Text>
  // ) : (
  //   <TouchableOpacity
  //     style={gameScreenStyles.boxInfoTouch}
  //     onPress={() => setShowBoxInfo({ ...showBoxInfo, bio: true })}
  //   >
  //     <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
  //   </TouchableOpacity>
  // )}
  const [boxClickCount, setBoxClickCount] = useState(0);
  const [bordColor, setBordColor] = useState('white');
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (   
    
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView contentContainerStyle={gameScreenStyles.scrollContainer}>
        <View style={gameScreenStyles.container}>
          <Text style={gameScreenStyles.title}>Player #{playerIndex}</Text>
          <View style={gameScreenStyles.box}>

            <Text style={gameScreenStyles.boxTitle}>{player.profession}</Text>
            <Text style={gameScreenStyles.boxText}>BIO: </Text>
            <View style={[gameScreenStyles.boxInfo, { backgroundColor: '#fce090', borderColor: bordColor}]}>
            {boxClickCount === 0 ? (
              <TouchableOpacity
                style={gameScreenStyles.boxInfoTouch}
                onPress={() => {
                  setBoxClickCount(1);
                }}
              >
                 <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={gameScreenStyles.boxInfo}
                onPress={() => {
                  setBordColor('white');
                }}
              >
              <Text style={gameScreenStyles.boxInfoText}>{player.bio}</Text>
              </TouchableOpacity>
            )}


            </View>
            <Text style={gameScreenStyles.boxText}>Health: </Text>
            <View style={[gameScreenStyles.boxInfo, { backgroundColor: '#acf2a0' }]}>
            {playerIndex === currentPage || showBoxInfo.health ? (
                <Text style={gameScreenStyles.boxInfoText}>{player.health}</Text>
              ) : (
                <TouchableOpacity
                  style={gameScreenStyles.boxInfoTouch}
                  onPress={() => setShowBoxInfo({ ...showBoxInfo, health: true })}
                >
                  <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={gameScreenStyles.boxText}>Hobby: </Text>
            <View style={[gameScreenStyles.boxInfo, { backgroundColor: '#fab6fa' }]}>
              {playerIndex === currentPage || showBoxInfo.hobby ? (
                <Text style={gameScreenStyles.boxInfoText}>{player.hobby}</Text>
              ) : (
                <TouchableOpacity
                  style={gameScreenStyles.boxInfoTouch}
                  onPress={() => setShowBoxInfo({ ...showBoxInfo, hobby: true })}
                >
                  <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={gameScreenStyles.boxText}>Phobia: </Text>
            <View style={[gameScreenStyles.boxInfo, { backgroundColor: '#f57f7d' }]}>
              {playerIndex === currentPage || showBoxInfo.phobia ? (
                <Text style={gameScreenStyles.boxInfoText}>{player.phobia}</Text>
              ) : (
                <TouchableOpacity
                  style={gameScreenStyles.boxInfoTouch}
                  onPress={() => setShowBoxInfo({ ...showBoxInfo, phobia: true })}
                >
                  <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={gameScreenStyles.boxText}>Temper: </Text>
            <View style={[gameScreenStyles.boxInfo, { backgroundColor: '#e0b887' }]}>
              {playerIndex === currentPage || showBoxInfo.temper ? (
                <Text style={gameScreenStyles.boxInfoText}>{player.temper}</Text>
              ) : (
                <TouchableOpacity
                  style={gameScreenStyles.boxInfoTouch}
                  onPress={() => setShowBoxInfo({ ...showBoxInfo, temper: true })}
                >
                  <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={gameScreenStyles.boxText}>Additional Information: </Text>
            <View style={[gameScreenStyles.boxInfo, { backgroundColor: '#feb4ba' }]}>
              {playerIndex === currentPage || showBoxInfo.additionalInfo ? (
                <Text style={gameScreenStyles.boxInfoText}>{player.additionalInfo}</Text>
              ) : (
                <TouchableOpacity
                  style={gameScreenStyles.boxInfoTouch}
                  onPress={() => setShowBoxInfo({ ...showBoxInfo, additionalInfo: true })}
                >
                  <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={gameScreenStyles.boxText}>Knowledge: </Text>
            <View style={[gameScreenStyles.boxInfo, { backgroundColor: '#b4edfe' }]}>
              {playerIndex === currentPage || showBoxInfo.knowledge ? (
                <Text style={gameScreenStyles.boxInfoText}>{player.knowledge}</Text>
              ) : (
                <TouchableOpacity
                  style={gameScreenStyles.boxInfoTouch}
                  onPress={() => setShowBoxInfo({ ...showBoxInfo, knowledge: true })}
                >
                  <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={gameScreenStyles.boxText}>Bag: </Text>
            <View style={[gameScreenStyles.boxInfo, { backgroundColor: '#a3a4c4' }]}>
              {playerIndex === currentPage || showBoxInfo.bag ? (
                <Text style={gameScreenStyles.boxInfoText}>{player.bag}</Text>
              ) : (
                <TouchableOpacity
                  style={gameScreenStyles.boxInfoTouch}
                  onPress={() => setShowBoxInfo({ ...showBoxInfo, bag: true })}
                >
                  <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={gameScreenStyles.boxText}>Action Card: </Text>
            <View style={[gameScreenStyles.boxCard, { borderColor: '#484a8c' }]}>
              {playerIndex === currentPage || showBoxInfo.actionCard ? (
                <Text style={gameScreenStyles.boxCardText}>{player.actionCard}</Text>
              ) : (
                <TouchableOpacity
                  style={gameScreenStyles.boxInfoTouchCard}
                  onPress={() => setShowBoxInfo({ ...showBoxInfo, actionCard: true })}
                >
                  <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={gameScreenStyles.boxText}>Condition Card: </Text>
            <View style={[gameScreenStyles.boxCard, { borderColor: '#99454currentPage' }]}>
              {playerIndex === currentPage || showBoxInfo.conditionCard ? (
                <Text style={gameScreenStyles.boxCardText}>{player.conditionCard}</Text>
              ) : (
                <TouchableOpacity
                  style={gameScreenStyles.boxInfoTouchCard}
                  onPress={() => setShowBoxInfo({ ...showBoxInfo, conditionCard: true })}
                >
                  <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={gameScreenStyles.boxText}>Note: </Text>
            <TextInput
              style={gameScreenStyles.input}
              placeholder="Note"
            />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

function MyPlayerScreen({ playerIndex, player, currentPage }) {
  const [showBoxInfo, setShowBoxInfo] = useState({
    bio: true,
    health: true,
    hobby: true,
    phobia: true,
    temper: true,
    additionalInfo: true,
    knowledge: true,
    bag: true,
    actionCard: true,
    conditionCard: true,
  });

  const [boxClickCount, setBoxClickCount] = useState(0);
  const [bordColor, setBordColor] = useState('white');
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (   
    
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView contentContainerStyle={gameScreenStyles.scrollContainer}>
        <View style={gameScreenStyles.container}>
          <Text style={gameScreenStyles.title}>Player #{playerIndex}</Text>
          <View style={gameScreenStyles.box}>

            <Text style={gameScreenStyles.boxTitle}>{player.profession}</Text>
            <Text style={gameScreenStyles.boxText}>BIO: </Text>
            <View style={[gameScreenStyles.boxInfo, { backgroundColor: '#fce090', borderColor: bordColor}]}>
            {boxClickCount === 0 ? (
              <TouchableOpacity
                style={gameScreenStyles.boxInfoTouch}
                onPress={() => {
                  setBoxClickCount(1);
                }}
              >
                 <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={gameScreenStyles.boxInfo}
                onPress={() => {
                  setBordColor('white');
                }}
              >
              <Text style={gameScreenStyles.boxInfoText}>{player.bio}</Text>
              </TouchableOpacity>
            )}


            </View>
            <Text style={gameScreenStyles.boxText}>Health: </Text>
            <View style={[gameScreenStyles.boxInfo, { backgroundColor: '#acf2a0' }]}>
            {playerIndex === currentPage || showBoxInfo.health ? (
                <Text style={gameScreenStyles.boxInfoText}>{player.health}</Text>
              ) : (
                <TouchableOpacity
                  style={gameScreenStyles.boxInfoTouch}
                  onPress={() => setShowBoxInfo({ ...showBoxInfo, health: true })}
                >
                  <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={gameScreenStyles.boxText}>Hobby: </Text>
            <View style={[gameScreenStyles.boxInfo, { backgroundColor: '#fab6fa' }]}>
              {playerIndex === currentPage || showBoxInfo.hobby ? (
                <Text style={gameScreenStyles.boxInfoText}>{player.hobby}</Text>
              ) : (
                <TouchableOpacity
                  style={gameScreenStyles.boxInfoTouch}
                  onPress={() => setShowBoxInfo({ ...showBoxInfo, hobby: true })}
                >
                  <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={gameScreenStyles.boxText}>Phobia: </Text>
            <View style={[gameScreenStyles.boxInfo, { backgroundColor: '#f57f7d' }]}>
              {playerIndex === currentPage || showBoxInfo.phobia ? (
                <Text style={gameScreenStyles.boxInfoText}>{player.phobia}</Text>
              ) : (
                <TouchableOpacity
                  style={gameScreenStyles.boxInfoTouch}
                  onPress={() => setShowBoxInfo({ ...showBoxInfo, phobia: true })}
                >
                  <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={gameScreenStyles.boxText}>Temper: </Text>
            <View style={[gameScreenStyles.boxInfo, { backgroundColor: '#e0b887' }]}>
              {playerIndex === currentPage || showBoxInfo.temper ? (
                <Text style={gameScreenStyles.boxInfoText}>{player.temper}</Text>
              ) : (
                <TouchableOpacity
                  style={gameScreenStyles.boxInfoTouch}
                  onPress={() => setShowBoxInfo({ ...showBoxInfo, temper: true })}
                >
                  <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={gameScreenStyles.boxText}>Additional Information: </Text>
            <View style={[gameScreenStyles.boxInfo, { backgroundColor: '#feb4ba' }]}>
              {playerIndex === currentPage || showBoxInfo.additionalInfo ? (
                <Text style={gameScreenStyles.boxInfoText}>{player.additionalInfo}</Text>
              ) : (
                <TouchableOpacity
                  style={gameScreenStyles.boxInfoTouch}
                  onPress={() => setShowBoxInfo({ ...showBoxInfo, additionalInfo: true })}
                >
                  <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={gameScreenStyles.boxText}>Knowledge: </Text>
            <View style={[gameScreenStyles.boxInfo, { backgroundColor: '#b4edfe' }]}>
              {playerIndex === currentPage || showBoxInfo.knowledge ? (
                <Text style={gameScreenStyles.boxInfoText}>{player.knowledge}</Text>
              ) : (
                <TouchableOpacity
                  style={gameScreenStyles.boxInfoTouch}
                  onPress={() => setShowBoxInfo({ ...showBoxInfo, knowledge: true })}
                >
                  <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={gameScreenStyles.boxText}>Bag: </Text>
            <View style={[gameScreenStyles.boxInfo, { backgroundColor: '#a3a4c4' }]}>
              {playerIndex === currentPage || showBoxInfo.bag ? (
                <Text style={gameScreenStyles.boxInfoText}>{player.bag}</Text>
              ) : (
                <TouchableOpacity
                  style={gameScreenStyles.boxInfoTouch}
                  onPress={() => setShowBoxInfo({ ...showBoxInfo, bag: true })}
                >
                  <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={gameScreenStyles.boxText}>Action Card: </Text>
            <View style={[gameScreenStyles.boxCard, { borderColor: '#484a8c' }]}>
              {playerIndex === currentPage || showBoxInfo.actionCard ? (
                <Text style={gameScreenStyles.boxCardText}>{player.actionCard}</Text>
              ) : (
                <TouchableOpacity
                  style={gameScreenStyles.boxInfoTouchCard}
                  onPress={() => setShowBoxInfo({ ...showBoxInfo, actionCard: true })}
                >
                  <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={gameScreenStyles.boxText}>Condition Card: </Text>
            <View style={[gameScreenStyles.boxCard, { borderColor: '#99454currentPage' }]}>
              {playerIndex === currentPage || showBoxInfo.conditionCard ? (
                <Text style={gameScreenStyles.boxCardText}>{player.conditionCard}</Text>
              ) : (
                <TouchableOpacity
                  style={gameScreenStyles.boxInfoTouchCard}
                  onPress={() => setShowBoxInfo({ ...showBoxInfo, conditionCard: true })}
                >
                  <Text style={gameScreenStyles.boxInfoTouchText}>Tap to view</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={gameScreenStyles.boxText}>Note: </Text>
            <TextInput
              style={gameScreenStyles.input}
              placeholder="Note"
            />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

/**
 * ACTUAL GAME  SCREEN STYLE
 */
const gameScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#baaa9c',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#566d8a',
    textShadowColor: '#303b50',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Impact',
  },
  box: {
    flex: 1,
    backgroundColor: '#baaa9c',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
  },
  boxInfo: {
    height: 100,
    width: 300,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 5,
    paddingHorizontal: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'white',
    
  },
  boxInfoText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boxInfoTouch: {
    height: 100,
    width: 300,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
  },
  boxInfoTouchCard: {
    height: 150,
    width: 300,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 5,
    paddingHorizontal: 5,
    borderWidth: 2,
  },
  boxInfoTouchText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boxCard: {
    height: 150,
    width: 300,
    backgroundColor: '#baaa9c',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 5,
    fontSize: 18,
  },
  boxCardText: {
    color: '#566d8a',
    fontSize: 20,
    textAlign: 'center',
  },
  boxTitle: {
    color: '#ffffff',
    fontSize: 45,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Impact',
  },
  boxText: {
    color: '#566d8a',
    fontSize: 25,
    textAlign: 'center',
  },
  input: {
    height: 150,
    width: 300,
    color: '#ffffff',
    backgroundColor: '#baaa9c',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 5,
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Impact',
  },
});


/**
 * RULES SCREEN
 */
function RulesScreen({ navigation }) {
  const handleIntroductionPress = () => {
    navigation.navigate("Introduction");
  };
  const handleGameplayPress = () => {
    navigation.navigate("Gameplay");
  };


  return (
    <View style={rulesStyles.container}>
      <Text style={rulesStyles.title}>How to play</Text>
      <TouchableOpacity style={rulesStyles.button} onPress={handleIntroductionPress}>
        <Text style={rulesStyles.buttonText}>Introduction</Text>
      </TouchableOpacity>
      <TouchableOpacity style={rulesStyles.button} onPress={handleGameplayPress}>
        <Text style={rulesStyles.buttonText}>Gameplay</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * RULES SCREEN STYLE
 */
const rulesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#baaa9c',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#566d8a',
    textShadowColor: '#303b50',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Impact',
  },
  button: {
    backgroundColor: '#566d8a',
    width: 250,
    height: 100,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginHorizontal: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Impact',
  },
});

/**
 * INTRODUCTION SCREEN
 */
function IntroductionScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleIndexChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <View style={introductionStyles.container}>
      <Text style={introductionStyles.title}>Introduction</Text>
      <View style={introductionStyles.currentIndex}>
        <Text style={introductionStyles.currentIndexText}>
          {currentIndex + 1}/3
        </Text>
      </View>
      <Swiper
        style={introductionStyles.swiperContainer}
        loop={false}
        loadMinimal={true}
        onIndexChanged={handleIndexChange}
      >
        <View style={[introductionStyles.box, { width: Dimensions.get('window').width - 20 }]}>
          <Text style={introductionStyles.boxTitle}>WHAT HAPPENED?</Text>
          <Text style={introductionStyles.boxText}>
            The catastrophe of planetary proportions has turned Earth into a{" "}
            <Text style={{ fontWeight: "bold" }}>post-apocalyptic world</Text>.
            Survival on the surface is not possible in any form.
          </Text>
        </View>
        <View style={[introductionStyles.box, { width: Dimensions.get('window').width - 20 }]}>
          <Text style={introductionStyles.boxTitle}>HOW TO SURVIVE?</Text>
          <Text style={introductionStyles.boxText}>
            To survive, you will have to wait out the end of the world in a{" "}
            <Text style={{ fontWeight: "bold" }}>bunker</Text>.
            However...{" "}
            <Text style={{ fontWeight: "bold" }}>you are not the only one seeking shelter</Text>.
            Various people have gathered at the doors, and there are only enough resources for{" "}
            <Text style={{ fontWeight: "bold" }}>half of them</Text>.
          </Text>
        </View>
        <View style={[introductionStyles.box, { width: Dimensions.get('window').width - 20 }]}>
          <Text style={introductionStyles.boxTitle}>I WILL SURVIVE!</Text>
          <Text style={introductionStyles.boxText}>
            Play{" "}
            <Text style={{ fontWeight: "bold" }}>the role </Text>
            of one of the few survivors,{" "}
            <Text style={{ fontWeight: "bold" }}>convince </Text>
            others of your usefulness, and survive in the harsh reality of the{" "}
            <Text style={{ fontWeight: "bold" }}>Shelter</Text>!
          </Text>
        </View>
      </Swiper>
    </View>
  );
}

/**
 * INTRODUCTION SCREEN STYLE
 */
const introductionStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#baaa9c',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#566d8a',
    textShadowColor: '#303b50',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
    marginBottom: 30,
    marginTop: 50,
    textAlign: 'center',
    fontFamily: 'Impact',
  },
  currentIndex: {
    backgroundColor: '#ae9c95',
    height: 70,
    width: 70,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentIndexText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: '#303b50',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
    textAlign: 'center',
    fontFamily: 'Impact',
  },
  swiperContainer: {
    height: 300,
  },
  box: {
    flex: 1,
    backgroundColor: '#baaa9c',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
  },
  boxTitle: {
    color: '#ffffff',
    fontSize: 30,
    marginTop: -100,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Impact',
  },
  boxText: {
    color: '#566d8a',
    fontSize: 25,
    textAlign: 'center',
  },
});

/**
 * GAMEPLAY SCREEN
 */
function GameplayScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleIndexChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <View style={gameplayStyles.container}>
      <Text style={gameplayStyles.title}>Gameplay</Text>
      <View style={gameplayStyles.currentIndex}>
        <Text style={gameplayStyles.currentIndexText}>
          {currentIndex + 1}/9
        </Text>
      </View>
      <Swiper
        style={gameplayStyles.swiperContainer}
        loop={false}
        loadMinimal={true}
        onIndexChanged={handleIndexChange}
      >
        <View style={[gameplayStyles.box, { width: Dimensions.get('window').width - 20 }]}>
          <Text style={gameplayStyles.boxTitle}>CONNECT</Text>
          <Text style={gameplayStyles.boxText}>
            <Text style={{ fontWeight: "bold" }}>Connect</Text> to the game or{" "}
            <Text style={{ fontWeight: "bold" }}>create</Text> it yourself.
          </Text>
          <View style={{ marginVertical: 10 }}>
            <Text style={gameplayStyles.boxText}>
              After you{" "}
              <Text style={{ fontWeight: "bold" }}>chose a character number</Text>, you will see three screens:
            </Text>
            <Text style={gameplayStyles.boxText}>
              - the screen of the<Text style={{ fontWeight: "bold" }}> apocalypse</Text>,
            </Text>
            <Text style={gameplayStyles.boxText}>
              - the screen of the<Text style={{ fontWeight: "bold" }}> character</Text>,
            </Text>
            <Text style={gameplayStyles.boxText}>
              - the screen of the<Text style={{ fontWeight: "bold" }}> ending</Text>.
            </Text>
          </View>
        </View>
        <View style={[gameplayStyles.box, { width: Dimensions.get('window').width - 20 }]}>
          <Text style={gameplayStyles.boxTitle}>EDIT TITLE 2</Text>
          <Text style={gameplayStyles.boxText}>
            EDIT TEXT{" "}
            <Text style={{ fontWeight: "bold" }}>EDIT TEXT</Text>.
            EDIT TEXT{" "}
            <Text style={{ fontWeight: "bold" }}>EDIT TEXT</Text>.
            EDIT TEXT{" "}
            <Text style={{ fontWeight: "bold" }}>EDIT TEXT</Text>.
          </Text>
        </View>
        <View style={[gameplayStyles.box, { width: Dimensions.get('window').width - 20 }]}>
          <Text style={gameplayStyles.boxTitle}>EDIT TITLE 3</Text>
          <Text style={gameplayStyles.boxText}>
            EDIT TEXT{" "}
            <Text style={{ fontWeight: "bold" }}>EDIT TEXT </Text>
            EDIT TEXT{" "}
            <Text style={{ fontWeight: "bold" }}>EDIT TEXT </Text>
            EDIT TEXT{" "}
            <Text style={{ fontWeight: "bold" }}>EDIT TEXT</Text>!
          </Text>
        </View>
        <View style={[gameplayStyles.box, { width: Dimensions.get('window').width - 20 }]}>
          <Text style={gameplayStyles.boxTitle}>EDIT TITLE 4</Text>
          <Text style={gameplayStyles.boxText}>EDIT TEXT</Text>
        </View>
        <View style={[gameplayStyles.box, { width: Dimensions.get('window').width - 20 }]}>
          <Text style={gameplayStyles.boxTitle}>EDIT TITLE 5</Text>
          <Text style={gameplayStyles.boxText}>EDIT TEXT</Text>
        </View>
        <View style={[gameplayStyles.box, { width: Dimensions.get('window').width - 20 }]}>
          <Text style={gameplayStyles.boxTitle}>EDIT TITLE 6</Text>
          <Text style={gameplayStyles.boxText}>EDIT TEXT</Text>
        </View>
        <View style={[gameplayStyles.box, { width: Dimensions.get('window').width - 20 }]}>
          <Text style={gameplayStyles.boxTitle}>EDIT TITLE 7</Text>
          <Text style={gameplayStyles.boxText}>EDIT TEXT</Text>
        </View>
        <View style={[gameplayStyles.box, { width: Dimensions.get('window').width - 20 }]}>
          <Text style={gameplayStyles.boxTitle}>EDIT TITLE 8</Text>
          <Text style={gameplayStyles.boxText}>EDIT TEXT</Text>
        </View>
        <View style={[gameplayStyles.box, { width: Dimensions.get('window').width - 20 }]}>
          <Text style={gameplayStyles.boxTitle}>EDIT TITLE 9</Text>
          <Text style={gameplayStyles.boxText}>EDIT TEXT</Text>
        </View>
      </Swiper>
    </View>
  );
}

/**
 * GAMEPLAY SCREEN STYLE
 */
const gameplayStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#baaa9c',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#566d8a',
    textShadowColor: '#303b50',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
    marginBottom: 30,
    marginTop: 50,
    textAlign: 'center',
    fontFamily: 'Impact',
  },
  currentIndex: {
    backgroundColor: '#ae9c95',
    height: 70,
    width: 70,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentIndexText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: '#303b50',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
    textAlign: 'center',
    fontFamily: 'Impact',
  },
  swiperContainer: {
    height: 500,
  },
  box: {
    flex: 1,
    backgroundColor: '#baaa9c',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
  },
  boxTitle: {
    color: '#ffffff',
    fontSize: 30,
    marginTop: -10,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Impact',
  },
  boxText: {
    color: '#566d8a',
    fontSize: 25,
    textAlign: 'center',
  },
});


/**
 * APP FUNCTION
 */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Connect" component={ConnectScreen} />
        <Stack.Screen name="Create" component={CreateScreen} />
        <Stack.Screen name="CreateNumber" component={CreateNumberScreen} />
        <Stack.Screen name="Rules" component={RulesScreen} />
        <Stack.Screen name="Introduction" component={IntroductionScreen} />
        <Stack.Screen name="Gameplay" component={GameplayScreen} />
        <Stack.Screen name="gameScreen" component={GameScreen} />
        <Stack.Screen name="playerScreen" component={PlayerScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}




