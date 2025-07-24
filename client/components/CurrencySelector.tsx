import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

import { Currency } from '@/types';
import currencies from '@/constants/currencies';

interface CurrencySelectorProps {
  value: string;
  onChange: (currency: Currency) => void;
  testID?: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ value, onChange, testID }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors, isDark } = useTheme();
  
  const selectedCurrency = currencies.find(c => c.code === value) || currencies[0];
  
  const handleSelect = (currency: Currency) => {
    onChange(currency);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.selector,
          {
            backgroundColor: isDark ? colors.gray[800] : colors.gray[50],
            borderColor: isDark ? colors.gray[700] : colors.border,
          }
        ]}
        onPress={() => setModalVisible(true)}
        testID={testID}
      >
        <Text style={[styles.selectorText, { color: isDark ? colors.current.text : colors.text }]}>
          {selectedCurrency.symbol} {selectedCurrency.code} - {selectedCurrency.name}
        </Text>
        <ChevronDown size={20} color={isDark ? colors.gray[400] : colors.gray[500]} />
      </TouchableOpacity>
      
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
            <View style={[styles.modalHeader, { borderBottomColor: isDark ? colors.gray[800] : colors.border }]}>
              <Text style={[styles.modalTitle, { color: isDark ? colors.current.text : colors.text }]}>
                Select Currency
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={[styles.closeButton, { color: colors.primary }]}>Close</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={currencies}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.currencyItem,
                    item.code === selectedCurrency.code && { backgroundColor: isDark ? colors.gray[800] : colors.gray[100] },
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={[styles.currencySymbol, { color: isDark ? colors.current.text : colors.text }]}>
                    {item.symbol}
                  </Text>
                  <View>
                    <Text style={[styles.currencyCode, { color: isDark ? colors.current.text : colors.text }]}>
                      {item.code}
                    </Text>
                    <Text style={[styles.currencyName, { color: isDark ? colors.gray[400] : colors.textSecondary }]}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => (
                <View style={[styles.separator, { backgroundColor: isDark ? colors.gray[800] : colors.border }]} />
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selector: {
    height: 56,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectorText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    fontSize: 16,
    fontWeight: '500',
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 12,
    width: 30,
    textAlign: 'center',
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: '500',
  },
  currencyName: {
    fontSize: 14,
  },
  separator: {
    height: 1,
  },
});

export default CurrencySelector;