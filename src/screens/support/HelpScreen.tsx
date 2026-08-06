/**
 * Help Screen — FAQ and contact info
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';

const FAQS = [
  { q: 'How do I check scheme eligibility?', a: 'Go to the Eligibility tab, fill in your details, and get instant results.' },
  { q: 'Which languages are supported?', a: 'We support 12 regional languages including Hindi, Marathi, Tamil, Telugu, and more.' },
  { q: 'Is this app free to use?', a: 'Yes, Farmer AI is completely free for all farmers.' },
  { q: 'How do I save a scheme?', a: 'Tap the bookmark icon on any scheme to save it for later.' },
  { q: 'Can I use voice in my language?', a: 'Yes, tap the mic button and speak in your preferred language.' },
];

export const HelpScreen: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = React.useState<number | null>(null);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {FAQS.map((faq, idx) => (
          <TouchableOpacity key={idx} style={styles.faqItem} onPress={() => setExpanded(expanded === idx ? null : idx)}>
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{faq.q}</Text>
              <Ionicons name={expanded === idx ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.gray[400]} />
            </View>
            {expanded === idx && <Text style={styles.faqAnswer}>{faq.a}</Text>}
          </TouchableOpacity>
        ))}
        <Text style={[styles.sectionTitle, { marginTop: Spacing['2xl'] }]}>Contact Us</Text>
        <View style={styles.contactItem}>
          <Ionicons name="mail-outline" size={18} color={Colors.primary[500]} />
          <Text style={styles.contactText}>support@farmervoice.in</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="call-outline" size={18} color={Colors.primary[500]} />
          <Text style={styles.contactText}>1800-XXX-XXXX (Toll Free)</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, gap: Spacing.md },
  headerTitle: { ...Typography.h5, color: Colors.text.primary },
  content: { padding: Spacing.xl, paddingBottom: 100 },
  sectionTitle: { ...Typography.h5, color: Colors.text.primary, marginBottom: Spacing.lg },
  faqItem: { borderBottomWidth: 1, borderBottomColor: Colors.divider, paddingVertical: Spacing.lg },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQuestion: { ...Typography.label, color: Colors.text.primary, flex: 1, marginRight: Spacing.sm },
  faqAnswer: { ...Typography.body, color: Colors.text.secondary, marginTop: Spacing.md, lineHeight: 22 },
  contactItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.lg },
  contactText: { ...Typography.body, color: Colors.text.primary },
});
