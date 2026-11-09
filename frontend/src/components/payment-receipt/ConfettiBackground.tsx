import { StyleSheet, View } from 'react-native';

type ConfettiPiece = {
  id: string;
  top: string;
  left: string;
  color: string;
  rotate: string;
};

const pieces: ConfettiPiece[] = [
  { id: '1', top: '2%', left: '20%', color: '#F2C94C', rotate: '15deg' },
  { id: '2', top: '3%', left: '48%', color: '#B388EB', rotate: '-10deg' },
  { id: '3', top: '5%', left: '78%', color: '#4DD0C4', rotate: '20deg' },
  { id: '4', top: '9%', left: '62%', color: '#F2C94C', rotate: '-20deg' },
  { id: '5', top: '24%', left: '95%', color: '#F2C94C', rotate: '10deg' },
  { id: '6', top: '46%', left: '93%', color: '#4DD0C4', rotate: '-15deg' },
  { id: '7', top: '2%', left: '3%', color: '#4DD0C4', rotate: '-5deg' },
  { id: '8', top: '55%', left: '4%', color: '#B388EB', rotate: '12deg' },
  { id: '9', top: '82%', left: '2%', color: '#F2C94C', rotate: '-10deg' },
  { id: '10', top: '88%', left: '28%', color: '#4DD0C4', rotate: '15deg' },
  { id: '11', top: '95%', left: '70%', color: '#B388EB', rotate: '-20deg' },
  { id: '12', top: '78%', left: '92%', color: '#F2C94C', rotate: '10deg' },
];

export function ConfettiBackground() {
  return (
    <View style={styles.container} pointerEvents="none">
      {pieces.map((piece) => (
        <View
          key={piece.id}
          style={[
            styles.piece,
            {
              top: piece.top,
              left: piece.left,
              backgroundColor: piece.color,
              transform: [{ rotate: piece.rotate }],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  piece: {
    position: 'absolute',
    width: 10,
    height: 16,
    borderRadius: 2,
  },
});
