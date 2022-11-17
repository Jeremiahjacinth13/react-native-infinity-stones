import * as React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';

const PageContainer: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
  return (
    <View style={styles.pageContainer}>
      <StatusBar barStyle={'light-content'} />
      {children}
    </View>
  );
};

export default PageContainer;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
});
