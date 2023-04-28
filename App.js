import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import GridFlatList from 'grid-flatlist-react-native';

import Snackbar from 'react-native-snackbar';
import Icons from './src/components/icons';

const App=()=>{
  const [isCross, setIsCross] = useState(false)
  const [gameWinner, setGameWinner] = useState('')
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9))

  const reloadGame = () => {
    setIsCross(false)
    setGameWinner('')
    setGameState(new Array(9).fill('empty', 0, 9))
  }

  const checkIsWinner = () => {
    //  checking  winner of the game
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game! 🥳`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner('Draw game... ⌛️');
    }
  }
  const onChangeItem = (itemNumber) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: "#FFFFFF"
      })
    }

    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle'
      setIsCross(!isCross)
    } else {
      return Snackbar.show({
        text: "Position is already filled",
        backgroundColor: "red",
        textColor: "#FFF"
      })
    }

    checkIsWinner()
  }
  console.log(gameWinner)

  return (
    <SafeAreaView style={styles.mainView}>
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo,
        { backgroundColor: gameWinner == "Draw game... ⌛️" ? "#8D3DAF" : gameWinner == "cross won the game! 🥳" ? "#38CC77" : "#F7CD2E" }
        ]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View
          style={[
            styles.playerInfo,
            isCross ? styles.playerX : styles.playerO
          ]}
        >
          <Text style={styles.gameTurnTxt}>
            {isCross ? 'X' : 'O'}'s Turn
          </Text>
        </View>
      )}

      <View style={{height:responsiveHeight(70),marginVertical:responsiveHeight(2.75)}}>
        {/* Game Grid */}
        <FlatList
          numColumns={3}
          data={gameState}
          style={styles.grid}
          renderItem={({ item, index }) => (
            <Pressable
              key={index}
              style={styles.card}
              onPress={() => onChangeItem(index)}
            >
              <Icons name={item} />
            </Pressable>
          )}
        />
      </View>


      {/* game action */}
      <Pressable
        style={styles.gameBtn}
        onPress={reloadGame}
      >
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start new game' : 'Reload the game'}
        </Text>
      </Pressable>
    </SafeAreaView>


  );
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "#f88379",
    alignItems: "center",
    justifyContent: "center",
    flex: 10,
    paddingVertical: responsiveHeight(3.5)
  },
  playerInfo: {
    height: responsiveHeight(6.5),
    width: responsiveWidth(90),
    alignSelf: "center",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  winnerInfo: {
    borderRadius: 8,
    shadowOpacity: 0.1,
  },
  gameTurnTxt: {
    fontSize: responsiveFontSize(2.35),
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    width: responsiveWidth(90),
    alignSelf: "center", borderRadius: 16,
  },
  card: {
    height: responsiveHeight(23.3334),
    width: "33.3334%",
    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 4,
    borderColor: '#33333350',
    backgroundColor: "#33333320",
  },
  winnerTxt: {
    fontSize: responsiveFontSize(2.35),
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',
    borderRadius: 8,
    //marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
    width: responsiveWidth(90),
    alignSelf: "center",
    height: responsiveHeight(6.5),
    justifyContent: "center"
  },
  gameBtnText: {
    fontSize: responsiveFontSize(2.35),
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default App;