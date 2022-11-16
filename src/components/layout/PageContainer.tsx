import * as React from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';

const PageContainer: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
  return (
    <SafeAreaView style={styles.pageContainer}>
      <StatusBar barStyle={'dark-content'} />
      {children}
    </SafeAreaView>
  );
};

export default PageContainer;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
});
