/**
 * OTP Login Screen
 * Phone input → OTP verification (React Hook Form + Zod)
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useSendOTP, useVerifyOTP } from '../../hooks/useAuth';
import { useAuthContext } from '../../contexts/AuthContext';
import { AuthScreenProps } from '../../navigation/types';

// Zod schemas
const phoneSchema = z.object({
  mobile: z
    .string()
    .min(10, 'Enter a valid 10-digit mobile number')
    .max(10, 'Enter a valid 10-digit mobile number')
    .regex(/^\d{10}$/, 'Only digits allowed'),
});

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, 'Enter 6-digit OTP')
    .regex(/^\d{6}$/, 'Only digits allowed'),
});

type PhoneFormData = z.infer<typeof phoneSchema>;
type OTPFormData = z.infer<typeof otpSchema>;

export const OTPLoginScreen: React.FC<AuthScreenProps<'OTPLogin'>> = ({
  navigation,
  route,
}) => {
  const { login } = useAuthContext();
  const sendOTPMutation = useSendOTP();
  const verifyOTPMutation = useVerifyOTP();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState(route.params?.mobile || '');
  const otpInputs = useRef<(TextInput | null)[]>([]);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);

  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { mobile: route.params?.mobile || '' },
  });

  const handleSendOTP = async (data: PhoneFormData) => {
    setPhoneNumber(data.mobile);
    try {
      await sendOTPMutation.mutateAsync({ mobile: data.mobile });
      setStep('otp');
    } catch {
      // Network error
    }
  };

  const handleOTPChange = (text: string, index: number) => {
    const newDigits = [...otpDigits];
    newDigits[index] = text;
    setOtpDigits(newDigits);

    // Auto-focus next input
    if (text && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }

    // Auto-submit when all filled
    if (newDigits.every((d) => d.length === 1)) {
      handleVerifyOTP(newDigits.join(''));
    }
  };

  const handleOTPKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    try {
      const result = await verifyOTPMutation.mutateAsync({
        mobile: phoneNumber,
        otp,
      });
      if (result.success) {
        await login(
          result.data.user,
          result.data.access_token,
          result.data.refresh_token
        );
      }
    } catch {
      setOtpDigits(['', '', '', '', '', '']);
      otpInputs.current[0]?.focus();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => (step === 'otp' ? setStep('phone') : navigation.goBack())}
      >
        <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
      </TouchableOpacity>

      <View style={styles.content}>
        {step === 'phone' ? (
          <>
            <View style={styles.iconHeader}>
              <Ionicons name="phone-portrait-outline" size={32} color={Colors.primary[500]} />
            </View>
            <Text style={styles.title}>Enter Mobile Number</Text>
            <Text style={styles.subtitle}>
              We'll send you a 6-digit verification code
            </Text>

            <Controller
              control={phoneForm.control}
              name="mobile"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Input
                  label="Mobile Number"
                  value={value}
                  onChangeText={onChange}
                  error={error?.message}
                  placeholder="Enter 10-digit number"
                  keyboardType="phone-pad"
                  maxLength={10}
                  leftIcon="call-outline"
                  required
                />
              )}
            />

            <Button
              title="Send OTP"
              onPress={phoneForm.handleSubmit(handleSendOTP)}
              variant="primary"
              size="lg"
              fullWidth
              loading={sendOTPMutation.isPending}
              icon="arrow-forward"
              iconPosition="right"
            />
          </>
        ) : (
          <>
            <View style={styles.iconHeader}>
              <Ionicons name="lock-closed-outline" size={32} color={Colors.primary[500]} />
            </View>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>
              Enter the code sent to +91 {phoneNumber}
            </Text>

            {/* OTP Input boxes */}
            <View style={styles.otpContainer}>
              {otpDigits.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    otpInputs.current[index] = ref;
                  }}
                  style={[
                    styles.otpInput,
                    digit && styles.otpInputFilled,
                  ]}
                  value={digit}
                  onChangeText={(text) => handleOTPChange(text, index)}
                  onKeyPress={({ nativeEvent }) =>
                    handleOTPKeyPress(nativeEvent.key, index)
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  textContentType="oneTimeCode"
                  accessibilityLabel={`OTP digit ${index + 1}`}
                />
              ))}
            </View>

            <Button
              title="Verify"
              onPress={() => handleVerifyOTP(otpDigits.join(''))}
              variant="primary"
              size="lg"
              fullWidth
              loading={verifyOTPMutation.isPending}
              disabled={otpDigits.some((d) => !d)}
            />

            <TouchableOpacity
              style={styles.resendButton}
              onPress={() => sendOTPMutation.mutate({ mobile: phoneNumber })}
              disabled={sendOTPMutation.isPending}
            >
              <Text style={styles.resendText}>Didn't receive code? Resend OTP</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backButton: {
    padding: Spacing.lg,
    marginTop: Spacing['3xl'],
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing['2xl'],
    paddingTop: Spacing.xl,
  },
  iconHeader: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.h3,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
    marginBottom: Spacing['3xl'],
    lineHeight: 22,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing['3xl'],
    gap: Spacing.sm,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 1.5,
    borderColor: Colors.gray[200],
    borderRadius: BorderRadius.md,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    color: Colors.text.primary,
    backgroundColor: Colors.gray[50],
  },
  otpInputFilled: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[50],
  },
  resendButton: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    padding: Spacing.md,
  },
  resendText: {
    ...Typography.bodySm,
    color: Colors.primary[600],
    fontWeight: '500',
  },
});
