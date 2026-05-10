import { Colors, Text } from '@/constants/theme';
import { StyleSheet, TextStyle } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,    
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  wellcomeText: Text.big as TextStyle,
  lightningContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,

    borderColor: 'rgba(227, 191, 179, 0.3)', // E3BFB3
    borderWidth: 1,

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },
  inputContainer: {
    marginTop: 48, 
    width: '100%', 
    gap: 16,
  },
  forgotPasswordText: {
    marginTop: 8,
    color: '#FF5F1F',
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    lineHeight: 20,
  },
  loginButton: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5F1F',
    flexDirection: 'row',

    borderRadius: 100,
    marginTop: 48,
    gap: 8,

    shadowColor: '#FF5F1F', // 25% opacity
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16, // blur
  }
});
