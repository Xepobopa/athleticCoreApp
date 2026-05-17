import { Icons } from "@/assets";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";
import * as Haptics from 'expo-haptics';
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView, KeyboardToolbar } from "react-native-keyboard-controller";
import { Input } from "./components/input";
import { styles } from "./styles";

export default function Login() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailWarning, setEmailWarning] = React.useState(false);
  const [passwordWarning, setPasswordWarning] = React.useState(false);
  

  const handleOnForgotPassword = () => {
    console.log('Forgot password pressed');
  }

  const handleOnSignUp = () => {
    router.push('/(auth)/signup');
  }

  const handleLogin = async () => {
    if (!email) {
      setEmailWarning(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      return;
    }

    if (!password) {
      setPasswordWarning(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      return;
    }

    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      console.log('Login error', error);
      // show error somehow
      setEmailWarning(true);
      setPasswordWarning(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      return;
    }
  }

  return (
    <View style={styles.mainContainer}>
      <KeyboardAwareScrollView contentContainerStyle={styles.innerContainer} bottomOffset={50}>
        <View style={styles.lightningContainer}>
          <Icons.Lightning width={24} height={30} />
        </View>
        <ThemedText type='title' style={{marginBottom: 8}}>Привіт знову!</ThemedText>
        <ThemedText type='default'>Увійдіть, щоб продовжити прогрес.</ThemedText>

        <View style={styles.inputContainer}>
          <Input 
            title="Пошта" 
            placeholder="athlete@example.com" 
            Icon={Icons.Email} 
            isWarning={emailWarning}
            keyboardType="email-address" 
            value={email} 
            autoCapitalize="none"
            autoComplete="email"
            onChangeText={(text) => {
              setEmailWarning(false);
              setEmail(text);
            }} />
          <Input 
            title="Пароль" 
            placeholder="••••••••" 
            Icon={Icons.Lock} 
            isWarning={passwordWarning}
            secureTextEntry={true} 
            value={password} 
            onChangeText={(text) => {
              setPasswordWarning(false);
              setPassword(text);
            }} />
        </View>
        {/* <View style={{width: '100%', alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={handleOnForgotPassword}>
            <ThemedText type='small' style={styles.forgotPasswordText}>Забули пароль?</ThemedText>
          </TouchableOpacity>
        </View> */}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
          {
            isLoading ? (
              <ActivityIndicator size={'small'} color={Colors.light.background} />
            ) : (
              <>
                <ThemedText type='default' style={{color: '#fff'}}>Увійти</ThemedText>
                <Icons.ArrowRight />
              </>
            )
          }
        </TouchableOpacity>

        <View style={{flexDirection: 'row', marginTop: 40, gap: 4}}>
          <ThemedText type='default'>Досі немаєте акаунт?</ThemedText>
          <TouchableOpacity onPress={handleOnSignUp}>
            <ThemedText type='default' style={{color: '#FF5F1F'}}>Зареєструватися</ThemedText>
          </TouchableOpacity>
        </View>

      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </View>
  );
}