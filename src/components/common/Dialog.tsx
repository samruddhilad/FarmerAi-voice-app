/**
 * Dialog Component
 * Modal dialog with title, message, and action buttons
 */

import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../theme';

interface DialogAction {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'destructive';
}

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  actions?: DialogAction[];
  children?: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  visible,
  onClose,
  title,
  message,
  actions = [],
  children,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.dialog, Shadows.xl]}>
              <Text style={styles.title}>{title}</Text>
              {message && <Text style={styles.message}>{message}</Text>}
              {children}

              {actions.length > 0 && (
                <View style={styles.actions}>
                  {actions.map((action, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.actionButton,
                        action.variant === 'primary' && styles.primaryAction,
                        action.variant === 'destructive' && styles.destructiveAction,
                      ]}
                      onPress={action.onPress}
                    >
                      <Text
                        style={[
                          styles.actionText,
                          action.variant === 'primary' && styles.primaryActionText,
                          action.variant === 'destructive' && styles.destructiveActionText,
                        ]}
                      >
                        {action.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['3xl'],
  },
  dialog: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing['2xl'],
    width: '100%',
    maxWidth: 340,
  },
  title: {
    ...Typography.h5,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  message: {
    ...Typography.body,
    color: Colors.text.secondary,
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  actionButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.sm,
  },
  primaryAction: {
    backgroundColor: Colors.primary[500],
  },
  destructiveAction: {
    backgroundColor: Colors.errorBg,
  },
  actionText: {
    ...Typography.buttonSm,
    color: Colors.text.secondary,
  },
  primaryActionText: {
    color: Colors.white,
  },
  destructiveActionText: {
    color: Colors.error,
  },
});
