import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../../../providers/theme.provider';

const PrivacySettingsScreen = () => {
  const [locationServices, setLocationServices] = React.useState(true);
  const [tracking, setTracking] = React.useState(true);
  const { isDark, toggleTheme } = useTheme();

  const theme = isDark
    ? {
        background: '#121212',
        text: '#FFFFFF',
        description: '#B0B0B0',
        cardBackground: '#1C1C1E',
        switchTrack: '#3E4B64',
        switchThumb: '#4B88A2',
      }
    : {
        background: '#FFFFFF',
        text: '#000000',
        description: '#8E8E93',
        cardBackground: '#F8F8F8',
        switchTrack: '#81b0ff',
        switchThumb: '#007AFF',
      };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.title, { color: theme.text }]}>Location Services</Text>
        <Text style={[styles.description, { color: theme.description }]}>
          Control which apps can access your location.
        </Text>
        <Switch
          value={locationServices}
          onValueChange={setLocationServices}
          trackColor={{ false: '#767577', true: theme.switchTrack }}
          thumbColor={locationServices ? theme.switchThumb : '#f4f3f4'}
        />
      </View>

      <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.title, { color: theme.text }]}>Tracking</Text>
        <Text style={[styles.description, { color: theme.description }]}>
          Prevent apps from tracking your activity across other apps and websites.
        </Text>
        <Switch
          value={tracking}
          onValueChange={setTracking}
          trackColor={{ false: '#767577', true: theme.switchTrack }}
          thumbColor={tracking ? theme.switchThumb : '#f4f3f4'}
        />
      </View>

      {/* Theme toggle */}
      <TouchableOpacity 
        style={[styles.themeToggle, { backgroundColor: theme.switchTrack }]}
        onPress={toggleTheme}
      >
        <Text style={styles.toggleText}>
          Switch to {isDark ? 'Light' : 'Dark'} Theme
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 12,
  },
  themeToggle: {
    marginTop: 24,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default PrivacySettingsScreen;
