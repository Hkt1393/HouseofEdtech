import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  StyleSheet,
  type BlurEvent,
  type FocusEvent,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import type { TextInput } from 'react-native';

import { APP_STRINGS, COMPONENT_DEFAULTS } from '../../../constants';
import { useTheme } from '../../../theme';
import { moderateScale, verticalScale } from '../../../utils';

import {
  resolveColorToken,
  resolveFontWeight,
} from '../shared';

import { createDynamicStyles, styles } from './styles';
import type { AppTextInputProps } from './types';
import { AppTextInputView } from './view';

const AppTextInputContainerComponent = forwardRef<TextInput, AppTextInputProps>(
  (
    {
      accessibilityHint,
      accessibilityLabel,
      containerStyle,
      defaultValue,
      errorText,
      helperText,
      inputContainerStyle,
      inputStyle,
      labelColorToken,
      onBlur,
      onChangeText,
      onFocus,
      onTrailingActionPress,
      placeholderColorToken,
      secureTextEntry = false,
      showCharacterCounter,
      showSecureToggle = true,
      textColorToken,
      trailingActionAccessibilityHint,
      trailingActionAccessibilityLabel,
      trailingIconPressable = false,
      trailingTextWeight = 'semiBold',
      value,
      ...restProps
    },
    ref,
  ) => {
    const { colors, radius, spacing, typography } = useTheme();
    const [currentValue, setCurrentValue] = useState(
      typeof value === 'string'
        ? value
        : typeof defaultValue === 'string'
          ? defaultValue
          : '',
    );
    const [isFocused, setIsFocused] = useState(false);
    const [isSecureEntryHidden, setIsSecureEntryHidden] = useState(
      Boolean(secureTextEntry),
    );

    useEffect(() => {
      if (typeof value === 'string') {
        setCurrentValue(value);
      }
    }, [value]);

    useEffect(() => {
      setIsSecureEntryHidden(Boolean(secureTextEntry));
    }, [secureTextEntry]);

    const handleFocus = useCallback(
      (event: FocusEvent) => {
        setIsFocused(true);
        onFocus?.(event);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (event: BlurEvent) => {
        setIsFocused(false);
        onBlur?.(event);
      },
      [onBlur],
    );

    const handleChangeText = useCallback(
      (nextValue: string) => {
        setCurrentValue(nextValue);
        onChangeText?.(nextValue);
      },
      [onChangeText],
    );

    const handleTrailingActionPress = useCallback(() => {
      if (secureTextEntry && showSecureToggle) {
        setIsSecureEntryHidden((previousValue) => !previousValue);
        return;
      }

      onTrailingActionPress?.();
    }, [onTrailingActionPress, secureTextEntry, showSecureToggle]);

    const hasError = Boolean(errorText);
    const shouldShowSecureToggle = Boolean(secureTextEntry && showSecureToggle);
    const shouldShowCharacterCounter =
      showCharacterCounter ?? typeof restProps.maxLength === 'number';

    const resolvedContainerStyleObject = useMemo<ViewStyle>(
      () => ({
        gap: moderateScale(spacing.xs),
      }),
      [spacing.xs],
    );

    const resolvedInputContainerStyleObject = useMemo<ViewStyle>(
      () => ({
        alignItems: restProps.multiline ? 'flex-start' : 'center',
        backgroundColor: colors.surfaceLow,
        borderColor: hasError
          ? colors.error
          : isFocused
            ? colors.primary
            : colors.border,
        borderRadius: moderateScale(radius.sm),
        borderWidth: StyleSheet.hairlineWidth,
        gap: moderateScale(spacing.sm),
        minHeight: restProps.multiline
          ? verticalScale(COMPONENT_DEFAULTS.textInput.multilineMinHeight)
          : moderateScale(spacing['4xl']),
        paddingHorizontal: moderateScale(spacing.md),
        paddingVertical: moderateScale(spacing.sm),
      }),
      [
        colors.border,
        colors.error,
        colors.primary,
        colors.surfaceLow,
        hasError,
        isFocused,
        radius.sm,
        restProps.multiline,
        spacing,
      ],
    );

    const resolvedInputStyleObject = useMemo<TextStyle>(
      () => ({
        color:
          resolveColorToken(textColorToken, colors) ?? colors.textPrimary,
        fontFamily: typography.variants.body.fontFamily,
        fontSize: moderateScale(typography.variants.body.fontSize),
        fontWeight: typography.variants.body.fontWeight,
        lineHeight: verticalScale(typography.variants.body.lineHeight),
        minHeight: restProps.multiline
          ? verticalScale(COMPONENT_DEFAULTS.textInput.multilineMinHeight)
          : undefined,
        paddingVertical: 0,
      }),
      [colors, restProps.multiline, textColorToken, typography],
    );

    const resolvedLabelStyleObject = useMemo<TextStyle>(
      () => ({
        color:
          resolveColorToken(labelColorToken, colors) ??
          (hasError ? colors.error : colors.textSecondary),
      }),
      [colors, hasError, labelColorToken],
    );

    const resolvedHelperTextStyleObject = useMemo<TextStyle>(
      () => ({
        color: hasError ? colors.error : colors.textTertiary,
      }),
      [colors.error, colors.textTertiary, hasError],
    );

    const resolvedCharacterCounterStyleObject = useMemo<TextStyle>(
      () => ({
        color: hasError ? colors.error : colors.textTertiary,
        fontWeight:
          resolveFontWeight(trailingTextWeight, typography) ??
          typography.variants.caption.fontWeight,
      }),
      [colors.error, colors.textTertiary, hasError, trailingTextWeight, typography],
    );

    const dynamicStyles = useMemo(
      () =>
        createDynamicStyles(
          resolvedContainerStyleObject,
          resolvedInputContainerStyleObject,
          resolvedInputStyleObject,
          resolvedLabelStyleObject,
          resolvedHelperTextStyleObject,
          resolvedCharacterCounterStyleObject,
        ),
      [
        resolvedCharacterCounterStyleObject,
        resolvedContainerStyleObject,
        resolvedHelperTextStyleObject,
        resolvedInputContainerStyleObject,
        resolvedInputStyleObject,
        resolvedLabelStyleObject,
      ],
    );

    const resolvedContainerStyle = useMemo(
      () => [dynamicStyles.container, containerStyle],
      [containerStyle, dynamicStyles.container],
    );

    const resolvedInputContainerStyle = useMemo(
      () => [styles.fieldRow, dynamicStyles.inputContainer, inputContainerStyle],
      [dynamicStyles.inputContainer, inputContainerStyle],
    );

    const resolvedInputStyle = useMemo(
      () => [dynamicStyles.input, inputStyle],
      [dynamicStyles.input, inputStyle],
    );

    const resolvedLabelStyle = useMemo(
      () => [dynamicStyles.label],
      [dynamicStyles.label],
    );

    const resolvedHelperTextStyle = useMemo(
      () => [dynamicStyles.helperText],
      [dynamicStyles.helperText],
    );

    const resolvedCharacterCounterStyle = useMemo(
      () => [dynamicStyles.characterCounter],
      [dynamicStyles.characterCounter],
    );

    const resolvedPlaceholderTextColor =
      resolveColorToken(placeholderColorToken, colors) ?? colors.textTertiary;

    const resolvedAccessibilityLabel =
      accessibilityLabel ?? APP_STRINGS.components.textInput.accessibilityLabel;

    const trailingActionText = shouldShowSecureToggle
      ? isSecureEntryHidden
        ? APP_STRINGS.components.textInput.showSecureEntry
        : APP_STRINGS.components.textInput.hideSecureEntry
      : '';

    return (
      <AppTextInputView
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        currentValue={currentValue}
        displayHelperText={errorText ?? helperText}
        errorText={errorText}
        handleBlur={handleBlur}
        handleChangeText={handleChangeText}
        handleFocus={handleFocus}
        handleTrailingActionPress={
          shouldShowSecureToggle || trailingIconPressable
            ? handleTrailingActionPress
            : undefined
        }
        hasError={hasError}
        isFocused={isFocused}
        isSecureEntryHidden={isSecureEntryHidden}
        ref={ref}
        resolvedAccessibilityLabel={resolvedAccessibilityLabel}
        resolvedCharacterCounterStyle={resolvedCharacterCounterStyle}
        resolvedContainerStyle={resolvedContainerStyle}
        resolvedHelperTextStyle={resolvedHelperTextStyle}
        resolvedInputContainerStyle={resolvedInputContainerStyle}
        resolvedInputStyle={resolvedInputStyle}
        resolvedLabelStyle={resolvedLabelStyle}
        resolvedPlaceholderTextColor={resolvedPlaceholderTextColor}
        shouldShowCharacterCounter={shouldShowCharacterCounter}
        shouldShowSecureToggle={shouldShowSecureToggle}
        trailingActionAccessibilityHint={
          trailingActionAccessibilityHint ??
          (shouldShowSecureToggle
            ? APP_STRINGS.components.textInput.secureToggleHint
            : undefined)
        }
        trailingActionAccessibilityLabel={
          trailingActionAccessibilityLabel ?? resolvedAccessibilityLabel
        }
        trailingActionText={trailingActionText}
        trailingIconPressable={trailingIconPressable}
        {...restProps}
      />
    );
  },
);

AppTextInputContainerComponent.displayName = 'AppTextInput';

export const AppTextInput = memo(AppTextInputContainerComponent);
