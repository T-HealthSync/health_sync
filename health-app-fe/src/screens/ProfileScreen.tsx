import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Text, useTheme, Avatar, List, Switch, Button as PaperButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { Card } from '../components/Card';
import { colors, spacing } from '../theme/theme';

export const ProfileScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    content: {
      padding: spacing.md,
    },
    header: {
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    avatar: {
      marginBottom: spacing.md,
    },
    name: {
      fontSize: 24,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: spacing.xs,
    },
    email: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: spacing.md,
    },
    listItem: {
      backgroundColor: colors.background.paper,
      marginBottom: spacing.xs,
    },
    listItemContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    listItemIcon: {
      marginRight: spacing.sm,
    },
    listItemText: {
      flex: 1,
    },
    listItemTitle: {
      fontSize: 16,
      color: colors.text.primary,
    },
    listItemDescription: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    logoutButton: {
      marginTop: spacing.xl,
    },
  });

  const profileSections = [
    {
      title: 'Personal Information',
      items: [
        {
          icon: 'account',
          title: 'Edit Profile',
          description: 'Update your personal information',
          onPress: () => {},
        },
        {
          icon: 'shield-account',
          title: 'Privacy Settings',
          description: 'Manage your privacy preferences',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Health Information',
      items: [
        {
          icon: 'medical-bag',
          title: 'Medical History',
          description: 'View and update your medical records',
          onPress: () => {},
        },
        {
          icon: 'pill',
          title: 'Medications',
          description: 'Manage your medications',
          onPress: () => {},
        },
        {
          icon: 'file-document',
          title: 'Insurance Information',
          description: 'Update your insurance details',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'App Settings',
      items: [
        {
          icon: 'bell',
          title: 'Notifications',
          description: 'Manage notification preferences',
          onPress: () => navigation.navigate('Notifications'),
        },
        {
          icon: 'phone',
          title: 'USSD Support',
          description: 'Access basic features via USSD',
          onPress: () => navigation.navigate('USSDSupport'),
        },
        {
          icon: 'theme-light-dark',
          title: 'Dark Mode',
          description: 'Toggle dark mode',
          right: () => <Switch value={false} onValueChange={() => {}} />,
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Avatar.Image
            size={100}
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>

        {profileSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <List.Item
                key={itemIndex}
                title={item.title}
                description={item.description}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={item.icon}
                    color={colors.primary.main}
                  />
                )}
                right={item.right}
                onPress={item.onPress}
                style={styles.listItem}
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
              />
            ))}
          </View>
        ))}

        <PaperButton
          mode="outlined"
          onPress={() => {}}
          style={styles.logoutButton}
          icon="logout"
        >
          Log Out
        </PaperButton>
      </View>
    </ScrollView>
  );
}; 