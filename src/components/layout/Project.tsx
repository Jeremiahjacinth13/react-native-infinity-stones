import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import type {RootStackParamList, Project} from '../../types';

const ProjectContainer: React.FC<Project> = ({name, href}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(href)}>
      <Text style={styles.projectText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  projectText: {},
});

export default React.memo(ProjectContainer);
