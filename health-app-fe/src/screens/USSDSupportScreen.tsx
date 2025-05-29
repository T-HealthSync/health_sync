import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Text, useTheme, TextInput, Button as PaperButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { Card } from '../components/Card';
import { colors, spacing } from '../theme/theme';

export const USSDSupportScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    content: {
      padding: spacing.md,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: colors.text.primary,
    },
    description: {
      fontSize: 16,
      color: colors.text.secondary,
      marginBottom: spacing.xl,
      lineHeight: 24,
    },
    menuContainer: {
      marginBottom: spacing.xl,
    },
    menuTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: spacing.md,
    },
    menuOption: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.md,
      backgroundColor: colors.background.paper,
      borderRadius: 8,
      marginBottom: spacing.sm,
    },
    menuOptionText: {
      fontSize: 16,
      color: colors.text.primary,
      marginLeft: spacing.sm,
    },
    inputContainer: {
      marginBottom: spacing.lg,
    },
    input: {
      backgroundColor: colors.background.paper,
    },
    actionButton: {
      marginTop: spacing.md,
    },
    resultContainer: {
      marginTop: spacing.xl,
    },
    resultTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: spacing.md,
    },
    resultCard: {
      marginBottom: spacing.md,
    },
  });

  const menuOptions = [
    {
      id: '1',
      title: 'Check Appointment',
      code: '*123*1#',
      icon: 'calendar',
    },
    {
      id: '2',
      title: 'View Prescriptions',
      code: '*123*2#',
      icon: 'pill',
    },
    {
      id: '3',
      title: 'Emergency Contact',
      code: '*123*3#',
      icon: 'phone-alert',
    },
    {
      id: '4',
      title: 'Health Tips',
      code: '*123*4#',
      icon: 'lightbulb',
    },
  ];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    const option = menuOptions.find((opt) => opt.id === optionId);
    if (option) {
      setInputValue(option.code);
    }
  };

  const handleSubmit = () => {
    // Handle USSD code submission
    console.log('Submitted code:', inputValue);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>USSD Support</Text>
        </View>

        <Text style={styles.description}>
          Access basic healthcare features through USSD codes. Dial these codes on your phone to
          access services without internet connectivity.
        </Text>

        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Available Services</Text>
          {menuOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.menuOption}
              onPress={() => handleOptionSelect(option.id)}
            >
              <Icon name={option.icon} size={24} color={colors.primary.main} />
              <View style={{ flex: 1 }}>
                <Text style={styles.menuOptionText}>{option.title}</Text>
                <Text style={{ color: colors.text.secondary, marginLeft: spacing.sm }}>
                  {option.code}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Card>
          <Text style={styles.menuTitle}>Try USSD Code</Text>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Enter USSD Code"
              value={inputValue}
              onChangeText={setInputValue}
              style={styles.input}
              keyboardType="phone-pad"
            />
          </View>
          <PaperButton
            mode="contained"
            onPress={handleSubmit}
            style={styles.actionButton}
          >
            Submit
          </PaperButton>
        </Card>

        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>How to Use</Text>
          <Card style={styles.resultCard}>
            <Text style={{ color: colors.text.secondary, lineHeight: 24 }}>
              1. Dial the USSD code on your phone{'\n'}
              2. Follow the voice prompts{'\n'}
              3. Select options using your phone's keypad{'\n'}
              4. Receive information via SMS
            </Text>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}; 