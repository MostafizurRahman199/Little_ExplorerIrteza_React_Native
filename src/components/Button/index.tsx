import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  style,
  textStyle,
  disabled = false,
}) => {
  const getBgColor = () => {
    switch (variant) {
      case 'secondary':
        return theme.colors.secondary;
      case 'accent':
        return theme.colors.accentYellow;
      case 'outline':
        return 'transparent';
      case 'primary':
      default:
        return theme.colors.primary;
    }
  };

  const getHeight = () => {
    switch (size) {
      case 'small':
        return 48;
      case 'large':
        return 64;
      case 'medium':
      default:
        return 56; // Target >= 48dp for toddler safety
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: getBgColor(),
          height: getHeight(),
          borderWidth: variant === 'outline' ? 2 : 0,
          borderColor: theme.colors.primary,
        },
        theme.shadows.medium,
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text
        style={[
          styles.text,
          {
            color: variant === 'outline' ? theme.colors.primary : theme.colors.textLight,
            fontSize: size === 'large' ? theme.fontSize.lg : theme.fontSize.md,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    minWidth: 120,
  },
  text: {
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
  },
  icon: {
    fontSize: theme.fontSize.lg,
    marginRight: theme.spacing.sm,
  },
  disabled: {
    opacity: 0.5,
  },
});
