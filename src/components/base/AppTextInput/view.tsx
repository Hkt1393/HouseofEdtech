import React, { forwardRef, memo } from 'react';
import {
  Pressable,
  TextInput,
  View,
} from 'react-native';

import { AppText } from '../AppText';

import { styles } from './styles';
import type { AppTextInputViewProps } from './types';

const AppTextInputViewComponent = forwardRef<TextInput, AppTextInputViewProps>(
  (
    {
      accessible = true,
      currentValue,
      displayHelperText,
      errorText,
      handleBlur,
      handleChangeText,
      handleFocus,
      handleTrailingActionPress,
      inputMode,
      isFocused,
      isSecureEntryHidden,
      keyboardType,
      label,
      leadingIcon,
      maxLength,
      multiline = false,
      resolvedAccessibilityLabel,
      resolvedCharacterCounterStyle,
      resolvedContainerStyle,
      resolvedHelperTextStyle,
      resolvedInputContainerStyle,
      resolvedInputStyle,
      resolvedLabelStyle,
      resolvedPlaceholderTextColor,
      returnKeyType,
      secureTextEntry = false,
      shouldShowCharacterCounter,
      shouldShowSecureToggle,
      trailingActionAccessibilityHint,
      trailingActionAccessibilityLabel,
      trailingActionText,
      trailingIcon,
      trailingIconPressable = false,
      ...restProps
    },
    ref,
  ) => {
    const hasTrailingPressAction =
      shouldShowSecureToggle ||
      (Boolean(trailingIcon) && trailingIconPressable && Boolean(handleTrailingActionPress));

    return (
      <View style={resolvedContainerStyle}>
        {label ? (
          <AppText style={resolvedLabelStyle} variant="label">
            {label}
          </AppText>
        ) : null}
        <View style={resolvedInputContainerStyle}>
          {leadingIcon ? (
            <View style={styles.iconContainer}>{leadingIcon}</View>
          ) : null}
          <TextInput
            {...restProps}
            accessible={accessible}
            accessibilityLabel={resolvedAccessibilityLabel}
            inputMode={inputMode}
            keyboardType={keyboardType}
            multiline={multiline}
            onBlur={handleBlur}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            placeholderTextColor={resolvedPlaceholderTextColor}
            ref={ref}
            returnKeyType={returnKeyType}
            secureTextEntry={secureTextEntry ? isSecureEntryHidden : false}
            style={[
              styles.fieldInput,
              multiline ? styles.multilineInput : null,
              resolvedInputStyle,
            ]}
          />
          {shouldShowSecureToggle ? (
            <Pressable
              accessibilityHint={trailingActionAccessibilityHint}
              accessibilityLabel={trailingActionAccessibilityLabel}
              accessibilityRole="button"
              onPress={handleTrailingActionPress}
              style={styles.iconContainer}
            >
              <AppText variant="label">{trailingActionText}</AppText>
            </Pressable>
          ) : null}
          {!shouldShowSecureToggle && trailingIcon ? (
            hasTrailingPressAction ? (
              <Pressable
                accessibilityHint={trailingActionAccessibilityHint}
                accessibilityLabel={trailingActionAccessibilityLabel}
                accessibilityRole="button"
                onPress={handleTrailingActionPress}
                style={styles.iconContainer}
              >
                {trailingIcon}
              </Pressable>
            ) : (
              <View style={styles.iconContainer}>{trailingIcon}</View>
            )
          ) : null}
        </View>
        {displayHelperText ? (
          <AppText style={resolvedHelperTextStyle} variant="caption">
            {displayHelperText}
          </AppText>
        ) : null}
        {shouldShowCharacterCounter && typeof maxLength === 'number' ? (
          <View style={styles.characterCounterRow}>
            <AppText
              accessibilityLabel={trailingActionAccessibilityLabel}
              style={resolvedCharacterCounterStyle}
              variant="caption"
            >
              {`${currentValue.length}/${maxLength}`}
            </AppText>
          </View>
        ) : null}
      </View>
    );
  },
);

AppTextInputViewComponent.displayName = 'AppTextInputView';

export const AppTextInputView = memo(AppTextInputViewComponent);
