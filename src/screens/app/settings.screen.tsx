import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MagnifyingGlassIcon, ChevronRightIcon } from 'react-native-heroicons/outline';
import { ProfileHeader } from '../../ui';
import { useTheme } from '../../providers/theme.provider';

type SettingItem = {
  icon: string;
  title: string;
  color: string;
  screen: string;
};

const personSettings: SettingItem[] = [
  {
    icon: '🔒',
    title: 'Privacy',
    color: '#FF2D55',
    screen: 'PrivacySettings',
  },
];

const appSettings: SettingItem[] = [
  {
    icon: '⚙️',
    title: 'General',
    color: '#8E8E93',
    screen: 'GeneralSettings',
  },
  {
    icon: '🌓',
    title: 'Appearance',
    color: '#007AFF',
    screen: 'AppearanceSettings',
  },
  {
    icon: '🔔',
    title: 'Notifications',
    color: '#34C759',
    screen: 'Notifications',
  },
  {
    icon: '💬',
    title: 'Support',
    color: '#8E8E93',
    screen: 'Support',
  },
];

export default function Settings() {
  const navigation = useNavigation();
  const { isDark } = useTheme();

  const colors = {
    background: isDark ? '#000000' : '#F2F2F7',
    text: isDark ? '#FFFFFF' : '#000000',
    subtitle: isDark ? '#8E8E93' : '#6C6C70',
    inputBackground: isDark ? '#1C1C1E' : '#FFFFFF',
    menuItemBackground: isDark ? '#1C1C1E' : '#FFFFFF',
    borderColor: isDark ? '#38383A' : '#C6C6C8',
    separatorColor: isDark ? '#38383A' : '#C6C6C8',
  };

  const renderSettingItem = useCallback(({ item }: { item: SettingItem }) => (
    <TouchableOpacity
      key={item.title}
      onPress={() => navigation.navigate(item.screen as never)}
      style={[
        styles.menuItem,
        { backgroundColor: colors.menuItemBackground, borderColor: colors.borderColor },
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: `${item.color}${isDark ? '20' : '20'}` },
        ]}
      >
        <Text style={styles.icon}>{item.icon}</Text>
      </View>
      <Text style={[styles.menuText, { color: colors.text }]}>{item.title}</Text>
      <ChevronRightIcon size={20} color={colors.subtitle} />
    </TouchableOpacity>
  ), [colors, isDark, navigation]);

  const renderSectionHeader = useCallback(({ title }: { title: string }) => (
    <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
  ), [colors]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} contentInsetAdjustmentBehavior="automatic">
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

        <View style={[styles.searchContainer, { backgroundColor: colors.inputBackground }]}>
          <MagnifyingGlassIcon size={20} color={colors.subtitle} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search"
            placeholderTextColor={colors.subtitle}
          />
        </View>

        <ProfileHeader />

        {renderSectionHeader({ title: 'Person Settings' })}
        {personSettings.map(item => renderSettingItem({ item }))}

        {renderSectionHeader({ title: 'App Settings' })}
        {appSettings.map(item => renderSettingItem({ item }))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 17,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 2,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  menuText: {
    flex: 1,
    fontSize: 17,
  },
});

