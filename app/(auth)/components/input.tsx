import { ThemedText } from '@/components/themed-text';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

export type InputProps = TextInputProps & {
  title: string;
  placeholder: string;
  isWarning?: boolean;
  Icon: React.FC<SvgProps>;
};

export function Input({ title, placeholder, isWarning = false, Icon, ...other }: InputProps) {
    return (
        <View style={styles.container}>
            <ThemedText type='small'>{title}</ThemedText>
            <View style={{position: 'relative'}}>
              <TextInput 
                placeholder={placeholder} 
                style={[
                  styles.input,               
                  isWarning && styles.inputWarning, 
                  !isWarning && styles.inputDefault 
                ]}
                {...other} />
              <Icon width={20} height={20} style={{position: 'absolute', left: 16, top: '50%', transform: [{ translateY: -10 }]}} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  input: {
    backgroundColor: '#FFF',
    height: 50,
    paddingHorizontal: 16,
    paddingLeft: 48, // space for the icon
    width: '100%',

    borderRadius: 12,
    borderColor: '#E3BFB3',
    borderWidth: 1,
    
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,

    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  inputWarning: {
    borderColor: '#d43906',
  },
  inputDefault: {
    borderColor: '#E3BFB3',
  }
});