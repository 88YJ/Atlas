import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height - 72,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  uiContainer: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    padding: 10,
  },
  handle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 3,
  },
  description: {
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 3,
  },
  gameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gamePicture: {
    width: 30,
    height: 30,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'grey',
  },
  gameName: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },

  //Right Container
  rightContainer: {
    alignSelf: 'flex-end',
    height: 320,
    justifyContent: 'space-between',
    marginRight: 5,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
  },
  iconContainer: {
    alignItems: 'center',
  },
  statsLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '300',
    marginTop: 3,
    marginBottom: 3,
  },
});

export default styles;
